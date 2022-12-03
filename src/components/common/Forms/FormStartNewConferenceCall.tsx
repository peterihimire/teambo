import React, { useState } from "react";
import * as yup from "yup";
import { Form, Formik } from "formik";
// import { useHistory } from "react-router-dom";
import generateUniqueMeetingId from "generate-unique-id";

import { Button } from "..";

// import copyToClipBoard from "../../../utils/helpers/copyToClipboard";
import MeetingStore from "../../../store/meetingStore";

// Amazon Chime
import {
  useMeetingManager,
  DeviceLabels,
} from "amazon-chime-sdk-component-library-react";
// Http Service
import callService from "../../../services/callService";
import ModalMeetingDeviceSetup from "./../Modals/ModalMeetingDeviceSetup";
import callsStore from "../../../store/callStore";

const newMeetingId = generateUniqueMeetingId({ length: 6, useLetters: true });
const newMeetingJoinLink = `${process.env.REACT_APP_API_URL}/call/${newMeetingId}/join`;


interface FormValues {
  conferenceCallLink: string;
}
const initialValues: FormValues = {
  conferenceCallLink: `${newMeetingJoinLink}`,
};

const validationSchema = yup.object({
  conferenceCallLink: yup.string().required("Required *"),
});

type Props = {};
// Start of Component
const FormStartNewConferenceCall: React.FC<Props> = () => {
  //destructure setting the call to be started to state
  const setCurrentCall = callsStore((store) => store.setCurrentCall);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setMeetingCode, setExternalUserId, setCallId, setChimeAttendeeId } =
    MeetingStore();
  const onSubmit = (values: any) => {
    // console.log(values);
    // history.push("/user/conference-invite");
  };

  /**
   * Amazon Chime Shit (Start)
   * @param
   */

  const meetingManager = useMeetingManager();

  const joinMeeting = async () => {
    setIsLoading(true);
    // e.preventDefault();
    // Fetch the meeting and attendee data from your server application
    try {
      const meetingResponse: any = await callService.startConferenceCall({
        type: "VIDEO",
      });
      const meetingJson: any = await meetingResponse.data;
      setMeetingCode(meetingJson.external_id);
      setCallId(meetingJson.conversation.call_id);
      setExternalUserId(meetingJson.participant.ExternalUserId);
      setChimeAttendeeId(meetingJson.participant.AttendeeId);

      const joinData = {
        meetingInfo: meetingJson.Meeting,
        attendeeInfo: meetingJson.participant,
        deviceLabels: DeviceLabels.AudioAndVideo,
      };

      //set the current call to state
      setCurrentCall(meetingJson);

      // Use the join API to create a meeting session using the above <data

      await meetingManager.join(joinData);
      setIsLoading(false);
      setShowModal(true);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }

    // At this point you could let users setup their devices, or by default
    // the SDK will select the first device in the list for the kind indicated
    // by `deviceLabels` (the default value is DeviceLabels.AudioAndVideo)
    // ...

    // Start the session to join the meeting
    // await meetingManager.start();
    // history.push("/user/sample-call");
  };

  /** Amazon Chime (End) */

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          {/* <Field name="conferenceCallLink">
            {({ field, meta }: FieldRenderProps) => {
              return (
                <Input
                  iconId="icon-share"
                  id="copyMeetingId"
                  iconClickAction={() => copyToClipBoard("copyMeetingId")}
                  disable={true}
                  error={meta.touched && meta.error ? meta.error : null}
                  {...field}
                />
              );
            }}
          </Field> */}

          <Button
            cssClass="btn--primary btn--big m-t-15px btn-center"
            text="Start meeting"
            isLoading={isLoading}
            // type="submit"
            handleClick={() => joinMeeting()}
          />
        </Form>
      </Formik>
      {showModal && (
        <ModalMeetingDeviceSetup handleClick={() => setShowModal(false)} />
      )}
    </>
  );
};

export default FormStartNewConferenceCall;

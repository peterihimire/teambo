import React, { useState } from "react";
import * as yup from "yup";
import { Form, Field, Formik } from "formik";
import { useHistory } from "react-router-dom";

import Button from "../Button/Button";
import Input from "../Input/Input";

// import copyToClipBoard from "../../../utils/helpers/copyToClipboard";
import MeetingStore from "../../../store/meetingStore";

// Amazon Chime
import {
  useMeetingManager,
  DeviceLabels,
} from "amazon-chime-sdk-component-library-react";

import callService from "../../../services/callService";
import ModalMeetingDeviceSetup from "../Modals/ModalMeetingDeviceSetup";
import callsStore from "../../../store/callStore";

interface FieldRenderProps {
  field: any;
  meta: any;
}

type ErrorProps = {
  setErrors?: any;
};
interface FormValues {
  conferenceCallId: string;
}
const initialValues: FormValues = {
  conferenceCallId: "",
};

const validationSchema = yup.object({
  conferenceCallId: yup.string().required("Required *"),
});

type Props = {};
const FormStartNewConferenceCall: React.FC<Props> = () => {
  //destructure setting the call to be started to state
  const setCurrentCall = callsStore((store) => store.setCurrentCall);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const history = useHistory();

  const [setMeetingCode, setExternalUserId, setCallId, setChimeAttendeeId] =
    MeetingStore((store) => [
      store.setMeetingCode,
      store.setExternalUserId,
      store.setCallId,
      store.setChimeAttendeeId,
    ]);

  const meetingManager = useMeetingManager();

  const onSubmit = (values: any, { setErrors }: ErrorProps) => {
    const { conferenceCallId } = values;
    (async () => {
      setIsLoading(true);
      // Fetch the meeting and attendee data from your server application
      await callService.beginConferenceCall(
        conferenceCallId
      )
      .then(async (meetingResponse) => { 

        const meetingJson: any = await meetingResponse.data;
        console.log("Meeting Data: ", meetingJson.data);
        setMeetingCode(meetingJson.external_id);
        setCallId(meetingJson.conversation.call_id);
        setExternalUserId(meetingJson.participant.ExternalUserId);
        setChimeAttendeeId(meetingJson.participant.AttendeeId);
        // AttendeeId

        const joinData = {
          meetingInfo: meetingJson.Meeting,
          attendeeInfo: meetingJson.participant,
          deviceLabels: DeviceLabels.AudioAndVideo,
        };

        //set the current call to state
        setCurrentCall(meetingJson);

        // Use the join API to create a meeting session using the above data
        await meetingManager.join(joinData);

        setIsLoading(false);

        // At this point you could let users setup their devices, or by default
        // the SDK will select the first device in the list for the kind indicated
        // by `deviceLabels` (the default value is DeviceLabels.AudioAndVideo)
        // ...

        // Start the session to join the meeting
        await meetingManager.start();
        // history.push("/user/conference-start");
        history.push(`/user/call/${conferenceCallId}`);
      }).catch (err => {
        setErrors({ conferenceCallId: err.response.data.message });
        setIsLoading(false);
      });
    })();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {/* <Form>
          <Field name="conferenceCallId">
            {({ field, meta }: FieldRenderProps) => {
              return (
                <Input
                  iconId="icon-share"
                  id="copyMeetingId"
                  iconClickAction={() => copyToClipBoard("copyMeetingId")}
                  error={meta.touched && meta.error ? meta.error : null}
                  {...field}
                />
              );
            }}
          </Field>

          <Button
            cssClass="btn--primary btn--big m-t-15px btn-center"
            text="Start meeting"
            isLoading={isLoading}
            type="submit"
            // handleClick={() => joinMeeting()}
          />
        </Form> */}

        <Form>
          <Field name="conferenceCallId">
            {({ field, meta }: FieldRenderProps) => {
              return (
                <Input
                  label="Meeting Code"
                  iconId="icon-link"
                  error={meta.touched && meta.error ? meta.error : null}
                  {...field}
                />
              );
            }}
          </Field>

          <Button
            cssClass="btn--primary btn--medium btn--full m-t-40px"
            text="Join meeting"
            type="submit"
            isLoading={isLoading}
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

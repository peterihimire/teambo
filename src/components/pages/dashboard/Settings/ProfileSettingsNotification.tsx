import React,{ useState } from "react";

import Typography from "../../../common/Typography/Typography";
import DashboardLayoutOneRight from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOneRight";

import Button from "./../../../common/Button/Button";
import SwitchOption from "./../../../common/SwitchOptions/SwitchOption";
import userService from "../../../../services/userService";
import { ToastContainer, toast } from 'react-toastify';
import { userStore } from "./../../../../store/userStore";

interface Props {
  history?: any;
}
const ProfileSettingsNotification: React.FC<Props> = ({ history }) => {
  const { user, getUser } = userStore();
  const [productActivate, setProductActivate] = useState<boolean>(user.user_notification.product_updates);
  const [eventActivate, setEventActivate] = useState<boolean>(user.user_notification.event_updates);
  const [commentActivate, setCommentActivate] = useState<boolean>(user.user_notification.comments);
  const [notificationActivate, setNotificationActivate] = useState<boolean>(user.user_notification.notifications);
  const productUpdateActivate = (active: boolean) => {
    setProductActivate(active)
  }
  const eventUpdateActivate = (active: boolean) => {
    setEventActivate(active)
  }
  const commentUpdateActivate = (active: boolean) => {
    setCommentActivate(active)
  }
  const notificationUpdateActivate = (active: boolean) => {
    setNotificationActivate(active)
  }
  const [loading, setLoading] = useState(false);
  const onSubmit = async () => {
    setLoading(true)

    const data: any = {};
    data.product_updates = productActivate;
    data.event_updates = eventActivate;
    data.comments = commentActivate;
    data.notifications = notificationActivate;
    userService.setNotificationSettings(data)
    .then(response => {
      getUser();
      toast.success('Notifications Updated Successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
      setLoading(false)
    }).catch (err => {
      setLoading(false)
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.error[0], {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }else {
        toast.error(err.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    });
  }
  
  return (
    <DashboardLayoutOneRight>
      <ToastContainer/>      
      <Typography type="h5" text="Notifications" cssClass="head-9 m-b-40px" />

      {productUpdateActivate && 
        <SwitchOption
          title="Product updates"
          subTitle="Stair Lifts Feel The Freedom Of Your Home"
          status={productActivate}
          updateActivate={productUpdateActivate}
        />
      }
      <SwitchOption
        title="Events updates"
        subTitle="A Right Media Mix Can Make The Difference"
        status={eventActivate}
        updateActivate={eventUpdateActivate}
      />
      <SwitchOption
        title="Comments"
        subTitle="Advertising Relationships Vs Business Decisions"
        status={commentActivate}
        updateActivate={commentUpdateActivate}
      />
      <SwitchOption
        title="Notifications"
        subTitle="Creating Remarkable Poster Prints Through"
        status={notificationActivate}
        updateActivate={notificationUpdateActivate}
      />

      <div className="flex-r-jcbetween m-t-120px">
        <div>
          <Button
            cssClass="btn--primary btn--small"
            text="Update Settings"
            isLoading={loading}
            handleClick={onSubmit}
          />
          <Button cssClass="btn--grey btn--small m-l-10px" text="Cancel" />
        </div>

        {/* <Button
          cssClass="btn btn--small btn--all-grey btn-icon-n-text"
          withIcon={true}
          btnIcon="icon-trash-sm"
          iconClass="icon-trash-sm btn-icon-n-text__icon"
          text="Deactivate Account"
        /> */}
      </div>
    </DashboardLayoutOneRight>
  );
};

export default ProfileSettingsNotification;

import React /* useState*/ from "react";

// Custom Hooks
import useActiveTabpane from "../../../../../utils/hooks/useActiveTabpane";

import Typography from "./../../../../common/Typography/Typography";
import UserIcon from "./../../../../common/UserIcon/UserIcon";
// import Switch from "./../../../../common/Switch/Switch";
import UserPersonalInfo from "./UserPersonalInfo";
import UserActivities from "./UserActivities";
import UserSubscriptions from "./UserSubscriptions";
import { useLocation, useHistory } from "react-router-dom";
import { useGetUserManagement } from "../../../../../services/userManagementService";
import { imgUrl } from "./getImageAsset";

interface Props {}
const UserDetails: React.FC<Props> = () => {
  // const [switchActive, setSwitchActive] = useState<boolean>(false);
  const [activeIndex, setActivePane] = useActiveTabpane(0);

  // const toggleSwitch = () => setSwitchActive((prevState) => !prevState);

  const { state }: any = useLocation();

  const history = useHistory();

  React.useEffect((): any => {
    if (!state) {
      history.push("/admin/users");
    }
  }, [history, state]);

  const { data, isLoading, isError, error } = useGetUserManagement(
    `/users/${state?.row?.uid}`
  );

  const tabsBtn = ["Personal Information", "Activities", "Subscription"];

  const tabsContent = [
    <UserPersonalInfo {...{ key: 0, data, isLoading, isError, error }} />,
    <UserActivities {...{ key: 1, data, isLoading, isError, error }} />,
    <UserSubscriptions {...{ key: 2, data, isLoading, isError, error }} />,
  ];

  return (
    <>
      {isLoading ? (
        <div style={{ marginTop: "1em" }}>
          <small>Please wait...</small>
        </div>
      ) : error || isError ? (
        <div style={{ marginTop: "1em", color: "red" }}>
          <small>Something went wrong</small>
        </div>
      ) : (
        <section className="admin-layout__content">
          <nav className="admin-layout__top-nav">
            <Typography text="Users" type="h5" cssClass="head-21" />
            <div className="admin-layout__top-nav__actions">
              {/* <SearchInput />
              <Button
                cssClass="btn btn-icon admin-layout__btn"
                icon="icon-notification"
                iconClass="icon-notification"
              /> */}
              <UserIcon pic="pic25" cssClass="admin-layout__user-icon" />
            </div>
          </nav>
          <section className="admin-layout__section">
            <section className="user-details__container">
              <section className="user-details__top">
                <div className="flex-r-aicenter">
                  <div className="user-details__image">
                    {data?.image ? (
                      <div className="table__user">
                        <img
                          src={data?.image && imgUrl(data.uid, data.image)}
                          alt={data?.firstname}
                          style={{
                            marginTop: "5px",
                            height: "70px",
                            width: "70px",
                            borderRadius: "50%",
                          }}
                        />
                      </div>
                    ) : (
                      <h3
                        className={`avatar__icon`}
                        style={{ display: "flex", marginTop: "10px" }}
                      >
                        <span style={{ marginRight: "5px" }}>
                          {data?.firstname?.slice(0, 1)}
                        </span>
                        <span>{data?.lastname?.slice(0, 1)}</span>
                      </h3>
                    )}
                    {/* <Image source="pic10" cssClass="image-fit circle-radius" /> */}
                  </div>
                  <div className="m-l-20px">
                    <Typography
                      type="h3"
                      text={` ${data?.firstname} ${data?.lastname}`}
                      cssClass="head-22"
                    />
                    <Typography
                      type="span"
                      text={`${data?.firstname} ${data?.lastname} `}
                      cssClass="p-10"
                    />
                  </div>
                </div>
                {/* <div className="flex-r-aicenter">
                  <Switch
                    handleClick={() => toggleSwitch()}
                    checked={switchActive}
                    cssClass="bg-red"
                  />
                  <Typography
                    type="span"
                    text="Suspend account"
                    cssClass="p-18 m-l-10px"
                  />
                </div> */}
              </section>

              <section className="admin-layout__tab-navigator">
                {tabsBtn.map((btn, index) => (
                  <button
                    key={index}
                    onClick={() => setActivePane(index)}
                    className={`admin-layout__tab-btn ${
                      index === activeIndex ? "active" : ""
                    }`}
                  >
                    {btn}
                  </button>
                ))}
              </section>
              <section className="admin-layout__tabs-container">
                {tabsContent.map((content, index) =>
                  index === activeIndex ? content : null
                )}
              </section>
            </section>
          </section>
        </section>
      )}
    </>
  );
};

export default UserDetails;

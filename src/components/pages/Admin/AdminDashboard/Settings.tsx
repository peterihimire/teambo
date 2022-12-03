import React from "react";

// Custom Hooks
import useActiveTabpane from "../../../../utils/hooks/useActiveTabpane";

import Typography from "./../../../common/Typography/Typography";
import UserIcon from "./../../../common/UserIcon/UserIcon";
import Button from "./../../../common/Button/Button";
import TextWithDivider from "./../../../common/TextWithDivider/TextWithDivider";
import SearchInput from "./../../../common/SearchInput/SearchInput";
import GeneralInfo from "./AdminSettingsContent/GeneralInfo";

interface Props {}
const Settings: React.FC<Props> = () => {
  const [activeIndex, setActivePane] = useActiveTabpane(0);
  const adminSubHeadingsWithIcon = [
    {
      iconName: "icon-info-circle",
      divider: "splash",
      data: "Set configurations for LImpkin",
    },
  ];
  const tabsBtn = ["General"];

  const tabsContent = [<GeneralInfo key={0} />];

  return (
    <section className="admin-layout__content">
      <nav className="admin-layout__top-nav">
        <Typography text="Settings" type="h5" cssClass="head-21" />
        <div className="admin-layout__top-nav__actions">
          <SearchInput />
          <Button
            cssClass="btn btn-icon admin-layout__btn"
            icon="icon-notification"
            iconClass="icon-notification"
          />
          <UserIcon availability="online" cssClass="admin-layout__user-icon" />
        </div>
      </nav>
      <section className="admin-layout__section">
        <section className="flex-r-jcbetween-aicenter m-b-20px">
          <article>
            <Typography type="h3" text="Settings" cssClass="head-22 m-b-15px" />
            <TextWithDivider texts={adminSubHeadingsWithIcon} />
          </article>
        </section>
        <section className="admin-layout__tab">
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
  );
};

export default Settings;

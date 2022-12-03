import React, { useEffect, useState } from "react";
import TopNav from "./../../common/StaticPages/TopNav";
import NewHeader from "../../common/StaticPages/NewHeader";
import Image from "./../../common/Image/Image";
import Typography from "../../common/Typography/Typography";
import Button from "../../common/Button/Button";
import Footer from "./../../common/StaticPages/Footer";
import { Link } from "react-router-dom";
import paymentStore from "./../../../store/paymentStore";
import {Switch} from "@material-ui/core";


// import Svg from "./../../common/Svg/Svg";

interface Props {}
const Index: React.FC<Props> = () => {
  // FOR THE MONTHLY/ ANNUALLY PLAN SELECT
  const [checked, setChecked] = useState<boolean>(false);
  const handleChange = (event: any) => {
    setChecked(event.target.checked);
  };
  //Packages
  const [packages, setPackages] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { fetchPackagePlans, packagePlans } = paymentStore();

  useEffect(() => {
    if (checked === false) {
      setPackages(
        packagePlans.filter(
          (packagePlan: any) => packagePlan?.interval === "MONTHLY",
        ),
      );
      setIsLoading(false);
    } else if (checked === true) {
      setPackages(
        packagePlans.filter(
          (packagePlan: any) => packagePlan?.interval === "YEARLY",
        ),
      );
      setIsLoading(false);
    } else {
      setPackages(packagePlans);
      setIsLoading(false);
    }
    // eslint-disable-next-line
  }, [packagePlans, checked]);

  useEffect(() => {
    fetchPackagePlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TopNav />
      <NewHeader />
      {/* GET ACCESS KEEP MESSAGES SECTION */}
      <section className="section__get-access_keep-messages">
        <div className="center">
          <div className=" get-access">
            <Typography
              type="h3"
              text="Why Timbo?
              
              "
              cssClass="head-27 text-center  m-b-20px main-heading-second"
            />
            <div className="get-access-grid">
              <div className="get-access-item">
                <div className="popular-logo">
                  <Image source="croud" />
                </div>
                <div className="popular-text">
                  <div className="get-access-title">
                    <Typography
                      type="p"
                      text="Luxury Virtual Experiences"
                      cssClass="p-19  m-b-10px "
                    />
                  </div>

                  <Typography
                    type="p"
                    text="Make the virtual, real, with HD-quality video, screenshare functions, and deliciously crisp audio."
                    cssClass="p-20  m-b-0px "
                  />
                </div>
              </div>
              <div className="get-access-item">
                <div className="popular-logo">
                  <Image source="connection" />
                </div>
                <div className="popular-text">
                  <div className="get-access-title">
                    <Typography
                      type="p"
                      text="More than video"
                      cssClass="p-19  m-b-10px "
                    />
                  </div>
                  <Typography
                    type="p"
                    text=" Get the most out of virtual meetings with Timbo’s messaging and filesharing feature."
                    cssClass="p-20  m-b-0px "
                  />
                </div>
              </div>
              <div className="get-access-item">
                <div className="popular-logo">
                  <Image source="schedule" />
                </div>
                <div className="popular-text">
                  <div className="get-access-title">
                    <Typography
                      type="p"
                      text="Seamless Transitions"
                      cssClass="p-19  m-b-10px "
                    />
                  </div>
                  <Typography
                    type="p"
                    text="Keep it moving from mobile to desktop and back again with just a few clicks."
                    cssClass="p-20  m-b-0px "
                  />
                </div>
              </div>
              <div className="get-access-item">
                <div className="popular-logo">
                  <Image source="statistics" />
                </div>
                <div className="popular-text">
                  <div className="get-access-title">
                    <Typography
                      type="p"
                      text="Real-time AI Assistance"
                      cssClass="p-19  m-b-10px "
                    />
                  </div>

                  <Typography
                    type="p"
                    text="Stay focused and efficient with real-time meeting records and transcription saved to your phone."
                    cssClass="p-20  m-b-0px "
                  />
                </div>
              </div>
            </div>
          </div>
          <div className=" keep-messages">
            <Typography
              type="h3"
              text=" Call. Text. For Free."
              cssClass="head-27 text-center m-t-200px m-b-20px main-heading-second"
            />
            <Typography
              type="p"
              text="Not ready to commit yet? A free version still has the  Timbo guarantee."
              cssClass="p-20  m-b-60px keep-messages__sub-heading"
            />

            <Image source="conversationDesktop" cssClass="keep-msgs-img " />
          </div>
        </div>
      </section>
      {/* MEET FROM ANYWHERE SECTION */}
      <section className="section__meet_from-anywhere">
        <div className="center">
          <div className=" meet_from-anywhere-div">
            <div className="meet_from-anywhere-text-div">
              <Typography
                type="h3"
                text="Meet from anywhere."
                cssClass="head-27b  m-b-20px try-heading"
              />
              <Typography
                type="p"
                text="Calling, meetings, messaging, and events in the cloud for teams of all sizes."
                cssClass="p-24  m-b-30px meet_from-anywhere-sub-heading "
              />
              <div className="meet_from-anywhere-btn-div">
                <Link
                  to="/auth/signup-individual"
                  target="_blank"
                  className="link"
                >
                  <Button
                    // cssClass="btn btn--primary btn--big btn--primary-border btn-size radius-10px"
                    cssClass="btn-new  btn-primary  radius-10px btn-size m-r-20px"
                    text="Start for Free"
                  />
                </Link>

                <Link to="/contact" target="_blank" className="link">
                  <Button
                    // cssClass="btn btn--big btn--transparent-dark radius-10px btn-size"
                    cssClass="btn-new transparent-dark radius-10px btn-size"
                    text="Contact Us"
                  />
                </Link>
              </div>
            </div>
            <div className="meet_from-anywhere-img-div">
              <Image source="meetAnywhere" cssClass="meet-anywhere-img" />
            </div>
          </div>
        </div>
      </section>


       {/* FLEXIBLE PRICING SECTION*/}
       <section className="section__flexible-pricing">
        <div className="center">
          <div className=" flexible-pricing-div">
          <Typography
              type="h3"
              text="Our variety of affordable plan"
              cssClass="head-27 text-center  m-b-70px main-heading-second"
            />
            <Typography
              type="p"
              text="Based on market demand, we have created 3 packages that will
            cover all your business needs ."
              cssClass="p-20  m-b-100px flexible-pricing__sub-heading"
            />
            {/* SWITCH MONTHLY AND ANNUALLY */}
            <div className="m-b-100px switch-invisible">
              <Typography
                type="p"
                text="Monthly"
                cssClass="p-20  m-b-0px "
              />

              <Switch
                onChange={handleChange}
                color="primary"
                checked={checked}
                name="checked"
              />
              <Typography
                type="p"
                text="Annually"
                cssClass="p-20  m-b-0px "
              />
            </div>
            {/* END OF SWITCH MONTHLY AND ANNUALLY */}
            <div className="flexible-grid">
              {!isLoading && packages.map((packageP: any, index:any) => (
                <div className="flexible-item-with-switch" key={index}>
                  <div className="flexible-item">
                    <div className="flexible-header">
                      <Typography
                        type="p"
                        text={packageP.title}
                        cssClass="p-20  m-b-10px keep-messages__sub-heading"
                      />
                      <div className="variety-plan-price">
                        <span>
                          <Typography
                            type="p"
                            text="$"
                            cssClass="p-20  m-b-0px keep-messages__sub-heading"
                          />
                        </span>
                        <Typography
                          type="h3"
                          text={packageP.price}
                          cssClass="head-29 text-center  m-b-0px"
                        />
                        <span>
                          <Typography
                            type="p"
                            text={`/${packageP.interval}`}
                            cssClass="p-20  m-b-0px "
                          />
                        </span>
                      </div>
                    </div>
                    <div className="flexible-text-div">
                      <div className="flexible-text-content">
                        <Image source="checkMarkCircle" cssClass="m" />
                        <span>
                          <Typography
                            type="p"
                            text="Host up to 50 participants"
                            cssClass="p-20  m-b-0px flexible-p"
                          />
                        </span>
                      </div>

                      {packageP.features.map((feature: any, i:any) => (
                        <div className="flexible-text-content">
                          <Image source="checkMarkCircle" cssClass="m" />
                          <span>
                            <Typography
                              type="p"
                              text={feature}
                              cssClass="p-20  m-b-0px flexible-p"
                            />
                          </span>
                        </div>

                      ))}
                      <div className="flexible-btn-div">
                        <Link
                          to="/signup-individual"
                          target="_blank"
                          className="link"
                        >
                          <Button
                            // cssClass="btn btn--big btn--transparent-light transparent-hover-primary radius-10px "
                            cssClass="btn-new btn-size transparent-light transparent-hover-primary radius-10px "
                            text="Get Started"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

     
      {/* VARIETY PLAN SECTION */}
      {/* <section className="section__variety-plan">
        <div className="center">
          <div className=" variety-plan-div">
            <Typography
              type="h3"
              text="Our variety of affordable plan"
              cssClass="head-27 text-center  m-b-70px main-heading-second"
            />
            <div className="variety-grid">
              <div className="variety-item">
                <div className="variety-header">
                  <Typography
                    type="p"
                    text="Basic"
                    cssClass="p-20  m-b-10px keep-messages__sub-heading"
                  />
                  <div className="variety-plan-price">
                    <span>
                      <Typography
                        type="p"
                        text=""
                        cssClass="p-20  m-b-0px keep-messages__sub-heading"
                      />
                    </span>
                    <Typography
                      type="h3"
                      text="Free"
                      cssClass="head-29 text-center  m-b-0px"
                    />
                    <span>
                      <Typography type="p" text="" cssClass="p-20  m-b-0px " />
                    </span>
                  </div>
                </div>
                <div className="variety-text-div">
                  <div className="variety-text-content">
                    <Image source="checkMarkCircle" cssClass="m" />
                    <span>
                      <Typography
                        type="p"
                        text="Host up to 120 participants"
                        cssClass="p-20  m-b-0px variety-p"
                      />
                    </span>
                  </div>

                  <div className="variety-text-content">
                    <Image source="checkMarkCircle" cssClass="m" />
                    <span>
                      <Typography
                        type="p"
                        text="50 minutes max group meetings"
                        cssClass="p-20  m-b-0px variety-p"
                      />
                    </span>
                  </div>

                  <div className="variety-text-content">
                    <Image source="checkMarkCircle" cssClass="m" />
                    <span>
                      <Typography
                        type="p"
                        text="Basic Support"
                        cssClass="p-20  m-b-0px variety-p"
                      />
                    </span>
                  </div>

                  <div className="variety-text-content">
                    <Image source="checkMarkCircle" cssClass="m" />
                    <span>
                      <Typography
                        type="p"
                        text="Screen Sharing"
                        cssClass="p-20  m-b-0px variety-p"
                      />
                    </span>
                  </div>

                  <div className="variety-text-content">
                    <Image source="checkMarkCircle" cssClass="m" />
                    <span>
                      <Typography
                        type="p"
                        text="Private meeting rooms"
                        cssClass="p-20  m-b-0px variety-p"
                      />
                    </span>
                  </div>

                  <div className="variety-text-content">
                    <Image source="checkMarkCircle" cssClass="m" />
                    <span>
                      <Typography
                        type="p"
                        text="1 hour 1:1 meetings"
                        cssClass="p-20  m-b-0px variety-p"
                      />
                    </span>
                  </div>
                  <div className="variety-btn-div">
                    <Link
                      to="auth/signup-individual"
                      target="_blank"
                      className="link"
                    >
                      <Button
                        // cssClass="btn btn--big btn--transparent-light transparent-hover-primary radius-10px btn-size "
                        cssClass="btn-new transparent-light transparent-hover-primary radius-10px btn-size "
                        text="Get Started"
                      />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="variety-item">
                <div className="variety-header">
                  <Typography
                    type="p"
                    text="Standard"
                    cssClass="p-20  m-b-10px keep-messages__sub-heading"
                  />
                  <div className="variety-plan-price">
                    <span>
                      <Typography
                        type="p"
                        text="$"
                        cssClass="p-20  m-b-0px keep-messages__sub-heading"
                      />
                    </span>
                    <Typography
                      type="h3"
                      text="15.99"
                      cssClass="head-29 text-center  m-b-0px"
                    />
                    <span>
                      <Typography
                        type="p"
                        text="/month"
                        cssClass="p-20  m-b-0px "
                      />
                    </span>
                  </div>
                </div>
                <div className="variety-text-div">
                  <div className="variety-text-content">
                    <Image source="checkMarkCircle" cssClass="m" />
                    <span>
                      <Typography
                        type="p"
                        text="Host up to 150 participants"
                        cssClass="p-20  m-b-0px variety-p"
                      />
                    </span>
                  </div>

                  <div className="variety-text-content">
                    <Image source="checkMarkCircle" cssClass="m" />
                    <span>
                      <Typography
                        type="p"
                        text="Screen splitting"
                        cssClass="p-20  m-b-0px variety-p"
                      />
                    </span>
                  </div>

                  <div className="variety-text-content">
                    <Image source="checkMarkCircle" cssClass="m" />
                    <span>
                      <Typography
                        type="p"
                        text="Unlimited Group meetings"
                        cssClass="p-20  m-b-0px variety-p"
                      />
                    </span>
                  </div>

                  <div className="variety-text-content">
                    <Image source="checkMarkCircle" cssClass="m" />
                    <span>
                      <Typography
                        type="p"
                        text="100 GB  Cloud Recording storage (per license)"
                        cssClass="p-20  m-b-0px variety-p"
                      />
                    </span>
                  </div>

                  <div className="variety-text-content">
                    <Image source="checkMarkCircle" cssClass="m" />
                    <span>
                      <Typography
                        type="p"
                        text="Up to 25 hours meeting length"
                        cssClass="p-20  m-b-0px variety-p"
                      />
                    </span>
                  </div>

                  <div className="variety-text-content">
                    <Image source="checkMarkCircle" cssClass="m" />
                    <span>
                      <Typography
                        type="p"
                        text="Unlimited 1:1 meetings"
                        cssClass="p-20  m-b-0px variety-p"
                      />
                    </span>
                  </div>

                  <div className="variety-btn-div">
                    <Link
                      to="/auth/signup-individual"
                      target="_blank"
                      className="link"
                    >
                      <Button
                        // cssClass="btn btn--big btn--transparent-light transparent-hover-primary radius-10px btn-size "
                        cssClass="btn-new transparent-light transparent-hover-primary radius-10px btn-size "
                        text="Get Started"
                      />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="variety-item">
                <div className="variety-header">
                  <Typography
                    type="p"
                    text="Business"
                    cssClass="p-20  m-b-10px keep-messages__sub-heading"
                  />
                  <div className="variety-plan-price">
                    <span>
                      <Typography
                        type="p"
                        text="$"
                        cssClass="p-20  m-b-0px keep-messages__sub-heading"
                      />
                    </span>
                    <Typography
                      type="h3"
                      text="30.99"
                      cssClass="head-29 text-center  m-b-0px"
                    />
                    <span>
                      <Typography
                        type="p"
                        text="/month"
                        cssClass="p-20  m-b-0px "
                      />
                    </span>
                  </div>
                </div>
                <div className="variety-text-div">
                  <div className="variety-text-content">
                    <Image source="checkMarkCircle" cssClass="m" />
                    <span>
                      <Typography
                        type="p"
                        text="Host up to 200 participants"
                        cssClass="p-20  m-b-0px variety-p"
                      />
                    </span>
                  </div>
                  <div className="variety-text-content">
                    <Image source="checkMarkCircle" cssClass="m" />
                    <span>
                      <Typography
                        type="p"
                        text="150 GB Cloud recording storage"
                        cssClass="p-20  m-b-0px variety-p"
                      />
                    </span>
                  </div>
                  <div className="variety-text-content">
                    <Image source="checkMarkCircle" cssClass="m" />
                    <span>
                      <Typography
                        type="p"
                        text="Real time transcriptions"
                        cssClass="p-20  m-b-0px variety-p"
                      />
                    </span>
                  </div>

                  <div className="variety-text-content">
                    <Image source="checkMarkCircle" cssClass="m" />
                    <span>
                      <Typography
                        type="p"
                        text="Brand Customizations"
                        cssClass="p-20  m-b-0px variety-p"
                      />
                    </span>
                  </div>

                  <div className="variety-text-content">
                    <Image source="checkMarkCircle" cssClass="m" />
                    <span>
                      <Typography
                        type="p"
                        text="Unlimited Recording"
                        cssClass="p-20  m-b-0px variety-p"
                      />
                    </span>
                  </div>

                  <div className="variety-text-content">
                    <Image source="checkMarkCircle" cssClass="m" />
                    <span>
                      <Typography
                        type="p"
                        text="2 GB cloud recording (per license)"
                        cssClass="p-20  m-b-0px variety-p"
                      />
                    </span>
                  </div>

                  <div className="variety-text-content">
                    <Image source="checkMarkCircle" cssClass="m" />
                    <span>
                      <Typography
                        type="p"
                        text="Recording transcripts"
                        cssClass="p-20  m-b-0px variety-p"
                      />
                    </span>
                  </div>
                  <div className="variety-btn-div">
                    <Link
                      to="/auth/signup-individual"
                      target="_blank"
                      className="link"
                    >
                      <Button
                        cssClass="btn-new transparent-light transparent-hover-primary radius-10px btn-size "
                        text="Get Started"
                      />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="variety-item">
                <div className="variety-header">
                  <Typography
                    type="p"
                    text="Enterprice"
                    cssClass="p-20  m-b-10px keep-messages__sub-heading"
                  />
                  <div className="variety-plan-price">
                    <span>
                      <Typography
                        type="p"
                        text="Contact Us for Custom Package"
                        cssClass="p-20  m-b-0px keep-messages__sub-heading"
                      />
                    </span>
                
                  </div>
                </div>
                <div className="variety-text-div">
                  <div className="variety-text-content">
                    <Image source="checkMarkCircle" cssClass="m" />
                    <span>
                      <Typography
                        type="p"
                        text="Unlimited Cloud Storage"
                        cssClass="p-20  m-b-0px variety-p"
                      />
                    </span>
                  </div>
                  <div className="variety-text-content">
                    <Image source="checkMarkCircle" cssClass="m" />
                    <span>
                      <Typography
                        type="p"
                        text="Host up to 1000 Participants"
                        cssClass="p-20  m-b-0px variety-p"
                      />
                    </span>
                  </div>
                  <div className="variety-text-content">
                    <Image source="checkMarkCircle" cssClass="m" />
                    <span>
                      <Typography
                        type="p"
                        text="Advanced support options (Technical account manager, customer service manager, onboarding manager)"
                        cssClass="p-20  m-b-0px variety-p"
                      />
                    </span>
                  </div>

                  <div className="variety-text-content">
                    <Image source="checkMarkCircle" cssClass="m" />
                    <span>
                      <Typography
                        type="p"
                        text="Product Add-on"
                        cssClass="p-20  m-b-0px variety-p"
                      />
                    </span>
                  </div>

                  <div className="variety-text-content">
                    <Image source="checkMarkCircle" cssClass="m" />
                    <span>
                      <Typography
                        type="p"
                        text="Timbo on-promises in your own private cloud service"
                        cssClass="p-20  m-b-0px variety-p"
                      />
                    </span>
                  </div>

                  <div className="variety-text-content">
                    <Image source="checkMarkCircle" cssClass="m" />
                    <span>
                      <Typography
                        type="p"
                        text="2 GB cloud recording storage"
                        cssClass="p-20  m-b-0px variety-p"
                      />
                    </span>
                  </div>

                  <div className="variety-btn-div">
                    <Link
                      to="/signup-individual"
                      target="_blank"
                      className="link"
                    >
                      <Button
                        cssClass="btn-new transparent-light transparent-hover-primary radius-10px btn-size "
                        text="Get Started"
                      />
                    </Link>
                  </div>
                </div>
                <div className="variety-btn-div">
                  <Link
                    to="/auth/signup-individual"
                    target="_blank"
                    className="link"
                  >
                    <Button
                      cssClass="btn-new transparent-light transparent-hover-primary radius-10px btn-size "
                      text="Get Started"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* TIMBO CAN BE USED WITH */}
      <section className="section__timbo_used-with">
        <div className="center">
          <div className=" timbo_used-with-div">
            <Typography
              type="h3"
              text="Timbo Can be Used With"
              cssClass="head-27 text-center m-t-0px m-b-20px main-heading-second"
            />
            <Typography
              type="p"
              text="Timbo application can be integrated with various email clients like google gmail, microsoft outlook  and numerous cloud services like dropbox and google drive. "
              cssClass="p-20  m-b-30px keep-messages__sub-heading"
            />
            <div className="trusted-companies">
              <div className="trusted-company">
                <Image source="msOutlook" cssClass="m" />
              </div>
              <div className="trusted-company">
                <Image source="gCalendar" cssClass="m" />
              </div>
              <div className="trusted-company">
                <Image source="dropboxSvg" cssClass="m" />
              </div>
              <div className="trusted-company">
                <Image source="box" cssClass="m" />
              </div>
              <div className="trusted-company">
                <Image source="gRecycle" cssClass="m" />
              </div>
              <div className="trusted-company">
                <Image source="slack" cssClass="m" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* VIDEO CONFERENCING LIKE NEVER BEFORE */}
      <section className="section__video-conferencing">
        <div className="center">
          <div className="video-conferencing-div">
            <div className="video-conferencing-text-div">
              <Typography
                type="h3"
                text="Conferencing that’s Reimagined"
                cssClass="head-27 m-t-120px m-b-20px main-heading-second video-conferencing-heading"
              />
              <Typography
                type="p"
                text="Our ratings speak for us. Connect with teams, friends and family in a simpler, trustier way."
                cssClass="p-22  m-b-30px video-conferencing-paragraph"
              />
              <div className="video-conferencing-btn-div">
                <Link
                  to="/auth/signup-individual"
                  target="_blank"
                  className="link"
                >
                  <Button
                    // cssClass="btn btn--big btn--transparent-light radius-10px btn-size"
                    cssClass=" btn--big btn--transparent-light radius-10px btn-size"
                    text="Get Started for Free"
                  />
                </Link>
              </div>
            </div>
            <div className="video-conferencing-img-div">
              <Image source="happyCuteLady" cssClass="video-conferencing-img" />
            </div>
          </div>
        </div>
      </section>
      {/* FOOTER SECTION */}
      <Footer />
    </>
  );
};

export default Index;

import React, { useState, useEffect } from "react";
import TopNav from "./../../common/StaticPages/TopNav";
import Image from "./../../common/Image/Image";
import Typography from "../../common/Typography/Typography";
import Button from "../../common/Button/Button";
import { Switch } from "@material-ui/core";
import Footer from "./../../common/StaticPages/Footer";
import { Link } from "react-router-dom";
import paymentStore from "./../../../store/paymentStore";

interface Props {}

const Pricing: React.FC<Props> = () => {
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

  console.log(packages);

  return (
    <>
      <TopNav />

      {/* FLEXIBLE PRICING SECTION*/}
      <section className="section__flexible-pricing">
        <div className="center">
          <div className=" flexible-pricing-div">
            <Typography
              type="h3"
              text="Flexible Pricing Plans For Customers"
              cssClass="head-27 text-center m-t-100px  m-b-10px main-heading-second"
            />
            <Typography
              type="p"
              text="Based on market demand, we have created 3 packages that will
            cover all your business needs ."
              cssClass="p-20  m-b-100px flexible-pricing__sub-heading"
            />
            {/* SWITCH MONTHLY AND ANNUALLY */}
            <div className="m-b-100px switch-invisible">
              <Typography type="p" text="Monthly" cssClass="p-20  m-b-0px " />

              <Switch
                onChange={handleChange}
                color="primary"
                checked={checked}
                name="checked"
              />
              <Typography type="p" text="Annually" cssClass="p-20  m-b-0px " />
            </div>
            {/* END OF SWITCH MONTHLY AND ANNUALLY */}
            <div className="flexible-grid">
              {!isLoading &&
                packages.map((packageP: any, index: any) => (
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

                        {packageP.features.map((feature: any, i: any) => (
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

      {/* VIDEO CONFERENCING LIKE NEVER BEFORE */}
      <section className="section__video-conferencing">
        <div className="center">
          <div className="video-conferencing-div">
            <div className="video-conferencing-text-div">
              <Typography
                type="h3"
                text="Video Conferencing Like Never Before"
                cssClass="head-27 m-t-120px m-b-20px main-heading-second video-conferencing-heading"
              />
              <Typography
                type="p"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa ut nunc, nullam consectetur aliquet. A faucibus elementum duis mauris at turpis vel nunc. "
                cssClass="p-22  m-b-30px video-conferencing-paragraph"
              />
              <div className="video-conferencing-btn-div">
                <Link to="/signup-individual" target="_blank" className="link">
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

export default Pricing;

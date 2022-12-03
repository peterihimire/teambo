import React from "react";
import TopNav from "./../../common/StaticPages/TopNav";
import Image from "./../../common/Image/Image";
import Typography from "../../common/Typography/Typography";
import Button from "../../common/Button/Button";
import Footer from "./../../common/StaticPages/Footer";

interface Props {}

const ComingSoon: React.FC<Props> = () => {
  return (
    <>
      <TopNav />

      {/* <section className="section__frequently-asked-questions"> */}
      <section className="section__coming-soon">
        <div className="center">
          <div className=" text-center header_text-div">
            <Typography
              type="h1"
              text="Coming Soon!!!"
              cssClass="newheader__main-heading "
            />

            <Typography
              type="p"
              text="Join the waitlist of thousands of people across the globe looking to experience and explore 
              video conferencing like never before, available for dektop, mobile phones and tablets.
              "
              cssClass="newheader__sub-heading"
            />

            <form className="coming-form">
              <input
                type="email"
                placeholder="Email"
                className="coming-input"
              />

              <Button
                cssClass="btn-new btn-coming btn-primary  radius-10px "
                text="Join the waitlist"
                type="submit"
                // isLoading={isLoading}
              />
            </form>
          </div>

          <div className="coming-image-div text-center">
            <Image source="appImages" cssClass="coming-image " />
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <Footer />
    </>
  );
};

export default ComingSoon;

import React, { useState } from "react";
import TopNav from "./../../common/StaticPages/TopNav";
import Image from "./../../common/Image/Image";
import Typography from "../../common/Typography/Typography";
import Button from "../../common/Button/Button";
import Footer from "./../../common/StaticPages/Footer";
import { Link } from "react-router-dom";

// IMPORTED ZUSTAND FAQ-STORE
// import faqStore from "../../../store/faqStore";
// IMPORTED ZUSTAND TESTIMONY-STORE
import testimonyStore from "../../../store/testimonyStore";
// import Svg from "./../../common/Svg/Svg";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
// import "./styles.css";

// import Swiper core and required modules
import SwiperCore, { Pagination, Autoplay } from "swiper";

// install Swiper modules
SwiperCore.use([Pagination, Autoplay]);

interface Props {}

const Faq: React.FC<Props> = () => {
  // SETTING THE STATE FOR THE FAQ ACCORDION OPEN AND CLOSE
  const [expanded, setExpanded] = useState(true);
  const [expanded2, setExpanded2] = useState(false);
  const [expanded3, setExpanded3] = useState(false);

  // INITIALISING THE ZUSTAND STORE
  // const faQuestions = faqStore((state: any) => state["questions"]);
  // console.log(faQuestions);

  const testimonies = testimonyStore((state: any) => state["testimonies"]);
  console.log(testimonies);

  return (
    <>
      <TopNav />

      {/* FREQUENTLY ASKED QUESTIONS SECTION */}
      <section className="section__frequently-asked-questions">
        <div className="center">
          <div className=" timbo_used-with-div">
            <Typography
              type="p"
              text="We've got answers"
              cssClass="p-20  m-b-10px keep-messages__sub-heading got-answers-text"
            />

            <Typography
              type="h3"
              text="Frequently Asked Questions"
              cssClass="head-27 text-center m-t-0px m-b-30px main-heading-second"
            />
            {/* USING THE FAQ STORE HERE TO LOOP OVER ALL THE FAQs AUTOMATICALLY*/}
            <div className="frequently-asked">
              {/* {faQuestions.map((question: any, index: any) => {
                return (
                  <article className="question" key={question.id}>
                    <div className="question-header">
                      <h4
                        onClick={() => setExpanded(!expanded)}
                        className="question-title"
                      >
                        {question.title}
                      </h4>
                      <div
                        className="btnQ"
                        onClick={() => setExpanded(!expanded)}
                      >
                        {expanded ? (
                          <Image source="arrowDown" cssClass="m" />
                        ) : (
                          <Image source="arrowUp" cssClass="m" />
                        )}
                      </div>
                    </div>
                    {expanded && <p>{question.info}</p>}
                  </article>
                );
              })} */}

              {/* USING THE FAQ STORE HERE TO LOOP OVER ALL THE FAQs MANUALLY*/}
              <article className="question">
                <div className="question-header">
                  <h4
                    onClick={() => setExpanded(!expanded)}
                    className="question-title"
                  >
                    What devices does Timbo run on?
                  </h4>
                  <div className="btnQ" onClick={() => setExpanded(!expanded)}>
                    {expanded ? (
                      <Image source="arrowDown" cssClass="m" />
                    ) : (
                      <Image source="arrowUp" cssClass="m" />
                    )}
                  </div>
                </div>
                {expanded && (
                  <p>
                    Timbo is supported on devices running these operating
                    systems: ➢ iOS ➢ Android ➢ Windows
                  </p>
                )}
              </article>
              <article className="question">
                <div className="question-header">
                  <h4
                    onClick={() => setExpanded(!expanded2)}
                    className="question-title"
                  >
                    Where can I see my video recordings?
                  </h4>
                  <div
                    className="btnQ"
                    onClick={() => setExpanded2(!expanded2)}
                  >
                    {expanded2 ? (
                      <Image source="arrowDown" cssClass="m" />
                    ) : (
                      <Image source="arrowUp" cssClass="m" />
                    )}
                  </div>
                </div>
                {expanded2 && (
                  <p>
                    On the side menu of your dashboard, ➢ Tap the video icon ➢
                    You can choose to see only local recordings, or cloud, or
                    both.
                  </p>
                )}
              </article>
              <article className="question">
                <div className="question-header">
                  <h4
                    onClick={() => setExpanded3(!expanded3)}
                    className="question-title"
                  >
                    How do I schedule a meeting?
                  </h4>
                  <div
                    className="btnQ"
                    onClick={() => setExpanded3(!expanded3)}
                  >
                    {expanded3 ? (
                      <Image source="arrowDown" cssClass="m" />
                    ) : (
                      <Image source="arrowUp" cssClass="m" />
                    )}
                  </div>
                </div>
                {expanded3 && (
                  <p>
                    From your dashboard, ➢ Tap Schedule ➢ Enter the meeting
                    details, and add participants Click on Create New Event
                  </p>
                )}
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* MEET FROM ANYWHERE SECTION */}
      <section className="section__meet_from-anywhere-2">
        <div className="center">
          <div className=" meet_from-anywhere-2-div">
            <div className="meet_from-anywhere-2-text-div">
              <Typography
                type="h3"
                text="Got More Questions to Ask?"
                cssClass="head-27b  m-b-20px main-heading-second-b"
              />
              <Typography
                type="p"
                text="Feel free to drop us as call or message us , and one of our customer service will respond to you immediately."
                cssClass="p-24  m-b-30px meet_from-anywhere-2-sub-heading "
              />
              <div className="meet_from-anywhere-2-btn-div">
                <Link to="/contact" target="_blank" className="link">
                  <Button
                    // cssClass="btn btn--primary btn--big btn--primary-border btn-size radius-10px"
                    cssClass="btn-new  btn-primary  radius-10px btn-size m-r-20px"
                    text="Contact us"
                  />
                </Link>

                <Link to="/contact" target="_blank" className="link">
                  <Button
                    // cssClass="btn btn--big btn--transparent-dark radius-10px btn-size"
                    cssClass="btn-new transparent-dark radius-10px btn-size"
                    text="Give us a Call"
                  />
                </Link>
              </div>
            </div>
            <div className="meet_from-anywhere-2-img-div">
              <Image source="ladyDrip" cssClass="meet-anywhere-2-img" />
            </div>
          </div>
        </div>
      </section>

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

      {/* TIMBO TESTIMONIALS  SECTION*/}
      <section className="section__timbo-testimonials">
        <div className="timbo-testimonials-head">
          <Typography
            type="h3"
            text=" See what others are saying"
            cssClass="head-27-b text-center m-t-0px m-b-20px main-heading-second-b"
          />
        </div>
        <Swiper
          // slidesPerView={1}
          // centeredSlides={true}
          // spaceBetween={30}
          // pagination={{
          //   clickable: true,
          // }}
          // className="mySwiper swiperAdded"

          breakpoints={{
            200: { slidesPerView: 1 },
            500: { slidesPerView: 1 },
            700: { slidesPerView: 1 },
            900: { slidesPerView: 1 },
            1200: { slidesPerView: 2 },
            2500: { slidesPerView: 2 },
          }}
          loop
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          spaceBetween={0}
          // slidesPerView={2}
          centeredSlides={true}
          className={`swiper-wrapper slideWrapper`}
        >
          <SwiperSlide>
            <article className="timbo-card">
              <div className="timbo-content">
                <div className="timbo-round-blue"></div>
                <div className="timbo-content-text">
                  <p>
                    “far far away, in the galaxy, lies the only race left, the
                    people of karamara from UAR. Last specie of all living & non
                    living things about to go extinct. They possess so many
                    abilities with special interoperable blockchain mindset and
                    quantum computer thinking variables, but here comes their
                    king named Obinnapro”
                  </p>
                  <div className="star-icon-container">
                    <Image source="starIcon" cssClass="star-icon" />
                    <Image source="starIcon" cssClass="star-icon" />
                    <Image source="starIcon" cssClass="star-icon" />
                    <Image source="starIcon" cssClass="star-icon" />
                    <Image source="starIcon" cssClass="star-icon" />
                  </div>
                  <div className="timbo-b">Beatrice Joseph</div>
                </div>
              </div>
            </article>
          </SwiperSlide>

          <SwiperSlide>
            <article className="timbo-card">
              <div className="timbo-content">
                <div className="timbo-round-blue"></div>
                <div className="timbo-content-text">
                  <p>
                    “far far away, in the galaxy, lies the only race left, the
                    people of karamara from UAR. Last specie of all living & non
                    living things about to go extinct. They possess so many
                    abilities with special interoperable blockchain mindset and
                    quantum computer thinking variables, but here comes their
                    king named Obinnapro”
                  </p>
                  <div className="star-icon-container">
                    <Image source="starIcon" cssClass="star-icon" />
                    <Image source="starIcon" cssClass="star-icon" />
                    <Image source="starIcon" cssClass="star-icon" />
                    <Image source="starIcon" cssClass="star-icon" />
                    <Image source="starIcon" cssClass="star-icon" />
                  </div>
                  <div className="timbo-b">Josh Manny</div>
                </div>
              </div>
            </article>
          </SwiperSlide>

          <SwiperSlide>
            <article className="timbo-card">
              <div className="timbo-content">
                <div className="timbo-round-blue"></div>
                <div className="timbo-content-text">
                  <p>
                    “far far away, in the galaxy, lies the only race left, the
                    people of karamara from UAR. Last specie of all living & non
                    living things about to go extinct. They possess so many
                    abilities with special interoperable blockchain mindset and
                    quantum computer thinking variables, but here comes their
                    king named Obinnapro”
                  </p>
                  <div className="star-icon-container">
                    <Image source="starIcon" cssClass="star-icon" />
                    <Image source="starIcon" cssClass="star-icon" />
                    <Image source="starIcon" cssClass="star-icon" />
                    <Image source="starIcon" cssClass="star-icon" />
                    <Image source="starIcon" cssClass="star-icon" />
                  </div>
                  <div className="timbo-b">Heyden Princess</div>
                </div>
              </div>
            </article>
          </SwiperSlide>

          <SwiperSlide>
            <article className="timbo-card">
              <div className="timbo-content">
                <div className="timbo-round-blue"></div>
                <div className="timbo-content-text">
                  <p>
                    “far far away, in the galaxy, lies the only race left, the
                    people of karamara from UAR. Last specie of all living & non
                    living things about to go extinct. They possess so many
                    abilities with special interoperable blockchain mindset and
                    quantum computer thinking variables, but here comes their
                    king named Obinnapro”
                  </p>
                  <div className="star-icon-container">
                    <Image source="starIcon" cssClass="star-icon" />
                    <Image source="starIcon" cssClass="star-icon" />
                    <Image source="starIcon" cssClass="star-icon" />
                    <Image source="starIcon" cssClass="star-icon" />
                    <Image source="starIcon" cssClass="star-icon" />
                  </div>
                  <div className="timbo-b">Theo Bombay</div>
                </div>
              </div>
            </article>
          </SwiperSlide>

          <SwiperSlide>
            <article className="timbo-card">
              <div className="timbo-content">
                <div className="timbo-round-blue"></div>
                <div className="timbo-content-text">
                  <p>
                    “far far away, in the galaxy, lies the only race left, the
                    people of karamara from UAR. Last specie of all living & non
                    living things about to go extinct. They possess so many
                    abilities with special interoperable blockchain mindset and
                    quantum computer thinking variables, but here comes their
                    king named Obinnapro”
                  </p>
                  <div className="star-icon-container">
                    <Image source="starIcon" cssClass="star-icon" />
                    <Image source="starIcon" cssClass="star-icon" />
                    <Image source="starIcon" cssClass="star-icon" />
                    <Image source="starIcon" cssClass="star-icon" />
                    <Image source="starIcon" cssClass="star-icon" />
                  </div>
                  <div className="timbo-b">Queen Pullings</div>
                </div>
              </div>
            </article>
          </SwiperSlide>

          <SwiperSlide>
            <article className="timbo-card">
              <div className="timbo-content">
                <div className="timbo-round-blue"></div>
                <div className="timbo-content-text">
                  <p>
                    “far far away, in the galaxy, lies the only race left, the
                    people of karamara from UAR. Last specie of all living & non
                    living things about to go extinct. They possess so many
                    abilities with special interoperable blockchain mindset and
                    quantum computer thinking variables, but here comes their
                    king named Obinnapro”
                  </p>
                  <div className="star-icon-container">
                    <Image source="starIcon" cssClass="star-icon" />
                    <Image source="starIcon" cssClass="star-icon" />
                    <Image source="starIcon" cssClass="star-icon" />
                    <Image source="starIcon" cssClass="star-icon" />
                    <Image source="starIcon" cssClass="star-icon" />
                  </div>
                  <div className="timbo-b">Thomas Drey</div>
                </div>
              </div>
            </article>
          </SwiperSlide>
        </Swiper>
      </section>
      {/* FOOTER SECTION */}
      <Footer />
    </>
  );
};

export default Faq;

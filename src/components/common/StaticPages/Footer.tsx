import React from "react";
import Image from "./../Image/Image";
import { Link } from "react-router-dom";
// import Svg from "../Svg/Svg";

interface Props {}
const Footer: React.FC<Props> = () => {
  return (
    <footer className="footer_static-pages">
      <div className="center footer-main-content ">
        {/* <div className="footer-one-one visible-xs visible-md hidden-xl">
          <div className="footer-item">
            <p>Join the Waitlist</p>
            <div>
              <form className="footer-form">
                <input
                  type="email"
                  placeholder="Your email"
                  className="footer-input"
                />
                <button className=" footer-send-btn">
                  <Image source="flyPaper" cssClass="footer-send-icon" />
                </button>
              </form>
            </div>
          </div>
        </div> */}
        <div className="footer-content">
          <div className="footer-item">
            <div className="footer-logo">
              <Image source="newTimboLogo" />
            </div>
            <div className="footer-social-div">
              <div className="footer-social">
                <Image source="twitterWhite" />
              </div>
              <div className="footer-social">
                <Image source="facebookWhite" />
              </div>
              <div className="footer-social">
                <Image source="youtubeWhite" />
              </div>
              <div className="footer-social">
                <Image source="linkedinWhite" />
              </div>
            </div>
            {/* <div className="footer-text">
              <Link to="/terms-and-condition" className="link link--2">
                Terms & Condition{" "}
              </Link>
              <span>
                <Link to="/terms-and-condition" className="link link--2">
                  {" "}
                  Privacy Policy
                </Link>
              </span>
            </div> */}
          </div>
          <div className="footer-item">
            <p className="footer-item-p-color">Services</p>
            <ul>
              <li>
                {/* <a href="/">Conferencing</a> */}
                <Link to="/home" className="link link--2">
                  Conferencing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="link link--2">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-item">
            <p className="footer-item-p-color">Legal</p>
            <ul>
              <li>
                {/* <a href="/">Conferencing</a> */}
                <Link to="/terms-and-conditions" className="link link--2">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link to="" className="link link--2">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-item">
            <p className="footer-item-p-color">About</p>
            <ul>
              <li>
                <Link to="/faq" className="link link--2">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="link link--2">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* <div className="footer-one-one hidden-xs hidden-md visible-xl">
          <div className="footer-item">
            <p>Join the Waitlist</p>
            <div>
              <form className="footer-form">
                <input
                  type="email"
                  placeholder="Your email"
                  className="footer-input"
                />
                <button className=" footer-send-btn">
                  <Image source="flyPaper" cssClass="footer-send-icon" />
                </button>
              </form>
            </div>
          </div>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;

// import React from "react";
// import Image from "./../Image/Image";
// import { Link } from "react-router-dom";
// import Svg from "../Svg/Svg";

// interface Props {}
// const Footer: React.FC<Props> = () => {
//   return (
//     <footer className="footer_static-pages">
//       <div className="center nav_static-pages__container">
//         <Image source="iconWhite" />
//         <Link to="#" className="link link--2">
//           Support
//         </Link>
//         <Link to="#" className="link link--2">
//           Download
//         </Link>
//         <Link to="#" className="link link--2">
//           Pricing
//         </Link>

//         <Svg iconId="icon-futa" cssClass="icon-futa m-l-auto m-r-5px" />
//         <Svg iconId="icon-futa" cssClass="icon-futa m-r-5px" />
//         <Svg iconId="icon-futa" cssClass="icon-futa m-r-5px" />
//         <Svg iconId="icon-futa" cssClass="icon-futa" />
//       </div>
//     </footer>
//   );
// };

// export default Footer;

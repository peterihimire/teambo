import React, { useEffect, useState } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
// import Button from "../Button/Button";
import Image from "./../Image/Image";
import Backdrop from "./../Backdrop/Backdrop";
import SideDrawer from "./../SideDrawer/SideDrawer";
import auth from "./../../../services/authService";
import { userStore } from "./../../../store/userStore";

interface Props {
  // onClick: () => void;
  // show: any;
}
const TopNav: React.FC<Props> = () => {
  const [isColor, setIsColor] = useState(false);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const history = useHistory();
  const { user } = userStore();
  console.log(user);

  // LOGOUT LOGIC
  const logout = async () => {
    await auth.logout();
    history.push("/auth");
    history.go(0);
  };

  // CHANGES THE TOP NAV COLOR FROM TRANSPARENT TO SET-COLOR AT POSITION 120PX
  const navColorHandler: () => void = () => {
    let position = window.pageYOffset;
    // console.log(position);
    if (position > 50) {
      setIsColor(true);
    } else {
      setIsColor(false);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", () => {
      // console.log(window.scrollY);
      navColorHandler();
    });
  }, []);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };
  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  console.log(auth);

  // USER-IS-LOGGED-IN CHECKER BOOLEAN
  const userLoggedIn = user.authenticated;
  console.log(userLoggedIn);

  return (
    <>
      <div className="hidden-xs visible-xl hidden-md">
        <nav
          className={
            isColor ? "nav_static-pages nav-color  " : "nav_static-pages"
          }
        >
          <div className="center nav_static-pages__container">
            <NavLink to="/home">
              <Image source="newTimboLogo" />
            </NavLink>
            <NavLink
              to="/home"
              className="link link--2"
              activeClassName="navlink-active"
            >
              Home
            </NavLink>
            <NavLink
              to="/pricing"
              className="link link--2"
              activeClassName="navlink-active"
            >
              Pricing
            </NavLink>
            <NavLink
              to="/faq"
              className="link link--2"
              activeClassName="navlink-active"
              // className="link link--2"
              // activeClass="navlink-active"
              // to="faq-section"
              // to="pricing#faq-section"
              // spy={true}
              // smooth={true}
              // duration={500}
              // offset={-70}
            >
              FAQs
            </NavLink>
           
            <NavLink
              to="/contact"
              className="link link--2"
              activeClassName="navlink-active"
            >
              Talk to Us
            </NavLink>

            {!userLoggedIn && (
              <NavLink
                to="/auth/signin"
                className="link link--2 m-l-auto"
                activeClassName="navlink-active"
              >
                Log In
              </NavLink>
            )}

            {userLoggedIn && (
              <NavLink
                to="#"
                className="link link--2 m-l-auto"
                activeClassName=""
              >
                <div className="signup-btn" onClick={logout}>
                  {" "}
                  Log Out
                </div>
              </NavLink>
            )}

            {!userLoggedIn && (
              <NavLink
                to="/auth/signup-individual"
                className="link link--2"
                activeClassName="navlink-active"
              >
                <div className="signup-btn"> Sign Up</div>
              </NavLink>
            )}
         
            <NavLink
              to="/coming-soon"
              className="btn btn--green btn--medium-big radius-10px"
              // className="link link--2"
              // activeClassName="navlink-active"
            >
              <div className=""> Download Now</div>
            </NavLink>
          </div>
        </nav>
      </div>

      {/* FOR PHONES AND TABLET */}
      <div className="hidden-xl visible-xs visible-md">
        {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
        <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
          {/* <NavLinksMob /> */}
          <div className="side-nav-links">
            <div className="side-nav-logo">
              <NavLink to="/home">
                <Image source="newTimboLogo" />
              </NavLink>
            </div>

            <NavLink
              to="/home"
              className="link link--2 side-nav-link"
              activeClassName="navlink-active"
            >
              <div className="single-nav-link-div">Home</div>
            </NavLink>
            <NavLink
              to="/pricing"
              className="link link--2 side-nav-link"
              activeClassName="navlink-active"
            >
              <div className="single-nav-link-div">Pricing</div>
            </NavLink>
            <NavLink
              to="/faq"
              className="link link--2 side-nav-link"
              activeClassName="navlink-active"
            >
              <div className="single-nav-link-div">FAQs</div>
            </NavLink>
          
            <NavLink
              to="/contact"
              className="link link--2 side-nav-link"
              activeClassName="navlink-active"
            >
              <div className="single-nav-link-div">Talk to us</div>
            </NavLink>
            {!userLoggedIn && (
              <NavLink
                to="/auth/signin"
                className="link link--2 side-nav-link"
                activeClassName="navlink-active"
              >
                <div className="single-nav-link-div">Log In</div>
              </NavLink>
            )}
            {userLoggedIn && (
              <NavLink
                to="#"
                className="link link--2 side-nav-link"
                activeClassName="navlink-active"
                onClick={logout}
              >
                <div className="single-nav-link-div signup-bg">Log Out</div>
              </NavLink>
            )}
            {!userLoggedIn && (
              <NavLink
                to="/auth/signup-individual"
                className="link link--2 side-nav-link"
                activeClassName="navlink-active"
              >
                <div className="single-nav-link-div signup-bg">Sign Up</div>
              </NavLink>
            )}
            <Link to="/coming-soon" className="link link--2 side-nav-link ">
              <div className="single-nav-link-div download-bg">
                Download Now
              </div>
            </Link>

            <div className="side-nav-footer"></div>
            {/* <Button
              cssClass="btn btn--green btn--small radius-10px"
              text="Download Now"
            /> */}
          </div>
        </SideDrawer>
        <nav className={isColor ? "navbar nav-color  " : "navbar"}>
          <div className="navbar-container">
            <div
              className={isColor ? "navbar-main navbar-padding" : "navbar-main"}
            >
              <div className="navbar-head">
                <div className="navbar-logo-div">
                  <NavLink to="/home">
                    <Image source="newTimboLogo" />
                  </NavLink>
                </div>
              </div>
              {/* <NavLinks scrollColor={isColor} /> */}
              <button
                className="navbar-btn"
                type="button"
                onClick={openDrawerHandler}
              >
                <Image source="menuIcon" />
              </button>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default TopNav;

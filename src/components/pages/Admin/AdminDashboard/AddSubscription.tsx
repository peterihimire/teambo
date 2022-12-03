import React, { useState } from "react";
import Typography from "../../../common/Typography/Typography";
//import * as yup from "yup";
import Button from "../../../common/Button/Button";
import subscription from "../../../../services/subscription";
import { ToastContainer, toast } from "react-toastify";

interface Props {
  displayModal: any;
  closeModal: any;
  ad: string;
}

const AddSubscription: React.FC<Props> = (props) => {
  const [inputValues, setInputValues] = useState({
    title: "",
    interval: "MONTHLY",
    price: 0,
    percentage: 20,
    features: ["10gb Space", "Up to 30 participants", "Unlimited call minute"],
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "price") {
      setInputValues({ ...inputValues, [name]: parseFloat(value) });
    } else {
      setInputValues({ ...inputValues, [name]: value });
    }
  };
  const handleChanges = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  const divStyle = {
    display: props.displayModal ? "block" : "none",
  };
  const submit = () => {
    console.log("ho");
    (async () => {
      await subscription
        .createplan(inputValues)
        .then(({ data }) => {
          toast.success("added successfuly", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .catch((ex) => {
          if (ex.response && ex.response.status === 401) {
            toast.error(ex.response.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        });
    })();
  };

  return (
    <div className="modals" onClick={props.closeModal} style={divStyle}>
      <ToastContainer />
      <div className="modalsabt" onClick={(e) => e.stopPropagation()}>
        <Typography text="Add new subscription" type="h3" cssClass="head-22" />
        <hr
          style={{
            width: "62%",
            color: "#4C6FFF",
            marginTop: "0.5em",
            marginBottom: "0.5em",
          }}
        />

        <Typography
          text="Susbcription Information"
          type="h5"
          cssClass="head-21"
        />
        <br></br>

        <form>
          <br></br>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Title"
            name="title"
          />

          <div className="twos">
            <div>
              <select onChange={handleChanges} name="interval">
                <option>Monthly</option>
                <option>Yearly</option>
              </select>
            </div>
            <div>
              <input
                type="number"
                onChange={handleChange}
                placeholder="Price"
                name="price"
              />
            </div>
          </div>

          <textarea name="description" placeholder="Description"></textarea>

          <br></br>
          <br></br>
          <hr
            style={{ color: "#E7EBFD", background: "#E7EBFD", height: "1px" }}
          />
          <br></br>

          <div
            className="admin-settings__general-info"
            style={{ width: "100%" }}
          >
            <div style={{ width: "100%" }} className="checker">
              <label className="container">
                <Typography
                  type="p"
                  text="Allow up to 200 guests"
                  cssClass="p-14"
                />

                <input type="checkbox" checked />
                <span className="checkmark"></span>
              </label>
              <label className="container" style={{ width: "100%" }}>
                <Typography
                  type="p"
                  text="Allow up to 5 hours video call"
                  cssClass="p-14"
                />

                <input type="checkbox" checked />
                <span className="checkmark"></span>
              </label>

              <label className="container">
                <Typography
                  type="p"
                  text="Allow up to 100 scheduled meetings"
                  cssClass="p-14"
                />

                <input type="checkbox" checked />
                <span className="checkmark"></span>
              </label>
              <label className="container">
                <Typography
                  type="p"
                  text="Allow up to 20gb cloud space"
                  cssClass="p-14"
                />

                <input type="checkbox" checked />
                <span className="checkmark"></span>
              </label>
            </div>
            <div></div>
          </div>
          <div style={{ width: "100%" }}>
            <Button
              cssClass="btn btn--primary btn--xxsmall btn-icon-n-text radius-6px"
              withIcon={true}
              iconClass="icon-plus-white m-r-10px"
              btnIcon="icon-plus-white"
              text="Add New"
              handleClick={() => submit()}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddSubscription;

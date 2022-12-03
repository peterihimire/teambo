import React, { useState, useEffect } from "react";
import Typography from "../../../../common/Typography/Typography";
import Button from "../../../../common/Button/Button";
import subscription from "../../../../../services/subscription";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

interface Props {}
const GeneralInfos: React.FC<Props> = () => {
  const [details, setDetails] = useState<any>();
  const [Message, setMessage] = useState<any>([]);
  const { id, uid } = useParams<{ id: any; uid: any }>();
  const [inputValues, setInputValues] = useState({
    reply_to: `${id ? id : ""}`,

    text: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  const getMessages = () => {
    (async () => {
      await subscription
        .gmessage(uid)
        .then(({ data }) => {
          //console.log("ant" + JSON.stringify(data.data));
          setMessage(data);
          //setfeatures(data.data.features);
        })
        .catch((ex) => {
          if (ex.response && ex.response.status === 401) {
          }
        });
    })();
  };

  useEffect(() => {
    (async () => {
      await subscription
        .gticket(uid)
        .then(({ data }) => {
          //console.log("ant" + JSON.stringify(data.data));
          setDetails(data);
          //setfeatures(data.data.features);
        })
        .catch((ex) => {
          if (ex.response && ex.response.status === 401) {
          }
        });
    })();
    (async () => {
      await subscription
        .gmessage(uid)
        .then(({ data }) => {
          //console.log("ant" + JSON.stringify(data.data));
          setMessage(data);
          //setfeatures(data.data.features);
        })
        .catch((ex) => {
          if (ex.response && ex.response.status === 401) {
          }
        });
    })();
    return () => {
      console.log("hi"); // 👍
    };
  });
  const submit = () => {
    console.log("ho");
    (async () => {
      await subscription
        .cticket(inputValues, uid)
        .then(({ data }) => {
          getMessages();
          setInputValues({ ...inputValues, text: "" });
          toast.success("message sent", {
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
  const dater = (dates: any) => {
    var date: Date = new Date(dates);

    return date.toLocaleString();
  };
  return (
    <div>
      <ToastContainer />
      <div className="portions">
        <div className="left-portion">
          <div className="sides active">
            <div>
              <Typography
                type="p"
                text={details ? details.title : ""}
                cssClass="p-15"
              />
              <Typography
                type="p"
                text={details ? details.id : ""}
                cssClass="p-14 m-b-5px"
              />
            </div>
            <div className="poison darkp"></div>
          </div>
          {/*
          <div className="sides ">
            <div>
              <Typography
                type="p"
                text="i can`t recover my password"
                cssClass="p-15"
              />
              <Typography type="p" text="653518" cssClass="p-14 m-b-5px" />
            </div>
            <div className="poison lightp"></div>
          </div>
        */}
        </div>
        <div className="right-portion">
          <Typography
            type="p"
            text={dater(details ? details.created_at : null)}
            cssClass="p-14 m-b-5px"
          />

          <Typography
            type="p"
            text={details ? details.title : ""}
            cssClass="p-25"
          />

          <Typography
            type="p"
            text={details ? details.description : ""}
            cssClass="p-15"
          />
          <br></br>
          {Message &&
            Message.map((data: any, key: 0) => (
              <>
                <Typography
                  type="p"
                  text={dater(data ? data.created_at : null)}
                  cssClass="p-14 m-b-5px"
                />

                <Typography
                  type="p"
                  text={data ? data.text : ""}
                  cssClass="p-15"
                />
              </>
            ))}
          <br></br>
          <div>
            <textarea onChange={handleChange} name="text"></textarea>
            <Button
              cssClass="btn btn--primary btn--xxsmall btn-icon-n-text radius-6px"
              withIcon={false}
              iconClass="icon-plus-white m-r-10px"
              btnIcon="icon-plus-white"
              text="Reply"
              handleClick={() => submit()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralInfos;

import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import userService from "../../../../../services/userService";
import { userStore } from "../../../../../store/userStore";
import { Button, Input } from "../../../../common";
import Select from "../../../../common/Input/Select";
import Typography from "../../../../common/Typography/Typography";
import isEmpty from "is-empty";

interface Props {}
const GeneralInfo: React.FC<Props> = () => {
  const fields = [
    { name: "firstname", title: "First Name" },
    { name: "lastname", title: "Last Name" },
    { name: "username", title: "Username" },
    { name: "phonenumber", title: "Phone number" },
    { name: "country", title: "Country" },
    { name: "gender", title: "Gender" },
  ];
  return (
    <div>
      {fields.map((field, idx) => (
        <SettingsItem key={idx} name={field.name} title={field.title} />
      ))}
    </div>
  );
};

interface SettingsItemProps {
  name: string;
  title: string;
}
const SettingsItem: React.FC<SettingsItemProps> = ({ name, title }) => {
  const data: any = {
    country: userStore.getState().user.country,
    firstname: userStore.getState().user.firstname,
    lastname: userStore.getState().user.lastname,
    username: userStore.getState().user.username,
    gender: userStore.getState().user.gender,
    theme: userStore.getState().user.theme,
    phonenumber: userStore.getState().user.phonenumber,
  };

  // const data: any = userStore((state) => state.user);

  const [editing, setEditing] = useState<boolean>(false);
  const [entry, setEntry] = useState(data[name]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setLoading(true);
    const f_data = {
      [name]: entry,
    };
    userService
      .update(f_data)
      .then((response) => {
        userStore.setState((prev: any) => ({
          ...prev,
          user: { ...prev.user, ...f_data },
        }));
        toast.success("Updated successfully");
        setEditing(false);
        setLoading(false);
      })
      .catch((err: any) => {
        console.log(err.response);
        if (!!err.response) {
          toast.error(err.response.data.message);
        }
        toast.error(`Error updating ${title}`);
        setLoading(false);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="admin-settings__general-info">
        <div>
          <Typography type="p" text={title} cssClass="p-15 m-b-5px" />
          {editing ? (
            <div>
              <form onSubmit={handleSubmit}>
                <section style={{ width: 300 }}>
                  {name === "gender" ? (
                    <Select
                      name="gender"
                      options={["MALE", "FEMALE"]}
                      value={!isEmpty(data.gender) ? entry : ""}
                      handleChange={(e: any) => setEntry(e.target.value)}
                    />
                  ) : (
                    <Input
                      name={name}
                      placeholder={title}
                      type="text"
                      value={!isEmpty(data[name]) ? entry : ""}
                      onChange={(e) => setEntry(e.target.value)}
                      required
                    />
                  )}
                </section>

                <div className="flex-r">
                  <Button
                    cssClass="btn btn--danger btn--xxsmall btn-icon-n-text radius-7px m-r-15px"
                    text="Cancel"
                    type="button"
                    handleClick={() => {
                      setEntry(data[name]);
                      setEditing(false);
                    }}
                  />

                  <Button
                    cssClass="btn btn--primary btn--xxsmall btn-icon-n-text radius-7px"
                    text={loading ? "Saving" : "Save"}
                    type="submit"
                    isLoading={loading}
                    disable={loading}
                  />
                </div>
              </form>
            </div>
          ) : (
            <Typography
              type="p"
              text={!isEmpty(data[name]) ? entry : "NIL"}
              cssClass="p-16"
            />
          )}
        </div>
        {!editing && (
          <Typography type="span" cssClass="p-17 pointer">
            <span onClick={() => setEditing(true)}>Edit</span>
          </Typography>
        )}
      </div>
    </>
  );
};

export default GeneralInfo;

import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import roleService from "../../../../../services/roleService";
import adminRolesStore from "../../../../../store/adminRolesStore";
import { Input, ModalChild, ModalLayout, Typography } from "../../../../common";
import Button from "../../../../common/Button/Button";
import Select from "../../../../common/Input/Select";

interface AddRoleModalProps {}
const AdminUserAddRoleModal: React.FC<AddRoleModalProps> = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [details, setDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role: "",
  });

  const handleChange = (e: any) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setLoading(true);

    roleService
      .addAdminUser(details)
      .then((response) => {
        setShowModal(false);
        setDetails({
          firstname: "",
          lastname: "",
          email: "",
          role: "",
        });
        toast.success("Added admin user successfully");
        setLoading(false);
      })
      .catch((error) => {
        if (!!error.response) {
          console.log(error.response);
          toast.error(error.response.data.message);
        } else {
          toast.error("An error occured");
        }
        setLoading(false);
      });
  };

  return (
    <>
      <Button
        cssClass="btn btn--primary btn--xxsmall btn-icon-n-text m-l-10px radius-7px"
        withIcon={true}
        iconClass="icon-plus-white m-r-10px"
        btnIcon="icon-plus-white"
        text="Add Role"
        handleClick={() => setShowModal(true)}
      />

      {showModal && (
        <ModalLayout>
          <ModalChild padding="3rem 3rem 3rem">
            <section className="flex-r-aicenter m-b-20px">
              <Button
                cssClass="btn btn--xxsmall flex-r-jccenter-aicenter m-r-10px"
                icon="icon-arrow-back"
                iconClass="icon-plus-white"
                handleClick={() => setShowModal(false)}
              />

              <Typography type="h2" text="Add new admin user" />
            </section>

            <form onSubmit={handleSubmit} className="custom-input-container">
              <section className="flex-r-jcbetween-aicenter m-t-50px">
                <div className="m-r-20px" style={{ flex: 1 }}>
                  <Input
                    name="firstname"
                    placeholder="First Name"
                    type="text"
                    label="First Name"
                    value={details.firstname}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <Input
                    name="lastname"
                    placeholder="Last name"
                    type="text"
                    label="Last name"
                    value={details.lastname}
                    onChange={handleChange}
                    required
                  />
                </div>
              </section>
              <section>
                <Input
                  name="email"
                  placeholder="Email"
                  type="text"
                  label="Email"
                  value={details.email}
                  onChange={handleChange}
                  required
                />
              </section>
              <section>
                <Select
                  name="role"
                  placeholder="--Select Role--"
                  options={Array.from(
                    adminRolesStore.getState().roles,
                    (roles: any) => ({ value: roles.uid, label: roles.title })
                  )}
                  cssClass="type-2"
                  value={details.role}
                  handleChange={handleChange}
                />
              </section>

              <Button
                cssClass="btn btn--primary btn--big btn-icon-n-text radius-7px row flex-r-jccenter-aicenter"
                text="Add New"
                iconClass="icon-plus-white"
                btnIcon="icon-plus-white"
                withIcon={true}
                type="submit"
                isLoading={loading}
                disable={loading}
              />
            </form>
          </ModalChild>
        </ModalLayout>
      )}
      <ToastContainer />
    </>
  );
};

export default AdminUserAddRoleModal;

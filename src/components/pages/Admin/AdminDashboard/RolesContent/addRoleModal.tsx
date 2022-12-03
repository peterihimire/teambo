import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import roleService from "../../../../../services/roleService";
import adminRolesStore from "../../../../../store/adminRolesStore";
import {
  Input,
  ModalChild,
  ModalLayout,
  Textarea,
  Typography,
} from "../../../../common";
import Button from "../../../../common/Button/Button";
import Select from "../../../../common/Input/Select";

interface AddRoleModalProps {}
const AddRoleModal: React.FC<AddRoleModalProps> = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [details, setDetails] = useState({
    title: "",
    accronym: "",
    description: "",
    permissions: [],
  });

  const handleChange = (e: any) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setLoading(true);

    roleService
      .addRole(details)
      .then((response) => {
        setShowModal(false);
        // setDetails({
        //   title: "",
        //   accronym: "",
        //   description: "",
        //   permissions: [],
        // });
        const newRole = { ...details, updated_at: Date.now() };
        adminRolesStore.setState((prev: any) => ({
          ...prev,
          roles: [...prev.roles, newRole],
        }));
        toast.success("Added role successfully");
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
        text="Add New"
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

              <Typography type="h2" text="Add role" />
            </section>

            <form onSubmit={handleSubmit} className="custom-input-container">
              <section className="flex-r-jcbetween-aicenter m-t-50px">
                <div className="m-r-20px" style={{ flex: 1 }}>
                  <Input
                    name="title"
                    placeholder="Title"
                    type="text"
                    label="Title"
                    value={details.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <Input
                    name="accronym"
                    placeholder="Accronym"
                    type="text"
                    label="Accronym"
                    value={details.accronym}
                    onChange={handleChange}
                    required
                  />
                </div>
              </section>
              <section>
                <Select
                  name="role"
                  placeholder="--Privileges--"
                  options={adminRolesStore.getState().privileges}
                  cssClass="type-2 multiple_select_with_options"
                  values={details.permissions}
                  handleChange={(e) => {
                    const value: Array<any> = Array.from(
                      e.target.selectedOptions,
                      (option: any) => option.value
                    );
                    setDetails((prev: any) => ({
                      ...prev,
                      permissions: value,
                    }));
                  }}
                  multiple={true}
                />
              </section>
              <section>
                <Textarea
                  name="description"
                  placeholder="Description"
                  label="Description"
                  value={details.description}
                  onChange={handleChange}
                  required
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

export default AddRoleModal;

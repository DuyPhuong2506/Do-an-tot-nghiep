import React, { useState } from "react";
import "./style.scss";
import { Form, Tabs, Input, Upload, Button, Radio, DatePicker } from "antd";

import { ToolOutlined } from "@ant-design/icons";
import SettingModal from "./SettingModal";
import UploadModal from "./UploadModal";
import { apiClient } from "../../Services";
import { alertErrors, alertSuccess } from "../../Contains/Config";
import ImgCrop from "antd-img-crop";
import { BASE_URL_IMAGE } from "../../Contains/ConfigURL";
const { TabPane } = Tabs;
const Resume = (props) => {
  const [form] = Form.useForm();
  let [validate, setValidate] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  let [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);



  //   update profile
  const handleClickSave = () => {
    let data = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      address: address,
    };
    apiClient.fetchApiUpdateProfile(data).then((res) => {
      alertSuccess("Chỉnh sửa thông tin thành công!", 2000);
      window.location.replace("/admin");
    });
  };
  const handleChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };
  const handleChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  const showModalSetting = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  //   change password
  const handleSubmit = (values) => {
    setLoading(true);
    let data = {
      password: values.currentPassword,
      newPassword: values.newPassword,
      configPassword: values.checkPassword,
    };

    apiClient
      .fetchApiChangePassword(data)
      .then((res) => {
        alertSuccess("Change Password for Success.", 2000);
      })
      .catch((e) => {
        setLoading(false);
        alertErrors("Change Password FOR Fail.");
      });
    form.resetFields();
  };
// upload avt

  const onChange = (file, id) => {
    // setFileList(newFileList);
    const formData = new FormData();
    formData.append("file", file);
    console.log(id, formData);
    apiClient.fetchApiUpdateAvt(id, formData)
    .then((res) => {
      if (res) {
        alertSuccess("Cập nhật thành công.");
      } else {
        // throw Exception("Không có tài khoản.")
        alertErrors("Vui lòng thử lại.");
      }
    });
  };
  const onPreview = async (file) => {
    let src = file.url;
    const image = new Image();
    image.src = src;
  };
  return (
    <>
      <div className="about__me">
        <div className="header__about">
          <div className="avatar__me">
            <img
              src={
                props.infoUser.urlAvatar
                  ? BASE_URL_IMAGE + "/" + props.infoUser.urlAvatar
                  : ""
              }
            />
            
          </div>
          <div className="user_name">
            <h6 className="name">
              {props.infoUser.firstName + " " + props.infoUser.lastName}
            </h6>
          </div>
        </div>
        <hr />
        <div className="body__about">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Thông tin và Hồ sơ" key="1">
              <div className="contact__list_wrapper">
                <div className="contact__list_name">
                  <h4>Thông tin liên hệ</h4>
                </div>
                <div className="contact__list_button">
                  <Button
                    onClick={showModalSetting}
                    type="primary"
                    icon={<ToolOutlined />}
                  ></Button>
                  <SettingModal
                    handleClickSave={handleClickSave}
                    handleChangeFirstName={handleChangeFirstName}
                    handleChangeLastName={handleChangeLastName}
                    handleChangeAddress={handleChangeAddress}
                    handleChangePhoneNumber={handleChangePhoneNumber}
                    handleOk={handleOk}
                    handleCancel={handleCancel}
                    isModalVisible={isModalVisible}
                  />
                </div>
              </div>
              <div className="contact__list">
                <div className="left__list">
                  <ul>
                    <li className="item_content">
                      <span className="key_name">Địa chỉ:</span>
                      <span className="value_name">
                        {props.infoUser.address}
                      </span>
                    </li>
                    <li className="item_content">
                      <span className="key_name">Email:</span>
                      <span className="value_name">{props.infoUser.email}</span>
                    </li>
                    <li className="item_content">
                      <span className="key_name">Phone:</span>
                      <span className="value_name">
                        {props.infoUser.phoneNumber}
                      </span>
                    </li>
                    <li className="item_content">
                      <span className="key_name">Địa chỉ Token:</span>
                      <span className="value_name">
                        {props.infoUser.userName}
                      </span>
                    </li>

                    <li className="social__client"></li>
                  </ul>
                </div>
                <div className="right__list"></div>
              </div>
            </TabPane>
            <TabPane tab="Hiển thị" key="2">
              <div className="main-avatar">
          
                <ImgCrop rotate>
                  <Upload
                    listType="picture-card"
                    beforeUpload={(file) => onChange(file, props.infoUser.id)}
                    onPreview={onPreview}
                  >
                    {fileList.length < 1 && "+ Upload"}
                  </Upload>
                </ImgCrop>
              </div>
            </TabPane>
            <TabPane tab="Cài đặt tài khoản" key="3">
              <div className="account-setting">
                <div className="description">
                  <p>
                    Đây là tài khoản Atlassian. Chỉnh sửa thông tin cá nhân và
                    cài đặt hiển thị của bạn thông qua{" "}
                    <a style={{ color: "#026dc4" }}>Hồ sơ Atlassian.</a>
                  </p>
                  <p>
                    Để tìm hiểu thêm, vui lòng xem{" "}
                    <a style={{ color: "#026dc4" }}>Điều khoản dịch vụ</a> hoặc{" "}
                    <a style={{ color: "#026dc4" }}>Chính sách Riêng tư.</a>
                  </p>
                </div>
                <hr style={{ height: 1 }} />
                <h4>Chi tiết tài khoản</h4>
                <hr
                  style={{
                    height: 1,
                  }}
                />
                <a href="#">Thay đổi ngôn ngữ ↗ </a>
                <hr style={{ height: 1 }} />
                <div className="main-pass-input">
                  <h5>Thay đổi mật khẩu</h5>
                  <Form
                    name="basic"
                    labelCol={{
                      span: 24,
                    }}
                    wrapperCol={{
                      span: 24,
                    }}
                    initialValues={{
                      remember: false,
                    }}
                    form={form}
                    onFinish={handleSubmit}
                  >
                    <Form.Item
                      label="Current Password:"
                      name="currentPassword"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                        {
                          min: 6,
                          message: "Password less than 6 characters ",
                        },
                      ]}
                      style={{ marginBottom: "20px" }}
                    >
                      <Input.Password placeholder="Enter password" />
                    </Form.Item>

                    <Form.Item
                      label="New Password"
                      name="newPassword"
                      dependencies={["currentPassword"]}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                        {
                          min: 6,
                          message: "Password less than 6 characters ",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (
                              !value ||
                              getFieldValue("currentPassword") !== value
                            ) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error(
                                "Password not same with Current Password"
                              )
                            );
                          },
                        }),
                      ]}
                      style={{ marginBottom: "20px" }}
                    >
                      <Input.Password placeholder="Enter password" />
                    </Form.Item>

                    <Form.Item
                      label="Confirm Password"
                      name="checkPassword"
                      dependencies={["newPassword"]}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: "Please confirm your password!",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (
                              !value ||
                              getFieldValue("newPassword") === value
                            ) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error(
                                "The two passwords that you entered do not match!"
                              )
                            );
                          },
                        }),
                      ]}
                      style={{ marginBottom: "20px" }}
                    >
                      <Input.Password placeholder="Comfirm with password" />
                    </Form.Item>

                    <Form.Item
                      wrapperCol={{
                        offset: 0,
                        span: 24,
                      }}
                    >
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: "100%", padding: "5px 0" }}
                      >
                        Update Password
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Resume;

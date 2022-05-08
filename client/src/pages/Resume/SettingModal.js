import { Modal, Input, Button } from "antd";
import React from "react";

function SettingModal({
  handleClickSave,
  handleOk,
  handleCancel,
  isModalVisible,
  handleChangeAddress,
  handleChangeFirstName,
  handleChangePhoneNumber,
  handleChangeLastName,
}) {
  return (
    <div>
      <Modal
        title="Chỉnh sửa thông tin cá nhân"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        Họ
        <Input onChange={handleChangeFirstName} />
        Tên
        <Input onChange={handleChangeLastName} />
        Số điện thoại
        <Input onChange={handleChangePhoneNumber} />
        Địa chỉ
        <Input onChange={handleChangeAddress} />
        <Button
          style={{ marginTop: 10 }}
          onClick={handleClickSave}
          type="primary"
        >
          {" "}
          Lưu
        </Button>
      </Modal>
    </div>
  );
}

export default SettingModal;

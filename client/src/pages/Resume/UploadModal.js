import { Modal, Input, Button } from "antd";
import React from "react";

function SettingModal({
  handleClickSave,
  handleOk,
  handleCancel,
  isModalVisible,
  handleUploadAvt,
  handleFileSelect
}) {

  return (
    <div>
      <Modal
        title="Chỉnh sửa thông tin cá nhân"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form onSubmit={handleUploadAvt}>
          <input type="file" onChange={handleFileSelect} />
          <input type="submit" value="Upload File" />
        </form>
      </Modal>
    </div>
  );
}

export default SettingModal;

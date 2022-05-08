import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  HashRouter,
} from "react-router-dom";
import ImgCrop from "antd-img-crop";
import { Upload } from "antd";
import { Button } from "antd";
import { alertErrors, alertSuccess } from "../../Contains/Config";
import { apiClient } from "../../Services";

const ProductItMe = (props) => {
  const [fileList, setFileList] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:5000/api/Products/MyProducts", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("token"),
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const onChange = (file, id) => {
    // setFileList(newFileList);
    const formData = new FormData();
    formData.append("file", file);

    apiClient.fetchApiUpdateImage(id, formData).then((res) => {
      if (res) {
        // window.location.replace("/admin");
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
    <div class="col-lg-12">
      <div class="card">
        <div class="card-body">
          <div className="card-header d-flex justify-content-between">
            <div className="card-title-wrapper">
              <h5 class="card-title">Danh Sách Sản Phẩm</h5>
            </div>
            <div className="card-button" style={{ float : 'right' }}>
              <Link to={"/tao-san-pham"} type="primary">
                <Button>Tạo Sản Phẩm</Button>
              </Link>
            </div>
          </div>

          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Tên</th>
                  <th scope="col">Giá</th>
                  <th scope="col">Trạng thái</th>
                  <th scope="col">Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 &&
                  data.map((anObjectMapped, index) => {
                    return (
                      <tr key={anObjectMapped.id}>
                        {/* <th scope="row">{anObjectMapped.productCount}</th> */}
                        <td>{index + 1}</td>
                        <td>
                          <a
                            style={{ color: " black", textDecoration: "none" }}
                            href={
                              "https://localhost:5000" +
                              anObjectMapped.pictureUrl
                            }
                            target="_blank"
                          >
                            {anObjectMapped.name}
                          </a>
                        </td>
                        <td>{anObjectMapped.price} Token</td>
                        <td>{anObjectMapped.isBuy ? "Đã bán" : "Chưa bán"}</td>
                        <td>
                          <img />
                          <ImgCrop rotate>
                            <Upload
                              listType="picture-card"
                              beforeUpload={(file) =>
                                onChange(file, anObjectMapped.id)
                              }
                              onPreview={onPreview}
                            >
                              {fileList.length < 1 && "+ Upload"}
                            </Upload>
                          </ImgCrop>
                        </td>
                      </tr>
                    );
                    // console.log(productCount)
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItMe;

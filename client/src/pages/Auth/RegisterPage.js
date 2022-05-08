import React, { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import imgs from './../../assets/images/logo-icon.png'
import { apiClient } from "../../Services";
import { alertSuccess } from "../../Contains/Config";
import { grImage } from "../../Import/Images";

const Register = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = event => {
        event.preventDefault();

        const user = {
            'id': props.account,
            'firstName': firstName,
            'lastName': lastName,
            'password': password,
            "contractAddress": props.contractAddress
        };
        apiClient.fetchApiRegister(user)
            .then(res => {
                alertSuccess('Tạo tài khoản thành công.')
                window.location.assign("/");
            })
            .catch(err => {
                setError('Tài khoản của quý khách đã tồn tại.');
            })
    }

    return (
        <body class="" style={{ background : 'gray' }}>
            <div id="wrapper">
                <div class="loader-wrapper"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>
                <div class="card card-authentication1 mx-auto my-5 bg-back__login">
                    <div class="card-body">
                        <div class="card-content p-2">
                            <div class="text-center mb-4">
                                <img src={grImage.logo} alt="logo icon" />
                            </div>
                            {/* <div class="card-title text-uppercase text-center py-3">Chợ Online</div> */}
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Họ Bạn:</label>
                                    <input type="text" name="firstName" onChange={(e) => setFirstName(e.target.value)} className="form-control" placeholder="Nhập họ bạn" />
                                </div>
                                <div className="form-group">
                                    <label>Tên Bạn:</label>
                                    <input type="text" name="lastName" onChange={(e) => setLastName(e.target.value)} className="form-control" placeholder="Nhập tên bạn" />
                                </div>
                                <div className="form-group">
                                    <label>Khóa Công Khai:</label>
                                    <input type="text" className="form-control" placeholder="Khóa Công Khai" name="id" readOnly value={props.account} />
                                </div>
                                <div className="form-group">
                                    <label>Mật Khẩu:</label>
                                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Nhập mật khẩu" />
                                </div>
                                <p style={{ color: "red" }}>{error}</p>
                                <button type="submit" class="btn btn-light btn-block">Đăng Ký</button>

                            </form>
                        </div>
                    </div>
                    <div class="card-footer text-center py-3">
                        <p class="text-warning mb-0">Bạn đã có tài khoản? <Link to={"/"}> Đăng nhập</Link></p>
                    </div>
                </div>
            </div>

        </body>
    );
}

export default Register;
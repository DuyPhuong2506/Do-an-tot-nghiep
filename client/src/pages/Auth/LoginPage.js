import React, { useState } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import './style.scss';
import { Link } from "react-router-dom";
import imgs from './../../assets/images/logo-icon.png'
import { apiClient } from "../../Services";
import { grImage } from "../../Import/Images";

const Login = (props) => {
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = event => {
		event.preventDefault();

		const user = {
			'id': props.account,
			'password': password
		};
		apiClient.fetchApiLogin(user)
			.then(res => {
				setError('');
				Cookies.set('token', res.data.token, { expires: 1 });
				window.location.replace('/san-pham');
			})
			.catch(err => {
				console.error(err);
				setError('Mật khẩu của bạn không chính xác');
			})
	}

	return (
		<>
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
									<div class="form-group">
										<label for="exampleInputUsername" class="sr-only">Khóa Công Khai:</label>
										<div class="position-relative has-icon-right">
											<label>Khóa Công Khai:</label>
											<input type="text" className="form-control" placeholder="Public Key" readOnly value={props.account} />
											<div class="form-control-position">
												<i class="icon-user"></i>
											</div>
										</div>
									</div>
									<div class="form-group">
										<label for="exampleInputPassword" class="sr-only">Mật Khẩu:</label>
										<div class="position-relative has-icon-right">
											<label>Mật Khẩu:</label>
											<input type="password" name="password" onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Nhập mật khẩu" />
											<div class="form-control-position">
												<i class="icon-lock"></i>
											</div>
										</div>
									</div>
									<p style={{ color: "yellow" }}>{error}</p>
									<div class="form-row">
										<div class="form-group col-6">
											<div class="icheck-material-white">
												<input type="checkbox" id="user-checkbox" />
												<label for="user-checkbox">Ghi nhớ mật khẩu</label>
											</div>
										</div>
										<div class="form-group col-6 text-right">
											{/* <a href="#">Lấy lại mật khẩu</a> */}
										</div>
									</div>
									<button type="submit" class="btn btn-light btn-block">Đăng Nhập</button>


								</form>
							</div>
						</div>
						<div class="card-footer text-center py-3">
							<p class="text-warning mb-0">Bạn chưa có tài khoản? <Link to={"/sign-up"}> Đăng ký</Link></p>
						</div>
					</div>
				</div>

			</body>
		</>
	);
}
export default Login;
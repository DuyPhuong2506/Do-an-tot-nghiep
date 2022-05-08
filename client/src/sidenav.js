import React, { useState, useRef} from 'react';

import imgs from './assets/images/logo-icon.png'
import { BrowserRouter as Router, Switch, Route, Link, HashRouter, NavLink } from "react-router-dom";
import Cookies from 'js-cookie';
import ListProduct from './pages/Admin/listProduct';
import ProductItMe from './pages/Admin/productItMe';
import PurchasedProduct from './pages/Admin/purchasedProduct';
// import OnProduct from './pages/products';
import CreateProduct from './pages/Admin/createProduct';
import SoldProduct from './pages/Admin/soldProduct';

import BrowseKYC from './pages/Admin/browseKYC';
import BuyToken from './pages/Admin/buyToken';
import useOnClickOutside from './hooks/useClickOutSide';
import Resume from './pages/Resume';
import Header from './components/Header';
import ProductList from './pages/Client/ProductList';


const  Sidenav = (props) => {
	const ref = useRef();
	const [isShowLIss, setIsShowIss] = useState(false)
	const logOut = () => {
		Cookies.remove('token')
		window.location.assign('/');
	}

	useOnClickOutside(ref, () => setIsShowIss(false))
		return (
			<Router>
				<body class="">
					<div id="wrapper">
						<div id="sidebar-wrapper" data-simplebar="" data-simplebar-auto-hide="true">
							<div class="brand-logo">
								<a href="/">
									<img src={imgs} class="logo-icon" alt="logo icon" />
									<h5 class="logo-text">Chợ Online</h5>
								</a>
							</div>
							<div class="sidebar-name"><span>Online</span> : {props.fullName}</div>
							<ul class="sidebar-menu do-nicescrol">
								<li>
									<a style={{ color : "white" }} onClick={ () => window.location.replace('/san-pham')}>
									<i class="fa-solid fa-angles-left"></i><span>Trang người dùng</span>
									</a>
								</li>
								<li class="sidebar-header">Trang Dashboard</li>
								<li>
									<Link to={"/admin"}>
										<i class="zmdi zmdi-view-dashboard"></i> <span>Danh Sách Sản Phấm</span>
									</Link>
								</li>
								{props.isActive ? <><li class="sidebar-header">Riêng Tư</li>
									<li><Link to={"/san-pham-ca-nhan"}><i class="zmdi zmdi-coffee text-danger"></i> <span>Sản Phẩm Cá Nhân</span></Link></li>
									<li><Link to={"/mua-ban-san-pham"}><i class="zmdi zmdi-chart-donut text-success"></i> <span>Mua Bán Sản Phẩm</span></Link></li>
									<li><Link to={"/san-pham-da-ban"}><i class="zmdi zmdi-chart-donut text-success"></i> <span>Sản Phẩm Đã Bán</span></Link></li>
									<li><Link to={"/mua-token"}><i class="zmdi zmdi-chart-donut text-success"></i> <span>Mua Tokens</span></Link></li></> : <></>}
								{props.roles ? <><li class="sidebar-header">Quản Lí Admin</li>
									<li><Link to={"/duyet-kyc"}><i class="zmdi zmdi-coffee text-danger"></i> <span>Duyệt đến chuỗi KYC</span></Link></li></> : <></>}
							</ul>
							<li class="nav-item dropdown-lg ml-3 logout-market">
								<Link className="dropdown-toggle dropdown-toggle-nocaret waves-effect" onClick={logOut}>Đăng xuất</Link>
							</li>
						</div>
						<Header isActive={props.isActive} token={props.token}/>
						<script src="assets/js/jquery.min.js"></script>

						<div class="clearfix"></div>
						<div class="content-wrapper">
							<div class="container-fluid">

								<div class="row mt-3">
									<Switch>
										<ListProduct exact path="/admin" component={ListProduct} account={props.account} products={props.products} purchaseProduct={props.purchaseProduct} />
										<CreateProduct path="/tao-san-pham" component={CreateProduct} account={props.account} products={props.products} createProduct={props.createProduct} />
										<ProductItMe path="/san-pham-ca-nhan" component={ProductItMe} account={props.account} />
										<PurchasedProduct path="/mua-ban-san-pham" component={PurchasedProduct} account={props.account} />
										<SoldProduct path="/san-pham-da-ban" component={SoldProduct} account={props.account} />
										<BuyToken path="/mua-token" component={BuyToken} account={props.account} handleByTokens={props.handleByTokens} numbertoken={props.numbertoken} />
										<BrowseKYC path="/duyet-kyc" component={BrowseKYC} account={props.account} handleKycWhitelisting={props.handleKycWhitelisting} />
										<Resume path="/thong-tin-ca-nhan" component={Resume} infoUser={props.infoUser}/>
									</Switch>

								</div>
								<div class="overlay toggle-menu"></div>
							</div>
						</div>
						<div class="right-sidebar">
						</div>


					</div>

				</body>
			</Router>
		);
}
export default Sidenav
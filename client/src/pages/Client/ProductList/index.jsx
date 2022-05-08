import React, { useState, useEffect } from "react";
import CardProduct from "../../../components/Product/CardProduct";
import { Row, Col } from 'antd';
import Header from "../../../components/Header";
import axios from 'axios';
import Cookies from 'js-cookie';
import Footer from "../../../components/Footer";
import './styles.scss';
import { HeaderTop } from "../Header/HeaderTop";
import { HeaderBody } from "../Header/HeaderBody";
import { HeaderMain } from "../Header/HeaderMain";
import { Slider } from "../Header/Silder";
const ProductList = (props) => {
	const { products, purchaseProduct, account, roles} = props;
	const [dataProduct, setDataProduct] = useState([]);

	useEffect(() => {
		axios.get('https://localhost:5000/api/Products', {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + Cookies.get('token')
			}
		})
			.then(response => {
				// console.log(response);
				setDataProduct(response.data);

			})
			.catch(function (error) {
				console.log(error);

			})
	}, [])

	console.log(dataProduct);
	const handleRouteAdmin = () => {
		window.location.replace('/admin')
	}
	return (
		<>
			{/* <Header /> */}
			<HeaderTop />
			<HeaderBody token={props.token}/>
			<HeaderMain />
			<p class="section-title">Bạn hãy nhanh tay sở hữu những sản phẩm yêu thích nhất từ D&amp;C store bạn nhé!!!<a class="buy-now" href="#"> MUA NGAY »</a></p>
			<Slider />
			<div className="container mottom">
				 
					<div className="button__admin">
					<div class="flash-time"> <span class="time h">02</span><span class="dot-mask"></span><span class="time i">20</span><span class="dot-mask"></span><span class="time s">06</span></div>
					{
					roles &&
					<button className="cs_12_admin" onClick={handleRouteAdmin}>
							Go to Admin
					</button>
					}
					</div>
				<h3 class="section-title-body color-purple">FLASH SALE</h3>
				<Row gutter={16}>
					{dataProduct.length > 0 && dataProduct.map((anObjectMapped, index) => {
						if (anObjectMapped.owner !== props.account)
							return (
								<Col className="gutter-row" span={6}>
									<CardProduct anObjectMapped={anObjectMapped} key={anObjectMapped.id} purchaseProduct={purchaseProduct} account={account} />
								</Col>
							);
					})
					}
				</Row>
			</div>
			<Footer />
		</>

	)
}

export default ProductList;
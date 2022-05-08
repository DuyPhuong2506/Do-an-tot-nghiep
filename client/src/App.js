import React, { Component } from "react";
import MyToken from "./contracts/MyToken.json";
import MyTokenSale from "./contracts/MyTokenSale.json";
import KycContract from "./contracts/KycContract.json";
import Marketplace from "./contracts/Marketplace.json";
import axios from 'axios';
import Login from "./log";
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Switch, Route, Link, HashRouter } from "react-router-dom";

import './assets/css/pace.min.css'
import './assets/plugins/simplebar/css/simplebar.css'
import './assets/css/bootstrap.min.css'
import './assets/css/animate.css'
import './assets/css/app-style.css'
import './assets/css/sidebar-menu.css'

import getWeb3 from "./getWeb3";
import Sidenav from './sidenav.js'

import "./App.css";
import dotenv from 'dotenv';
import Loading from "./components/phaohoa";
import 'boxicons';
import ProductList from "./pages/Client/ProductList";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { alertErrors, alertSuccess } from "./Contains/Config";
import { apiClient } from "./Services";
import ListProduct from "./pages/Admin/listProduct";
import CreateProduct from "./pages/Admin/createProduct";

class App extends Component {
	state = { loaded: false, kycAddress: "", tokenSaleAddress: null, marketplaceAddress: null, userTokens: 0 };

	componentDidMount = async () => {
		try {
			dotenv.config({ path: "../.env" });
			// Get network provider and web3 instance.
			this.web3 = await getWeb3();

			// Use web3 to get the user's accounts.
			this.accounts = await this.web3.eth.getAccounts();
			this.setState({ account: this.accounts[0] })
			// Get the contract instance.
			this.networkId = await this.web3.eth.net.getId();
			const networkData = Marketplace.networks[this.networkId]
			this.state.address = networkData.address;

			this.tokenInstance = new this.web3.eth.Contract(
				MyToken.abi,
				MyToken.networks[this.networkId] && MyToken.networks[this.networkId].address,
			);
			this.tokenSaleInstance = new this.web3.eth.Contract(
				MyTokenSale.abi,
				MyTokenSale.networks[this.networkId] && MyTokenSale.networks[this.networkId].address,
			);
			this.kycInstance = new this.web3.eth.Contract(
				KycContract.abi,
				KycContract.networks[this.networkId] && KycContract.networks[this.networkId].address,
			);
			this.marketplace = new this.web3.eth.Contract(
				Marketplace.abi,
				Marketplace.networks[this.networkId] && Marketplace.networks[this.networkId].address,
			);
			axios.delete('https://localhost:5000/api/Users/DeleteUsers/' + networkData.address, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then((response) => {
					// console.log(response);
				})
				.catch(function (error) {
					// console.log(error);
				});
			axios.delete('https://localhost:5000/api/Products/Contract/' + networkData.address, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + Cookies.get('token')
				}
			})
				.then((response) => {
					// console.log(response);

				})
				.catch(function (error) {
					// console.log(error);

				});
			// Set web3, accounts, and contract to the state, and then proceed with an
			// example of interacting with the contract's methods.
			this.listenUserTokenTransfer();
			if (Cookies.get('token') != null) {
				await this.checklogin()
			}
			this.setState({ loaded: true, tokenSaleAddress: MyTokenSale.networks[this.networkId].address, marketplaceAddress: Marketplace.networks[this.networkId].address }, this.updateUserTokens);
		} catch (error) {
			// Catch any errors for any of the above operations.
			alertErrors('Lỗi hệ thống vui lòng Connect.', 3000)
		}
	};
	checklogin() {
		axios.get('https://localhost:5000/api/Users', {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + Cookies.get('token')
			}
		})
			.then(response => {
				if (response.data.id == this.state.account) {
					this.setState({ fullName: response.data.lastName + ' ' + response.data.firstName, roles: response.data.roles, isActive: response.data.isActive, token: response.data.tokens, infoUser: response.data });
				} else {
					this.logOut();
				}
			})
			.catch(function (error) {
				console.log(error);

			})
	}
	constructor(props) {
		super(props)
		this.state = {
			account: '',
			productCount: 0,
			products: [],
			loading: true,
			idProduct: '',
			roles: '',
			isActive: false,
			token: 0,
			infoUser: {}
		}

		this.createProduct = this.createProduct.bind(this)
		this.purchaseProduct = this.purchaseProduct.bind(this)
	}
	updateUserTokens = async () => {
		// Đọc lượng token
		let userTokens = await this.tokenInstance.methods.balanceOf(this.accounts[0]).call();
		this.setState({ userTokens: userTokens });
	}
	listenUserTokenTransfer = () => {

		this.tokenInstance.events.Transfer({ to: this.accounts[0] }).on("data", this.updateUserTokens);
	}
	
	handleByTokens = async(number)=>{
		let numberToken = number*process.env.REACT_APP_CONVENTION;
		console.log(number);
		console.log(process.env.REACT_APP_CONVENTION);
		console.log(parseInt(numberToken));
		await this.tokenSaleInstance.methods.buyTokens(this.accounts[0],process.env.REACT_APP_CONVENTION).send({from:this.accounts[0],value:this.web3.utils.toBN(parseInt(numberToken),"Wei")}).once('transactionHash', (transactionHash) => {
		  axios.post('https://localhost:5000/api/Users/PostTokens/',{
			"tokenNumber":number
		  }, {
			  headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+Cookies.get('token')
			  }
			})
			.then(response => { 
			  alert("Mua thành công "+number+" Token");
			  window.location.assign("/");
			})
			.catch(function (error) {
			  console.log(error);
			})
		});
	  }
	// Add 10 token
	handleByTokens10 = async () => {
		await this.tokenSaleInstance.methods.buyTokens(this.accounts[0]).send({ from: this.accounts[0], value: this.web3.utils.toWei("10", "Wei") });
	}
	// Send Token
	sendTokens = async () => {
		console.log(this.accounts[0]);
		console.log(await this.tokenInstance.methods.transfer("0x3d421A0E8f206d6976C2305FFC456a99Ac36499c", 1).send({ from: this.accounts[0] }));
		// await this.tokenInstance.methods.sendTokens(this.accounts)
		// instance.transfer(recipient, sendTokens)
	}
	handleInputChange = (event) => {
		const target = event.target;
		const value = target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}
	handleKycWhitelisting = async (id) => {
		await this.kycInstance.methods.setKycCompleted(id).send({ from: this.accounts[0] }).once('transactionHash', (transactionHash) => {
			axios.put('https://localhost:5000/api/Users/ConfigActive/' + id, {}, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + Cookies.get('token')
				}
			})
				.then(response => {
					alertSuccess('Yêu cầu đã được phê duyệt', 3000)
					window.location.replace("/admin");
				})
				.catch(function (error) {
					alertErrors('Yêu cầu xảy ra lỗi.', 3000)
				})
		});
	};
	createProduct(name, price) {
		var addresss = this.state.address;
		this.marketplace.methods.createProduct(name, price).send({ from: this.accounts[0] })
			.on('transactionHash', (receipt) => {
				this.marketplace.events.ProductCreated({
					filter: { myIndexedParam: [20, 23], myOtherIndexedParam: receipt }, // Using an array means OR: e.g. 20 or 23
					fromBlock: 0
				}, function (error, event) {
					if (event != null) {
						if (event.transactionHash == receipt) {
							var idProducts = event.returnValues[0];
							const data = {
								"idProduct": idProducts,
								"name": name,
								"price": price,
								"contractAddress": addresss
							}

							apiClient.fetchApiPostProduct(data).
								then((response) => {
									alertSuccess('Thêm sản phẩm thành công.')
									window.location.replace("/admin");

								});


						}
					}
				})
					.on("connected", function (subscriptionId) {
						console.log(subscriptionId);
					})
					.on('data', function (event) {
						// same results as the optional callback above
					})
					.on('changed', function (event) {

					})
					.on('error', function (error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.

					});
			})
			.once('receipt', function (receipt) { console.log(receipt); })
			.on('confirmation', function (confNumber, receipt) {

			})
			.on('error', function (error) { console.log(error); })
			.then(function (receipt) {
				// this.setState({ loading: false })

			});

	}


	purchaseProduct(id, price, sendAddress) {
		console.log(id);
		console.log(price);
		console.log(sendAddress);
		this.tokenInstance.methods.transfer(sendAddress, price).send({ from: this.accounts[0] }).once('transactionHash', (transactionHash) => {
			axios.put('https://localhost:5000/api/Products/BuyProduct/' + id, {}, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + Cookies.get('token')
				}
			})
				.then(function (response) {
					console.log(response);
				})
				.catch(function (error) {
					console.log(error);
				});
			this.marketplace.methods.purchaseProductbyToken(id).send({ from: this.state.account })
				.once('receipt', (receipt) => {
					this.setState({ loading: false })

				})
				.once('transactionHash', (transactionHash) => {
					window.location.replace("/admin");
				})
		});
	}


	render() {
		if (!this.state.loaded) {
			return <Loading />;
		}
		return (

			<>
				<ToastContainer />
				<Router>
					{Cookies.get('token') == null ?
						<Login account={this.state.account} contractAddress={this.state.marketplaceAddress} />
						:
						<Switch>
							<Sidenav
								exact
								path="/admin"
								account={this.state.account}
								products={this.state.products}
								createProduct={this.createProduct}
								purchaseProduct={this.purchaseProduct}
								numbertoken={process.env.REACT_APP_CONVENTION}
								fullName={this.state.fullName}
								roles={this.state.roles}
								isActive={this.state.isActive}
								handleByTokens={this.handleByTokens}
								handleKycWhitelisting={this.handleKycWhitelisting}
								token={this.state.token}
								infoUser={this.state.infoUser}
							/>
							<ProductList
								path="/san-pham"
								component={ProductList}
								products={this.state.products}
								purchaseProduct={this.purchaseProduct}
								account={this.state.account}
								roles={this.state.roles}
								token={this.state.token}
							/>
						</Switch>

					}
				</Router>
				<script src="assets/js/jquery.min.js"></script>
				<script src="assets/js/main.js"></script>
			</>
		);
	}
}

export default App;

import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';



class BrowseKYC extends Component {
	state = {
		data: [],
	}
	async componentWillMount() {
		await this.listAllProducts();
	}
	listAllProducts() {
		axios.get('https://localhost:5000/api/Users/GetAllUsers', {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + Cookies.get('token')
			}
		})
			.then(response => {
				this.setState(this.state.data = response.data);
			})
			.catch(function (error) {
				console.log(error);

			})


	}
	render() {
		return (
			<div class="col-lg-12">
				<div class="card">
					<div class="card-body">
						<h5 class="card-title">Danh Sách Tài Khoản:</h5>
						<div class="table-responsive">



							<table class="table">
								<thead>
									<tr>
										<th scope="col">#</th>
										<th scope="col">Họ Bạn</th>
										<th scope="col">Tên Bạn</th>
										<th scope="col">Hành Động</th>
									</tr>
								</thead>
								<tbody>
									{this.state.data.map((anObjectMapped, index) => {
										return (
											<tr key={anObjectMapped.id}>
												<td>{anObjectMapped.id}</td>
												<th scope="row">{anObjectMapped.firstName}</th>
												<td>{anObjectMapped.lastName}</td>
												<td><button className='button__whitelist click-btn btn-style703' name={anObjectMapped.productCount}
													value={anObjectMapped.price}
													onClick={(event) => {
														this.props.handleKycWhitelisting(anObjectMapped.id)
													}}> Cấu hình KYC Whitelist</button></td>
											</tr>
										);

									})}


								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default BrowseKYC;

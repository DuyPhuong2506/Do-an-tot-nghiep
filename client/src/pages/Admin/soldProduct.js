import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Switch, Route, Link,HashRouter } from "react-router-dom";

class SoldProduct extends Component {
  state = {
        data : []
    }
    async componentWillMount(){
        await this.listAllProducts();
    }
    listAllProducts(){
      axios.get('https://localhost:5000/api/Products/SoldProduct', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+Cookies.get('token')
      }
    })
    .then(response => {
        
      console.log(response);
      this.setState(this.state.data = response.data);
      console.log(this.state.data);

      console.log(Object.keys(this.state.data));
        this.state.data.forEach( ({ productCount,name,owner,price,isBuy,id }) => {
                        console.log(productCount)
                        console.log(name)
                        console.log(owner)
                        console.log(price)
                        console.log(isBuy)
                        console.log(id)
                        
                    })
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
              <h5 class="card-title">Danh Sách Sản Phẩm Đã Bán</h5>
			  <div class="table-responsive">

              

               <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Tên</th>
                      <th scope="col">Giá</th>
                      <th scope="col">Người mua</th>
                    </tr>
                  </thead>
                  <tbody>
                  {/* { this.props.products.map((product, key) => {}} */}
                  {/* {this.state.data.forEach( ({ productCount,name,owner,price,isBuy,id }) => {
                        // console.log(productCount)
                        <tr key={id}>
                            <th scope="row">{productCount}</th>
                            <td>{name}</td>
                            <td>{owner}</td>
                            <td>{price}</td>
                            <td>{isBuy}</td>
                            <td>{id}</td>
                        </tr>
                    })} */}
                    {this.state.data.map((anObjectMapped, index) => {
                        return (
                            <tr key={anObjectMapped.id}>
                            <th scope="row">{anObjectMapped.productCount}</th>
                            <td>{anObjectMapped.name}</td>
                            <td>{anObjectMapped.price} Token</td>
                            <td>{anObjectMapped.userBuyer}</td>
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
  }
}

export default SoldProduct;

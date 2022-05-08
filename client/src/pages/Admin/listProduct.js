import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BASE_URL_IMAGE } from '../../Contains/ConfigURL';

class ListProduct extends Component {
    state = {
        data : [],
    }
    async componentWillMount(){
        await this.listAllProducts();
    }
    listAllProducts(){
      axios.get('https://localhost:5000/api/Products', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+Cookies.get('token')
      }
    })
    .then(response => {
        
      // console.log(response);
      this.setState(this.state.data = response.data);
      console.log(this.state.data);
    })
    .catch(function (error) {
      console.log(error);
      
    })
  
  
}
  render() {
    return (
      <div class="col-lg-12">
          <div class="card customize_card">
            <div class="card-body">
              <h5 class="card-title">Danh sách sản phẩm</h5>
			  <div class="table-responsive">
               <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Tên</th>
                      <th scope="col">Hình Ảnh</th>
                      <th scope="col">Giá Cả</th>
                      <th scope="col">Địa Chỉ Sản Phấm</th>
                      <th scope="col">Hành Động</th>
                    </tr>
                  </thead>
                  <tbody>
                
                    {this.state.data.map((anObjectMapped, index) => {
                        return (
                            <tr key={anObjectMapped.id}>
                            <th scope="row">{anObjectMapped.productCount}</th>
                            <td>{anObjectMapped.name}</td>
                            <td>{anObjectMapped.pictureUrl != null ? <img className='img_product' src={BASE_URL_IMAGE+anObjectMapped.pictureUrl} /> : 'Chưa Có H/A' }</td>
                            <td>{anObjectMapped.price} Token</td>
                            <td>{ anObjectMapped.idProduct}
                            
                            </td>
                            
                            
                            <td>{anObjectMapped.owner == this.props.account ? "" : <button className='button__whitelist click-btn btn-style703' name={anObjectMapped.productCount}
                          value={anObjectMapped.price}
                          onClick={(event) => {
                            this.props.purchaseProduct(event.target.name, event.target.value,anObjectMapped.owner)
                          }}>Mua Sản Phẩm</button>}</td>
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

export default ListProduct;

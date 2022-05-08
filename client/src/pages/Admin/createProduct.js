import React, { Component } from 'react';

class CreateProduct extends Component {
  
  render() {
    return (
      <div class="col-lg-12">
         <div class="card">
           <div class="card-body">
           <div class="card-title">Tạo Sản Phẩm</div>
           <hr />
            <form onSubmit={(event) => {
          event.preventDefault()
          
          const name = this.productName.value
          const price = this.productPrice.value
          this.props.createProduct(name, price)}}>
           <div class="form-group">
            <label for="input-1">TÊN SẢN PHẨM</label>
            <input type="text" class="form-control" ref={(input) => { this.productName = input }} id="productName" placeholder="Nhập tên sản phẩm" required />
           </div>
           <div class="form-group py-2">
            <label for="input-2">GIÁ SẢN PHẨM (Token)</label>
            <input type="number" class="form-control" ref={(input) => { this.productPrice = input }} id="productPrice" placeholder="Nhập giá sản phẩm" required/>
           </div>
           
           
           <div class="form-group pt-5">
           <button type="" class="btn btn-light px-5 mr-3" onClick={() => window.location.replace('./admin')}><i class="icon-lock"></i> Hủy</button>
            <button type="submit" class="btn btn-light px-5"><i class="icon-lock"></i> TẠO SẢN PHẢM</button>
          </div>
          </form>
         </div>
         </div>
      </div>
      
    );
  }
}

export default CreateProduct;

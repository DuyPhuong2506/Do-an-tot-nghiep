import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

class BuyToken extends Component {
  
  render() {
    return (
      <div class="col-lg-12">
         <div class="card">
           <div class="card-body">
           <div class="card-title">Mua Token</div>
           <hr />
            <form onSubmit={(event) => {
          event.preventDefault()
          const number = this.number.value
          this.props.handleByTokens(number)
        }}>
           <div class="form-group">
            <label for="input-1">Số Lượng Token ({this.props.numbertoken} WEI = 1 TOKEN)</label>
            <input type="number" class="form-control" ref={(input) => { this.number = input }} id="number" placeholder="Enter Number Token" required />
           </div>
           
           
           
           <div class="form-group pt-5">
            <button type="submit" class="btn btn-light px-5"><i class="icon-lock"></i> Mua Tokens</button>
          </div>
          </form>
         </div>
         </div>
      </div>
    );
  }
}

export default BuyToken;

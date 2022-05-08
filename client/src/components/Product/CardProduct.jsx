import React from "react";
import { BASE_URL_IMAGE } from "../../Contains/ConfigURL";
import './style.scss';
const CardProduct = (props) => {
    const {anObjectMapped} = props;
    console.log(anObjectMapped);
    return (
        <>
            <div class="product-selling"> <a href=""><img class="product-item" src="./assets/images/product-selling-1.png" alt="" /></a>
                <div class="new-image"> <img src={anObjectMapped.pictureUrl ? BASE_URL_IMAGE +''+ anObjectMapped.pictureUrl : 'https://blog.maybanhang.net/hs-fs/hubfs/Mai%20Linh/th%E1%BB%9Di%20trang/41229893_530353750755985_3605100191398494208_n.jpg?width=700&name=41229893_530353750755985_3605100191398494208_n.jpg' } alt="" /></div>
                <div class="product-content"> <a href="#">
                    <h5 class="product-content-name">{anObjectMapped.name}</h5></a>
                    <div class="product-price"> <span class="price-old">{anObjectMapped.price + 0.3} T</span><span class="price-final">{anObjectMapped.price} T</span></div>
                </div>

                <div className="buy__product">
                          {anObjectMapped.owner == props.account ? <button className='button__whitelist click-btn btn-style703' 
                          >So Huu</button> : <button className='button__whitelist click-btn btn-style703' name={anObjectMapped.productCount}
                          value={anObjectMapped.price}
                          onClick={(event) => {
                            props.purchaseProduct(event.target.name, event.target.value,anObjectMapped.owner)
                          }}>Mua Sản Phẩm</button>}
                </div>
            </div>
        </>
    )
}

export default CardProduct;
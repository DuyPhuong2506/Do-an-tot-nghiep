import React from "react";
import { grImage } from "../../../Import/Images";
import './styles.scss';
import './main.css';
import { apiClient } from "../../../Services";
export const HeaderBody = (props) => {
    return (
        <>
            <header class="header">
                <div class="container">
                    <div class="header-wrapper d-flex align-items-center justify-content-between">
                        <div class="header-logo"> <img src={grImage.logo} alt=""/></div>
                        <div class="header-search d-flex">
                            <div class="search-input">
                                <input type="text" placeholder="Tìm Kiếm"/>
                            </div>
                            <div class="search-filter">
                                <div class="dropdown js-dropdown-option">
                                    <button class="dropdown-toggle button-component hide-dropdown-icon d-flex align-items-center justify-content-center" id="headerSearchFilter" data-bs-toggle="dropdown" aria-expanded="false" type="button"><span class="button-title">Tất cả Danh Mục</span><img class="down-arrow" src={grImage.iconAngleDownBlue} alt=""/></button>
                                    <ul class="dropdown-menu custom-style-dropdown" aria-labelledby="headerSearchFilter">
                                        <li>
                                            <div class="dropdown-item">
                                                <div class="button-component d-flex align-items-center justify-content-center"><span class="button-title">Ebook</span></div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="button-search"> <img src={grImage.Search} alt=""/></div>
                            </div>
                        </div>
                        <div class="header-btn-groups d-flex">
                            <div class="btn-infomation btn-notify d-flex">
                                <div class="info-icon"> <img src={grImage.bell} alt="" />
                                    <p class="notify-title">Thông báo </p>
                                </div>
                                <div class="info-count"> <span>5+  </span></div>
                            </div>
                            <div class="btn-infomation btn-cart d-flex">
                                <div class="info-icon"> <img src={grImage.shoppingCart} alt="" />
                                    <p class="notify-title">Giỏ Hàng </p>
                                </div>
                                <div class="info-count"> <span>5+  </span></div>
                            </div>
                            <div class="btn-infomation btn-order d-flex">
                                <div class="info-icon"> <img src={grImage.shoppingList} alt="" />
                                    <p class="notify-title">Token:    <span style={{ color: 'red' }}>{props.token}</span>   </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
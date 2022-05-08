import React from "react";
import { grImage } from "../../../Import/Images";
import './styles.scss';
export const HeaderMain = () => {
    return (
        <>
            <div class="menu__component">
                <div class="menu__component-overlay"></div>
                <div class="container">
                    <div class="menu__component__wrap d-flex align-items-center">
                        <div class="menu__category active d-flex align-items-center">
                            <div class="category__btn d-flex align-items-center justify-content-center">DANH MỤC SẢN PHẨM <img class="img-down" src={grImage.arrowDown} alt="" /></div>
                            <ul class="dropdown-menu" role="menu">
                                <li class="category-item"><a class="d-flex align-items-center category__link" href="#">Quan Ao</a></li>
                                <li class="category-item"><a class="d-flex align-items-center category__link" href="#">Giay Dep</a></li>
                                <li class="category-item"><a class="d-flex align-items-center category__link" href="#">Trang Suc</a></li>
                                <li class="category-item"><a class="d-flex align-items-center category__link" href="#">Bim Bim</a></li>
                                <li class="category-item"><a class="d-flex align-items-center category__link" href="#">Tin Tức</a></li>
                                <li class="category-item"><a class="d-flex align-items-center category__link" href="#">Liên Hệ</a></li>
                                <li><a class="category__show__all d-flex align-items-center justify-content-center" href="#">
                                    <i class="fas fa-bars"></i>Xem tất cả danh mục</a></li>
                            </ul>
                        </div>
                        <ul class="menu-list d-flex align-items-center justify-content-center">
                            <a class="item d-flex align-items-center mr-5" href="#"><span class="item-title">Về Chúng Tôi</span></a>
                            <a class="item d-flex align-items-center mr-5" href="#"><span class="item-title">Sản Phẩm</span></a>    
                            <a class="item d-flex align-items-center mr-5" href="#"><span class="item-title">Tin Tức</span></a>
                            <a class="item d-flex align-items-center mr-5" href="#"><span class="item-title">Liên Hệ</span></a>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
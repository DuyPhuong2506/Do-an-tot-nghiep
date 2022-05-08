import './style.scss';
import { grImage } from "./../../Import/Images";
import React from 'react';
const Footer = () => {
    return (
        <section class="footer"> 
      <div class="container">
        <div class="row"> 
          <div class="col-12 col-lg-3 col-md-6">
            <div class="footer-list"> 
              <div class="footer-list-title footer-logo">Về Chúng Tôi </div>
              <div class="footer-list-group"> <img src={grImage.logo} alt="" />
                <p class="list-group-desc">Công ty D&amp;C store được thành lập vào tháng 3/2012 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-3 col-md-6">
            <div class="footer-list"> 
              <div class="footer-list-title">Thông Tin Liên Hệ</div>
              <div class="footer-list-group">
                <div class="footer-list-item"> 
                  <p class="list-item-title">Địa chỉ :<span>120 Nguyễn Trãi, Thanh Xuân, Hà Nội</span></p>
                </div>
                <div class="footer-list-item"> 
                  <p class="list-item-title">Tư Vấn Online: <span>1900 1000</span></p>
                </div>
                <div class="footer-list-item"> 
                  <p class="list-item-title">Thời gian hỗ trợ chăm sóc khách hàng: <span>Thứ 2 đến Chủ Nhật từ 7h30 - 24h</span></p>
                </div>
                <div class="footer-list-item"> 
                  <p class="list-item-title">Tư vấn trực tuyến:<span>Facebook Messenger</span></p>
                </div>
                <div class="footer-list-item"> 
                  <p class="list-item-title">Fanpage:<span>Facebook fanpge</span></p>
                </div>
                <div class="footer-list-item"> 
                  <p class="list-item-title">Email:<span>daop37566@gmail.com</span></p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-3 col-md-6">
            <div class="footer-list"> 
              <div class="footer-list-title">Chăm Sóc Khách Hàng</div>
              <div class="footer-list-group">
                <div class="footer-list-item"><a class="list-item-link" href="#">Đăng ký tài khoản thành viên</a></div>
                <div class="footer-list-item"><a class="list-item-link" href="#">Hướng dẫn mua hàng online</a></div>
                <div class="footer-list-item"><a class="list-item-link" href="#">Chính sách khách hàng</a></div>
                <div class="footer-list-item"><a class="list-item-link" href="#">Chính sách đổi hàng</a></div>
                <div class="footer-list-item"><a class="list-item-link" href="#">Chính sách đổi hàng</a></div>
                <div class="footer-list-item"><a class="list-item-link" href="#">Điều khoản mua bán hàng hóa</a></div>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-3 col-md-6">
            <div class="footer-list"> 
              <div class="footer-list-title">Liên Kết</div>
              <div class="footer-list-group">
                <div class="footer-list-item">
                  <p class="list-item-title"> <span>Kết nối với chúng tôi </span></p>
                </div>
                <div class="footer-list-social"> <img src={grImage.instagam} alt="" /><img src={grImage.facebook} alt="" /><img src={grImage.youtube} alt="" /><img src={grImage.tiwe} alt="" /></div>
              </div>
              <div class="footer-list-title title-authentication">Chứng Thực 
                <div class="list-img"> <img src={grImage.bcthuong} alt="" /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    )
}

export default Footer;
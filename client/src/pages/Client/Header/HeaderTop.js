import Cookies from "js-cookie";
import React , {useRef, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import useOnClickOutside from "../../../hooks/useClickOutSide";
import { grImage } from "../../../Import/Images";
import './styles.scss';
export const HeaderTop = () => {
    const ref = useRef();
    const [isShowLIss, setIsShowIss] = useState(false)
    useOnClickOutside(ref, () => setIsShowIss(false))
    const logOut = () => {
		Cookies.remove('token')
		window.location.assign('/');
	}
    return (
        <>
            <header class="header-top-store">
                <div class="container">
                    <div class="header-list d-flex align-content-center justify-content-between">
                        <div class="header-list-left d-flex align-content-center">
                            <div class="header-list-item list-right-hotline"> <img src={grImage.phoneCall} alt="" />
                                <p class="list-title hotline">Hotline: <a href="#"> 1900 1000  </a></p>
                            </div>
                            <div class="header-list-item line"> </div>
                            <div class="header-list-item list-right-email"><img src={grImage.phoneCall2} alt="" />
                                <p class="list-title email">Email: <span>daop37566@gmail.com</span></p>
                            </div>
                        </div>
                        <div class="header-list-right d-flex align-content-center justify-content-center">
                            <div class="header-list-item list-right-chanel"> <img src="" alt="" />
                                <p class="list-title chanel">Kênh thành viên</p>
                            </div>
                            <div class="header-list-item line"> </div>
                            <div class="header-list-item list-right-download"> <img src={grImage.phoneCall4} alt="" /><a class="list-title download" href="#">tải ứng dụng</a></div>
                            <div class="header-list-item line"> </div>
                            <div class="header-list-item list-right-cl" style={{ position : 'relative' }} onClick={() => setIsShowIss(isShowLIss ? false : true)}> <a href="#"> <img src={grImage.avtImg} alt="" /><span class="list-title cl">Marcela Lagil</span></a>
                                {isShowLIss && <div className='dropdown__custome' style={{ zIndex : 9999 , boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'}} ref={ref}>
                                    <ul>
                                        <li>
                                            <a>Preferences</a>
                                        </li>
                                        <li>
                                            <Link to='/resume-user'>Thông tin cá nhân</Link>
                                        </li>
                                        <li>
                                            <a>Cài đặt</a>
                                        </li>
                                        <li>
                                            <a onClick={logOut}>Đăng xuất</a>
                                        </li>
                                    </ul>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
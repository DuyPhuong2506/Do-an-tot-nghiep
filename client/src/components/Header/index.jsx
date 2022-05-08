import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import useOnClickOutside from "../../hooks/useClickOutSide";
import imgs from './../../assets/images/logo-icon.png';
import Cookies from 'js-cookie';
import { grImage } from "../../Import/Images";
const Header = (props) => {
    const ref = useRef();
    const [isShowLIss, setIsShowIss] = useState(false)
    useOnClickOutside(ref, () => setIsShowIss(false))
    const logOut = () => {
		Cookies.remove('token')
		window.location.assign('/');
	}
    return (
        <header class="topbar-nav">
            <nav class="navbar navbar-expand fixed-top">
                <div class="top-possi">
                    <div className="phuong">
                    <img src={grImage.logo} class="logo-icon" alt="logo icon" />
                        <h5 class="logo-text">Chợ Online</h5>
                    </div>
                </div>
                <ul class="navbar-nav mr-auto align-items-center">
                    <li class="nav-item">
                        <a class="nav-link toggle-menu" href="javascript:void();">
                            <i class="icon-menu menu-icon"></i>
                        </a>
                    </li>
                    <li class="nav-item">
                        <form class="search-bar">
                            <input type="text" class="form-control" placeholder="Enter keywords" />
                            <a href="javascript:void();"><i class="icon-magnifier"></i></a>
                        </form>
                    </li>
                </ul>

                <ul class="navbar-nav align-items-center right-nav-link">
                    {props.isActive ? <li class="nav-item dropdown-lg">
                        <a class=" dropdown-toggle dropdown-toggle-nocaret waves-effect" data-toggle="dropdown" href="javascript:void();">
                            Token : {props.token} &emsp;</a>
                    </li> : <></>}
                    <li class="nav-item dropdown-lg">
                        <div className='icon_avatar' onClick={() => setIsShowIss(isShowLIss ? false : true)}>
                            P
                            {isShowLIss && <div className='dropdown__custome' ref={ref}>
                                <ul>
                                    <li>
                                        <a>Preferences</a>
                                    </li>
                                    <li>
                                        <Link to='/thong-tin-ca-nhan'>Thông tin cá nhân</Link>
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
                    </li>

                </ul>
            </nav>
        </header>
    )
}

export default Header;
import React from "react";
import { memo } from "react";
import './footer.css';
import footer_logo from '../assets/logo_big.png';
import instagram_icon from '../assets/instagram_icon.png';
import pintester_icon from '../assets/pintester_icon.png';
import whatsapp_icon from '../assets/whatsapp_icon.png';

const Footer = () => {

    return (
        <div className="footer">
            <div className="footer-logo">
                <img src={footer_logo} alt="" />
                <p>HILL FASHION</p>
            </div>
            <ul className="footer-links">
                <li>Công ty</li>
                <li>Sản phẩm</li>
                <li>Văn phòng</li>
                <li>Về chúng tôi</li>
                <li>Liên hệ</li>
            </ul>
            <div className="footer-social-icon">
                <div className="footer-icon-container">
                    <img src={instagram_icon} alt="" />
                </div>
                <div className="footer-icon-container">
                    <img src={pintester_icon} alt="" />
                </div>
                <div className="footer-icon-container">
                    <img src={whatsapp_icon} alt="" />
                </div>
            </div>
            <div className="footer-copyright">
                <hr/>
                <p>@ 2024 - Giữ trọn giá trị sáng tạo, bảo vệ mọi quyền.</p>
            </div>
        </div>
    );
}

export default memo(Footer);
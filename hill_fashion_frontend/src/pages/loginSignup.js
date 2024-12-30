import React  from "react";
import { memo } from "react";
import './css/loginSignup.css'

const LoginSignup = () =>{

    return (
        <div  className="loginsignup">
            <div className="loginsignup-container">
                <h1>Đăng ký</h1>
                <div className="loginsignup-fields">
                    <input type="text" placeholder="Tên dăng nhập"/>
                    <input type="email" placeholder="Địa chỉ email"/>
                    <input type="password" placeholder="Mật khẩu"/>
                </div>
                <button>Tiếp tục</button>
                <p className="loginsignup-login">Đã có tài khoản? <span>Đăng nhập tại đây</span></p>
                <div className="loginsignup-agree">
                    <input type="checkbox" name="" id=""/>
                    <p>Tiếp tục nghĩa là bạn đồng ý với điều khoản sử dụng và chính sách bảo mật.</p>
                </div>
            </div>
        </div>
    );
}

export default memo(LoginSignup);
import React  from "react";
import { memo } from "react";
import './newsLetter.css';

const NewsLetter = () =>{

    return (
        <div className="newsletter">
            <h1>Nhận ưu đãi qua email</h1>
            <p>Đăng ký nhận bản tin ngay để không bỏ lỡ những tin tức mới nhất!</p>
            <div>
                <input type="email" placeholder="Nhập email của bạn"/>
                <button>Đăng ký</button>
            </div>
        </div>
    );
}

export default memo(NewsLetter);
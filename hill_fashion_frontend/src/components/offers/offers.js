import React  from "react";
import { memo } from "react";
import './offers.css';
import exclusive_image from '../assets/exclusive_image.png'

const Offers = () =>{

    return (
        <div className="offers">
            <div className="offers-left">
                <h1>Ưu đãi</h1>
                <h1>Dành riêng cho bạn</h1>
                <p>Chỉ dành cho các sản phẩm bán chạy nhất</p>
                <button>Xem ngay</button>
            </div>
            <div className="offers-right">
                <img src={exclusive_image} alt=""/>
            </div>
        </div>
    );
}

export default memo(Offers);
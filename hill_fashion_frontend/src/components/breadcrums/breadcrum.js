import React from "react";
import { memo } from "react";
import './breadcrum.css';
import arrow_icon from '../assets/breadcrum_arrow.png';

const Breadcrum = (props) =>{
    const {product} = props;
    return (
        <div className="breadcrum">
            Trang chủ 
            <img src={arrow_icon} alt=""/> Cửa hàng 
            <img src={arrow_icon} alt=""/> {product.category} 
            <img src={arrow_icon} alt=""/> {product.name}
        </div>
    );
}

export default memo(Breadcrum);
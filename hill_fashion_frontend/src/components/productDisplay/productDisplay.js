import React, { useContext } from "react";
import { memo } from "react";
import './productDisplay.css';
import star_icon from "../assets/star_icon.png";
import star_dull_icon from "../assets/star_dull_icon.png";
import { formatter } from "../../utils/fomater";
import { ShopContext } from "../../context/ShopContext";

const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);
    return (
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt=""/>
                    <img src={product.image} alt=""/>
                    <img src={product.image} alt=""/>
                    <img src={product.image} alt=""/>
                </div>
                <div className="productdisplay-img">
                    <img className="productdisplay-main-img" src={product.image} alt=""/>
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-star">
                    <img src={star_icon} alt=""/>
                    <img src={star_icon} alt=""/>
                    <img src={star_icon} alt=""/>
                    <img src={star_icon} alt=""/>
                    <img src={star_dull_icon} alt=""/>
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-price">
                    <div className="productdisplay-right-price-old">{formatter(product.old_price)}</div>
                    <div className="productdisplay-right-pricr-new">{formatter(product.new_price)}</div>
                </div>
                <div className="productdisplay-right-description">
                    Áo thun nhẹ, thường được dệt kim, ôm vừa vặn cơ thể, cổ tròn và tay ngắn, 
                    có thể mặc bên trong hoặc như áo ngoài.
                </div>
                <div className="productdisplay-right-size">
                    <h1>Chọn cỡ</h1>
                    <div className="productdisplay-right-sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                <button onClick={()=>{addToCart(product.id)}}>Thêm vào giỏ hàng</button>
                <p className="productdisplay-right-category"><span>Loại: </span>Áo nữ, Áo thun, Crop Top</p>
                <p className="productdisplay-right-category"><span>Nhãn: </span>Thiết kế hiện đại, Sản phẩm mới nhất</p>
            </div>
        </div>
    );
}

export default memo(ProductDisplay);
import React, { useContext } from "react";
import { memo } from "react";
import './cartItem.css';
import { ShopContext } from "../../context/ShopContext";
import remove_icon from "../assets/cart_cross_icon.png";
import { formatter } from "../../utils/fomater";

const CartItems = () => {
    const {getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
    return (
        <div className="cartitems">
            <div className="cartitems-format-main">
                <p>Sản phẩm</p>
                <p>Tiêu đề</p>
                <p>Giá</p>
                <p>Số lượng</p>
                <p>Tổng giá</p>
                <p>Xóa</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <div>
                            <div className="cartitems-format cartitems-format-main">
                                <img src={e.image} alt="" className="carticon-product-icon" />
                                <p>{e.name}</p>
                                <p>{formatter(e.new_price)}</p>
                                <button className="cartitems-quantity">{cartItems[e.id]}</button>
                                <p>{formatter(e.new_price * cartItems[e.id])}</p>
                                <img className="cartitems-remove-icon" src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="" />
                            </div>
                            <hr />
                        </div>);
                }
                return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Tổng giỏ hàng</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Tạm tính</p>
                            <p>{formatter(getTotalCartAmount())}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Phí vận chuyển</p>
                            <p>Miễn phí</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Tổng tiền cần thanh toán</h3>
                            <h3>{formatter(getTotalCartAmount())}</h3>
                        </div>
                    </div>
                    <button>Tiến hành thanh toán</button>
                </div>
                <div className="cartitems-promocode">
                    <p>Nhập mã khuyến mãi tại đây</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder="Nhập mã khuyến mãi" />
                        <button>Chấp nhận</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(CartItems);
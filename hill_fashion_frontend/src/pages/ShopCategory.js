import React, { useContext } from "react";
import { memo } from "react";
import './css/shopCategory.css';
import {ShopContext } from "../context/ShopContext";
import dropdown_icon from '../components/assets/dropdown_icon.png';
import Item from "../components/item/item";
import { formatter } from "../utils/fomater";

const ShopCategory = (props) => {
    const { all_product } = useContext(ShopContext);
    return (
        <div className="shopcategory">
            <img  className="shopcategory-banner" src={props.banner} alt="" />
            <div className="shopcategory-indexSort">
                <p>
                    <span>Hiển thị 1-12</span> trong số 36 sản phẩm
                </p>
                <div className="shopcategory-sort">
                    Sắp xếp theo <img src={dropdown_icon} alt="" />
                </div>
            </div>
            <div className="shopcategory-products">
                {all_product.map((item,i) => {
                    if (props.category === item.category) {
                        return <Item key={i}
                            id={item.id}
                            name={item.name}
                            image={item.image}
                            new_price={formatter(item.new_price)}
                            old_price={formatter(item.old_price)} />;
                    } else {
                        return null;
                    }
                })}
            </div>
            <div className="shopcategory-loadmore">
                Khám phá thêm
            </div>
        </div>
    );
}

export default memo(ShopCategory);
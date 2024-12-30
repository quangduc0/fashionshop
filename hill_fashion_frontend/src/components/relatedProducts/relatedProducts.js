import React from "react";
import { memo } from "react";
import './relatedProducts.css';
import data_product from "../assets/data";
import Item from "../item/item";
import { formatter } from "../../utils/fomater";

const RelatedProducts = () => {
    return (
        <div className="relatedproducts">
            <h1>Sản phẩm liên quan</h1>
            <hr />
            <div className="relatedproducts-item">
                {data_product.map((item, i) => {
                    return <Item key={i}
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        new_price={formatter(item.new_price)}
                        old_price={formatter(item.old_price)} />
                })}
            </div>
        </div>
    );
}

export default memo(RelatedProducts);
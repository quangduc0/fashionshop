import React, { useEffect, useState } from "react";
import { memo } from "react";
import './relatedProducts.css';
//import data_product from "../assets/data";
import Item from "../item/item";
import { formatter } from "../../utils/fomater";
import { useParams } from "react-router-dom";

const RelatedProducts = ({category}) => {
    const [relatedProducts, setRelatedProducts] = useState([]);
    const { productId } = useParams(); // Lấy ID sản phẩm hiện tại để loại trừ khỏi sản phẩm liên quan

    useEffect(() => {
        // Gọi API để lấy sản phẩm liên quan theo danh mục
        fetch(`http://localhost:4000/relatedproducts/${category}`)
            .then((response) => response.json())
            .then((data) => {
                const filteredData = data.filter((item) => item.id !== Number(productId)); // Loại trừ sản phẩm hiện tại
                setRelatedProducts(filteredData);
            });
    }, [category, productId]); // Refresh khi danh mục hoặc ID sản phẩm thay đổi
    return (
        <div className="relatedproducts">
            <h1>Sản phẩm liên quan</h1>
            <hr />
            <div className="relatedproducts-item">
                {relatedProducts.map((item, i) => {
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
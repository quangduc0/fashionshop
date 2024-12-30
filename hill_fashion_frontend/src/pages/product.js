import React, { useContext }  from "react";
import { memo } from "react";
import { useParams } from "react-router-dom";
import Breadcrum from "../components/breadcrums/breadcrum";
import { ShopContext } from "../context/ShopContext";
import ProductDisplay from "../components/productDisplay/productDisplay";
import DecriptionBox from "../components/descriptionBox/decriptionBox";
import RelatedProducts from "../components/relatedProducts/relatedProducts";

const Product = () =>{
    const {all_product} = useContext(ShopContext);
    const {productId} = useParams();
    const product = all_product.find((e) => e.id===Number(productId));
    return (
        <div>
            <Breadcrum product={product}/>
            <ProductDisplay product={product}/>
            <DecriptionBox/>
            <RelatedProducts/>
        </div>
    );
}

export default memo(Product);
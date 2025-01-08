import React, { useEffect, useState }  from "react";
import { memo } from "react";
import './popular.css';
import Item from "../item/item";
import { formatter } from "../../utils/fomater";

const Popular = () =>{

    const [popularProducts, setPopularProducts] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:4000/popularinwomen').then((response)=>response.json())
                                                     .then((data)=>setPopularProducts(data));
    },[])

    return (
        <div className="popular">
            <h1>Phổ biến ở nữ</h1>
            <hr/>
            <div className="popular-item">
                {popularProducts.map((item,i)=>{
                    return <Item key={i} 
                                id={item.id} 
                                name={item.name} 
                                image={item.image} 
                                new_price={formatter(item.new_price)} 
                                old_price={formatter(item.old_price)}/>
                })}
            </div>
        </div>
    );
}

export default memo(Popular);
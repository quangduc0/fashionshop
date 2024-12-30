import React from "react";
import { memo } from "react";
import './newCollections.css';
import new_collection from '../assets/new_collections'
import Item from "../item/item";
import { formatter } from "../../utils/fomater";

const NewCollections = () => {

    return (
        <div className="new-collections">
            <h1>BỘ SƯU TẬP MỚI</h1>
            <hr />
            <div className="collections">
                {new_collection.map((item, i) => {
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

export default memo(NewCollections);
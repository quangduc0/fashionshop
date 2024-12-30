import React  from "react";
import { memo } from "react";
import Hero from "../components/hero/hero";
import Popular from "../components/popular/popular";
import Offers from "../components/offers/offers";
import NewCollections from "../components/newCollections/newCollections";
import NewsLetter from "../components/newsLetter/newsLetter";

const Shop = () =>{

    return (
        <div>
            <Hero/>
            <Popular/>
            <Offers/>
            <NewCollections/>
            <NewsLetter/>
        </div>
    );
}

export default memo(Shop);
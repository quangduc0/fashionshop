import React  from "react";
import { memo } from "react";
import CartItem from "../components/cartItems/cartItem";

const Cart = () =>{

    return (
        <div>
            <CartItem/>
        </div>
    );
}

export default memo(Cart);
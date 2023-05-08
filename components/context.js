/* /context/AppContext.js */

import { createContext } from "react";
// create auth context with default value

// set backup default for isAuthenticated if none is provided in Provider
const CartContext = createContext(
    {
        isAuthenticated:true, 
        cart: {items:[], total:0},
        addItem:()=>{},
        removeItem:()=>{},
        clearCart:()=>{}
    });

export default CartContext;
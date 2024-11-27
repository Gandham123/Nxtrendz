import React from "react";

const CartContest=React.createContext({
    cartListEl:[
],
    addProducts:()=>{},
    deleteProducts:()=>{},
    increaseProductsCount:()=>{},
    decreaseProductsCount:()=>{}
})

export default CartContest
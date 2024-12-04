import { createContext, useContext, useState } from "react";
const CartContext = createContext()
export const CartProvider = ({ children }) => {
    const [cartList, setCartList] = useState([])
    const contextValues = {
        cartList, setCartList
    }
    return <CartContext.Provider value={contextValues}>
        {children}
    </CartContext.Provider>
}
export const useCart = () => {
    return useContext(CartContext)
}
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ShopPage from "./pages/Shoppingpage"
import CartPage from "./pages/CartPage"
import ProductDetailsPage from "./pages/productDetails"



const App=()=>{
return(
  <BrowserRouter>
  <Routes>
    <Route path="/shop" Component={ShopPage}></Route>
    <Route path="/cart" Component={CartPage}></Route>
    <Route path="/product/:id" Component={ProductDetailsPage}></Route>
  </Routes>
  </BrowserRouter>
)
}
export default App
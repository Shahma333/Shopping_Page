import React, { Fragment } from 'react';
import { FaStar, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FaBagShopping } from 'react-icons/fa6';
import { useCart } from '../provider/cartprovider';
import toast from 'react-hot-toast';
import './CartPage.css'

const CartPage = () => {
    const { cartList, setCartList } = useCart();
    const handleGrandTotal = () => {
        const sum = cartList.reduce((total, product) => {
            const discountPrice = (product.price - (product.price * (product.discountPercentage / 100))).toFixed(2);
            const totalPrice = discountPrice * product.quantity;
            return total + totalPrice;
        }, 0);
        return sum;
    };
    const handleRemoveFromCart = (removeId) => {
        const res = cartList.filter(product => product.id != removeId);
        setCartList(res);
        toast.success("Product removed successfully");
    };
    const handleQuantityUpdate = (op, productId) => {
        const product = cartList.find((item) => item.id == productId);
        if (op === "-" && product.quantity === 1) {
            handleRemoveFromCart(productId);
            return;
        }
     const res = cartList.map(product => {
            if (product.id == productId) {
                if (op === "+") {
                    return { ...product, quantity: product.quantity + 1 };
                } else {
                    return { ...product, quantity: product.quantity - 1 };
                }
            }
            return product;
        });

        setCartList(res);
        toast.success("Product quantity updated");


        
    };

    return (
        <Fragment >
            <div className="cart-page">
            <h3 className="text-center my-2">Cart List</h3>
            <div className="d-flex justify-content-end m-2">
                <Link to={"/shop"} className="btn btn-primary d-flex align-items-center "> <FaBagShopping /> Shop Page </Link>
            </div>
            <div className="d-flex justify-content-center gap-2 flex-wrap mt-3">
                {
                    cartList.map(product => {
                        const discountPrice = (product.price - (product.price * (product.discountPercentage / 100))).toFixed(2);
                        return (
                            <div key={product.id} style={{ width: "15rem" }} className="bg-light p-2">
                                <div>
                                    <img src={product.images[0]} alt={product.title} style={{ width: "15rem" }} />
                                </div>
                                <div className="text-center">
                                    <h6>{product.title}</h6>
                                    <div className="w-100 d-flex justify-content-between">
                                        <div><FaStar /> {product.rating}</div>
                                        <div>
                                            <s className="text-muted">${product.price}</s> ${discountPrice}
                                        </div>
                                    </div>
                                    <div className="mt-3 d-flex justify-content-between align-items-center">
                                        <button
                                            className="btn btn-sm btn-success w-25 fs-4"
                                            onClick={() => handleQuantityUpdate("-", product.id)}
                                        >
                                            -
                                        </button>
                                        <div>{product.quantity}</div>
                                        <button
                                            className="btn btn-sm btn-success w-25 fs-4"
                                            onClick={() => handleQuantityUpdate("+", product.id)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between my-2">
                                        <div>Total: </div>
                                        <div>${(discountPrice * product.quantity).toFixed(2)}</div>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveFromCart(product.id)}
                                        className="bg-danger p-1 w-100 mt-2 border-0 text-light rounded"
                                    >
                                        <FaTrash /> Remove
                                    </button>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            <h3 className="text-center my-3">Grand Total: ${handleGrandTotal().toFixed(2)}</h3>
            </div>
        </Fragment>
    );
};

export default CartPage;


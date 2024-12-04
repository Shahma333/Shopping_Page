import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaShoppingCart, FaStar } from 'react-icons/fa';
import { useCart } from '../provider/cartprovider';
import toast from 'react-hot-toast';
import './ProductDetails.css';
import axios from 'axios';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { cartList, setCartList } = useCart();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const { data } = await axios.get(`https://dummyjson.com/products/${id}`);
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductDetails();
    }, [id]);

    const handleAddToCart = (product) => {
        const index = cartList.findIndex(cartItem => cartItem.id === product.id);
        if (index === -1) {
            product.quantity = 1;
            setCartList([product, ...cartList]);
        } else {
            const updatedCart = cartList.map(item => {
                if (item.id === product.id) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
            setCartList(updatedCart);
        }
        toast.success("Product added to cart!");
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found!</div>;
    }

    return (
        <div className="product-details">
            <div className="d-flex justify-content-between align-items-center m-1">
                <h3>{product.title}</h3>
                <Link to="/shop" className="btn btn-primary">Back to Shop</Link>
            </div>
            <div className="d-flex gap-4">
                <img src={product.images[0]} alt={product.title} style={{ width: "300px" }} />
                <div>
                    <h5>Price: ${(product.price - (product.price * (product.discountPercentage / 100))).toFixed(2)}</h5>
                    <p><FaStar /> {product.rating} stars</p>
                    <p><strong>Description:</strong> {product.description}</p>
                    <p><strong>Brand:</strong> {product.brand}</p>
                    <p><strong>Stock:</strong> {product.stock}</p>
                    <p><strong>Weight:</strong> {product.weight} kg</p>
                    <p><strong>Dimensions:</strong> {`Width: ${product.dimensions.width}, Height: ${product.dimensions.height}, Depth: ${product.dimensions.depth}`}</p>
                    <p><strong>Warranty Information:</strong> {product.warrantyInformation}</p>
                    <p><strong>Shipping Information:</strong> {product.shippingInformation}</p>
                    <p><strong>Availability Status:</strong> {product.availabilityStatus}</p>
                    <p><strong>Return Policy:</strong> {product.returnPolicy}</p>
                    <button onClick={() => handleAddToCart(product)} className="btn btn-success"><FaShoppingCart /> Add to Cart</button>
                    <div className="reviews mt-4">
                        <h4>Customer Reviews</h4>
                        {product.reviews && product.reviews.length > 0 ? (
                            product.reviews.map((review, index) => (
                                <div key={index} className="review">
                                    <p><FaStar /> {review.rating} stars</p>
                                    <p><strong>{review.reviewerName}</strong> ({review.reviewerEmail})</p>
                                    <p>{review.comment}</p>
                                    <small> Reviewed on{' '} {new Date(review.date).toLocaleDateString()} </small>
                                </div>
                            ))
                        ) : (
                            <p>No reviews available for this product.</p>
                        )}
                    </div>

                </div>
            </div>
        </div>

    );
};

export default ProductDetailsPage;



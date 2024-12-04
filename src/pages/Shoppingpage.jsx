import React, { useEffect, useState } from 'react';
import { FaShoppingCart, FaStar } from 'react-icons/fa';
import { useCart } from '../provider/cartprovider';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ShopPage.css';

const ShopPage = () => {
    const { cartList } = useCart();
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProducts = async () => {
        setIsLoading(true);
        const limit = 15; 
        const skip = (currentPage - 1) * limit;
        try {
            const response = await axios.get(`https://dummyjson.com/products?skip=${skip}&limit=${limit}`);
            setProducts(response.data.products);
            setTotalPages(Math.ceil(response.data.total / limit));
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [currentPage]);

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="shop-page">
         
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-control"
                />
            </div>
            <Link to="/cart" className="btn btn-success cart-button">
                <FaShoppingCart /> Cart ({cartList.length})
            </Link>
            <div className="page-content">
                {isLoading ? (
                    <p>Loading products...</p>
                ) : filteredProducts.length === 0 ? (
                    <p className="no-products">No products found</p>
                ) : (
                    filteredProducts.map(product => (
                        <div key={product.id} className="product-container">
                            <img src={product.images[0]} alt={product.title} />
                            <div className="text-center">
                                <h6>{product.title}</h6>
                                <div className="rating-price">
                                    <div>
                                        <FaStar /> {product.rating}
                                    </div>
                                    <div>
                                        <s className="text-muted">${product.price}</s>{' '}
                                        ${(
                                            product.price -
                                            (product.price * product.discountPercentage) / 100
                                        ).toFixed(2)}
                                    </div>
                                </div>
                                <Link to={`/product/${product.id}`} className="btn btn-info">
                                    View Product
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>

          
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <button
                        key={page}
                        className={`btn btn-sm ${page === currentPage ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setCurrentPage(page)}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ShopPage;

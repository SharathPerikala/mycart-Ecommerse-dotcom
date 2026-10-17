import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import WishlistButton from "./WishlistButton";

function ProductDetails({ product, onClose, onAddToCart, onBuyNow }) {
    const history = useHistory();

    useEffect(() => {
        const closeOnEscape = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", closeOnEscape);
        return () => document.removeEventListener("keydown", closeOnEscape);
    }, [onClose]);

    if (!product) {
        return null;
    }

    return (
        <div className="product-details-backdrop" onClick={onClose}>
            <section
                className="product-details-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="product-details-title"
                onClick={(event) => event.stopPropagation()}
            >
                <button className="product-details-close" type="button" aria-label="Close product details" onClick={onClose}>
                    &times;
                </button>
                <img src={product.image} alt={product.title} />
                <div className="product-details-content">
                    <WishlistButton product={product} />
                    {product.category && <p className="search-product-category">{product.category}</p>}
                    <h2 id="product-details-title">{product.title}</h2>
                    {product.description && <p>{product.description}</p>}
                    {product.price && <strong>{product.price}</strong>}
                    <div className="product-details-actions">
                        <button className="btn btn-outline-danger" type="button" onClick={() => onAddToCart(product)}>
                            Add to Cart
                        </button>
                        <button
                            className="btn btn-danger"
                            type="button"
                            onClick={() => {
                                onBuyNow(product);
                                onClose();
                                history.push("/Cart");
                            }}
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ProductDetails;

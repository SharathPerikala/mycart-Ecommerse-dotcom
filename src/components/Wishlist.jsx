import React from "react";
import { useWishlist } from "./WishlistContext";

function Wishlist() {
    const { items, removeFromWishlist } = useWishlist();

    return (
        <main className="wishlist-page">
            <h1>Your wishlist <span className="wishlist-heading-heart" aria-hidden="true">♥</span></h1>
            {items.length ? (
                <div className="search-product-grid">
                    {items.map((product) => (
                        <article className="search-product" key={product.id}>
                            <img className="product-image-button" src={product.image} alt={`View details for ${product.title}`} />
                            <div className="search-product-info">
                                {product.category && <p className="search-product-category">{product.category}</p>}
                                <h3>{product.title}</h3>
                                {(product.description || product.details) && <p>{product.description || product.details}</p>}
                                {product.price && <strong>{product.price}</strong>}
                                <div className="wishlist-item-actions">
                                    <button className="btn btn-danger" type="button">Add to Cart</button>
                                    <button className="btn btn-outline-danger" type="button" onClick={() => removeFromWishlist(product.id)}>Remove</button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <p>No saved products yet. Select the heart on a product to add it here.</p>
            )}
        </main>
    );
}

export default Wishlist;

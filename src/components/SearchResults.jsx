import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { getProducts } from "./productCatalog";
import { searchProducts } from "./productSearch";
import WishlistButton from "./WishlistButton";

function SearchResults() {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("q") || "";
    const products = useMemo(() => getProducts(), []);
    const matches = searchProducts(products, query);

    return (
        <main className="search-results">
            <h2>Search results for “{query}”</h2>
            {matches.length ? (
                <div className="search-product-grid">
                    {matches.map((product) => (
                        <article className="search-product" key={product.id}>
                            <img className="product-image-button" src={product.image} alt={`View details for ${product.title}`} title="Click to view product details" />
                            <WishlistButton product={product} />
                            <div className="search-product-info">
                                <p className="search-product-category">{product.category}</p>
                                <h3>{product.title}</h3>
                                {product.details && <p>{product.details}</p>}
                                {product.price && <strong>{product.price}</strong>}
                                <button type="button" className="btn btn-danger search-add-to-cart">Add to Cart</button>
                            </div>
                        </article>
                    ))}
                </div>
            ) : query.trim() ? (
                <p>No products found for “{query}”. Try another search.</p>
            ) : (
                <p>Start typing a product name to see matching products.</p>
            )}
        </main>
    );
}

export default SearchResults;

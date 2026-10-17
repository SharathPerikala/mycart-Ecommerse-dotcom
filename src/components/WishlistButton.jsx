import React, { useEffect, useRef, useState } from "react";
import { useWishlist } from "./WishlistContext";

function getProductFromCard(card) {
    const title = card && card.querySelector(".card-header h6, .search-product-info h3, h6, h3");
    const image = card && card.querySelector("img");
    if (!title || !image) {
        return null;
    }

    const price = card.querySelector(".card-header h4, .search-product-info strong, h4, strong");
    const category = card.querySelector(".search-product-category");
    const description = Array.from(card.querySelectorAll(".card-header p, .search-product-info > p"))
        .map((paragraph) => paragraph.textContent.trim())
        .filter((text) => text && !/free shipping/i.test(text))
        .join(" ");

    return {
        id: image.getAttribute("src") || title.textContent.trim(),
        title: title.textContent.trim(),
        image: image.getAttribute("src") || "",
        price: price ? price.textContent.trim() : "",
        category: category ? category.textContent.trim() : "",
        description
    };
}

function WishlistButton({ product: productProp }) {
    const buttonRef = useRef(null);
    const [cardProduct, setCardProduct] = useState(null);
    const { toggleWishlist, isWishlisted } = useWishlist();
    const product = productProp || cardProduct;

    useEffect(() => {
        if (!productProp && buttonRef.current) {
            setCardProduct(getProductFromCard(buttonRef.current.closest(".pricing-column, .search-product")));
        }
    }, [productProp]);

    const saved = product ? isWishlisted(product.id) : false;

    return (
        <button
            ref={buttonRef}
            className={`wishlist-heart${saved ? " is-wishlisted" : ""}`}
            type="button"
            aria-label={saved ? `Remove ${product ? product.title : "product"} from wishlist` : `Add ${product ? product.title : "product"} to wishlist`}
            aria-pressed={saved}
            disabled={!product}
            onClick={() => product && toggleWishlist(product)}
        >
            {saved ? "♥" : "♡"}
        </button>
    );
}

export default WishlistButton;

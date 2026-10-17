import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const WishlistContext = createContext(null);

function loadWishlist() {
    if (typeof localStorage === "undefined") {
        return [];
    }

    try {
        return JSON.parse(localStorage.getItem("mycart-wishlist") || "[]");
    } catch (error) {
        console.error("Could not load saved wishlist.", error);
        return [];
    }
}

export function WishlistProvider({ children }) {
    const [items, setItems] = useState(loadWishlist);

    useEffect(() => {
        if (typeof localStorage === "undefined") {
            return;
        }

        try {
            localStorage.setItem("mycart-wishlist", JSON.stringify(items));
        } catch (error) {
            console.error("Could not save wishlist.", error);
        }
    }, [items]);

    const toggleWishlist = (product) => {
        setItems((currentItems) => currentItems.some((item) => item.id === product.id)
            ? currentItems.filter((item) => item.id !== product.id)
            : currentItems.concat(product));
    };

    const removeFromWishlist = (id) => {
        setItems((currentItems) => currentItems.filter((item) => item.id !== id));
    };

    const value = useMemo(() => ({
        items,
        toggleWishlist,
        removeFromWishlist,
        isWishlisted: (id) => items.some((item) => item.id === id)
    }), [items]);

    return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error("useWishlist must be used inside WishlistProvider.");
    }
    return context;
}

import React from "react";
import ReactDOMServer from "react-dom/server";
import Electronics from "./Electronics";
import Mobiles from "./Mobiles";
import HomeKitchen from "./HomeKitchen";
import Men from "./Men";
import Women from "./Women";
import Kids from "./kids";
import Sports from "./Sports";
import Accessories from "./accessories";
import Furniture from "./furniture";
import Footwear from "./Footwear";
import { WishlistProvider } from "./WishlistContext";

const catalogs = [
    ["Accessories", Accessories],
    ["Electronics", Electronics],
    ["Footwear", Footwear],
    ["Home & Furniture", Furniture],
    ["Home & Kitchen", HomeKitchen],
    ["Kids", Kids],
    ["Men", Men],
    ["Mobiles", Mobiles],
    ["Sports", Sports],
    ["Women", Women]
];

let cachedProducts;

export function getProducts() {
    if (cachedProducts) {
        return cachedProducts;
    }

    cachedProducts = catalogs.reduce((products, [category, Catalog]) => {
        const markup = ReactDOMServer.renderToStaticMarkup(
            <WishlistProvider>
                <Catalog />
            </WishlistProvider>
        );
        const catalogDocument = new DOMParser().parseFromString(markup, "text/html");
        const categoryProducts = Array.from(catalogDocument.querySelectorAll(".pricing-column"))
            .map((card, index) => {
                const title = card.querySelector(".card-header h6, h6");
                const image = card.querySelector("img");

                if (!title || !image) {
                    return null;
                }

                const details = Array.from(card.querySelectorAll(".card-header p"))
                    .map((paragraph) => paragraph.textContent.trim())
                    .filter((text) => text && !/free shipping/i.test(text))
                    .join(" ");
                const price = card.querySelector(".card-header h4");

                return {
                    id: `${category}-${index}-${image.getAttribute("src")}`,
                    category,
                    title: title.textContent.trim(),
                    image: image.getAttribute("src"),
                    details,
                    price: price ? price.textContent.trim() : ""
                };
            })
            .filter(Boolean);

        return products.concat(categoryProducts);
    }, []);

    return cachedProducts;
}

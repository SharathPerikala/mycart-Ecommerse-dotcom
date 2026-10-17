export function normalizeSearchText(value) {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
}

export function rankProductMatch(product, query) {
    const normalizedQuery = normalizeSearchText(query);
    if (!normalizedQuery) {
        return 0;
    }

    const normalizedTitle = normalizeSearchText(product.title);
    const normalizedCategory = normalizeSearchText(product.category);
    const normalizedDetails = normalizeSearchText(product.details);
    const queryWords = normalizedQuery.split(/\s+/);
    const searchableText = `${normalizedTitle} ${normalizedCategory} ${normalizedDetails}`;

    if (!queryWords.every((word) => searchableText.includes(word))) {
        return 0;
    }

    if (normalizedTitle === normalizedQuery) {
        return 1000;
    }
    if (normalizedTitle.startsWith(normalizedQuery)) {
        return 800;
    }
    if (normalizedTitle.split(/\s+/).some((word) => word.startsWith(normalizedQuery))) {
        return 700;
    }
    if (normalizedTitle.includes(normalizedQuery)) {
        return 600;
    }
    if (normalizedCategory.startsWith(normalizedQuery)) {
        return 500;
    }
    return 400;
}

export function searchProducts(products, query) {
    return products
        .map((product) => ({ product, score: rankProductMatch(product, query) }))
        .filter((match) => match.score > 0)
        .sort((first, second) =>
            second.score - first.score ||
            first.product.title.localeCompare(second.product.title, undefined, { sensitivity: "base" })
        )
        .map((match) => match.product);
}

import React, { useState } from "react";
import {Link, useHistory, useLocation}from "react-router-dom";
import { getProducts } from "./productCatalog";
import { searchProducts as findProducts } from "./productSearch";
import { useWishlist } from "./WishlistContext";


function Header({ cartCount = 0 }){
    const history = useHistory();
    const location = useLocation();
    const [suggestionsOpen, setSuggestionsOpen] = useState(false);
    const { items: wishlistItems } = useWishlist();
    const query = new URLSearchParams(location.search).get("q") || "";
    const products = React.useMemo(() => getProducts(), []);
    const suggestions = query.trim() ? findProducts(products, query).slice(0, 8) : [];

    const updateSearch = (event) => {
        const value = event.target.value;
        const destination = value.trim() ? `/Search?q=${encodeURIComponent(value)}` : "/";
        setSuggestionsOpen(Boolean(value.trim()));
        history.replace(destination);
    };

    const selectSuggestion = (product) => {
        history.push(`/Search?q=${encodeURIComponent(product.title)}`);
        setSuggestionsOpen(false);
    };

    const searchProducts = (event) => {
        event.preventDefault();
        const query = event.currentTarget.elements.productSearch.value.trim();

        if (query) {
            history.replace(`/Search?q=${encodeURIComponent(query)}`);
            setSuggestionsOpen(false);
        }
    };

    return (
      <>
        <section id="title">
          <div className="main" id="demo"><h1 className="logo"><i class="fas fa-people-carry"></i> mycart</h1><form className="product-search" onSubmit={searchProducts}><input className="searchinput" name="productSearch" type="search" placeholder="Search for products, brands and more" aria-label="Search products" aria-autocomplete="list" aria-expanded={suggestionsOpen && suggestions.length > 0} aria-controls="product-suggestions" value={query} onFocus={() => setSuggestionsOpen(Boolean(query.trim()))} onBlur={() => setSuggestionsOpen(false)} onChange={updateSearch}></input>{suggestionsOpen && suggestions.length > 0 && <ul className="product-suggestions" id="product-suggestions" role="listbox">{suggestions.map((product) => <li key={product.id}><button type="button" role="option" onMouseDown={(event) => event.preventDefault()} onClick={() => selectSuggestion(product)}><span>{product.title}</span><small>{product.category}</small></button></li>)}</ul>}<button className="searchbutton" type="submit"><i class="fas fa-search"></i> Search</button></form></div>
            
        </section>
        <nav className="navbar navbar-expand-lg navbar-dark" aria-label="Main navigation">
        <div className="navbar-collapse">
          <ul class="navbar-nav ml-auto">
            
           <Link class="nav-link" to="/Mycart">
            <li class="navbar-brand">mycart</li>
            </Link>
           <Link class="nav-link" to="/Mobiles">
            <li class="nav-item">Mobiles</li>
            </Link>
            <Link class="nav-link" to="/accessories">
            <li class="nav-item">Accessories</li>
            </Link>
            <Link class="nav-link" to="/Electronics">
            <li class="nav-item">Electronics</li>
            </Link>
            <Link class="nav-link"to="/HomeKitchen">
            <li class="nav-item"> Kitchen & Appliances</li>
            </Link>
            <Link class="nav-link"to="/furniture">
            <li class="nav-item">Home & Furniture</li>
            </Link>
            <Link class="nav-link"to="/Men">
            <li class="nav-item">Men</li>
            </Link>
            <Link class="nav-link"to="/Women">
            <li class="nav-item">Women</li>
            </Link>
            <Link class="nav-link"to="/Kids">
            <li class="nav-item">Kids</li>
            </Link>
            <Link class="nav-link"to="/Footwear">
            <li class="nav-item">Footwear</li>
            </Link>
            <Link class="nav-link"to="/Sports">
            <li class="nav-item">Sports</li>
            </Link>
            <Link class="nav-link"to="/Helpline">
            <li class="nav-item">Helpline</li>
            </Link>
            <Link className="nav-link nav-action-link" to="/Cart">
            <li class="navbar-brand">Cart ({cartCount}) <i class="fas fa-shopping-cart"></i></li>
            </Link>
            <Link className="nav-link nav-action-link" to="/Wishlist">
            <li class="navbar-brand"><span className="nav-wishlist-heart" aria-hidden="true">♥</span> Wishlist ({wishlistItems.length})</li>
            </Link>
            <Link className="nav-link nav-action-link" to="/Signin">
            <li class="navbar-brand">Sign In <i class="fas fa-user-circle"></i></li>
            </Link>
            
        
    </ul>
    
     
 </div>

</nav>
      </>
)
}

export default Header;
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Signin from "./Signin";
import Electronics from"./Electronics";
import Mobiles from"./Mobiles";
import HomeKitchen from "./HomeKitchen";
import Men from"./Men";
import Women from"./Women";
import Kids from"./kids";
import Sports from"./Sports";
import Helpline from"./Helpline";
import Cart from "./Cart";
import accessories from"./accessories";
import furniture from"./furniture";
import Footwear from "./Footwear"
import SearchResults from "./SearchResults";
import ProductDetails from "./ProductDetails";
import Wishlist from "./Wishlist";
import { WishlistProvider } from "./WishlistContext";
import {HashRouter as Router,Switch,Route} from 'react-router-dom';



function App(){
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cartItems, setCartItems] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("mycart-items") || "[]");
        } catch (error) {
            console.error("Could not load saved cart items.", error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem("mycart-items", JSON.stringify(cartItems));
        } catch (error) {
            console.error("Could not save cart items.", error);
        }
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems((items) => {
            const existing = items.find((item) => item.id === product.id);
            return existing
                ? items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
                : items.concat({ ...product, quantity: 1 });
        });
    };

    const handleProductAction = (event) => {
        const button = event.target.closest("button");
        const isAddToCart = button && button.textContent.trim() === "Add to Cart";
        const clickedImage = event.target.closest("img");
        if (!isAddToCart && !clickedImage) return;

        const card = (button || clickedImage).closest(".pricing-column, .search-product");
        if (!card) return;
        const title = card && card.querySelector(".card-header h6, .search-product-info h3, h6, h3");
        const image = card && card.querySelector("img");
        const price = card && card.querySelector(".card-header h4, .search-product-info strong, h4, strong");
        const category = card && card.querySelector(".search-product-category");
        const description = Array.from(card.querySelectorAll(".card-header p, .search-product-info > p"))
            .map((paragraph) => paragraph.textContent.trim())
            .filter((text) => text && !/free shipping/i.test(text))
            .join(" ");

        if (!title || !image) {
            if (isAddToCart) {
                console.error("Could not add product to cart: product name or image is missing.");
            }
            return;
        }

        const productTitle = title.textContent.trim();
        const product = {
            id: image.getAttribute("src") || productTitle,
            title: productTitle,
            image: image.getAttribute("src") || "",
            price: price ? price.textContent.trim() : "",
            category: category ? category.textContent.trim() : "",
            description
        };

        if (isAddToCart) {
            addToCart(product);
        } else {
            setSelectedProduct(product);
        }
    };

    const updateQuantity = (id, quantity) => {
        setCartItems((items) => items
            .map((item) => item.id === id ? { ...item, quantity } : item)
            .filter((item) => item.quantity > 0));
    };

    const removeFromCart = (id) => {
        setCartItems((items) => items.filter((item) => item.id !== id));
    };

    return <WishlistProvider>
      <div className="app-shell">
        <Router>
        <div className="app-content" onClick={handleProductAction}>
        <Header cartCount={cartItems.reduce((total, item) => total + item.quantity, 0)} />
        
        <Switch>
        
        <Route path="/" exact component={Home}/>
        <Route path="/Mycart"component={Home}/>
        <Route path="/Mobiles" component={Mobiles}/>
        <Route path="/accessories" component={accessories}/>
        <Route path="/Electronics" component={Electronics}/>
        <Route path="/HomeKitchen" component={HomeKitchen}/>
        <Route path="/furniture" component={furniture}/>
        <Route path="/Men" component={Men}/>
        <Route path="/Women" component={Women}/>
        <Route path="/Kids" component={Kids}/>
        <Route path="/Footwear" component={Footwear}/>
        <Route path="/Sports" component={Sports}/>
        <Route path="/Helpline" component={Helpline}/>
        <Route path="/Cart" render={() => <Cart items={cartItems} updateQuantity={updateQuantity} removeFromCart={removeFromCart} clearCart={() => setCartItems([])} />}/>
        <Route path="/Signin" render={() => <main className="signin-layout"><Signin/></main>}/>
        <Route path="/Search" component={SearchResults}/>
        <Route path="/Wishlist" component={Wishlist}/>

        </Switch>
        <ProductDetails
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={(product) => {
                addToCart(product);
                setSelectedProduct(null);
            }}
            onBuyNow={addToCart}
        />
        </div>
        </Router>
        <Footer />
        
       
    
        </div>
    </WishlistProvider>
}
const Home=()=>(
    <div>
        <section id="testimonials">

<div id="testimonial-carousel" class="carousel slide" data-ride="True" data-interval="2000">
  <div class="carousel-inner">
    <div class="carousel-item active">
      
    <h1 class="testimonial-text"></h1>
      <img class="testimonial-img" src="images/mobileimages/Apple iphone 7plus.jpeg" alt="iphone7plus" />
      <img class="testimonial-img" src="images/mobileimages/OnePlus 7T pro.jpeg" alt="oneplus7T" />
      <img class="testimonial-img" src="images/mobileimages/Samsung Galaxy M31.jpeg" alt="samsungm31" />
      <img class="testimonial-img" src="images/mobileimages/Oppo A52.jpeg" alt="oppoA52" />
      <img class="testimonial-img" src="images/mobileimages/Redmi Note8.jpeg" alt="redmi8" />
     <h2><b>Apple iphone 7 Plus</b>|<b>OnePlus 7T Pro</b>|<b>Samsung Galaxy M31</b>|<b>Oppo A52|Redmi Note8</b></h2>
      </div>
    <div class="carousel-item">
      <h1 class="testimonial-text"></h1>
      <img class="testimonial-img-headset" src="images/accessoriesimages/Samsung Level U Bluetooth Headset blue.jpeg" alt="samsungbluetooth" />
     <img class="testimonial-img-headset" src="images/accessoriesimages/Samsung Level U Bluetooth Headset grey.jpeg" alt="samsungbluetooth" />
     <img class="testimonial-img-headset" src="images/accessoriesimages/Mi Basic Wired Headset with Mic black.jpeg" alt="Miheadset" />
     <img class="testimonial-img-headset" src="images/accessoriesimages/CHG Big LED Ring Light with Tripod for Camera.jpeg" alt="ringlight" />
      <h2><b>Samsung Level U Bluetooth Headset</b>|<b>Mi Basic Wired Headset</b>|<b>LED Ring Light with Tripod</b></h2>
    </div>
   
    <div class="carousel-item">
      <h1 class="testimonial-text"></h1>
      <img class="testimonial-img-headset" src="images/electronicsimages/Samsung 123cm (49 inch) Full HD LED Smart TV.jpeg" alt="samsungtv" />
     <img class="testimonial-img-headset" src="images/electronicsimages/Bosch 6 kg Fully Automatic Front Load with In-built Heater White.jpeg" alt="bosch" />
     <img class="testimonial-img-headset" src="images/electronicsimages/Godrej 231 L Frost Free Double Door 2 Star (2016) Refrigerator.jpeg" alt="godrej" />
     <img class="testimonial-img-headset" src="images/electronicsimages/Whirlpool 0.8 Ton 3 Star Split Inverter AC - White.jpeg" alt="Whirlpool" />
     <h2><b>Samsung (49 inch)Full HD LED Smart TV</b>|<b>Bosch 6 kg Fully Automatic</b>|<b>Godrej 231 L Refrigerator</b>|<b>Whirlpool 0.8 Ton 3 Star Split Inverter AC</b></h2>
    </div>
    <div class="carousel-item">
      <h1 class="testimonial-text"></h1>
      <img class="testimonial-img-headset" src="images/homekitchenimages/Prestige Nakshatra Plus Red Handi 3 L.jpeg" alt="prestige" />
     <img class="testimonial-img-headset" src="images/homekitchenimages/Renberg Blue Orchid Fry Pan.jpeg" alt="renbergblue" />
     <img class="testimonial-img-headset" src="images/homekitchenimages/Butterfly Rapid 4 Jar 750 watts 750 W Juicer Mixer Grinder.jpeg" alt="butterflyrapid4" />
     <h2><b>Prestige Nakshatra Plus Red Handi 3 L</b>|<b>Renberg Blue Orchid Fry Pan</b>|<b>Butterfly Rapid 4 Jar 750 watts 750 W Juicer Mixer Grinder</b></h2>
    </div>
    <div class="carousel-item">
      <h1 class="testimonial-text"></h1>
      <img class="testimonial-img-headset" src="images/furnitureimages/Kurlon Photon Fabric 3Seater Sofa.jpeg" alt="kurlon" />
     <img class="testimonial-img-headset" src="images/furnitureimages/SUNCROWN FURNITURE Sheesham Wood Solid Wood 6 Seater Dining Set.jpeg" alt="suncrown" />
     <img class="testimonial-img-headset" src="images/furnitureimages/Home Edge Sheesham Wood Solid Wood King Bed.jpeg" alt="Homeedge" />
     <h2><b>Kurlon Photon Fabric 3Seater Sofa</b>|<b>SUNCROWN FURNITURE Sheesham Wood Solid Wood 6 Seater Dining Set</b>|<b>Home Edge Sheesham Wood Solid Wood King Bed</b></h2>
    </div>
    <div class="carousel-item">
      <h1 class="testimonial-text"></h1>
      <img class="testimonial-img-men" src="images/menimages/Men Solid Casual Slim Shirt.jpeg" alt="mensolid" />
     <img class="testimonial-img-men" src="images/menimages/Regular Fit Men Black Cotton Blend Trousers.jpeg" alt="regularfitmen" />
     <img class="testimonial-img-men" src="images/menimages/Solid Men Three Fourths.jpeg" alt="solidmen" />
     <img class="testimonial-img-men" src="images/menimages/Color Block Men Hooded Neck White, Blue, Yellow T-Shirt.jpeg" alt="colorblock" />
     <h2><b>Mens Casuals Shirts</b>|<b>Mens Regular Fit Phants|Mens Three Fourths|Mens TShirts</b>|</h2>
    </div>
    <div class="carousel-item">
      <h1 class="testimonial-text"></h1>
      <img class="testimonial-img-men" src="images/womenimages/Printed Women Round Neck Yellow T-Shirt.jpeg" alt="printedwomen" />
     <img class="testimonial-img-men" src="images/womenimages/Saara Poly Crepe Printed Salwar Suit Material  (Unstitched).jpeg" alt="sarapoly" />
     <img class="testimonial-img-men" src="images/womenimages/Striped, Woven, Embellished Banarasi Cotton Silk Saree  (Red, Black).jpeg" alt="striped" />
     <img class="testimonial-img-men" src="images/womenimages/Embroidered Semi Stitched Lehenga Choli  (Purple).jpeg" alt="embroided" />
     <h2><b>Womens Shirts|Womens Salwar Suit|Womens Cotten Silk Saree|Womens lehenga Choli</b>|</h2>
    </div>
    <div class="carousel-item">
      <h1 class="testimonial-text"></h1>
      <img class="testimonial-img-kids" src="images/kidsimages/Girls MidiKnee Length Party Dress  (Multicolor, Sleeveless).jpeg" alt="girls" />
      <img class="testimonial-img-kids" src="images/kidsimages/Girls Calf Length Party Dress  (Dark Blue, 3 4 Sleeve).jpeg" alt="girls" />
     <img class="testimonial-img-kids" src="images/kidsimages/Dungaree For Boys & Girls Casual Solid Denim  (White, Pack of 1).jpeg" alt="dungaree" />
     <img class="testimonial-img-kids" src="images/kidsimages/Girls MidiKnee Length Casual Dress  (White, Sleeveless).jpeg" alt="girls" />
     <img class="testimonial-img-kids" src="images/kidsimages/Girls MidiKnee Length Casual Dress  (Pink, Sleeveless).jpeg" alt="girls" />
     <img class="testimonial-img-kids" src="images/kidsimages/My Baby Excels Plush Doll Pink with Stripes 35 cm  (Pink).jpeg" alt="mybaby" />
     <h2><b>Kids Corner</b></h2>
    </div>
    <div class="carousel-item">
      <h1 class="testimonial-text"></h1>
      <img class="testimonial-img-men" src="images/footwearimages/EEZAY MAXOUT Flip Flops.jpeg" alt="eezay" />
     <img class="testimonial-img-men" src="images/footwearimages/Double Soft Comfortable Grass Eva Rubber Healthy Slippers For Men's And Boy's Flip Flops.jpeg" alt="double" />
     <img class="testimonial-img-men" src="images/footwearimages/Casual Slippers Flip Flops.jpeg" alt="casual" />
     <img class="testimonial-img-men" src="images/footwearimages/Puma Flip Flops.jpeg" alt="puma" />
     <h2><b>Mens Foot Wear</b></h2>
    </div>
    <div class="carousel-item">
      <h1 class="testimonial-text"></h1>
      <img class="testimonial-img-women" src="images/footwearimages/Women Pink Flats Sandals.jpeg" alt="women" />
     <img class="testimonial-img-women" src="images/footwearimages/Women Multicolor Flats Sandal.jpeg" alt="women" />
     <img class="testimonial-img-women" src="images/footwearimages/Women Blue Flats Sandal.jpeg" alt="women" />
     
     <h2><b>Womens Foot Wear</b></h2>
    </div>
   
</div>
  <a class="carousel-control-prev" href="#testimonial-carousel" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon"></span>

  </a>
  <a class="carousel-control-next" href="#testimonial-carousel" role="button" data-slide="next">
    <span class="carousel-control-next-icon"></span>
    
  </a>
</div>

</section>
        
    </div>
);


export default App;
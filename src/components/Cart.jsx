import React, { useState } from "react";

function Cart({ items, updateQuantity, removeFromCart, clearCart }){
    const [address, setAddress] = useState({
        fullName: "",
        phone: "",
        street: "",
        city: "",
        region: "",
        postalCode: ""
    });
    const [showPayment, setShowPayment] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [orderPlaced, setOrderPlaced] = useState(false);
    const total = items.reduce((sum, item) => {
        const amount = Number((item.price || "").replace(/[^\d.]/g, ""));
        return sum + (Number.isFinite(amount) ? amount * item.quantity : 0);
    }, 0);

    const updateAddress = (event) => {
        setAddress({ ...address, [event.target.name]: event.target.value });
    };

    const continueToPayment = (event) => {
        event.preventDefault();
        setShowPayment(true);
    };

    const placeOrder = (event) => {
        event.preventDefault();
        if (!paymentMethod) {
            return;
        }
        setOrderPlaced(true);
        clearCart();
    };

    if (orderPlaced) {
        return (
            <main className="cart-page">
                <h1>Order placed</h1>
                <p>Your order has been recorded. Payment processing is not connected in this demo.</p>
            </main>
        );
    }

    if (!items.length) {
        return (
            <main className="cart-page cart-empty">
                <i className="fas fa-shopping-cart fa-5x" aria-hidden="true"></i>
                <h1>Your cart is empty</h1>
                <p>Add products to your cart to continue.</p>
            </main>
        );
    }

    return (
        <main className="cart-page">
            <h1>Your cart</h1>
            <div className="cart-layout">
                <section className="cart-items" aria-label="Cart items">
                    {items.map((item) => (
                        <article className="cart-item" key={item.id}>
                            <img src={item.image} alt={item.title} />
                            <div className="cart-item-details">
                                <h2>{item.title}</h2>
                                {item.category && <p>{item.category}</p>}
                                <strong>{item.price}</strong>
                                <label>
                                    Quantity
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(event) => updateQuantity(item.id, Math.max(1, Number(event.target.value) || 1))}
                                    />
                                </label>
                                <button type="button" className="btn btn-outline-danger" onClick={() => removeFromCart(item.id)}>Remove</button>
                            </div>
                        </article>
                    ))}
                    <p className="cart-total">Total: ₹{total.toLocaleString("en-IN")}</p>
                </section>

                <section className="checkout-section">
                    <h2>Delivery address</h2>
                    {!showPayment ? (
                        <form className="checkout-form" onSubmit={continueToPayment}>
                            <label>Full name<input name="fullName" autoComplete="name" value={address.fullName} onChange={updateAddress} required /></label>
                            <label>Phone number<input name="phone" type="tel" inputMode="numeric" autoComplete="tel" pattern="[0-9]{7,15}" maxLength="15" value={address.phone} onChange={updateAddress} required /></label>
                            <label>Street address<textarea name="street" autoComplete="street-address" value={address.street} onChange={updateAddress} required /></label>
                            <label>City<input name="city" autoComplete="address-level2" value={address.city} onChange={updateAddress} required /></label>
                            <label>State / region<input name="region" autoComplete="address-level1" value={address.region} onChange={updateAddress} required /></label>
                            <label>Postal code<input name="postalCode" autoComplete="postal-code" value={address.postalCode} onChange={updateAddress} required /></label>
                            <button className="btn btn-danger" type="submit">Buy Now</button>
                        </form>
                    ) : (
                        <form className="checkout-form" onSubmit={placeOrder}>
                            <h2>Choose a payment option</h2>
                            {["UPI", "Credit / debit card", "Net banking", "Cash on delivery"].map((method) => (
                                <label className="payment-option" key={method}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value={method}
                                        checked={paymentMethod === method}
                                        onChange={(event) => setPaymentMethod(event.target.value)}
                                        required
                                    />
                                    <span className="payment-option-content">
                                        <span>{method}</span>
                                        {method === "UPI" && (
                                            <span className="upi-apps" aria-label="Available UPI apps">
                                                <span className="upi-app google-pay" role="img" aria-label="Google Pay">
                                                    <span className="upi-app-mark">G</span>Google Pay
                                                </span>
                                                <span className="upi-app phonepe" role="img" aria-label="PhonePe">
                                                    <span className="upi-app-mark">P</span>PhonePe
                                                </span>
                                                <span className="upi-app paytm" role="img" aria-label="Paytm">
                                                    <span className="upi-app-mark">P</span>Paytm
                                                </span>
                                            </span>
                                        )}
                                    </span>
                                </label>
                            ))}
                            <button className="btn btn-danger" type="submit" disabled={!paymentMethod}>Place order</button>
                            <button className="btn btn-link" type="button" onClick={() => setShowPayment(false)}>Edit address</button>
                        </form>
                    )}
                </section>
            </div>
        </main>
    );
}

export default Cart;
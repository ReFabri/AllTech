import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from "axios";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Container from "react-bootstrap/Container";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import OrderScreen from "./screens/OrderScreen";
import PaymentScreen from "./screens/PaymentScreen";
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";

// The react-bootstrap style was made with BootSwatch
// using the United theme via the bootstrap.min.css

const App = () => {
  const [clientID, setClientID] = useState("");

  useEffect(() => {
    const getClientId = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      setClientID(clientId);
    };
    if (!window.paypal) {
      getClientId();
    }
  }, []);

  return (
    <>
      {clientID && (
        <PayPalScriptProvider options={{ "client-id": clientID }}>
          <BrowserRouter>
            <Header />
            <main className="py-3">
              <Container>
                <Routes>
                  <Route path="/shipping" element={<ShippingScreen />} />
                  <Route path="/payment" element={<PaymentScreen />} />
                  <Route path="/placeorder" element={<PlaceOrderScreen />} />
                  <Route path="/login" element={<LoginScreen />} />
                  <Route path="/register" element={<RegisterScreen />} />
                  <Route path="/profile" element={<ProfileScreen />} />
                  <Route path="/order/:id" element={<OrderScreen />} />
                  <Route path="/product/:id" element={<ProductScreen />} />
                  <Route path="/cart/:id?" element={<CartScreen />} />
                  <Route path="/" element={<HomeScreen />} />
                </Routes>
              </Container>
            </main>
            <Footer />
          </BrowserRouter>
        </PayPalScriptProvider>
      )}
    </>
  );
};

export default App;

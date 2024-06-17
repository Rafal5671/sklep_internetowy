// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from './AuthContext';
import { CartProvider } from './components/cart/CartContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import SearchResults from './pages/SearchResults';
import Delivery from "./pages/DeliveryPage";
import OrderSummaryPage from "./pages/Summary";
import AdminPage from "./pages/AdminPage";
import PaymentSuccess from "./pages/Succes";
import PaymentFailure from "./pages/Failure";
import Terms from './pages/Terms';
import AppNavbar from './components/navigation/Navbar';
import Footer from './components/navigation/Footer';

function Layout({ children }) {
    const location = useLocation();
    const isAdminPage = location.pathname === '/admin';

    return (
        <div style={{ minHeight: "calc(100vh - 100px)", display: "flex", flexDirection: "column" }}>
            {!isAdminPage && <AppNavbar />}
            <div style={{ flex: 1 }}>
                {children}
            </div>
            {!isAdminPage && <Footer />}
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/product/:productId" element={<ProductPage />} />
                            <Route path="/category/:categoryId" element={<CategoryPage />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/search" element={<SearchResults />} />
                            <Route path="/delivery" element={<Delivery />} />
                            <Route path="/summary" element={<OrderSummaryPage />}/>
                            <Route path="/success" element={<PaymentSuccess />} />
                            <Route path="/cancel" element={<PaymentFailure />} />
                            <Route path="/terms" element={<Terms />} />
                            <Route path="/admin" element={<AdminPage />}/>
                        </Routes>
                    </Layout>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;

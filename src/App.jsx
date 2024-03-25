import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Notfound from './pages/Notfound';
import Login from './pages/Signin';
import Register from './pages/Register'
import OrdersPage from './pages/Orders.jsx'
import GoogleApiWrapper from './pages/Contact'
import About from './pages/About.jsx';
import Header from "./components/header";
import Footer from "./components/Footer";
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Feedback from './pages/Feedback.jsx';
import Products from './pages/Products.jsx';
import Client_register from './client/pages/Client_registre.jsx';
import Clientdashboard from './client/pages/Client_dashboard.jsx';
import ContactUs from './pages/ContactUs.jsx';
import Blog from './pages/Blog/Blog.jsx';
import Profile from './components/profile.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductInfo from './pages/ProductInfo.jsx';
import AddBlog from './pages/Blog/AddBlog.jsx';
import ReturnPolicy from './pages/ReturnPolicy.jsx';
import Help from './pages/Help.jsx';
import FindNearMe from './pages/FindNearMe.jsx';
import Connect from './pages/Connect.jsx';
import Updates from './pages/Updates.jsx';
import Mystate from './components/context/MyState.jsx';

import BecomePartner from "./pages/BecomePartner.jsx";
import Increase from "./pages/Increase.jsx";

const App = () => {
    const location = useLocation();

    // Function to determine if header should be shown based on route
    const showHeader = () => {
        // Check if location pathname is not '/signin' or '/register'
        return (
            location.pathname !== "/signin" &&
            location.pathname !== "/register" &&
            location.pathname !== "/cdashboard" &&
            location.pathname !== "/clientregister"
        );
    };

    // Function to determine if footer should be shown based on route
    const showFooter = () => {
        return location.pathname !== "/cdashboard";
    };

    return (
        <Mystate>
            {showHeader() && <Header />}

            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/signin" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/products" element={<Products />} />
                <Route path="/:id" element={<ProductInfo />} />
                <Route path="/connect" element={<Connect />} />
                <Route exact path="/contact" element={<ContactUs />} />
                <Route exact path="/blog" element={<Blog />} />
                <Route path="/updates" element={<Updates />} />
                <Route path="/add-blog" element={<AddBlog />} />
                <Route path="/partner" element={<BecomePartner />} />
                <Route path="returns" element={<ReturnPolicy />} />
                <Route path="/help" element={<Help />} />
                <Route path="/near-me" element={<FindNearMe />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route path="/clientregister" element={<Client_register />} />
                <Route path="/cart" element={<GoogleApiWrapper />} />
                <Route exact path="*" element={<Notfound />} />
                <Route exact path="/cdashboard" element={<Clientdashboard />} />
                <Route exact path="/increase" element={<Increase />} />
            </Routes>

            {showFooter() && <Footer />}
        </Mystate>
    );
};

export default App;

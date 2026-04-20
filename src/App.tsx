import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CartDrawer from './components/CartDrawer';
import SocialWidget from './components/SocialWidget';
import Home from './pages/Home';

function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/offers" element={<Home />} />
              <Route path="/booking" element={<Home />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppButton />
          <SocialWidget />
          <CartDrawer />
        </BrowserRouter>
      </CartProvider>
    </LanguageProvider>
  );
}

export default App;

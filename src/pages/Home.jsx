import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import Features from '../components/Features';
import Offers from '../components/Offers';
import Products from '../components/Products';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import BookingForm from '../components/BookingForm';
import MapSection from '../components/MapSection';
import CTASection from '../components/CTASection';

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Features />
      <Offers />
      <Products />
      <Gallery />
      <Testimonials />
      <CTASection />
      <BookingForm />
      <MapSection />
    </>
  );
}

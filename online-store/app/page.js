import Hero from "../components/Hero";
import FeaturedBanner from "../components/FeaturedBanner";
import LowerFeaturedBanner from "../components/LowerFeaturedBanner";
import Products from "../components/Products";
import { CartProvider } from "@/components/CartContext";


export default function Home() {
  return (
    <>
      <CartProvider>
        <Hero />
        <FeaturedBanner />
        <Products />
        <LowerFeaturedBanner />
      </CartProvider>
    </>
  )
}

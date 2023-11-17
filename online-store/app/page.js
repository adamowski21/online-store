import Hero from "../components/Hero";
import FeaturedBanner from "../components/FeaturedBanner";
import LowerFeaturedBanner from "../components/LowerFeaturedBanner";
import Trending from "../components/Trending";
import { products } from "../data/mockData";


export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedBanner />
      <Trending products={products} />
      <LowerFeaturedBanner />
    </>
  )
}

import { Hero, Shopbycategory, Newarrivals, Topsellingitems, Featuredbrands, BrandCollectionContainer } from "../../components"
import { DiorVideo, RalphLaurenVideo, ArmaniVideo } from "../../assets"

function Home() {
  return (
    <div>
      <Hero />
      <Newarrivals />
      <BrandCollectionContainer brandname={"Giorgio Armani"} title={"Fall Winter 2025"} brandVideo={ArmaniVideo} />
      <Topsellingitems />
      <BrandCollectionContainer brandname={"Dior"} title={"Cruise 2026 Collection"} tagline={"Between baroque nostalgia and contemporary grace, the Dior Cruise 2026 collection celebrates timeless elegance."} brandVideo={DiorVideo} />
      <Shopbycategory />
      <BrandCollectionContainer brandname={"Ralph Lauren"} title={"Minimal Perfection"} brandVideo={RalphLaurenVideo} tagline={"Everyday moments are met with ease when getting dressed feels effortless. Thoughtfully designed pieces in luxurious textures."} />
      <Featuredbrands />
    </div>
  )
}

export default Home
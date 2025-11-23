import { HeroImage } from "../../assets";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="relative w-full h-[360px] sm:h-[550px] md:h-[720px] lg:h-[860px] xl:h-[1020px] flex items-start justify-start">

      <img
        src={HeroImage}
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10  flex flex-col justify-center py-2 px-4 w-7/10 sm:w-[65%]  lg:w-6/10 md:py-4 md:px-4 lg:px-8 lg:py-8 text-white">
        <h1 className="text-[18px] sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-justify md:text-justify font-satoshi-bold mb-2 md:mb-4 lg:mb-6 xl:mb-8">
          THE VIBE OF LUXURY
        </h1>
        <p className="text-[12px] sm:text-sm md:text-lg lg:text-xl xl:text-2xl  md:block font-satoshi-regular mb-2 sm:mb-4 lg:mb-6 xl:mb-8 leading-relaxed">
          <span className="font-satoshi-medium">LUNARE</span> is a premium luxury fashion retailer curating timeless designs from the world’s most iconic brands for those who value quality, comfort, and sophistication.
        </p>
        <Link to={"/products/1"} className="hidden sm:block">
          <button className="bg-white cursor-pointer text-black py-2 px-4 lg:px-6 lg:py-3 xl:px-8 xl:py-4 text-sm md:text-base rounded-full font-satoshi-medium lg:text-lg xl:text-xl hover:bg-gray-200 transition">
            Explore Collections
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;

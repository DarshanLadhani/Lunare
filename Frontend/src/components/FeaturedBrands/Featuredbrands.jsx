import { useEffect, useRef, useState } from "react";
import {
  GucciLogoImage,
  ChanelLogoImage,
  DiorLogoImage,
  PradaLogoImage,
  SaintLaurentLogoImage,
  FendiLogoImage,
  McQueenLogoImage,
  BalenciagaLogoImage,
  ValentinoLogoImage,
  TomFordLogoImage,
  BrioniLogoImage,
  BalmainLogoImage,
  VetementsLogoImage,
  BrunelloCucinelliLogoImage,
  ArmaniLogoImage,
  BurberryLogoImage,
  RalphLaurenLogoImage,
  CanaliLogoImage,
  ZegnaLogoImage,
  DieselLogoImage,
  RareRabbitLogoImage,
  PalmAngelsLogoImage,
  OffWhiteLogoImage,
  MonclerLogoImage,
  LululemonLogoImage,
  AloYogaLogoImage,
  GymsharkLogoImage,
  NikeLogoImage,
  AdidasLogoImage,
  UnderArmourLogoImage,
  PumaLogoImage,
  CalvinKleinLogoImage,
  LacosteLogoImage
} from "../../assets";

const featuredBrands = [
  { name: "Gucci", logo: GucciLogoImage },
  { name: "Chanel", logo: ChanelLogoImage },
  { name: "Dior", logo: DiorLogoImage },
  { name: "Prada", logo: PradaLogoImage },
  { name: "Balenciaga", logo: BalenciagaLogoImage },
  { name: "Armani", logo: ArmaniLogoImage },
  { name: "Saint Laurent", logo: SaintLaurentLogoImage },
  { name: "Fendi", logo: FendiLogoImage },
  { name: "Alexander McQueen", logo: McQueenLogoImage },
  { name: "Valentino", logo: ValentinoLogoImage },
  { name: "Tom Ford", logo: TomFordLogoImage },
  { name: "Brioni", logo: BrioniLogoImage },
  { name: "Balmain", logo: BalmainLogoImage },
  { name: "Vetements", logo: VetementsLogoImage },
  { name: "Brunello Cucinelli", logo: BrunelloCucinelliLogoImage },
  { name: "Burberry", logo: BurberryLogoImage },
  { name: "Ralph Lauren", logo: RalphLaurenLogoImage },
  { name: "Canali", logo: CanaliLogoImage },
  { name: "Ermenegildo Zegna", logo: ZegnaLogoImage },
  { name: "Diesel", logo: DieselLogoImage },
  { name: "Rare Rabbit", logo: RareRabbitLogoImage },
  { name: "Palm Angels", logo: PalmAngelsLogoImage },
  { name: "Off-White", logo: OffWhiteLogoImage },
  { name: "Moncler", logo: MonclerLogoImage },
  { name: "Lululemon", logo: LululemonLogoImage },
  { name: "Alo Yoga", logo: AloYogaLogoImage },
  { name: "Gymshark", logo: GymsharkLogoImage },
  { name: "Nike", logo: NikeLogoImage },
  { name: "Adidas", logo: AdidasLogoImage },
  { name: "Under Armour", logo: UnderArmourLogoImage },
  { name: "Puma", logo: PumaLogoImage },
  { name: "Calvin Klein", logo: CalvinKleinLogoImage },
  { name: "Lacoste", logo: LacosteLogoImage },
];

function FeaturedBrands() {

  const scrollRefMobile = useRef();
  const scrollRefMediumDevices = useRef(null);
  const scrollRefBigDevice = useRef(null)

  const [activeIndexMobile, setActiveIndexMobile] = useState(0);
  const [activeIndexOtherDevice, setActiveIndexOtherDevice] = useState(0);
  const [activeIndexBigDevice, setActiveIndexBigDevice] = useState(0);

  useEffect(() => {
    const container = scrollRefMobile.current;
    if (!container) return;

    const handleScroll = () => {
      const itemWidth = container.clientWidth;
      const index = Math.round(container.scrollLeft / itemWidth);
      setActiveIndexMobile(index);
    };

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll);
  })


  useEffect(() => {
    const container = scrollRefMediumDevices.current;
    if (!container) return;

    const handleScroll = () => {
      const itemWidth = container.clientWidth;
      const index = Math.round(container.scrollLeft / itemWidth);
      setActiveIndexOtherDevice(index);
    };

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const container = scrollRefBigDevice.current;
    if (!container) return;

    const handleScroll = () => {
      const itemWidth = container.clientWidth;
      const index = Math.round(container.scrollLeft / itemWidth);
      setActiveIndexBigDevice(index);
    };

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="py-8 space-y-6 xl:space-y-8">
      <h1 className="text-2xl lg:text-3xl xl:text-4xl font-satoshi-medium text-center">
        FEATURED BRANDS
      </h1>

      <div ref={scrollRefMobile} className="flex sm:hidden mx-4 p-2 bg-[#f2f0f1a7] rounded-lg  overflow-x-auto scrollbar-hidden gap-x-4 snap-x snap-mandatory scroll-smooth">
        {
          Array.from({ length: Math.ceil(featuredBrands.length / 2) }).map((_, groupIdx) => {
            const group = featuredBrands.slice(groupIdx * 2, groupIdx * 2 + 2);
            return (<div key={groupIdx} className="flex-shrink-0 w-full grid grid-cols-2 gap-x-4 snap-center snap-always">
              {group.map((brand, idx) => (
                <div key={idx} className="bg-white rounded-xl justify-center items-center p-2 gap-y-2 flex flex-col ">
                  <img src={brand.logo} className="w-24 h-24 object-contain" alt="" />
                </div>
              ))}
            </div>);

          })
        }
      </div>

      <div className="flex sm:hidden gap-x-2 justify-center">
        {Array.from({ length: Math.ceil(featuredBrands.length / 2) }).map((_, index) => (
          <div key={index} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndexMobile
            ? "bg-black scale-125"
            : "bg-gray-400"
            }`}>
          </div>
        ))}
      </div>

      <div ref={scrollRefMediumDevices} className="hidden sm:flex lg:hidden mx-4 p-2 bg-[#f2f0f1a7] rounded-lg  overflow-x-auto scrollbar-hidden gap-x-4 snap-x snap-mandatory scroll-smooth">
        {
          Array.from({ length: Math.ceil(featuredBrands.length / 4) }).map((_, groupIdx) => {
            const group = featuredBrands.slice(groupIdx * 4, groupIdx * 4 + 4);
            return (<div key={groupIdx} className="flex-shrink-0 w-full grid grid-cols-4 gap-x-4 snap-center snap-always">
              {group.map((brand, idx) => (
                <div key={idx} className="bg-white rounded-xl justify-center items-center p-2 gap-y-2 flex flex-col ">
                  <img src={brand.logo} className="w-28 h-24 object-contain" alt="" />
                </div>
              ))}
            </div>);

          })
        }
      </div>

      <div className="hidden sm:flex lg:hidden gap-x-2 justify-center">
        {Array.from({ length: Math.ceil(featuredBrands.length / 4) }).map((_, index) => (
          <div key={index} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndexOtherDevice
            ? "bg-black scale-125"
            : "bg-gray-400"
            }`}>
          </div>
        ))}
      </div>

      <div ref={scrollRefBigDevice} className="hidden lg:flex mx-4 p-2 bg-[#f2f0f1a7] rounded-lg  overflow-x-auto scrollbar-hidden gap-x-4 snap-x snap-mandatory scroll-smooth">
        {
          Array.from({ length: Math.ceil(featuredBrands.length / 6) }).map((_, groupIdx) => {
            const group = featuredBrands.slice(groupIdx * 6, groupIdx * 6 + 6);
            return (<div key={groupIdx} className="flex-shrink-0 w-full grid grid-cols-6 gap-x-4 snap-center snap-always">
              {group.map((brand, idx) => (
                <div key={idx} className="bg-white rounded-xl justify-center items-center p-2 gap-y-2 flex flex-col ">
                  <img src={brand.logo} className="w-30 h-30 object-contain" alt="" />
                </div>
              ))}
            </div>);

          })
        }
      </div>

      <div className="hidden lg:flex gap-x-2 justify-center">
        {Array.from({ length: Math.ceil(featuredBrands.length / 6) }).map((_, index) => (
          <div key={index} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndexBigDevice
            ? "bg-black scale-125"
            : "bg-gray-400"
            }`}>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedBrands;

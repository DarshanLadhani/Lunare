import { Link } from "react-router-dom"

function Brandcollectioncontainer({ imagemobile, imageotherdevices, brandname, title, tagline, brandVideo }) {
  return (
    <div className="px-4 py-8 space-y-4">
      <h3 className="text-xl lg:text-2xl font-satoshi-medium text-center sm:hidden">{brandname}</h3>
      <div className="relative w-full">
        {
          imagemobile && <img src={imagemobile} className="w-full h-[500px] object-cover md:hidden" />
        }
        {
          imageotherdevices && <img src={imageotherdevices} className="hidden md:block w-full h-[450px] lg:h-[550px] xl:h-[650px] text-center object-cover" />
        }
        {
          brandVideo &&
          <video src={brandVideo} autoPlay={true} muted playsInline loop controls={false} className="w-full h-[500px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[500px] object-cover" />
        }
        <div className="absolute z-10 inset-0 flex justify-center items-end sm:items-center">
          <div className="space-y-2 w-11/12 sm:w-7/10 md:w-1/2 py-2 sm:space-y-4 xl:space-y-6">
            <h3 className="text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-satoshi-medium text-center text-white sm:flex sm:gap-x-2 sm:justify-center"><span className="hidden sm:block">{brandname}</span> {title}</h3>
            <Link className="flex justify-center">
              <button className="border-2 cursor-pointer border-white text-white font-satoshi-medium p-2 lg:px-4 text-sm sm:text-base xl:text-xl">Explore Collection</button>
            </Link>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
    </div>
  )
}

export default Brandcollectioncontainer
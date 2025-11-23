import { Link } from "react-router-dom";
import { GithubIcon, FacebookIcon, TwitterIcon, InstagramIcon } from "../../assets";

function Footer() {
  return (
    <footer className="bg-[#f2f0f1a7] text-black/60 py-10 px-4 lg:px-8 font-satoshi-regular">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-10 xl:gap-14">
        <div className="sm:max-w-2/5 flex flex-col space-y-4 lg:w-2/5">
          <Link to="/">
            <h1 className="text-3xl font-satoshi-medium text-black">LUNARE</h1>
          </Link>
          <p className="text-sm md:text-base">
            Curating timeless designs from the world’s most iconic brands for those who value quality, comfort, and sophistication.
          </p>
          <div className="flex space-x-3 pt-2">
            <img src={TwitterIcon} className="w-10" alt="" />
            <img src={FacebookIcon} className="w-10" alt="" />
            <img src={InstagramIcon} className="w-10" alt="" />
            <img src={GithubIcon} className="w-10" alt="" />
          </div>
        </div>

        <div className=" grid grid-cols-2 gap-x-20 text-black lg:grid-cols-4 lg:w-3/5 lg:flex-2  gap-6 lg:gap-4">
          <div>
            <h4 className="font-semibold text-balance mb-3">COMPANY</h4>
            <ul className="space-y-2 lg:space-y-3 text-sm md:text-base">
              <li><Link to="#">About</Link></li>
              <li><Link to="#">Services</Link></li>
              <li><Link to="#">Works</Link></li>
              <li><Link to="#">Career</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">HELP</h4>
            <ul className="space-y-2 lg:space-y-3 text-sm md:text-base">
              <li><Link to="#">Customer Support</Link></li>
              <li><Link to="#">Delivery Details</Link></li>
              <li><Link to="#">Terms & Conditions</Link></li>
              <li><Link to="#">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">FAQ</h4>
            <ul className="space-y-2 lg:space-y-3 text-sm md:text-base">
              <li><Link to="#">Account</Link></li>
              <li><Link to="#">Manage Deliveries</Link></li>
              <li><Link to="#">Orders</Link></li>
              <li><Link to="#">Payments</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">RESOURCES</h4>
            <ul className="space-y-2 lg:space-y-3 text-sm md:text-base">
              <li><Link to="#">Free eBooks</Link></li>
              <li><Link to="#">Development Tutorial</Link></li>
              <li><Link to="#">How to - Blog</Link></li>
              <li><Link to="#">YouTube Playlist</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <hr className="my-8 border-gray-300" />

      <p className="text-gray-500 text-center">Clozzy © 2025, All Rights Reserved</p>
    </footer>
  );
}

export default Footer;

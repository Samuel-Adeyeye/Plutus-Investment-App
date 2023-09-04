import { PiLinkedinLogoThin } from "react-icons/pi";
import { PiTwitterLogoThin } from "react-icons/pi";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    // // <div className="footer">
    // //   <div className="sb_footer-section-padding">
    //     <div className="border-2 bg-blue-900 text-white p-2 mt-20                ">
    //       <div className="sb_footer-links-div">
    //         <h3>Plutus</h3>
    //          <div className="social media">
    //           <PiLinkedinLogoThin />
    //           <BiLogoInstagram />
    //           <PiTwitterLogoThin />
    //         </div>
    //       </div>
    //       <div className="input">
    //      <input className="w-full md:w-1/3 rounded-3xl p-2" type="text" placeholder="Enter your email"/>
    //         <button>Subscribe</button>
    //       </div>
    //       <div className="sb_footer-links-div">
    //         <h3>Help</h3>
    //         <a href="/FAQ">
    //           <p>FAQ</p>
    //         </a>
    //         <a href="/Customer Service">
    //           <p>Customer Service</p>
    //         </a>
    //         <a href="/How to guide">
    //           <p>How to guide</p>
    //         </a>
    //       </div>
    //       <div className="sb_footer-links-div">
    //         <h3>Other</h3>
    //         <a href="/Privacy Policy">
    //           <p>Privacy Policy</p>
    //         </a>
    //         <a href="/Sitemap">
    //           <p>Sitemap</p>
    //         </a>
    //         <a href="/Subscriptions">
    //           <p>Subscriptions</p>
    //         </a>
    //       </div>
    //       <div className="sb_footer-links-div">
    //         <h3>Contact us</h3>
    //         <a href="Bankplutus@gmail.com"></a>
    //         <p>+273011111111</p>
    //       </div>
    //     </div>
    // //   </div>
    // // </div>
    <footer className="bg-[#082151] mt-20">
      <div className="flex justify-end pt-8 pb-8 gap-5 pr-10">
        <input
          type="text"
          placeholder="Enter your email"
          className="text-gray-800 w-[90%] md:w-[20%] ml-4 md:ml-0 rounded-full h-10 p-3"
        />
        <button className="bg-teal-100 hover:scale-110 hover:bg-teal-200 rounded-full text-black w-40">
          Subscribe
        </button>
      </div>
      <hr />
      <div className="text-white lg:grid lg:grid-cols-4 mt-10 text-center pb-10 gap-20">
        <div className=" flex-wrap text-start">
          <h1 className="text-2xl pl-10">Plutus</h1>
          <div className="flex p-5 rounded-lg">
            <Link to={"#"}>
              {" "}
              <div className="hover:scale-125">
                <BsFacebook size={40} />
              </div>
            </Link>
            <Link to={"#"}>
              {" "}
              <div className="hover:scale-125">
                {" "}
                <PiLinkedinLogoThin size={40} />
              </div>
            </Link>
            <Link to={"#"}>
              {" "}
              <div className="hover:scale-125">
                <PiTwitterLogoThin size={40} />
              </div>
            </Link>
            <Link to={"#"}>
              {" "}
              <div className="hover:scale-125">
                <BsInstagram size={40} />
              </div>
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap text-start">
          <h1 className="text-xl">Help</h1>
          <div className="text-gray-400 flex flex-wrap text-start">
            <Link to={"#"}>FAQ</Link>
            <Link to={"#"}>Customer Service</Link>
            <Link to={"#"}>How to guides</Link>
          </div>
        </div>

        <div className="flex flex-wrap text-start mt-5 md:mt-0">
          <h1 className="text-xl">Other</h1>
          <div className="text-gray-400 flex flex-wrap text-start">
            <Link to={"#"}>Privacy Policy</Link>
            <Link to={"#"}>Sitemap</Link>
            <Link to={"#"}>Subscriptions</Link>
          </div>
        </div>

        <div className="flex flex-wrap text-start mt-5 md:mt-0">
          <h1 className="text-xl">Contact us</h1>
          <div className="text-gray-400 flex flex-wrap text-start">
            <p>plutus@gmail.com</p>
            <p>+234 111 222 333</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

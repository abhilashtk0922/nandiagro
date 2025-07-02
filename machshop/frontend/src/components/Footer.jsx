import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <p className=" text-lg font-bold text-black py-2">
            Nandi Agrotech Turuvekere <sub>-572227</sub>
          </p>

          <p className="w-full md:w-2/3 text-black">
            At Nandi Agrotech, we offer strong and reliable farming equipment to
            help increase productivity and save time. Our advanced machines and
            modern technology help farmers do their work more easily and
            effectively. We believe in trust and innovation, and we work as a
            partner with every farmer to support their growth. Choose Nandi
            Agrotech – where modern technology supports farming for a better
            future! 🌾💪
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5 text-black">CHECK OUT</p>

          <ul className="flex flex-col gap-1 text-black">
            <li>
              <a
                href="https://www.facebook.com/share/18nkE9DwTz/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-500 transition-colors"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-500 transition-colors"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/6366542135"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-500 transition-colors"
              >
                Whatsapp
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-500 transition-colors"
              >
                Twitter
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5 text-black">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-black">
            <li>Tel: Kiran Kumar (+91) 6366542135</li>
             <li> G R Rangegowda(+91) 9448536281</li>
             <li> Chetan (+91) 9900505856</li>
            <li>nandiagrotech363@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center text-black">
          Copyright 2024@ Nandiagrotech.com - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;

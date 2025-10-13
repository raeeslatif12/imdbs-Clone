import React, { useState } from "react";
import {
  HelpCircle,
  Link as LinkIcon,
  Facebook,
  Youtube,
  Instagram,
  X,
  Smartphone,
  CheckCircle,
  QrCode,
  ExternalLink,
  Music2,
} from "lucide-react";

const Footer = () => {
  const [footerLinks] = useState([
    {
      text: "Help",
      href: "#",
      icon: <HelpCircle className="w-4 h-4 mr-1 inline" />,
    },
    {
      text: "Site Index",
      href: "#",
      icon: <LinkIcon className="w-4 h-4 mr-1 inline" />,
    },
    { text: "IMDbPro", href: "#", isExternal: true },
    { text: "Box Office Mojo", href: "#", isExternal: true },
    { text: "License IMDb Data", href: "#", isExternal: true },
    { text: "Press Room", href: "#", isExternal: true },
    { text: "Advertising", href: "#", isExternal: true },
    { text: "Jobs", href: "#", isExternal: true },
    { text: "Conditions of Use", href: "#", isExternal: true },
    { text: "Privacy Policy", href: "#", isExternal: false },
  ]);

  // Social Icons (stored in state)
  const [socials] = useState([
    { title: "TikTok", icon: <Music2 className="w-6 h-6" /> },
    { title: "Instagram", icon: <Instagram className="w-6 h-6" /> },
    { title: "X (Twitter)", icon: <X className="w-6 h-6" /> },
    { title: "YouTube", icon: <Youtube className="w-6 h-6" /> },
    { title: "Facebook", icon: <Facebook className="w-6 h-6" /> },
  ]);

  return (
    <footer className="bg-black text-white font-inter w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
        {/* Sign In Button */}
        <div className="flex justify-center mb-10">
          <button className="bg-yellow-400 text-black text-lg font-bold py-3 px-8 rounded-full shadow-lg hover:bg-yellow-500 transition-transform duration-300 active:scale-95">
            Sign in for more access
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-stretch gap-10 border-t border-b border-gray-800 py-10">
          {/* Social Section */}
          <div className="flex flex-col items-center justify-center w-full md:w-1/2 lg:w-2/5 p-6 bg-gray-900/50 rounded-xl border border-gray-800 shadow-lg">
            <h3 className="text-lg sm:text-xl font-bold mb-4">
              Follow IMDb on social
            </h3>
            <div className="flex flex-wrap justify-center gap-5">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href="#"
                  aria-label={social.title}
                  className="text-white hover:text-yellow-400 transition-all duration-300 transform hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center w-full md:w-1/2 lg:w-2/5 p-6 bg-gray-900/50 rounded-xl border border-gray-800 shadow-lg">
            <h3 className="text-lg sm:text-xl font-bold mb-4">
              Get the IMDb App
            </h3>
            <div className="flex flex-col sm:flex-row items-center sm:space-x-4 text-center sm:text-left">
              <div className="flex flex-col text-sm mb-3 sm:mb-0">
                <p className="text-gray-300">For Android and iOS</p>
                <div className="flex justify-center sm:justify-start items-center mt-2 text-yellow-400">
                  <Smartphone className="w-5 h-5 mr-2" />
                  <span className="font-medium">Download now!</span>
                </div>
              </div>
              <QrCode className="w-16 h-16 text-yellow-400 bg-gray-950 p-2 rounded-md shadow-lg" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-3 text-sm mt-10 mb-8 px-4 text-center">
          {footerLinks.map((link, index) => (
            <React.Fragment key={index}>
              <a
                href={link.href}
                target={link.isExternal ? "_blank" : "_self"}
                rel={link.isExternal ? "noopener noreferrer" : ""}
                className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 flex items-center justify-center whitespace-nowrap"
              >
                {link.icon}
                {link.text}
                {link.isExternal && <ExternalLink className="w-3 h-3 ml-1" />}
              </a>
              {link.text === "Privacy Policy" && (
                <a
                  href="#"
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 flex items-center justify-center whitespace-nowrap"
                >
                  <CheckCircle className="w-4 h-4 mr-1 text-blue-400" />
                  Your Ads Privacy Choices
                </a>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="text-center border-t border-gray-900 pt-6">
          <div className="mb-3 flex justify-center items-center space-x-1">
            <span className="text-gray-400 text-sm italic">an</span>
            <span className="font-serif text-lg font-bold">PK</span>
            <span className="text-gray-400 text-sm italic">company</span>
          </div>
          <p className="text-xs text-gray-500">© 1990–2025 by IMDb.com, Inc.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import { v4 } from "uuid";

const contact = [
  {
    icon: "bx bx-location-plus",
    name: "UA You Administration: ",
    content: "01008, Kyiv, 5 Hrushevskoho Str.",
  },
  {
    icon: "bx bxs-phone",
    name: "Phone number: ",
    content: "+380 067-535-00-00-1",
  },
  {
    icon: "bx bx-envelope",
    name: "Email: ",
    content: "ua-you.shop.@gmail.com",
  },
];

const Footer = () => {
  return (
    <div className="py-10 mt-10 bg-slate-800">
      <div className="container flex items-center pb-6 md:flex-row flex-col">
        <div className="md:w-[30%] w-full">
          <div className="mb-6">
            <img className="w-[50px] aspect-auto" src="/icon.png" alt="logo" />
          </div>
          {contact.map((p) => (
            <div key={v4()} className="mb-6 font-semibold text-slate-100 flex items-center">
              <div className="w-[60px] h-[60px] rounded-full bg-[#b2071d] flex items-center justify-center text-[30px]">
                <i className={p.icon} />
              </div>
              <p className="ml-3 flex-1 text-slate-100">{p.content}</p>
            </div>
          ))}
        </div>
        <div className="md:ml-10 flex-1 grid md:grid-cols-4 grid-cols-1 text-left mt-10 md:mt-0 w-full text-slate-100">
          <div className="w-full mb-6 md:mb-0">
            <h1 className="uppercase font-semibold mb-6">Solution</h1>
            <p className="mb-4">Marketing</p>
            <p className="mb-4">Analytics</p>
            <p className="mb-4">Commerce</p>
            <p className="mb-4">Insignts</p>
          </div>
          <div className="w-full mb-6 md:mb-0">
            <h1 className="uppercase font-semibold mb-6">Support</h1>
            <p className="mb-4">Pricing</p>
            <p className="mb-4">Documentation</p>
            <p className="mb-4">Guides</p>
            <p className="mb-4">Api Status</p>
          </div>
          <div className="w-full mb-6 md:mb-0">
            <h1 className="uppercase font-semibold mb-6">Company</h1>
            <p className="mb-4">About</p>
            <p className="mb-4">Blog</p>
            <p className="mb-4">Jobs</p>
            <p className="mb-4">Press</p>
          </div>
          <div className="w-full mb-6 md:mb-0">
            <h1 className="uppercase font-semibold mb-6">Legal</h1>
            <p className="mb-4">Cleim</p>
            <p className="mb-4">Privacy</p>
            <p className="mb-4">Terms</p>
            <p className="mb-4">Partners</p>
          </div>
        </div>
      </div>
      <div className="container pt-10 border-t-2 border-slate-100 text-center">
        <p className="text-slate-100 font-semibold">
          UA You is a private Ukrainian production and trade company that provides logistics and
          related services for individuals and businesses!
        </p>
      </div>
    </div>
  );
};

export default Footer;

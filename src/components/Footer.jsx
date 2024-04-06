import React from "react";
import collegeLogo from "../static/logos/logo_college.png";
import igniteLogo from "../static/logos/logowhite.jpg";
import {
  InstagramOutlined,
  LinkedinOutlined,
  XOutlined,
  WhatsAppOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="bg-black text-white py-10 px-6 md:px-20 flex flex-wrap items-start justify-between">
      {/* Ignite Logo and Placement Cell Information */}
      <div className="flex flex-col items-start">
        <a href="/">
          <img src={igniteLogo} alt="Ignite Logo" className="h-24 mb-4" />
        </a>
        <div>
          <p>The Placement Cell</p>
          <p>SGTB Khalsa College</p>
          <p>University of Delhi</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="text-primary-color">
        <h1 className="text-2xl font-semibold mb-4">Quick Links</h1>
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col text-white py-2 px-3">
            <a href="/" className="text-lg hover:underline mb-2 pl-2 md:pl-0">
              Home
            </a>
            <a
              href="/about"
              className="text-lg hover:underline mb-2 pl-2 md:pl-0"
            >
              About
            </a>
            <a
              href="/companies"
              className="text-lg hover:underline mb-2 pl-2 md:pl-0"
            >
              Companies
            </a>
          </div>
          <div className="flex flex-col ml-8 md:ml-0 py-2 px-3 text-white">
            <a
              href="/how-to-apply"
              className="text-lg hover:underline mb-2 pl-2 md:pl-0"
            >
              How to Apply
            </a>
            <a
              href="/resources"
              className="text-lg hover:underline mb-2 pl-2 md:pl-0"
            >
              Resources
            </a>
            <a
              href="/contact-us"
              className="text-lg hover:underline mb-2 pl-2 md:pl-0"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* Contact Us Section */}
      <div>
        <h1 className="text-2xl font-semibold text-primary-color mb-4">
          Contact Us
        </h1>
        <div className="flex gap-4 mb-4">
          <a href="https://www.instagram.com/placementcell.sgtbkhalsa?igsh=MThrMjNjZW9yMGZ4">
            <InstagramOutlined style={{ fontSize: "32px" }} />
          </a>
          <a href="https://www.linkedin.com/school/the-placement-cell-sgtb-khalsa-college/">
            <LinkedinOutlined style={{ fontSize: "32px" }} />
          </a>
          <a href="#">
            <XOutlined style={{ fontSize: "32px" }} />
          </a>
          <a href="https://api.whatsapp.com/send?phone=917807417341">
            <WhatsAppOutlined style={{ fontSize: "32px" }} />
          </a>
          <a href="https://www.youtube.com">
            <YoutubeOutlined style={{ fontSize: "32px" }} />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8 w-full">
        <p className="text-md">
          Copyright © {year} The Placement Cell, SGTB Khalsa College. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

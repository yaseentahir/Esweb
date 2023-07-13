"use client";

import "./globals.css";
import { Prompt } from "next/font/google";
import React, { Fragment, useState, useEffect } from "react";
import Script from "next/script";

import ReactDOM from "react-dom";
import { useRouter } from "next/router";
// Hooks Import
import useScrollBlock from "@/Hooks/useScrollBlock";

// Components Import
import NavBar from "@/Components/UI/NavBar/Navbar";
import Backdrop from "@/Components/UI/Backdrop/Backdrop";
import ContactForm from "@/Components/UI/ContactForm/ContactForm";
// import CTA from "./Components/UI/CTA/CTA";
import LoadScreen from "@/Components/UI/Loading/Loading";

// Secton Import
import Footer from "@/Components/Sections/Footer/Footer";
import NavbarMain from "@/Components/UI/NavbarMain/NavbarMain";
import FooterMain from "@/Components/Sections/FooterMain/FooterMain";

const prompt = Prompt({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {
  const [dispForm, setDispForm] = useState(false);
  const [siteloading, setSiteloading] = useState(true);
  const [locpath, setlocPath] = useState();
  const [disableScroll, enableScroll] = useScrollBlock();
  // const router = useRouter();

  const navItems = [
    { id: 1, name: "Home", section: "home" },
    { id: 2, name: "About", section: "aboutUs" },
    { id: 3, name: "Services", section: "services" },
    { id: 4, name: "Process", section: "process" },
    { id: 5, name: "Portfolio", section: "portfolio" },
    { id: 6, name: "clients", section: "clients" },
    // { id: 7, name: "Reviews", section: "testimonials" },
  ];
  useEffect(() => {
    setlocPath(window.location.pathname);
    // window.addEventListener("load", function () {
    //   enableScroll();
    //   var chatbox = document.getElementById("fb-customer-chat");
    //   chatbox.setAttribute("page_id", "106967095106378");
    //   chatbox.setAttribute("attribution", "biz_inbox");
    //   window.fbAsyncInit = function () {
    //     // eslint-disable-next-line no-undef
    //     FB.init({
    //       xfbml: true,
    //       version: "v14.0",
    //     });
    //   };

    //   (function (d, s, id) {
    //     var js,
    //       fjs = d.getElementsByTagName(s)[0];
    //     if (d.getElementById(id)) return;
    //     js = d.createElement(s);
    //     js.id = id;
    //     js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
    //     fjs.parentNode.insertBefore(js, fjs);
    //   })(document, "script", "facebook-jssdk");
    // });
    setSiteloading(false);
  }, []);

  const contactButtonPressed = () => {
    // disableScroll();
    // setDispForm(true);
    // window.open("https://form.jotform.com/223421865801049", "_blank").focus();
  };
  const dismissForm = () => {
    enableScroll();
    setDispForm(false);
  };

  return (
    <html lang="en">
      <body className={prompt.className}>
        {siteloading && <LoadScreen />}
        {locpath === "/" ? (
          <NavBar navList={navItems} onContactPressed={contactButtonPressed} />
        ) : (
          <NavbarMain onContactPressed={contactButtonPressed} />
        )}
        <div id="fb-root"></div>
        <div id="fb-customer-chat" className="fb-customerchat"></div>
        <Script strategy="lazyOnload" id="my-script">
          {`
            var chatbox = document.getElementById('fb-customer-chat');
            chatbox.setAttribute("page_id", "106967095106378");
            chatbox.setAttribute("attribution", "biz_inbox");
      
            window.fbAsyncInit = function() {
              FB.init({
                xfbml            : true,
                version          : 'v14.0'
              });
            };
      
            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        `}
        </Script>
        {children}
        <section>
          {locpath === "/" ? (
            <Footer containerId="footer" />
          ) : (
            <FooterMain containerId="footer" />
          )}
        </section>
      </body>
    </html>
  );
}

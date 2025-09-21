'use client'

import { useEffect } from "react";
import {gsap} from 'gsap'
import { ScrollTrigger } from "gsap/all";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const smoothScroll = () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            gsap.to(window, {
              duration: 1,
              scrollTo: target,
              ease: 'power2.inOut'
            });
          }
        });
      });
    };

    smoothScroll()
    
  }, []);

  return (
    <main className="relative">
      <Header/>
      <Hero/>
      <About/>
      <Skills/>
      <Work/>
      <Contact/>
    </main>
  );
}

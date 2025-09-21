'use client';
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlobeWithSvg from './GlobeWithStand';

const Hero = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const gradientRef = useRef(null);
  const earthRef = useRef(null);
  const starsContainerRef = useRef(null);

  useEffect(() => {
    const starCount = 150;
    const stars = [];

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      const size = Math.random() * 2 + 1; // 1–3px
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      starsContainerRef.current.appendChild(star);
      stars.push(star);
    }

    // Twinkle animation via GSAP
    stars.forEach((star) => {
      twinkleStar(star);
    });

    function twinkleStar(star) {
      gsap.fromTo(star, {
        opacity: 0.2,
        scale: 1
      }, {
        opacity: 1,
        scale: 1.3,
        duration: Math.random() * 1 + 1,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        repeatDelay: Math.random() * 2,
      });
    }
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(SplitText, ScrollTrigger);

    const splitTitle = SplitText.create(titleRef.current, { type: 'chars' });
    const splitSubtitle = SplitText.create(subtitleRef.current, { type: 'words' });

    const tl = gsap.timeline();
    tl.from(splitTitle.chars, {
      duration: 1,
      opacity: 0,
      y: 50,
      stagger: 0.05,
      ease: 'back.out(1.7)'
    }).from(splitSubtitle.words, {
      duration: 1,
      opacity: 0,
      y: 30,
      stagger: 0.1,
      ease: 'power2.out'
    }, '-=0.5');

    gsap.to(earthRef.current, {
      y: -30,
      rotation: 15,
      duration: 6,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });

    
    gsap.to(earthRef.current, {
      scale: 1.5,
      transformOrigin: 'center center',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    gsap.to(gradientRef.current, {
      backgroundPosition: '100% 100%',
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });


  }, {scope: containerRef});

  return (
    <section ref={containerRef} className="h-screen flex justify-center items-center relative overflow-hidden">
      {/* Night Sky Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600 via-gray-900 to-black -z-20"></div>

      {/* Stars Container */}
      <div ref={starsContainerRef} className="absolute inset-0 -z-15"></div>

      {/* Earth */}
      <div ref={earthRef} className="absolute inset-0 -z-5 flex justify-center items-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg"
          alt="Earth"
          className="w-full max-w-4xl opacity-90"
          style={{
            maskImage: 'radial-gradient(circle at center, white, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(circle at center, white, transparent 70%)'
          }}
        />
      </div>

      {/* Gradient Overlay */}
      <div
        ref={gradientRef}
        className="absolute inset-0 z-0 opacity-30 bg-gradient-to-br from-indigo-500 via-pink-500 to-amber-500 bg-[length:400%_400%] mix-blend-overlay"/>

      {/* Hero Text */}
      <div className="relative z-10 text-center px-4">
        <h1 ref={titleRef} className="text-6xl md:text-8xl font-bold mb-6 text-white">
          Creative Developer
        </h1>
        <p ref={subtitleRef} className="text-xl md:text-2xl text-purple-100 max-w-2xl mx-auto">
          Crafting immersive digital experiences with cutting-edge technology
        </p>
      </div>

    </section>
  );
};

export default Hero;

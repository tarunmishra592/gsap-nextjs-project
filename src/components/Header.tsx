'use client'

import gsap from "gsap";
import { ScrollToPlugin, ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState } from "react"


const menus = ['Home', 'About', 'Work', 'Contact']

gsap.registerPlugin(ScrollToPlugin)
gsap.registerPlugin(ScrollTrigger)

export default function Header(){

      const [isTop, setIsTop] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [showHeader, setShowHeader] = useState(true);
    const logoRef = useRef<SVGPathElement>(null)
    const headerRef = useRef<any>(null)



    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            setIsTop(currentScrollY < 10);
            
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setShowHeader(false);
            } else {
                setShowHeader(true);
            }
            
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    useEffect(() => {

        if(headerRef.current){
            gsap.to(headerRef.current, {
                y: showHeader ? 0 : -100,
                duration: 0.4,
                ease: 'power2.out'
            })
        }

    }, [showHeader])

    useEffect(() => {

        const path = logoRef.current;
        if(!path) return;
        const pathLength = path.getTotalLength()
        gsap.set(path, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength
        })

        gsap.to(path, {
            strokeDashoffset: 0,
            duration: 2,
            ease: 'power2.inOut',
            repeat: -1,
            yoyo: true
        })

    }, [])

    return(
        <header ref={headerRef} className={`fixed top-0 w-full z-50 bg-transparent px-8 py-6 flex justify-between items-center transition-all duration-400`}>
            <div className="h-10 w-10">
                <svg viewBox="0 0 100 100">
                    <path
                        ref={logoRef}
                        d="M50 10 L90 50 L50 90 L10 50 Z"
                        stroke="url(#logo-gradient)"
                        strokeWidth="9"
                        fill="none"
                    />
                    <defs>
                        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <nav className="hidden md:flex space-x-8 text-white">
                {menus.map(menu => <a className="hover:text-red-300 transition-colors" href={`#${menu.toLowerCase()}`} key={menu}>{menu}</a>)}
            </nav>
        </header>
    )
}
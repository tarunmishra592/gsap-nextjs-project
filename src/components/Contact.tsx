'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

export default function Contact() {
  const formRef = useRef<any>(null);
  const svgRef = useRef<any>(null);
  const sectionRef = useRef<any>(null);
  const titleRef = useRef<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  useEffect(() => {
    // Animate title with split text effect
    const titleChars = titleRef.current.querySelectorAll('.char');
    gsap.fromTo(titleChars, 
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.03,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
    
    // Animate form elements
    const formElements = formRef.current.querySelectorAll('input, textarea, button');
    gsap.fromTo(formElements,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
    
    // Animate SVG contact illustration
    const paths = svgRef.current.querySelectorAll('path');
    gsap.fromTo(paths,
      { drawSVG: '0%' },
      {
        drawSVG: '100%',
        duration: 2,
        stagger: 0.2,
        scrollTrigger: {
          trigger: svgRef.current,
          start: 'top bottom',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animate background elements
    const bgElements = sectionRef.current.querySelectorAll('.bg-element');
    gsap.to(bgElements, {
      y: 20,
      duration: 15,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.2
    });
  }, []);
  
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Form submission animation
    const tl = gsap.timeline();
    tl.to(formRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5
    })
    .to(formRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      onComplete: () => {
        setIsSubmitted(true);
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            email: '',
            message: ''
          });
        }, 3000);
      }
    });
  };

  // Split text into characters for animation
  const renderAnimatedText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char inline-block">{char}</span>
    ));
  };

  return (
    <section id="contact" ref={sectionRef} className="py-32 relative overflow-hidden bg-gradient-to-b from-gray-900 to-black">
    


      <div className="container mx-auto px-4 relative z-10">
        <h2 ref={titleRef} className="text-6xl font-bold text-center mb-4 text-white overflow-hidden">
          {renderAnimatedText('Get In Touch')}
        </h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16 text-xl">
          Have a project in mind or want to collaborate? Feel free to reach out!
        </p>
        
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div ref={formRef} className="w-full lg:w-1/2">
            {isSubmitted ? (
              <div className="text-center p-8 bg-gray-900 bg-opacity-70 rounded-2xl backdrop-blur-md border border-gray-700">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-300">Thanks for reaching out. I&apos;ll get back to you soon.</p>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="relative">
                  <label htmlFor="name" className="block text-gray-300 mb-2 text-lg">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 bg-gray-900 bg-opacity-70 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white backdrop-blur-md transition-all duration-300 hover:bg-gray-800/50"
                    required
                  />
                </div>
                
                <div className="relative">
                  <label htmlFor="email" className="block text-gray-300 mb-2 text-lg">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 bg-gray-900 bg-opacity-70 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white backdrop-blur-md transition-all duration-300 hover:bg-gray-800/50"
                    required
                  />
                </div>
                
                <div className="relative">
                  <label htmlFor="message" className="block text-gray-300 mb-2 text-lg">Message</label>
                  <textarea 
                    id="message" 
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 bg-gray-900 bg-opacity-70 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white backdrop-blur-md transition-all duration-300 hover:bg-gray-800/50 resize-none"
                    required
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl flex items-center justify-center group"
                >
                  Send Message
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            )}
          </div>
          
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            <div ref={svgRef} className="w-80 h-80 mb-8">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <path d="M50,50 C70,30 130,30 150,50 C170,70 170,130 150,150 C130,170 70,170 50,150 C30,130 30,70 50,50 Z" 
                  stroke="url(#contact-gradient)" 
                  strokeWidth="2" 
                  fill="none"
                />
                <path d="M70,90 L90,110 L130,70" 
                  stroke="url(#contact-gradient)" 
                  strokeWidth="2" 
                  fill="none"
                />
                <defs>
                  <linearGradient id="contact-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Contact Information */}
            <div className="space-y-4 text-center">
              <div className="flex items-center justify-center gap-4 text-gray-300">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>hello@example.com</span>
              </div>
              
              <div className="flex items-center justify-center gap-4 text-gray-300">
                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>LinkedIn / GitHub / Dribbble</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-6 mt-8">
              {['github', 'twitter', 'linkedin', 'dribbble'].map((platform, i) => (
                <a
                  key={platform}
                  href="#"
                  className="w-12 h-12 rounded-full bg-gray-900 bg-opacity-70 border border-gray-700 flex items-center justify-center text-gray-300 hover:text-white hover:bg-purple-600/20 hover:border-purple-500 transition-all duration-300 backdrop-blur-md"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <span className="sr-only">{platform}</span>
                  {/* Icon would go here */}
                  <div className="w-6 h-6 bg-current rounded-sm opacity-70"></div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 0.1; }
          50% { opacity: 0.3; }
          100% { opacity: 0.2; }
        }
      `}</style>
    </section>
  );
};

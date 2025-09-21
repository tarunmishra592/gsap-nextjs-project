'use client';
import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  const sectionRef = useRef(null);
  const itemsRef = useRef<any>([]);
  const titleRef = useRef<any>(null);
  const imageRefs = useRef<any>([]);
  const [hoveredProject, setHoveredProject] = useState(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
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
    
    // Animate project items with staggered delay
    itemsRef.current.forEach((item, i) => {
      if (!item) return;
      
      gsap.fromTo(item,
        { 
          opacity: 0,
          y: 100,
          rotationX: -15
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.2,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
    
    // Animate progress bar on scroll
    gsap.to('.progress-bar', {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top center',
        end: 'bottom bottom',
        scrub: true
      }
    });
  }, []);
  
  // Handle project hover with image display
  useEffect(() => {
    if (hoveredProject !== null) {
      // Show the corresponding image
      gsap.to(imageRefs.current[hoveredProject], {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: 'power2.out'
      });
    } else {
      // Hide all images
      imageRefs.current.forEach((imgRef) => {
        if (imgRef) {
          gsap.to(imgRef, {
            opacity: 0,
            scale: 0.8,
            duration: 0.5,
            ease: 'power2.out'
          });
        }
      });
    }
  }, [hoveredProject]);

  const projects = [
    {
      id: 1,
      title: 'Immersive Web Experience',
      description: 'A cutting-edge website combining Three.js and GSAP for immersive storytelling.',
      category: 'Web Development',
      year: '2023',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      tags: ['Next.js', 'Three.js', 'GSAP'],
      color: '#6366f1'
    },
    {
      id: 2,
      title: 'E-Commerce Revolution',
      description: 'Next-generation online shopping experience with 3D product visualization.',
      category: 'E-Commerce',
      year: '2023',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      tags: ['React', 'WebGL', 'Node.js'],
      color: '#10b981'
    },
    {
      id: 3,
      title: 'Interactive Data Dashboard',
      description: 'Real-time data visualization with interactive charts and animations.',
      category: 'Data Visualization',
      year: '2022',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      tags: ['D3.js', 'React', 'GraphQL'],
      color: '#8b5cf6'
    },
    {
      id: 4,
      title: 'Mobile Fitness App',
      description: 'AI-powered fitness coaching app with personalized workout plans.',
      category: 'Mobile App',
      year: '2022',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      tags: ['React Native', 'Firebase', 'AI'],
      color: '#ec4899'
    },
  ];
  
  // Split text into characters for animation
  const renderAnimatedText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char inline-block">{char}</span>
    ));
  };

  return (
    <section ref={sectionRef} id="work" className="py-32 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">

      {/* Project Images (Hidden by default, shown on hover) */}
      <div className="fixed inset-0 pointer-events-none z-20">
        {projects.map((project) => (
          <div
            key={project.id}
            ref={el => (imageRefs.current[project.id] = el)}
            className="absolute inset-0 flex items-center justify-center opacity-0 scale-90 transition-all duration-400"
          >
            <div className="relative w-full max-w-4xl h-96">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover rounded-2xl shadow-2xl transform translate-z-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-2xl"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header with Progress Bar */}
        <div className="flex items-center justify-between mb-20">
          <h2 ref={titleRef} className="text-6xl font-bold text-white overflow-hidden">
            {renderAnimatedText('Featured Work')}
          </h2>
          <div className="w-1/4 h-1 bg-gray-700 rounded-full">
            <div className="progress-bar h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 w-0"></div>
          </div>
        </div>
        
        {/* Full Width Project Lines */}
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={el => itemsRef.current[index] = el}
              className="portfolio-item group relative overflow-hidden"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Full width line */}
              <div className="absolute left-0 top-1/2 w-full h-px bg-gray-700 transform -translate-y-1/2"></div>
              
              <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between py-10">
                  {/* Project Info */}
                  <div className="lg:w-1/2 mb-8 lg:mb-0">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-sm text-gray-400 font-mono">{project.year}</span>
                      <span className="text-sm text-gray-400 font-mono">{project.category}</span>
                    </div>
                    <h3 className="text-4xl lg:text-5xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-500">
                      {project.title}
                    </h3>
                    <p className="text-xl text-gray-300 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                      {project.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-800 text-sm text-gray-200 rounded-full border border-gray-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                </div>
              </div>
              
              {/* Hover Background Effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(90deg, ${project.color}10, transparent)`
                }}
              ></div>
            </div>
          ))}
        </div>
        
        {/* View All Projects Button */}
        <div className="text-center mt-20">
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl flex items-center mx-auto group">
            View All Projects
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 0.1; }
          50% { opacity: 0.3; }
          100% { opacity: 0.2; }
        }
        
        .portfolio-item {
          border-radius: 0.5rem;
          transition: all 0.3s ease;
        }
        
        .portfolio-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </section>
  );
};

export default Work;
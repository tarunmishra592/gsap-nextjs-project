'use client'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { useEffect, useRef } from "react";

const journeyList = [
    {
        title: 'Senior Software Engineer', 
        company: 'ABC Company',
        description: 'Leading frontend development for client projects, implementing advanced animations and 3D visualizations.'
    },
    {
        title: 'Web Developer',
        company: 'XYZ company',
        description: 'Developed interactive web applications for major clients using React, Next.js, and modern animation libraries.'
    },
    {
        title: 'Frontend Developer',
        company: 'New Company',
        description: 'Created user interfaces and experiences for web and mobile applications, focusing on usability and aesthetics.'
    }
]

export default function About(){

    const headingRef = useRef(null)
    const contentRef = useRef(null)
    const imageRef = useRef<any>(null)
    const timelineRef = useRef(null)
    const aboutRef = useRef(null)
    const timeLineDotsRef = useRef<any>([])
    const timelineLineRef = useRef(null)

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        gsap.fromTo(headingRef.current, {
            y: 50,
            opacity: 0
        }, {
            y: 0, opacity: 1, duration: 1,
            scrollTrigger: {
                trigger: headingRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        })

        gsap.fromTo(contentRef.current, {
            y: 30,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.3,
            scrollTrigger: {
                trigger: contentRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        })

        gsap.fromTo(imageRef.current, {
            scale: 0.8, opacity: 0
        }, {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'back.out(1.7)'
        })

        imageRef.current.addEventListener('mouseenter', () => {
            gsap.to(imageRef.current, {
                scale: 1.05,
                duration: 0.3,
                rotation: 2,
                ease: 'power1.out'
            })
        })

        imageRef.current.addEventListener('mouseleave', () => {
            gsap.to(imageRef.current, {
                scale: 1,
                duration: 0.3,
                rotation: 0,
                ease: 'power1.out'
            })
        })

        gsap.fromTo(timelineRef.current, {
            height: '0%'
        }, {
            height: '100%',
            duration: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: aboutRef.current,
                start: 'top bottom',
                end: 'center center',
                scrub: true
            }
        })

        timeLineDotsRef.current.forEach(dot => {
            gsap.to(dot, {
                scale: 1.3,
                opacity: 0.7,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: 'ease-in-out'
            })
        })

        gsap.fromTo(timelineLineRef.current, {
            height: '0%'
        }, {
            height: '100%',
            duration: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: aboutRef.current,
                start: 'top bottom',
                end: 'center center',
                scrub: true
            }
        })




    }, [])


    return(
        <section ref={aboutRef} id="about" className="py-20 relative overflow-hidden">

            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-black to-blue-900 opacity-99"></div>
            </div>

            <div className="container mx-auto px-4">
                <h1 ref={headingRef} className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">About Me</h1>

                <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
                    <div ref={contentRef} className="w-full lg:w-1/2 text-gray-300 text-lg space-y-6">
                        <p>
                            I&apos;m a passionate software developer and interactive designer with
                            over 15 years of experience creating immersive digital experiences.
                        </p>
                        <p>
                            My expertise lies in combining cutting-edge technologies like
                            Three.js and GSAP to build websites that not only look beautiful
                            but also provide engaging user experiences.
                        </p>
                        <p>
                            When I&apos;m not coding, you can find me exploring new design trends,
                            experimenting with 3D graphics, or contributing to open-source
                            projects.
                        </p>
                    </div>
                    <div className="w-full lg:w-1/2 flex justify-center">
                        <div ref={imageRef} className="relative w-64 h-64 overflow-hidden border-4 border-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                            <div className="w-full h-full bg-gray-700 bg-cover bg-center">
                                <Image src={'/me.jpg'} alt="About me" fill className="object-cover w-full" />
                            </div>

                        </div>
                    </div>
                </div>

                <div className="relative mt-20">
                    <h3 className="text-2xl font-bold text-center mb-12 text-white">My Journey</h3>
                    <div ref={timelineLineRef} className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-purple-600" />
                    
                    <div ref={timelineRef} className="space-y-12">
                        {
                            journeyList.map((journey, i) => (
                                <div key={i} className="relative flex flex-col md:flex-row items-center justify-between">
                                    <div className={`w-full md:w-5/12 mb-6 md:mb-0 md:px-8 ${i % 2 ? 'order-2 text-left' : 'text-right'}`}>
                                        <h4 className="text-xl font-semibold text-white">{journey.title}</h4>
                                        <p className="text-purple-300">{journey.company}</p>
                                    </div>


                                    <div ref={(el) => (timeLineDotsRef.current[i] = el)} className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 border-4 border-gray-900 z-10" />
                                        <div className={`w-full md:w-5/12 ${i % 2 ? 'md:px-8 order-1' : 'md:pr-8'}`}>
                                            <p className="text-gray-400">
                                                {journey.description}
                                            </p>
                                        </div>

                                </div>
                            ))
                        }
                    </div>
                </div>

            </div>
        </section>
    )
}
'use client';
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 3D Skill Orb Component
const SkillOrb = ({ skill, index, totalSkills, isActive, onClick }) => {
  const meshRef = useRef<any>(null);
  const [hovered, setHovered] = useState(false);
  
  // Calculate position in a circle
  const angle = (index / totalSkills) * Math.PI * 2;
  const radius = 4;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  
  useFrame((state) => {
    if (meshRef.current) {
      // Always rotate slowly
      meshRef.current.rotation.y += 0.005;
      
      // Float up and down
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.2;
      
      // Pulse when active or hovered
      const targetScale = isActive || hovered ? 1.4 : 1;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
      
      // Move toward center when active
      const targetX = isActive ? 0 : x;
      const targetZ = isActive ? 0 : z;
      meshRef.current.position.lerp(
        new THREE.Vector3(targetX, meshRef.current.position.y, targetZ),
        0.1
      );
    }
  });

  return (
    <group>
      <Sphere
        ref={meshRef}
        args={[0.8, 32, 32]}
        position={[x, 0, z]}
        onClick={() => onClick(index)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={0.2}
          transparent
          opacity={0.9}
          roughness={0.3}
          metalness={0.7}
        />
      </Sphere>
      
      {/* Skill name text */}
      <Text
        position={[x, -1.5, z]}
        color="white"
        fontSize={0.4}
        anchorX="center"
        anchorY="middle"
        maxWidth={3}
        textAlign="center"
      >
        {skill.name}
      </Text>
      
      {/* Percentage text */}
      {isActive && (
        <Text
          position={[0, 2.5, 0]}
          color="white"
          fontSize={0.8}
          anchorX="center"
          anchorY="middle"
        >
          {skill.pct}%
        </Text>
      )}
    </group>
  );
};

// Central Main Orb
const CentralOrb = ({ activeSkill }) => {
  const meshRef = useRef<any>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
      
      // Pulse animation
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.05 + 1;
      meshRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <Sphere ref={meshRef} args={[1.5, 64, 64]}>
      <meshStandardMaterial
        color={activeSkill ? activeSkill.color : "#6366f1"}
        emissive={activeSkill ? activeSkill.color : "#6366f1"}
        emissiveIntensity={0.3}
        transparent
        opacity={0.9}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
};

// Particle System
const Particles = ({ count = 100, activeSkill }) => {
  const pointsRef = useRef<any>(null);
  const particlesPosition = useRef(new Float32Array(count * 3));
  
  useEffect(() => {
    // Initialize random particle positions
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      particlesPosition.current[i3] = (Math.random() - 0.5) * 20;
      particlesPosition.current[i3 + 1] = (Math.random() - 0.5) * 20;
      particlesPosition.current[i3 + 2] = (Math.random() - 0.5) * 20;
    }
    
    if (pointsRef.current) {
      pointsRef.current.geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(particlesPosition.current, 3)
      );
    }
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes?.position?.array;
      const time = state.clock.elapsedTime;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        // Animate particles with subtle movement
        if(positions){
          positions[i3 + 1] += Math.sin(time + i * 0.1) * 0.003;
        }
      }
      if(pointsRef.current.geometry.attributes?.position?.needsUpdate){
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
      }
      
      // Change color based on active skill
      if (activeSkill && pointsRef.current.material) {
        pointsRef.current.material.color.lerp(
          new THREE.Color(activeSkill.color),
          0.05
        );
      }
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry />
      <pointsMaterial 
        size={0.05} 
        color="#ffffff" 
        transparent 
        opacity={0.4} 
        sizeAttenuation 
      />
    </points>
  );
};

// Main Skills Component
const Skills = () => {
  const sectionRef = useRef<any>(null);
  const [activeSkill, setActiveSkill] = useState(null);
  const [mounted, setMounted] = useState(false);

  const skills = [
    { name: 'Next.js', pct: 85, color: '#3b82f6', description: 'React framework for production' },
    { name: 'Three.js', pct: 75, color: '#10b981', description: '3D library for the web' },
    { name: 'GSAP', pct: 90, color: '#8b5cf6', description: 'Powerful animation library' },
    { name: 'Tailwind', pct: 80, color: '#06b6d4', description: 'Utility-first CSS framework' },
    { name: 'SVG Animation', pct: 70, color: '#ec4899', description: 'Creating engaging vector graphics' },
    { name: 'WebGL', pct: 65, color: '#f97316', description: 'High-performance 3D graphics' },
  ];

  useEffect(() => {
    setMounted(true);
    
    // Section entrance animation
    gsap.fromTo(sectionRef.current, 
      { autoAlpha: 0, y: 100 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Animate skill info cards when activeSkill changes
    if (activeSkill !== null) {
      gsap.fromTo('.skill-info-card',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }
      );
    }
  }, [activeSkill]);

  const skillHandler = (index) => {
    if (activeSkill === index) {
      setActiveSkill(null);
    } else {
      setActiveSkill(index);
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative py-32 overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-gray-700 via-blue-800 to-gray-900"
    >

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-5xl font-bold text-center mb-20 text-white">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Skills & Expertise
          </span>
        </h2>
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-1/2 h-96 lg:h-[500px] relative">
            <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1.5} />
              <directionalLight position={[-5, 5, 5]} intensity={1} />
              
              <Particles count={200} activeSkill={activeSkill !== null ? skills[activeSkill] : null} />
              
              <CentralOrb activeSkill={activeSkill !== null ? skills[activeSkill] : null} />
              
              {skills.map((skill, index) => (
                <SkillOrb
                  key={skill.name}
                  skill={skill}
                  index={index}
                  totalSkills={skills.length}
                  isActive={activeSkill === index}
                  onClick={skillHandler}
                />
              ))}
              
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 3}
              />
            </Canvas>
          </div>
          
          <div className="w-full lg:w-1/2">
            {activeSkill !== null ? (
              <div className="skill-info-card bg-gray-900 bg-opacity-70 rounded-2xl p-8 backdrop-blur-md border border-gray-700">
                <h3 className="text-3xl font-bold mb-4 text-white">
                  {skills[activeSkill].name}
                </h3>
                <p className="text-gray-300 mb-6 text-lg">
                  {skills[activeSkill].description}
                </p>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">Proficiency</span>
                    <span className="text-white">{skills[activeSkill].pct}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
                    <div 
                      className="h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg"
                      style={{ width: `${skills[activeSkill].pct}%` }}
                    />
                  </div>
                </div>
                
                <button
                  onClick={() => setActiveSkill(null)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Back to All Skills
                </button>
              </div>
            ) : (
              <div className="text-center p-8 bg-gray-900 bg-opacity-70 rounded-2xl backdrop-blur-md border border-gray-700">
                <h3 className="text-2xl font-bold mb-4 text-white">Skills</h3>
                <p className="text-gray-300 mb-6">
                  Click on any skill orb to see details. Each orb represents a technology I specialize in, with size indicating proficiency level.
                </p>
                <div className="inline-flex rounded-md shadow-sm">
                  <button className="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-l-lg hover:bg-gray-600">
                    ← Rotate
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-gray-700 border-l border-gray-600 rounded-r-lg hover:bg-gray-600">
                    Click Orbs →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 mt-16">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="text-center p-4 bg-gradient-to-bl from-gray-800 to-gray-900 bg-opacity-50 rounded-xl backdrop-blur-md border border-gray-700 cursor-pointer hover:bg-opacity-70 transition-all duration-300 transform hover:-translate-y-2"
              onClick={() => skillHandler(index)}
            >
              <div className="w-16 h-16 mx-auto mb-3 rounded-full  flex items-center justify-center text-2xl"
                   style={{ background: `radial-gradient(circle, ${skill.color}33, transparent)` }}>
                {skill.name === 'Next.js' && '⚡'}
                {skill.name === 'Three.js' && '🎲'}
                {skill.name === 'GSAP' && '🎬'}
                {skill.name === 'Tailwind' && '💨'}
                {skill.name === 'SVG Animation' && '🖌️'}
                {skill.name === 'WebGL' && '👁️'}
              </div>
              <div className="text-white font-medium">{skill.name}</div>
              <div className="text-gray-400 text-sm">{skill.pct}%</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Stars, Environment, useTexture, Sparkles, Float } from '@react-three/drei';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import * as THREE from 'three';

// Genie Lamp Model with photorealistic quality
function LampModel() {
  const groupRef = useRef();
  const lampRef = useRef();
  
  // Load the FBX model
  const fbx = useLoader(FBXLoader, '/models/lamp/lamp.fbx');
  
  // Load textures
  const [albedo, normal, metallicSmoothness, lightMap] = useTexture([
    '/models/lamp/lamp_Lampada_AlbedoTransparency.png',
    '/models/lamp/lamp_Lampada_Normal.png',
    '/models/lamp/lamp_Lampada_MetallicSmoothness.png',
    '/models/lamp/LampLightingMap.png',
  ]);

  useEffect(() => {
    if (fbx) {
      // Apply photorealistic materials with all textures
      fbx.traverse((child) => {
        if (child.isMesh) {
          // Ultra-high quality material settings
          child.material = new THREE.MeshStandardMaterial({
            map: albedo,
            normalMap: normal,
            normalScale: new THREE.Vector2(2.0, 2.0), // Maximum normal detail
            metalnessMap: metallicSmoothness,
            roughnessMap: metallicSmoothness,
            lightMap: lightMap,
            lightMapIntensity: 1.5,
            metalness: 0.98,
            roughness: 0.12,
            emissive: new THREE.Color('#ff6347'),
            emissiveIntensity: 0.4,
            envMapIntensity: 2.5, // Maximum reflections
            side: THREE.DoubleSide,
          });
          
          // Enable anisotropic filtering for sharper textures
          if (child.material.map) child.material.map.anisotropy = 16;
          if (child.material.normalMap) child.material.normalMap.anisotropy = 16;
          if (child.material.metalnessMap) child.material.metalnessMap.anisotropy = 16;
          if (child.material.lightMap) child.material.lightMap.anisotropy = 16;
          
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      // Larger scale for maximum detail visibility
      fbx.scale.set(0.022, 0.022, 0.022);
      fbx.position.set(0, -0.8, 0);
    }
  }, [fbx, albedo, normal, metallicSmoothness, lightMap]);

  // Smooth, professional animation
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Slower, elegant rotation
      groupRef.current.rotation.y += delta * 0.25;
      
      // Gentle floating with smoother motion
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.15;
      
      // Very subtle tilt for realism
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.03;
      groupRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.4) * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive ref={lampRef} object={fbx} />
      
      {/* Soft ground shadow receiver */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -1.8, 0]} 
        receiveShadow
      >
        <planeGeometry args={[10, 10]} />
        <shadowMaterial opacity={0.3} />
      </mesh>
    </group>
  );
}

export default function LampBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        background: 'linear-gradient(to bottom, #1a1410 0%, #0d0a08 50%, #000000 100%)',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 40, near: 0.1, far: 1000 }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 2.8,
          outputColorSpace: THREE.SRGBColorSpace,
          pixelRatio: window.devicePixelRatio,
          shadowMap: {
            enabled: true,
            type: THREE.PCFSoftShadowMap,
          },
        }}
        shadows="soft"
        dpr={[2, 3]}
        flat={false}
      >
        {/* Studio-quality lighting for maximum clarity */}
        
        {/* Key Light - Main illumination from front-top */}
        <directionalLight 
          position={[4, 5, 6]} 
          intensity={4.5} 
          color="#ffffff"
          castShadow
          shadow-mapSize={[4096, 4096]}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
          shadow-bias={-0.0001}
        />
        
        {/* Fill Light - Soften shadows from left */}
        <directionalLight 
          position={[-4, 3, 4]} 
          intensity={2.8} 
          color="#fff8f0"
        />
        
        {/* Rim/Back Light - Create edge definition */}
        <directionalLight 
          position={[-2, 3, -4]} 
          intensity={2.5} 
          color="#ffe4b5"
        />
        
        {/* Top spotlight for dramatic effect */}
        <spotLight
          position={[0, 8, 0]}
          angle={0.5}
          penumbra={0.8}
          intensity={5}
          color="#fff8dc"
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        
        {/* Warm ambient fill */}
        <ambientLight intensity={1.2} color="#fffaf5" />
        
        {/* Point lights for golden glow details */}
        <pointLight position={[2, 1, 2]} intensity={2.5} color="#ffd700" distance={12} decay={1.5} />
        <pointLight position={[-2, 1, 2]} intensity={2.5} color="#ffb347" distance={12} decay={1.5} />
        <pointLight position={[0, -1, 3]} intensity={3} color="#ff8c00" distance={10} decay={2} />

        {/* HDR Environment for photorealistic reflections */}
        <Environment 
          preset="studio"
          background={false}
          blur={0}
        />

        {/* Subtle starfield - reduced to not distract */}
        <Stars 
          radius={120} 
          depth={60} 
          count={3000} 
          factor={3} 
          saturation={0.3} 
          fade 
          speed={0.5} 
        />

        {/* Minimal magical effects - focus on lamp clarity */}
        <Sparkles
          count={80}
          scale={[8, 8, 8]}
          size={1.5}
          speed={0.2}
          opacity={0.3}
          color="#ffd700"
        />

        {/* The Lamp Model */}
        <Suspense fallback={null}>
          <Float
            speed={1}
            rotationIntensity={0.2}
            floatIntensity={0.3}
          >
            <LampModel />
          </Float>
        </Suspense>

        {/* Subtle fog for depth */}
        <fog attach="fog" args={['#0d0a08', 15, 30]} />
      </Canvas>
    </div>
  );
}

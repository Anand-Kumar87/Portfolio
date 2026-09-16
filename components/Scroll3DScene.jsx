'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Scroll3DScene() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 7;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 3. 3D Cyber-Torus Knot Mesh (Dual Material: Solid Core + Neon Wireframe Outer)
    const geometry = new THREE.TorusKnotGeometry(1.6, 0.45, 140, 30);
    
    // Core material (iridescent metallic)
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x3b82f6,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.25,
      roughness: 0.2,
      metalness: 0.85,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 0.85,
    });
    const coreMesh = new THREE.Mesh(geometry, coreMaterial);
    scene.add(coreMesh);

    // Wireframe outer shell
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xd946ef,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireMesh = new THREE.Mesh(geometry, wireframeMaterial);
    wireMesh.scale.setScalar(1.02);
    scene.add(wireMesh);

    // 4. Orbiting Star Particle Constellation
    const particleCount = 450;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color('#38bdf8');
    const color2 = new THREE.Color('#c084fc');

    for (let i = 0; i < particleCount; i++) {
      const radius = 3.5 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const mixedColor = color1.clone().lerp(color2, Math.random());
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const cyanPoint = new THREE.PointLight(0x06b6d4, 4, 30);
    cyanPoint.position.set(5, 5, 4);
    scene.add(cyanPoint);

    const pinkPoint = new THREE.PointLight(0xec4899, 4, 30);
    pinkPoint.position.set(-5, -5, 4);
    scene.add(pinkPoint);

    const purpleLight = new THREE.DirectionalLight(0x8b5cf6, 2);
    purpleLight.position.set(0, 8, 5);
    scene.add(purpleLight);

    // 6. Scroll & Mouse Tracking
    let scrollY = window.scrollY;
    let targetScroll = window.scrollY;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const onScroll = () => {
      targetScroll = window.scrollY;
    };

    const onMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', onResize);

    // 7. Animation Loop
    let animationId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth lerp on scroll and mouse
      scrollY += (targetScroll - scrollY) * 0.06;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Calculate scroll progress factor
      const scrollFactor = scrollY * 0.0018;

      // Dynamic rotation coupled to scroll + idle animation
      const rotX = elapsedTime * 0.25 + scrollFactor * 1.5 + mouseY * 0.4;
      const rotY = elapsedTime * 0.35 + scrollFactor * 2.2 + mouseX * 0.4;
      const rotZ = scrollFactor * 0.8;

      coreMesh.rotation.set(rotX, rotY, rotZ);
      wireMesh.rotation.set(rotX, rotY, rotZ);

      // Orbit particles slowly in the opposite direction
      particles.rotation.y = -elapsedTime * 0.08 - scrollFactor * 0.5;
      particles.rotation.x = elapsedTime * 0.04;

      // Morph scale and horizontal position subtly based on scroll
      // Desktop: place slightly to the right side so text on left remains readable
      const isMobile = window.innerWidth < 768;
      const targetPosX = isMobile ? 0 : 2.2;
      const targetPosY = Math.sin(scrollFactor) * 0.4;
      const baseScale = isMobile ? 0.75 : 1.05;
      const breathing = 1 + Math.sin(elapsedTime * 1.5) * 0.03;

      coreMesh.position.x += (targetPosX - coreMesh.position.x) * 0.05;
      coreMesh.position.y += (targetPosY - coreMesh.position.y) * 0.05;
      wireMesh.position.copy(coreMesh.position);

      const scale = baseScale * breathing;
      coreMesh.scale.setScalar(scale);
      wireMesh.scale.setScalar(scale * 1.02);

      renderer.render(scene, camera);
    };

    animate();

    // 8. Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);

      geometry.dispose();
      coreMaterial.dispose();
      wireframeMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden opacity-85 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
}

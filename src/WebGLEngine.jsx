import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* ==========================================================================
   ADVANCED 60FPS WEBGL & THREE.JS SPATIAL ENGINE (SAFARI & MOBILE OPTIMIZED)
   ================================================================---------- */
export default function WebGLEngine({ compact }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.007);
    
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.position.z = 40;
    
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: !compact, 
      powerPreference: compact ? "low-power" : "high-performance",
      failIfMajorPerformanceCaveat: false
      });
    } catch {
      return; // The CSS background remains available without WebGL.
    }
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, compact ? 1 : 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x222222, 3.0);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xdc2626, 12, 250);
    pointLight1.position.set(30, 30, 40);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x3b82f6, 10, 250);
    pointLight2.position.set(-30, -30, 30);
    scene.add(pointLight2);

    const coreGroup = new THREE.Group();
    const coreGeo = new THREE.IcosahedronGeometry(8.5, compact ? 0 : 2);
    
    const coreMat = new THREE.MeshStandardMaterial({ 
      color: 0x050505, 
      roughness: 0.1, 
      metalness: 0.99,
      side: THREE.DoubleSide
    });
    const coreMeshSolid = new THREE.Mesh(coreGeo, coreMat);
    
    const wireMat = new THREE.MeshBasicMaterial({ color: 0xdc2626, wireframe: true, transparent: true, opacity: 0.95 });
    const coreMeshWire = new THREE.Mesh(coreGeo, wireMat);

    const innerGeo = new THREE.IcosahedronGeometry(5, 1);
    const innerMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true, transparent: true, opacity: 0.8 });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);

    const ringGeo1 = new THREE.TorusGeometry(13, 0.05, compact ? 8 : 16, compact ? 32 : 100);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;

    const ringGeo2 = new THREE.TorusGeometry(16, 0.035, compact ? 8 : 16, compact ? 32 : 100);
    const ring2 = new THREE.Mesh(ringGeo2, ringMat1);
    ring2.rotation.y = Math.PI / 4;

    const hitBoxGeo = new THREE.SphereGeometry(12, 16, 16);
    const hitBoxMat = new THREE.MeshBasicMaterial({ visible: false });
    const coreHitBox = new THREE.Mesh(hitBoxGeo, hitBoxMat);

    coreGroup.add(coreMeshSolid);
    coreGroup.add(coreMeshWire);
    coreGroup.add(innerMesh);
    coreGroup.add(ring1);
    coreGroup.add(ring2);
    coreGroup.add(coreHitBox);
    scene.add(coreGroup);

    const shardsGroup = new THREE.Group();
    const shardGeo = new THREE.TetrahedronGeometry(1.0, 0);
    const shardMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.15, metalness: 0.9, side: THREE.DoubleSide });
    const shards = [];
    
    const shardLimit = compact ? 8 : 60;
    for(let i = 0; i < shardLimit; i++) {
      const shard = new THREE.Mesh(shardGeo, shardMat);
      shard.position.set((Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 80);
      shard.userData = {
        rotSpeedX: (Math.random() - 0.5) * 0.08,
        rotSpeedY: (Math.random() - 0.5) * 0.08,
        originX: shard.position.x,
        originY: shard.position.y,
        originZ: shard.position.z,
        phase: Math.random() * Math.PI * 2
      };
      shards.push(shard);
      shardsGroup.add(shard);
    }
    scene.add(shardsGroup);

    const particleCount = compact ? 150 : 3500;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleOriginalPos = new Float32Array(particleCount * 3);
    
    for(let i = 0; i < particleCount * 3; i += 3) {
      const r = 15 + Math.random() * 70;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      particlePos[i] = x; particlePos[i+1] = y; particlePos[i+2] = z;
      particleOriginalPos[i] = x; particleOriginalPos[i+1] = y; particleOriginalPos[i+2] = z;
    }
    
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.18, transparent: true, opacity: 0.9 });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(0, 0);
    const targetMouse = new THREE.Vector3(0,0,0);
    const planeGeo = new THREE.PlaneGeometry(1000, 1000);
    const planeMat = new THREE.MeshBasicMaterial({ visible: false });
    const interactionPlane = new THREE.Mesh(planeGeo, planeMat);
    scene.add(interactionPlane);

    let isCoreHovered = false;
    
    const handleMove = (clientX, clientY) => {
      mouse.x = (clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const planeIntersects = raycaster.intersectObject(interactionPlane);
      if (planeIntersects.length > 0) targetMouse.copy(planeIntersects[0].point);
      const coreIntersects = raycaster.intersectObject(coreHitBox);
      isCoreHovered = coreIntersects.length > 0;
    };

    const onMouseMove = (e) => handleMove(e.clientX, e.clientY);
    if (!compact) window.addEventListener('mousemove', onMouseMove);

    let targetScroll = window.scrollY;
    let currentScroll = 0;
    const onScroll = () => { targetScroll = window.scrollY; syncAnimation(); };
    window.addEventListener('scroll', onScroll, { passive: true });

    let rafId = null;
    let lastFrame = 0;
    const shouldAnimate = () => !document.hidden && (!compact || window.scrollY < window.innerHeight * 1.5);
    const clock = new THREE.Clock();
    const coreTargetScale = new THREE.Vector3(1, 1, 1);

    const animate = (timestamp = 0) => {
      rafId = null;
      if (!shouldAnimate()) return;
      rafId = requestAnimationFrame(animate);
      if (compact && timestamp - lastFrame < 1000 / 24) return;
      lastFrame = timestamp;
      const time = clock.getElapsedTime();
      currentScroll += (targetScroll - currentScroll) * 0.05;
      
      const targetCoreScale = isCoreHovered ? 1.5 : 1.0;
      const pulse = Math.sin(time * 5) * 0.09;
      coreTargetScale.setScalar(targetCoreScale + pulse);
      coreGroup.scale.lerp(coreTargetScale, 0.12);
      
      coreGroup.rotation.y = time * 0.3 + (currentScroll * 0.0015);
      coreGroup.rotation.x = Math.sin(time * 0.2) * 0.2 + (currentScroll * 0.001);
      innerMesh.rotation.x = -time * 0.5;
      ring1.rotation.z = time * 0.3;
      ring2.rotation.y = -time * 0.25;
      
      const camTargetX = (mouse.x * 12);
      const camTargetY = compact ? 0 : (-(currentScroll * 0.015) + (mouse.y * 12));
      const camTargetZ = compact ? 48 : 40 - (currentScroll * 0.025);
      
      camera.position.x += (camTargetX - camera.position.x) * 0.06;
      camera.position.y += (camTargetY - camera.position.y) * 0.06;
      camera.position.z += (camTargetZ - camera.position.z) * 0.06;
      camera.lookAt(0, 0, 0);

      shards.forEach((shard) => {
        shard.rotation.x += shard.userData.rotSpeedX;
        shard.rotation.y += shard.userData.rotSpeedY;
        shard.position.y = shard.userData.originY + Math.sin(time * 3 + shard.userData.phase) * 3.2;
        const distToMouse = shard.position.distanceTo(targetMouse);
        if(!compact && distToMouse < 28) {
          const dir = shard.position.clone().sub(targetMouse).normalize();
          shard.position.add(dir.multiplyScalar(0.45));
        } else {
          shard.position.x += (shard.userData.originX - shard.position.x) * 0.08;
          shard.position.z += (shard.userData.originZ - shard.position.z) * 0.08;
        }
      });

      const positions = particleGeo.attributes.position.array;
      for(let i = 0; !compact && i < positions.length; i += 3) {
        const px = positions[i];
        const py = positions[i+1];
        const pz = positions[i+2];
        const dx = px - targetMouse.x;
        const dy = py - targetMouse.y;
        const dz = pz - targetMouse.z;
        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);

        if(dist > 0.001 && dist < 22) {
          const force = (22 - dist) * 0.22;
          positions[i] += (dx / dist) * force;
          positions[i+1] += (dy / dist) * force;
          positions[i+2] += (dz / dist) * force;
        }
        positions[i] += (particleOriginalPos[i] - positions[i]) * 0.09;
        positions[i+1] += (particleOriginalPos[i+1] - positions[i+1]) * 0.09;
        positions[i+2] += (particleOriginalPos[i+2] - positions[i+2]) * 0.09;
      }
      if (!compact) particleGeo.attributes.position.needsUpdate = true;
      particles.rotation.y = time * 0.05;

      renderer.render(scene, camera);
    };
    function syncAnimation() {
      if (shouldAnimate() && rafId === null) rafId = requestAnimationFrame(animate);
      else if (!shouldAnimate() && rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
    }
    document.addEventListener("visibilitychange", syncAnimation);
    syncAnimation();

    const onResize = () => {
      if (!container) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", syncAnimation);
      const geometries = new Set();
      const materials = new Set();
      scene.traverse(object => {
        if (object.geometry) geometries.add(object.geometry);
        if (object.material) (Array.isArray(object.material) ? object.material : [object.material]).forEach(material => materials.add(material));
      });
      geometries.forEach(geometry => geometry.dispose());
      materials.forEach(material => material.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
      if (container) container.innerHTML = '';
    };
  }, [compact]);

  return <div ref={mountRef} aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none" style={{ WebkitTransform: 'translateZ(0)' }} />;
};


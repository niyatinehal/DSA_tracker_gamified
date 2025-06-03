import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { InstancedMesh, Object3D, MeshStandardMaterial, SphereGeometry } from 'three';

const WaterDroplets: React.FC = () => {
  const COUNT = 20;
  const mesh = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const lifetimes = useMemo(() => Array.from({ length: COUNT }, () => Math.random()), []);
  
  useFrame((state) => {
    if (!mesh.current) return;
    
    // Update each water droplet
    for (let i = 0; i < COUNT; i++) {
      const time = (state.clock.elapsedTime + lifetimes[i] * 5) % 1;
      
      // Position droplets in a stream
      dummy.position.set(
        -0.05 + Math.sin(time * 10) * 0.03, 
        -0.1 - time * 0.5,
        0
      );
      
      // Scale droplets based on time
      const scale = 0.02 * (1 - time * 0.5);
      dummy.scale.set(scale, scale, scale);
      
      // Apply transformation to the instanced mesh
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    
    mesh.current.instanceMatrix.needsUpdate = true;
  });
  
  return (
    <instancedMesh ref={mesh} args={[null, null, COUNT]} castShadow>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial 
        color="#89CFF0" 
        transparent={true}
        opacity={0.8}
        emissive="#89CFF0"
        emissiveIntensity={0.2}
      />
    </instancedMesh>
  );
};

export default WaterDroplets;
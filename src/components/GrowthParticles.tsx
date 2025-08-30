import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { InstancedMesh, Object3D, Vector3, MathUtils } from 'three';

interface GrowthParticlesProps {
  stage: number;
}

const GrowthParticles: React.FC<GrowthParticlesProps> = ({ stage }) => {
  const COUNT = 100;
  const mesh = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  
  // Generate random positions for particles
  const positions = useMemo(() => {
    return Array.from({ length: COUNT }, () => ({
      position: new Vector3(
        (Math.random() - 0.5) * 2,
        Math.random() * 3 + (stage * 0.5),
        (Math.random() - 0.5) * 2
      ),
      // Random speed and lifetime
      speed: Math.random() * 0.2 + 0.1,
      lifetime: Math.random(),
      delay: Math.random() * 0.5
    }));
  }, [stage]);
  
  useFrame((state) => {
    if (!mesh.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Update each particle
    for (let i = 0; i < COUNT; i++) {
      const { position, speed, lifetime, delay } = positions[i];
      
      // Calculate particle life (0 to 1 and back to 0)
      const particleTime = ((time * speed) + delay) % 2;
      const life = particleTime < 1 ? particleTime : 2 - particleTime;
      
      // Set position with upward movement
      dummy.position.copy(position);
      dummy.position.y += life * 2;
      
      // Scale based on life
      const particleScale = 0.05 * life;
      dummy.scale.set(particleScale, particleScale, particleScale);
      
      // Set rotation
      dummy.rotation.set(
        time * (0.2 + lifetime * 0.2),
        time * (0.1 + lifetime * 0.3),
        time * (0.3 + lifetime * 0.2)
      );
      
      // Apply matrix to instanced mesh
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    
    mesh.current.instanceMatrix.needsUpdate = true;
  });
  
  // Different colors based on growth stage
  const colors = [
    "#00FF00", // Bright green for seedling
    "#90EE90", // Light green for young tree
    "#2E8B57", // Sea green for growing tree
    "#228B22"  // Forest green for mature tree
  ];
  
  const currentColor = colors[Math.min(stage, colors.length - 1)];
  
  return (
    <instancedMesh ref={mesh} args={[null, null, COUNT]} castShadow>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial 
        color={currentColor}
        emissive={currentColor}
        emissiveIntensity={0.5}
        transparent={true}
        opacity={0.7}
      />
    </instancedMesh>
  );
};

export default GrowthParticles;
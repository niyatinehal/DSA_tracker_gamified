import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface WateringCanProps {
  watering: boolean;
}

const WateringCan: React.FC<WateringCanProps> = ({ watering }) => {
  const canRef = useRef<Mesh>(null);
  const spoutRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (canRef.current && watering) {
      // Animate watering action
      canRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 5) * 0.1 - 0.7;
    } else if (canRef.current) {
      // Reset rotation when not watering
      canRef.current.rotation.z = -0.2;
    }
  });
  
  return (
    <group ref={canRef}>
      {/* Main can body */}
      <mesh castShadow>
        <cylinderGeometry args={[0.12, 0.15, 0.2, 16]} />
        <meshStandardMaterial color="#4682B4" metalness={0.6} roughness={0.3} />
      </mesh>
      
      {/* Handle */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <torusGeometry args={[0.1, 0.02, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#4682B4" metalness={0.6} roughness={0.3} />
      </mesh>
      
      {/* Spout */}
      <mesh ref={spoutRef} position={[0.15, -0.05, 0]} rotation={[0, 0, -Math.PI / 4]} castShadow>
        <cylinderGeometry args={[0.02, 0.05, 0.2, 8]} />
        <meshStandardMaterial color="#4682B4" metalness={0.6} roughness={0.3} />
      </mesh>
    </group>
  );
};

export default WateringCan;
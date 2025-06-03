import React from 'react';
import { Plane, Cloud } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Group } from 'three';

const Environment: React.FC = () => {
  const cloudsRef = useRef<Group>(null);
  
  // Animate clouds slowly
  useFrame(({ clock }) => {
    if (cloudsRef.current) {
      cloudsRef.current.position.x = Math.sin(clock.getElapsedTime() * 0.05) * 10;
    }
  });
  
  return (
    <group>
      {/* Ground */}
      <Plane 
        args={[40, 40]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -0.01, 0]}
        receiveShadow
      >
        <meshStandardMaterial 
          color="#8BC34A" 
          roughness={0.8}
          metalness={0.2}
        />
      </Plane>
      
      {/* Path to tree */}
      <Plane 
        args={[1, 6]} 
        rotation={[-Math.PI / 2, 0, Math.PI / 2]} 
        position={[-2.5, 0, 0]}
        receiveShadow
      >
        <meshStandardMaterial 
          color="#D2B48C" 
          roughness={1}
          metalness={0}
        />
      </Plane>
      
      {/* Background decorative trees */}
      <BackgroundTrees />
      
      {/* Clouds */}
      <group ref={cloudsRef} position={[0, 8, -15]}>
        <Cloud position={[-4, 2, 0]} args={[3, 2]} />
        <Cloud position={[5, 0, -2]} args={[4, 2]} />
        <Cloud position={[-7, -1, -5]} args={[5, 2]} />
      </group>
      
      {/* Distant mountains */}
      <Mountains />
    </group>
  );
};

// Component for background trees
const BackgroundTrees: React.FC = () => {
  return (
    <group>
      {/* Create several distant trees */}
      {[-8, -6, -4, 6, 8, 10].map((x) => (
        <group key={x} position={[x, 0, -5 - Math.abs(x) * 0.3]}>
          <mesh position={[0, 1, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.2, 2, 6]} />
            <meshStandardMaterial color="#5D4037" />
          </mesh>
          <mesh position={[0, 2.5, 0]} castShadow>
            <coneGeometry args={[1, 3, 8]} />
            <meshStandardMaterial 
              color={Math.random() > 0.5 ? "#2E7D32" : "#388E3C"} 
              roughness={0.8}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// Component for distant mountains
const Mountains: React.FC = () => {
  return (
    <group position={[0, 0, -20]}>
      {/* Create mountain range */}
      <mesh position={[-15, 6, 0]} rotation={[0, 0, Math.PI / 4]}>
        <coneGeometry args={[8, 12, 4]} />
        <meshStandardMaterial color="#9E9E9E" roughness={0.9} />
      </mesh>
      
      <mesh position={[0, 8, -5]}>
        <coneGeometry args={[10, 16, 4]} />
        <meshStandardMaterial color="#757575" roughness={0.9} />
      </mesh>
      
      <mesh position={[18, 5, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <coneGeometry args={[7, 10, 4]} />
        <meshStandardMaterial color="#616161" roughness={0.9} />
      </mesh>
    </group>
  );
};

export default Environment;
import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Group, Mesh, MeshStandardMaterial, Vector3 } from 'three';
import WateringCan from './WateringCan';
import WaterDroplets from './WaterDroplets';

interface KidProps {
  animate: boolean;
  onAnimationEnd: () => void;
  stage: number;
}

const Kid: React.FC<KidProps> = ({ animate, onAnimationEnd, stage }) => {
  const group = useRef<Group>(null);
  const [watering, setWatering] = useState(false);
  const [walking, setWalking] = useState(false);
  const progressRef = useRef(0);
  const directionRef = useRef(1); // 1: forward, -1: backward
  const [legAngle, setLegAngle] = useState(0);
  const [armAngle, setArmAngle] = useState(0);
  
  // Reset animation state when animate changes
  useEffect(() => {
    if (animate) {
      progressRef.current = 0;
      directionRef.current = 1;
      setWalking(true);
      setWatering(false);
    }
  }, [animate]);

  useFrame((state, delta) => {
    if (!group.current) return;
    
    // Animation logic
    if (animate) {
      // Update progress
      let progress = progressRef.current;
      
      if (walking) {
        progress += delta * 0.5 * directionRef.current;
        
        // Walking animation
        setLegAngle(Math.sin(state.clock.elapsedTime * 5) * 0.3);
        setArmAngle(Math.sin(state.clock.elapsedTime * 5) * 0.2);
      }
      
      // Position kid from starting point to tree
      const startX = -5;
      const treeX = 0;
      group.current.position.x = startX + (treeX - startX) * progress;
      
      // Handle animation stages
      if (progress >= 1 && directionRef.current === 1) {
        // Reached tree, start watering
        setWalking(false);
        setWatering(true);
        progress = 1;
        
        // After watering, start walking back
        setTimeout(() => {
          setWatering(false);
          setWalking(true);
          directionRef.current = -1;
        }, 3000);
      }
      
      if (progress <= 0 && directionRef.current === -1) {
        // Finished walking back
        setWalking(false);
        onAnimationEnd();
      }
      
      progressRef.current = progress;
      
      // Face direction based on movement
      if (group.current) {
        group.current.rotation.y = directionRef.current === 1 ? Math.PI / 2 : -Math.PI / 2;
      }
    }
  });

  return (
    <group ref={group} position={[-5, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
      {/* Kid body */}
      <group position={[0, 1, 0]}>
        {/* Torso */}
        <mesh position={[0, 0.2, 0]} castShadow>
          <boxGeometry args={[0.4, 0.6, 0.25]} />
          <meshStandardMaterial color="#3498db" />
        </mesh>
        
        {/* Head */}
        <mesh position={[0, 0.7, 0]} castShadow>
          <sphereGeometry args={[0.2, 24, 24]} />
          <meshStandardMaterial color="#f5d0a9" />
        </mesh>
        
        {/* Face */}
        <mesh position={[0.12, 0.7, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[0.15, 0.05]} />
          <meshBasicMaterial color="black" />
        </mesh>
        
        {/* Hair */}
        <mesh position={[0, 0.85, 0]} castShadow>
          <sphereGeometry args={[0.18, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#4a2700" />
        </mesh>
        
        {/* Right Arm */}
        <group position={[0.25, 0.2, 0]} rotation={[0, 0, armAngle]}>
          <mesh position={[0.15, 0, 0]} castShadow>
            <capsuleGeometry args={[0.06, 0.3, 4, 8]} />
            <meshStandardMaterial color="#f5d0a9" />
          </mesh>
        </group>
        
        {/* Left Arm */}
        <group position={[-0.25, 0.2, 0]} rotation={[0, 0, -armAngle]}>
          <mesh position={[-0.15, 0, 0]} castShadow>
            <capsuleGeometry args={[0.06, 0.3, 4, 8]} />
            <meshStandardMaterial color="#f5d0a9" />
          </mesh>
          
          {/* Watering can */}
          <group position={[-0.3, 0, 0.1]}>
            <WateringCan watering={watering} />
            {watering && <WaterDroplets />}
          </group>
        </group>
        
        {/* Right Leg */}
        <group position={[0.1, -0.4, 0]} rotation={[0, 0, walking ? legAngle : 0]}>
          <mesh position={[0, -0.2, 0]} castShadow>
            <capsuleGeometry args={[0.07, 0.3, 4, 8]} />
            <meshStandardMaterial color="#2c3e50" />
          </mesh>
        </group>
        
        {/* Left Leg */}
        <group position={[-0.1, -0.4, 0]} rotation={[0, 0, walking ? -legAngle : 0]}>
          <mesh position={[0, -0.2, 0]} castShadow>
            <capsuleGeometry args={[0.07, 0.3, 4, 8]} />
            <meshStandardMaterial color="#2c3e50" />
          </mesh>
        </group>
      </group>
    </group>
  );
};

export default Kid;
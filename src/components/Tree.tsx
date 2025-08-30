// import React, { useRef, useState, useEffect } from 'react';
// import { useFrame } from '@react-three/fiber';
// import { Mesh, Group, MathUtils } from 'three';
// import { useSpring, animated, config } from '@react-spring/three';
// import TreeLeaves from './TreeLeaves';
// import GrowthParticles from './GrowthParticles';

// interface TreeProps {
//   stage: number;
//   position?: [number, number, number]   ;
// }

// const Tree: React.FC<TreeProps> = ({ position=[0,0,0],stage }) => {
//   const groupRef = useRef<Group>(null);
//   const trunkRef = useRef<Mesh>(null);
//   const [prevStage, setPrevStage] = useState(stage);
//   const [showParticles, setShowParticles] = useState(false);
  
//   // Handle growth animations when stage changes
//   useEffect(() => {
//     if (stage !== prevStage) {
//       setShowParticles(true);
      
//       // Hide particles after animation
//       const timer = setTimeout(() => {
//         setShowParticles(false);
//       }, 2000);
      
//       setPrevStage(stage);
//       return () => clearTimeout(timer);
//     }
//   }, [stage, prevStage]);
  
//   // Calculate tree scale based on growth stage
//   const baseScale = 0.4;
//   const maxScale = 1.5;
//   const growthFactor = stage / 3; // 0 to 1 based on stage
  
//   // Spring animation for smooth growth
//   const { scale, trunkHeight } = useSpring({
//     scale: baseScale + (maxScale - baseScale) * growthFactor,
//     trunkHeight: 1 + growthFactor * 2,
//     config: config.gentle
//   });
  
//   // Add some gentle wind movement
//   useFrame((state) => {
//     if (groupRef.current) {
//       const windFactor = 0.005 * (stage + 1) * 0.5;
//       groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * windFactor;
//     }
//   });
  
//   return (
//     <animated.group ref={groupRef} scale={scale}>
//       {/* Tree trunk */}
//       <animated.mesh 
//         ref={trunkRef} 
//         position={[0, trunkHeight.to(h => h / 2), 0]} 
//         castShadow 
//         receiveShadow
//       >
//         <cylinderGeometry args={[0.2, 0.3, 1, 8]} />
//         <meshStandardMaterial 
//           color="#8B4513" 
//           roughness={0.8}
//           metalness={0.1}
//         />
//       </animated.mesh>
      
//       {/* Tree branches - more complex as tree grows */}
//       {stage >= 1 && (
//         <>
//           <mesh position={[0.3, 1.5, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
//             <cylinderGeometry args={[0.06, 0.08, 0.6, 6]} />
//             <meshStandardMaterial color="#8B4513" roughness={0.9} />
//           </mesh>
          
//           <mesh position={[-0.3, 1.6, 0]} rotation={[0, 0, -Math.PI / 4]} castShadow>
//             <cylinderGeometry args={[0.05, 0.07, 0.5, 6]} />
//             <meshStandardMaterial color="#8B4513" roughness={0.9} />
//           </mesh>
//         </>
//       )}
      
//       {stage >= 2 && (
//         <>
//           <mesh position={[0.2, 2.0, 0.2]} rotation={[Math.PI / 8, 0, Math.PI / 8]} castShadow>
//             <cylinderGeometry args={[0.04, 0.06, 0.4, 6]} />
//             <meshStandardMaterial color="#8B4513" roughness={0.9} />
//           </mesh>
          
//           <mesh position={[-0.15, 2.1, -0.1]} rotation={[-Math.PI / 10, 0, -Math.PI / 6]} castShadow>
//             <cylinderGeometry args={[0.03, 0.05, 0.3, 6]} />
//             <meshStandardMaterial color="#8B4513" roughness={0.9} />
//           </mesh>
//         </>
//       )}
      
//       {/* Tree leaves with different colors based on stage */}
//       <animated.group position={[0, trunkHeight, 0]}>
//         <TreeLeaves stage={stage} />
//       </animated.group>
      
//       {/* Growth particles when transitioning between stages */}
//       {showParticles && <GrowthParticles stage={stage} />}
//     </animated.group>
//   );
// };

// export default Tree;

// import React, { useRef, useState, useEffect } from 'react';
// import { useFrame } from '@react-three/fiber';
// import { Group, Mesh } from 'three';
// import { useSpring, animated, config } from '@react-spring/three';
// import TreeLeaves from './TreeLeaves';
// import GrowthParticles from './GrowthParticles';

// interface TreeProps {
//   stage: number; // 0 = sapling, 3 = fully grown
//   position?: [number, number, number];
// }

// const Tree: React.FC<TreeProps> = ({ stage, position = [0, 0, 0] }) => {
//   const groupRef = useRef<Group>(null);
//   const [prevStage, setPrevStage] = useState(stage);
//   const [showParticles, setShowParticles] = useState(false);

//   // Trigger particles when stage changes
//   useEffect(() => {
//     if (stage !== prevStage) {
//       setShowParticles(true);
//       const timer = setTimeout(() => setShowParticles(false), 2000);
//       setPrevStage(stage);
//       return () => clearTimeout(timer);
//     }
//   }, [stage, prevStage]);

//   // Spring for trunk height growth
//   const { trunkHeight } = useSpring({
//     trunkHeight: 1 + stage * 0.8, // trunk grows taller each stage
//     config: config.gentle,
//   });

//   // Gentle sway animation
//   useFrame((state) => {
//     if (groupRef.current) {
//       const wind = Math.sin(state.clock.elapsedTime * 0.5) * 0.02 * (stage + 1);
//       groupRef.current.rotation.z = wind;
//     }
//   });

//   return (
//     <group ref={groupRef} position={position}>
//       {/* Trunk */}
//       <animated.mesh
//         position={[0, trunkHeight.to(h => h / 2), 0]}
//         castShadow
//         receiveShadow
//       >
//         <cylinderGeometry args={[0.2, 0.3, 1, 8]} />
//         <meshStandardMaterial color="#8B4513" roughness={0.8} />
//       </animated.mesh>

//       {/* Branches (appear stage 1+) */}
//       {stage >= 1 && (
//         <>
//           <mesh position={[0.3, 1.5, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
//             <cylinderGeometry args={[0.06, 0.08, 0.6, 6]} />
//             <meshStandardMaterial color="#8B4513" roughness={0.9} />
//           </mesh>
//           <mesh position={[-0.3, 1.5, 0]} rotation={[0, 0, -Math.PI / 4]} castShadow>
//             <cylinderGeometry args={[0.05, 0.07, 0.5, 6]} />
//             <meshStandardMaterial color="#8B4513" roughness={0.9} />
//           </mesh>
//         </>
//       )}

//       {stage >= 2 && (
//         <>
//           <mesh position={[0.2, 2.0, 0.2]} rotation={[Math.PI / 8, 0, Math.PI / 8]} castShadow>
//             <cylinderGeometry args={[0.04, 0.06, 0.4, 6]} />
//             <meshStandardMaterial color="#8B4513" roughness={0.9} />
//           </mesh>
//           <mesh position={[-0.15, 2.1, -0.1]} rotation={[-Math.PI / 10, 0, -Math.PI / 6]} castShadow>
//             <cylinderGeometry args={[0.03, 0.05, 0.3, 6]} />
//             <meshStandardMaterial color="#8B4513" roughness={0.9} />
//           </mesh>
//         </>
//       )}

//       {/* Leaves */}
//       <animated.group position={[0, trunkHeight, 0]}>
//         <TreeLeaves stage={stage} />
//       </animated.group>

//       {/* Growth particles */}
//       {showParticles && <GrowthParticles stage={stage} />}
//     </group>
//   );
// };

// export default Tree;

import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Mesh } from 'three';
import { useSpring, animated, config } from '@react-spring/three';
import TreeLeaves from './TreeLeaves';
import GrowthParticles from './GrowthParticles';

export interface TreeHandle {
  grow: () => void;
}

interface TreeProps {
  stage: number; // initial stage
  position: [number, number, number];
}

const Tree = forwardRef<TreeHandle, TreeProps>(({ stage, position }, ref) => {
  const groupRef = useRef<Group>(null);
  const [currentStage, setCurrentStage] = useState(stage);
  const [showParticles, setShowParticles] = useState(false);

  useImperativeHandle(ref, () => ({
    grow: () => {
      if (currentStage < 3) {
        setShowParticles(true);
        setCurrentStage(prev => Math.min(prev + 1, 3));
        setTimeout(() => setShowParticles(false), 2000);
      }
    }
  }));

  const { trunkHeight } = useSpring({
    trunkHeight: 1 + currentStage * 0.8,
    config: config.gentle,
  });

  useFrame((state) => {
    if (groupRef.current) {
      const wind = Math.sin(state.clock.elapsedTime * 0.5) * 0.02 * (currentStage + 1);
      groupRef.current.rotation.z = wind;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Trunk */}
      <animated.mesh position={[0, trunkHeight.to(h => h / 2), 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.3, 1, 8]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </animated.mesh>

      {/* Branches */}
      {currentStage >= 1 && (
        <>
          <mesh position={[0.3, 1.5, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
            <cylinderGeometry args={[0.06, 0.08, 0.6, 6]} />
            <meshStandardMaterial color="#8B4513" roughness={0.9} />
          </mesh>
          <mesh position={[-0.3, 1.5, 0]} rotation={[0, 0, -Math.PI / 4]} castShadow>
            <cylinderGeometry args={[0.05, 0.07, 0.5, 6]} />
            <meshStandardMaterial color="#8B4513" roughness={0.9} />
          </mesh>
        </>
      )}

      {currentStage >= 2 && (
        <>
          <mesh position={[0.2, 2.0, 0.2]} rotation={[Math.PI / 8, 0, Math.PI / 8]} castShadow>
            <cylinderGeometry args={[0.04, 0.06, 0.4, 6]} />
            <meshStandardMaterial color="#8B4513" roughness={0.9} />
          </mesh>
          <mesh position={[-0.15, 2.1, -0.1]} rotation={[-Math.PI / 10, 0, -Math.PI / 6]} castShadow>
            <cylinderGeometry args={[0.03, 0.05, 0.3, 6]} />
            <meshStandardMaterial color="#8B4513" roughness={0.9} />
          </mesh>
        </>
      )}

      {/* Leaves */}
      <animated.group position={[0, trunkHeight, 0]}>
        <TreeLeaves stage={currentStage} />
      </animated.group>

      {/* Particles */}
      {showParticles && <GrowthParticles stage={currentStage} />}
    </group>
  );
});

export default Tree;


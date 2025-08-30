
// import React from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Sky } from '@react-three/drei';
// import Avatar2D from './Avatar2D';
// import Tree from './Tree';
// import Environment from './Environment';
// import { User } from '../types';

// interface ForestSceneProps {
//   user: User;
// }

// const ForestScene: React.FC<ForestSceneProps> = ({ user }) => {
//   const timeOfDay = 0.3 + (Math.min(user.treesPlanted, 10) * 0.05);
//     const defaultAvatar={
//     skinColor: '#f5d0a9',
//     hairColor: '#4a2700',
//     bodyColor: '#3498db',
//     accessory: 'none'
//   }

//   return (
//     <div className="w-full h-[400px] rounded-xl overflow-hidden">
//       <Canvas 
//         shadows 
//         camera={{ position: [5, 4, 7], fov: 45 }}
//         gl={{ antialias: true }}
//       >
//         <Sky 
//           distance={450000} 
//           sunPosition={[Math.cos(timeOfDay * Math.PI * 2) * 10, 
//                         Math.sin(timeOfDay * Math.PI * 2) * 10, 0]} 
//           inclination={timeOfDay} 
//           azimuth={0.25} 
//         />
        
//         <ambientLight intensity={0.4 + (user.treesPlanted * 0.02)} />
//         <directionalLight 
//           position={[5, 8, 5]} 
//           intensity={1.5} 
//           castShadow 
//           shadow-mapSize-width={1024} 
//           shadow-mapSize-height={1024}
//         />
//                 {/* Debug cube - should always show */}
//         <mesh position={[0, 0.5, 0]} castShadow>
//           <boxGeometry args={[1, 1, 1]} />
//           <meshStandardMaterial color="red" />
//         </mesh>
//         <Environment />
//         <Avatar2D 
//           position={[-2, 0, 0]} 
//           avatar={defaultAvatar}
//           isWatering={false}
//         />
        
//         {/* Render trees based on user's progress */}
//         {Array.from({ length: Math.min(user.treesPlanted, 12) }, (_, i) => {
//           const angle = (i / 12) * Math.PI * 2;
//           const radius = 3 + (i % 3);
//           const x = Math.cos(angle) * radius;
//           const z = Math.sin(angle) * radius;
//           const stage = Math.min(Math.floor(i / 3), 3);
          
//           return (
//             <Tree 
//               key={i}
//               position={[x, 0, z]}
//               stage={stage}
//             />
//           );
//         })}
        
//         <OrbitControls 
//           enableZoom={true} 
//           enableRotate={true} 
//           enablePan={false}
//           maxPolarAngle={Math.PI / 2 - 0.1}
//           minDistance={4}
//           maxDistance={15}
//         />
//       </Canvas>
//     </div>
//   );
// };

// export default ForestScene;

import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky } from '@react-three/drei';
import Avatar2D from './Avatar2D';
import Tree from './Tree';
import Environment from './Environment';
import { User } from '../types';

interface ForestSceneProps {
  user: User;
}

const ForestScene: React.FC<ForestSceneProps> = ({ user }) => {

  const [isWatering, setIsWatering] = useState(false);
const [targetTreePosition, setTargetTreePosition] = useState<[number, number, number] | null>(null);

  const timeOfDay = 0.3 + (Math.min(user.treesPlanted, 10) * 0.05);

  const defaultAvatar = {
    skinColor: '#f5d0a9',
    hairColor: '#4a2700',
    bodyColor: '#3498db',
    accessory: 'none',
  };

  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden bg-black">
      <Canvas
        shadows
        camera={{ position: [5, 5, 5], fov: 60 }}
      >
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />

        {/* Debug cube stays for testing */}
        {/* <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="red" />
        </mesh> */}
        <Tree position={[2, 0, 0]} stage={2} />

        {/* Avatar */}
        <Avatar2D
          position={[-2, 0, 0]}
          // @ts-ignore
          avatar={defaultAvatar}
          isWatering={false}
        />

        {/* Trees */}
        {Array.from({ length: Math.min(user.treesPlanted, 12) }, (_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const radius = 3 + (i % 3);
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const stage = Math.min(Math.floor(i / 3), 3);

          return <Tree key={i} position={[x, 0, z]} stage={stage} />;
        })}

        {/* Sky (add back once basics work) */}
        <Sky
          distance={450000}
          sunPosition={[
            Math.cos(timeOfDay * Math.PI * 2) * 10,
            Math.sin(timeOfDay * Math.PI * 2) * 10,
            0,
          ]}
          inclination={timeOfDay}
          azimuth={0.25}
        />

        {/* Environment (comment if suspicious) */}
        <Environment />

        {/* Controls */}
        <OrbitControls target={[0, 0, 0]} />
      </Canvas>
    </div>
  );
};

export default ForestScene;


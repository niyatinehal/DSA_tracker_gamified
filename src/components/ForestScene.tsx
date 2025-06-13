import React from 'react';
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
  const timeOfDay = 0.3 + (Math.min(user.treesPlanted, 10) * 0.05);

  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden">
      <Canvas 
        shadows 
        camera={{ position: [5, 4, 7], fov: 45 }}
        gl={{ antialias: true }}
      >
        <Sky 
          distance={450000} 
          sunPosition={[Math.cos(timeOfDay * Math.PI * 2) * 10, 
                        Math.sin(timeOfDay * Math.PI * 2) * 10, 0]} 
          inclination={timeOfDay} 
          azimuth={0.25} 
        />
        
        <ambientLight intensity={0.4 + (user.treesPlanted * 0.02)} />
        <directionalLight 
          position={[5, 8, 5]} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize-width={1024} 
          shadow-mapSize-height={1024}
        />
        
        <Environment />
        <Avatar2D 
          position={[-2, 0, 0]} 
          avatar={user.avatar}
          isWatering={false}
        />
        
        {/* Render trees based on user's progress */}
        {Array.from({ length: Math.min(user.treesPlanted, 12) }, (_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const radius = 3 + (i % 3);
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const stage = Math.min(Math.floor(i / 3), 3);
          
          return (
            <Tree 
              key={i}
              position={[x, 0, z]}
              stage={stage}
            />
          );
        })}
        
        <OrbitControls 
          enableZoom={true} 
          enableRotate={true} 
          enablePan={false}
          maxPolarAngle={Math.PI / 2 - 0.1}
          minDistance={4}
          maxDistance={15}
        />
      </Canvas>
    </div>
  );
};

export default ForestScene;
import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky } from '@react-three/drei';
import Kid from './Kid';
import Tree from './Tree';
import Environment from './Environment';
import { useAnimationControls } from '../hooks/useAnimationControls';

interface TreeGrowthSceneProps {
  stage: number;
}

const TreeGrowthScene: React.FC<TreeGrowthSceneProps> = ({ stage }) => {
  const { animate, setAnimate, handleAnimationEnd } = useAnimationControls(stage);
  const [timeOfDay, setTimeOfDay] = useState(0.3); // 0-1 range (0: night, 1: day)

  // Adjust time of day based on tree growth stage
  useEffect(() => {
    const newTimeOfDay = 0.3 + (stage * 0.2); // Gets brighter as tree grows
    setTimeOfDay(newTimeOfDay);
  }, [stage]);

  // Labels for each growth stage
  const stageLabels = [
    '🌱 Seedling',
    '🌿 Young Sapling',
    '🌳 Growing Tree',
    '🌲 Mature Tree'
  ];

  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-lg relative">
      <Canvas 
        shadows 
        camera={{ position: [5, 4, 7], fov: 45 }}
        gl={{ antialias: true }}
      >
        {/* Dynamic sky based on growth stage */}
        <Sky 
          distance={450000} 
          sunPosition={[Math.cos(timeOfDay * Math.PI * 2) * 10, 
                        Math.sin(timeOfDay * Math.PI * 2) * 10, 0]} 
          inclination={timeOfDay} 
          azimuth={0.25} 
        />
        
        {/* Lighting */}
        <ambientLight intensity={0.4 + (stage * 0.1)} />
        <directionalLight 
          position={[5, 8, 5]} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize-width={1024} 
          shadow-mapSize-height={1024}
        />
        
        {/* Scene elements */}
        <Environment />
        <Kid animate={animate} onAnimationEnd={handleAnimationEnd} stage={stage} />
        <Tree stage={stage} />
        
        {/* Camera controls */}
        <OrbitControls 
          enableZoom={true} 
          enableRotate={true} 
          enablePan={false}
          maxPolarAngle={Math.PI / 2 - 0.1}
          minDistance={4}
          maxDistance={15}
        />
      </Canvas>
      
      {/* Stage indicator UI */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm mx-auto py-2 px-4 rounded-full inline-block">
          <span className="font-bold text-lg">
            {stageLabels[stage]}
          </span>
        </div>
      </div>
      
      {/* Water button */}
      {!animate && (
        <button 
          onClick={() => setAnimate(true)}
          className="absolute bottom-16 right-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-all shadow-lg hover:shadow-xl"
        >
          💧 Water Tree
        </button>
      )}
    </div>
  );
};

export default TreeGrowthScene;
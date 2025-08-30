import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { User } from '../types';

interface Avatar2DProps {
  position: [number, number, number];
  avatar: User['avatar'];
  isWatering: boolean;
}

const Avatar2D: React.FC<Avatar2DProps> = ({ position, avatar, isWatering }) => {
  const groupRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (groupRef.current && !isWatering) {
      // Gentle idle animation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Avatar rendered as 3D billboard */}
      <mesh position={[0, 1, 0]} rotation={[0, Math.PI / 4, 0]}>
        <planeGeometry args={[1.5, 2]} />
        <meshBasicMaterial transparent>
          <canvasTexture 
            attach="map" 
            image={createAvatarCanvas(avatar)} 
          />
        </meshBasicMaterial>
      </mesh>
      
      {/* Shadow */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.5]} />
        <meshBasicMaterial color="#000" opacity={0.2} transparent />
      </mesh>
    </group>
  );
};

// Helper function to create avatar canvas
const createAvatarCanvas = (avatar: User['avatar']): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  canvas.width = 200;
  canvas.height = 250;
  const ctx = canvas.getContext('2d')!;
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw body
  ctx.fillStyle = avatar.bodyColor;
  ctx.beginPath();
  ctx.arc(100, 180, 40, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw head
  ctx.fillStyle = avatar.skinColor;
  ctx.beginPath();
  ctx.arc(100, 100, 35, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw hair
  ctx.fillStyle = avatar.hairColor;
  ctx.beginPath();
  ctx.arc(100, 85, 40, Math.PI, Math.PI * 2);
  ctx.fill();
  
  // Draw eyes
  ctx.fillStyle = '#333';
  ctx.beginPath();
  ctx.arc(85, 95, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(115, 95, 4, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw smile
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(100, 105, 15, 0, Math.PI);
  ctx.stroke();
  
  // Draw arms
  ctx.fillStyle = avatar.skinColor;
  ctx.beginPath();
  ctx.arc(65, 150, 15, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(135, 150, 15, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw accessory
  if (avatar.accessory === 'hat') {
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(75, 60, 50, 20);
    ctx.beginPath();
    ctx.arc(100, 60, 25, Math.PI, Math.PI * 2);
    ctx.fill();
  } else if (avatar.accessory === 'glasses') {
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(85, 95, 12, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(115, 95, 12, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(97, 95);
    ctx.lineTo(103, 95);
    ctx.stroke();
  }
  
  return canvas;
};

export default Avatar2D;


{/**
  
   */}
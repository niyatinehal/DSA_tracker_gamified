import React, { useMemo } from 'react';
import { Color } from 'three';

interface TreeLeavesProps {
  stage: number;
}

const TreeLeaves: React.FC<TreeLeavesProps> = ({ stage }) => {
  // Determine leaf colors based on growth stage
  const leafColors = useMemo(() => {
    const baseColors = [
      new Color('#90EE90'), // Light green (young)
      new Color('#66BB6A'), // Medium green
      new Color('#2E7D32'), // Dark green
      new Color('#1B5E20')  // Very dark green (mature)
    ];
    
    // Generate variations for each stage
    return baseColors.map((color, i) => {
      const variations = [];
      for (let j = 0; j < 3; j++) {
        const newColor = color.clone();
        // Add slight random variation
        newColor.r += (Math.random() - 0.5) * 0.1;
        newColor.g += (Math.random() - 0.5) * 0.1;
        newColor.b += (Math.random() - 0.5) * 0.1;
        variations.push(newColor.getHexString());
      }
      return variations;
    });
  }, []);
  
  // Get current stage colors with fallback to first stage
  const currentColors = leafColors[Math.min(stage, leafColors.length - 1)];
  
  return (
    <group>
      {/* Main foliage based on growth stage */}
      {stage === 0 && (
        // Stage 0: Small sprout
        <mesh position={[0, 0.3, 0]} castShadow>
          <sphereGeometry args={[0.4, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color={`#${currentColors[0]}`} />
        </mesh>
      )}
      
      {stage === 1 && (
        // Stage 1: Young tree
        <group>
          <mesh position={[0, 0.4, 0]} castShadow>
            <coneGeometry args={[0.7, 1.2, 8]} />
            <meshStandardMaterial color={`#${currentColors[0]}`} />
          </mesh>
          <mesh position={[0, 1.0, 0]} castShadow>
            <coneGeometry args={[0.5, 0.8, 8]} />
            <meshStandardMaterial color={`#${currentColors[1]}`} />
          </mesh>
        </group>
      )}
      
      {stage === 2 && (
        // Stage 2: Growing tree
        <group>
          <mesh position={[0, 0.4, 0]} castShadow>
            <coneGeometry args={[1.0, 1.4, 8]} />
            <meshStandardMaterial color={`#${currentColors[0]}`} />
          </mesh>
          <mesh position={[0, 1.2, 0]} castShadow>
            <coneGeometry args={[0.8, 1.2, 8]} />
            <meshStandardMaterial color={`#${currentColors[1]}`} />
          </mesh>
          <mesh position={[0, 2.0, 0]} castShadow>
            <coneGeometry args={[0.6, 0.9, 8]} />
            <meshStandardMaterial color={`#${currentColors[2]}`} />
          </mesh>
        </group>
      )}
      
      {stage === 3 && (
        // Stage 3: Full mature tree
        <group>
          <mesh position={[0, 0.5, 0]} castShadow>
            <coneGeometry args={[1.2, 1.6, 10]} />
            <meshStandardMaterial color={`#${currentColors[0]}`} />
          </mesh>
          <mesh position={[0, 1.5, 0]} castShadow>
            <coneGeometry args={[1.0, 1.4, 10]} />
            <meshStandardMaterial color={`#${currentColors[1]}`} />
          </mesh>
          <mesh position={[0, 2.4, 0]} castShadow>
            <coneGeometry args={[0.8, 1.2, 10]} />
            <meshStandardMaterial color={`#${currentColors[2]}`} />
          </mesh>
          <mesh position={[0, 3.2, 0]} castShadow>
            <coneGeometry args={[0.5, 0.8, 8]} />
            <meshStandardMaterial color={`#${currentColors[0]}`} />
          </mesh>
        </group>
      )}
    </group>
  );
};

export default TreeLeaves;
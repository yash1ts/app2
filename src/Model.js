import React from 'react';
import { DoubleSide, MeshNormalMaterial, MeshStandardMaterial} from 'three';
import {mergeVertices} from 'three-stdlib/utils/BufferGeometryUtils.js';
export function Model({geometry, rotation, position}) {
  const material = new MeshStandardMaterial({color:'#fff', metalness: 0.4, roughness: 0.2})
  return (
    <mesh
      position={position}
      rotation={rotation}
      geometry={geometry}
      castShadow
      receiveShadow
      visible
      material={material}
    />
  )
}
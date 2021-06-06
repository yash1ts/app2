import React from 'react';
import { MeshNormalMaterial} from 'three';
export function Model(props) {
  const material = new MeshNormalMaterial({vertexColors: true})
  return (
    <mesh
      {...props}
      castShadow
      receiveShadow
      visible
      material={material}
    />
  )
}
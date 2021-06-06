import { Html, useProgress } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, {useContext, useRef, useState} from 'react';
import { LoadingContext } from './LoadingContext';
export default function Loader(){
    const ref = useRef();
    const [hovered, setHovered] = useState(false);
    const [upperState, setUpperState, lowerState, setLowerState] = useContext(LoadingContext);
    // const progress = (upperState.loaded + lowerState.loaded)*100 / (upperState.total+ lowerState.total);
    const {progress} = useProgress();
    useFrame(() => {
      ref.current.rotation.y += 0.02
      ref.current.rotation.x += 0.02});
  
    return (
        <group>
      <mesh
        ref={ref}
        scale={hovered ? [1.2, 1.2, 1.2] : [1, 1, 1]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}>
          <ambientLight intensity={0.3} />
        <pointLight position={[-20, -20, -20]} intensity={0.7}/>
        <pointLight position={[20, 20, 20]} intensity={0.7}/>
        <pointLight position={[20, -20, 20]} intensity={0.7}/>
        <pointLight position={[-20, 20, 20]} intensity={0.7}/>
        <pointLight position={[20, 20, -20]} intensity={0.7}/>
        <pointLight position={[-20, -20, 20]} intensity={0.7}/>
        <pointLight position={[-20, 20, -20]} intensity={0.7}/>
        <pointLight position={[20, -20, -20]} intensity={0.7}/>
        <boxGeometry attach="geometry" args={[10, 10, 10]} />
        <meshPhongMaterial color="black"/>
      </mesh>
      <Html position={[-1, -15, 0]}><h4>{`${progress.toFixed(0) || 0}`}</h4></Html>
      </group>
    )
  }
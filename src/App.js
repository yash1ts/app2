import { Canvas,useLoader} from '@react-three/fiber';
import React, { Suspense, useRef, useState } from 'react';
import './App.css';
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader';
import { MeshNormalMaterial, PerspectiveCamera} from 'three';
import { Button } from '@material-ui/core';
import { OrbitControls } from '@react-three/drei';

function Box(props) {
  const mesh = useRef(null)
  const geom = useLoader(STLLoader, props.url);
  const material = new MeshNormalMaterial({vertexColors: true})
  return (
    <mesh
      {...props}
      ref={mesh}
      castShadow
      receiveShadow
      geometry={geom}
      visible
      material={material}
    />
  )
}

function App() {
  const [showUpper, setShowUpper] = useState(true);
  const [showLower, setShowLower] = useState(true);
  const [meshAngle, setMeshAngle] = useState(1.75);
  const camera = new PerspectiveCamera(undefined, 
  window.innerWidth/window.innerHeight);
  const controls = useRef(null);

  camera.position.set(0,0,140);

  const centerView = () => {
    setShowUpper(true);
    setShowLower(true);
    setMeshAngle(1.75);
    camera.position.set(0,0,140);
    camera.lookAt( controls.current.target );
    controls.current.update();
  }

  const rightView = () => {
    setShowUpper(true);
    setShowLower(true);
    // controls.target.set(0,0,100);
    setMeshAngle(1.75);

    camera.position.set( 120, 0, 120 );
    camera.lookAt( controls.current.target );

    controls.current.update();
    
  }

  const leftView = () => {
    setShowUpper(true);
    setShowLower(true);
    camera.position.set(-120,0,120);
    camera.lookAt( controls.current.target );
    // controls.target.set(0,0,0);
    controls.current.update();
  }

  return (
    <div className="App" style={{flex: 1, height: '100vh'}} >
      <Button variant="contained" color="primary" onClick={()=> {
        centerView();
        }}>Center</Button>
      <Button variant="contained" color="primary" onClick={()=> {
        rightView();
        }}>Right</Button>
        <Button variant="contained" color="primary" onClick={()=> {
        leftView();
        }}>Left</Button>
        <Button variant="contained" color="primary" onClick={()=> {
          centerView();
        setShowLower(false);
        setShowUpper(true);
        setMeshAngle(0);
        }}>Upper Jaw</Button>
        <Button variant="contained" color="primary" onClick={()=> {
          centerView();
        setShowLower(true);
        setShowUpper(false);
        controls.current.reset();
        setMeshAngle(3.14);
        }}>Lower Jaw</Button>
      <Canvas camera={camera} onCreated={()=>{
        controls?.current?.saveState();
      }}>
        <Suspense fallback={null}>
        <ambientLight intensity={1}/>
        <pointLight args={[10,10,10]}/>
        {showLower && <Box position={[0, 0, 1]} rotation={[meshAngle,3.14,0]} url={'/modl.stl'}/>}
        {showUpper && <Box position={[0, 0, -1]} rotation={[meshAngle,3.14,0]} url={'/mod.stl'}/>}
        </Suspense>
        <OrbitControls ref={controls}/>
      </Canvas>
    </div>
  );
}

export default App;

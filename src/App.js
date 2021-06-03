import { Canvas,useFrame,useLoader} from '@react-three/fiber';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import './App.css';
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader';
import { MeshNormalMaterial, PerspectiveCamera} from 'three';
import { Button, CircularProgress } from '@material-ui/core';
import { OrbitControls, Sphere } from '@react-three/drei';

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

function Loader(){
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  useFrame(() => {
    ref.current.rotation.y += 0.01
    ref.current.rotation.x += 0.01})

  return (
    <mesh
      ref={ref}
      scale={hovered ? [1.2, 1.2, 1.2] : [1, 1, 1]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}>
        <ambientLight intensity={0.3} />
      <pointLight position={[-20, -20, -20]} intensity={0.7} />
      <pointLight position={[20, 20, 20]} intensity={0.7}/>
      <pointLight position={[20, -20, 20]} intensity={0.7}/>
      <pointLight position={[-20, 20, 20]} intensity={0.7}/>
      <pointLight position={[20, 20, -20]} intensity={0.7}/>
      <pointLight position={[-20, -20, 20]} intensity={0.7}/>
      <pointLight position={[-20, 20, -20]} intensity={0.7}/>
      <pointLight position={[20, -20, -20]} intensity={0.7}/>
      <boxBufferGeometry attach="geometry" args={[10, 10, 10]} />
      <meshPhongMaterial color="black"/>
    </mesh>
  )
}

function App() {
  const [showUpper, setShowUpper] = useState(true);
  const [showLower, setShowLower] = useState(true);
  const [meshAngle, setMeshAngle] = useState(1.75);
  const [loading, setLoading] = useState(true);
  const [fileUrl, setFileUrl] = useState("");
  const camera = new PerspectiveCamera(undefined, 
  window.innerWidth/window.innerHeight);
  const controls = useRef(null);

  camera.position.set(0,0,140);

  const centerView = () => {
    setShowUpper(true);
    setShowLower(true);
    setMeshAngle(1.75);
    camera.position.set(0,0,140);
    controls.current.update();
  }

  const rightView = () => {
    setShowUpper(true);
    setShowLower(true);
    // controls.target.set(0,0,100);
    setMeshAngle(1.75);

    camera.position.set( 120, 0, 120 );

    controls.current.update();
    
  }

  const leftView = () => {
    setShowUpper(true);
    setShowLower(true);
    setMeshAngle(1.75);
    camera.position.set(-120,0,120);
    // controls.target.set(0,0,0);
    controls.current.update();
  }

  useEffect(()=>{
    const url = "https://yash1ts.pythonanywhere.com/js/frog.stl";
    fetch(url,{
      method: 'GET',
  }).then((response)=>{ 
    const blob = response.blob();
    var file = new File([blob], "file.stl",{lastModified: new Date().getTime(), type: blob.type});
    return file;
  })
  .then((file) => {
    const uri = URL.createObjectURL(file);
    console.log('file');
    console.log(uri);
    setFileUrl(uri);
    setLoading(false);
  })
  },[]);

  return (
    <div className="App" style={{flex: 1, height: '100vh', justifyContent: 'center', alignItems:'center'}} >
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
        setMeshAngle(3.14);
        }}>Upper Jaw</Button>
        <Button variant="contained" color="primary" onClick={()=> {
        centerView();
        setShowLower(true);
        setShowUpper(false);
        setMeshAngle(0);
        }}>Lower Jaw</Button>
      <Canvas camera={camera}>
        <ambientLight intensity={1}/>
        <Suspense fallback={<Loader/>}>
        {showLower && <Box position={[0, 0, 1]} rotation={[meshAngle,3.14,0]} url={'https://yash1ts.pythonanywhere.com/js/mod.stl'}/>}
        {showUpper && <Box position={[0, 0, -1]} rotation={[meshAngle,3.14,0]} url={'https://yash1ts.pythonanywhere.com/js/modl.stl'}/>}
        </Suspense>
        <OrbitControls ref={controls}/>
      </Canvas>
    </div>
  );
}

export default App;

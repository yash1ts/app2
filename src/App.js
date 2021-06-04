import { Canvas,useFrame,useLoader} from '@react-three/fiber';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import './App.css';
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader';
import { LoadingManager, MeshNormalMaterial, PerspectiveCamera, Vector3} from 'three';
import { Button, CircularProgress } from '@material-ui/core';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import CanvasBoard from './CanvasBoard';
import { Tween } from '@tweenjs/tween.js';
import { ControlBoard } from './ControlBoard';

function Model({geom, position, rotation}) {
  const mesh = useRef(null)
  const material = new MeshNormalMaterial({vertexColors: true})
  return (
    <mesh
      position={position}
      rotation={rotation}
      ref={mesh}
      castShadow
      receiveShadow
      geometry={geom}
      visible
      material={material}
    />
  )
}

function JawModel({meshAngle, showUpper, showLower, enableControls}) {
  const upperjaw = 'https://yash1ts.pythonanywhere.com/js/mod.stl';
  const lowerjaw = 'https://yash1ts.pythonanywhere.com/js/modl.stl';
  let firstLoaded = false;
  const [upper, lower] = useLoader(STLLoader, [upperjaw, lowerjaw], null, (xhr)=> {
    if(xhr.loaded === xhr.total){
      if(firstLoaded) {
        enableControls();
      } else {
        firstLoaded = true;
      }
    }
  });
  return (
    <group>
      {showUpper &&<Model position={[0, 0, 1]} rotation={[meshAngle,3.14,0]} geom={upper}/>}
      {showLower &&<Model position={[0, 0, -1]} rotation={[meshAngle,3.14,0]} geom={lower}/>}
    </group>
  )
}

function App({camera, controls}) {
  const [showUpper, setShowUpper] = useState(true);
  const [showLower, setShowLower] = useState(true);
  const [meshAngle, setMeshAngle] = useState(1.75);

  const enableControls = () => {
    controls.enabled = true;
  }

  return (
    <div className="App" style={{flex: 1, height: '100vh', justifyContent: 'center', alignItems:'center'}} >
      <div style={{flex: 1, height: '100vh', width:'100%', justifyContent: 'center', alignItems:'center', zIndex: 1, position:'absolute'}}>
        <ControlBoard setShowLower={setShowLower} setShowUpper={setShowUpper} setMeshAngle={setMeshAngle} camera={camera} controls={controls} />
      </div>
      <CanvasBoard model={<JawModel meshAngle={meshAngle} showUpper={showUpper} showLower={showLower} enableControls={enableControls}/>} camera={camera} />
    </div>
  );
}

export default App;

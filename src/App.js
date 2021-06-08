import { useLoader} from '@react-three/fiber';
import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import {PLYLoader} from 'three/examples/jsm/loaders/PLYLoader';
import CanvasBoard from './CanvasBoard';
import { ControlBoard } from './ControlBoard';
import { Model } from './Model';
import { ControlContext, ControlContextProvider } from './ControlContext';
import { LoadingContext, LoadingContextProvider } from './LoadingContext';
import { Box3, Vector3 } from 'three';
import {mergeVertices} from 'three-stdlib/utils/BufferGeometryUtils.js';

function JawModel({upperData, lowerData, enableControls}) {
  const [controlState, setControlState] = useContext(ControlContext);
  const data = useLoader(PLYLoader, [...upperData, ...lowerData]);
  enableControls(true);
  
  const obj = data[controlState.stage+ upperData.length];
  const obj2 = data[controlState.stage];
  obj2.center();
  obj.center();
  const pos = obj.boundingSphere.center;
  const pos2 = new Vector3(pos.x, pos.y, pos.z);
  return (
    <group>
      {controlState.showUpper &&<Model position={pos2.add(new Vector3(0,10,0))} rotation={[controlState.meshAngle,0,0]} geometry={data[controlState.stage]}/>}
      {controlState.showLower &&<Model position={pos} rotation={[controlState.meshAngle,0,0]} geometry={obj}/>}
    </group>
  );

}

function App({camera, controls}) {
  const [controlsEnabled, enableControls] = useState(false);

  const upperRaw = ['mod0', 'mod1', 'mod2', 'mod3', 'mod4', 'mod5'];
  const lowerRaw = ['model0', 'model1', 'model2', 'model3', 'model4', 'model5'];
  const upperData = upperRaw.map((it)=>{
    return 'https://yash1ts.pythonanywhere.com/js/ply/'+it+'.ply';
  });
  const lowerData = lowerRaw.map((it)=>{
    return 'https://yash1ts.pythonanywhere.com/js/ply/'+it+'.ply';
  });
  controls.enabled = controlsEnabled;
  

  return (
    <ControlContextProvider >
      <LoadingContextProvider>
    <div className="App" style={{display:'flex', height:'100vh'}} >
      <div style={{display:'flex', flex: 1, width:'100%', zIndex: 1, position:'fixed', left:0, right:0, bottom:0, top:0}}>
      {controls.enabled && <ControlBoard camera={camera} controls={controls} />}
      </div>
      <CanvasBoard camera={camera} controls={controls} >
        <JawModel upperData={upperData} lowerData={lowerData} enableControls={enableControls}/>
      </CanvasBoard>
    </div>
    </LoadingContextProvider>
    </ControlContextProvider>
  );
}

export default App;

import { useLoader} from '@react-three/fiber';
import React, { useContext, useState } from 'react';
import './App.css';
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader';
import CanvasBoard from './CanvasBoard';
import { ControlBoard } from './ControlBoard';
import { Model } from './Model';
import { ControlContext, ControlContextProvider } from './ControlContext';
import { LoadingContext, LoadingContextProvider } from './LoadingContext';

function JawModel({upperData, lowerData, enableControls}) {
  const [controlState, setControlState] = useContext(ControlContext);
  const [loadingState, setLoadingState] = useContext(LoadingContext);
  let count = 0;
 
  const data = useLoader(STLLoader, [...upperData, ...lowerData], null, (xhr)=> {
    const url = xhr.target.responseURL;
    // setLoadingState((loading)=>({
    //   ...loading,
    //   [url]: {
    //     loaded: xhr.loaded,
    //     total: xhr.total,
    //   }
    // }))
    if(xhr.loaded === xhr.total){
      count+=1;
      if(count === upperData.length + lowerData.length){
        enableControls(true);
      }
    }
  });
  
  return (
    <group>
      {controlState.showUpper &&<Model position={[0, -10, 1]} rotation={[controlState.meshAngle,3.14,0]} geometry={data[controlState.stage]}/>}
      {controlState.showLower &&<Model position={[0, -10, -1]} rotation={[controlState.meshAngle,3.14,0]} geometry={data[upperData.length + controlState.stage]}/>}
    </group>
  )
}

function App({camera, controls}) {
  const [controlsEnabled, enableControls] = useState(false);

  const upperRaw = ['mod0','mod1', 'mod2', 'mod3', 'mod4', 'mod5'];
  const lowerRaw = ['model0', 'model1', 'model2', 'model3', 'model4', 'model5'];
  const upperData = upperRaw.map((it)=>{
    return 'https://yash1ts.pythonanywhere.com/js/'+it+'.stl';
  });
  const lowerData = lowerRaw.map((it)=>{
    return 'https://yash1ts.pythonanywhere.com/js/'+it+'.stl';
  });
  controls.enabled = controlsEnabled;
  

  return (
    <ControlContextProvider >
      <LoadingContextProvider>
    <div className="App" style={{display:'flex', height:'100vh'}} >
      <div style={{display:'flex', flex: 1, width:'100%', zIndex: 1, position:'fixed', left:0, right:0, bottom:0, top:0}}>
      {controls.enabled && <ControlBoard camera={camera} controls={controls} />}
      </div>
      <CanvasBoard camera={camera} >
        <JawModel upperData={upperData} lowerData={lowerData} enableControls={enableControls}/>
      </CanvasBoard>
    </div>
    </LoadingContextProvider>
    </ControlContextProvider>
  );
}

export default App;

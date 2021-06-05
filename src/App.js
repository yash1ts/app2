import { useLoader} from '@react-three/fiber';
import React, { useContext, useState } from 'react';
import './App.css';
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader';
import CanvasBoard from './CanvasBoard';
import { ControlBoard } from './ControlBoard';
import { Model } from './Model';
import { ControlContext, ControlContextProvider } from './ControlContext';
import { LoadingContext, LoadingContextProvider } from './LoadingContext';

function JawModel({meshAngle, showUpper, showLower, enableControls}) {
  const upperjaw = 'https://yash1ts.pythonanywhere.com/js/mod.stl';
  const lowerjaw = 'https://yash1ts.pythonanywhere.com/js/modl.stl';
  const [controlState, setControlState] = useContext(ControlContext);
  const [upperState, setUpperState,lowerState, setLowerState] = useContext(LoadingContext);
  let firstLoaded = false;
  const [upper, lower] = useLoader(STLLoader, [upperjaw, lowerjaw], null, (xhr)=> {
    const url = xhr.target.responseURL;
    if(url === upperjaw) {
      setUpperState({
          total: xhr.total,
          loaded: xhr.loaded
      })
    } else {
      setLowerState({
          total: xhr.total,
          loaded: xhr.loaded
      })
    }
    
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
      {controlState.showUpper &&<Model position={[0, 0, 1]} rotation={[controlState.meshAngle,3.14,0]} geometry={upper}/>}
      {controlState.showLower &&<Model position={[0, 0, -1]} rotation={[controlState.meshAngle,3.14,0]} geometry={lower}/>}
    </group>
  )
}

function App({camera, controls}) {

  const enableControls = () => {
    controls.enabled = true;
  }

  return (
    <ControlContextProvider >
      <LoadingContextProvider>
    <div className="App" style={{ display:'flex', flex: 1, height: '100vh'}} >
      <div style={{flex: 1, height: '100vh', width:'100%', zIndex: 1, position:'absolute'}}>
          <ControlBoard camera={camera} controls={controls} />
      </div>
      <CanvasBoard camera={camera}>
        <JawModel enableControls={enableControls}/>
      </CanvasBoard>
    </div>
    </LoadingContextProvider>
    </ControlContextProvider>
  );
}

export default App;

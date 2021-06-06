import { Button, IconButton, LinearProgress } from '@material-ui/core';
import { PauseCircleFilled, PlayCircleFilled } from '@material-ui/icons';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ControlContext } from './ControlContext';
export function ControlBoard({controls, camera, setShowLower, setShowUpper, setMeshAngle}) {
  const [controlState, setControlState] = useContext(ControlContext);
  const [playing, setPlaying] = useState(false);
  const ref = useRef(null);
  useEffect(()=>{
    return ()=>{
      if(ref.current){
        clearInterval(ref.current);
      }
    }
  }, []);

  const onPause = ()=>{
    if(ref.current) {
      clearInterval(ref.current);
    }
    setPlaying(false);
  }
  const onPlay = ()=>{
    setPlaying(true);
    setControlState((control) => ({
      ...control,
      stage: control.stage < control.total ? control.stage+1 : 0,
    }));
    ref.current = setInterval(()=>{
      setControlState((control) => ({
        ...control,
        stage: control.stage < control.total ? control.stage+1 : 0,
      }));
    }, 1000);
  }

    const centerView = () => {
        setControlState((control) =>({
          ...control,
          showUpper: true,
          showLower: true,
          meshAngle: 1.75,
        }));
        camera.position.set(0,0,140);
        camera.updateProjectionMatrix();
        camera.updateWorldMatrix();
        controls.update();
      }
    
      const rightView = () => {
        setControlState((control) =>({
          ...control,
          showUpper: true,
          showLower: true,
          meshAngle: 1.75,
        }));
    
        camera.position.set( 120, 0, 120 );
        camera.updateProjectionMatrix();
        camera.updateWorldMatrix();
        controls.update();
        
      }
    
      const leftView = () => {
        setControlState((control) =>({
          ...control,
          showUpper: true,
          showLower: true,
          meshAngle: 1.75,
        }));
        camera.position.set(-120,0,120);
        camera.updateProjectionMatrix();
        camera.updateWorldMatrix();
        controls.update();
      }
    
      const upperView = () => {
        setControlState((control) =>({
          ...control,
          showUpper: true,
          showLower: false,
          meshAngle: 0,
        }));
        camera.position.set(0,0,140);
        camera.updateProjectionMatrix();
        camera.updateWorldMatrix();
        controls.update();
      }
    
      const lowerView = () => {
        setControlState((control) =>({
          ...control,
          showUpper: false,
          showLower: true,
          meshAngle: 3.14,
        }));
        camera.position.set(0,0,140);
        camera.updateProjectionMatrix();
        camera.updateWorldMatrix();
        controls.update();
      }
    
    const playItems = [];
    const PADDING = 12
    playItems.push(<Button onClick={()=>{
      setControlState((control)=>({
        ...control,
        stage: 0
      }));
    }} style={{display:'flex',flex:1, paddingTop:PADDING}}/>);
    for(let i=0;i<controlState.total-1; i+=1){
      playItems.push(<Button onClick={()=>{
        setControlState((control)=>({
          ...control,
          stage: i+1
        }));
      }} style={{display:'flex',flex:2, paddingTop:PADDING}}/>);
    };
    playItems.push(<Button onClick={()=>{
      setControlState((control)=>({
        ...control,
        stage: control.total
      }));
    }} style={{display:'flex',flex:1, paddingTop:PADDING}}/>);
    
    return (
      <div style={{display: 'flex', flexDirection:'column', width:'100%', height:'100%', justifyContent:'space-between'}}>
        <div style={{display:'flex',  flexDirection: 'row', justifyContent: 'space-around', margin: 50, height: 30}}>
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
            upperView()
            }}>Upper Jaw</Button>
            <Button variant="contained" color="primary" onClick={()=> {
            lowerView();
            }}>Lower Jaw</Button>
        </div>
        <div style={{display:'flex', width:'100%', justifyContent:'center'}}>
        {controlState.total >1 &&<div style={{display:'flex', flexDirection:'row', width:'40%', height:30, marginBottom:'10%', alignItems:'center'}}>
          {!playing &&
          <IconButton onClick={onPlay}>
            <PlayCircleFilled color='primary' fontSize="large" style={{margin:10}}/>
          </IconButton>}
          {playing &&
          <IconButton onClick={onPause}>
            <PauseCircleFilled color='primary' fontSize="large" style={{margin:10}}/>
            </IconButton>}
          <div onClick={onPause} style={{display:'flex', flex:1, flexDirection:'column'}}>
            <div style={{display:'flex', width:'100%', marginTop:24}}>
              <LinearProgress variant="determinate" color='primary' value={controlState.stage*100/controlState.total} style={{display:'flex', width:'100%', flex:1}}/>
            </div>
            <div style={{display:'flex', position:'relative' ,top:-12, right:0, left:0}}>
                {playItems}
            </div>
          </div>
        </div>}
        </div>
        </div>
    );
}
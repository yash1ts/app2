import React, { useContext, useEffect, useRef, useState } from 'react';
import { ProgressBar, Button } from 'react-bootstrap';
import { ControlContext } from './ControlContext';
import { MdPlayCircleFilled, MdPauseCircleFilled } from "react-icons/md";
import { Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
export function ControlBoard({controls, camera }) {
  const [controlState, setControlState] = useContext(ControlContext);
  const [playing, setPlaying] = useState(false);
  const cameraTarget = null;
  const previousTarget = null;
  let timeout = null;
  const ref = useRef(null);
  useEffect(()=>{
    return ()=>{
      if(ref.current){
        clearInterval(ref.current);
      }
      if(timeout){
        clearTimeout(timeout);
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
          meshAngle: 0,
          cameraTarget: new Vector3( 0, 0, 140 )
        }));
        timeout = setTimeout(()=>{
          setControlState((control)=>({
            ...control,
            cameraTarget: null
        }));
        },1000)
      }
    
      const rightView = () => {
        if(timeout){
          clearTimeout(timeout);
        }
        setControlState((control) =>({
          ...control,
          showUpper: true,
          showLower: true,
          meshAngle: 0,
          cameraTarget: new Vector3( 100, 0, 100 )
        }));
        timeout = setTimeout(()=>{
          setControlState((control)=>({
            ...control,
            cameraTarget: null
        }));
        },1000)
        
      }
    
      const leftView = () => {
        if(timeout){
          clearTimeout(timeout);
        }
        setControlState((control) =>({
          ...control,
          showUpper: true,
          showLower: true,
          meshAngle: 0,
          cameraTarget: new Vector3( -100, 0, 100 )
        }));
        timeout = setTimeout(()=>{
          setControlState((control)=>({
            ...control,
            cameraTarget: null
        }));
        },1000)
      }
    
      const upperView = () => {
        if(timeout){
          clearTimeout(timeout);
        }
        setControlState((control) =>({
          ...control,
          showUpper: true,
          showLower: false,
          meshAngle: -1.75,
          cameraTarget: new Vector3( 0, 0, 140 )
        }));
        timeout = setTimeout(()=>{
          setControlState((control)=>({
            ...control,
            cameraTarget: null
        }));
        },1000)
      }
    
      const lowerView = () => {
        if(timeout){
          clearTimeout(timeout);
        }
        setControlState((control) =>({
          ...control,
          showUpper: false,
          showLower: true,
          meshAngle: 1.75,
          cameraTarget: new Vector3( 0, 0, 140 )
        }));
        timeout = setTimeout(()=>{
          setControlState((control)=>({
            ...control,
            cameraTarget: null
        }));
        },1000)
      }
    
    const playItems = [];
    const PADDING = 12
    playItems.push(<Button variant="light" key={0} onClick={()=>{
      setControlState((control)=>({
        ...control,
        stage: 0
      }));
    }} onTouchStart={()=>{
      setControlState((control)=>({
        ...control,
        stage: 0
      }));
    }} style={{display:'flex',flex:1, paddingTop:PADDING, backgroundColor:'transparent', borderColor:'transparent'}}/>);
    for(let i=0;i<controlState.total-1; i+=1){
      playItems.push(<Button variant="light" key={i+1} onClick={()=>{
        setControlState((control)=>({
          ...control,
          stage: i+1
        }));
      }} onTouchStart={()=>{
        setControlState((control)=>({
          ...control,
          stage: i+1
        }));
      }} style={{display:'flex',flex:2, paddingTop:PADDING, backgroundColor:'transparent', borderColor:'transparent'}}/>);
    };
    playItems.push(<Button variant="light" key={controlState.total} onClick={()=>{
      setControlState((control)=>({
        ...control,
        stage: control.total
      }));
    }} onTouchStart={()=>{
      setControlState((control)=>({
        ...control,
        stage: control.total
      }));
    }} style={{display:'flex',flex:1, paddingTop:PADDING, backgroundColor:'transparent', borderColor:'transparent'}}/>);
    
    return (
      <div style={{display: 'flex', flexDirection:'column', width:'100%', height:'100%', justifyContent:'space-between'}}>
        <div style={{display:'flex',  flexDirection: 'row', justifyContent: 'space-around', margin: 50}}>
            <Button variant="primary" color="primary" onClick={centerView} onTouchStart={centerView} style={{display:'flex', margin: 2}}>Center View</Button>
            <Button variant="primary" color="primary" onClick={rightView} onTouchStart={rightView} style={{display:'flex', margin: 2}}>Right View</Button>
            <Button variant="primary" color="primary" onClick={leftView} onTouchStart={leftView} style={{display:'flex', margin: 2}}>Left View</Button>
            <Button variant="primary" color="primary" onClick={upperView} onTouchStart={upperView} style={{display:'flex', margin: 2}}>Upper Jaw</Button>
            <Button variant="primary" color="primary" onClick={lowerView} onTouchStart={lowerView} style={{display:'flex', margin: 2}}>Lower Jaw</Button>
        </div>
        <div style={{display:'flex', width:'100%', justifyContent:'center', alignItems:'center', marginBottom:'20px'}}>
        {controlState.total >0 &&
        <div style={{ display:'flex', flex:1, flexDirection:'column', margin: 50}}>
        <div style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
          {!playing &&
          <Button variant="light" onClick={onPlay} onTouchStart={onPlay} style={{marginRight:10}}>
            <MdPlayCircleFilled size="30px" color='primary'/>
          </Button>}
          {playing &&
          <Button variant="light" onClick={onPause} onTouchStart={onPause} style={{marginRight:10}}>
            <MdPauseCircleFilled size="30px" color='primary'/>
            </Button>}
          <div onClick={onPause} onTouchStart={onPause} style={{display:'flex', flex:1, flexDirection:'column', width:'200px', maxWidth:500}}>
            <div style={{display:'flex', flex:1, marginTop:22}}>
              <ProgressBar color='primary' now={controlState.stage*100/controlState.total} style={{display:'flex', flex:1}}/>
            </div>
            <div style={{display:'flex', position:'relative' ,top:-18, right:0, left:0}}>
                {playItems}
            </div>
          </div>
          </div>
          <h6>{`${controlState.stage+1}/${controlState.total+1}`}</h6>
          
        </div>}
        </div>
        </div>
    );
}
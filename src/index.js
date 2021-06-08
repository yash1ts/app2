import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PerspectiveCamera } from 'three';
import 'bootstrap/dist/css/bootstrap.min.css';

const camera = new PerspectiveCamera(undefined, 
  window.innerWidth/window.innerHeight);
const controls = new OrbitControls(camera, document.getElementById('root'));
camera.position.set(0,0,140);
controls.enabled = false;
// controls.enablePan = false;
const onWindowResize = ()=>{

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

}
window.addEventListener( 'resize', onWindowResize, false );

ReactDOM.render(
  <React.StrictMode>
    <App camera={camera} controls={controls}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

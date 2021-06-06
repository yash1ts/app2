
import React, { useState, createContext } from "react";
 
// Create Context Object
export const LoadingContext = createContext();
 
// Create a provider for components to consume and subscribe to changes
export const LoadingContextProvider = props => {
  const [loadingState, setLoadingState] = useState({});
 
  return (
	<LoadingContext.Provider value={[loadingState, setLoadingState]}>
  	{props.children}
	</LoadingContext.Provider>
  );
};
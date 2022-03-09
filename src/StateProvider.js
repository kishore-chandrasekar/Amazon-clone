import React,{createContext,useContext,useReducer} from "react";
//Prepares the data layer
export const StateContext = createContext();
//Wrap our app and provoide the data layer
export const Stateprovider=({reducer,initialState,children})=>(<StateContext.Provider value={useReducer(reducer,initialState)}>{children}</StateContext.Provider>)
//Pull the information from the data layer
export const useStatevalue=()=>useContext(StateContext)
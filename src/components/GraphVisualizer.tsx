"use client"
import "./GraphVisualizer.css"
import React, { ReactElement, useCallback, useContext } from "react";
import { IThemeContextType, ThemeContext } from "../context/ThemeContext";
import { useEffect, useState, useRef } from "react";
import { NodeModel } from "../models/NodeModel";
import { EdgeModel } from "../models/EdgeModel";
// @ts-ignore
import { Canvas, CanvasRef, CanvasPosition, Node } from "reaflow";

interface IVisualizerSettings {
  direction: string | null;
 }
 

interface IGraphVisualizerProps {
  codeText: string;
  newNodes: NodeModel[];
  newEdges: EdgeModel[];
  getVisualizerRef(value: any | null): void;
  visualizerSettings : IVisualizerSettings;
}

const darkThemeNode: any = {
  fontFamily: 'monospace',
  fontweight:800,
  fontSize: "1.6rem",
  backgroundColor: "#1b1f2b",

  color: "#0096FF",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  width: "100%",

};
const lightThemeNode = {
  fontFamily: 'monospace',
  fontweight:800,
  fontSize: "1.6rem",
  
  backgroundColor: "#f8f8f8",
  color: "#0081de",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  width: "100%",
};

const GraphVisualizer = ({
  codeText,
  newNodes,
  newEdges,
  getVisualizerRef,
  visualizerSettings
}: IGraphVisualizerProps): ReactElement => {
  const themeContext = useContext<IThemeContextType>(ThemeContext);
  const ref = useRef<CanvasRef | null>(null);

  getVisualizerRef(ref);


const TIME_MS = 10000;
useEffect(() => {
  const interval = setInterval(() => {
    ref.current?.fitCanvas();
    // ref.current?.positionCanvas(CanvasPosition.CENTER);
  }, TIME_MS);

  //TODO
  return () => clearInterval(interval);
}, [])


  function getCustomNode(event: any,
     props: { [x: string]: any; }) {
    return <foreignObject
      height={event.height}
      width={event.width}
      x={0}
      y={0}
      style={themeContext.themeMode === "dark"
         ? {position: "absolute", left: 0, top: 0 ,backgroundColor: "#000000"}
         : {position: "absolute", left: 0, top: 0 ,backgroundColor: "#fbfbfb"}}
    >
      <div
        style={themeContext.themeMode === "dark"
        ? darkThemeNode
        : lightThemeNode}
      >
        <div style={{ whiteSpace: "pre" }}>
          {props.properties.text}
        </div>
      </div>
    </foreignObject>;
  }
  
  function setEnteredNode(event:any,node: any) {
    console.log("node selected ",node.id);
  }

  return (
    <>
      <div id="visualizer" className=" h-full w-auto p-1">
        <Canvas
          className={themeContext.themeMode === "dark"
          ? "dark-canvas-style"
          : "light-canvas-style"}
          ref={ref}
          nodes={newNodes}
          edges={newEdges}
          fit={true}
          pannable={false}
          zoomable={true}
          animated={true}
          defaultPosition={CanvasPosition.CENTER}
          direction={visualizerSettings.direction}
          maxZoom={0.2}
          minZoom={-0.8}
          node={({ ...props }) => {
  
            return (
              <Node onClick={ (event:any, node:any) => setEnteredNode(event,node)}  label={<div />} {...props}>
                {(event: any) => (
                  getCustomNode(event, props)
                )}
              </Node>
            );
          }}
        />
      </div>
    </>
  );
};

export default GraphVisualizer;


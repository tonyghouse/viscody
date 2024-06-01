"use client"
import { ReactElement, useContext, useEffect } from "react";
import { DataTypeContext, IDataTypeContextType } from "../context/DataTypeContext";
import { EdgeModel } from "../models/EdgeModel";
import { NodeModel } from "../models/NodeModel";
import CsvVisualizer from "./CsvVisualizer";
import GraphVisualizer from "./GraphVisualizer";

import ErrorBoundary from "./ErrorBoundary";
import ErrorPage from "./ErrorPage";

interface IVisualizerSettings {
  direction: string | null;
 }
 

interface IVisualizerProps{
  codeText: string;
  newNodes: NodeModel[];
  newEdges: EdgeModel[];
  getVisualizerRef(value: any|null): void;
  visualizerSettings : IVisualizerSettings;
}

const Visualizer = ({ codeText, newNodes, newEdges,getVisualizerRef ,visualizerSettings }: IVisualizerProps): ReactElement => {



  const dataTypeContext = useContext<IDataTypeContextType>(DataTypeContext);

 
  if (dataTypeContext.dataType === "csv") {
    return <CsvVisualizer codeText={codeText} />;
  }

  return (<>
    <ErrorBoundary fallback={<ErrorPage/>}>
    <GraphVisualizer
      codeText={codeText}
      newNodes={newNodes}
      newEdges={newEdges}
      getVisualizerRef={getVisualizerRef}
      visualizerSettings={visualizerSettings}
    />
    </ErrorBoundary>
    </>);
}

export default Visualizer;

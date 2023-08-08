import React from "react";
import "./HomeSection.css";
import { useResizeObserver } from "@react-hookz/web";
import { ReactElement, useContext, useEffect, useRef, useState } from "react";
import SplitPane, { SplitPaneProps } from "react-split-pane";

import { IThemeContextType, ThemeContext } from "../context/ThemeContext";
import {
  DataTypeContext,
  IDataTypeContextType,
} from "../context/DataTypeContext";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

// import { getNodesAndEdges } from "../helper/NodesAndEdgesMaker";
import { EdgeModel } from "../models/EdgeModel";
import { NodeModel } from "../models/NodeModel";
import DataEditor from "./DataEditor";
import Visualizer from "./Visualizer";
import { getNodesAndEdges } from "../helper/NodesAndEdgesMaker";

interface IVisualizerSettings {
  direction: string | null;
}

interface IHomeSectionProps {
  codeText: string;
  setCodeText(value: any | null): void;
  getVisualizerRef(value: any | null): void;
  captureDataEditorRef(value: any | null): void;
  visualizerSettings: IVisualizerSettings;
}

const HomeSection = ({
  codeText,
  setCodeText,
  getVisualizerRef,
  captureDataEditorRef,
  visualizerSettings,
}: IHomeSectionProps): ReactElement => {
  const dataTypeContext = useContext<IDataTypeContextType>(DataTypeContext);
  const themeContext = useContext<IThemeContextType>(ThemeContext);

  const containerRef = useRef(null);
  const [mobileView, setMobileView] = useState<boolean>(false);
  const [mobileMenuOption, setMobileMenuOption] = useState<string>("editor");

  const [newNodes, setNewNodes] = useState<NodeModel[]>([]);
  const [newEdges, setNewEdges] = useState<EdgeModel[]>([]);

  function handleEditorChange(value: string): void {
    setCodeText(value);
  }

  useEffect(() => {
    const [newUpdatedNodes, newUpdatedEdges] = getNodesAndEdges(
      dataTypeContext.dataType,
      codeText
    );
    setNewNodes([...newUpdatedNodes]);
    setNewEdges([...newUpdatedEdges]);
  }, [codeText, visualizerSettings]);

  useResizeObserver(containerRef, (resizeObserver) => {
    const containerWidth = resizeObserver?.contentRect?.width;
    if (containerWidth <= 768) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  });

  // return (
  //   <>
  //     {/* <div className=""></div> */}
  //   </>
  // );

  const splitPaneProps: SplitPaneProps = {
    split: "vertical",
    minSize: 300,
    defaultSize: "30%",
    maxSize: -300,
  };

  const onMenuChange = (value:string) =>{
  console.log("\n\n\n\n value changed in mobile menu ",value)
  setMobileMenuOption(value);
  }

  if (mobileView) {
    return (
      <div
        id="container-id"
        className="relative w-[100%] h-[100vh] "
        ref={containerRef}
      >
        <Menubar className={`${themeContext.themeMode === "dark" ? "border-[white] rounded-lg " : "border-[#020817] rounded-lg"} my-1 border-[0.07rem] md:border-[0.09rem] `} >
          <MenubarMenu >
            <MenubarTrigger onClick={()=>onMenuChange("editor")}>Editor</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger onClick={()=>onMenuChange("visualizer")}>Visualizer</MenubarTrigger>
          </MenubarMenu>
        </Menubar>

        <div  className={` ${themeContext.themeMode === "dark" ? "border-[white] rounded-lg " : "border-[#020817] rounded-lg"}  my-2 h-[100%] z-1 border-[0.07rem] md:border-[0.09rem]
                         `}>

         {mobileMenuOption==="visualizer" ?
             <Visualizer
             codeText={codeText}
             newNodes={newNodes}
             newEdges={newEdges}
             getVisualizerRef={getVisualizerRef}
             visualizerSettings={visualizerSettings}
           /> :

           <DataEditor
           captureDataEditorRef={captureDataEditorRef}
           handleEditorChange={handleEditorChange}
         />


         
         }
        </div>


      </div>
    );
  } else {
    return (
      <div
        id="container-id"
        className="relative my-2 flex flex-col w-full h-[100vh] "
        ref={containerRef}
      >
        <SplitPane {...splitPaneProps}>
          <div
            id="sidebar-content-id"
            className={`${themeContext.themeMode === "dark" ? "border-[white] rounded-lg " : "border-[#020817] rounded-lg"} h-[100%] border-[0.07rem] md:border-[0.09rem]  mr-2`}
          >
            <DataEditor
              captureDataEditorRef={captureDataEditorRef}
              handleEditorChange={handleEditorChange}
            />
          </div>

          <div
            id="content-id"
            className={` ${themeContext.themeMode === "dark" ? "border-[white] rounded-lg " : "border-[#020817] rounded-lg"} h-[100%] z-1 border-[0.07rem] md:border-[0.09rem] `}
          >
            <Visualizer
              codeText={codeText}
              newNodes={newNodes}
              newEdges={newEdges}
              getVisualizerRef={getVisualizerRef}
              visualizerSettings={visualizerSettings}
            />
          </div>
        </SplitPane>
      </div>
    );
  }
};

export default HomeSection;

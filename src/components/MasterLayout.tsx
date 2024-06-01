"use client"
import { useContext, useEffect, useState } from "react";
import HomeSection from "./HomeSection";
import NavBar from "./Navbar";

import { IThemeContextType, ThemeContext } from "../context/ThemeContext";
import ErrorBoundary from "./ErrorBoundary";
import ErrorPage from "./ErrorPage";


function MasterLayout() {
  const rotationValues: string[] = ["DOWN", "RIGHT", "UP", "LEFT"];

  interface IVisualizerSettings {
    direction: string;
  }

  const themeContext = useContext<IThemeContextType>(ThemeContext);
  
  const [visualizerRef, setVisualizerRef] = useState<any | null>(null);
  const [dataEditorRef, setDataEditorRef] = useState<any | null>(null);

  const [visualizerSettings, setVisualizerSettings] =
    useState<IVisualizerSettings>({ direction: "RIGHT" });
  const [codeText, setCodeText] = useState<string>("");

  const changeZoomIn = (): void => {
    if (visualizerRef) {
      visualizerRef.current?.zoomIn();
    }
  };

  const changeZoomOut = (): void => {
    if (visualizerRef) {
      visualizerRef.current?.zoomOut();
    }
  };

  const changeExpand = (): void => {
    if (visualizerRef) {
      visualizerRef.current?.fitCanvas();
    }
  };

  const changeRotation = (): void => {
    const currentDirectionIdx = rotationValues.findIndex(
      (e) => e === visualizerSettings.direction
    );
    const resultIdx =
      currentDirectionIdx >= rotationValues.length - 1
        ? 0
        : currentDirectionIdx + 1;

    if (visualizerRef) {
      const updatedVisualizerSettings: IVisualizerSettings = {
        ...visualizerSettings,
        direction: rotationValues[resultIdx],
      };
      setVisualizerSettings(updatedVisualizerSettings);
    }
  };

  const getVisualizerRef = (data: any) => {
    if (data) {
      setVisualizerRef(data);
    }
  };

  const captureDataEditorRef = (data: any) => {
    if (data) {
      setDataEditorRef(data);
    }
  };

  return (
    <>

      <ErrorBoundary fallback={<ErrorPage />}>
        <div className="mx-3 my-2">
          <NavBar
            dataEditorRef={dataEditorRef}
            changeZoomIn={changeZoomIn}
            changeZoomOut={changeZoomOut}
            changeExpand={changeExpand}
            changeRotation={changeRotation}
          />
          <HomeSection
            codeText={codeText}
            setCodeText={setCodeText}
            getVisualizerRef={getVisualizerRef}
            captureDataEditorRef={captureDataEditorRef}
            visualizerSettings={visualizerSettings}
          />
        </div>
      </ErrorBoundary>
    </>
  );
}

export default MasterLayout;

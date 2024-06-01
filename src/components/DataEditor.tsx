"use client"
import Editor from "@monaco-editor/react";
import { ReactElement, useContext, useEffect, useRef } from "react";
import { DataTypeContext, IDataTypeContextType } from "../context/DataTypeContext";
import { IThemeContextType, ThemeContext } from "../context/ThemeContext";
import { defaultDataMap } from "../util/DefaultDataUtil";

interface IDataEditorProps{
  captureDataEditorRef(value: any):void;
  handleEditorChange(value: string|undefined): void;
}

const DataEditor = ({captureDataEditorRef,handleEditorChange}: IDataEditorProps): ReactElement => {

  const monacoEditorRef = useRef<any | null>(null);
  
const editorDataTypeMap = {
    json: "json",
    yaml: "yaml",
    toml: "yaml",
    xml: "xml",
    csv: "plaintext",
  };

  const dataTypeContext = useContext<IDataTypeContextType>(DataTypeContext);
  const themeContext = useContext<IThemeContextType>(ThemeContext);


  const TIME_MS = 15000;

  const handleEditorDidMount = (editor:any, monaco:any) => {
    monacoEditorRef.current = editor;
    captureDataEditorRef(editor);
    handleEditorChange(monacoEditorRef.current?.getValue());
  }

  const formatCode = () =>{
    monacoEditorRef.current?.getAction('editor.action.formatDocument').run();
    //  monacoEditorRef.current?.trigger('anyString', 'editor.action.formatDocument');
    //  monacoEditorRef.current?.trigger('format', 'editor.action.format');
  }


// useEffect(() => {
//   const interval = setInterval(() => {
//     console.log('formatted editor code');
//     formatCode();
//   }, TIME_MS);

//   return () => clearInterval(interval);//TODO
// }, [])

  
  

  return (
    <>
      <Editor
          onMount={handleEditorDidMount}
        className="w-auto p-1"
        defaultLanguage={editorDataTypeMap[dataTypeContext.dataType]}
        theme={themeContext.themeMode === "dark" ? "vs-dark" : "vs-light"}
        defaultValue={defaultDataMap[dataTypeContext.dataType]}
        options={{
          minimap: {
            enabled: false,
          },
          matchBrackets: "always",
          wordWrap: "on",
          automaticLayout: true,
          formatOnPaste: true,
          lineNumbersMinChars:1
        }}
        onChange={handleEditorChange}
      />
    </>
  );
}

export default DataEditor;

"use client"
import { ReactElement, useContext } from "react";
import { IThemeContextType, ThemeContext } from "../context/ThemeContext";
import DataTypeDropDown from "./DataTypeDropDown";
import {LuGithub} from "react-icons/lu"
  import { RxGithubLogo,RxCorners,RxPlus,RxMinus,RxGear,RxCode,RxSun,RxMoon,RxRotateCounterClockwise} from 'react-icons/rx';
// import GlobalSettings from "./GlobalSettings";


interface NavBarProps{
  dataEditorRef: any;
  changeZoomIn(): void;
  changeZoomOut(): void;
  changeExpand(): void;
  changeRotation(): void;
}
const NavBar = ({dataEditorRef,changeZoomIn,changeZoomOut,changeExpand,changeRotation}: NavBarProps): ReactElement => {
  const themeContext = useContext<IThemeContextType>(ThemeContext);

  const toggleTheme = (): void => {
    themeContext.toggleThemeMode();
  };

  const changeSettings = (): void=>{
    console.log("settings");
  }

  return (
    <nav
      id="navbar"
      className={` ${themeContext.themeMode === "dark" ? "border-[white] rounded-lg " : "border-[#020817] rounded-lg"} 
              flex h-[1.7rem] w-full items-center justify-between pl-3
       md:pl-5 py-6 border-[0.07rem] md:border-[0.09rem] `}
    >
      <div className="flex flex-row gap-5 items-center justify-start">
        <a href="/" className="z-[100] cursor-pointer">
          <span
            className="  
        text-[0.9rem] md:text-[1.1rem] tracking-wide font-semibold "
          >
            Viscody
          </span>
        </a>
        <DataTypeDropDown dataEditorRef={dataEditorRef} />
      </div>
      <div
        className="flex
           z-[100] justify-center
         h-auto w-auto flex-row items-center "
      >
        <ul
          className=" mr-4 flex text-[0.7rem] 
           md:text-[0.9rem] flex-row " 
        >
          <li key="zoom-in" className="px-2 py-3 md:px-[0.9rem] md:py-0  ">
          <button onClick={changeZoomIn}><RxPlus/></button>
          </li>
          <li key="zoom-out" className="px-2 py-3 md:px-[0.9rem] md:py-0">
          <button onClick={changeZoomOut}><RxMinus/></button>
          </li>

          <li key="expand" className="px-2 py-3 md:px-[0.9rem] md:py-0">
            <button onClick={changeExpand}><RxCorners/></button>
          </li>

          <li key="rotate" className="px-2 py-3 md:px-[0.9rem] md:py-0">
            <button onClick={changeRotation}>< RxRotateCounterClockwise className="-rotate-90"/></button>
          </li>

          {/* <li key="apps" className="px-2 py-3 md:px-[0.9rem] md:py-0">
          <Popover placement="bottomRight" title={title} content={content} trigger="click">
            <button onClick={changeSettings}>
            <FiGrid/></button>
         </Popover>
          </li> */}

         

           {/* <li key="settings" className="px-2 py-3 md:px-[0.9rem] md:py-0">
        <Popover placement="bottomRight" title={""} content={<GlobalSettings/>} trigger="click">
            <button onClick={changeSettings}>
            <RxGear/></button>
         </Popover>
           </li> */}

          <li key="theme" className="px-2 py-3 md:px-[0.9rem] md:py-0">
            <button onClick={toggleTheme}>
             {themeContext.themeMode ==="dark" ?<RxMoon/>: <RxSun/>}
             </button>
          </li>

           <li key="github" className="px-2 py-3 md:px-[0.9rem] md:py-0">
          <a href="https://github.com/tonyghouse/viscody" target="_blank">
            <RxGithubLogo/>
          </a>
          </li>




         
        </ul>
      </div>
    </nav>
    
  );
};

export default NavBar;

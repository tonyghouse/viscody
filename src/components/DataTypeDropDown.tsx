"use client"
import { ReactElement, useContext } from "react";
import {
  DataTypeContext,
  IDataTypeContextType,
} from "../context/DataTypeContext";
import { IThemeContextType, ThemeContext } from "../context/ThemeContext";
import { DataTypeValue } from "../util/DataTypeUtil";
import { defaultDataMap } from "../util/DefaultDataUtil";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IDataTypeDropDownProps {
  dataEditorRef: any | null;
}

const DataTypeDropDown = ({
  dataEditorRef,
}: IDataTypeDropDownProps): ReactElement => {
  const dataTypeContext = useContext<IDataTypeContextType>(DataTypeContext);
  const themeContext = useContext<IThemeContextType>(ThemeContext);

  const handleChange = (value: string): void => {
    const defaultData = defaultDataMap[value as keyof typeof defaultDataMap];
    dataEditorRef?.setValue(defaultData);
    dataTypeContext.changeDataType(value as DataTypeValue);
  };

  return (
    <>
      <Select onValueChange={handleChange} defaultValue="json">
        <SelectTrigger className=" font-normal border-none text-[0.9rem] md:text-[1rem] tracking-wide  ">
          <SelectValue placeholder="json" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="json">json</SelectItem>
          <SelectItem value="yaml">yaml</SelectItem>
          <SelectItem value="toml">toml</SelectItem>
          <SelectItem value="xml">xml</SelectItem>
          <SelectItem value="csv">csv</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};
export default DataTypeDropDown;

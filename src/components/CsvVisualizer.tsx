"use client"
import { ReactElement } from "react";
// @ts-ignore
// import { CsvToHtmlTable } from "react-csv-to-table";

interface ICsvVisualizerProps {
  codeText: string;
}

const CsvVisualizer = ({ codeText }: ICsvVisualizerProps): ReactElement => {
  return (
    <>
      {/* <CsvToHtmlTable
        data={codeText}
        csvDelimiter=","
        tableClassName="table table-striped table-hover"
      /> */}
    </>
  );
};

export default CsvVisualizer;

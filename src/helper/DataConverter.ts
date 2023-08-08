import { DataTypeValue } from "../util/DataTypeUtil";
import yaml from "js-yaml";
import toml from "toml";

// import xml2js from "xml2js";

const convertJsonToJS = (str: string): string | null => {
  try {
    let parsedObj = JSON.parse(str);
    return parsedObj;
  } catch (e) {
    return null;
  }
};

const convertYamlToJS = (codeText: string): any => {
  try {
    if (typeof codeText !== "undefined" && codeText !== "") {
      const result = yaml.load(codeText);
      return result;
    } else {
      return "";
    }
  } catch (exp) {
    return "INVALID YAML";
  }
};

const convertTomlToJS = (codeText: string): any => {
  try {
    if (typeof codeText !== "undefined" && codeText !== "") {
      const result = toml.parse(codeText);
      return result;
    } else {
      return "";
    }
  } catch (exp) {
    return "INVALID TOML";
  }
};

// const convertXmlToJS = (codeText: string): any => {
//   try {
//     if (typeof codeText !== "undefined" && codeText !== "") {
//       let xmlResult = null;
//       xml2js.parseStringPromise(codeText)
//           .then(function (result: any) {
//             console.log("result of xml2JS : ",result);
//             xmlResult=result;
//         })
//         .catch();

//       console.log("xml value: ", xmlResult);
//       return xmlResult;
//     } else {
//       return "";
//     }
//   } catch (exp) {
//     return "INVALID XML";
//   }
// };

const convertToJS = (dataType: DataTypeValue, codeText: string): string => {
  let result = null;
  switch (dataType) {
    case "json":
      result = convertJsonToJS(codeText);
      break;
    case "yaml":
      result = convertYamlToJS(codeText);
      break;
    case "toml":
      result = convertTomlToJS(codeText);
      break;
    // case "xml":
    //   result = convertXmlToJS(codeText);
    //   break;
    case "csv":
      result = "CSV";
      break;
    default:
      result = "";
  }

  return result;
};

export const getElements = (dataType: DataTypeValue, codeText: string) => {
  try {
    const result = convertToJS(dataType, codeText);
    const parsedJson = JSON.stringify(result).toString();
    let parsedObject = JSON.parse(parsedJson);
    return parsedObject;
    return {};
  } catch (e) {
    console.log("error during data Object parsing: ", e);
    return {};
  }
};

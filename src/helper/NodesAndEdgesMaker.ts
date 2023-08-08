import { getMasterNodesAndEdges } from "./DataObjectHelper";
import { getElements } from "./DataConverter";
import { DataTypeValue } from "../util/DataTypeUtil";
import { NodeModel } from "../models/NodeModel";
import { EdgeModel } from "../models/EdgeModel";


export const getNodesAndEdges = (
  dataType: DataTypeValue,
  value: string
): [NodeModel[], EdgeModel[]] => {
  const emptyData: [NodeModel[], EdgeModel[]] = [[], []];
  const element: any = getElements(dataType, value);

  if (element === null) {
    return emptyData;
  }
  
  const [nodes, edges] = getMasterNodesAndEdges(element);
  console.log("manfucatured nodes: ",nodes);
  if (nodes === undefined || edges === undefined) {
    return emptyData;
  }

  const nodesWithAddlInfo: NodeModel[] = [];
  for (let node of nodes) {
    node.kvPairs = convertToKeyValuePairs(node);
    const lines = getNumberOfLines(node);
    node.width=Math.max(300, lines*108);
    node.height=Math.max(100, lines*36);
    nodesWithAddlInfo.push(node);
  }

  return [nodesWithAddlInfo, edges];
};
function getNumberOfLines(node: NodeModel):number {
  const value = node.text;
  try{
    return (value.match(/\n/g) || '').length + 1;
  } catch(err){
    console.log("error while calculating lines: ",err);
    return 0;
  }
  
}

function convertToKeyValuePairs(node: NodeModel): any[] {
  const text = node.text

  for(let kv of text){

  }
  return [];
}


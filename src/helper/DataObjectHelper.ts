import { identifyObjectDataType, ObjectDataType } from "../util/DataTypeUtil";
import { NodeModel } from "../models/NodeModel";
import { EdgeModel } from "../models/EdgeModel";

const position = { x: 0, y: 0 };
const edgeType = "smoothstep";

interface NodeAndEdge{
   node: NodeModel; 
   edge: EdgeModel|null;
}

export const getMasterNodesAndEdges = (element: any): [NodeModel[],EdgeModel[]] => {
  try{
    const elementType: ObjectDataType = identifyObjectDataType(element);
    if (elementType === "array") {
      return getNodesAndEdgesOfArray(element);
    }
  
    return getNodesAndEdgesOfObject(element);

  } catch(error: any){
    console.log("error occured while making nodes and edges",error)
    return [[],[]];
  }
};

const getNodesAndEdgesOfObject = (element: any): [NodeModel[],EdgeModel[]] => {
  let nodes:NodeModel[] = [];
  let edges:EdgeModel[] = [];

  if (Object.keys(element).length === 0) {
    return [nodes,edges];
  }

  let elementName = "root";
  let masterNodeAndEdges: NodeAndEdge[] = getNodeAndEdgeBasedOnType(element,elementName,null);
  let masterNodes = masterNodeAndEdges.map((ne) => ne.node);
  let masterEdges = masterNodeAndEdges.map((ne) => ne.edge).filter((e)=>e!==null) as EdgeModel[];

  nodes.push(...masterNodes);
  edges.push(...masterEdges);

  if (masterNodes.length === 0) {
    return [nodes, edges];
  }

  [nodes, edges] = superFunc(nodes, edges, masterNodes);

  return [nodes, edges];
};

const getNodesAndEdgesOfArray = (element: any): [NodeModel[],EdgeModel[]] => {
  let nodes: NodeModel[] = [];
  let edges: EdgeModel[] = [];
  if (element.length === 0) {
    return [nodes,edges];
  }

  let multiMasterNodes: NodeModel[] = [];
  element = element.flat();
  for (let i = 0; i < element.length; i++) {
    let elementName = `root~${i}`;
    let masterNodeAndEdges: NodeAndEdge[] = getNodeAndEdgeBasedOnType(element[i],elementName,null);
    let masterNodes = masterNodeAndEdges.map((ne) => ne.node);
    let masterEdges = masterNodeAndEdges.map((ne) => ne.edge).filter((e)=>e!==null) as EdgeModel[];

    multiMasterNodes.push(...masterNodes);
    edges.push(...masterEdges);
  }

  nodes.push(...multiMasterNodes);

  if (multiMasterNodes.length === 0) {
    return [nodes,edges];
  }

  [nodes, edges] = superFunc(nodes, edges, multiMasterNodes);

  return [nodes, edges];
};

const getNodeAndEdgeBasedOnType = (element: any, elementName: string, parentId: string|null): NodeAndEdge[] => {
  let dataType: ObjectDataType = identifyObjectDataType(element);
  if (dataType === "object") {
    let resultNodeAndEdge:NodeAndEdge = processObjectTypeNode(element,elementName,parentId);
    return [resultNodeAndEdge];
  }

  if (dataType === "array") {
    let resultNodeAndEdges: NodeAndEdge[] = processArrayTypeNode(element,elementName,parentId);
    return resultNodeAndEdges;
  }

  if (dataType === "mono") {
    let resultNodeAndEdge: NodeAndEdge = processMonoTypeNode(element, elementName, parentId);
    return [resultNodeAndEdge];
  }

  return [];
};

const generateIdOfElem = (parentId: string|null, elementName: string): string => {
  if (parentId === null) {
    return elementName;
  }
  return (Math.random() * 100).toString();
  // return `${parentId}-${elementName}`;
};

const processObjectTypeNode = (element: any, elementName: string, parentId: string|null): NodeAndEdge => {
  
  let flatElem: any = {}; //TODO
  let nestedElements: any[] = [];

  Object.entries(element).forEach((kv) => {
    let key:any = kv[0];
    let val:any = kv[1];
    let dataType: ObjectDataType = identifyObjectDataType(val);
    if (dataType === "array") {
      flatElem[key] = "<Array[" + val.length + "]>";
      let temp:any = new Object(); //TODO
      temp[key] = val;
      nestedElements.push(temp);
    } else if (dataType === "object") {
      flatElem[key] = "<Object>";
      let temp:any = new Object();
      temp[key] = val;
      nestedElements.push(temp);
    } else {
      flatElem[key] = val;
    }
  });

  let ultraNode = {} as NodeModel;
  let ultraNodeId = generateIdOfElem(parentId, elementName);
  ultraNode.id = ultraNodeId;
  ultraNode.parentId = parentId;
  ultraNode.value = flatElem;
  ultraNode.text =  convertToString(flatElem) ;
  ultraNode.nestedElements = nestedElements;


  let ultraEdge = null;
  if(parentId !== null && ultraNodeId !== null){
    ultraEdge = {} as EdgeModel;
    ultraEdge.id = `edge-${ultraNodeId}`;
    ultraEdge.from = parentId;
    ultraEdge.to = ultraNodeId;
   
  }
  

  return { node: ultraNode, edge: ultraEdge };
};

const processArrayTypeNode = (element: any , elementName: string, parentId: string|null) => {
  element = element.flat();

  let ultraNodeAndEdges: NodeAndEdge[] = [];

  for (let i = 0; i < element.length; i++) {
    let el = element[i];
    let ultraNode = {} as NodeModel;
  
    let ultraNodeId = generateIdOfElem(parentId, elementName);
    ultraNode.id = ultraNodeId;
    ultraNode.parentId = parentId;

    let key = `${elementName}-${i}`;

    let dataType: ObjectDataType = identifyObjectDataType(el);
    //no possiblity of array inside
    if (dataType === "object") {
      let temp: any = new Object();
      temp[key] = el;
      let nestedElements = [];
      nestedElements.push(temp);
      ultraNode.value = "<Object>";
      ultraNode.text =  "<Object>" ;

      ultraNode.nestedElements = nestedElements;
    } else {
      ultraNode.value = el;
      ultraNode.text = el ;
      ultraNode.nestedElements = [];
    }



    let ultraEdge = null;
    if(parentId !== null && ultraNodeId !== null){
      ultraEdge = {} as EdgeModel;
      ultraEdge.id = `edge-${ultraNodeId}`;
      ultraEdge.from = parentId;
      ultraEdge.to = ultraNodeId;
    
    }
    
    ultraNodeAndEdges.push({ node: ultraNode, edge: ultraEdge });
  }

  return ultraNodeAndEdges;
};

const processMonoTypeNode = (element: any , elementName: string, parentId: string|null): NodeAndEdge => {
  
  const ultraNodeId: string = generateIdOfElem(parentId, elementName);

  let ultraNode: NodeModel = {
    id: ultraNodeId,
    text: element ,
 
    parentId: parentId,
    value: element,
    nestedElements: []
  };

  let ultraEdge = null;
  if(parentId !== null && ultraNodeId !== null){
    ultraEdge = {} as EdgeModel;
    ultraEdge.id = `edge-${ultraNodeId}`;
    ultraEdge.from = parentId;
    ultraEdge.to = ultraNodeId;
   
  }
  
  return { node: ultraNode, edge: ultraEdge };
};

const getElementsInNextLevel = (prevNodes: NodeModel[]): number => {
  if (!prevNodes) {
    return 0;
  }

  let totalElements: number = 0;

  for (let prevNode of prevNodes) {
    let prevNodeElems: any[] = prevNode.nestedElements;
    totalElements += prevNodeElems.length;
  }

  return totalElements;
};

const superFunc = (nodes: NodeModel[], edges: EdgeModel[], prevNodes: NodeModel[]):[NodeModel[], EdgeModel[]] => {
  let elemententsInNextLevel: number = getElementsInNextLevel(prevNodes);
  if (elemententsInNextLevel === 0) {
    return [nodes, edges];
  }

  let [newNodes, newEdges]:[NodeModel[],EdgeModel[]] = getNewNodesAndEdges(prevNodes);
  nodes.push(...newNodes);
  edges.push(...newEdges);

  //recursion
  superFunc(nodes, edges, newNodes);

  return [nodes, edges];
};

const getNewNodesAndEdges = (nodes: NodeModel[]): [NodeModel[],EdgeModel[]] => {
  let newNodes: NodeModel[] = [];
  let newEdges: EdgeModel[] = [];

  for (let node of nodes) {
    let parentId = node.id;
    for (let element of node.nestedElements) {
      let elementKey = Object.keys(element)[0];
      let elementVal = Object.values(element)[0];

      let nodeAndEdgesOfObject: NodeAndEdge[] = getNodeAndEdgeBasedOnType(elementVal,elementKey,parentId);
      let nodesOfObject = nodeAndEdgesOfObject.map((ne) => ne.node);
      let edgesOfObject = nodeAndEdgesOfObject.map((ne) => ne.edge).filter((e)=>e!==null) as EdgeModel[];

      // if (nodesOfObject !== null && nodesOfObject.length !== 0) {
      newNodes.push(...nodesOfObject);
  

      // if (edgesOfObject !== null && edgesOfObject.length !== 0) {
      newEdges.push(...edgesOfObject);
    
    }
  }

  return [newNodes, newEdges];
};

function convertToString(flatElem: any) {
  let val="";

  for (const [key, value] of Object.entries(flatElem)) {
    const keyValue = `${key}: ${value}`;
   
    const foldedLine = getFoldedString(key,value)
     val  = val.concat(foldedLine);
  }
  

 return val;
}
function getFoldedString(key: string,value:any) {
  const resultValue = typeof value === "string" ? `\"${value}\"`: value;
  const keyValue = `${key}: ${resultValue}`;

  let foldedLineStr:string = "";
  let foldedLineArr: string[] = fold(keyValue,50,[]);
  
  for(let val of foldedLineArr){
    foldedLineStr=foldedLineStr.concat(`${val}\n`);
  }
  return foldedLineStr;
}

function fold(input:string, lineSize:number, lineArray:string[]) {
  lineArray = lineArray || [];
  if (input.length <= lineSize) {
      lineArray.push(input);
      return lineArray;
  }
  lineArray.push(input.substring(0, lineSize));
  var tail = input.substring(lineSize);
  return fold(tail, lineSize, lineArray);
}


export interface NodeModel{
    id: string;
    
    
    text:any;
    height?:number;
    width?:number;
    
    parentId: string|null;
    value:any;
    nestedElements:any[]

    kvPairs?:any[];
}
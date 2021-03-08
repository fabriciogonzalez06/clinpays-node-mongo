
export interface IResponse{
    data:any;
    hasError:boolean;
    statusCode:number;
    errors:IErrorItem[],
    message:string;
    internalErrorMessage:string | null;
}

export interface IErrorItem{
    message:string;
    criticality:number;
}

export class Response implements IResponse {
 
    data:any;
    hasError:boolean;
    errors:IErrorItem[];
    internalErrorMessage:string | null;
    message:string;
    statusCode:number;

    constructor(error?:IResponse){
        this.data={};
        this.hasError= error?.hasError || false;
        this.errors = error?.errors || [];
        this.internalErrorMessage= error?.internalErrorMessage || null;
        this.message= error?.message || '';
        this.statusCode= error?.statusCode || 200;
    }


    public returnCustomMessage(data:any,message:string,statusCode:number=200):IResponse{
        const res= this;
        res.data= data;
        res.statusCode=statusCode;
        res.message= message;

        return res;
    }

    public returnCustomErrorMessage(message:string,errors:IErrorItem[]=[],statusCode:number=400):IResponse{
        const e= this;
        e.errors= errors;
        e.hasError=true;
        e.message= message;
        e.statusCode= statusCode;
        return e;
    }

    public returnInternalError(message:string,statusCode:number=500):IResponse{
        const e= this;

        e.hasError=true;
        e.internalErrorMessage= message;
        e.message= 'an internal error ocurred';
        e.statusCode= statusCode;

        return e;
    }
}
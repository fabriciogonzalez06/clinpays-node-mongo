import { Result, ValidationError } from 'express-validator';

import { IResponse, Response,IErrorItem } from "../helpers/response";



export const returnValidatorErrors = (errors: Result<ValidationError>): IResponse => {

    const res: IResponse = new Response();

    const resultErrors: ValidationError[] = errors["errors"];
    const itemsError: IErrorItem[] = [];

    resultErrors.forEach(e => {
        itemsError.push({ criticality: 400, message: `${e.param} ${e.msg}` });
    })

    res.hasError = true;
    res.statusCode = 400;
    res.message = "the required parameters were not sent";
    res.errors = itemsError;

    return res;


}

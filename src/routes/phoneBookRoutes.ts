import { Router, Response, Request } from 'express';
import { body, check, validationResult } from 'express-validator';

import { IResponse, Response as ResponseHttp } from './../helpers/response';
import PhoneBookController from './../controllers/phoneBookController';
import { ValidatorsImpl } from 'express-validator/src/chain';
import { returnValidatorErrors } from '../utils/errorsExpressValidatorCustom';


const api: Router = Router();


api.get('/', async (req: Request, res: Response) => {
    try {
        const phonebookController = new PhoneBookController();

        const result: IResponse = await phonebookController.getAll();
        res.status(result.statusCode).send(result);

    } catch (e) {
        const response: IResponse = new ResponseHttp().returnInternalError(e.message);
        res.status(response.statusCode).send(response);
    }
});

api.post('/',
    check('firstName').exists().withMessage('property is required'),
    check('lastName').exists().withMessage('property is required'),
    check('phone').exists().withMessage('property is required')
    , async (req: Request, res: Response) => {
        try {
            const phonebookController = new PhoneBookController();

            const errors = validationResult(req);
            if (errors["errors"].length > 0) {
                const resError = returnValidatorErrors(errors);
                return res.status(resError.statusCode).send(resError);
            }

            const params = req.body;

            const result: IResponse = await phonebookController.save(params);
            return res.status(result.statusCode).send(result);

        } catch (e) {
            const response: IResponse = new ResponseHttp().returnInternalError(e.message);
            return res.status(response.statusCode).send(response);
        }
    });


api.put('/:id',
    check('firstName').exists().withMessage('property is required'),
    check('lastName').exists().withMessage('property is required'),
    check('phone').exists().withMessage('property is required')
    , async (req: Request, res: Response) => {
        try {
            const phonebookController = new PhoneBookController();
            const { id } = req.params;

            const errors = validationResult(req);
            if (errors["errors"].length > 0) {
                const resError = returnValidatorErrors(errors);
                return res.status(resError.statusCode).send(resError);
            }

            const params = req.body;

            const result: IResponse = await phonebookController.put(id, params);
            return res.status(result.statusCode).send(result);

        } catch (e) {
            const response: IResponse = new ResponseHttp().returnInternalError(e.message);
            return res.status(response.statusCode).send(response);
        }
    });

api.delete('/:id', async (req: Request, res: Response) => {
    try {
        const phonebookController = new PhoneBookController();
        const { id } = req.params;

        const result: IResponse = await phonebookController.delete(id);
        res.status(result.statusCode).send(result);

    } catch (e) {
        const response: IResponse = new ResponseHttp().returnInternalError(e.message);
        res.status(response.statusCode).send(response);
    }
});


export default api;
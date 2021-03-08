import mongoose from 'mongoose';
import {  IResponse, Response } from '../helpers/response';
import { PhoneBook as PhoneBookModel } from './../models/phonebookModel';


export default class PhoneBook {


    public async getAll(): Promise<IResponse> {

        const response = new Response();

        try {

            const phoneBooks: mongoose.Document[] = await PhoneBookModel.find().sort({ 'createdAt': 'desc' });

            return response.returnCustomMessage(phoneBooks, 'successfully', 200);


        } catch (e) {
            return response.returnInternalError(e.message, 500);
        }
    }

    public async save(params: any): Promise<IResponse> {
        const response = new Response();
        try {


            const exists: mongoose.Document | null = await PhoneBookModel.findOne().where({ phone: params.phone });

            if (exists) {
                return response.returnCustomErrorMessage('phone number already exists', [], 400);
            }

            const phoneBookCreated: mongoose.Document = await PhoneBookModel.create(params);

            return response.returnCustomMessage(phoneBookCreated, 'created successfully', 200);

        } catch (e: any) {
            return response.returnInternalError(e.message, 500);
        }
    }

    public async put(id: string, params: any): Promise<IResponse> {
        const response = new Response();

        try {

            const existsDocument: mongoose.Document | any = await PhoneBookModel.findById(id);

            if (!existsDocument) {
                return response.returnCustomErrorMessage('The record to be updated was not found', [], 400);
            }

            delete params._id;
            // const phoneBook = new PhoneBookModel({ ...params });
            await PhoneBookModel.updateOne({ _id: id }, {...params});
            const updatedRecord = await PhoneBookModel.findById(id);

            return response.returnCustomMessage(updatedRecord, 'successfully', 200);

        } catch (e) {

            return response.returnInternalError(e.message, 500);
        }
    }

    public async delete(id: string) {
        const response = new Response();

        try {
            const existsDocument: mongoose.Document | any = await PhoneBookModel.findById(id);

            if (!existsDocument) {
                return response.returnCustomErrorMessage('The record to be deleted was not found', [], 400);
            }

            await PhoneBookModel.deleteOne({ _id: id });

            return response.returnCustomMessage({_id:id}, 'Deleted successfully', 200);

        } catch (e) {
            return response.returnInternalError(e.message, 500);

        }
    }

}
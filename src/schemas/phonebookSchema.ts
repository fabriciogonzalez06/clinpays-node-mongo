import { Schema } from 'mongoose';


export const  PhoneBookSchema = new Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    }
},{
    timestamps:true,
    versionKey:false
});

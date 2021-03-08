import {model} from 'mongoose';

import {PhoneBookSchema} from './../schemas/phonebookSchema';


export const PhoneBook =  model('phoneBook',PhoneBookSchema) ;


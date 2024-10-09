import { allowedTo, protectedRoute } from '../auth/auth.controller.js';
import Controller from './cases.controller.js';
import express from 'express';
import {addCase,updateCase} from './cases.validation.js';
import validation from '../../middlewares/validation.js';
import uploads from '../../services/fileUploads/uploads.js';

const caseRouter = express.Router();


//Base Route /cases
caseRouter.route('/',protectedRoute,allowedTo('admin'))
.post(uploads.uploadFields([
        {name:'before',maxCount:1},
        {name:'after',maxCount:1},
        {name:"thumbnail",maxCount:1}]),validation(addCase),Controller.addCase)
.get(Controller.getAllCases)

//Base Route /cases
caseRouter.route('/:id',protectedRoute,allowedTo('admin'))
.put(uploads.uploadFields([
    {name:'before',maxCount:1},
    {name:'after',maxCount:1},
    {name:"thumbnail",maxCount:1}
]),validation(updateCase),Controller.updateCase)
.get(Controller.singleCase)
.delete(Controller.deleteCase)

export default caseRouter;

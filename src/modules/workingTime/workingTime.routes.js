import express from "express"
import { addWorkingTime, allWorkingTime, removeFromWorkingTime } from "./workingTime.controller.js"
import { addWorkingTimeVal } from "./workingTime.validation.js"
import validation from './../../middlewares/validation.js'
import { workingTimeModel } from "../../../databases/models/workingTime.model.js"
import truncate from "./../../utils/TruncateTable.js"
import { allowedTo, protectedRoute } from "../auth/auth.controller.js"

const workingTimeRouter = express.Router()
// auth, authorize
workingTimeRouter.use(protectedRoute,allowedTo('admin'))

workingTimeRouter.route('/')
.get(allWorkingTime)
.post(validation(addWorkingTimeVal),addWorkingTime)
.delete(truncate(workingTimeModel))

workingTimeRouter.delete('/:id',removeFromWorkingTime)

export default workingTimeRouter
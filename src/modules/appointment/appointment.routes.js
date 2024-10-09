import express from "express"
import validation from "../../middlewares/validation.js"
import { protectedRoute,allowedTo} from "./../auth/auth.controller.js"
import { addAppointment, cancelAppointment } from "./appointment.controller.js"


const appointmentRouter = express.Router()
appointmentRouter.use(protectedRoute,allowedTo('admin','user'))
appointmentRouter.post('/', addAppointment)
appointmentRouter.get('/',cancelAppointment)
export default appointmentRouter
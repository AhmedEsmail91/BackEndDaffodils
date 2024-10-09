import {
    appointmentModel
} from "../../../databases/models/appointment.model.js";
import {
    workingTimeModel
} from "../../../databases/models/workingTime.model.js";
import {
    catchError
} from "../../middlewares/catchError.js";

export const addAppointment = catchError(async (req, res, next) => {
// step  check 

    const isUserHasAppointment = await appointmentModel.findOne({
        patient: req.user._id,
        selectedDate: {
            gte: new Date(),
        }
    })
    if (isUserHasAppointment) return next(new Error("You have already an appointment", 400));
    //  relate user to his record 
    req.body.patient = req.user._id;
    //
    let workingTime = await workingTimeModel.findById(req.body.examinationTime);

    if (!workingTime || Date.now() > workingTime?.startTime?.getTime()) return next(new Error("Working time not found", 404));

    if (workingTime >= 5) return next(new Error("Working time not found", 404));


    let appointment = new appointmentModel({
        ...req.body,
        examinationTime: workingTime._id
    });
    await appointment.save();

    return res.status(201).json({
        message: "success",
        data: appointment
    });
})
export const cancelAppointment = catchError(async (req, res, next) => {
    let {
        user
    } = req?.user;

});
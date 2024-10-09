import { userModel } from '../../../databases/models/user.model.js';
import { catchError } from '../../middlewares/catchError.js';
import AppError from '../../utils/AppError.js';
import { deleteOne } from '../handlers/handlers.js';
import { workingTimeModel } from './../../../databases/models/workingTime.model.js';
const calculateRepeatedDates = (from, to, repeat = 1) => {
    const startTime = new Date(from);
    const endTime = new Date(to);
    let dates = [];

    for (let week = 0; week < repeat; week++) {
        let futureStartDate = new Date(startTime);
        let futureEndDate = new Date(endTime);
        futureStartDate.setDate(startTime.getDate() + (7 * week));
        futureEndDate.setDate(endTime.getDate() + (7 * week));
        
        dates.push({
            from: futureStartDate.toString(),
            to: futureEndDate.toString()
        });
    }
    return dates;
};

export const addWorkingTime = catchError(async (req, res, next) => {
    let {from,to}=req.body;
    let isScheduleExist=await workingTimeModel.findOne({from,to});
    if(isScheduleExist) return next(new AppError("Schedule already exists", 400));
    
    const calculatedDates = calculateRepeatedDates(from, to,req.body?.repeat);
    let schedule=await workingTimeModel.insertMany(calculatedDates)
    res.json(schedule);
});

export const allWorkingTime=catchError(async(req,res,next)=>{
    const schedule = await workingTimeModel.find().populate({
        path: 'appointments',
        populate: {
            path: 'patient',
            select: 'name' // Select only the name field from the User model
        }
    });
    res.json(schedule);
});
export const updateWorkingTime=catchError(async(req,res,next)=>{
    let schedule=await workingTimeModel.findByIdAndUpdate(req.body.id,{new:true});
    if(!schedule) return next(new AppError("Schedule not found",404));
    schedule.from=req.body.from;
    schedule.to=req.body.to;
    schedule.save();
    res.json(schedule);
})
export const removeFromWorkingTime=deleteOne(workingTimeModel);


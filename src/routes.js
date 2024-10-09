import express from 'express';
import { globalError } from './middlewares/globalError.js';
import authRouter from './modules/auth/auth.routes.js';
import userRouter from './modules/user/user.routes.js';
import caseRouter from './modules/cases/cases.routes.js';
import workingTimeRouter from './modules/workingTime/workingTime.routes.js';
import appointmentRouter from './modules/appointment/appointment.routes.js';


export const bootstrap=(app)=>{
    app.use('/uploads', express.static('./uploads/'));
    app.use('/auth',authRouter)
    app.use('/users',userRouter)
    app.use('/cases',caseRouter);
    app.use('/WorkingTime',workingTimeRouter);
    app.use('/make-appointment',appointmentRouter);
    app.get('/parse-date', (req, res, next) => {
        
        res.json({time: calculateRepeatedDates('2024-10-09T15:30','2024-10-09T15:30',1) });
    });
    app.use('*',(req,res,next)=>{
        res.status(404).json({message:"Page not found (Wrong URL)"});
    })
    app.use(globalError);
}
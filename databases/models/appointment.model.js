import mongoose from "mongoose";
import {
    workingTimeModel
} from "./workingTime.model.js";
const schema = new mongoose.Schema({
    examinationTime: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WorkingTime",
        required: true
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    isAchieved: {
        type: Boolean,
        default: false
    },
    isCancelled: {
        type: Boolean,
        default: false
    },
    online: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        enum: ["consultation", "examination"],
        default: "examination",
        required: true
    },
    note: {
        type: String,
        required: false
    },
    selectedDate: {
        type: Date
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});

schema.pre("save", async function (next) {
    let count = await mongoose.models.Appointment.countDocuments({
        examinationTime: this.examinationTime
    });
    let workingTime = await workingTimeModel.findById(this.examinationTime);
    await workingTimeModel.findByIdAndUpdate(this.examinationTime, {
        appointments: [...workingTime.appointments, this._id]
    });
    if (count > 10) {
        return next(new Error(`The number of appointments for ${workingTime.day} is full`));
    }
    next();
});
schema.virtual("patientData", {
    ref: "User",
    localField: "patient",
    foreignField: "_id",
    justOne: true
});

export const appointmentModel = mongoose.model("Appointment", schema);
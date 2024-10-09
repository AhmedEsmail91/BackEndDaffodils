import caseModel from "../../../databases/models/cases.model.js";
import AppError from "../../utils/AppError.js";
import {
    catchError
} from "../../middlewares/catchError.js";


const addCase = catchError(async (req, res, next) => {

    try {
        const {
            before,
            after,
            thumbnail
        } = req.files;
        const {
            title,
            description
        } = req.body;
        if (!before || !after) {
            return next(new AppError('Both before and after images are required', 400));
        }
        const newCase = new caseModel({
            content: [{
                    filename: before[0].filename,
                    type: 'before'
                },
                {
                    filename: after[0].filename,
                    type: 'after'
                }
            ],
            thumbnail: thumbnail[0].filename,
            title,
            description
        });
        await newCase.save();
        res.json({
            message: 'Case uploaded successfully',
            newCase
        });
    } catch (error) {
        next(error);
    }
})
const updateCase = catchError(async (req, res, next) => {
    const types = ['before', 'after', 'thumbnail'];
    if (Object.keys(req.files)) {
        req.body.content = [];
        types.forEach(type => {
            if (req.files[type]) {
                if (type === 'before' || type === 'after') {
                    let filename = req.files[type][0].filename;
                    req.body.content?.push({
                        filename,
                        type
                    });
                } else req.body[type] = req.files[type][0].filename;
            }
        })
    }
    const Case = await caseModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    res.json({
        message: 'Case updated successfully',
        newCase: Case
    });

})
const singleCase = catchError(async (req, res, next) => {
    const Case = await caseModel.findById(req.params.id);
    !Case && res.status(404).json({
        message: "Case not found"
    });
    Case && res.status(200).json({
        message: "success",
        product: Case
    });
})
const getAllCases = catchError(async (req, res, next) => {
    const cases = await caseModel.find();
    !(cases.length >= 1) && res.status(404).json({
        message: "Case not found"
    });
    (cases.length >= 1) && res.status(200).json({
        message: "success",
        cases: cases
    });
})
const deleteCase = catchError(async (req, res, next) => {
    const Case = await caseModel.findByIdAndDelete(req.params.id);
    !Case && res.status(404).json({
        message: "Case not found"
    });
    Case && res.status(200).json({
        message: "Case deleted successfully"
    });
})
export default {
    addCase,
    updateCase,
    singleCase,
    getAllCases,
    deleteCase
};
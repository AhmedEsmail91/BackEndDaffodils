"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _workingTimeController = require("./workingTime.controller.js");

var _workingTimeValidation = require("./workingTime.validation.js");

var _validation = _interopRequireDefault(require("./../../middlewares/validation.js"));

var _workingTimeModel = require("../../../databases/models/workingTime.model.js");

var _TruncateTable = _interopRequireDefault(require("./../../utils/TruncateTable.js"));

var _authController = require("../auth/auth.controller.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var workingTimeRouter = _express["default"].Router(); // auth, authorize


workingTimeRouter.use(_authController.protectedRoute, (0, _authController.allowedTo)('admin'));
workingTimeRouter.route('/').get(_workingTimeController.allWorkingTime).post((0, _validation["default"])(_workingTimeValidation.addWorkingTimeVal), _workingTimeController.addWorkingTime)["delete"]((0, _TruncateTable["default"])(_workingTimeModel.workingTimeModel));
workingTimeRouter["delete"]('/:id', _workingTimeController.removeFromWorkingTime);
var _default = workingTimeRouter;
exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _validation = _interopRequireDefault(require("../../middlewares/validation.js"));

var _authController = require("./../auth/auth.controller.js");

var _appointmentController = require("./appointment.controller.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var appointmentRouter = _express["default"].Router();

appointmentRouter.use(_authController.protectedRoute, (0, _authController.allowedTo)('admin', 'user'));
appointmentRouter.post('/', _appointmentController.addAppointment);
appointmentRouter.get('/', _appointmentController.cancelAppointment);
var _default = appointmentRouter;
exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cancelAppointment = exports.addAppointment = void 0;

var _appointmentModel = require("../../../databases/models/appointment.model.js");

var _workingTimeModel = require("../../../databases/models/workingTime.model.js");

var _catchError = require("../../middlewares/catchError.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var addAppointment = (0, _catchError.catchError)(function _callee(req, res, next) {
  var isUserHasAppointment, workingTime, appointment;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_appointmentModel.appointmentModel.findOne({
            patient: req.user._id
          }));

        case 2:
          isUserHasAppointment = _context.sent;

          if (!isUserHasAppointment) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", next(new Error("You have already an appointment", 400)));

        case 5:
          req.body.patient = req.user._id;
          _context.next = 8;
          return regeneratorRuntime.awrap(_workingTimeModel.workingTimeModel.findById(req.body.examinationTime));

        case 8:
          workingTime = _context.sent;

          if (workingTime) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", next(new Error("Working time not found", 404)));

        case 11:
          Date.now() > workingTime.startTime && res.status(400).json({
            message: "Time is over"
          });
          appointment = new _appointmentModel.appointmentModel(_objectSpread({}, req.body, {
            examinationTime: workingTime._id
          }));
          _context.next = 15;
          return regeneratorRuntime.awrap(appointment.save());

        case 15:
          res.status(201).json({
            message: "success",
            appointment: appointment
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.addAppointment = addAppointment;
var cancelAppointment = (0, _catchError.catchError)(function _callee2(req, res, next) {
  var user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          user = req.user;

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.cancelAppointment = cancelAppointment;
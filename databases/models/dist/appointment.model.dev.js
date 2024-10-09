"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appointmentModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _workingTimeModel = require("./workingTime.model.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var schema = new _mongoose["default"].Schema({
  examinationTime: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "WorkingTime",
    required: true
  },
  patient: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  isAchieved: {
    type: Boolean,
    "default": false
  },
  isCancelled: {
    type: Boolean,
    "default": false
  },
  online: {
    type: Boolean,
    "default": false
  },
  type: {
    type: String,
    "enum": ["consultation", "examination"],
    "default": "examination",
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
schema.pre("save", function _callee(next) {
  var count, workingTime;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_mongoose["default"].models.Appointment.countDocuments({
            examinationTime: this.examinationTime
          }));

        case 2:
          count = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(_workingTimeModel.workingTimeModel.findById(this.examinationTime));

        case 5:
          workingTime = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(_workingTimeModel.workingTimeModel.findByIdAndUpdate(this.examinationTime, {
            appointments: [].concat(_toConsumableArray(workingTime.appointments), [this._id])
          }));

        case 8:
          if (!(count > 10)) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", next(new Error("The number of appointments for ".concat(workingTime.day, " is full"))));

        case 10:
          next();

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
});
schema.virtual("patientData", {
  ref: "User",
  localField: "patient",
  foreignField: "_id",
  justOne: true
});

var appointmentModel = _mongoose["default"].model("Appointment", schema);

exports.appointmentModel = appointmentModel;
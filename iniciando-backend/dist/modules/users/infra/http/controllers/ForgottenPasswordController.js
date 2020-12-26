"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _SendForgottenPasswordEmailService = _interopRequireDefault(require("../../../services/SendForgottenPasswordEmailService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ForgottenPasswordController {
  async create(request, response) {
    const {
      email
    } = request.body;

    const sendForgottenPasswordEmail = _tsyringe.container.resolve(_SendForgottenPasswordEmailService.default);

    await sendForgottenPasswordEmail.execute({
      email
    });
    return response.status(204).json();
  }

}

exports.default = ForgottenPasswordController;
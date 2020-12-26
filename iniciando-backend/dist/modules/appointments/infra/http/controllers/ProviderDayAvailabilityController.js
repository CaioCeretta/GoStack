"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListProviderDayAvailabilityService = _interopRequireDefault(require("../../../services/ListProviderDayAvailabilityService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProviderdayAvailabilityController {
  async index(request, response) {
    const {
      provider_id
    } = request.params;
    const {
      day,
      month,
      year
    } = request.query;

    const listProviderdayAvailabilityService = _tsyringe.container.resolve(_ListProviderDayAvailabilityService.default);

    const availability = await listProviderdayAvailabilityService.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year)
    }); // console.log(availability);

    return response.json(availability);
  }

}

exports.default = ProviderdayAvailabilityController;
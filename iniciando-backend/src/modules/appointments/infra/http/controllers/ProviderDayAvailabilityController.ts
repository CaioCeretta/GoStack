import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderdayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderdayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.query;

    const listProviderdayAvailabilityService = container.resolve(
      ListProviderdayAvailabilityService,
    );

    const availability = await listProviderdayAvailabilityService.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    // console.log(availability);

    return response.json(availability);
  }
}

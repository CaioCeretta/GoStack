import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderdayAvailability from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { provider_id } = req.params;

    const { day, month, year } = req.query;

    const listProviderdayAvailability = container.resolve(
      ListProviderdayAvailability,
    );

    const availability = await listProviderdayAvailability.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return res.send(availability);
  }
}

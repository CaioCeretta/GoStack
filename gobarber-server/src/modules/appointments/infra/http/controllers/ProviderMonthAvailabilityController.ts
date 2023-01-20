import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailability from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const { provider_id } = req.params;

    const { month, year } = req.query;

    const listProviderMonthAvailability = container.resolve(
      ListProviderMonthAvailability,
    );

    const availability = await listProviderMonthAvailability.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
    });

    return res.send(availability);
  }
}

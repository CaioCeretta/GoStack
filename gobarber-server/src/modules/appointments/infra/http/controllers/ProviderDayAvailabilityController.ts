import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderdayAvailability from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderdayAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const { provider_id } = req.params;

    const { day, month, year } = req.body;

    const listProviderdayAvailability = container.resolve(
      ListProviderdayAvailability,
    );

    const availability = await listProviderdayAvailability.execute({
      day,
      month,
      provider_id,
      year,
    });

    return res.send(availability);
  }
}

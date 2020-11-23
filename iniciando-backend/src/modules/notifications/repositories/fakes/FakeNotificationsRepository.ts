import { ObjectID } from 'mongodb';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import Notification from '../../infra/typeorm/schemas/Notification';
import ICreateNotificationDTO from '../../dtos/ICreateNotificationDTO';

class FakeNotificationsRepository implements INotificationsRepository {
  private notificaitions: Notification[] = [];

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { id: new ObjectID(), content, recipient_id });

    this.notificaitions.push(notification);

    return notification;
  }
}

export default FakeNotificationsRepository;

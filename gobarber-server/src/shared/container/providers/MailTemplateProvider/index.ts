import { container } from 'tsyringe';

import mailConfig from '@config/mail';
import IMailTemplateProvider from './models/IMailTemplateProvider';

import HandleBarsMailTemplateProvider from './implementations/HandlebarsMailTemplateProvider';

const providers = {
  handlebars: HandleBarsMailTemplateProvider,
};

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
);

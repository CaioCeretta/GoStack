import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
// Sempre que tiver algo na interface que vai receber mais de uma informação, geralmente é criado um DTO

export default interface IMailTemplateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}

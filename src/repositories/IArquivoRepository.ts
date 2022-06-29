import { Arquivo } from './../entities/Arquivo';


interface IArquivoRepository {
  create: (arquivoCreateDTO: Arquivo) => Promise<any>;
  findAll: () => Promise<any>;
  finOne: (id: number) => Promise<any>;
  delete: (id: number) => Promise<any>;
}
export { IArquivoRepository };
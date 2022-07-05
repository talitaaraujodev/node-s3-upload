import { Arquivo } from "./../entities/Arquivo";

interface IArquivoRepository {
  create: (arquivo: Arquivo[]) => Promise<any>;
  findAll: () => Promise<any>;
  findOne: (id: number) => Promise<any>;
  findName: (name: string) => Promise<any>;
  delete: (name: string) => Promise<any>;
}
export { IArquivoRepository };

import { prisma } from "../database/prisma";
import { Arquivo } from "../entities/Arquivo";
import { IArquivoRepository } from "./IArquivoRepository";

class ArquivoPrismaRepository implements IArquivoRepository {
  constructor() {}
  async create(data: Arquivo[]) {
    return await prisma.arquivos.createMany({ data });
  }
  async findAll(): Promise<any> {
    return await prisma.arquivos.findMany();
  }
  async findOne(id: number): Promise<any> {
    return await prisma.arquivos.findUnique({ where: { id } });
  }
  async findName(name: string): Promise<any> {
    return await prisma.arquivos.findUnique({ where: { name } });
  }
  async delete(name: string): Promise<any> {
    return await prisma.arquivos.delete({ where: { name } });
  }
}
export default new ArquivoPrismaRepository();

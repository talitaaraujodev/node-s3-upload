import { prisma } from "../database/prisma";
import { Arquivo } from "../entities/Arquivo";
import { IArquivoRepository } from "./IArquivoRepository";

class ArquivoPrismaRepository implements IArquivoRepository {
  constructor() {}
  async create(data: Arquivo) {
    return await prisma.arquivos.create({ data });
  }
  async findAll(): Promise<any> {
    return await prisma.arquivos.findMany();
  }
  async finOne(id: number): Promise<any> {
    return await prisma.arquivos.findUnique({ where: { id } });
  }
  async delete(id: number): Promise<any> {
    return await prisma.arquivos.delete({ where: { id } });
  }
}
export default new ArquivoPrismaRepository();

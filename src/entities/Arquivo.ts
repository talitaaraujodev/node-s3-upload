export interface Arquivo {
  id?: number;
  name: string;
  key: string;
  size: number;
  url: string;
  descricao: string;
  createdAt?: Date;
}

export class Collaborator {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private cpf: string,
    private knowledges: Array<string>,
    private phone?: string
  ) {}

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getEmail() {
    return this.email;
  }

  getCpf() {
    return this.cpf;
  }

  getKnowledges() {
    return this.knowledges;
  }

  getPhone() {
    return this.phone;
  }

  setId(id: string) {
    this.id = id;
  }

  setName(name: string) {
    this.name = name;
  }

  setEmail(email: string) {
    this.email = email;
  }

  setCpf(cpf: string) {
    this.cpf = cpf;
  }

  setKnowledges(knowledges: Array<string>) {
    this.knowledges = knowledges;
  }

  setPhone(phone: string) {
    this.phone = phone;
  }
}

export enum Knowledge {
  GIT = "Git",
  REACT = "React",
  PHP = "Php",
  NODEJS = "NodeJS",
  DEVOPS = "DevOps",
  BANCODEDADOS = "Banco de Dados",
  TYPESCRIPT = "TypeScript",
}

export interface CollaboratorInputDTO {
  name: string;
  email: string;
  cpf: string;
  phone?: string;
  knowledges: Array<Knowledge>;
}

export interface CollaboratorOutputDTO {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone?: string;
}
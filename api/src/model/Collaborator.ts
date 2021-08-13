export class Collaborator {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private cpf: string,
    private knowledge_1: Knowledge,
    private knowledge_2: Knowledge,
    private knowledge_3: Knowledge,
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

  getKnowledge_1() {
    return this.knowledge_1;
  }

  getKnowledge_2() {
    return this.knowledge_2;
  }

  getKnowledge_3() {
    return this.knowledge_3;
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

  setKnowledge1(knowledge_1: Knowledge) {
    this.knowledge_1 = knowledge_1;
  }

  setKnowledge2(knowledge_2: Knowledge) {
    this.knowledge_2 = knowledge_2;
  }

  setKnowledge3(knowledge_3: Knowledge) {
    this.knowledge_3 = knowledge_3;
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

export const stringToKnowledge = (input: string): Knowledge => {
  switch (input) {
    case "Git":
      return Knowledge.GIT;
    case "React":
      return Knowledge.REACT;
    case "Php":
      return Knowledge.PHP;
    case "NodeJS":
      return Knowledge.NODEJS;
    case "DevOps":
      return Knowledge.DEVOPS;
    case "Banco de Dados":
      return Knowledge.BANCODEDADOS;
    case "TypeScript":
      return Knowledge.TYPESCRIPT;
    default:
      throw new Error("Invalid knowledge");
  }
};

export interface CollaboratorInputDTO {
  name: string;
  email: string;
  cpf: string;
  phone?: string;
  knowledge_1: Knowledge;
  knowledge_2: Knowledge;
  knowledge_3: Knowledge;
}

export interface CollaboratorOutputDTO {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone?: string;
}

export interface KnowledgesOutputDTO {
  first: Knowledge;
  second: Knowledge;
  third: Knowledge;
}

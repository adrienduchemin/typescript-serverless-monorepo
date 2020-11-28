import { ICreateTodo } from "../../../../../../shared/types/lib";

export const handle = async (createTodo: ICreateTodo): Promise<void> => {
  await sayHello(createTodo.name);
};

const sayHello = async (name: string): Promise<string> => {
  return `hello ${name}`;
};

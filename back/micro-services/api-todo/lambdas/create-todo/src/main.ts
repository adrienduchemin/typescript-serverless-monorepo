import { ICreateTodo } from '../../../../../../shared/types/lib'

export const handle = async (createTodo: ICreateTodo): Promise<string> => {
  return sayHello(createTodo.name)
}

const sayHello = async (name: string): Promise<string> => {
  return Promise.resolve(`hello ${name}`)
}

export const createUserData = (baseUser) => {

  const uniqueId = crypto.randomUUID().split('-')[0]

  return {
    nome: baseUser.nome,
    email: `${baseUser.emailPrefix}.${uniqueId}@teste.com`,
    password: baseUser.password,
    administrador: baseUser.administrador
  }
}
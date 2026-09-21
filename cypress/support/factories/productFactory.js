export const createProductData = (baseProduct) => {

  const uniqueId = crypto.randomUUID().split('-')[0]

  return {
    nome: `${baseProduct.nome} ${uniqueId}`,
    preco: baseProduct.preco,
    descricao: baseProduct.descricao,
    quantidade: baseProduct.quantidade
  }
}
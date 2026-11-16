export const formatarQuantidade = (quantidade) => {
  const arredondada = Math.round(quantidade * 10) / 10;
  return String(arredondada).replace('.', ',');
};

export const formatarTempo = (totalSegundos) => {
  const minutos = Math.floor(totalSegundos / 60);
  const segundos = totalSegundos % 60;
  return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
};

export const descreverIngrediente = ({ nome, quantidade, unidade }, fator = 1) => {
  if (quantidade === null) {
    return nome;
  }
  const valor = formatarQuantidade(quantidade * fator);
  return unidade ? `${valor} ${unidade} de ${nome}` : `${valor} ${nome}`;
};

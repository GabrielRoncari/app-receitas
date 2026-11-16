import receitas from '../data/receitas';

const ATRASO_MS = 800;

export const CATEGORIAS = ['Doces', 'Salgados', 'Bebidas'];

export const buscarReceitas = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(receitas), ATRASO_MS);
  });

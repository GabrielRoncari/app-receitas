# Caderno de Receitas

## Descrição
Aplicativo de receitas feito com React Native e Expo. Dá para buscar receitas pelo nome, filtrar por categoria, abrir os detalhes, ajustar o número de porções (as quantidades dos ingredientes são recalculadas), marcar os passos do preparo já feitos e usar um temporizador. Também é possível cadastrar uma receita nova, que aparece no topo da lista.

## Aluno
NOME_DO_ALUNO, RGM RGM_DO_ALUNO.

## Telas
- **Home** (`screens/Home.js`): lista as receitas com indicador de carregamento, campo de busca, filtro por categoria, contador de resultados e aviso de lista vazia. Tocar em uma receita abre os detalhes, e o botão "+ Nova receita" abre o formulário.
- **Detalhes** (`screens/Detalhes.js`): mostra a receita recebida por parâmetro, com o título do cabeçalho igual ao nome da receita. Tem o controle de porções (− / +), a lista de ingredientes recalculada, os passos do preparo (toque para marcar como feito) e o temporizador.
- **Formulario** (`screens/Formulario.js`): cadastro de uma nova receita com campos controlados, escolha de categoria e dificuldade e validação com mensagem de erro. Ao salvar, volta para a Home levando a nova receita como parâmetro.

## Fonte de dados
Dados locais: array de objetos em `data/receitas.js`. O arquivo `services/receitasService.js` entrega esses dados por uma Promise com um pequeno atraso, simulando uma requisição, para que a tela inicial mostre o indicador de carregamento.

## Onde estão os requisitos
- **Componentes** (`components/`): `Botao`, `CardReceita`, `CampoTexto`, `Chip`, `Aviso`, `Secao`, `PassoPreparo` e `Temporizador`, cada um no seu arquivo.
  - Reutilizados: `CardReceita` em cada item da `FlatList` da Home; `Chip` nos filtros da Home e na categoria/dificuldade do Formulario; `Botao` na Home, Detalhes, Formulario e dentro do `Temporizador`; `CampoTexto` na busca da Home e em todos os campos do Formulario; `Secao` três vezes em Detalhes e duas no Formulario; `Aviso` na lista vazia e no erro de carregamento.
- **Props com callback**: todos os componentes recebem dados por props com desestruturação, por exemplo `function CardReceita({ receita, aoPressionar })`. Callbacks `aoPressionar` e `aoAlterar` avisam a tela pai:
  - `screens/Home.js` linha 106: `CardReceita` recebe `aoPressionar` que navega para Detalhes;
  - `screens/Home.js` linha 90: `Chip` recebe `aoPressionar` que troca a categoria;
  - `screens/Detalhes.js` linha 71: `PassoPreparo` recebe `aoPressionar` que marca/desmarca o passo;
  - `screens/Formulario.js`: `CampoTexto` recebe `aoAlterar` em cada campo.
- **useState**:
  - `screens/Home.js` linhas 15 a 19: lista de receitas, carregando, erro, texto da busca e categoria selecionada;
  - `screens/Formulario.js` linhas 36 a 41: formulário inteiro em um objeto (`form`), campos controlados (`value` + `onChangeText`) e atualização imutável com spread: `setForm({ ...form, [campo]: valor })`;
  - `screens/Detalhes.js` linhas 16 a 28: porções atuais e passos concluídos (array atualizado com spread e `filter`, sem mutação);
  - `components/Temporizador.js` linhas 9 e 10: segundos restantes e se está rodando.
- **useEffect**:
  - `screens/Home.js` linha 21: carrega as receitas ao abrir a tela (array de dependências `[]`), com cleanup que ignora a resposta se a tela for desmontada;
  - `screens/Home.js` linha 48: reage à chegada de uma nova receita por `route.params` (dependência `[novaReceita]`);
  - `components/Temporizador.js` linha 12: `setInterval` que roda enquanto `rodando` for verdadeiro, com cleanup `clearInterval` (dependência `[rodando]`);
  - `components/Temporizador.js` linha 22: para o temporizador quando chega a zero (dependência `[restante]`).
- **Navegação com parâmetros**:
  - `App.js`: `NavigationContainer` e `createNativeStackNavigator` com as 3 telas, cores do cabeçalho em `screenOptions`, título fixo na Home e no Formulario e título dinâmico em Detalhes (`options={({ route }) => ({ title: route.params.receita.nome })}`);
  - `screens/Home.js` linha 106: `navigation.navigate('Detalhes', { receita: item })`, lido em `screens/Detalhes.js` linha 12 com `route.params`;
  - `screens/Formulario.js` linha 80: `navigation.popTo('Home', { novaReceita })` devolve a receita criada, lida na Home linha 46 com `route.params?.novaReceita`.
- **Interface**: estilos com `StyleSheet.create` em todos os arquivos, cores, espaçamentos e fontes centralizados em `constants/tema.js`, `ActivityIndicator` no carregamento, aviso de lista vazia, mensagem de erro no formulário e botões com área de toque de no mínimo 48 px.

## Estrutura
```
App.js              NavigationContainer e Stack
components/         componentes reutilizáveis
screens/            Home, Detalhes e Formulario
services/           receitasService.js (busca dos dados)
data/               receitas.js (dados locais)
constants/          tema.js (cores, espaçamentos e fontes)
utils/              formatadores.js (quantidades e tempo)
demo/               demo.mp4
```

## Vídeo de demonstração
[demo/demo.mp4](demo/demo.mp4) (22 segundos)

## Como executar
```
npm install
npx expo start
```
Projeto criado com Expo SDK 54 (o mesmo usado em aula). No terminal do Expo, leia o QR code com o Expo Go ou pressione `w` para abrir no navegador.

import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Botao from '../components/Botao';
import CampoTexto from '../components/CampoTexto';
import Chip from '../components/Chip';
import Secao from '../components/Secao';
import { CATEGORIAS } from '../services/receitasService';
import { cores, espacos, fontes } from '../constants/tema';

const DIFICULDADES = ['Fácil', 'Média', 'Difícil'];

const EMOJI_POR_CATEGORIA = {
  Doces: '🍰',
  Salgados: '🥘',
  Bebidas: '🥤',
};

const FORM_INICIAL = {
  nome: '',
  categoria: 'Doces',
  dificuldade: 'Fácil',
  tempoMinutos: '',
  porcoes: '',
  ingredientes: '',
  modoDePreparo: '',
};

const separarLinhas = (texto) =>
  texto
    .split('\n')
    .map((linha) => linha.trim())
    .filter((linha) => linha !== '');

export default function Formulario({ navigation }) {
  const [form, setForm] = useState(FORM_INICIAL);
  const [erro, setErro] = useState('');

  const atualizarCampo = (campo, valor) => {
    setForm({ ...form, [campo]: valor });
  };

  const salvar = () => {
    const nome = form.nome.trim();
    const tempoMinutos = Number(form.tempoMinutos);
    const porcoes = Number(form.porcoes);
    const ingredientes = separarLinhas(form.ingredientes);
    const modoDePreparo = separarLinhas(form.modoDePreparo);

    if (nome === '') {
      setErro('Informe o nome da receita.');
      return;
    }
    if (!Number.isInteger(tempoMinutos) || tempoMinutos <= 0) {
      setErro('O tempo de preparo deve ser um número inteiro maior que zero.');
      return;
    }
    if (!Number.isInteger(porcoes) || porcoes <= 0) {
      setErro('As porções devem ser um número inteiro maior que zero.');
      return;
    }
    if (ingredientes.length === 0 || modoDePreparo.length === 0) {
      setErro('Adicione pelo menos um ingrediente e um passo do modo de preparo.');
      return;
    }

    const novaReceita = {
      id: String(Date.now()),
      nome,
      categoria: form.categoria,
      emoji: EMOJI_POR_CATEGORIA[form.categoria],
      tempoMinutos,
      porcoes,
      dificuldade: form.dificuldade,
      ingredientes: ingredientes.map((item) => ({ nome: item, quantidade: null, unidade: '' })),
      modoDePreparo,
    };

    navigation.popTo('Home', { novaReceita });
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets
      >
        <Secao titulo="Sobre a receita">
          <CampoTexto
            rotulo="Nome"
            valor={form.nome}
            aoAlterar={(texto) => atualizarCampo('nome', texto)}
            placeholder="Ex.: Bolo de fubá"
          />

          <Text style={styles.rotulo}>Categoria</Text>
          <View style={styles.opcoes}>
            {CATEGORIAS.map((opcao) => (
              <Chip
                key={opcao}
                rotulo={`${EMOJI_POR_CATEGORIA[opcao]} ${opcao}`}
                selecionado={form.categoria === opcao}
                aoPressionar={() => atualizarCampo('categoria', opcao)}
              />
            ))}
          </View>

          <Text style={styles.rotulo}>Dificuldade</Text>
          <View style={styles.opcoes}>
            {DIFICULDADES.map((opcao) => (
              <Chip
                key={opcao}
                rotulo={opcao}
                selecionado={form.dificuldade === opcao}
                aoPressionar={() => atualizarCampo('dificuldade', opcao)}
              />
            ))}
          </View>

          <View style={styles.linha}>
            <View style={styles.coluna}>
              <CampoTexto
                rotulo="Tempo (min)"
                valor={form.tempoMinutos}
                aoAlterar={(texto) => atualizarCampo('tempoMinutos', texto)}
                placeholder="30"
                numerico
              />
            </View>
            <View style={styles.coluna}>
              <CampoTexto
                rotulo="Porções"
                valor={form.porcoes}
                aoAlterar={(texto) => atualizarCampo('porcoes', texto)}
                placeholder="4"
                numerico
              />
            </View>
          </View>
        </Secao>

        <Secao titulo="Preparo">
          <CampoTexto
            rotulo="Ingredientes (um por linha)"
            valor={form.ingredientes}
            aoAlterar={(texto) => atualizarCampo('ingredientes', texto)}
            placeholder={'2 xícaras de fubá\n3 ovos'}
            multilinha
          />
          <CampoTexto
            rotulo="Modo de preparo (um passo por linha)"
            valor={form.modoDePreparo}
            aoAlterar={(texto) => atualizarCampo('modoDePreparo', texto)}
            placeholder={'Misture tudo\nAsse por 40 minutos'}
            multilinha
          />
        </Secao>

        {erro ? <Text style={styles.erro}>{erro}</Text> : null}

        <Botao titulo="Salvar receita" aoPressionar={salvar} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  conteudo: {
    padding: espacos.medio,
    paddingBottom: espacos.grande,
  },
  rotulo: {
    fontSize: fontes.pequena,
    fontWeight: 'bold',
    color: cores.texto,
    marginBottom: 6,
  },
  opcoes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: espacos.pequeno,
  },
  linha: {
    flexDirection: 'row',
    gap: espacos.pequeno + 4,
  },
  coluna: {
    flex: 1,
  },
  erro: {
    color: cores.erro,
    fontSize: fontes.normal,
    textAlign: 'center',
    marginBottom: espacos.medio,
  },
});

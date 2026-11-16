import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Botao from '../components/Botao';
import PassoPreparo from '../components/PassoPreparo';
import Secao from '../components/Secao';
import Temporizador from '../components/Temporizador';
import { cores, espacos, fontes } from '../constants/tema';
import { descreverIngrediente } from '../utils/formatadores';

export default function Detalhes({ route }) {
  const { receita } = route.params;
  const { emoji, nome, categoria, tempoMinutos, porcoes, dificuldade, ingredientes, modoDePreparo } =
    receita;

  const [porcoesAtuais, setPorcoesAtuais] = useState(porcoes);
  const [passosConcluidos, setPassosConcluidos] = useState([]);

  const fator = porcoesAtuais / porcoes;
  const textoPorcoes = porcoesAtuais === 1 ? 'porção' : 'porções';

  const alternarPasso = (indice) => {
    if (passosConcluidos.includes(indice)) {
      setPassosConcluidos(passosConcluidos.filter((item) => item !== indice));
    } else {
      setPassosConcluidos([...passosConcluidos, indice]);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.cabecalho}>
          <Text style={styles.emoji}>{emoji}</Text>
          <Text style={styles.nome}>{nome}</Text>
          <Text style={styles.info}>{`${categoria} · ${tempoMinutos} min · ${dificuldade}`}</Text>
        </View>

        <Secao titulo="Ingredientes">
          <View style={styles.porcoes}>
            <Botao
              titulo="−"
              variante="contorno"
              aoPressionar={() => setPorcoesAtuais(porcoesAtuais - 1)}
              desabilitado={porcoesAtuais === 1}
            />
            <Text style={styles.porcoesTexto}>{`${porcoesAtuais} ${textoPorcoes}`}</Text>
            <Botao
              titulo="+"
              variante="contorno"
              aoPressionar={() => setPorcoesAtuais(porcoesAtuais + 1)}
            />
          </View>
          {ingredientes.map((ingrediente, indice) => (
            <Text key={`${indice}-${ingrediente.nome}`} style={styles.ingrediente}>
              {`•  ${descreverIngrediente(ingrediente, fator)}`}
            </Text>
          ))}
        </Secao>

        <Secao titulo="Modo de preparo">
          <Text style={styles.progresso}>
            {`${passosConcluidos.length} de ${modoDePreparo.length} passos concluídos`}
          </Text>
          {modoDePreparo.map((passo, indice) => (
            <PassoPreparo
              key={`${indice}-${passo}`}
              numero={indice + 1}
              texto={passo}
              concluido={passosConcluidos.includes(indice)}
              aoPressionar={() => alternarPasso(indice)}
            />
          ))}
        </Secao>

        <Secao titulo="Temporizador">
          <Temporizador minutos={tempoMinutos} />
        </Secao>
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
  },
  cabecalho: {
    alignItems: 'center',
    marginBottom: espacos.grande,
  },
  emoji: {
    fontSize: 72,
  },
  nome: {
    fontSize: fontes.destaque,
    fontWeight: 'bold',
    color: cores.texto,
    textAlign: 'center',
    marginTop: espacos.pequeno,
  },
  info: {
    fontSize: fontes.normal,
    color: cores.textoSuave,
    marginTop: 4,
  },
  porcoes: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: espacos.medio,
  },
  porcoesTexto: {
    fontSize: fontes.titulo - 2,
    fontWeight: 'bold',
    color: cores.texto,
  },
  ingrediente: {
    fontSize: fontes.normal,
    color: cores.texto,
    lineHeight: 26,
  },
  progresso: {
    fontSize: fontes.pequena,
    color: cores.textoSuave,
    marginBottom: 4,
  },
});

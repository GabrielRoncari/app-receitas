import { Pressable, StyleSheet, Text, View } from 'react-native';
import { cores, espacos, fontes, raio } from '../constants/tema';

export default function CardReceita({ receita, aoPressionar }) {
  const { nome, emoji, categoria, tempoMinutos, porcoes } = receita;
  const textoPorcoes = porcoes === 1 ? 'porção' : 'porções';

  return (
    <Pressable
      onPress={aoPressionar}
      style={({ pressed }) => [styles.card, pressed && styles.pressionado]}
    >
      <View style={styles.emojiCaixa}>
        <Text style={styles.emoji}>{emoji}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.nome}>{nome}</Text>
        <Text style={styles.detalhe}>{`${categoria} · ${tempoMinutos} min · ${porcoes} ${textoPorcoes}`}</Text>
      </View>
      <Text style={styles.seta}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cores.superficie,
    borderRadius: raio,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: espacos.medio,
    marginBottom: espacos.pequeno + 4,
  },
  pressionado: {
    backgroundColor: cores.fundo,
  },
  emojiCaixa: {
    width: 56,
    height: 56,
    borderRadius: raio,
    backgroundColor: cores.fundo,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: espacos.medio,
  },
  emoji: {
    fontSize: 30,
  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: fontes.normal + 1,
    fontWeight: 'bold',
    color: cores.texto,
  },
  detalhe: {
    marginTop: 4,
    fontSize: fontes.pequena,
    color: cores.textoSuave,
  },
  seta: {
    fontSize: fontes.destaque,
    color: cores.primaria,
    marginLeft: espacos.pequeno,
  },
});

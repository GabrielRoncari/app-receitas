import { StyleSheet, Text, View } from 'react-native';
import { cores, espacos, fontes } from '../constants/tema';

export default function Aviso({ emoji, mensagem }) {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.mensagem}>{mensagem}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: espacos.grande,
  },
  emoji: {
    fontSize: 44,
    marginBottom: espacos.pequeno,
  },
  mensagem: {
    fontSize: fontes.normal,
    color: cores.textoSuave,
    textAlign: 'center',
    lineHeight: 22,
  },
});

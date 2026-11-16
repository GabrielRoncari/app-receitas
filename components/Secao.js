import { StyleSheet, Text, View } from 'react-native';
import { cores, espacos, fontes, raio } from '../constants/tema';

export default function Secao({ titulo, children }) {
  return (
    <View style={styles.secao}>
      <Text style={styles.titulo}>{titulo}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  secao: {
    backgroundColor: cores.superficie,
    borderRadius: raio,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: espacos.medio,
    marginBottom: espacos.medio,
  },
  titulo: {
    fontSize: fontes.titulo - 2,
    fontWeight: 'bold',
    color: cores.primariaEscura,
    marginBottom: espacos.pequeno + 4,
  },
});

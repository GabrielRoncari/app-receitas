import { Pressable, StyleSheet, Text, View } from 'react-native';
import { cores, espacos, fontes } from '../constants/tema';

export default function PassoPreparo({ numero, texto, concluido, aoPressionar }) {
  return (
    <Pressable onPress={aoPressionar} style={styles.passo}>
      <View style={[styles.numero, concluido && styles.numeroConcluido]}>
        <Text style={styles.numeroTexto}>{concluido ? '✓' : numero}</Text>
      </View>
      <Text style={[styles.texto, concluido && styles.textoConcluido]}>{texto}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  passo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: espacos.pequeno,
    minHeight: 48,
  },
  numero: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: cores.secundaria,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: espacos.medio,
  },
  numeroConcluido: {
    backgroundColor: cores.sucesso,
  },
  numeroTexto: {
    color: cores.textoClaro,
    fontWeight: 'bold',
  },
  texto: {
    flex: 1,
    fontSize: fontes.normal,
    color: cores.texto,
    lineHeight: 22,
    paddingTop: 4,
  },
  textoConcluido: {
    color: cores.textoSuave,
    textDecorationLine: 'line-through',
  },
});

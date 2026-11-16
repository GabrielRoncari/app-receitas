import { Pressable, StyleSheet, Text } from 'react-native';
import { cores, espacos, fontes } from '../constants/tema';

export default function Chip({ rotulo, selecionado = false, aoPressionar }) {
  return (
    <Pressable
      onPress={aoPressionar}
      hitSlop={6}
      style={[styles.chip, selecionado && styles.chipSelecionado]}
    >
      <Text style={[styles.texto, selecionado && styles.textoSelecionado]}>{rotulo}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    minHeight: 40,
    paddingHorizontal: espacos.medio,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: cores.borda,
    backgroundColor: cores.superficie,
    justifyContent: 'center',
    marginRight: espacos.pequeno,
    marginBottom: espacos.pequeno,
  },
  chipSelecionado: {
    backgroundColor: cores.primaria,
    borderColor: cores.primaria,
  },
  texto: {
    fontSize: fontes.pequena + 1,
    color: cores.texto,
  },
  textoSelecionado: {
    color: cores.textoClaro,
    fontWeight: 'bold',
  },
});

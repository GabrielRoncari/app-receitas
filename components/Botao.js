import { Pressable, StyleSheet, Text } from 'react-native';
import { cores, espacos, fontes, raio } from '../constants/tema';

export default function Botao({ titulo, aoPressionar, variante = 'primario', desabilitado = false }) {
  const contorno = variante === 'contorno';

  return (
    <Pressable
      onPress={aoPressionar}
      disabled={desabilitado}
      style={({ pressed }) => [
        styles.botao,
        contorno && styles.botaoContorno,
        pressed && styles.pressionado,
        desabilitado && styles.desabilitado,
      ]}
    >
      <Text style={[styles.texto, contorno && styles.textoContorno]}>{titulo}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  botao: {
    minHeight: 48,
    minWidth: 48,
    paddingHorizontal: espacos.medio,
    borderRadius: raio,
    backgroundColor: cores.primaria,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoContorno: {
    backgroundColor: cores.superficie,
    borderWidth: 2,
    borderColor: cores.primaria,
  },
  pressionado: {
    opacity: 0.75,
  },
  desabilitado: {
    opacity: 0.4,
  },
  texto: {
    color: cores.textoClaro,
    fontSize: fontes.normal,
    fontWeight: 'bold',
  },
  textoContorno: {
    color: cores.primaria,
  },
});

import { StyleSheet, Text, TextInput, View } from 'react-native';
import { cores, espacos, fontes, raio } from '../constants/tema';

export default function CampoTexto({
  rotulo,
  valor,
  aoAlterar,
  placeholder,
  multilinha = false,
  numerico = false,
}) {
  return (
    <View style={styles.container}>
      {rotulo ? <Text style={styles.rotulo}>{rotulo}</Text> : null}
      <TextInput
        style={[styles.campo, multilinha && styles.campoMultilinha]}
        value={valor}
        onChangeText={aoAlterar}
        placeholder={placeholder}
        placeholderTextColor={cores.textoSuave}
        multiline={multilinha}
        keyboardType={numerico ? 'numeric' : 'default'}
        textAlignVertical={multilinha ? 'top' : 'center'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: espacos.medio,
  },
  rotulo: {
    fontSize: fontes.pequena,
    fontWeight: 'bold',
    color: cores.texto,
    marginBottom: 6,
  },
  campo: {
    minHeight: 48,
    backgroundColor: cores.superficie,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: raio,
    paddingHorizontal: espacos.medio,
    paddingVertical: 10,
    fontSize: fontes.normal,
    color: cores.texto,
  },
  campoMultilinha: {
    minHeight: 110,
  },
});

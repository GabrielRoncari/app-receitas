import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Botao from './Botao';
import { cores, espacos, fontes } from '../constants/tema';
import { formatarTempo } from '../utils/formatadores';

export default function Temporizador({ minutos }) {
  const totalInicial = minutos * 60;
  const [restante, setRestante] = useState(totalInicial);
  const [rodando, setRodando] = useState(false);

  useEffect(() => {
    if (!rodando) {
      return;
    }
    const intervalo = setInterval(() => {
      setRestante((atual) => (atual > 0 ? atual - 1 : 0));
    }, 1000);
    return () => clearInterval(intervalo);
  }, [rodando]);

  useEffect(() => {
    if (restante === 0) {
      setRodando(false);
    }
  }, [restante]);

  const zerar = () => {
    setRodando(false);
    setRestante(totalInicial);
  };

  const terminou = restante === 0;

  return (
    <View>
      <Text style={[styles.tempo, terminou && styles.tempoFinal]}>
        {terminou ? 'Pronto! 🎉' : formatarTempo(restante)}
      </Text>
      <View style={styles.botoes}>
        <View style={styles.botao}>
          <Botao
            titulo={rodando ? 'Pausar' : 'Iniciar'}
            aoPressionar={() => setRodando(!rodando)}
            desabilitado={terminou}
          />
        </View>
        <View style={styles.botao}>
          <Botao titulo="Zerar" variante="contorno" aoPressionar={zerar} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tempo: {
    fontSize: 44,
    fontWeight: 'bold',
    color: cores.texto,
    textAlign: 'center',
    fontVariant: ['tabular-nums'],
    marginBottom: espacos.medio,
  },
  tempoFinal: {
    color: cores.sucesso,
    fontSize: fontes.destaque,
  },
  botoes: {
    flexDirection: 'row',
    gap: espacos.pequeno + 4,
  },
  botao: {
    flex: 1,
  },
});

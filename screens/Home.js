import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Aviso from '../components/Aviso';
import Botao from '../components/Botao';
import CampoTexto from '../components/CampoTexto';
import CardReceita from '../components/CardReceita';
import Chip from '../components/Chip';
import { CATEGORIAS, buscarReceitas } from '../services/receitasService';
import { cores, espacos, fontes } from '../constants/tema';

const FILTROS = ['Todas', ...CATEGORIAS];

export default function Home({ navigation, route }) {
  const [receitas, setReceitas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState('Todas');

  useEffect(() => {
    let ativo = true;

    buscarReceitas()
      .then((dados) => {
        if (ativo) {
          setReceitas(dados);
        }
      })
      .catch(() => {
        if (ativo) {
          setErro('Não foi possível carregar as receitas.');
        }
      })
      .finally(() => {
        if (ativo) {
          setCarregando(false);
        }
      });

    return () => {
      ativo = false;
    };
  }, []);

  const novaReceita = route.params?.novaReceita;

  useEffect(() => {
    if (novaReceita) {
      setReceitas((atuais) => [novaReceita, ...atuais]);
    }
  }, [novaReceita]);

  const termo = busca.trim().toLowerCase();
  const receitasFiltradas = receitas.filter((receita) => {
    const combinaCategoria = categoria === 'Todas' || receita.categoria === categoria;
    const combinaBusca = receita.nome.toLowerCase().includes(termo);
    return combinaCategoria && combinaBusca;
  });

  const total = receitasFiltradas.length;

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color={cores.primaria} />
        <Text style={styles.textoCarregando}>Carregando receitas...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.centro}>
        <Aviso emoji="⚠️" mensagem={erro} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.topo}>
        <CampoTexto valor={busca} aoAlterar={setBusca} placeholder="Buscar receita..." />
        <View style={styles.filtros}>
          {FILTROS.map((filtro) => (
            <Chip
              key={filtro}
              rotulo={filtro}
              selecionado={filtro === categoria}
              aoPressionar={() => setCategoria(filtro)}
            />
          ))}
        </View>
        <Text style={styles.contador}>
          {`${total} ${total === 1 ? 'receita encontrada' : 'receitas encontradas'}`}
        </Text>
      </View>

      <FlatList
        data={receitasFiltradas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <CardReceita
            receita={item}
            aoPressionar={() => navigation.navigate('Detalhes', { receita: item })}
          />
        )}
        ListEmptyComponent={
          <Aviso emoji="🔍" mensagem="Nenhuma receita encontrada. Tente outra busca ou categoria." />
        }
      />

      <View style={styles.rodape}>
        <Botao titulo="+ Nova receita" aoPressionar={() => navigation.navigate('Formulario')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  centro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cores.fundo,
  },
  textoCarregando: {
    marginTop: espacos.medio,
    fontSize: fontes.normal,
    color: cores.textoSuave,
  },
  topo: {
    paddingHorizontal: espacos.medio,
    paddingTop: espacos.medio,
  },
  filtros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  contador: {
    fontSize: fontes.pequena,
    color: cores.textoSuave,
    marginTop: 4,
    marginBottom: espacos.pequeno,
  },
  lista: {
    paddingHorizontal: espacos.medio,
    paddingBottom: espacos.medio,
  },
  rodape: {
    padding: espacos.medio,
    borderTopWidth: 1,
    borderTopColor: cores.borda,
    backgroundColor: cores.fundo,
  },
});

import React, {useState, useEffect} from 'react'
import ImageLogo from '../../components/ImageLogo'
import {View, FlatList} from 'react-native'
import LazyImage from '../../components/LazyImage'
import {Post, Header, Avatar, Name, Description, PostImage, Loading} from './styles'

Feed = () => {
//Essas consts são nada mais do que states, states definidos dentro de uma função utilizando os hooks, lembrando que o state só pode ser
//usado dentro de uma class, mas pra manter o perfil de funções do React foi criado esse algo chamado hooks, que permite vc criar um state
//com uma sintaxe diferente e algumas outras funções como "componentDidMount" de forma diferente também

/*FEED - é responsável por receber os dados que chegam da API, logo quando o mesmo é mudado, o component renderiza de novo
PAGE - serve para contabilizar a página que está sendo mostrada, toda vez que o user chega até o final da rolagem, é somado + 1 para mostrar a próxiuma pagina
TOTAL - responsável por armazenar o total de páginas(que é sinalizado na nossa API) e controlar, caso o page chegue num número de páginas maior do que vem na API, não é mostrado nada
LOADING - o loading guarda valores booleanos, para aparecer uma rodinha de carregando, enquanto ainda nao chegaram os dados da API, quando eles chegarem, o mesmo troca para false e some*/

const [feed, setFeed] = useState([]);
const [page, setPage] = useState(1);
const [total, setTotal] = useState(0);
const [loading, setLoading] = useState(false)
const [refreshing, setRefreshing] = useState(false)


//Essa é a função principal do component, responsável por, puxar os dados da API, e mudar os estados para que esses dados sejam mostrados em tela
//Primeiro ela recebe um parametro, que é igual ao state page, esse parametro é responsável por renderizar determianada página na URL da API, ou seja
//quando o usuário, (pois useEffect é similar ao componentDidMount)abrir a aplicação pela primeira vez ou rolar até o final da tela, essa função é chamada
  async function loadPage(pageNumber = page, shouldRefresh = false) {
    if(total && pageNumber > total) return null;


    setLoading(true) //seto o loading para true, antes de chamar os dados da API para mostrar um carregando enquanto os dados não chegam
    const response = await fetch(`http://localhost:4000/feed?_expand=author&_limit=5&_page=${pageNumber}`) //uso o método fetch, nativo do React que é repsonsável por buscar os dados na URL, então armazeno os dados dentro de uma variável, o parametro é passado, pois toda vez que a função for chamada, uma nova pagina vai ser carregada 'page = 1, page = 2'
    
    const data = await response.json() //armazeno em outra variável meus dados vindos da API, mas trago apenas o JSON, que é o que interessa
    const totalItems = response.headers.get('X-Total-Count')//Há uma numeração total de itens vindas da API, puxo eles para saber quantas páginas renderizar 
    
    setFeed(shouldRefresh? data : [...feed, ...data])//uso o setFeed toda vez que quiser mudar o state do feed, e eu armazeno tudo que tinha antes no feed + tudo o que tinha antes no data + tudo que veio novo, se não os contéudos vão se sobrepor e o ideal é um aparecer um atrás do outro.
    setPage(page + 1)//toda vez que a função for chamada ela acrescenta em 1 o numero da página, fazendo com que carregue uma nova URL
    setTotal(Math.floor(totalItems / 5)) 
    setLoading(false)
  }

  useEffect(() => {
    loadPage()    
  }, [])

  async function refreshList() {
    setRefreshing(true)

    await loadPage(1, true)

    setRefreshing(false)

    } 

    return (
      <View>
        <FlatList
          data={feed}
          keyExtractor={post => String(post.id)}
          //Função que vai ser chamada ao chegar no final do scroll da flatlist
          //Podemos chamar uma função normalmente pelo onEndReached, mas ela passa parametros para nossa função de forma padrão
          // caso nao queiramos esses parametros, então passamos uma função anonima e dps passamos nossa função sem parametros
          onEndReached={() => loadPage()}
          //O quão perto do final vc precisa chegar do final para chamar a função 0.1 = 10% pro final ele chama a função
          onEndReachedThreshold={0.1}
          onRefresh={refreshList}
          refreshing={refreshing}
          ListFooterComponent={loading && <Loading/>}
          renderItem={({item}) => (
            <Post>
              <Header>
                <Avatar source={{ uri: item.author.avatar}}/>
                <Name> {item.author.name} </Name>
              </Header>
              <PostImage ratio={item.aspectRatio} source={{uri: item.image}}/>
              <Description>
                <Name> {item.author.name} </Name> {item.description}
              </Description>
            </Post>
          )}
        />
      </View>
    )
  }

export default Feed
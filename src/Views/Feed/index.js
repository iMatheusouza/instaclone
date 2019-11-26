import React, {useState, useEffect, useCallback} from 'react'
import ImageLogo from '../../components/ImageLogo'
import {View, FlatList} from 'react-native'
import LazyImage from '../../components/LazyImage'
import {Post, Header, Avatar, Name, Description, Loading} from './styles'

Feed = () => {

const [feed, setFeed] = useState([]);
const [page, setPage] = useState(1);
const [total, setTotal] = useState(0);
const [loading, setLoading] = useState(false)
const [refreshing, setRefreshing] = useState(false)
const [viewable, setViewable] = useState([])



  async function loadPage(pageNumber = page, shouldRefresh = false) {
    if(total && pageNumber > total) return null;


    setLoading(true) 
    const response = await fetch(`http://localhost:4000/feed?_expand=author&_limit=5&_page=${pageNumber}`) 
    
    const data = await response.json() 
    const totalItems = response.headers.get('X-Total-Count')
    
    setFeed(shouldRefresh? data : [...feed, ...data])
    setPage(page + 1)
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

    const handleViewableChanged = useCallback(({ changed }) => {
      setViewable(changed.map(({ item }) => item.id))
    }, [])

    return (
      <View>
        <FlatList
          data={feed}
          keyExtractor={post => String(post.id)}
          onEndReached={() => loadPage()}
          onEndReachedThreshold={0.1}
          onRefresh={refreshList}
          refreshing={refreshing}
          viewabilityConfig={{ viewAreaCoveragePercentThreshold: 20 }}
          onViewableItemsChanged={handleViewableChanged}
          ListFooterComponent={loading && <Loading/>}
          renderItem={({item}) => (
            <Post>
              <Header>
                <Avatar source={{ uri: item.author.avatar}}/>
                <Name> {item.author.name} </Name>
              </Header>
              <LazyImage 
                shouldLoad={viewable.includes(item.id)}
                aspectRatio={item.aspectRatio}
                smallSource={{uri : item.small}} 
                source={{uri: item.image}}/>
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
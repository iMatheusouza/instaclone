import React, { PureComponent } from 'react'

import {View, Text, FlatList, Image, StyleSheet, Dimensions} from 'react-native'
import {Post, Header, Avatar, Name, PostImage, Description} from './styles'


class NewIndex extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      author: [],
      imagePost : []
    }
  }

  componentDidMount = () => {
     const loadFeed = async () => {
      const response = await fetch('http://localhost:4000/feed?_expand=author&_limit=5&_page=1')

      const data = await response.json()
      console.log('data: ', data[0].author)
      this.setState({author: data[0].author, imagePost: data[0]})
      console.log('feed', this.state.feed)
    }

    loadFeed()
  }

  render() {
    const { author, imagePost } = this.state
    return (
      <View style={styles.postContainer}>
       <View style={styles.avatarContainer}>
          <Image style={styles.avatar}source={{uri: author.avatar}}/>
          <Text>{author.name}</Text>
       </View>
        <View style={styles.postImageContainer}>
          <Image source={{uri: imagePost.image }} style={styles.postImage} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50
  },
  avatarContainer: {
    flexDirection: 'row'
  },
  postImageContainer: {
    alignItems: 'stretch'
  },
  postImage : {
    height: 500,
    width: Dimensions.get('window').width
  }
})

export default NewIndex
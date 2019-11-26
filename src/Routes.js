
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import Feed from './Views/Feed/index'
import ImageLogo from './components/ImageLogo'


const AppNavigator = createStackNavigator({
  Feed: Feed,
  },
  {
    initialRouteName: 'Feed',
    defaultNavigationOptions: {
      headerTitle: ImageLogo,
      headerStyle: {
        backgroundColor: '#f5f5f5',
      }
    }
  });

export default createAppContainer(AppNavigator)
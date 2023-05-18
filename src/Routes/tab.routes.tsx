import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { CustomTabBar } from '../component/TabBar'
import Home from '../screen/Home'
import Adicionar from '../screen/Adicionar'
import Usuario from '../screen/Usuario/'

const { Navigator, Screen } = createBottomTabNavigator()

export function TabRoutes() {
	return (
		<Navigator
			screenOptions={{
				headerShown: false,
				tabBarHideOnKeyboard: true,
				tabBarShowLabel: false,
				tabBarActiveTintColor: '#212121',

				tabBarStyle: {
					borderTopWidth: 0,
					backgroundColor: '#fff',
				},
			}}
			tabBar={(props) => <CustomTabBar {...props} />}
			initialRouteName="Adicionar">
			<Screen name="Home" component={Home} options={{ tabBarHideOnKeyboard: true, tabBarIcon: 'home' }} />
			<Screen name="Adicionar" component={Adicionar} options={{ tabBarHideOnKeyboard: true, tabBarIcon: 'add' }} />
			<Screen name="Usuario" component={Usuario} options={{ tabBarHideOnKeyboard: true, tabBarIcon: 'user' }} />
		</Navigator>
	)
}

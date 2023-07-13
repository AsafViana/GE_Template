import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { CustomTabBar } from '../component/TabBar'
import { TransitionSpecs } from '@react-navigation/stack'
import { useMemo, lazy } from 'react'

const { Navigator, Screen } = createBottomTabNavigator()

const TransitionScreen = {
	gestureDirection: 'horizontal',
	transitionSpec: {
		open: TransitionSpecs.TransitionIOSSpec,
		close: TransitionSpecs.TransitionIOSSpec,
	},
	cardStyleInterpolator: ({ current, next, layouts }) => {
		return {
			cardStyle: {
				transform: [
					{
						translateX: current.progress.interpolate({
							inputRange: [0, 1],
							outputRange: [layouts.screen.width, 0],
						}),
					},
					{
						translateX: next
							? next.progress.interpolate({
									inputRange: [0, 1],
									outputRange: [0, -layouts.screen.width],
							  })
							: 1,
					},
				],
			},
			overlayStyle: {
				opacity: current.progress.interpolate({
					inputRange: [0, 1],
					outputRange: [0, 0.5],
				}),
			},
		}
	},
}

const CardOptions = {
	cardStyle: { backgroundColor: 'transparent' },
	...TransitionScreen,
	headerShown: false,
	gestureEnabled: false,
}

const Home = lazy(() => import('../screen/Home'))
const Adicionar = lazy(() => import('../screen/Adicionar'))
const Info = lazy(() => import('../screen/Info'))
const Testes = lazy(() => import('../screen/Testes'))

export function LogadoRoutes() {
	return (
		<Navigator
			screenOptions={{
				headerShown: false,
				tabBarHideOnKeyboard: true,
				tabBarShowLabel: false,
				tabBarActiveTintColor: '#212121',
				...CardOptions,
				tabBarStyle: {
					borderTopWidth: 0,
					backgroundColor: '#fff',
				},
				lazy: true,
				unmountOnBlur: true,
			}}
			tabBar={(props) => <CustomTabBar {...props} />}
			initialRouteName="Home">
			<Screen name="Home" component={Home} options={{ tabBarHideOnKeyboard: true, tabBarIcon: 'home' }} />
			<Screen name="Adicionar" component={Adicionar} options={{ tabBarHideOnKeyboard: true, tabBarIcon: 'add' }} />
			<Screen name="Info" component={Info} options={{ tabBarHideOnKeyboard: true, tabBarIcon: 'info' }} />
			<Screen name="Testes" component={Testes} options={{ tabBarHideOnKeyboard: true, tabBarIcon: 'info' }} />
		</Navigator>
	)
}

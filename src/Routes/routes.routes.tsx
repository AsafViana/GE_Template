import { TransitionSpecs, createStackNavigator } from '@react-navigation/stack'
import { useMemo } from 'react'
import { StackRoutes } from './stack.routes'
import { LogadoRoutes } from './logado.routes'
import { DeslogadoRoutes } from './deslogado.routes'
import Testes from '../screen/Testes'
import SplashScreen from '../screen/SplashScreen'
import DetalhesItem from '../screen/DetalhesItem'
import {color} from '../../env.json'

const { Screen, Navigator } = createStackNavigator()

export function RoutesRoutes() {
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

	return (
		<Navigator initialRouteName="SplashScreen" screenOptions={CardOptions}>
			<Screen name="SplashScreen" component={SplashScreen} />
			<Screen name="Stack" component={StackRoutes} />
			<Screen name="DetalhesItem" component={DetalhesItem} />
			<Screen name="Logado" component={LogadoRoutes} />
			<Screen name="Deslogado" component={DeslogadoRoutes} />
			<Screen name="Testes" component={Testes} />
		</Navigator>
	)
}

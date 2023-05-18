import { TransitionSpecs, createStackNavigator } from '@react-navigation/stack'
import { lazy } from 'react'
import { StackRoutes } from './stack.routes'
import {LogadoRoutes} from './logado.routes'

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

	const SplashScreen = lazy(() => import('../screen/SplashScreen'))
	const DetalhesItem = lazy(() => import('../screen/DetalhesItem'))
	const Pagina404 = lazy(() => import('../screen/Pagina404'))
	const Bloqueado = lazy(() => import('../screen/Bloqueado'))

	return (
		<Navigator initialRouteName="SplashScreen" screenOptions={CardOptions}>
			<Screen name="SplashScreen" component={SplashScreen} />
			<Screen name="DetalhesItem" component={DetalhesItem} />
			<Screen name="Pagina404" component={Pagina404} />
			<Screen name="Bloqueado" component={Bloqueado} />
			<Screen name="Logado" component={LogadoRoutes} />
		</Navigator>
	)
}
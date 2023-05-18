import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { RoutesRoutes } from './routes.routes'


export function Routes() {
	return (
		<NavigationContainer>
			<RoutesRoutes />
		</NavigationContainer>
	)
}

import { createStackNavigator } from '@react-navigation/stack'
import DetalhesItem from '../screen/DetalhesItem'

const {Screen, Navigator} = createStackNavigator()

export function StackRoutes(){
    return (
        <Navigator>
            <Screen name="DetalhesItem" component={DetalhesItem} />
        </Navigator>
    )
}

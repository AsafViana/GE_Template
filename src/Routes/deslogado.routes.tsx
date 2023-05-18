import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screen/Login'
import Cadastro from '../screen/Cadastro'
import EsqueciSenha from '../screen/EsqueceuSenha'

const {Screen, Navigator} = createStackNavigator()

export function DeslogadoRoutes(){
    return (
        <Navigator initialRouteName='' screenOptions={{headerShown:false}}>
            <Screen name="Login" component={Login} />
            <Screen name='Cadastro' component={Cadastro}/>
            <Screen name='EsqueceuSenha' component={EsqueciSenha}/>
        </Navigator>
    )
}

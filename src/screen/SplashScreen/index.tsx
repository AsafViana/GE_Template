import { useNavigation } from '@react-navigation/native'
import { color, Empresa } from '../../../env.json'
import { Center, Image, Box, Text } from 'native-base'
import { auth, signInAnonymously, getDoc, doc, firestore } from '../../Service/firebaseConfig'
import React, { useEffect } from 'react'
import * as SplashScreen from 'expo-splash-screen'

export default function Splash(props) {
	const navigation = useNavigation()

	useEffect(() => {
		async function LoginAnonimo() {
			signInAnonymously(auth)
				.then(async () => {
					const dados = await getDoc(doc(firestore, 'users', Empresa))
					if (dados.exists()) {
						if (dados.data().Autorizado) {
							navigation.navigate('Logado')
							await SplashScreen.hideAsync()
						} else {
							navigation.navigate('Bloqueado')
							await SplashScreen.hideAsync()
						}
					} else {
						navigation.navigate('Pagina404')
						await SplashScreen.hideAsync()
					}
				})
				.catch((error) => {
					const errorCode = error.code
					const errorMessage = error.message
					console.error(errorMessage)
				})
		}
			LoginAnonimo()
	}, [])

	return (
		<Center flex={1} bg={color.azulEscuro}>
			<Image source={require('../../../assets/splash.png')} size={500} />
		</Center>
	)
}

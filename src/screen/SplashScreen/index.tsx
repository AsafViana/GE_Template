import { View } from 'react-native'
import { useNavigation, CommonActions } from '@react-navigation/native'
import { color } from '../../../env.json'
import { getData } from '../../Service/asyncStorage'
import { Center, Image } from 'native-base'
import { auth, signInWithEmailAndPassword } from '../../Service/firebaseConfig'
import { useEffect, useState } from 'react'

export default function index(props) {
	const navigation = useNavigation()

	useEffect(() => {
		async function checkLogin() {
			try {
				const uid = await getData('uid')
				const email = await getData('email')
				const senha = await getData('senha')

				if (uid && email && senha) {
					await signInWithEmailAndPassword(auth, email, senha)
					navigation.dispatch(
						CommonActions.reset({
							index: 1,
							routes: [{ name: 'Logado' }],
						})
					)
				} else {
					navigation.dispatch(
						CommonActions.reset({
							index: 1,
							routes: [{ name: 'Deslogado' }],
						})
					)
				}
			} catch (error) {
				console.error(error)
			}
		}

		checkLogin()
	}, [])

	return (
		<Center flex={1} bgColor={color.azulEscuro}>
			<Image source={require('../../../assets/splash.png')} size={500} />
		</Center>
	)
}

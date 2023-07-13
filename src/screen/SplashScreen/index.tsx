import { View } from 'react-native'
import { useNavigation, CommonActions } from '@react-navigation/native'
import { color, Empresa } from '../../../env.json'
import { getData } from '../../Service/asyncStorage'
import { Center, Image } from 'native-base'
import { auth, signInAnonymously, getDoc, doc, firestore } from '../../Service/firebaseConfig'
import { useEffect, useState } from 'react'
import React from 'react'

export default function index(props) {
	const navigation = useNavigation()

	useEffect(() => {
		async function LoginAnonimo() {
			signInAnonymously(auth)
				.then(async () => {
					const dados = await getDoc(doc(firestore, 'users', Empresa))
					if (dados.exists()){
						if(dados.data().Autorizado){
							navigation.navigate('Logado')
						}else{
							navigation.navigate('Bloqueado')
						}
					}else{
						//navigation.navigate('Pagina404')
						navigation.navigate('Logado')
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
		<Center flex={1} bgColor={color.azulEscuro}>
			<Image source={require('../../../assets/splash.png')} size={500} />
		</Center>
	)
}

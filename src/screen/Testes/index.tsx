import { Center, Text } from 'native-base'
import React, { useState, useEffect, useCallback } from 'react'
import { Platform } from 'react-native'
import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons'
//import {color} from '../../../env.json'
import { set, ref, database, get, child, update, remove, storage, refStorage, uploadBytes, auth } from '../../Service/firebaseConfig'
import * as ImagePicker from 'expo-image-picker'

export default function index(props) {
	const {} = props
	const [Foto, setFoto] = useState<any>('')

	const handleCarregarFoto = useCallback(async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

		if (status !== 'granted') {
			alert('Permissão negada para acessar a galeria de imagens')
			return
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: false,
			quality: 1,
		})

		if (!result.canceled) {
			const uri = result.assets[0].uri
			const response = await fetch(uri)
			const blob = await response.blob()

			setFoto(uri)

			const referencia = refStorage(storage, `img/user/estoque/`)

			uploadBytes(referencia, blob)
				.then(() => {
					console.log('Imagem enviada com sucesso!')
				})
				.catch((error) => {
					console.log('Erro ao enviar a imagem:', error)
				})
		} else {
			alert('Nenhuma imagem selecionada.')
		}
	}, [Foto])

	return (
		<Center flex={1}>
			<Text onPress={handleCarregarFoto}>index</Text>
		</Center>
	)
}

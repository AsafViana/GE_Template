import { Center, Text } from 'native-base'
import React, { useState, useEffect } from 'react'
import { Platform } from 'react-native'
import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { color } from '../../../env.json'
import { useNavigation } from '@react-navigation/native'
import { CommonActions } from '@react-navigation/native'
import { getData, storeData } from '../../Service/asyncStorage'

export default function index(props) {
	const {} = props
	const navigation = useNavigation()

	return (
		<Center flex={1}>
			<Text
				onPress={() => {
					storeData('uid', 'nada')
						.then((result) => {
							navigation.dispatch(
								CommonActions.reset({
									index: 1,
									routes: [{ name: 'Deslogado' }],
								})
							)
						})
						.catch((e) => {
							alert(e)
						})
				}}>
				Logoff
			</Text>
		</Center>
	)
}

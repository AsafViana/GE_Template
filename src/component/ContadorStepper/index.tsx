import { Input, Pressable } from 'native-base'
import React, { useState, useEffect } from 'react'
import { Platform, TextInput } from 'react-native'
import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { color } from '../../../env.json'

export default function index(props) {
	const { valor } = props
	const [Valor, setValor] = useState(valor ? valor : 0)

	function onChangeText(valor: string) {
		setValor(parseInt(valor))
	}


	return (
		<>
			<Input
				variant={'filled'}
				backgroundColor={color.azulClaro}
				borderColor={color.branco}
				borderRadius={'3xl'}
				borderWidth={'4'}
				fontSize={'3xl'}
				color={color.branco}
				textAlign={'center'}
				onChangeText={onChangeText}
				value={Valor.toString()}
                keyboardType='number-pad'
                type='text'
			/>
		</>
	)
}

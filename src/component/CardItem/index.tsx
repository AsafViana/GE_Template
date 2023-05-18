import { Center, Text, Box, VStack, Image, HStack, Pressable, Button } from 'native-base'
import React, { useState, useEffect } from 'react'
import { Platform } from 'react-native'
import { Entypo, FontAwesome5, MaterialIcons, AntDesign } from '@expo/vector-icons'
import { color } from '../../../env.json'
import { database, onValue, ref } from '../../Service/firebaseConfig'
import { getData } from '../../Service/asyncStorage'
import { useNavigation } from '@react-navigation/native'

export default function index(props) {
	const { nome, quantidade } = props
	const navigation = useNavigation()

	const handlePress = () => {
		navigation.navigate('DetalhesItem', {item: nome})
	}

	return (
		<Pressable onPress={handlePress} bgColor={color.azulClaro} my={6} py="4" px="10" rounded="3xl" width={375} maxWidth="100%">
			<HStack justifyContent="space-between" alignItems={'center'}>
				<Box justifyContent="space-between">
					<VStack space="2">
						{/* Nome */}
						<Text textTransform="uppercase" color={color.branco} fontWeight={'bold'} fontSize="xl">
							{nome}
						</Text>
					</VStack>
					<Box rounded="xs" bg={color.azulMedio} alignSelf="flex-start" mt='3' py="1" px="3">
						{/* Quantidade */}
						<Text textTransform="uppercase" fontSize="sm" fontWeight="bold" color={color.branco}>
							Peças: {quantidade}
						</Text>
					</Box>
				</Box>
				<FontAwesome5 name="box" color={color.branco} size={64} />
			</HStack>
		</Pressable>
	)
}

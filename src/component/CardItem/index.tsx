import { Center, Text, Box, VStack, Image, HStack, Pressable } from 'native-base'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import { color } from '../../../env.json'
import { useNavigation } from '@react-navigation/native'
import { quebrarLinha } from '../../Service/tools'

export default function index(props) {
	const { nome, quantidade, urlFoto } = props
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
							{quebrarLinha(nome, 13)}
						</Text>
					</VStack>
					<Box rounded="xs" bg={color.azulMedio} alignSelf="flex-start" mt="3" py="1" px="3">
						{/* Quantidade */}
						<Text textTransform="uppercase" fontSize="sm" fontWeight="bold" color={color.branco}>
							Peças: {quantidade}
						</Text>
					</Box>
				</Box>
				{urlFoto ? (
					<Center size={'lg'} bgColor={color.cinza} rounded={'full'}>
						<Image
							source={{
								uri: urlFoto,
							}}
							alt={nome}
							size={'full'}
							borderRadius={100}
						/>
					</Center>
				) : (
					<FontAwesome5 name="box" color={color.branco} size={64} />
				)}
			</HStack>
		</Pressable>
	)
}

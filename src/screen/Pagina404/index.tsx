import { Center, Text, StatusBar, Button, VStack } from 'native-base'
import React, { useState, useEffect, useCallback } from 'react'
import { color, Empresa } from '../../../env.json'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import * as Linking from 'expo-linking'
import LottieView from 'lottie-react-native'


SplashScreen.preventAutoHideAsync()

export default function index(props) {
	const {} = props
	const recipientEmail = 'zaftech.suporte@gmail.com'
	const subject = 'GE_Empresarial 404: ' + Empresa
	const body = 'Recebi o erro de que não possuo cadastro.'
	const [fontsLoaded] = useFonts({
		Lemon_Bold: require('../../assets/LEMONMILK-Bold.otf'),
		Lemon_Light: require('../../assets/LEMONMILK-Light.otf'),
	})

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync()
		}
	}, [fontsLoaded])

	const handleEmailPress = () => {
		const url = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
		Linking.openURL(url)
	}

	if (!fontsLoaded) {
		return null
	}

	return (
		<Center backgroundColor={color.azulEscuro} flex={1} onLayout={onLayoutRootView}>
			<StatusBar backgroundColor={color.azulEscuro} />

			<VStack space={0} backgroundColor={color.azulMedio} w={350} h={600} px={5} justifyContent={'center'} alignItems={'center'} rounded={'3xl'}>
				<LottieView
					source={require('../../Animations/error-404.json')}
					autoPlay={true}
					loop={true}
					style={{ width: 400, height: 400, alignSelf: 'center', marginLeft: 10 }}
					resizeMode="cover"
				/>
				<Text fontSize={15} fontFamily={'Lemon_Bold'} color={color.corMaisClara}>
					Clique no botão abaixo para entrar em contato
				</Text>
				<Button onPress={handleEmailPress} background={color.azulEscuro} mt={'10'} rounded={'3xl'} w={'64'} h={'16'}>
					<Text fontSize={'xl'} fontFamily={'Lemon_Light'} color={color.branco}>
						Clique aqui!!!
					</Text>
				</Button>
			</VStack>
		</Center>
	)
}

import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'
import { LogBox } from 'react-native'
import { Routes } from './src/Routes'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import env from './env.json'
import { enableScreens } from 'react-native-screens'
import React from 'react'
import * as SplashScreen from 'expo-splash-screen'

enableScreens()

export default function App() {
	const { color } = env
	LogBox.ignoreAllLogs()
	SplashScreen.preventAutoHideAsync()

	return (
		<SafeAreaProvider style={{ flex: 1, backgroundColor: color.azulEscuro }}>
			<SafeAreaView style={{ flex: 1 }}>
					<NativeBaseProvider>
						<Routes />
						<StatusBar style="light" />
					</NativeBaseProvider>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}

import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'
import { LogBox } from 'react-native'
import { Routes } from './src/Routes'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import env from './env.json'
import { storeData } from './src/Service/asyncStorage'
import { enableScreens } from 'react-native-screens'

enableScreens()

export default function App() {
	const { color } = env
	LogBox.ignoreAllLogs()

	return (
		<SafeAreaProvider style={{ backgroundColor: color.azulEscuro }}>
			<SafeAreaView style={{ flex: 1 }}>
				<NativeBaseProvider>
					<Routes />
					<StatusBar style="light" />
				</NativeBaseProvider>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}

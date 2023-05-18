import React, { useRef } from 'react'
import { View, ScrollView, StyleSheet, Text } from 'react-native'

const App = () => {
	const scrollViewRef = useRef(null)

	return (
		<View style={styles.container}>
			<ScrollView
				ref={scrollViewRef}
				contentContainerStyle={styles.scrollContent}
				
				scrollEventThrottle={16}>
				{/* Conteúdo da ScrollView */}
				<View style={styles.content}>
					<Text style={styles.text}>Conteúdo da ScrollView</Text>
				</View>
			</ScrollView>

			{/* Componente fixo */}
			<View style={styles.fixedComponent}>
				<Text style={styles.text}>Componente Fixo</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollContent: {
		flexGrow: 1,
	},
	content: {
		height: 1000, // Altura do conteúdo da ScrollView para simular rolagem
	},
	fixedComponent: {
		position: 'absolute',
		top: 20, // Posição Y do componente fixo
		left: 0,
		right: 0,
		height: 50,
		backgroundColor: 'red',
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
	},
})

export default App

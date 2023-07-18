import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native'

const App: React.FC = () => {
	const [data, setData] = useState([
		{ id: '1', nome: 'Item 1', selecionado: false },
		{ id: '2', nome: 'Item 2', selecionado: false },
		{ id: '3', nome: 'Item 3', selecionado: false },
		// Adicione mais itens à lista conforme necessário
	])

	const handlePressItem = (id: string) => {
		const newData = data.map((item) => (item.id === id ? { ...item, selecionado: !item.selecionado } : item))
		setData(newData)
	}

	const handleLongPressItem = (id: string) => {
		const selecionados = data.filter((item) => item.selecionado).map((item) => item.id)
		if (selecionados.includes(id)) {
			// Se o item já está selecionado, deseleciona-o
			const newData = data.map((item) => (item.id === id ? { ...item, selecionado: false } : item))
			setData(newData)
		} else {
			// Se o item não está selecionado, seleciona-o
			const newData = data.map((item) => (item.id === id ? { ...item, selecionado: true } : item))
			setData(newData)
		}
	}

	const handleExcluirSelecionados = () => {
		const selecionados = data.filter((item) => item.selecionado)
		if (selecionados.length > 0) {
			const nomesSelecionados = selecionados.map((item) => item.nome).join(', ')
			Alert.alert('Itens selecionados', nomesSelecionados)
		}
	}

	return (
		<View style={styles.container}>
			{data.some((item) => item.selecionado) && (
				<View style={styles.menuSuperior}>
					<Text>Itens selecionados:</Text>
					{data
						.filter((item) => item.selecionado)
						.map((item) => (
							<Text key={item.id}>{item.nome}</Text>
						))}
					<TouchableOpacity onPress={handleExcluirSelecionados} style={styles.botaoExcluir}>
						<Text>Excluir selecionados</Text>
					</TouchableOpacity>
				</View>
			)}
			<FlatList
				data={data}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<TouchableOpacity onPress={() => handlePressItem(item.id)} onLongPress={() => handleLongPressItem(item.id)} style={[styles.item, { backgroundColor: item.selecionado ? '#cceeff' : '#ffffff' }]}>
						<Text>{item.nome}</Text>
					</TouchableOpacity>
				)}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: '#f0f0f0',
	},
	item: {
		padding: 16,
		marginBottom: 8,
		borderRadius: 8,
	},
	menuSuperior: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 16,
		backgroundColor: '#ffffff',
		elevation: 5, // Adicione esta propriedade para adicionar sombra
	},
	botaoExcluir: {
		backgroundColor: '#ffcccc',
		padding: 8,
		borderRadius: 8,
	},
})

export default App

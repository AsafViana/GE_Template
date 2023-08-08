import { Center, Text, Select, FlatList, CheckIcon } from 'native-base'
import React, { useState, useCallback, useEffect } from 'react'
import { color, Empresa } from '../../../env.json'
import CardItem from '../../component/CardItem'
import { database, ref, get, child, onValue } from '../../Service/firebaseConfig'
import { RefreshControl } from 'react-native'
import { StatusBar } from 'expo-status-bar'

interface Resumo {
	nome: string
	quantidade: number
	foto: string
}

export default function index(props) {
	const {} = props
	const [Categoria, setCategoria] = useState('Todos')
	const [TemDados, setTemDados] = useState(false)
	const [Estoque, setEstoque] = useState<Array<Resumo>>()
	const [isRefreshing, setIsRefreshing] = useState(false)

	useEffect(() => {
		pegaDados()
	}, [])

	const pegaDados = useCallback(() => {
		const starCountRef = ref(database)
		onValue(ref(database, 'estoques/' + Empresa), snapshot => {
			const data = snapshot.val()
			const array = []

			if (data) {
				setTemDados(true)
				Object.values(data).map((dado: Resumo) => {
					const resumo = {
						nome: dado.nome,
						quantidade: dado.quantidade,
						urlFoto: dado.foto
					}
					array.push(resumo)
				})
				setEstoque(array)
			}
		})
	}, [])

	const onRefresh = useCallback(async () => {
		setIsRefreshing(true)
		pegaDados()
		setIsRefreshing(false)
	}, [])

	return (
		<Center flex={1} background={color.azulEscuro}>
			<StatusBar style="light" />
			{/* <Center>
				<Select
					_selectedItem={{ bgColor: color.azulClaro, rounded: 'lg', _text: { color: color.branco, fontWeight: 'bold', fontSize: 20 }, endIcon: <CheckIcon size="7" />, _icon: { color: color.branco } }}
					fontWeight={'black'}
					fontSize={20}
					borderWidth={0}
					color={color.branco}
					selectedValue={'Todos'}
					minW={200}
					mt={1}
					onValueChange={(item) => setCategoria(item)}>
					<Select.Item label="Todos" value="Todos" />
				</Select>
			</Center> */}
			{TemDados ? (
				null
			) : (
				<Text mt={30} fontWeight={'black'} fontSize={'2xl'} color={color.cinza}>
					Sem conteúdo
				</Text>
			)}
			<FlatList data={Estoque} keyExtractor={(item: Resumo) => item.nome} renderItem={({ item }) => <CardItem nome={item.nome} quantidade={item.quantidade} urlFoto={item.urlFoto} />} refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />} />
		</Center>
	)
}

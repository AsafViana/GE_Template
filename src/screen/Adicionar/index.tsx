import { Center, Text, Input, FormControl, Button, Slide, Alert, ScrollView } from 'native-base'
import React, { useState, useEffect, useCallback } from 'react'
import { color, Empresa } from '../../../env.json'
import { database, set, ref } from '../../Service/firebaseConfig'
import LottieView from 'lottie-react-native'

export default function index(props) {
	const {} = props
	const [Nome, setNome]: any = useState('')
	const [Codigo, setCodigo]: any = useState()
	const [Quantidade, setQuantidade]: any = useState(0)
	const [Preco, setPreco]: any = useState(0)
	const [AlertaEstaAberto, setAlertaEstaAberto] = useState(false)
	const [EnviarEstaAtivo, setEnviarEstaAtivo] = useState(false)
	const [Carregando, setCarregando] = useState(false)
	const [AnimacaoEnviado, setAnimacaoEnviado] = useState(false)

	const enviar = useCallback(() => {
		setCarregando(true)
		const item = {
			nome: Nome,
			codigo: Codigo,
			quantidade: Quantidade,
			preco: Preco,
		}
		set(ref(database, `estoques/${Empresa}/${Nome}/`), item).then(() => {
			setAlertaEstaAberto(!AlertaEstaAberto)
			setNome(null)
			setCodigo(null)
			setQuantidade('')
			setPreco('')
			setAnimacaoEnviado(true)
			setCarregando(false)
			setTimeout(() => {
				setAlertaEstaAberto(false)
			}, 5000)
		})
	}, [Nome, Codigo, Quantidade, Preco])

	const handleCodigoChange = useCallback((newText) => {
		setCodigo(newText.toUpperCase())
	}, [])

	useEffect(() => {
		if (Nome != null && Codigo != null && Quantidade != null && Preco != null) {
			setEnviarEstaAtivo(true)
		} else {
			setEnviarEstaAtivo(false)
		}
	}, [Nome, Codigo, Quantidade, Preco])

	return (
		<ScrollView overScrollMode="never" scrollIndicatorInsets={{ left: 2 }} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }} flex={1} bgColor={color.azulEscuro} pt={90}>
			<Center>
				<Slide in={AlertaEstaAberto} placement="top">
					<Alert justifyContent={'center'} status="success" safeAreaTop={0}>
						<Alert.Icon />
						<Text alignItems={'center'} textAlign={'center'} mx={5} color={'success.600'} fontWeight={'medium'}>
							Adicione mais informações na tela do item indo na aba a esquerda
						</Text>
					</Alert>
				</Slide>
				<Center bgColor={color.azulMedio} minW={100} w={350} h={600} p={10} rounded={'3xl'}>
					<FormControl m={2}>
						<FormControl.Label>
							<Text color={color.branco} bgColor={'blue.200'} fontSize={22} fontWeight={'bold'} ml={4}>
								Nome
							</Text>
						</FormControl.Label>
						<Input placeholder="Camisa" autoCapitalize="sentences" textAlign={'center'} fontSize={17} rounded={'2xl'} borderColor={color.branco} borderWidth={2} color={color.branco} value={Nome} onChangeText={setNome} />
					</FormControl>

					<FormControl m={2}>
						<FormControl.Label>
							<Text color={color.branco} bgColor={'blue.200'} fontSize={22} fontWeight={'bold'} ml={4}>
								Código
							</Text>
						</FormControl.Label>
						<Input textAlign={'center'} placeholder="AB12345678910" fontSize={17} rounded={'2xl'} borderColor={color.branco} autoCapitalize="none" borderWidth={2} color={color.branco} value={Codigo} onChangeText={(val) => handleCodigoChange(val)} />
					</FormControl>

					<FormControl m={2}>
						<Text onPress={() => setQuantidade('')} color={color.branco} bgColor={'blue.200'} fontSize={22} fontWeight={'bold'} ml={4}>
							Quantidade
						</Text>
						<Input placeholder="Peças: 10" textAlign={'center'} inputMode="numeric" keyboardType="number-pad" fontSize={20} rounded={'2xl'} borderColor={color.branco} borderWidth={2} color={color.branco} value={Quantidade} onChangeText={(val) => setQuantidade(parseInt(val))} />
					</FormControl>

					<FormControl m={2}>
						<Text color={color.branco} bgColor={'blue.200'} fontSize={22} fontWeight={'bold'} ml={4}>
							Preço
						</Text>
						<Input textAlign={'center'} keyboardType="number-pad" inputMode="numeric" rounded={'2xl'} fontSize={20} borderColor={color.branco} borderWidth={2} color={color.branco} placeholder="R$: 20,00" value={Preco} onChangeText={(val) => setPreco(parseInt(val))} />
					</FormControl>
					<Button isLoading={Carregando} isDisabled={!EnviarEstaAtivo} onPress={enviar} m={10} bgColor={color.azulClaro} rounded={'3xl'} w={'100%'} _text={{ fontSize: 22, fontWeight: 'bold' }}>
						Enviar
					</Button>
					{AnimacaoEnviado ? (
						<Center flex={1} position={'absolute'}>
							<LottieView
								source={require('../../Animations/confirmed-tick.json')}
								autoPlay={AnimacaoEnviado}
								loop={false}
								style={{ width: 400, height: 400 }}
								resizeMode="cover"
								onAnimationFinish={() => {
									setTimeout(() => {
										setAnimacaoEnviado(false)
									}, 200)
								}}
							/>
						</Center>
					) : (
						<></>
					)}
				</Center>
			</Center>
		</ScrollView>
	)
}

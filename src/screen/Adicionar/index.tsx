import { Center, Text, Input, FormControl, Button, Slide, Alert, ScrollView, HStack, Radio, Box } from 'native-base'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { color, Empresa } from '../../../env.json'
import { database, set, ref } from '../../Service/firebaseConfig'
import LottieView from 'lottie-react-native'
import { formatarValorEmDinheiro } from '../../Service/tools'

export default function index(props) {
	const {} = props
	const [Nome, setNome]: any = useState('')
	const [Codigo, setCodigo]: any = useState()
	const [Quantidade, setQuantidade]: any = useState(0)
	const [Preco, setPreco]: any = useState(0)
	const [TipoDeEstoque, setTipoDeEstoque] = useState('')
	const [Fardo, setFardo] = useState(0)
	const [AlertaEstaAberto, setAlertaEstaAberto] = useState(false)
	const [EnviarEstaAtivo, setEnviarEstaAtivo] = useState(false)
	const [Carregando, setCarregando] = useState(false)
	const [AnimacaoEnviado, setAnimacaoEnviado] = useState(false)
	const scrollViewRef = useRef(null)

	const enviar = useCallback(() => {
		setCarregando(true)
		const item = {
			nome: Nome,
			codigo: Codigo,
			quantidade: Quantidade,
			preco: Preco,
			tipoDeEstoque: TipoDeEstoque,
			fardo: Fardo,
		}
		set(ref(database, `estoques/${Empresa}/${Nome}/`), item).then(() => {
			setAlertaEstaAberto(!AlertaEstaAberto)
			setNome(null)
			setCodigo(null)
			setQuantidade('')
			setPreco('')
			setTipoDeEstoque('')
			setAnimacaoEnviado(true)
			setCarregando(false)
			setFardo(null)
			setTimeout(() => {
				setAlertaEstaAberto(false)
			}, 5000)
		})
	}, [Nome, Codigo, Quantidade, Preco])

	const handleCodigoChange = useCallback((newText) => {
		setCodigo(newText.toUpperCase())
	}, [])

	const handleChangePreco = (text: string) => {
		const novoValor = formatarValorEmDinheiro(text.replace(/[^0-9]/g, ''))
		setPreco('R$ ' + novoValor)
	}

	useEffect(() => {
		if (Nome != null && Codigo != null && Quantidade != null && Preco != null && TipoDeEstoque != null) {
			setEnviarEstaAtivo(true)
		} else {
			setEnviarEstaAtivo(false)
		}
	}, [Nome, Codigo, Quantidade, Preco, TipoDeEstoque])

	return (
		<Box alignItems={'center'} justifyContent={'center'} flex={1} bg={color.azulEscuro}>
			<ScrollView scrollEventThrottle={16} ref={scrollViewRef} overScrollMode="never" flex={1}>
				<Center mb={TipoDeEstoque === 'pacote' ? 30 : 0} mt={90}>
					<Slide in={AlertaEstaAberto} placement="top">
						<Alert justifyContent={'center'} status="success" safeAreaTop={0}>
							<Alert.Icon />
							<Text alignItems={'center'} textAlign={'center'} mx={5} color={'success.600'} fontWeight={'medium'}>
								Adicione mais informações na tela do item indo na aba a esquerda
							</Text>
						</Alert>
					</Slide>
					<Center bgColor={color.azulMedio} minW={100} w={350} pt={5} px={10} mb={90} rounded={'3xl'}>
						<FormControl m={2}>
							<FormControl.Label>
								<Text color={color.branco} bgColor={'blue.200'} fontSize={'xl'} fontWeight={'bold'} ml={4}>
									Nome
								</Text>
							</FormControl.Label>
							<Input placeholder="Camisa" autoCapitalize="sentences" textAlign={'center'} fontSize={'xl'} rounded={'xl'} borderColor={color.branco} borderWidth={2} color={color.branco} value={Nome} onChangeText={setNome} />
						</FormControl>

						<FormControl m={2}>
							<FormControl.Label>
								<Text color={color.branco} bgColor={'blue.200'} fontSize={'xl'} fontWeight={'bold'} ml={4}>
									Código
								</Text>
							</FormControl.Label>
							<Input textAlign={'center'} placeholder="AB12345678910" fontSize={'xl'} rounded={'xl'} borderColor={color.branco} autoCapitalize="none" borderWidth={2} color={color.branco} value={Codigo} onChangeText={(val) => handleCodigoChange(val)} />
						</FormControl>

						<FormControl m={2}>
							<Text onPress={() => setQuantidade('')} color={color.branco} bgColor={'blue.200'} fontSize={'xl'} fontWeight={'bold'} ml={4}>
								Quantidade
							</Text>
							<Input placeholder="Peças: 10" textAlign={'center'} inputMode="numeric" keyboardType="number-pad" fontSize={'xl'} rounded={'xl'} borderColor={color.branco} borderWidth={2} color={color.branco} value={Quantidade} onChangeText={(val) => setQuantidade(parseInt(val))} />
						</FormControl>

						<FormControl m={2}>
							<Text color={color.branco} bgColor={'blue.200'} fontSize={'xl'} fontWeight={'bold'} ml={4}>
								Preço
							</Text>
							<Input textAlign={'center'} keyboardType="number-pad" inputMode="numeric" rounded={'xl'} fontSize={'xl'} borderColor={color.branco} borderWidth={2} color={color.branco} placeholder="R$: 20,00" value={Preco} onChangeText={handleChangePreco} />
						</FormControl>
						<Center mt={6}>
							<Radio.Group
								name="tipoDeEstoque"
								accessibilityLabel="Tipo de estoque"
								onChange={(nextValue) => {
									setTipoDeEstoque(nextValue)
								}}>
								<HStack space={3}>
									<Radio
										value="unidade"
										size="lg"
										my={1}
										_text={{
											color: color.branco,
											fontWeight: 'bold',
										}}>
										Unidade
									</Radio>
									<Radio
										value="pacote"
										size="lg"
										my={1}
										_text={{
											color: color.branco,
											fontWeight: 'bold',
										}}>
										Pacote
									</Radio>
								</HStack>
							</Radio.Group>
						</Center>
						
						<Button isLoading={Carregando} isDisabled={!EnviarEstaAtivo} onPress={enviar} m={10} bgColor={color.azulClaro} rounded={'3xl'} w={'100%'} _text={{ fontSize: 'xl', fontWeight: 'bold' }}>
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
		</Box>
	)
}

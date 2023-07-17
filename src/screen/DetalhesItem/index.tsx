import { Center, ScrollView, Text, VStack, Box, Alert, TextArea, HStack, IconButton, Icon, Modal, Button, Input, Slide, Pressable, Image, Spinner } from 'native-base'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Ionicons, FontAwesome5, Entypo, FontAwesome } from '@expo/vector-icons'
import { color, Empresa } from '../../../env.json'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Item } from './vm'
import InputNumero from '../../component/InputNumero'
import InputTexto from '../../component/InputTexto'
import { set, ref, database, get, child, update, remove, storage, refStorage, uploadBytes, getDownloadURL } from '../../Service/firebaseConfig'
import * as ImagePicker from 'expo-image-picker'
import { formatarValorEmDinheiro } from '../../Service/tools'

const index = () => {
	const route = useRoute()
	const parametros = route.params
	const navigation = useNavigation()
	const [Valores, setValores] = useState<Item>()
	const [Nome, setNome] = useState<string>(parametros.item)
	const [Codigo, setCodigo] = useState('')
	const [Descricao, setDescricao] = useState('')
	const [Preco, setPreco] = useState('')
	const [Quantidade, setQuantidade] = useState('')
	const [Foto, setFoto] = useState<any>('')
	const [DeleteModalVisible, setDeleteModalVisible] = useState(false)
	const [NomeModalVisible, setNomeModalVisible] = useState(false)
	const [AlertaEnvioVisivel, setAlertaEnvioVisivel] = useState(false)
	const [AlertaEnvioTipo, setAlertaEnvioTipo] = useState('confirmado')
	const [CarregandoFoto, setCarregandoFoto] = useState(false)
	const scrollViewRef = useRef(null)

	const pegaDados = useCallback(async () => {
		const snapshot = await get(child(ref(database), `estoques/${Empresa}/${parametros.item}`))
		const data = snapshot.val()
		setValores(data)
		setCodigo(data?.codigo ?? '')
		setDescricao(data?.descricao ?? '')
		setNome(data.nome)
		setPreco(String(data?.preco ?? ''))
		setQuantidade(String(data?.quantidade ?? ''))
		setFoto(data?.foto ?? '')
	}, [parametros.item])

	const handleEnviar = useCallback(
		(event) => {
			event.preventDefault()
			const itemNovo: Item = {
				codigo: Codigo,
				descricao: Descricao,
				nome: Nome,
				preco: Number(Preco),
				quantidade: Number(Quantidade),
				foto: Foto,
			}

			if (Valores.nome === Nome) {
				update(ref(database, `estoques/${Empresa}/${Nome}`), itemNovo)
				setAlertaEnvioVisivel(true)
				setAlertaEnvioTipo('confirmado')
				setTimeout(() => {
					setAlertaEnvioVisivel(false)
				}, 5000)
			} else {
				remove(ref(database, `estoques/${Empresa}/${Valores.nome}`)).catch((error) => {
					setAlertaEnvioVisivel(true)
					setAlertaEnvioTipo('erro')
					setTimeout(() => {
						setAlertaEnvioVisivel(false)
					}, 5000)
				})
				set(ref(database, `estoques/${Empresa}/${Nome}`), itemNovo)
					.then(() => {
						setAlertaEnvioVisivel(true)
						setTimeout(() => {
							setAlertaEnvioVisivel(false)
						}, 5000)
					})
					.catch((error) => {
						setAlertaEnvioVisivel(true)
						setAlertaEnvioTipo('erro')
						setTimeout(() => {
							setAlertaEnvioVisivel(false)
						}, 5000)
					})
			}
		},
		[Valores, Nome, Codigo, Descricao, Preco, Quantidade, Foto]
	)

	const handleApagarItem = useCallback(
		(event) => {
			event.preventDefault()
			remove(ref(database, `estoques/${Empresa}/${Valores.nome}`))
			navigation.goBack()
		},
		[Valores]
	)

	const handleCarregarFoto = useCallback(async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

		if (status !== 'granted') {
			alert('Permissão negada para acessar a galeria de imagens')
			return
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		})

		if (!result.canceled) {
			setCarregandoFoto(true)
			const uri = result.assets[0].uri
			const response = await fetch(uri)
			const blob = await response.blob()

			const referencia = refStorage(storage, `img/user/${Empresa}/estoque/${Nome}`)

			const upload = await uploadBytes(referencia, blob)
				.then(async (obj) => {

					const urlFoto = await getDownloadURL(referencia)
					const itemNovo: Item = {
						codigo: Codigo,
						descricao: Descricao,
						nome: Nome,
						preco: Number(Preco),
						quantidade: Number(Quantidade),
						foto: urlFoto,
					}
					console.log(itemNovo)

					setFoto(urlFoto)
					handleEnviar()
					setCarregandoFoto(false)
				})
				.catch((error) => {
					console.log('Erro ao enviar a imagem:', error)
				})
		} else {
			alert('Nenhuma imagem selecionada.')
		}
	}, [Foto])


	useEffect(() => {
		pegaDados()
	}, [parametros.item])

	if (Valores) {
		return (
			<Box flex={1} bg={color.azulEscuro}>
				<AlertaEnviou AlertaEstaAberto={AlertaEnvioVisivel} tipo={AlertaEnvioTipo} />
				<ScrollView scrollEventThrottle={16} ref={scrollViewRef} overScrollMode="never" flex={1}>
					<Box flex={1} mt={10} mb={'32'}>
						<Center>
							<Pressable size={'48'} alignItems={'center'} justifyContent={'center'} onPress={handleCarregarFoto} bgColor={color.cinza} rounded={'full'}>
								{Foto && !CarregandoFoto ? (
									<Image
										source={{
											uri: Foto,
										}}
										alt={Nome}
										size={'full'}
										borderRadius={100}
									/>
								) : CarregandoFoto ? (
									<Spinner color={color.azulMedio} />
								) : (
									<FontAwesome5 name="box" color={color.branco} size={70} />
								)}
							</Pressable>
							<Text onPress={() => setNomeModalVisible(true)} mt={5} fontSize={'3xl'} fontWeight={'black'} color={color.branco}>
								{Nome}
							</Text>
						</Center>

						<VStack m={10}>
							<Text fontSize={'2xl'} fontWeight={'black'} color={color.branco}>
								Quantidade
							</Text>
							<InputNumero
								value={Quantidade}
								setValue={setQuantidade}
								simboloEsquerdo={
									<Text pl={3} fontSize={'2xl'} fontWeight={'bold'} color={color.branco}>
										Peças
									</Text>
								}
							/>

							<Text fontSize={'2xl'} fontWeight={'black'} color={color.branco}>
								Preço
							</Text>
							<InputNumero
								value={Preco}
								setValue={setPreco}
								simboloEsquerdo={
									<Text pl={3} fontSize={'2xl'} fontWeight={'bold'} color={color.branco}>
										R$
									</Text>
								}
							/>

							<Text fontSize={'2xl'} fontWeight={'black'} color={color.branco}>
								Codigo
							</Text>
							<InputTexto value={Codigo} setValue={setCodigo} simboloEsquerdo={<Ionicons name="barcode" size={35} color={color.branco} style={{ marginLeft: 5 }} />} />

							<Text fontSize={'2xl'} fontWeight={'black'} color={color.branco}>
								Descrição
							</Text>
							<TextArea variant={'filled'} backgroundColor={color.azulClaro} borderRadius={'3xl'} borderWidth={'0'} fontSize={'2xl'} color={color.branco} onChangeText={setDescricao} value={Descricao} type="text" autoCompleteType={undefined} h={'64'} p={5} />
						</VStack>
					</Box>
				</ScrollView>

				<Box justifyContent={'center'} position={'absolute'} bottom={'16'} left={0} right={0} alignItems={'center'} height={50}>
					<HStack bg={color.azulEscuro} borderColor={color.branco} borderWidth={3} rounded={'full'} p={3} space={10}>
						<IconButton onPress={() => setDeleteModalVisible(true)} icon={<Icon as={Entypo} size={'4xl'} color={'warning.700'} name="trash" />} />

						<IconButton onPress={handleEnviar} icon={<Icon as={FontAwesome} size={10} color={'green.500'} name="check" />} />
					</HStack>
				</Box>
				<NomeModal Nome={Nome} setNome={setNome} showModal={NomeModalVisible} setShowModal={setNomeModalVisible} />
				<Deletar setShowModal={setDeleteModalVisible} showModal={DeleteModalVisible} deletarFuncao={handleApagarItem} />
			</Box>
		)
	} else {
		return (
			<Center flex={1} background={color.azulEscuro}>
				<Text fontSize={'3xl'} fontWeight={'black'} color={color.cinza}>
					Carregando...
				</Text>
			</Center>
		)
	}
}

function Deletar({ showModal, setShowModal, deletarFuncao }) {
	return (
		<Center>
			<Modal isOpen={showModal} onClose={() => setShowModal(false)}>
				<Modal.Content maxWidth="400px" bg={'red.900'}>
					<Modal.CloseButton />
					<Modal.Body>
						<Text fontSize={'lg'} color={color.branco}>
							Tem certeza que deseja apagar este item?
						</Text>
					</Modal.Body>
					<Modal.Footer bg={'red.900'}>
						<Button.Group space={2}>
							<Button
								color={color.branco}
								bg={'red.900'}
								onPress={() => {
									setShowModal(false)
								}}>
								Cancel
							</Button>
							<Button colorScheme={'danger'} onPress={deletarFuncao}>
								Deletar
							</Button>
						</Button.Group>
					</Modal.Footer>
				</Modal.Content>
			</Modal>
		</Center>
	)
}

function NomeModal({ showModal, setShowModal, Nome, setNome }) {
	return (
		<Center>
			<Modal isOpen={showModal} onClose={() => setShowModal(false)}>
				<Modal.Content maxWidth="400px" bg={color.azulEscuro}>
					<Modal.CloseButton />
					<Modal.Body py={10}>
						<Input px={10} variant={'filled'} backgroundColor={color.azulClaro} borderColor={color.branco} borderRadius={'3xl'} borderWidth={4} fontSize={'lg'} color={color.branco} type="text" value={Nome} onChangeText={setNome} />
					</Modal.Body>
					<Modal.Footer bg={color.azulEscuro}>
						<Button.Group space={2}>
							<Button
								color={color.branco}
								bg={color.azulEscuro}
								onPress={() => {
									setShowModal(false)
								}}>
								Cancel
							</Button>
							<Button
								background={color.azulClaro}
								onPress={() => {
									setShowModal(false)
								}}>
								Salvar
							</Button>
						</Button.Group>
					</Modal.Footer>
				</Modal.Content>
			</Modal>
		</Center>
	)
}

function AlertaEnviou({ AlertaEstaAberto, tipo }) {
	if (tipo === 'confirmado') {
		return (
			<Slide in={AlertaEstaAberto} placement="top">
				<Alert justifyContent={'center'} status="success" safeAreaTop={0}>
					<Alert.Icon />
					<Text alignItems={'center'} textAlign={'center'} mx={5} color={'success.600'} fontWeight={'medium'}>
						Enviado com sucesso
					</Text>
				</Alert>
			</Slide>
		)
	} else if (tipo === 'carregando'){
		<Slide in={AlertaEstaAberto} placement="top">
			<Alert justifyContent={'center'} status="info" safeAreaTop={0}>
				<Alert.Icon />
				<Text alignItems={'center'} textAlign={'center'} mx={5} color={'info.600'} fontWeight={'medium'}>
					Carregando...
				</Text>
			</Alert>
		</Slide>
	} else {
		return (
			<Slide in={AlertaEstaAberto} placement="top">
				<Alert justifyContent={'center'} status="error" safeAreaTop={0}>
					<Alert.Icon />
					<Text alignItems={'center'} textAlign={'center'} mx={5} color={'warn.600'} fontWeight={'medium'}>
						Erro no envio de dados
					</Text>
				</Alert>
			</Slide>
		)
	}
}

export default index

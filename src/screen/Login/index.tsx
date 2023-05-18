import { Center, Text, Button, Image, ScrollView, FormControl, Input, Box, Slide, Alert, Modal, WarningOutlineIcon } from 'native-base'
import React, { useState, useEffect } from 'react'
import { Platform } from 'react-native'
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { color } from '../../../env.json'
import { auth, signInWithEmailAndPassword, sendPasswordResetEmail } from '../../Service/firebaseConfig'
import LottieView from 'lottie-react-native'
import { storeData } from '../../Service/asyncStorage'

export default function index(props) {
	const navigation = useNavigation()
	const {} = props

	const [ExibirSenha, setExibirSenha] = useState(false)
	const [Email, setEmail] = useState('')
	const [Senha, setSenha] = useState('')
	const [LiberarBotao, setLiberarBotao] = useState(false)
	const [Carregando, setCarregando] = useState(false)
	const [ErroSenhaExibir, setErroSenhaExibir] = useState(false)
	const [ErroEmailExibir, setErroEmailExibir] = useState(false)
	const [ErroDesconhecidoExibir, setErroDesconhecidoExibir] = useState(false)
	const [ErroMuitasTentativasExibir, setErroMuitasTentativasExibir] = useState(false)

	useEffect(() => {
		setEmail(Email.toLowerCase())
		setSenha(Senha.toLowerCase())

		if (Email != '' && Senha != '' || Email != null && Senha != null) {
			setLiberarBotao(true)
		} else {
			setLiberarBotao(false)
		}
	}, [Email, Senha])

	function enviar() {
		setCarregando(true)
		signInWithEmailAndPassword(auth, Email, Senha)
			.then(data => {
				setCarregando(false)
				const uid = data.user.uid
				storeData('uid', uid)
				storeData('email', Email)
				storeData('senha', Senha)
				navigation.navigate('Logado')
			})
			.catch((obj) => {
				console.log(obj.code)
				if (obj.code === 'auth/wrong-password') {
					setErroSenhaExibir(true)
				}
				else if(obj.code === 'auth/too-many-requests'){
					setErroMuitasTentativasExibir(true)
				}
				else if(obj.code === 'auth/user-not-found') {
					setErroEmailExibir(true)
				}
				else{
					setErroDesconhecidoExibir(true)
				}
				setCarregando(false)
			}) 
	}

	function resetSenha() {

	}

	return (
		<Center flex={1}>
			{/* <Modal isOpen={ErroSenhaExibir} onClose={() => setErroSenhaExibir(false)}>
				<Modal.Content>
					<Modal.CloseButton onPress={() => setErroSenhaExibir(false)} />
					<Modal.Body bgColor={'ale.900'}>
						<Center flex={1}>
							<LottieView source={require('../../Animations/alerta.json')} autoPlay={true} loop={true} style={{ width: 200, height: 200 }} resizeMode="cover" />

							<Text fontWeight={'black'} fontSize={'2xl'} color={'error.300'}>
								Senha incorreta
							</Text>
							<Text fontSize={'lg'} color={'error.300'}>
								Verifique a sua senha
							</Text>
						</Center>
					</Modal.Body>
				</Modal.Content>
			</Modal> */}

			<Modal isOpen={ErroSenhaExibir} onClose={() => setErroSenhaExibir(false)}>
				<Modal.Content>
					<Modal.CloseButton onPress={() => setErroSenhaExibir(false)} />
					<Modal.Body bgColor={'error.900'}>
						<Center flex={1}>
							<LottieView source={require('../../Animations/errou.json')} autoPlay={true} loop={true} style={{ width: 200, height: 200 }} resizeMode="cover" />

							<Text fontWeight={'black'} fontSize={'2xl'} color={'error.300'}>
								Senha incorreta
							</Text>
							<Text fontSize={'lg'} color={'error.300'}>
								Verifique a sua senha
							</Text>
						</Center>
					</Modal.Body>
				</Modal.Content>
			</Modal>

			<Modal isOpen={ErroEmailExibir} onClose={() => setErroEmailExibir(false)}>
				<Modal.Content>
					<Modal.CloseButton onPress={() => setErroEmailExibir(false)} />
					<Modal.Body bgColor={'error.900'}>
						<Center flex={1}>
							<LottieView source={require('../../Animations/errou.json')} autoPlay={true} loop={true} style={{ width: 200, height: 200 }} resizeMode="cover" />

							<Text fontWeight={'black'} fontSize={'2xl'} color={'error.300'}>
								Email incorreto
							</Text>
							<Text fontSize={'lg'} color={'error.300'}>
								Verifique a sue E-mail
							</Text>
						</Center>
					</Modal.Body>
				</Modal.Content>
			</Modal>

			<Modal isOpen={ErroMuitasTentativasExibir} onClose={() => setErroMuitasTentativasExibir(false)}>
				<Modal.Content>
					<Modal.CloseButton onPress={() => setErroMuitasTentativasExibir(false)} />
					<Modal.Body bgColor={'error.900'}>
						<Center flex={1}>
							<LottieView source={require('../../Animations/alerta.json')} autoPlay={true} loop={true} style={{ width: 200, height: 200 }} resizeMode="cover" />

							<Text fontWeight={'black'} fontSize={'2xl'} color={'error.300'}>
								Verifique a sue E-mail
							</Text>
						</Center>
					</Modal.Body>
				</Modal.Content>
			</Modal>
			
			<Modal isOpen={ErroDesconhecidoExibir} onClose={() => setErroDesconhecidoExibir(false)}>
				<Modal.Content>
					<Modal.CloseButton onPress={() => setErroDesconhecidoExibir(false)} />
					<Modal.Body bgColor={'error.900'}>
						<Center flex={1}>
							<LottieView source={require('../../Animations/errou.json')} autoPlay={true} loop={true} style={{ width: 200, height: 200 }} resizeMode="cover" />

							<Text fontWeight={'black'} fontSize={'2xl'} color={'error.300'}>
								Erro desconhecido
							</Text>
							<Text fontSize={'lg'} color={'error.300'}>
								Reporte os desenvolvedores
							</Text>
						</Center>
					</Modal.Body>
				</Modal.Content>
			</Modal>

			<StatusBar backgroundColor="#001B2C" />
			<Image blurRadius={10} size={'100%'} source={require('../../image/Ilustration_V2_Neon_lights_and_signs_illuminating_the_streets_1.png')} />
			<ScrollView position={'absolute'} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }} flex={1}>
				<Box justifyContent={'center'} bgColor={color.azulMedio} minW={100} w={350} h={500} p={5} rounded={'3xl'}>
					<FormControl mb={2}>
						<FormControl.Label>
							<Text color={color.branco} bgColor={'blue.200'} fontSize={22} fontWeight={'bold'} ml={4}>
								E-mail
							</Text>
						</FormControl.Label>
						<Input
							value={Email}
							autoCapitalize='none'
							keyboardType='email-address'
							onChangeText={setEmail}
							shadow={'9'}
							bgColor={color.azulMedio}
							InputLeftElement={<FontAwesome style={{ marginLeft: 15 }} name="user" size={30} color={color.azulClaro} />}
							placeholder="seu@email.com"
							w={'100%'}
							fontSize={17}
							rounded={'2xl'}
							borderColor={color.branco}
							borderWidth={3}
							color={color.branco}
						/>
					</FormControl>

					<FormControl my={2}>
						<FormControl.Label>
							<Text onPress={() => setErroSenhaExibir(true)} textAlign={'center'} color={color.branco} bgColor={'blue.200'} fontSize={22} fontWeight={'bold'} ml={4}>
								Senha
							</Text>
						</FormControl.Label>
						<Input
							value={Senha}
							autoCapitalize='none'
							onChangeText={setSenha}
							secureTextEntry={!ExibirSenha}
							InputRightElement={<Ionicons onPress={() => setExibirSenha(!ExibirSenha)} name={ExibirSenha ? 'eye' : 'eye-off'} size={30} color={color.azulClaro} style={{ marginRight: 10 }} />}
							shadow={'9'}
							bgColor={color.azulMedio}
							InputLeftElement={<MaterialIcons name="lock" size={30} color={color.azulClaro} style={{ marginLeft: 10 }} />}
							placeholder="******"
							w={'100%'}
							fontSize={17}
							rounded={'2xl'}
							borderColor={color.branco}
							borderWidth={3}
							color={color.branco}
						/>
					</FormControl>

					<Text onPress={() => navigation.navigate('EsqueceuSenha')} underline color={color.azulClaro} fontWeight={'black'} alignSelf={'flex-end'}>
						Esqueceu a senha?
					</Text>

					<Button onPress={enviar} _loading={{ size: 16 }} isLoading={Carregando} isDisabled={!LiberarBotao} shadow={'9'} my={10} bgColor={color.azulClaro} rounded={'3xl'} w={'100%'} _text={{ fontSize: 22, fontWeight: 'bold' }}>
						Enviar
					</Button>

					<Text alignSelf={'center'} fontWeight={'bold'} fontSize={15} color={color.branco}>
						Novo por aqui?{' '}
						{
							<Text onPress={() => navigation.navigate('Cadastro')} underline color={color.azulClaro}>
								Clique aqui!
							</Text>
						}
					</Text>
				</Box>
			</ScrollView>
		</Center>
	)
}

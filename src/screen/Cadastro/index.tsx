import { Center, Text, Button, Image, ScrollView, FormControl, Input, Box, Modal } from 'native-base'
import React, { useState, useEffect } from 'react'
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { useNavigation, CommonActions } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { color } from '../../../env.json'
import { setDoc, auth, createUserWithEmailAndPassword, doc, firestore } from '../../Service/firebaseConfig'
import LottieView from 'lottie-react-native'
import { storeData } from '../../Service/asyncStorage'

export default function index(props) {
	const navigation = useNavigation()
	const {} = props
	const [Empresa, setEmpresa] = useState()
	const [Email, setEmail] = useState()
	const [Senha, setSenha] = useState()
	const [ConfirmaSenha, setConfirmaSenha] = useState()
	const [LiberarEnviar, setLiberarEnviar] = useState(false)
	const [CorSenhaInput, setCorSenhaInput] = useState(color.branco)
	const [ErroDesconhecidoExibir, setErroDesconhecidoExibir] = useState(false)
	const [ExibirSenha, setExibirSenha] = useState(false)
	const [Carregando, setCarregando] = useState(false)

	useEffect(() => {
		if (Email != null && Senha != null && ConfirmaSenha != null && Empresa != null && Senha === ConfirmaSenha) {
			setLiberarEnviar(true)
		} else {
			setLiberarEnviar(false)
		}
	}, [Email, Senha, ConfirmaSenha, Empresa])

	useEffect(() => {
		if (Senha != ConfirmaSenha) {
			setCorSenhaInput('error.600')
		} else {
			setCorSenhaInput(color.branco)
		}
	}, [Senha, ConfirmaSenha])

	function enviar() {
		createUserWithEmailAndPassword(auth, Email, Senha)
			.then(({ user }) => {
				storeData('email', Email)
				storeData('senha', Senha)
				storeData('uid', user.uid).then(async () => {
					try {
						await setDoc(doc(firestore, 'users', user.uid), {
							Empresa: Empresa,
							uid: user.uid,
							email: Email,
						})
						setCarregando(false)
					} catch (e) {
						console.log(e)
					}
					navigation.dispatch(
						CommonActions.reset({
							index: 1,
							routes: [{ name: 'Logado' }],
						})
					)
				})
			})
			.catch((error) => {
				console.log(error.code)
				setErroDesconhecidoExibir(true)
			})
	}

	return (
		<Center flex={1}>
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
				<Box justifyContent={'center'} bgColor={color.azulMedio} minW={100} w={350} h={650} p={5} rounded={'3xl'}>
					<FormControl mb={2}>
						<FormControl.Label>
							<Text color={color.branco} bgColor={'blue.200'} fontSize={22} fontWeight={'bold'} ml={4}>
								Empresa
							</Text>
						</FormControl.Label>
						<Input
							value={Empresa}
							onChangeText={setEmpresa}
							shadow={'9'}
							bgColor={color.azulMedio}
							InputLeftElement={<Ionicons style={{ marginLeft: 15 }} name="business" size={30} color={color.azulClaro} />}
							placeholder="Minha Empresa"
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
							<Text color={color.branco} bgColor={'blue.200'} fontSize={22} fontWeight={'bold'} ml={4}>
								E-mail
							</Text>
						</FormControl.Label>
						<Input
							value={Email}
							onChangeText={setEmail}
							autoCapitalize='none'
							keyboardType='email-address'
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
							<Text color={color.branco} bgColor={'blue.200'} fontSize={22} fontWeight={'bold'} ml={4}>
								Senha
							</Text>
						</FormControl.Label>
						<Input
							value={Senha}
							onChangeText={setSenha}
							autoCapitalize='none'
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

					<FormControl my={2}>
						<FormControl.Label>
							<Text color={color.branco} bgColor={'blue.200'} fontSize={22} fontWeight={'bold'} ml={4}>
								Confirma Senha
							</Text>
						</FormControl.Label>
						<Input
							value={ConfirmaSenha}
							autoCapitalize='none'
							onChangeText={setConfirmaSenha}
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

					<Button  isLoading={Carregando} onPress={enviar} isDisabled={!LiberarEnviar} shadow={'9'} my={10} bgColor={color.azulClaro} rounded={'3xl'} w={'100%'} _text={{ fontSize: 22, fontWeight: 'bold' }}>
						Enviar
					</Button>
				</Box>
			</ScrollView>
		</Center>
	)
}

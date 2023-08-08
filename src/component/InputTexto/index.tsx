import React, { } from 'react'
import { Input } from 'native-base'
import { color } from '../../../env.json'

const InputNumero = React.memo(({value, setValue, simboloEsquerdo}) => {
	return <Input px={5} variant={'filled'} backgroundColor={color.azulClaro} borderRadius={'xl'} fontSize={'xl'} borderWidth={'0'} color={color.branco} onChangeText={setValue} value={value} type="text" InputLeftElement={simboloEsquerdo} />
})

export default InputNumero

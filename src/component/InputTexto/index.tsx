import React, { } from 'react'
import { Input } from 'native-base'
import { color } from '../../../env.json'

const InputNumero = React.memo(({value, setValue, simboloEsquerdo}) => {
	return <Input px={5} variant={'filled'} backgroundColor={color.azulClaro} borderColor={color.branco} borderRadius={'3xl'} borderWidth={4} fontSize={'2xl'} color={color.branco} onChangeText={setValue} value={value} type="text" InputLeftElement={simboloEsquerdo} />
})

export default InputNumero

import React, { useCallback } from 'react'
import { Input, Text } from 'native-base'
import { color } from '../../../env.json'

const InputNumero = React.memo(({ value, setValue, simboloEsquerdo }) => {
	const handleValueChange = useCallback(
		(valor) => {
			setValue(parseInt(valor))
		},
		[setValue]
	)

	return <Input variant={'filled'} backgroundColor={color.azulClaro} borderWidth={'0'} borderColor={color.branco} borderRadius={'3xl'} fontSize={'3xl'} color={color.branco} onChangeText={handleValueChange} value={value} keyboardType="number-pad" type="text" InputLeftElement={simboloEsquerdo} />
})

export default InputNumero

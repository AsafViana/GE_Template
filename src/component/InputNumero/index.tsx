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

	return <Input variant={'filled'} backgroundColor={color.azulClaro} borderColor={color.branco} borderRadius={'3xl'} borderWidth={4} fontSize={'3xl'} color={color.branco} onChangeText={handleValueChange} value={value} keyboardType="number-pad" type="text" InputLeftElement={simboloEsquerdo} />
})

export default InputNumero

import React, { useCallback } from 'react'
import { Input, Text } from 'native-base'
import { color } from '../../../env.json'

const InputNumero = React.memo(({ value, setValue, simboloEsquerdo }) => {


	return <Input variant={'filled'} backgroundColor={color.azulClaro} borderWidth={'0'} borderColor={color.branco} borderRadius={'xl'} fontSize={'xl'} color={color.branco} onChangeText={setValue} value={value} keyboardType="number-pad" type="text" InputLeftElement={simboloEsquerdo}/>
})

export default InputNumero

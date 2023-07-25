function formatarValorEmDinheiro(valorEntrada: string): string {
	let valorFormatado = ''

	const valor = removerPrefixoR$(valorEntrada)

	if (valor.length === 1) {
		valorFormatado = `0,0${valor}`
	} else if (valor.length === 2) {
		valorFormatado = `0,${valor}`
	} else if (valor.length > 2) {
		const centavos = valor.slice(-2)
		const reais = valor.slice(0, -2)

		if (reais === '0') {
			valorFormatado = `0,${centavos.padStart(2, '0')}` // Preenche com zeros à esquerda se necessário
		} else {
			valorFormatado = `${parseInt(reais, 10).toString()},${centavos.padStart(2, '0')}` // Preenche com zeros à esquerda se necessário
		}
	}

	return valorFormatado
}

function removerPrefixoR$(valor: string): string {
	const prefixo = 'R$ '
	if (valor.startsWith(prefixo)) {
		return valor.substring(prefixo.length)
	}
	return valor
}

function quebrarLinha(texto: string, caracteresPorLinha: number): string {
	if (texto.length <= caracteresPorLinha) {
		return texto
	}

	let resultado = ''
	let contador = 0

	while (contador < texto.length) {
		resultado += texto.substring(contador, contador + caracteresPorLinha) + '\n'
		contador += caracteresPorLinha
	}

	return resultado
}

export {
	formatarValorEmDinheiro, quebrarLinha
}

function formatarValorEmDinheiro(valor: string): string {
	let valorFormatado = ''

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

export {
	formatarValorEmDinheiro
}

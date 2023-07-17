function formatarValorEmDinheiro(valor: number): string {
	const formatoDinheiro = new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})

	return formatoDinheiro.format(valor)
}

export {
	formatarValorEmDinheiro
}

export function encriptar(text) {
	let matrizCodigo = [["1", "enter"], ["i", "imes"], ["8", "ai"], ["o", "ober"], ["7", "ufat"]];
	for (let i = 0; i < matrizCodigo.length; i++) {
		if (text.includes(matrizCodigo[i][0])) {
			text = text.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1])
		}
	}
	return text
}

export function desencriptar(text) {
	let matrizCodigo = [["1", "enter"], ["i", "imes"], ["8", "ai"], ["o", "ober"], ["7", "ufat"]];
	for (let i = 0; i < matrizCodigo.length; i++) {
		if (text.includes(matrizCodigo[i][1])) {
			text = text.replaceAll(matrizCodigo[i][1], matrizCodigo[i][0])
		}

	}
	return text
}
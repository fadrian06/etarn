export const htmlPattern = Object.freeze({
	name: "([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+s?)+",
	password: "(?=.*\\d)(?=.*[A-ZÑ])(?=.*[a-zñ])(?=.*\\W).{8,}",
	phone: "[0-9]{11,13}",
});

export const patternTitles = Object.freeze({
	name: "Consiste de una o varias palabras con inicial en mayúscula",
	password:
		"Debe tener 8 letras, al menos una mayúscula, una minúscula, un número y un símbolo",
	phone: "Debe tener 11 o 13 dígitos",
});

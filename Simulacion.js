
const CANT_DECIMALES = 100; //Cantidad de decimales que desea para el Beta
const ITERACIONES = 1000; //Cantidad de veces que se va a intentar encontrar una raiz real
const SIMULACIONES = 100000; //Cantidad de veces que desea correr el modelo cambiando Beta para mejorar la precision

function generadorDeReales(min, max) {
	var num = Math.random() * (max - min);
	return num + min;
}

function formulaGeneral(b, c) {
	function discrim(a, b, c) {
		return b * b - 4 * a * c;
	}

	let sol = new Array(2);
	const a = 1;
	let disc = discrim(a, b, c);
	if (disc < 0) {
		return false;
	} else {
		sol[0] = (-b + Math.sqrt(disc)) / (2 * a);
		sol[1] = (-b - Math.sqrt(disc)) / (2 * a);
		return true;
	}
}

function tieneRaizReal(beta) {
	let iteraciones = ITERACIONES;
	let existe = 0;
	let noExiste = 0;

	while (iteraciones > 0) {
		let b = generadorDeReales(-beta, beta);
		let c = generadorDeReales(-beta, beta);

		if (formulaGeneral(b, c) == true) existe++;
		else noExiste++;

		iteraciones--;
	}
	console.log(
		`\nHay ${existe} casos en los que existe raiz real`
	);
	const porcentaje = (existe * 100) / ITERACIONES;
	console.log(`Esto equivale a un ${porcentaje}%\n`);
	return {porcentaje,existe};
}

function simularNveces() {
    let porcPromedio = 0;
    let exisPromedio = 0;

    for (let index = 0; index < SIMULACIONES; index++) {
        const beta = generadorDeReales(0, CANT_DECIMALES);
        const {porcentaje, existe} = tieneRaizReal(beta)
        porcPromedio+= porcentaje
        exisPromedio+= existe
    }
    console.log(`--------------->\n * Se calcularon ${ITERACIONES} raices, con ${CANT_DECIMALES} decimales, simulado ${SIMULACIONES} veces \ncon ${SIMULACIONES} betas diferentes, y se obtiene que la probabilidad de obtener una reaiz real es de ${porcPromedio/SIMULACIONES}% *\n--------------|`);
    return porcPromedio/SIMULACIONES
}

console.log(simularNveces());


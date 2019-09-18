function decryptText(inputText) {

	// Iterate transpose variations
	permutateArray([1,2,3,4,5,6]).forEach(function(perm) {
		console.log("decrypting for permutation " + perm.toString());
		// For each transpose send to GCP, get back text
		// Send text to GCP to score it
		// Place in result box, sorted by score

	});
	// $.get('https://us-east1-fiery-bit-253008.cloudfunctions.net/SayHelloWorld?word=door', function(data, status) {
		// console.log(`${data}`);
	// });
}

function transposeText(transposePattern)  {
}

// Copied permutation calculation from https://stackoverflow.com/a/43260158
function permutateArray(xs) {
	let ret = [];

	for (let i = 0; i < xs.length; i++) {
		let rest = permutateArray(xs.slice(0, i).concat(xs.slice(i + 1)));

		if (!rest.length) {
			ret.push([xs[i]])
		} else {
			for (let j = 0; j < rest.length; j++) {
				ret.push([xs[i]].concat(rest[j]))
			}
		}
	}
	return ret;
}



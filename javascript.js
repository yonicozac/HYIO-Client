// Send each transposition variant to the GCP to transpose and return a score for us
function decryptText(inputText) {

	$(".text_results > div").remove();

	// Iterate transpose variations
	permutateArray([1,2,3,4]).forEach(function(perm) {
		console.log("decrypting for permutation " + perm.toString());
		
		// For each transpose - send to GCP, get back text and score
		$.post('https://us-central1-fiery-bit-253008.cloudfunctions.net/ScoreText', {
			text: inputText,
			permutation: perm.join('') 
		}, 
		function(data, status) {
			// Place in result box
			$(".text_results")
				.append($('<div></div>')
					.attr('score', data.score)
					.append($('<span></span>')
						.text(data.score)
						.addClass('score')
					)
					.append($('<span></span>')
						.text(data.text)
					)
				)
		});
	});
}

// Transpose the given text by the pattern
function transposeText(inputText, transposePattern)  {
	return inputText
		// Split into chunks of 4 characters
		.match(/.{1,4}/g)
		// For every chunk apply transposition
		.map(chunk => {
			let transposedChunk = new Array(4);
			chunk.split('').forEach(function(char, i) {
				transposedChunk[transposePattern[i]] = char;
			})
			return transposedChunk.join('');
		})
		// Re-assemble the string
		.join('');
}

function applyTransposationOnText() {
	$('.text_to_decrypt').val(transposeText($('.text_to_decrypt').val(), $('.transPattern').val()));
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



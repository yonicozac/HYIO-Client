/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.scoreText = (req, res) => {
  //console.log(req.body);
  var request = require("request");

  let inputText = req.body.text;
  let permutation = req.body.permutation.split('');

  // Permutate Text
  let permutatedText = transposeText(inputText, permutation);
  
  // Count score for each word in the text we permutated
  let words = permutatedText.match(/[a-z'\-]+/gi);
  let wordsCount = words.length;
  let wordsChecked = 0;
  let textScore = 0;
  words.forEach(function(word) {

    var options = {
      method: 'GET',
      url: 'https://wordsapiv1.p.rapidapi.com/words/' + word + '/frequency',
      headers: {
        'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
        'x-rapidapi-key': '556aa12d1emsh3dee87affe98a18p192327jsnab9b7a70cdd7'
      }
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      wordsChecked++;

      // If wordsAPI knows this word, up the score
      body = JSON.parse(body);
      if (body.hasOwnProperty('frequency')) {
          textScore++;
      }
	
      // If we're done checking all the words, send response
      if (wordsChecked == wordsCount) {
        res.status(200).send({text: permutatedText, score: textScore});
      }

    });
  });
  
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

};
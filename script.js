const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

function search(str) {
	let results = [];
	//place whole matches at front of array, inner matches at the end of the array
	fruit.forEach( (val) => { 
		if (val.toLowerCase().slice(0,str. length) === str.toLowerCase()) {
			results.unshift(val);
		} else if (val.toLowerCase().includes(str.toLowerCase())) {
			results.push(val)
		}
	});
	return results;
}

function search2(str) {
	let results = [];
	//assign a match score favoring starting with str and covering larger percentage of the word (e.g. grape over grapefruit when user types in grape)
	fruit.forEach( (val) => {
		let score = 0;
		if (val.toLowerCase().slice(0,str. length) === str.toLowerCase()) {
			score += 10;
		} else if (val.toLowerCase().includes(str.toLowerCase())) {
			score += 1;

		}
		score *= str.length / val.length;
		if(score > 0) {
			results.push({val, score});
		}
	});
	results.sort((a,b) => {
		return b.score - a.score;
	});
	return results;
}

function searchHandler(e) {
	suggestions.innerHTML = '';
	if (input.value === "") {
		return null;
	} else {
	showSuggestions(search2(input.value), input.value);
	}
}

function showSuggestions(results, inputVal) {
	//for each result
		//create li
		//within each li, add em to wherever inputVal appears in the result, e.g. <li>Pine<b>apple</b></li> for apple or <li>Pin<b>e</b>appl<b>e</b></li>
		//add li to ul as a child
	results.forEach( (result) => {
		let newLi = document.createElement("li");
		for (let i = 0; i < result['val'].length;) {
			let resultSubString = result['val'].slice(i, i+inputVal.length);
			if (resultSubString.toLowerCase() === inputVal.toLowerCase()) {
				let newBold = document.createElement('b');
				newBold.innerText = resultSubString;
				newLi.appendChild(newBold);
				i += inputVal.length;
			} else {
				newLi.innerHTML += result['val'][i];
				i++;
			}
		}
		newLi.classList.add('suggestion')
		suggestions.appendChild(newLi);
	});
}

function useSuggestion(e) {
	console.log(e.target)
	if(e.target.nodeName === 'B') {
		input.value = e.target.parentElement.innerText
	} else if (e.target.nodeName === 'LI' && e.target.classList.contains("suggestion")) {
		input.value = e.target.innerText;
	}
	suggestions.innerHTML = '';
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);
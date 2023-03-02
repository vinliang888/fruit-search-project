const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

function search(str) {
	let results = [];
	fruit.forEach( (val) => {val.toLowerCase().includes(str.toLowerCase()) ? results.push(val) : null });
	return results;
}

function searchHandler(e) {
	suggestions.innerHTML = '';
	if (input.value === "") {
		return null;
	} else {
	showSuggestions(search(input.value), input.value);
	}
}

function showSuggestions(results, inputVal) {
	//for each result
		//create li
		//within each li, add em to wherever inputVal appears in the result, e.g. <li>Pine<em>apple</em></li> for apple or <li>Pin<em>e</em>appl<em>e</em></li>
		//add li to ul as a child
	results.forEach((result) => {
		let newLi = document.createElement("li");
		console.log(result);
		for (let i = 0; i < result.length;) {
			console.log(i);
			console.log(result.slice(i, i+inputVal.length));
			if (result.slice(i, i+inputVal.length).toLowerCase() === inputVal.toLowerCase()) {
				let newEm = document.createElement('em');
				newEm.innerText = result.slice(i, i+inputVal.length);
				newLi.innerHTML += newEm.innerHTML;
				console.log(newEm);
				console.log(newLi);
				i += inputVal.length;
			} else {
				newLi.innerText += result[i];
				i++;
			}
		}
		suggestions.appendChild(newLi);
	})
}

// function useSuggestion(e) {
// 	// TODO
// }

input.addEventListener('keyup', searchHandler);
// suggestions.addEventListener('click', useSuggestion);
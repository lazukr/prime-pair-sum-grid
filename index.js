const table = document.getElementById("table");

const limit = 100;

function isPrime(n) {
	const checkUpTo = Math.ceil(Math.sqrt(n));

	for (let i = 2; i <= checkUpTo; i++) {
		if (n % i === 0) {
			return false;
		}
	}

	return true;
}

function getFirstNPrimesExcludingTwo(n) {
	let i = 3;
	list = [];
	while (list.length < n) {
		if (isPrime(i)) {
			list.push(i);
		}
		i++;
	}

	return list;
}

function getPrimePairSums(primes) {
	const grid = [];
	for (let j = 0; j < primes.length; j++) {
		const row = [];
		for (let i = 0; i < primes.length; i++) {
			row.push((primes[j] + primes[i]) / 2);
		}
		grid.push(row);
	}
	return grid;
}

function diagonalConsecutiveWalker(grid) {
	let currentValue = 4;
	const highlights = {};
	const limit = grid.length;

	let i = 0,
		j = 0;

	while (i < limit) {
		if (j === 0) {
			i++;
			while (i > 0) {
				if (currentValue === grid[i][j]) {
					currentValue++;
					highlights[`${i},${j}`] = true;
				}
				i--;
				j++;
			}

			if (j < limit) {
				if (currentValue === grid[i][j]) {
					currentValue++;
					highlights[`${i},${j}`] = true;
				}
			}
		} else if (i === 0) {
			j++;
			while (j > 0) {
				if (currentValue === grid[i][j]) {
					currentValue++;
					highlights[`${i},${j}`] = true;
				}
				j--;
				i++;
			}

			if (i < limit) {
				if (currentValue === grid[i][j]) {
					currentValue++;
					highlights[`${i},${j}`] = true;
				}
			}
		}
	}
	j++;
	i--;
	//console.log(i, j, "break");
	while (j < limit) {
		if (i === limit - 1) {
			j++;
			while (j < limit - 1) {
				//console.log(i, j, grid[i][j]);
				if (currentValue === grid[i][j]) {
					currentValue++;
					highlights[`${i},${j}`] = true;
				}
				j++;
				i--;
			}
			//console.log(i, j, grid[i][j]);
			if (currentValue === grid[i][j]) {
				currentValue++;
				highlights[`${i},${j}`] = true;
			}
		} else if (j === limit - 1) {
			i++;
			while (i < limit - 1) {
				//console.log(i, j, grid[i][j]);
				if (currentValue === grid[i][j]) {
					currentValue++;
					highlights[`${i},${j}`] = true;
				}
				i++;
				j--;
			}
			//console.log(i, j, grid[i][j]);
			if (currentValue === grid[i][j]) {
				currentValue++;
				highlights[`${i},${j}`] = true;
			}
		}
	}
	return [currentValue, highlights];
}

function render(grid, highlights) {
	table.innerHTML = "";
	for (let i = 0; i < grid.length; i++) {
		const tr = document.createElement("tr");
		for (let j = 0; j < grid[i].length; j++) {
			const td = document.createElement("td");
			const div = document.createElement("div");
			div.textContent = grid[i][j];

			if (highlights[`${i},${j}`]) {
				div.style.backgroundColor = "red";
			}

			td.appendChild(div);
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
}

const input = document.getElementById("numToGen");
const maxCount = document.getElementById("maxCount");
const generate = document.getElementById("generate");

generate.onclick = calc;
function calc() {
	const primes = getFirstNPrimesExcludingTwo(input.value);
	const grid = getPrimePairSums(primes);
	const [max, hightlights] = diagonalConsecutiveWalker(grid);
	maxCount.value = max - 1;
	render(grid, hightlights);
}

'use strict';
console.log('working ....');

//  point 1 : making all the variables
const canvas = document.querySelector('#canvas');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const sizeEL = document.getElementById('size');
const colorEl = document.getElementById('color');
const clearEl = document.getElementById('clear');

const ctx = canvas.getContext('2d');

// point 1.1 : making the canvas size and others properties
let size = 10;
colorEl.value = 'black';
let color = colorEl.value;
let x;
let y;
let isPressed = false;

// point 1.2: making all the event listeners
canvas.addEventListener('mousedown', (e) => {
	isPressed = true;

	x = e.offsetX;
	y = e.offsetY;

	// console.log(isPressed, x, y); /// for testing
});

canvas.addEventListener('mouseup', (e) => {
	isPressed = false;

	x = undefined;
	y = undefined;
	// console.log(isPressed, x, y); /// for testing
});

canvas.addEventListener('mousemove', (e) => {
	if (isPressed) {
		const x2 = e.offsetX;
		const y2 = e.offsetY;

		// console.log(x2, y2);/// for testing

		drawCircle(x2, y2); /// to draw the circle
		drawLine(x, y, x2, y2); /// to draw the line

		x = x2; /// to set the new x and y position
		y = y2;
	}
});

// point 2 : making the canvas
function drawCircle(x, y) {
	ctx.beginPath();
	ctx.arc(x, y, size, 0, Math.PI * 2);
	ctx.fillStyle = color;
	ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.strokeStyle = color;
	ctx.lineWidth = size * 2; /// to make the line width bigger when draw
	ctx.stroke();
}

// point 2.1 : set canvas width and height

// drawCircle(100, 200); /// for testing
// drawLine(300, 300, 200, 500); /// for testing

// point 3 : making the increase and decrease button

function updateSizeOnScreen() {
	sizeEL.innerText = size;
}

increaseBtn.addEventListener('click', () => {
	size += 5;

	if (size > 50) {
		size = 50;
	}

	updateSizeOnScreen();
});

decreaseBtn.addEventListener('click', () => {
	size -= 5;

	if (size < 5) {
		size = 5;
	}

	updateSizeOnScreen();
});

// point 4 : making the color picker
colorEl.addEventListener('change', (e) => {
	color = e.target.value;
});

// point 5 : making the clear button
clearEl.addEventListener('click', () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// for editable size
const sizeSpan = document.getElementById('size');

sizeSpan.addEventListener('input', () => {
	const newSize = parseInt(sizeSpan.textContent.replace(/\D/g, ''), 10);

	if (!isNaN(newSize) && newSize >= 1 && newSize <= 50) {
		size = newSize;
		updateSizeOnScreen();
	}
});

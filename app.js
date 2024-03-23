const DEFAULT_COLOR = '#333333';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

const colorPicker = document.getElementById('colorPicker')
const colorBtn = document.getElementById('colorBtn')
const rainbowBtn = document.getElementById('rainbowBtn')
const clearBtn = document.getElementById('clearBtn')
const sizeValues = document.getElementById('sizeValues')
const sizeSlider = document.getElementById('sizeSlider')
const grid = document.querySelector('#grid');

colorPicker.oninput = (e) => setCurrentColor(e.target.value)
colorBtn.onclick = () => setCurrentMode('color')
rainbowBtn.onclick = () => setCurrentMode('rainbow')
clearBtn.onclick = () => reloadGrid()
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value)
sizeSlider.onchange = (e) => changeSize(e.target.value)

function setCurrentColor (newColor) {
    currentColor = newColor
}

function setCurrentMode (newMode) {
    toggleActive(newMode)
    currentMode = newMode
}

function setCurrentSize (newSize) {
    currentSize = newSize
}

function toggleActive (newMode) {
    switch (newMode) {
        case 'color':
            colorBtn.classList.add('active')
            rainbowBtn.classList.remove('active')
            break;
        case 'rainbow':
            colorBtn.classList.remove('active')
            rainbowBtn.classList.add('active')
            break;
    }
}

function updateSizeValue (value) {
    sizeValues.innerHTML = `${value} x ${value}`
}

function changeSize (value) {
    setCurrentSize(value)
    updateSizeValue(value)
    reloadGrid()
}

function reloadGrid () {
    clearGrid()
    createGrid(currentSize)
}

function clearGrid () {
    grid.innerHTML = ' '
}

function createGrid (numberPerRow) {
    const total = (numberPerRow * numberPerRow) + numberPerRow;
    const mod = numberPerRow + 1;
    const divWidth = grid.offsetWidth / numberPerRow;

    for (let i = 1; i < total; i++) {
        const div = document.createElement('div');
        div.classList.add('grid-element')

        if (i % mod === 0) {
            div.style.cssText = "border: 0; height: 0; width: 100%";
        } else {
            div.style.cssText = "border: 1px solid black;";
            div.style.width = `${divWidth}px`
            div.style.height = `${divWidth}px`
        }
        
        grid.appendChild(div);
    }
}

window.onload = () => {
    createGrid(DEFAULT_SIZE)
    toggleActive(DEFAULT_MODE)
}
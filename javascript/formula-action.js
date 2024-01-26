// adding blur event to cell for storing cell data to cell properties
for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
        const cell = document.querySelector(`.cell[data-row-id='${row}'][data-column-id='${column}']`)
        cell.addEventListener('blur', () => {
            const htmlEditedContent = cell.textContent
            setCellProperties(row, column, (prev) => ({ ...prev, value: htmlEditedContent }))
        })
    }
}

/**
 * 
 * @param {String} value 
 */
function evaluateValue(value) {
    const encodedFormula = value.split(" ");
    for (let i = 0; i < encodedFormula.length; i++) {
        const encoded = encodedFormula[i]
        const asciiValue = encoded.charCodeAt(0);
        if (65 <= asciiValue && 90 >= asciiValue) {
            const cellAddress = encoded;
            const { row, column } = getActiveCell(cellAddress)
            const { value } = getCellProperties(row, column)
            encodedFormula[i] = value;
        }
    }
    const decodedFormula = encodedFormula.join(" ")
    return eval(decodedFormula)
}

/**
 * 
 * @param {String} childAddress 
 */
function addChildToParent(parentAddress, childAddress) {
    const encodedFormula = parentAddress.split(" ");
    for (let i = 0; i < encodedFormula.length; i++) {
        const pAddress = encodedFormula[i]
        const asciiValue = pAddress.charCodeAt(0);
        if (65 <= asciiValue && 90 >= asciiValue) {
            const { row, column } = getActiveCell(pAddress)
            setCellProperties(row, column, (prev) => {
                prev.children.push(childAddress)
                return prev
            })
        }
    }
}

const formulaBar = document.querySelector('.formula-bar')
formulaBar.addEventListener('keydown', e => {
    try {
        if (e.key !== 'Enter' || formulaBar?.value.trim().length === 0) return
        const { cell, row, column } = getActiveCell(addressBar.value)
        setCellProperties(row, column, (prev) => ({ ...prev, formula: formulaBar.value }))
        cell.innerText = evaluateValue(formulaBar.value);
        addChildToParent(formulaBar.value, addressBar.value)
    } catch (e) {
        console.error(e)
    }
})

/**
 * 
 * @param {HTMLDivElement} cell 
 * @param {Number} row
 * @param {Number} column
 */
function setupInitialFormulaBarValue(cell, row, column) {
    cell.addEventListener('click', () => {
        const { formula } = getCellProperties(row, column)
        formulaBar.value = formula ?? '';
    })
}
for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
        const cell = document.querySelector(`.cell[data-row-id='${row}'][data-column-id='${column}']`)
        setupInitialFormulaBarValue(cell, row, column)
    }
}
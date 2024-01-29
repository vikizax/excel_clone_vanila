// adding blur event to cell for storing cell data to cell properties
for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
        const cell = document.querySelector(`.cell[data-row-id='${row}'][data-column-id='${column}']`)
        cell.addEventListener('blur', () => {
            const htmlEditedContent = cell.textContent

            const { value, formula } = getCellProperties(row, column)

            const currentActiveAddress = addressBar.value;

            if (htmlEditedContent === value) return;

            setCellProperties(row, column, (prev) => ({ ...prev, value: htmlEditedContent }))

            removeChildFromParent(formula, getCellAddress(row, column))

            setCellProperties(row, column, (prev) => ({ ...prev, formula: '' }))

            updateParentChildrenValue(currentActiveAddress)
        })
    }
}

/**
 * 
 * @param {String} value 
 * @returns {Number}
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
 * @param {String} childAddress 
 */
function addChildToParent(formula, childAddress) {
    const encodedFormula = formula.split(" ");
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

/**
 * 
 * @param {String} oldFormula 
 * @param {String} childAddress 
 */
function removeChildFromParent(oldFormula, childAddress) {
    const endcodedFormula = oldFormula.split(" ")
    for (let i = 0; i < endcodedFormula.length; i++) {
        const pAddress = endcodedFormula[i]
        const asciiValue = pAddress.charCodeAt(0)
        if (65 <= asciiValue && 90 >= asciiValue) {
            const { row, column } = getActiveCell(pAddress)
            const { children } = getCellProperties(row, column)
            const toRemoveIdx = children.indexOf(childAddress)
            if (toRemoveIdx === -1) continue
            setCellProperties(row, column, (prev) => {
                prev.children.splice(toRemoveIdx, 1)
                return prev
            })
        }
    }

}

/**
 * 
 * @param {String} parentAddress 
 */
function updateParentChildrenValue(parentAddress) {
    const { row, column } = getActiveCell(parentAddress)
    const { children } = getCellProperties(row, column);
    for (let i = 0; i < children.length; i++) {
        const pAddress = children[i];
        const { cell, row: cRow, column: cColumn } = getActiveCell(pAddress)
        const { formula } = getCellProperties(cRow, cColumn)
        const evaluatedValue = evaluateValue(formula);
        cell.innerText = evaluatedValue
        setCellProperties(cRow, cColumn, (prev) => ({ ...prev, value: evaluatedValue + '' }))
        updateParentChildrenValue(pAddress)
    }
}


formulaBar.addEventListener('keydown', e => {
    try {
        if (e.key !== 'Enter' || formulaBar?.value.trim().length === 0) return
        const { cell, row, column } = getActiveCell(addressBar.value)
        const { formula } = getCellProperties(row, column)

        if (formula !== formulaBar.value) removeChildFromParent(formula, addressBar.value)

        setCellProperties(row, column, (prev) => ({ ...prev, formula: formulaBar.value }))
        const evaluatedValue = evaluateValue(formulaBar.value);
        cell.innerText = evaluatedValue
        setCellProperties(row, column, (prev) => ({ ...prev, value: evaluatedValue + '' }))
        addChildToParent(formulaBar.value, addressBar.value)
        updateParentChildrenValue(addressBar.value)
    } catch (e) {
        console.error(e)
    }
})

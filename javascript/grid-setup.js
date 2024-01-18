/**
 * 
 * @param {HTMLDivElement} cell 
 * @param {Number} row
 * @param {Number} column
 */
function addAddressBarDisplayActionToCell(cell, row, column) {
    cell.addEventListener('click', () => {
        const valueToDisplay = `${String.fromCharCode(65 + column)}${row + 1}`;
        addressBar.value = valueToDisplay
    })
}

/**
 * @param {HTMLDivElement} cell
 * @param {Number} row 
 * @param {Number} column
 */
function setupInitialActionBtnStyleFromCellProperties(cell, row, column) {
    cell.addEventListener('click', () => {
        const { bold, italic, underline, alignment, fontSize, fontFamily, fontColor, BGColor } = getCellProperties(row, column)
        boldBtn.style.backgroundColor = bold ? ACTIVE_COLOR_PROP : IN_ACTIVE_COLOR_PROP
        italicBtn.style.backgroundColor = italic ? ACTIVE_COLOR_PROP : IN_ACTIVE_COLOR_PROP
        underlineBtn.style.backgroundColor = underline ? ACTIVE_COLOR_PROP : IN_ACTIVE_COLOR_PROP
        leftAlignBtn.style.backgroundColor = alignment === 'left' ? ACTIVE_COLOR_PROP : IN_ACTIVE_COLOR_PROP
        centerAlignBtn.style.backgroundColor = alignment === 'center' ? ACTIVE_COLOR_PROP : IN_ACTIVE_COLOR_PROP
        rightAlignBtn.style.backgroundColor = alignment === 'right' ? ACTIVE_COLOR_PROP : IN_ACTIVE_COLOR_PROP
        fontSizeSelect.value = fontSize.replace('px', '')
        fontFamilySelect.value = fontFamily
        fontColorInput.value = fontColor
        fontColorInputIcon.style.color = fontColor
        BGColorInputIcon.style.color = BGColor
    })
}

for (let i = 0; i < rows; i++) {
    let addressColumn = document.createElement('div')
    addressColumn.innerText = i + 1;
    addressColumn.setAttribute('class', 'address-column')
    addressColumnContainer.appendChild(addressColumn);
}

for (let i = 0; i < columns; i++) {
    let addressRow = document.createElement('div')
    addressRow.innerText = String.fromCharCode(65 + i);
    addressRow.setAttribute('class', 'address-row')
    addressRowContainer.appendChild(addressRow);
}

for (let row = 0; row < rows; row++) {
    const cellRowContainer = document.createElement('div')
    cellRowContainer.setAttribute('class', 'cell-row-container')
    for (let column = 0; column < columns; column++) {
        let cell = document.createElement('div')
        cell.setAttribute('class', 'cell')
        cell.setAttribute('contenteditable', 'true')
        cell.setAttribute('spellcheck', "false")
        cell.setAttribute('data-row-id', row)
        cell.setAttribute('data-column-id', column)
        addAddressBarDisplayActionToCell(cell, row, column)
        setupInitialActionBtnStyleFromCellProperties(cell, row, column)
        cellRowContainer.appendChild(cell)
    }
    cellsContainer.append(cellRowContainer)
}
const firstCell = document.querySelector('.cell')
firstCell.click()
/**
 * @param {String} address 
 * @returns {{row: Number,column: Number, cell: HTMLDivElement}}
 */
function getActiveCell(address) {
    let [column, row] = address.split('')
    column = column.charCodeAt() % 65
    row = +row - 1
    const cell = document.querySelector(`[data-row-id='${row}'][data-column-id='${column}']`)
    return { row, column, cell }
}

// adding listener to the proptery actions
boldBtn.addEventListener('click', () => {
    const { cell, column, row } = getActiveCell(addressBar.value)
    let props = getCellProperties(row, column)
    // cell property update
    setCellProperties(row, column, { ...props, bold: !props.bold })
    props = getCellProperties(row, column)
    // cell ui update
    cell.style.fontWeight = props.bold ? 'bold' : 'normal'
    boldBtn.style.backgroundColor = props.bold ? ACTIVE_COLOR_PROP : IN_ACTIVE_COLOR_PROP
})

italicBtn.addEventListener('click', () => {
    const { cell, column, row } = getActiveCell(addressBar.value)
    let props = getCellProperties(row, column)
    // cell property update
    setCellProperties(row, column, { ...props, italic: !props.italic })
    props = getCellProperties(row, column)
    // cell ui update
    cell.style.fontStyle = props.italic ? 'italic' : 'normal'
    italicBtn.style.backgroundColor = props.italic ? ACTIVE_COLOR_PROP : IN_ACTIVE_COLOR_PROP
})

underlineBtn.addEventListener('click', () => {
    const { cell, column, row } = getActiveCell(addressBar.value)
    let props = getCellProperties(row, column)
    // cell property update
    setCellProperties(row, column, { ...props, underline: !props.underline })
    props = getCellProperties(row, column)
    // cell ui update
    cell.style.textDecoration = props.underline ? 'underline' : 'normal'
    underlineBtn.style.backgroundColor = props.underline ? ACTIVE_COLOR_PROP : IN_ACTIVE_COLOR_PROP
})

leftAlignBtn.addEventListener('click', () => {
    const { cell, column, row } = getActiveCell(addressBar.value)
    let props = getCellProperties(row, column)
    // cell property update
    setCellProperties(row, column, { ...props, alignment: 'left' })
    props = getCellProperties(row, column)
    // cell ui update
    cell.style.textAlign = 'left'
    leftAlignBtn.style.backgroundColor = props.alignment === 'left' ? ACTIVE_COLOR_PROP : IN_ACTIVE_COLOR_PROP
    centerAlignBtn.style.backgroundColor = IN_ACTIVE_COLOR_PROP
    rightAlignBtn.style.backgroundColor = IN_ACTIVE_COLOR_PROP
})

centerAlignBtn.addEventListener('click', () => {
    const { cell, column, row } = getActiveCell(addressBar.value)
    let props = getCellProperties(row, column)
    // cell property update
    setCellProperties(row, column, { ...props, alignment: 'center' })
    props = getCellProperties(row, column)
    // cell ui update
    cell.style.textAlign = 'center'
    centerAlignBtn.style.backgroundColor = props.alignment === 'center' ? ACTIVE_COLOR_PROP : IN_ACTIVE_COLOR_PROP
    leftAlignBtn.style.backgroundColor = IN_ACTIVE_COLOR_PROP
    rightAlignBtn.style.backgroundColor = IN_ACTIVE_COLOR_PROP
})

rightAlignBtn.addEventListener('click', () => {
    const { cell, column, row } = getActiveCell(addressBar.value)
    let props = getCellProperties(row, column)
    // cell property update
    setCellProperties(row, column, { ...props, alignment: 'right' })
    props = getCellProperties(row, column)
    // cell ui update
    cell.style.textAlign = 'right'
    rightAlignBtn.style.backgroundColor = props.alignment === 'right' ? ACTIVE_COLOR_PROP : IN_ACTIVE_COLOR_PROP
    centerAlignBtn.style.backgroundColor = IN_ACTIVE_COLOR_PROP
    leftAlignBtn.style.backgroundColor = IN_ACTIVE_COLOR_PROP
})

fontSizeSelect.addEventListener('change', () => {
    const { cell, column, row } = getActiveCell(addressBar.value)
    let props = getCellProperties(row, column)
    // cell property update
    setCellProperties(row, column, { ...props, fontSize: fontSizeSelect.value })
    props = getCellProperties(row, column)
    // cell ui update
    cell.style.fontSize = props.fontSize + 'px'
})

fontFamilySelect.addEventListener('change', () => {
    const { cell, column, row } = getActiveCell(addressBar.value)
    let props = getCellProperties(row, column)
    // cell property update
    setCellProperties(row, column, { ...props, fontFamily: fontFamilySelect.value })
    props = getCellProperties(row, column)
    // cell ui update
    cell.style.fontFamily = props.fontFamily
})

fontColorInput.addEventListener('change', () => {
    const { cell, column, row } = getActiveCell(addressBar.value)
    let props = getCellProperties(row, column)
    // cell property update
    setCellProperties(row, column, { ...props, fontColor: fontColorInput.value })
    props = getCellProperties(row, column)
    // cell ui update
    cell.style.color = props.fontColor
    fontColorInputIcon.style.color = props.fontColor
})

BGColoerInput.addEventListener('change', () => {
    const { cell, column, row } = getActiveCell(addressBar.value)
    let props = getCellProperties(row, column)
    // cell property update
    setCellProperties(row, column, { ...props, BGColor: BGColoerInput.value })
    props = getCellProperties(row, column)
    // cell ui update
    cell.style.backgroundColor = props.BGColor
    BGColorInputIcon.style.color = props.BGColor
})
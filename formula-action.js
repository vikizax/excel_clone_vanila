// adding blur event to cell for storing cell data to cell properties
for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
        const cell = document.querySelector(`.cell[data-row-id='${row}'][data-column-id='${column}']`)
        cell.addEventListener('blur', () => {
            const htmlEditedContent = cell.textContent
            setCellProperties(row, column, (prev) => ({ ...prev, value: htmlEditedContent }))
            console.log({ current: getCellProperties(row, column) })
        })
    }
}
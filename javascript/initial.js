const rows = 100;
const columns = 26;

// grid selectors
const cellsContainer = document.querySelector('.cells-container')
const addressColumnContainer = document.querySelector('.address-column-container')
const addressRowContainer = document.querySelector('.address-row-container');
const addressBar = document.querySelector('.address-bar');



// cell properties action selectors
const boldBtn = document.querySelector('.bold')
const italicBtn = document.querySelector('.italic')
const underlineBtn = document.querySelector('.underline')
const fontSizeSelect = document.querySelector('.font-size-properties')
const fontFamilySelect = document.querySelector('.font-family-properties');
const fontColorInput = document.querySelector('.font-color-picker')
const BGColoerInput = document.querySelector('.cell-color-picker')
const alignment = document.querySelectorAll('.alignment');
const fontColorInputIcon = document.querySelector('.font-color-picker-container > span')
const BGColorInputIcon = document.querySelector('.cell-color-picker-container > span')

const leftAlignBtn = alignment[0];
const centerAlignBtn = alignment[1]
const rightAlignBtn = alignment[2];

const ACTIVE_COLOR_PROP = '#d1d8e0'
const IN_ACTIVE_COLOR_PROP = '#ecf0f1'


function createCellPropertiesStorage() {
    const cellsProperties = []

    // initialise all the cell with the default cell properties
    for (let row = 0; row < rows; row++) {
        const rowData = []
        for (let column = 0; column < columns; column++) {
            const cellProperties = {
                bold: false,
                italic: false,
                underline: false,
                alignment: 'left',
                fontFamily: 'monospace',
                fontSize: "14",
                fontColor: "#000000",
                BGColor: "#000000",
                value: ""
            }
            rowData.push(cellProperties)
        }
        cellsProperties.push(rowData)
    }

    /**
     * @typedef {Object} cellProperties
     * @property {Boolean} bold
     * @property {Boolean} italic
     * @property {Boolean} underline
     * @property {String} alignment
     * @property {String} fontFamily
     * @property {String} fontSize
     * @property {String} fontColor
     * @property {String} BGColor
     * @property {String} value
     */
    /**
     * @callback setterCallback
     * @param {cellProperties} previous
     * @returns {cellProperties}}
     */
    /**
     * 
     * @param {Number} row 
     * @param {Number} column 
     * @param {setterCallback | cellProperties} cb
     */
    function setter(row, column, cb) {
        if (typeof cb === 'function')
            cellsProperties[row][column] = cb(cellsProperties[row][column])
        else cellsProperties[row][column] = cb
    }

    return {
        /**
         * 
         * @param {Number} row 
         * @param {Number} column 
         * @returns {{ bold: Boolean,italic: Boolean,underline: Boolean,alignment: String,fontFamily: String,fontSize: String,fontColor: String,BGColor: String }}
         */
        getCellProperties: (row, column) => {
            return cellsProperties[row][column]
        },

        setCellProperties: setter
    }
}

const { getCellProperties, setCellProperties } = createCellPropertiesStorage()
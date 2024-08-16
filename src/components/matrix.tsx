import React from 'react';




interface Matrix {
    rowNames: string[];
    columnNames: string[];
    numRows: number;
    numColumns: number;
    values: number[][];
}

const theClassic: Matrix = {
    rowNames: ["% Body Weight Cals", "Kettlebell Swing", "Goblet Squat", "Kettlebell Clean and Press", "Burpee"],
    columnNames: ["1", "2", "3", "4", "5"],
    numRows: 5,
    numColumns: 5,
    values: [
        [50, 40, 30, 20, 10],
        [10, 50, 40, 30, 20],
        [20, 10, 50, 40, 30],
        [30, 20, 10, 50, 40],
        [40, 30, 20, 10, 50],
    ],
}

const getMaxValue = (matrix: Matrix) => {
    let max = 0;
    matrix.values.forEach(row => {
        row.forEach(value => {
            if (value > max) {
                max = value;
            }
        });
    });
    return max;
}

const getMinValue = (matrix: Matrix) => {
    let min = 1000000;
    matrix.values.forEach(row => {
        row.forEach(value => {
            if (value < min) {
                min = value;
            }
        });
    });
    return min;
}

const greyScale:string[] = [
    "#000000", // black
    "#080808",
    "#101010",
    "#181818",
    "#202020",
    "#282828",
    "#303030",
    "#383838",
    "#404040",
    "#484848",
    "#505050",
    "#585858",
    "#606060",
    "#686868",
    "#696969",
    "#707070",
    "#787878",
    "#808080",
    "#888888",
    "#909090",
    "#989898",
    "#A0A0A0",
    "#A8A8A8",
    "#A9A9A9",
    "#B0B0B0",
    "#B8B8B8",
    "#BEBEBE",
    "#C0C0C0",
    "#C8C8C8",
    "#D0D0D0",
    "#D3D3D3",
    "#D8D8D8",
    "#DCDCDC",
    "#E0E0E0",
    "#E8E8E8",
    "#F0F0F0",
    "#F5F5F5",
    // "#F8F8F8",
    // "#FFFFFF", // white
].reverse();

const getCellStyle = (value: number, maxValue: number, minValue: number): object => {
    const fractionOfMax = (value - minValue) / (maxValue - minValue); 
    let fontColor = "#000000"
    if (fractionOfMax > 0.6) {
        fontColor = "#FFFFFF";
    }


    // spread out the indexs to fit the greyScale array from end to end
    let colorIndex = Math.floor(fractionOfMax * greyScale.length);
    if (colorIndex === greyScale.length) {
        colorIndex = greyScale.length - 1;
    }
    
    return {
        backgroundColor: greyScale[colorIndex],
        width: "20vh",
        height: "20vh",
        color: fontColor,
        fontSize: "1.5em",
        opacity: 0.95,
    };
}


const MatrixBoard = () => {
    const matrix = theClassic;
    const maxValue = getMaxValue(matrix);
    const minValue = getMinValue(matrix);

    return (
        // margin is top and bottom, left and right
        <div style={{margin: "2% 5% 0 auto"}}>
        <table style={{margin: "0 auto"}} cellSpacing={0}>
            <thead>
                <tr>
                    <th>Movements | Rounds</th>
                    {matrix.columnNames.map((columnName, index) => <th key={index}>{columnName}</th>)}
                </tr>
            </thead>
            <tbody>
                {matrix.rowNames.map((rowName, rowIndex) => (
                    <tr key={rowIndex}>
                        <td>{rowName}</td>
                        {matrix.values.map((columnName, columnIndex) => (
                            <td
                                style={getCellStyle(matrix.values[rowIndex][columnIndex], maxValue, minValue)}
                                key={columnIndex}>
                                    {matrix.values[rowIndex][columnIndex]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
}

const MatrixHeading = () => {

    return (
        <div> 
            <h1 style={{ margin: "2% 2% auto" }}>The Matrix</h1>
        </div>
    )
}

const MatrixRules = () => {

    return (
        <div>
        <div style={{ margin: "2% 2% auto" }}> 
            <h3>Rules/Guidelines</h3>
        </div>
        <div style={{ margin: "auto", width: "30%", textAlign: "left" }}>
            <p>1. Pick an Erg (assault bike, ski-erg, row-erg).</p>
            <p>2. Pick a kettlebell (20% to 30% of body weight).</p>
            <p>3. Start your timer: 1 hour.</p>
            <p>4. Complete all rounds by going down each column, moving one cell at a time.</p>
        </div>
        </div>
    )
}
const MatrixContainer = () => {

    return (
        <div> 
            <MatrixHeading />
            <MatrixRules />
            <MatrixBoard />
        </div>
    )
}

export {MatrixContainer};
body {
    font-family: Arial, sans-serif;
    text-align: center;
    background-color: #f0f0f0;
}

h1 {
    color: #333;
}

#board {
    margin: 20px auto;
    border-collapse: collapse;
}

#board td {
    width: 100px;
    height: 100px;
    border: 2px solid #333;
    cursor: pointer;
    background-color: #fff;
}

#board td:hover {
    background-color: #ddd;
}

#hint {
    font-size: 20px;
    margin: 15px;
}

#turn {
    font-size: 18px;
}

#current-team {
    font-weight: bold;
    color: #d32f2f; /* 기본은 빨간 팀 색상 */
}

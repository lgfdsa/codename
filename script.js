// 단어 리스트
const words = [
    "사과", "강아지", "책", "나무", "바다", "고양이", "집", "햇빛", "달", "별",
    "꽃", "산", "강", "새", "비", "눈", "구름", "길", "문", "창문",
    "의자", "탁자", "시계", "전화", "컴퓨터"
];

// 게임 클래스
class Codenames {
    constructor() {
        this.board = this.shuffle(words).slice(0, 25);
        this.key = this.createKey();
        this.redLeft = 8;
        this.renderBoard();
        this.giveHint();
    }

    shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    createKey() {
        const key = ["빨강", "빨강", "빨강", "빨강", "빨강", "빨강", "빨강", "빨강",
                     "파랑", "파랑", "파랑", "파랑", "파랑", "파랑", "파랑", "파랑",
                     "민간인", "민간인", "민간인", "민간인", "민간인", "민간인", "민간인", "민간인",
                     "암살자"];
        return this.shuffle(key);
    }

    renderBoard() {
        const table = document.getElementById("board");
        table.innerHTML = "";
        for (let i = 0; i < 5; i++) {
            const row = document.createElement("tr");
            for (let j = 0; j < 5; j++) {
                const cell = document.createElement("td");
                cell.textContent = this.board[i * 5 + j];
                cell.addEventListener("click", () => this.guess(i * 5 + j));
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
    }

    giveHint() {
        const redWords = this.board.filter((_, idx) => this.key[idx] === "빨강");
        document.getElementById("hint").textContent = `${redWords[0]} ${this.redLeft}`;
    }

    guess(index) {
        const word = this.board[index];
        const type = this.key[index];
        const cell = document.getElementById("board").rows[Math.floor(index / 5)].cells[index % 5];

        if (type === "빨강") {
            cell.style.backgroundColor = "#f44336";
            this.redLeft--;
            document.getElementById("red-left").textContent = this.redLeft;
            alert(`${word}: 빨간 팀 요원입니다!`);
            if (this.redLeft === 0) alert("빨간 팀 승리!");
        } else if (type === "파랑") {
            cell.style.backgroundColor = "#2196f3";
            alert(`${word}: 파란 팀 요원입니다.`);
        } else if (type === "민간인") {
            cell.style.backgroundColor = "#ccc";
            alert(`${word}: 민간인입니다.`);
        } else if (type === "암살자") {
            cell.style.backgroundColor = "#000";
            alert(`${word}: 암살자입니다. 게임 오버!`);
        }

        this.giveHint();
    }
}

// 게임 시작
const game = new Codenames();

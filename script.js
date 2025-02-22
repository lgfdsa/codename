const words = [
    "사과", "강아지", "책", "나무", "바다", "고양이", "집", "햇빛", "달", "별",
    "꽃", "산", "강", "새", "비", "눈", "구름", "길", "문", "창문",
    "의자", "탁자", "시계", "전화", "컴퓨터"
];

class Codenames {
    constructor() {
        this.board = this.shuffle(words).slice(0, 25);
        this.key = this.createKey();
        this.redLeft = 8;
        this.blueLeft = 8;
        this.currentTeam = "빨강"; // 시작은 빨간 팀
        this.popupWindow = null; // 팝업 창 참조
        this.renderBoard();
        this.updateTurn();
        this.setupAnswerButton();
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

    updateTurn() {
        document.getElementById("current-team").textContent = this.currentTeam === "빨강" ? "빨간 팀" : "파란 팀";
        document.getElementById("current-team").style.color = this.currentTeam === "빨강" ? "#d32f2f" : "#2196f3";
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
            this.blueLeft--;
            document.getElementById("blue-left").textContent = this.blueLeft;
            alert(`${word}: 파란 팀 요원입니다!`);
            if (this.blueLeft === 0) alert("파란 팀 승리!");
        } else if (type === "민간인") {
            cell.style.backgroundColor = "#ccc";
            alert(`${word}: 민간인입니다.`);
        } else if (type === "암살자") {
            cell.style.backgroundColor = "#000";
            alert(`${word}: 암살자입니다. ${this.currentTeam === "빨강" ? "파란" : "빨간"} 팀 승리!`);
        }

        if (type !== this.currentTeam) {
            this.currentTeam = this.currentTeam === "빨강" ? "파랑" : "빨강";
        }
        this.updateTurn();
    }

    setupAnswerButton() {
        const button = document.getElementById("show-answers");
        let isShown = false;
        button.addEventListener("click", () => {
            if (!isShown) {
                this.showAnswersInPopup();
                button.textContent = "정답 숨기기";
                isShown = true;
            } else {
                this.hideAnswers();
                button.textContent = "정답 보기";
                isShown = false;
            }
        });
    }

    showAnswersInPopup() {
        if (this.popupWindow && !this.popupWindow.closed) {
            this.popupWindow.focus();
            return;
        }

        this.popupWindow = window.open("", "Codenames Answers", "width=300,height=300");
        let html = "<html><head><title>정답</title><style>table { border-collapse: collapse; margin: 20px auto; } td { width: 50px; height: 50px; border: 1px solid #333; }</style></head><body><table>";
        
        for (let i = 0; i < 5; i++) {
            html += "<tr>";
            for (let j = 0; j < 5; j++) {
                const type = this.key[i * 5 + j];
                let color = "";
                if (type === "빨강") color = "#f44336";
                else if (type === "파랑") color = "#2196f3";
                else if (type === "민간인") color = "#ccc";
                else if (type === "암살자") color = "#000";
                html += `<td style="background-color: ${color};"></td>`;
            }
            html += "</tr>";
        }
        
        html += "</table></body></html>";
        this.popupWindow.document.write(html);
        this.popupWindow.document.close(); // 문서 작성을 완료
    }

    hideAnswers() {
        if (this.popupWindow && !this.popupWindow.closed) {
            this.popupWindow.close();
            this.popupWindow = null;
        }
    }
}

const game = new Codenames();

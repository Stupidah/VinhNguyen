class Question {
    constructor(content, correctAnswer) {
        this.content = content;
        this.correctAnswer = correctAnswer;
    }

    checkAnswer(answer) {
        return answer.trim().toLowerCase() === this.correctAnswer.trim().toLowerCase();
    }
}

module.exports = Question;

const Question = require('../models/Question');

class QuestionController {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = -1;
        this.scores = {};
    }

    addQuestion(content, correctAnswer) {
        this.questions.push(new Question(content, correctAnswer));
    }

    getNextQuestion() {
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex < this.questions.length) {
            return this.questions[this.currentQuestionIndex];
        }
        return null;
    }

    checkAnswer(socketId, answer) {
        const currentQuestion = this.questions[this.currentQuestionIndex];
        const isCorrect = currentQuestion.checkAnswer(answer);
        if (isCorrect) {
            this.scores[socketId] = (this.scores[socketId] || 0) + 2;
        }
        return isCorrect;
    }
}

module.exports = new QuestionController();

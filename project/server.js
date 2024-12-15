const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const QuestionController = require('./controllers/questioncontroller');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
// res.sendfile('project\views\contestant.html');

const PORT = 3001;

app.use(express.static('public')); // Now 'app' is defined
app.get("/:universalURL", (_req, res) => {
    res.send("404 URL NOT FOUND");
 });
 app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'views/contestant.html'));
});

io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on('send_question', (data) => {
        QuestionController.addQuestion(data.content, data.answer);
        const nextQuestion = QuestionController.getNextQuestion();

        if (nextQuestion) {
            io.emit('new_question', { question: nextQuestion.content });
        }
    });

    socket.on('submit_answer', (data) => {
        const isCorrect = QuestionController.checkAnswer(socket.id, data.answer);
        socket.emit('answer_result', { result: isCorrect ? 'correct' : 'wrong' });
    });

    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});

  

server.listen(PORT, () => {
    console.log(`Quiz Bowl server running at http://localhost:${PORT}`);
  });
  
  app.listen(0, () => console.log('Application is running'));

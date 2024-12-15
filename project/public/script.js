const socket = io();

socket.on('new_question', (data) => {
    document.getElementById('question').innerText = data.question;
    document.getElementById('result').innerText = '';
});

socket.on('answer_result', (data) => {
    document.getElementById('result').innerText = `Kết quả: ${data.result}`;
});

function submitAnswer() {
    const answer = document.getElementById('answer').value;
    socket.emit('submit_answer', { answer });
    document.getElementById('answer').value = '';
}

const socket = io();

function sendQuestion() {
    const content = document.getElementById('content').value;
    const answer = document.getElementById('answer').value;

    if (!content || !answer) {
        alert('Vui lòng nhập câu hỏi và đáp án!');
        return;
    }

    socket.emit('send_question', { content, answer });
    document.getElementById('content').value = '';
    document.getElementById('answer').value = '';
}


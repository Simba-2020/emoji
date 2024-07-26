document.addEventListener('DOMContentLoaded', () => {
    const choices = document.querySelectorAll('.choice');
    const questions = document.querySelectorAll('.question');
    const result = document.getElementById('result');
    const correctSound = document.getElementById('correctSound');
    const incorrectSound = document.getElementById('incorrectSound');
    let currentQuestionIndex = 0;
    let answered = false;

    function showQuestion(index) {
        questions.forEach((q, i) => {
            q.classList.toggle('active', i === index);
        });
    }

    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex >= questions.length) {
            currentQuestionIndex = 0; // Loop back to the first question
        }
        answered = false; // Reset answer flag
        showQuestion(currentQuestionIndex);
    }

    function handleChoiceClick(e) {
        if (answered) {
            return;
        }

        const choice = e.target.closest('.choice');
        if (!choice) return; // Ignore clicks outside buttons

        const isCorrect = choice.getAttribute('data-correct') === 'true';

        // Remove previous feedback
        choices.forEach(c => c.classList.remove('correct', 'incorrect'));
        
        // Add feedback
        if (isCorrect) {
            choice.classList.add('correct');
            correctSound.play();
            answered = true;
            setTimeout(nextQuestion, 1000); // Move to next question after 1 second
        } else {
            choice.classList.add('incorrect');
            incorrectSound.play();
            setTimeout(() => {
                choice.classList.remove('incorrect'); // Reset feedback after 1 second
            }, 1000);
        }
    }

    choices.forEach(choice => {
        choice.addEventListener('click', handleChoiceClick);
    });

    // Initialize the first question
    showQuestion(currentQuestionIndex);
});

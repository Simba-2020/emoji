document.addEventListener('DOMContentLoaded', () => {
    const choices = document.querySelectorAll('.choice');
    const questions = Array.from(document.querySelectorAll('.question'));
    const result = document.getElementById('result');
    const correctSound = document.getElementById('correctSound');
    const incorrectSound = document.getElementById('incorrectSound');
    let currentQuestionIndex = 0;
    let answered = false;

    // Shuffle function
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    }

    // Shuffle the questions array
    const shuffledQuestions = shuffleArray(questions);

    function showQuestion(index) {
        shuffledQuestions.forEach((q, i) => {
            q.classList.toggle('active', i === index);
        });
    }

    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex >= shuffledQuestions.length) {
            currentQuestionIndex = 0; // Loop back to the first question
        }
        answered = false; // Reset answer flag
        showQuestion(currentQuestionIndex);
    }

    function playSound(sound) {
        sound.currentTime = 0; // Reset playback position
        sound.play(); // Play sound
    }

    function triggerConfetti() {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.5 } // Adjust position as needed
        });
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
            playSound(correctSound);
			/*
            triggerConfetti(); // Trigger confetti effect
			*/
            answered = true;
            setTimeout(nextQuestion, 1000); // Move to next question after 1 second
        } else {
            choice.classList.add('incorrect');
            playSound(incorrectSound);
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

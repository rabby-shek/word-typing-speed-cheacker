if(window.innerWidth < 768){
    alert("Please open in pc");
    return;
}
const typingText = document.querySelector(".typing-text p"),
    inputField = document.querySelector(".input-field"),
    mistakeTag = document.querySelector('.mistakes span'),
    timeTag = document.querySelector(".time span b"),
    wpmTag = document.querySelector(".WPM span"),
    cpmTag = document.querySelector(".CPM span"),
    tryAgainBtn = document.querySelector("#tryAgainBtn");

let timer,
    charIndex = 0,
    mistakes = 0,
    maxTime = 60,
    timeLeft = maxTime,
    isTyping = false;

function generateRandomParagraph() {
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[randomIndex].split("").forEach(letter => {
        let spanTag = `<span>${letter}</span>`;
        typingText.innerHTML += spanTag;
    });
    document.addEventListener('keydown', () => inputField.focus());
    document.addEventListener('click', () => inputField.focus());
}

function initTyping() {
    const character = typingText.querySelectorAll('span');
    let typedCharacter = inputField.value.split("")[charIndex];
    if (charIndex < character.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }

        if (typedCharacter == null) {
            if (charIndex > 0) {
                charIndex--;
                if (character[charIndex].classList.contains('incorrect')) {
                    mistakes--;
                }
                character[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if (character[charIndex].innerText === typedCharacter) {
                character[charIndex].classList.add("correct");
            } else {
                mistakes++;
                character[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }

        character.forEach(span => span.classList.remove('active'));
        if (charIndex < character.length) {
            character[charIndex].classList.add('active');
        }

        let timeSpent = maxTime - timeLeft;
        let wordsTyped = (charIndex - mistakes) / 5;
        let wpm = timeSpent > 0 ? Math.round((wordsTyped / timeSpent) * 60) : 0;
        wpm = isFinite(wpm) && wpm > 0 ? wpm : 0;

        mistakeTag.innerHTML = mistakes;
        cpmTag.innerText = charIndex - mistakes;
        wpmTag.innerText = wpm;
    } else {
        inputField.value = "";
        clearInterval(timer);
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerHTML = timeLeft;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    generateRandomParagraph();
    timeLeft = maxTime;
    charIndex = mistakes = 0;
    isTyping = false;
    inputField.value = "";
    mistakeTag.innerHTML = mistakes;
    cpmTag.innerText = 0;
    wpmTag.innerText = 0;
    timeTag.innerHTML = timeLeft;
    clearInterval(timer);
}

generateRandomParagraph();
inputField.addEventListener('input', initTyping);
tryAgainBtn.addEventListener('click', resetGame);

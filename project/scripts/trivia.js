const questions = [
    { category: "movies", prompt: "In 'Back to the Future', what speed must the DeLorean reach to time‑travel?", correct: "88 mph", incorrect: ["77 mph", "99 mph", "120 mph"] },
    { category: "movies", prompt: "Who directed the blockbuster film “Jurassic Park”?", correct: "Steven Spielberg", incorrect: ["James Cameron", "George Lucas", "Ridley Scott"]},
    { category: "movies", prompt: "Heath Ledger won a posthumous Oscar for playing the Joker in which movie?", correct: "The Dark Knight", incorrect: ["Batman Begins", "Joker", "Suicide Squad"]},
    { category: "movies", prompt: "In what year was the original “Star Wars” film released?", correct: "1977", incorrect: ["1975", "1980", "1983"]},

    { category: "music", prompt: "Which band released the album 'Dark Side of the Moon'?", correct: "Pink Floyd", incorrect: ["Led Zeppelin", "Queen", "The Beatles"] },
    { category: "music", prompt: "Which artist is nicknamed the “Queen of Pop” and released the album “Like a Prayer”?", correct: "Madonna", incorrect: ["Whitney Houston", "Cyndi Lauper", "Janet Jackson"]},
    { category: "music", prompt: "Freddie Mercury was the lead vocalist of which rock band?", correct: "Queen", incorrect: ["The Who", "U2", "Genesis"]},
    { category: "music", prompt: "“Smells Like Teen Spirit” is a hit song by which grunge band?", correct: "Nirvana", incorrect: ["Pearl Jam", "Soundgarden", "Alice in Chains"]},
    
    { category: "science", prompt: "What planet is known as the Red Planet?", correct: "Mars", incorrect: ["Venus", "Jupiter", "Mercury"] },
    { category: "science", prompt: "Which gas do plants absorb from the atmosphere during photosynthesis?", correct: "Carbon dioxide", incorrect: ["Oxygen", "Nitrogen", "Hydrogen"]},
    { category: "science", prompt: "Who proposed the theory of general relativity?", correct: "Albert Einstein", incorrect: ["Isaac Newton", "Niels Bohr", "Galileo Galilei"]},
    { category: "science", prompt: "What is the chemical symbol for gold?", correct: "Au", incorrect: ["Ag", "Pb", "Gd"]},
    
    { category: "tech", prompt: "Who is credited with inventing the World Wide Web?", correct: "Tim Berners‑Lee", incorrect: ["Bill Gates", "Steve Jobs", "Vint Cerf"] },
    { category: "tech", prompt: "In what year did Apple release the first iPhone?", correct: "2007", incorrect: ["2005", "2008", "2010"]},
    { category: "tech", prompt: "The acronym “HTTP” stands for what?", correct: "HyperText Transfer Protocol", incorrect: ["High‑Tech Text Platform", "Hyperlink Transmission Program", "Home Terminal Transfer Process"]},
    { category: "tech", prompt: "Which company manufactures the Nintendo Switch console?", correct: "Nintendo", incorrect: ["Sony", "Microsoft", "Sega"]},

    { category: "history", prompt: "In which year did the Berlin Wall fall?", correct: "1989", incorrect: ["1991", "1987", "1990"] },
    { category: "history", prompt: "Who was the first President of the United States?", correct: "George Washington", incorrect: ["Thomas Jefferson", "John Adams", "Abraham Lincoln"]},
    { category: "history", prompt: "The Renaissance began in which European country?", correct: "Italy", incorrect: ["France", "Spain", "Germany"]},
    { category: "history", prompt: "Which war was fought between North and South in the United States from 1861 to 1865?", correct: "American Civil War", incorrect: ["War of 1812", "Mexican–American War", "World War I"]},
    
    { category: "geography", prompt: "What is the largest ocean on Earth?", correct: "Pacific Ocean", incorrect: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean"] },
    { category: "geography", prompt: "What is the capital city of Canada?", correct: "Ottawa", incorrect: ["Toronto", "Vancouver", "Montreal"]},
    { category: "geography", prompt: "Mount Kilimanjaro is located in which country?", correct: "Tanzania", incorrect: ["Kenya", "Uganda", "Ethiopia"]},
    { category: "geography", prompt: "Which river is the longest in South America?", correct: "Amazon River", incorrect: ["Paraná River", "Orinoco River", "Magdalena River"]}
];


const categorySelect = document.querySelector("#categorySelect");
const startBtn = document.querySelector("#startBtn");
const setup = document.querySelector("#setup");
const card = document.querySelector("#questionCard");
const questionText = document.querySelector("#questionText");
const answersList = document.querySelector("#answers");
const feedback = document.querySelector("#feedback");
const nextBtn = document.querySelector("#nextBtn");
const scoreEl = document.querySelector("#score");
const progressEl = document.querySelector("#progress");

let deck = [];
let current = 0;
let score = 0;

function populateCategories() {
    const cats = [...new Set(questions.map(q => q.category))];
    categorySelect.innerHTML = cats.map(c => `<option value="${c}">${c.charAt(0).toUpperCase() + c.slice(1)}</option>`).join("");
}
populateCategories();

startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", () => showQuestion(++current));

function startGame() {
    const cat = categorySelect.value;
    deck = shuffle(questions.filter(q => q.category === cat));
    if (!deck.length) { alert("No questions for that category."); return; }
    current = 0;
    score = 0;
    scoreEl.textContent = `Score ${score}`;
    setup.hidden = true;
    card.hidden = false;
    showQuestion(current);
}

function showQuestion(index) {
    if (index >= deck.length) { endGame(); return; }
    const q = deck[index];
    questionText.textContent = q.prompt;
    progressEl.textContent = `Q ${index + 1}/${deck.length}`;
    feedback.textContent = "";
    answersList.innerHTML = shuffle([q.correct, ...q.incorrect]).map(a => `<li><button class="answer">${a}</button></li>`).join("");
    answersList.querySelectorAll("button").forEach(b => b.addEventListener("click", () => checkAnswer(b, q.correct)));
    nextBtn.hidden = true;
}

function checkAnswer(btn, correct) {
    const right = btn.textContent === correct;
    btn.classList.add(right ? "correct" : "wrong");
    score += right ? 1 : 0;
    scoreEl.textContent = `Score ${score}`;
    feedback.textContent = right ? "Correct" : "Wrong";
    answersList.querySelectorAll("button").forEach(b => b.disabled = true);
    nextBtn.hidden = false;
}

function endGame() {
    feedback.textContent = `Game over. You scored ${score}/${deck.length}`;
    nextBtn.hidden = true;
    setup.hidden = false;
    card.hidden = true;
    const best = Number(localStorage.getItem("highScore") || 0);
    if (score > best) localStorage.setItem("highScore", score);
}

function shuffle(a) { return [...a].sort(() => Math.random() - 0.5); }

let allQuestions = [];

async function loadQuestions() {

    const response =
    await fetch("questions.json");

    const questions =
    await response.json();

    allQuestions = questions;

    loadFeaturedQuestion(questions);

    renderQuestions(questions);

    setupSearch();

    setupFilters();
}

function loadFeaturedQuestion(questions){

    const featured =
    questions[0];

    document.getElementById(
    "featured-question"
    ).innerHTML = `

    <div class="featured-card">

        <span class="badge">

            ${featured.category}

        </span>

        <h2>

            ${featured.title}

        </h2>

        <p>

            ${featured.description}

        </p>

        <a href="post.html?id=${featured.id}"
        class="read-btn">

            Read More →

        </a>

    </div>
    `;
}

function renderQuestions(questions){

    const container =
    document.getElementById(
    "questions-container"
    );

    container.innerHTML = "";

    questions.forEach(question => {

        container.innerHTML += `

        <div class="question-card">

            <div class="card-top">

                <span class="badge">

                    ${question.category}

                </span>

                <span class="date">

                    ${question.date}

                </span>

            </div>

            <h3>

                ${question.title}

            </h3>

            <p>

                ${question.description}

            </p>

            <a href="post.html?id=${question.id}"
            class="read-btn">

                Read More →

            </a>

        </div>
        `;
    });
}

function setupSearch(){

    const search =
    document.getElementById(
    "searchInput"
    );

    search.addEventListener(
    "input",
    e => {

        const value =
        e.target.value.toLowerCase();

        const filtered =
        allQuestions.filter(q =>

            q.title.toLowerCase()
            .includes(value)

            ||

            q.description.toLowerCase()
            .includes(value)

        );

        renderQuestions(filtered);

    });
}

function setupFilters(){

    const buttons =
    document.querySelectorAll(
    ".filter-btn"
    );

    buttons.forEach(btn => {

        btn.addEventListener(
        "click",
        () => {

            document
            .querySelector(".active")
            ?.classList.remove("active");

            btn.classList.add("active");

            const category =
            btn.dataset.category;

            if(category === "All"){

                renderQuestions(allQuestions);

                return;
            }

            const filtered =
            allQuestions.filter(q =>

                q.category === category
            );

            renderQuestions(filtered);

        });
    });
}

loadQuestions();


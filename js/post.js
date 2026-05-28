
async function loadPost() {

    const params =
    new URLSearchParams(window.location.search);

    const id =
    parseInt(params.get("id"));

    const container =
    document.getElementById("post-container");

    try {

        const response =
        await fetch("questions.json");

        const questions =
        await response.json();

        const question =
        questions.find(q => q.id === id);

        if (!question) {

            container.innerHTML =
            "<h2>Question not found</h2>";

            return;
        }

        container.innerHTML = `

            <div class="question-category">

                ${question.category}

            </div>

            <h1>

                ${question.title}

            </h1>

            <p class="question-date">

                ${question.date}

            </p>

            <div class="post-content">

                ${question.content}

            </div>

            <br><br>

            <a href="index.html"
            class="btn-primary">

                ← Back to Home

            </a>
        `;

    } catch (error) {

        console.error(error);

        container.innerHTML =
        "<h2>Failed to load post</h2>";
    }
}

loadPost();

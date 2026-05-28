
async function loadPost(){

    const params =
    new URLSearchParams(
        window.location.search
    );

    const id =
    parseInt(params.get("id"));

    const response =
    await fetch("questions.json");

    const questions =
    await response.json();

    const question =
    questions.find(q => q.id === id);

    const container =
    document.getElementById(
    "post-container"
    );

    if(!question){

        container.innerHTML =
        "<h2>Question not found</h2>";

        return;
    }

    container.innerHTML = `

    <span class="badge">

        ${question.category}

    </span>

    <h1>

        ${question.title}

    </h1>

    <p class="post-date">

        ${question.date}

    </p>

    <div class="post-content">

        ${question.content}

    </div>

    <a href="index.html"
    class="back-btn">

        ← Back

    </a>
    `;
}

loadPost();


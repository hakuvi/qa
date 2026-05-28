```javascript id="95fx3i"
async function loadQuestions() {

    const container =
    document.getElementById("questions-container");

    try {

        const response =
        await fetch("questions.json");

        if (!response.ok) {

            throw new Error(
                "Unable to load questions"
            );
        }

        const questions =
        await response.json();

        container.innerHTML = "";

        questions.forEach(question => {

            const card =
            document.createElement("div");

            card.className = "product-card";

            card.innerHTML = `

                <div class="question-category">

                    ${question.category}

                </div>

                <h3>

                    ${question.title}

                </h3>

                <p>

                    ${question.description}

                </p>

                <div class="question-footer">

                    <span class="question-date">

                        ${question.date}

                    </span>

                    <a href="${question.page}"
                    class="btn-secondary">

                        Read More

                    </a>

                </div>
            `;

            container.appendChild(card);

        });

    } catch (error) {

        console.error(error);

        container.innerHTML = `

            <div class="error-message">

                Failed to load questions.

            </div>
        `;
    }
}

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadQuestions();

    }
);
```

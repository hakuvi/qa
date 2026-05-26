async function loadProducts() {

    const container = document.getElementById("product-list");

    try {

        const response = await fetch("./product.json");

        if (!response.ok) {
            throw new Error("Unable to load products");
        }

        const products = await response.json();

        container.innerHTML = "";

        products.forEach(product => {

            const card = document.createElement("div");

            card.className = "product-card";

            card.innerHTML = `
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">₹${product.price}</p>
                <a href="product.html?id=${product.id}" class="btn-secondary">
                    View Details
                </a>
            `;

            container.appendChild(card);

        });

    } catch (error) {

        console.error("Error loading products:", error);

        container.innerHTML = `
            <div class="error-message">
                Failed to load products.
            </div>
        `;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
});

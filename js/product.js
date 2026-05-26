async function loadProduct() {

    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));

    try {

        const res = await fetch("product.json");

        if (!res.ok) {
            throw new Error("Failed to load products");
        }

        const products = await res.json();

        const product = products.find(
            p => p.id === id
        );

        if (!product) {

            document.querySelector(".product-container").innerHTML =
                "<h2>Product not found</h2>";

            return;
        }

        document.getElementById("product-name").innerText =
            product.name;

        document.getElementById("product-price").innerText =
            "₹" + product.price;

        document.getElementById("product-description").innerText =
            product.description;

        document.getElementById("product-image").src =
            "images/" + product.image;

        document.getElementById("buy-btn").href =
            `checkout.html?id=${product.id}`;

    } catch (error) {

        console.error(error);

        document.querySelector(".product-container").innerHTML =
            "<h2>Failed to load product</h2>";
    }
}

loadProduct();

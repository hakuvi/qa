async function loadProduct() {

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  try {

    const res = await fetch(`/api/products/${id}`);
    const product = await res.json();

    document.getElementById("product-name").innerText = product.name;
    document.getElementById("product-price").innerText = "₹" + product.price;
    document.getElementById("product-description").innerText = product.description;

    document.getElementById("product-image").src = "images/" + product.image;

    // ✅ ONLY SEND ID (SECURE)
    document.getElementById("buy-btn").href =
      `checkout.html?id=${product.id}`;

  } catch (error) {
    console.error(error);
  }

}

loadProduct();
const express = require("express");
const path = require("path");
const fs = require("fs");


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------- STATIC ---------- */

app.use(express.static(path.join(__dirname)));


/* ---------- USERS ---------- */

let users = [];
if (fs.existsSync("users.json")) {

users = JSON.parse(
fs.readFileSync("users.json", "utf8")
);

}

// REGISTER
app.post("/register", (req, res) => {

const { username, email, password } = req.body;

if (!username || !email || !password) {
return res.json({ success: false });
}

const userExists = users.find(
u => u.username === username
);

if (userExists) {
return res.json({
success: false,
message: "User exists"
});
}

users.push({
username,
email,
password
});

fs.writeFileSync(
"users.json",
JSON.stringify(users, null, 2)
);

res.json({ success: true });

});



// LOGIN

app.post("/login", (req, res) => {

const { username, password } = req.body;


// reload users from file every login

let users = [];

if (fs.existsSync("users.json")) {

users = JSON.parse(
fs.readFileSync("users.json", "utf8")
);

}


const user = users.find(
u =>
u.username === username &&
u.password === password
);


if(user){

res.json({ success: true });

}else{

res.json({ success: false });

}

});

/* ---------- PRODUCTS ---------- */

const products = JSON.parse(
  fs.readFileSync("product.json", "utf8")
);


// all products
app.get("/api/products", (req, res) => {
  res.json(products);
});


// product by id
app.get("/api/products/:id", (req, res) => {

  const product =
    products.find(p => p.id == req.params.id);

  if (!product) {
    return res.status(404).json({
      error: "Product not found"
    });
  }

  res.json(product);

});


/* ---------- HOME ---------- */

app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "index.html")
  );
});


/* ---------- SERVER ---------- */

app.listen(PORT, () => {
  console.log(
    `Server running at http://localhost:${PORT}`
  );
});

/* ---------- RAZORPAY PAYMENT ---------- */

const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
  key_id: "YOUR_KEY_ID",
  key_secret: "YOUR_KEY_SECRET"
});


// CREATE ORDER (SECURE)
app.post("/create-order", async (req, res) => {

  try {

    const { productId } = req.body;

    // get product from backend (SECURE)
    const product = products.find(p => p.id == productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const options = {
      amount: product.price * 100, // paise
      currency: "INR",
      receipt: "receipt_" + Date.now()
    };

    const order = await razorpay.orders.create(options);

    res.json({
      order,
      product
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating order");
  }

});


// VERIFY PAYMENT
app.post("/verify-payment", (req, res) => {

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  } = req.body;

  const generated_signature = crypto
    .createHmac("sha256", "YOUR_KEY_SECRET")
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generated_signature === razorpay_signature) {
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }

});
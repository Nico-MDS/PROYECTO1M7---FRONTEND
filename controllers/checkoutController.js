// controllers/checkoutController.js
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Cart = require("../models/cartModel");

exports.createCheckoutSession = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "El carrito está vacío" });
    }

    const line_items = cart.items.map(item => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product.programType.toUpperCase(), // o usa title si lo agregas
        },
        unit_amount: item.product.price * 100, // convertir a centavos
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
      customer_email: req.user.email,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    res.status(500).json({ message: "Error al crear sesión de pago", error: error.message });
  }
};

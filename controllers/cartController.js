const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

// GET /api/cart
exports.getCart = async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) return res.status(200).json({ items: [] }); // carrito vacío

    return res.json(cart);
  } catch (err) {
    return res.status(500).json({ message: 'Error al obtener el carrito', error: err.message });
  }
};

// POST /api/cart/add
exports.addToCart = async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ message: 'Faltan campos requeridos' });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ product: productId, quantity }]
      });
    } else {
      const itemIndex = cart.items.findIndex((item) => item.product.equals(productId));
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
      await cart.save();
    }

    const updatedCart = await Cart.findOne({ user: userId }).populate('items.product');
    return res.status(200).json(updatedCart);
  } catch (err) {
    return res.status(500).json({ message: 'Error al agregar al carrito', error: err.message });
  }
};

// DELETE /api/cart/remove/:productId
exports.removeFromCart = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

    cart.items = cart.items.filter((item) => !item.product.equals(productId));
    await cart.save();

    const updatedCart = await Cart.findOne({ user: userId }).populate('items.product');
    return res.status(200).json({ message: 'Producto eliminado del carrito', items: updatedCart.items });
  } catch (err) {
    return res.status(500).json({ message: 'Error al eliminar del carrito', error: err.message });
  }
};

// DELETE /api/cart/clear
exports.clearCart = async (req, res) => {
  const userId = req.user._id;

  try {
    await Cart.findOneAndDelete({ user: userId });
    return res.status(200).json({ message: 'Carrito eliminado' });
  } catch (err) {
    return res.status(500).json({ message: 'Error al vaciar el carrito', error: err.message });
  }
};

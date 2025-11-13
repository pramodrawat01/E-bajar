import Order from "../Schemas/OrderSchema.js";
import Product from "../Schemas/ProductSchema.js";
import Cart from "../Schemas/Cart.js";
import jwt from "jsonwebtoken";

export async function addOrder(req, res) {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Please login first" });

    const decoded = jwt.verify(token, process.env.secret_key);

    console.log("token verified here 01")
    const { products, totalAmount, deliveryAddress } = req.body;

    if (!deliveryAddress) {
      return res.status(400).json({ message: "Delivery address is required" });
    }

    console.log("delivery add not found 02")

    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product ${item.productId} not found` });
      }

      console.log("one product not found 03")

      if (product.productCount < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.productName}. Available: ${product.productCount}, Requested: ${item.quantity}`,
        });

        
      }

      console.log("out of stock product 04")

      product.productCount -= item.quantity;
      await product.save();
    }


    console.log("all good here 05")
    const order = new Order({
      userId: decoded.id,
      products,
      totalAmount,
      deliveryAddress,
    });

    await order.save();

    await Cart.findOneAndDelete({ userId: decoded.id });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export async function getOrder(req, res) {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Please login first" });

    const decoded = jwt.verify(token, process.env.secret_key);

    const orders = await Order.find({ userId: decoded.id }).populate(
      "products.productId"
    );
    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

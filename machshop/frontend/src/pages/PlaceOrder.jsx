import React, { useContext, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const { navigate, backendUrl, cartItems, setCartItems, products } =
    useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const sendWhatsAppMessage = (orderItems) => {
    let itemDetails = "";
    orderItems.forEach((item, index) => {
      const imageUrl = `${backendUrl}/images/${item.image}`;
      itemDetails += `*${index + 1}. ${item.name}*\nSize: ${item.size}\nQty: ${
        item.quantity
      }\nImage: ${imageUrl}\n\n`;
    });

    const customerDetails = `*New Order Received*\n\n*Customer Details:*\nName: ${formData.firstName} ${formData.lastName}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nAddress: ${formData.street}, ${formData.city}, ${formData.state}, ${formData.zipcode}, ${formData.country}\n\n`;

    const fullMessage = `${customerDetails}*Order Items:*\n${itemDetails}`;

    const encodedMessage = encodeURIComponent(fullMessage);
    const phoneNumber = "916366542135";

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank"
    );
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let orderItems = [];

      for (const productId of Object.keys(cartItems)) {
        const product = products.find((p) => p._id === productId);
        if (!product) continue;

        const sizes = cartItems[productId];
        for (const size in sizes) {
          const quantity = sizes[size];
          if (quantity > 0) {
            orderItems.push({
              _id: product._id,
              name: product.name,
              size,
              quantity,
              image: product.image,
            });
          }
        }
      }

      if (orderItems.length === 0) {
        toast.error("No valid items in cart");
        return;
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: 0,
      };

      const response = await axios.post(
        `${backendUrl}/api/order/place`,
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setCartItems({});
        sendWhatsAppMessage(orderItems);
        toast.success("Order placed successfully!");
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("SUBMIT ERROR:", error);
      toast.error("Failed to place order");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-20 sm:pt-24 min-h-[80vh] border-t"
    >
      {/* Left Side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className="border border-gray-300 text-black rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First name"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            className="border border-gray-300 text-black rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          className="border border-gray-300 text-black rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email address"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          className="border border-gray-300 text-black rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            className="border border-gray-300 text-black rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
          />
          <input
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            className="border border-gray-300 text-black rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            className="border border-gray-300 text-black rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Zipcode"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            className="border border-gray-300 text-black rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          className="border border-gray-300 text-black rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Phone"
        />
      </div>

      {/* Right Side */}
      <div className="mt-8">
        <div className="mt-12">
          <Title text1={"ORDER"} text2={"NOW"} />
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;

import React from "react";

const ProductCard = ({ product, addToCart }) => {
  const { name, description, price, images } = product;

  const imageUrl =
    images && images.length > 0
      ? images[0].secure_url
      : "https://via.placeholder.com/400x300?text=No+Image";

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col h-[600px]">
      <div className="flex-grow overflow-hidden rounded-md mb-3">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full bg-gray-100 object-cover object-top rounded-md"
        />
      </div>

      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-sm text-gray-600 mb-2">{description}</p>

      <div className="flex items-center justify-between mt-auto">
        <button
          onClick={() => addToCart(product)}
          className="bg-blue-500 text-white py-1.5 px-3 rounded hover:bg-blue-600 transition text-sm"
        >
          অর্ডার করুন
        </button>
        <p className="text-blue-700 font-extrabold text-xl">৳ {price}</p>
      </div>
    </div>
  );
};

export default ProductCard;

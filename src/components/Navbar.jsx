import { useState, useEffect } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { RiMenu2Line } from "react-icons/ri";
import { GiShoppingBag } from "react-icons/gi";
import { AiOutlineClose, AiOutlineDelete } from "react-icons/ai";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCategoryFilter = (subCategory) => {
    setMenuOpen(false);
    navigate(`/products?subcategory=${encodeURIComponent(subCategory)}`);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className={`z-50 w-full transition-all duration-300 ${isSticky
        ? "fixed top-0 left-0 bg-white shadow-md"
        : "relative bg-transparent"
        }`}>
        <div className="max-w-[1520px] mx-auto px-4">
          <div className="flex items-center justify-between text-black py-4 relative">
            {/* Left Icons */}
            <div className="flex items-center gap-6">
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => setMenuOpen(true)}
              >
                <RiMenu2Line className="text-2xl" />
                <span className="text-sm">Menu</span>
              </div>
              <div className="flex items-center gap-1 cursor-pointer">
                <FaSearch className="text-xl" />
                <span className="text-sm">Search</span>
              </div>
            </div>

            {/* Logo */}
            <Link to={'/'}>
              <div className="text-2xl font-bold">MyShop</div>
            </Link>

            {/* Right Icons */}
            <div className="flex items-center gap-6">
              <Link to="/productPage">
                <div className="flex items-center gap-1 cursor-pointer">
                  <GiShoppingBag className="text-2xl" />
                  <span className="text-sm">Shop</span>
                </div>
              </Link>
              <div
                className="flex items-center gap-1 cursor-pointer relative"
                onClick={() => setCartOpen(true)}
              >
                <FaShoppingCart className="text-2xl" />
                <span className="text-sm">Cart</span>
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar Menu */}
      <div className={`fixed top-0 left-0 h-full w-96 bg-white shadow-md transform transition-transform duration-300 z-50 ${menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-2xl hover:text-red-500"
          >
            <AiOutlineClose />
          </button>
        </div>
        <div className="p-4">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="font-medium text-left w-full"
          >
            Women Clothing
          </button>
          {dropdownOpen && (
            <ul className="pl-6 mt-4 space-y-4 text-gray-700">
              <li
                className="cursor-pointer hover:underline"
                onClick={() => handleCategoryFilter("Jamdhani Sharee")}
              >
                Jamdhani Sharee
              </li>
              <li
                className="cursor-pointer hover:underline"
                onClick={() => handleCategoryFilter("Three Pieces")}
              >
                Three Pieces
              </li>
              <li
                className="cursor-pointer hover:underline"
                onClick={() => handleCategoryFilter("Unstitched Party Dress")}
              >
                Unstitched Party Dress
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Sidebar Cart */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-md flex flex-col transition-transform duration-300 z-50 ${cartOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Cart</h2>
          <button
            onClick={() => setCartOpen(false)}
            className="text-2xl hover:text-red-500"
          >
            <AiOutlineClose />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="p-4 space-y-4 overflow-y-auto flex-grow">
          {cartItems.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item._id} className="flex items-center gap-4">
                <img
                  src={item.image || "https://via.placeholder.com/100x100?text=No+Image"}
                  alt={item.name}
                  className="w-full max-w-[100px] h-28 object-cover rounded-md"
                />
                <div className="flex flex-col flex-grow text-left">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() =>
                        updateQuantity(item._id, Math.max(1, item.quantity - 1))
                      }
                      className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                    >
                      −
                    </button>
                    <span className="font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right font-bold text-blue-700 text-xl min-w-[80px]">
                  ৳ {item.price * item.quantity}
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="ml-2 text-red-600 hover:text-red-800"
                  aria-label="Remove item"
                >
                  <AiOutlineDelete size={24} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Subtotal & Actions */}
        <div className="p-4 border-t border-gray-300">
          <div className="flex justify-between font-semibold text-lg mb-4">
            <span>Subtotal:</span>
            <span>৳ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex gap-4">
            <button
              onClick={clearCart}
              className="flex-grow bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
            >
              Clear All
            </button>
            <button
              onClick={() => {
                setCartOpen(false);
                navigate("/checkout");
              }}
              className="flex-grow bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {(menuOpen || cartOpen) && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-40"
          onClick={() => {
            setMenuOpen(false);
            setCartOpen(false);
          }}
        ></div>
      )}
    </div>
  );
}

export default Navbar;

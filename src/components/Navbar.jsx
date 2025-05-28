import { useState, useEffect } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { RiMenu2Line } from "react-icons/ri";
import { GiShoppingBag } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { useCart } from "../context/CartContext"; // Cart Context import

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const { cartItems } = useCart(); // cart items

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative max-w-[1520px] mx-auto">
      {/* Navbar */}
      <nav
        className={`z-50 w-full transition-all duration-300 ${isSticky ? "fixed top-0 left-0 bg-white shadow-md" : "relative bg-transparent"
          }`}
      >
        <div className="flex items-center justify-center text-black px-4 py-4">
          {/* Left Icons */}
          <div className="absolute left-4 flex items-center gap-6">
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
          <div className="text-2xl font-bold">MyShop</div>

          {/* Right Icons */}
          <div className="absolute right-4 flex items-center gap-6">
            <div className="flex items-center gap-1 cursor-pointer">
              <GiShoppingBag className="text-2xl" />
              <span className="text-sm">Shop</span>
            </div>
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
      </nav>

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-96 bg-white shadow-md transform transition-transform duration-300 z-50 ${menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
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
              <li className="cursor-pointer hover:underline">Jamdhani Sharee</li>
              <li className="cursor-pointer hover:underline">Three Pieces</li>
              <li className="cursor-pointer hover:underline">Unstitched Party Dress</li>
            </ul>
          )}
        </div>
      </div>

      {/* Sidebar Cart */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-md transform transition-transform duration-300 z-50 ${cartOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Cart</h2>
          <button
            onClick={() => setCartOpen(false)}
            className="text-2xl hover:text-red-500"
          >
            <AiOutlineClose />
          </button>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-64px)]">
          {cartItems.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold text-blue-600">
                  ৳ {item.price * item.quantity}
                </p>
              </div>
            ))
          )}
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

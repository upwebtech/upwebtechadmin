'use client';

import React, { useState } from 'react';
import {
  ShoppingCart,
  Search,
  Plus,
  Minus,
  CheckCircle2,
  Trash2,
  CreditCard,
  QrCode,
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  X,
  Smartphone,
  ChevronRight,
  Package,
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  weight: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  imageEmoji: string;
  badge?: string;
}

const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Fresh Farm Ratnagiri Alphonso Mangoes',
    category: 'Fruits & Veggies',
    weight: '1 kg (Pack of 4-5)',
    price: 499,
    originalPrice: 650,
    rating: 4.9,
    reviews: 142,
    imageEmoji: '🥭',
    badge: 'Seasonal Best',
  },
  {
    id: 'prod-2',
    name: 'Amul Taaza Fresh Toned Milk Pouch',
    category: 'Dairy & Breakfast',
    weight: '1 Litre Pouch',
    price: 54,
    originalPrice: 56,
    rating: 4.8,
    reviews: 320,
    imageEmoji: '🥛',
  },
  {
    id: 'prod-3',
    name: 'Aashirvaad Shudh Superior Chakki Atta',
    category: 'Atta, Rice & Dals',
    weight: '5 kg Bag',
    price: 245,
    originalPrice: 285,
    rating: 4.9,
    reviews: 215,
    imageEmoji: '🌾',
    badge: '100% Whole Wheat',
  },
  {
    id: 'prod-4',
    name: 'Fortune Sunlite Refined Sunflower Oil',
    category: 'Oils & Ghee',
    weight: '1 Litre Pouch',
    price: 145,
    originalPrice: 165,
    rating: 4.7,
    reviews: 98,
    imageEmoji: '🌻',
  },
  {
    id: 'prod-5',
    name: 'Tata Tea Premium Desh Ki Chai',
    category: 'Tea & Coffee',
    weight: '1 kg Pouch',
    price: 420,
    originalPrice: 480,
    rating: 4.8,
    reviews: 180,
    imageEmoji: '☕',
    badge: 'Popular',
  },
  {
    id: 'prod-6',
    name: 'Organic Farm Fresh Desi Tomatoes',
    category: 'Fruits & Veggies',
    weight: '1 kg',
    price: 38,
    originalPrice: 45,
    rating: 4.6,
    reviews: 84,
    imageEmoji: '🍅',
  },
  {
    id: 'prod-7',
    name: "Lay's India's Magic Masala Chips Party Pack",
    category: 'Snacks & Munchies',
    weight: '115 g',
    price: 50,
    originalPrice: 55,
    rating: 4.7,
    reviews: 240,
    imageEmoji: '🥔',
  },
  {
    id: 'prod-8',
    name: 'Cadbury Dairy Milk Silk Chocolate Bar',
    category: 'Snacks & Munchies',
    weight: '150 g',
    price: 165,
    originalPrice: 180,
    rating: 4.9,
    reviews: 310,
    imageEmoji: '🍫',
    badge: 'Bestseller',
  },
];

const CATEGORIES = [
  'All Products',
  'Fruits & Veggies',
  'Dairy & Breakfast',
  'Atta, Rice & Dals',
  'Oils & Ghee',
  'Tea & Coffee',
  'Snacks & Munchies',
];

export default function ApolloRetailStagingPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<{ [productId: string]: number }>({
    'prod-1': 1,
    'prod-2': 2,
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'PAYMENT' | 'SUCCESS'>('PAYMENT');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'COD'>('UPI');
  const [couponCode, setCouponCode] = useState('APOLLO20');
  const [isCouponApplied, setIsCouponApplied] = useState(true);

  // Cart operations
  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const next = { ...prev };
      if (next[id] > 1) {
        next[id] -= 1;
      } else {
        delete next[id];
      }
      return next;
    });
  };

  const totalCartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const cartItems = Object.entries(cart).map(([id, quantity]) => {
    const product = PRODUCTS.find((p) => p.id === id)!;
    return { ...product, quantity };
  });

  const rawSubtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountAmount = isCouponApplied ? Math.round(rawSubtotal * 0.2) : 0;
  const deliveryFee = rawSubtotal > 499 ? 0 : 35;
  const finalTotal = rawSubtotal - discountAmount + deliveryFee;

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCategory =
      selectedCategory === 'All Products' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSimulatePayment = () => {
    setCheckoutStep('SUCCESS');
  };

  const handleResetCheckout = () => {
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setCart({});
    setCheckoutStep('PAYMENT');
  };

  return (
    <div className="bg-slate-900 text-slate-100 flex-1 flex flex-col font-sans">
      {/* Supermarket Header */}
      <header className="bg-emerald-950/80 border-b border-emerald-900/60 sticky top-0 z-30 px-4 sm:px-8 py-3.5 backdrop-blur-md">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Delivery Location */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-emerald-500/20">
                🛒
              </div>
              <div>
                <div className="text-base font-black text-white leading-tight tracking-tight flex items-center gap-1.5">
                  Apollo Supermarket
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                    STAGING v2.4
                  </span>
                </div>
                <div className="text-[11px] text-emerald-300/80 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>Delivering to: Sector 62, Noida (Express 25 Mins)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search Box */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 1,000+ groceries, staples, dairy & fruits..."
              className="w-full bg-slate-950/60 border border-emerald-900/60 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-emerald-300/40 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-xs transition shadow-lg shadow-emerald-600/20"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="font-bold">Cart ({totalCartCount})</span>
            <span className="bg-slate-950/30 px-2 py-0.5 rounded-md text-[11px] text-white font-mono">
              ₹{finalTotal}
            </span>
          </button>
        </div>

        {/* Mobile Search */}
        <div className="mt-3 md:hidden relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search groceries..."
            className="w-full bg-slate-950/60 border border-emerald-900/60 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-emerald-300/40 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </header>

      {/* Promotional Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-slate-950 px-6 py-2.5 flex items-center justify-between text-xs font-bold">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-white" />
          <span>
            🎉 Special Festive Launch Offer: Get 20% OFF using coupon code{' '}
            <span className="bg-slate-950 text-emerald-400 px-2 py-0.5 rounded font-mono font-black">
              APOLLO20
            </span>
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[11px] font-semibold text-slate-900">
          <Clock className="w-3.5 h-3.5" />
          <span>Order in the next 15 mins for Free Delivery</span>
        </div>
      </div>

      {/* Staging Notice Bar */}
      <div className="bg-slate-950 px-6 py-2 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>
            Client Preview Sandbox for <strong>Apollo Retail Mart</strong> • Designed &amp; Engineered by{' '}
            <strong className="text-cyan-400">UP Web Tech</strong>
          </span>
        </div>
        <span className="hidden sm:inline text-slate-400 font-mono">
          Razorpay Test Gateway Integrated
        </span>
      </div>

      {/* Main E-Commerce Content */}
      <div className="p-4 sm:p-8 flex-1 max-w-7xl mx-auto w-full space-y-6">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-750'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => {
            const countInCart = cart[product.id] || 0;
            return (
              <div
                key={product.id}
                className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between hover:border-emerald-500/40 transition group relative overflow-hidden shadow-sm"
              >
                {product.badge && (
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                    {product.badge}
                  </span>
                )}

                <div>
                  {/* Emoji / Product Preview */}
                  <div className="w-full h-32 rounded-xl bg-slate-900 flex items-center justify-center text-5xl mb-3 group-hover:scale-105 transition-transform">
                    {product.imageEmoji}
                  </div>

                  <div className="text-[11px] font-semibold text-emerald-400">
                    {product.category}
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-2 mt-0.5">
                    {product.name}
                  </h3>
                  <div className="text-[11px] text-slate-400 mt-0.5 font-medium">
                    {product.weight}
                  </div>

                  <div className="flex items-center gap-1.5 mt-2 text-[11px]">
                    <div className="flex items-center text-amber-400 font-bold">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span className="ml-0.5">{product.rating}</span>
                    </div>
                    <span className="text-slate-400">({product.reviews})</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between gap-2">
                  <div>
                    <div className="text-base font-black text-white">
                      ₹{product.price}
                    </div>
                    <div className="text-[10px] text-slate-400 line-through">
                      ₹{product.originalPrice}
                    </div>
                  </div>

                  {countInCart > 0 ? (
                    <div className="flex items-center gap-2 bg-emerald-500 text-slate-950 px-2 py-1 rounded-xl font-bold text-xs shadow-sm">
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="hover:scale-125 transition"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="min-w-[14px] text-center font-black">
                        {countInCart}
                      </span>
                      <button
                        onClick={() => addToCart(product.id)}
                        className="hover:scale-125 transition"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(product.id)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 font-bold text-xs transition border border-emerald-500/20"
                    >
                      Add +
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Slide-out Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col justify-between p-6 shadow-2xl animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-emerald-400" />
                  <h2 className="text-base font-black text-white">
                    Apollo Cart ({totalCartCount} items)
                  </h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Items List */}
              <div className="divide-y divide-slate-800/60 overflow-y-auto max-h-[45vh] my-4 pr-1">
                {cartItems.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-xs">
                    Your cart is empty. Add fresh items from the catalog!
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{item.imageEmoji}</span>
                        <div>
                          <div className="text-xs font-bold text-white line-clamp-1">{item.name}</div>
                          <div className="text-[11px] text-slate-400">
                            ₹{item.price} × {item.quantity} ={' '}
                            <strong className="text-emerald-400">
                              ₹{item.price * item.quantity}
                            </strong>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-white min-w-[12px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => addToCart(item.id)}
                          className="text-slate-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Coupon Box */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span className="font-mono font-bold text-emerald-400">APOLLO20</span>
                  <span className="text-slate-400 text-[11px]">(20% OFF applied)</span>
                </div>
                <button
                  onClick={() => setIsCouponApplied(!isCouponApplied)}
                  className="text-xs font-bold text-cyan-400 hover:underline"
                >
                  {isCouponApplied ? 'Remove' : 'Apply'}
                </button>
              </div>
            </div>

            {/* Bill Summary & Checkout */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="space-y-1.5 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Items Subtotal</span>
                  <span className="text-white font-mono">₹{rawSubtotal}</span>
                </div>
                {isCouponApplied && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Festive Promo (20%)</span>
                    <span className="font-mono">-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className={deliveryFee === 0 ? 'text-emerald-400 font-bold' : 'text-white font-mono'}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-slate-800">
                  <span>To Pay</span>
                  <span className="text-emerald-400 font-mono">₹{finalTotal}</span>
                </div>
              </div>

              <button
                disabled={cartItems.length === 0}
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-slate-950 font-black text-xs transition flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/20"
              >
                <span>Proceed to Razorpay Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Razorpay Sandbox Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative">
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>

            {checkoutStep === 'PAYMENT' ? (
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center font-black text-white text-base">
                    ₹
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white">Razorpay Checkout Sandbox</h3>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>UP Web Tech Test Environment • Order ID: RZP_TEST_9941</span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-slate-400">Total Amount Payable</div>
                    <div className="text-xl font-black text-emerald-400 font-mono">
                      ₹{finalTotal}.00
                    </div>
                  </div>
                  <div className="text-right text-[11px] text-slate-400">
                    <div>Apollo Retail Mart</div>
                    <div>GSTIN: 09AAACA1234F1Z5</div>
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-300">
                    Select Test Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('UPI')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition ${
                        paymentMethod === 'UPI'
                          ? 'bg-blue-600/10 border-blue-500 text-blue-400'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <QrCode className="w-5 h-5" />
                      <span>UPI QR / Apps</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('CARD')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition ${
                        paymentMethod === 'CARD'
                          ? 'bg-blue-600/10 border-blue-500 text-blue-400'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <CreditCard className="w-5 h-5" />
                      <span>Cards &amp; NetBanking</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('COD')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition ${
                        paymentMethod === 'COD'
                          ? 'bg-blue-600/10 border-blue-500 text-blue-400'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Package className="w-5 h-5" />
                      <span>Cash on Delivery</span>
                    </button>
                  </div>
                </div>

                {paymentMethod === 'UPI' && (
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-3">
                    <div className="text-xs text-slate-300 font-semibold">
                      Scan UPI QR with GPay, PhonePe, or Paytm
                    </div>
                    <div className="w-36 h-36 mx-auto bg-white p-2 rounded-xl flex items-center justify-center text-slate-950 font-mono text-[9px] font-bold">
                      [DEMO UPI QR CODE]
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      UPI ID: apollostore@icici (Verified Merchant)
                    </div>
                  </div>
                )}

                <button
                  onClick={handleSimulatePayment}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition flex items-center justify-center gap-2 shadow-xl shadow-blue-600/20"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Simulate Successful Payment (₹{finalTotal})</span>
                </button>
              </div>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto text-2xl">
                  ✓
                </div>
                <h3 className="text-xl font-black text-white">Order Confirmed!</h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Thank you! Your order <strong className="text-emerald-400 font-mono">#APOLLO-9812</strong> has
                  been placed successfully and dispatched to Noida Sector 62.
                </p>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Payment Status:</span>
                    <span className="text-emerald-400 font-bold">PAID (₹{finalTotal})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Transaction Ref:</span>
                    <span className="text-slate-200 font-mono">pay_2026_APOLLO_OK</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Estimated Delivery:</span>
                    <span className="text-cyan-400 font-semibold">25 Minutes (Express)</span>
                  </div>
                </div>

                <button
                  onClick={handleResetCheckout}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-xs transition"
                >
                  Back to Supermarket Staging Catalog
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

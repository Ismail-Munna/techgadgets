import Link from "next/link";
import { Facebook, Twitter, Instagram, Github, ShoppingCart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <ShoppingCart className="h-6 w-6 text-indigo-600" />
              <span className="text-xl font-bold tracking-tight text-gray-900">TechGadgets</span>
            </Link>
            <p className="text-sm text-gray-500 mb-4">
              Your one-stop shop for the latest and greatest in technology and electronics.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                <span className="sr-only">GitHub</span>
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Shop</h3>
            <ul className="space-y-3">
              <li><Link href="/products" className="text-sm text-gray-500 hover:text-indigo-600">All Products</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-indigo-600">New Arrivals</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-indigo-600">Best Sellers</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-indigo-600">Sale</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Support</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-gray-500 hover:text-indigo-600">Contact Us</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-indigo-600">FAQs</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-indigo-600">Shipping & Returns</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-indigo-600">Track Order</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-gray-500 hover:text-indigo-600">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-indigo-600">Terms of Service</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-indigo-600">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} TechGadgets Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

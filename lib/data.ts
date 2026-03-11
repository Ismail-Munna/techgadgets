export interface Product {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  priority: string;
  imageUrl: string;
  dateAdded: string;
  category?: string;
}

// In-memory mock database
export let products: Product[] = [
  {
    id: "1",
    title: "Wireless Noise-Cancelling Headphones",
    shortDescription: "Premium over-ear headphones with active noise cancellation.",
    fullDescription: "Experience pure audio bliss with our industry-leading noise-cancelling technology. These headphones offer 30 hours of battery life, plush ear cushions, and crystal-clear sound quality for music lovers and professionals alike.",
    price: 299.99,
    priority: "High",
    imageUrl: "https://picsum.photos/seed/headphones/600/400",
    dateAdded: new Date().toISOString(),
    category: "Audio",
  },
  {
    id: "2",
    title: "Smart Fitness Watch",
    shortDescription: "Track your health, workouts, and notifications on the go.",
    fullDescription: "Stay on top of your fitness goals with this sleek smartwatch. Features include heart rate monitoring, GPS tracking, sleep analysis, and water resistance up to 50 meters. Compatible with iOS and Android.",
    price: 149.50,
    priority: "Medium",
    imageUrl: "https://picsum.photos/seed/watch/600/400",
    dateAdded: new Date().toISOString(),
    category: "Wearables",
  },
  {
    id: "3",
    title: "Ultra-Slim Laptop",
    shortDescription: "Powerful performance in a lightweight, portable design.",
    fullDescription: "Work and play anywhere with this ultra-slim laptop. Equipped with the latest processor, 16GB RAM, and a stunning 4K display. Perfect for creatives and professionals who need power on the move.",
    price: 1299.00,
    priority: "High",
    imageUrl: "https://picsum.photos/seed/laptop/600/400",
    dateAdded: new Date().toISOString(),
    category: "Computers",
  },
  {
    id: "4",
    title: "Ergonomic Office Chair",
    shortDescription: "Comfortable seating for long hours of work or gaming.",
    fullDescription: "Designed for maximum comfort and support, this ergonomic chair features adjustable lumbar support, breathable mesh material, and customizable armrests. Say goodbye to back pain and hello to productivity.",
    price: 249.99,
    priority: "Low",
    imageUrl: "https://picsum.photos/seed/chair/600/400",
    dateAdded: new Date().toISOString(),
    category: "Workspace",
  },
  {
    id: "5",
    title: "4K Action Camera",
    shortDescription: "Capture your adventures in stunning ultra-high definition.",
    fullDescription: "Whether you're surfing, biking, or skydiving, this rugged action camera records every moment in crisp 4K resolution. Includes waterproof housing, mounting accessories, and built-in Wi-Fi for easy sharing.",
    price: 199.00,
    priority: "Medium",
    imageUrl: "https://picsum.photos/seed/camera/600/400",
    dateAdded: new Date().toISOString(),
    category: "Cameras",
  },
  {
    id: "6",
    title: "Smart Home Hub",
    shortDescription: "Control all your smart devices from one central hub.",
    fullDescription: "Simplify your life with this smart home hub. Connect and control your lights, thermostat, security cameras, and more using voice commands or the companion app. Compatible with major smart home ecosystems.",
    price: 89.99,
    priority: "Low",
    imageUrl: "https://picsum.photos/seed/smarthome/600/400",
    dateAdded: new Date().toISOString(),
    category: "Smart Home",
  }
];

export const addProduct = (product: Omit<Product, "id" | "dateAdded">) => {
  const newProduct: Product = {
    ...product,
    id: Math.random().toString(36).substring(2, 9),
    dateAdded: new Date().toISOString(),
  };
  products = [newProduct, ...products];
  return newProduct;
};

export const deleteProduct = (id: string) => {
  products = products.filter(p => p.id !== id);
};

export const getProductById = (id: string) => {
  return products.find(p => p.id === id);
};

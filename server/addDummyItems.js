const mongoose = require("mongoose");
const Item = require("./models/Item");
require("dotenv").config();

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/mydb";

const dummyItems = [
  // MEN'S CATEGORY
  // Men > Shirt
  {
    name: "Classic White Shirt",
    quantity: 25,
    image: "https://youthincmag.com/wp-content/uploads/2016/04/white-classic-shirt.jpeg",
    cost: 899,
    contactNumber: "+91-9876543210",
    category: "men",
    subcategory: "shirt"
  },
  {
    name: "Blue Denim Shirt",
    quantity: 20,
    image: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1677668975_1115965.jpg",
    cost: 1299,
    contactNumber: "+91-9876543210",
    category: "men",
    subcategory: "shirt"
  },
  {
    name: "Formal Black Shirt",
    quantity: 15,
    image: "https://rukminim1.flixcart.com/image/1664/1664/j4pwsy80-1/shirt/c/t/v/m-17p5ew65qv58i100-united-colors-of-benetton-original-imaevgfjkcsse7ht.jpeg?q=90",
    cost: 1499,
    contactNumber: "+91-9876543210",
    category: "men",
    subcategory: "shirt"
  },

  // Men > Pant
  {
    name: "Black Formal Pants",
    quantity: 30,
    image: "https://tse2.mm.bing.net/th/id/OIP.mU0l3K4S2TgHbVkLf2SfzAHaHa?pid=Api&P=0&h=180",
    cost: 1599,
    contactNumber: "+91-9876543210",
    category: "men",
    subcategory: "pant"
  },
  {
    name: "Blue Jeans",
    quantity: 35,
    image: "https://lee.com.ec/wp-content/uploads/A667A0816.jpg",
    cost: 1899,
    contactNumber: "+91-9876543210",
    category: "men",
    subcategory: "pant"
  },
  {
    name: "Khaki Chinos",
    quantity: 22,
    image: "https://tse2.mm.bing.net/th/id/OIP.TLCWgsiNicpDwNmpi6nVbAHaJo?pid=Api&P=0&h=180",
    cost: 1299,
    contactNumber: "+91-9876543210",
    category: "men",
    subcategory: "pant"
  },

  // Men > Shoes
  {
    name: "Leather Formal Shoes",
    quantity: 18,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
    cost: 2499,
    contactNumber: "+91-9876543210",
    category: "men",
    subcategory: "shoes"
  },
  {
    name: "Sports Sneakers",
    quantity: 25,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    cost: 1899,
    contactNumber: "+91-9876543210",
    category: "men",
    subcategory: "shoes"
  },
  {
    name: "Casual Loafers",
    quantity: 20,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
    cost: 1699,
    contactNumber: "+91-9876543210",
    category: "men",
    subcategory: "shoes"
  },

  // WOMEN'S CATEGORY
  // Women > Dress
  {
    name: "Summer Floral Dress",
    quantity: 28,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400",
    cost: 2499,
    contactNumber: "+91-9876543211",
    category: "women",
    subcategory: "dress"
  },
  {
    name: "Evening Gown",
    quantity: 12,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400",
    cost: 4999,
    contactNumber: "+91-9876543211",
    category: "women",
    subcategory: "dress"
  },
  {
    name: "Casual Maxi Dress",
    quantity: 20,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400",
    cost: 1899,
    contactNumber: "+91-9876543211",
    category: "women",
    subcategory: "dress"
  },

  // Women > Top
  {
    name: "Elegant Summer Top",
    quantity: 32,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400",
    cost: 899,
    contactNumber: "+91-9876543211",
    category: "women",
    subcategory: "top"
  },
  {
    name: "Silk Blouse",
    quantity: 18,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400",
    cost: 1599,
    contactNumber: "+91-9876543211",
    category: "women",
    subcategory: "top"
  },
  {
    name: "Crop Top",
    quantity: 25,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400",
    cost: 699,
    contactNumber: "+91-9876543211",
    category: "women",
    subcategory: "top"
  },

  // Women > Jeans
  {
    name: "High-Waist Skinny Jeans",
    quantity: 30,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
    cost: 2199,
    contactNumber: "+91-9876543211",
    category: "women",
    subcategory: "jeans"
  },
  {
    name: "Mom Fit Jeans",
    quantity: 22,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
    cost: 1899,
    contactNumber: "+91-9876543211",
    category: "women",
    subcategory: "jeans"
  },
  {
    name: "Wide Leg Jeans",
    quantity: 18,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
    cost: 2499,
    contactNumber: "+91-9876543211",
    category: "women",
    subcategory: "jeans"
  },

  // Women > Shoes
  {
    name: "High Heels",
    quantity: 20,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400",
    cost: 2999,
    contactNumber: "+91-9876543211",
    category: "women",
    subcategory: "shoes"
  },
  {
    name: "Ballet Flats",
    quantity: 25,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400",
    cost: 1299,
    contactNumber: "+91-9876543211",
    category: "women",
    subcategory: "shoes"
  },
  {
    name: "Ankle Boots",
    quantity: 15,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400",
    cost: 3499,
    contactNumber: "+91-9876543211",
    category: "women",
    subcategory: "shoes"
  },

  // Women > Handbag
  {
    name: "Leather Tote Bag",
    quantity: 18,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400",
    cost: 3999,
    contactNumber: "+91-9876543211",
    category: "women",
    subcategory: "handbag"
  },
  {
    name: "Crossbody Bag",
    quantity: 22,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400",
    cost: 2499,
    contactNumber: "+91-9876543211",
    category: "women",
    subcategory: "handbag"
  },
  {
    name: "Evening Clutch",
    quantity: 12,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400",
    cost: 1899,
    contactNumber: "+91-9876543211",
    category: "women",
    subcategory: "handbag"
  },

  // KIDS CATEGORY
  // Kids > Boys
  {
    name: "Boys T-Shirt Set",
    quantity: 40,
    image: "https://images.unsplash.com/photo-1503919545889-bef636e02cb8?w=400",
    cost: 599,
    contactNumber: "+91-9876543212",
    category: "kids",
    subcategory: "boys"
  },
  {
    name: "Boys Denim Jacket",
    quantity: 25,
    image: "https://images.unsplash.com/photo-1503919545889-bef636e02cb8?w=400",
    cost: 1299,
    contactNumber: "+91-9876543212",
    category: "kids",
    subcategory: "boys"
  },
  {
    name: "Boys Sports Shoes",
    quantity: 30,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    cost: 999,
    contactNumber: "+91-9876543212",
    category: "kids",
    subcategory: "boys"
  },

  // Kids > Girls
  {
    name: "Girls Party Dress",
    quantity: 35,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400",
    cost: 1499,
    contactNumber: "+91-9876543212",
    category: "kids",
    subcategory: "girls"
  },
  {
    name: "Girls Hair Accessories",
    quantity: 50,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400",
    cost: 299,
    contactNumber: "+91-9876543212",
    category: "kids",
    subcategory: "girls"
  },
  {
    name: "Girls Ballet Shoes",
    quantity: 28,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400",
    cost: 799,
    contactNumber: "+91-9876543212",
    category: "kids",
    subcategory: "girls"
  },

  // Kids > Toys
  {
    name: "Educational Building Blocks",
    quantity: 45,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    cost: 899,
    contactNumber: "+91-9876543212",
    category: "kids",
    subcategory: "toys"
  },
  {
    name: "Plush Teddy Bear",
    quantity: 60,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    cost: 499,
    contactNumber: "+91-9876543212",
    category: "kids",
    subcategory: "toys"
  },
  {
    name: "Remote Control Car",
    quantity: 20,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    cost: 1499,
    contactNumber: "+91-9876543212",
    category: "kids",
    subcategory: "toys"
  },
  {
    name: "Art & Craft Kit",
    quantity: 35,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    cost: 699,
    contactNumber: "+91-9876543212",
    category: "kids",
    subcategory: "toys"
  },
  {
    name: "Puzzle Set (100 pieces)",
    quantity: 28,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    cost: 399,
    contactNumber: "+91-9876543212",
    category: "kids",
    subcategory: "toys"
  },
  {
    name: "Science Experiment Kit",
    quantity: 15,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    cost: 1299,
    contactNumber: "+91-9876543212",
    category: "kids",
    subcategory: "toys"
  },
  {
    name: "Musical Instruments Set",
    quantity: 25,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    cost: 799,
    contactNumber: "+91-9876543212",
    category: "kids",
    subcategory: "toys"
  },
  {
    name: "Board Games Collection",
    quantity: 18,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    cost: 999,
    contactNumber: "+91-9876543212",
    category: "kids",
    subcategory: "toys"
  },
  {
    name: "Doll House with Furniture",
    quantity: 12,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    cost: 2499,
    contactNumber: "+91-9876543212",
    category: "kids",
    subcategory: "toys"
  },
  {
    name: "LEGO Construction Set",
    quantity: 22,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    cost: 1899,
    contactNumber: "+91-9876543212",
    category: "kids",
    subcategory: "toys"
  },
  {
    name: "Outdoor Sports Kit",
    quantity: 30,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    cost: 1199,
    contactNumber: "+91-9876543212",
    category: "kids",
    subcategory: "toys"
  },
  {
    name: "Magic Tricks Set",
    quantity: 16,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    cost: 599,
    contactNumber: "+91-9876543212",
    category: "kids",
    subcategory: "toys"
  },

  // BEAUTY PRODUCTS CATEGORY
  // Beauty > Skincare
  {
    name: "Hydrating Face Cream",
    quantity: 100,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
    cost: 899,
    contactNumber: "+91-9876543213",
    category: "beauty",
    subcategory: "skincare"
  },
  {
    name: "Vitamin C Serum",
    quantity: 75,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
    cost: 1299,
    contactNumber: "+91-9876543213",
    category: "beauty",
    subcategory: "skincare"
  },
  {
    name: "Sunscreen SPF 50",
    quantity: 120,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
    cost: 699,
    contactNumber: "+91-9876543213",
    category: "beauty",
    subcategory: "skincare"
  },

  // Beauty > Makeup
  {
    name: "Matte Lipstick Set",
    quantity: 80,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400",
    cost: 1499,
    contactNumber: "+91-9876543213",
    category: "beauty",
    subcategory: "makeup"
  },
  {
    name: "Eyeshadow Palette",
    quantity: 65,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400",
    cost: 1899,
    contactNumber: "+91-9876543213",
    category: "beauty",
    subcategory: "makeup"
  },
  {
    name: "Foundation & Concealer",
    quantity: 90,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400",
    cost: 2199,
    contactNumber: "+91-9876543213",
    category: "beauty",
    subcategory: "makeup"
  },

  // Beauty > Haircare
  {
    name: "Nourishing Shampoo",
    quantity: 110,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400",
    cost: 799,
    contactNumber: "+91-9876543213",
    category: "beauty",
    subcategory: "haircare"
  },
  {
    name: "Hair Serum",
    quantity: 85,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400",
    cost: 999,
    contactNumber: "+91-9876543213",
    category: "beauty",
    subcategory: "haircare"
  },
  {
    name: "Hair Dryer",
    quantity: 25,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400",
    cost: 2499,
    contactNumber: "+91-9876543213",
    category: "beauty",
    subcategory: "haircare"
  },

  // Beauty > Fragrance
  {
    name: "Floral Perfume",
    quantity: 45,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400",
    cost: 3999,
    contactNumber: "+91-9876543213",
    category: "beauty",
    subcategory: "fragrance"
  },
  {
    name: "Men's Cologne",
    quantity: 40,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400",
    cost: 3499,
    contactNumber: "+91-9876543213",
    category: "beauty",
    subcategory: "fragrance"
  },
  {
    name: "Body Mist",
    quantity: 70,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400",
    cost: 599,
    contactNumber: "+91-9876543213",
    category: "beauty",
    subcategory: "fragrance"
  },

  // ELECTRONICS CATEGORY
  // Electronics > Phone
  {
    name: "Smartphone",
    quantity: 15,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    cost: 15999,
    contactNumber: "+91-9876543214",
    category: "electronics",
    subcategory: "phone"
  },
  {
    name: "Phone Case",
    quantity: 200,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    cost: 299,
    contactNumber: "+91-9876543214",
    category: "electronics",
    subcategory: "phone"
  },

  // Electronics > Laptop
  {
    name: "Gaming Laptop",
    quantity: 8,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
    cost: 89999,
    contactNumber: "+91-9876543214",
    category: "electronics",
    subcategory: "laptop"
  },
  {
    name: "Laptop Bag",
    quantity: 25,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
    cost: 1499,
    contactNumber: "+91-9876543214",
    category: "electronics",
    subcategory: "laptop"
  },

  // Electronics > Camera
  {
    name: "Digital Camera",
    quantity: 12,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400",
    cost: 15999,
    contactNumber: "+91-9876543214",
    category: "electronics",
    subcategory: "camera"
  },
  {
    name: "Camera Lens",
    quantity: 18,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400",
    cost: 8999,
    contactNumber: "+91-9876543214",
    category: "electronics",
    subcategory: "camera"
  }
];

async function addDummyItems() {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");

    // Clear existing items
    await Item.deleteMany({});
    console.log("Cleared existing items");

    // Add new dummy items
    for (const item of dummyItems) {
      const newItem = new Item(item);
      await newItem.save();
      console.log(`Added: ${item.name} (${item.category} > ${item.subcategory})`);
    }

    console.log(`\n✅ Successfully added ${dummyItems.length} dummy items!`);
    console.log("\n📊 Category Breakdown:");
    
    const categories = {};
    dummyItems.forEach(item => {
      if (!categories[item.category]) {
        categories[item.category] = {};
      }
      if (!categories[item.category][item.subcategory]) {
        categories[item.category][item.subcategory] = 0;
      }
      categories[item.category][item.subcategory]++;
    });

    Object.entries(categories).forEach(([category, subcategories]) => {
      console.log(`\n${category.toUpperCase()}:`);
      Object.entries(subcategories).forEach(([subcategory, count]) => {
        console.log(`  ${subcategory}: ${count} items`);
      });
    });

  } catch (error) {
    console.error("Error adding dummy items:", error);
  } finally {
    mongoose.connection.close();
  }
}

addDummyItems();

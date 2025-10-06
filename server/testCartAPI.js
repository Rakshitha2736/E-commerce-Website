const axios = require("axios");

async function testCartAPI() {
  try {
    console.log("Testing Cart API endpoints...");
    
    // Test 1: Get cart for a user
    console.log("\n1. Testing GET /cart/:userEmail");
    try {
      const response = await axios.get("http://localhost:5000/cart/test@example.com");
      console.log("✅ GET cart response:", response.data);
    } catch (error) {
      console.log("❌ GET cart error:", error.response?.data || error.message);
    }
    
    // Test 2: Add item to cart
    console.log("\n2. Testing POST /cart/add");
    try {
      const testItem = {
        _id: "507f1f77bcf86cd799439011", // Mock ObjectId
        name: "Test Item",
        image: "https://example.com/image.jpg",
        cost: 100,
        category: "test",
        subcategory: "test",
        contactNumber: "+1234567890"
      };
      
      const response = await axios.post("http://localhost:5000/cart/add", {
        userEmail: "test@example.com",
        item: testItem
      });
      console.log("✅ POST add to cart response:", response.data);
    } catch (error) {
      console.log("❌ POST add to cart error:", error.response?.data || error.message);
    }
    
  } catch (error) {
    console.error("Error testing cart API:", error.message);
  }
}

testCartAPI();

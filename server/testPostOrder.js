const axios = require('axios');

async function postTestOrder() {
  try {
    const payload = {
      userKey: 'sowmiya_1507',
      items: [{ itemId: '000000000000000000000000', name: 'Test Item', image: '', cost: 123, quantity: 1 }],
      total: 123
    };
    const res = await axios.post('http://localhost:5000/api/orders', payload);
    console.log('Response:', res.data);
  } catch (err) {
    console.error('Error posting test order:', err.response ? err.response.data : err.message);
  }
}

postTestOrder();

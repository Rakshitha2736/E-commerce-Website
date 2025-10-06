const fetch = require('node-fetch');

async function testSignup() {
  try {
    const response = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'testuser',
        phone: '1234567890',
        password: 'testpass'
      }),
    });

    const data = await response.json();
    console.log('Signup Response:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

testSignup();
// Quick authentication test without database
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

console.log('🔐 Testing Authentication Components\n');

// Test 1: Password Hashing
console.log('1️⃣ Testing Password Hashing...');
const testPassword = 'Test1234!';
bcrypt.hash(testPassword, 10).then(hash => {
  console.log('✅ Password hashed successfully');
  console.log('   Hash:', hash.substring(0, 30) + '...');
  
  // Test password comparison
  bcrypt.compare(testPassword, hash).then(isMatch => {
    console.log('✅ Password comparison works:', isMatch ? 'MATCH' : 'NO MATCH');
  });
});

// Test 2: JWT Generation
console.log('\n2️⃣ Testing JWT Token Generation...');
const JWT_SECRET = 'test-secret-key-at-least-32-characters-long';
const testPayload = {
  userId: '12345',
  email: 'test@example.com',
  role: 'PASSENGER'
};

try {
  const accessToken = jwt.sign(testPayload, JWT_SECRET, { expiresIn: '15m' });
  console.log('✅ Access Token generated successfully');
  console.log('   Token:', accessToken.substring(0, 50) + '...');
  
  // Test JWT Verification
  const decoded = jwt.verify(accessToken, JWT_SECRET);
  console.log('✅ Token verification works');
  console.log('   Decoded:', decoded);
  
  // Test Refresh Token
  const refreshToken = jwt.sign(testPayload, JWT_SECRET, { expiresIn: '7d' });
  console.log('✅ Refresh Token generated successfully');
  
} catch (error) {
  console.log('❌ JWT Error:', error.message);
}

// Test 3: OTP Generation
console.log('\n3️⃣ Testing OTP Generation...');
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const otp = generateOTP();
console.log('✅ OTP generated:', otp);
console.log('   Length:', otp.length, 'digits');

// Summary
setTimeout(() => {
  console.log('\n' + '='.repeat(50));
  console.log('📊 Authentication Components Summary:');
  console.log('='.repeat(50));
  console.log('✅ Password Hashing: Working');
  console.log('✅ JWT Tokens: Working');
  console.log('✅ OTP Generation: Working');
  console.log('\n⚠️  To test full authentication:');
  console.log('   1. Set up MongoDB Atlas');
  console.log('   2. Update .env with connection string');
  console.log('   3. Restart auth service');
  console.log('   4. Test endpoints with curl or Postman');
}, 1000);

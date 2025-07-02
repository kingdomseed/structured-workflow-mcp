import { UserService } from './UserService';

// Example usage of the monolithic UserService
const userService = new UserService();

try {
  // Create a user
  const user = userService.createUser('test@example.com', 'password123', 'user');
  console.log('User created:', user);
  
  // Login
  const loginResult = userService.login('test@example.com', 'password123');
  console.log('Login successful:', loginResult.token);
  
  // Export user data
  const jsonData = userService.exportUserData(user.id, 'json');
  console.log('User data (JSON):', jsonData);
  
  // Generate report
  const report = userService.generateReport('user');
  console.log('Report generated:', report);
  
  // Save to database
  userService.saveToDatabase();
  console.log('Data saved to database');
  
} catch (error) {
  console.error('Error:', error);
}
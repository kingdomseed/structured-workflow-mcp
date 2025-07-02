// Entry point for the refactoring-test project
console.log('Hello from refactoring-test TypeScript project!');

// Example function to demonstrate TypeScript features
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// Example interface
interface User {
  id: number;
  name: string;
  email: string;
}

// Example class
class UserService {
  private users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
  }

  getUser(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  getAllUsers(): User[] {
    return [...this.users];
  }
}

// Example usage
const userService = new UserService();
userService.addUser({
  id: 1,
  name: 'John Doe',
  email: 'john@example.com'
});

console.log(greet('TypeScript Developer'));
console.log('Users:', userService.getAllUsers());

export { greet, UserService, User };
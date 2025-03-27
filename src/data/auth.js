// Fake user "database"
const users = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123", // example password
  },
];

// Fake profile data (you can replace this with real data if needed)
const userProfile = {
  name: "John Doe",
  email: "john.doe@example.com",
  joined: "January 1, 2021",
};

// Export the function to fetch profile
export const getProfile = () => {
  // In a real app, you'd likely fetch this from an API or database
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(userProfile); // Simulating an async request
    }, 1000);
  });
};

// Signup function
export const signupUser = async ({ name, email, password }) => {
  // Simulate checking if the user already exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Simulate a new user being added
  const newUser = { name, email, password };
  users.push(newUser); // Add to the 'database' (fake here)

  return { user: newUser }; // Return the new user
};

// Login function
export const loginUser = async ({ email, password }) => {
  // In a real app, you'd check the credentials against a database
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    return { user }; // Return the user data if found
  }

  throw new Error("Invalid credentials"); // If no user found, throw error
};

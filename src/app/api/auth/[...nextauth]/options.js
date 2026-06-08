import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";


export const options = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        // Here you would typically fetch the user from your database
        // and verify the password. For demonstration, we'll use a hardcoded user.
        const user = {
          id: 1,
          name: "John Doe",
          email: "dev.shohanur@gmail.com",
          password: "password123",
        };
        if (user && user.email === email && user.password === password) {
          return user;
        }
        return null;
      },
    }),
  ],
}
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    pseudo: string;
  }
  interface Session {
    user: User & {
      pseudo: string;
    };
    token: {
      pseudo: string;
    };
  }
}

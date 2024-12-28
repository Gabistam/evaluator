import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      role: UserRole;
    };
  }

  interface User {
    id: string;
    email?: string | null;
    name?: string | null;
    role: UserRole;
  }
}
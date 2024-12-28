import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { 
          label: "Email", 
          type: "email", 
          placeholder: "exemple@email.com" 
        },
        password: { 
          label: "Mot de passe", 
          type: "password" 
        }
      },
      async authorize(credentials) {
        // Pour l'exemple, on utilise des credentials en dur
        // Dans un vrai projet, vérifiez dans une base de données
        if (credentials?.email === "test@test.com" && credentials?.password === "test123") {
          return {
            id: "1",
            email: credentials.email,
            name: "Utilisateur Test",
            role: "user"
          }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub ?? ''
      }
      return session
    }
  }
})

export { handler as GET, handler as POST }
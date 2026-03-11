import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const nextAuthSecret = process.env.NEXTAUTH_SECRET;
const firebaseApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

type FirebasePasswordSignInResponse = {
  email: string;
  localId: string;
  displayName?: string;
  photoUrl?: string;
};

function getFallbackName(email: string) {
  const [localPart] = email.split("@");
  return localPart || "User";
}

export const authOptions: NextAuthOptions = {
  providers: [
    ...(googleClientId && googleClientSecret
      ? [
          GoogleProvider({
            clientId: googleClientId,
            clientSecret: googleClientSecret,
          }),
        ]
      : []),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase();
        const password = credentials?.password;

        if (!email || !password) {
          return null;
        }

        if (firebaseApiKey) {
          try {
            const response = await fetch(
              `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseApiKey}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email,
                  password,
                  returnSecureToken: true,
                }),
              }
            );

            if (response.ok) {
              const user =
                (await response.json()) as FirebasePasswordSignInResponse;

              return {
                id: user.localId,
                name: user.displayName || getFallbackName(user.email),
                email: user.email,
                image: user.photoUrl || null,
              };
            }
          } catch (error) {
            console.error("Credentials authorize error:", error);
          }
        }

        if (email === "user@example.com" && password === "password") {
          return {
            id: "1",
            name: "Demo User",
            email: "user@example.com",
            image: "https://picsum.photos/seed/user/100/100",
          };
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: nextAuthSecret,
};

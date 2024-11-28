import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/app/lib/db";
import { compare, hash } from "bcrypt";
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    //! GITHUB PROVIDER
    GithubProvider({
      clientId: process.env.GITHUB_ID == undefined ? "" : process.env.GITHUB_ID,
      clientSecret:
        process.env.GITHUB_SECRET == undefined ? "" : process.env.GITHUB_SECRET,
    }),
    //! CREDENTIALS PROVIDER (EMAIL, PASSWORD)
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async session({ session, token }) {
      //* SET SESSION WITH TOKEN DATA
      console.log("Session Callback", { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
        },
      };
    },
    async jwt({ token, user, account, profile }): Promise<any> {
      console.log("JWT Callback", { token, user });

      //? SET TOKEN DATA DEPEND ON PROVIDER TYPE

      if (account?.provider === "github" && user) {
        //! GITHUB PROVIDER

        const existingUser = await prisma.githubUser.findUnique({
          where: { id: Number(user.id) },
        });

        let role_db: string = "";
        if (existingUser) {
          role_db = existingUser.role;
        } else {
          await prisma.githubUser.create({
            data: {
              id: Number(user.id),
              name: user.name,
              email: user.email || "",
            },
          });
          role_db = "user";
        }

        return {
          ...token,
          id: user.id,
          role: role_db,
        };
      } else {
        //! CREDENTIALS PROVIDER
        if (user) {
          const u = user as unknown as any;
          return {
            ...token,
            id: u.id,
            role: u.role,
          };
        }
        return token;
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

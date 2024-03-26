import { Role } from '@prisma/client';
import type { NextAuthConfig } from 'next-auth';
import { DEFAULT_NEW_ACCOUNT_BOOK_NAME, EMPTY_USER_NAME } from '@/app/lib/constants';
import { prisma } from '@/app/lib/db';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      console.log('is logged in ', isLoggedIn);
      const isAccessingPages = nextUrl.pathname.startsWith('/books');
      if (isAccessingPages) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/books', nextUrl));
      }
      return true;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider == "google" && user.email) {
        const existingUser = await prisma.staff.findFirst({
          where: {
            email: user.email
          }
        })
        if (!existingUser) {
          await prisma.staff.create({
            data: {
              name: user.name || EMPTY_USER_NAME,
              email: user.email,
              image: user.image,
              books: {
                create: [
                  {
                    book: { create: { name: DEFAULT_NEW_ACCOUNT_BOOK_NAME } },
                    role: Role.OWNER
                  },
                ],
              }
            }
          })
        }
      }
      return true;
    }
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
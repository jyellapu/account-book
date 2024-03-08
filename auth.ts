import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { prisma } from './app/lib/db';
import { StaffType } from '@prisma/client';

async function getStaff(mobileNumber: string) {
  try {
    const staff = await prisma.staff.findFirst({
      where: {
        mobileNumber: mobileNumber
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        mobileNumber: true,
        password: true,
        type: true
      }
    })
    return staff;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ mobileNumber: z.string(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { mobileNumber, password } = parsedCredentials.data;
          const staff = await getStaff(mobileNumber);
          if (!staff || ![StaffType.ADMIN, StaffType.EMPLOYEE].includes(staff.type)) return null;
          const passwordsMatch = await bcrypt.compare(password, staff.password);
          if (passwordsMatch) {
            return { id: staff.id.toString(), name: staff.firstName + " " + staff.lastName, email: staff.mobileNumber.toString() }
          }
        }

        return null;
      },
    }),
  ],
});
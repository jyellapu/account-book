'use server';
import { auth, signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { prisma } from '../../db';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function getUserSession() {
    try {
        const userSession = await auth();
        console.log('user session on server side is ', userSession)
        if (!userSession || !userSession.user || !userSession.user.email) {
            throw new Error("User session is empty.")
        }
        const user = await prisma.staff.findFirstOrThrow({
            where: {
                mobileNumber: userSession.user.email,

            }, select: {
                id: true,
                books: {
                    select: {
                        id: true
                    }
                }
            }
        })
        const bookIds = user?.books.map(book => book.id)
        return { id: user.id, bookIds }
    } catch (error) {
        console.log(error)
        throw new Error("Failed to get user session details.")
    }
}
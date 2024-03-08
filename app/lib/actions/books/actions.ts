'use server';

import { ITEMS_PER_PAGE } from '@/app/lib/constants';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { prisma } from '../../db';
import { getUserSession } from '../auth/actions';

const FormSchema = z.object({
  name: z.string().min(3),
})

const AddBook = FormSchema
const UpdateBook = FormSchema

export type State = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
};

export async function addBook(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = AddBook.safeParse({
    name: formData.get('name'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to add account book.',
    };
  }

  // Prepare data for insertion into the database
  const { name } = validatedFields.data;
  const { id: staffId } = await getUserSession()
  try {
    await prisma.book.create({
      data: {
        name,
        staff: {
          connect: { id: staffId }
        }
      }
    })
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to create account book.',
    };
  }
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/books');
  redirect('/books');
}

export async function updateBook(id: number, formData: FormData) {
  // Validate form using Zod
  const validatedFields = UpdateBook.safeParse({
    name: formData.get('name'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to update account book.',
    };
  }

  // Prepare data for insertion into the database
  const { name } = validatedFields.data;
  try {
    const { bookIds } = await getUserSession()
    if (!bookIds.includes(id)) {
      throw new Error('Invalid book id.')
    }

    await prisma.book.update({
      where: {
        id
      },
      data: {
        name,
        updatedAt: new Date()

      }
    })
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to update account book.',
    };
  }
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/books');
  redirect('/books');
}

export async function deleteBook(id: number) {
  console.log("Deleting book with id %d", id)
  try {
    const { bookIds } = await getUserSession()
    if (!bookIds.includes(id)) {
      throw new Error('Invalid book id.')
    }

    await prisma.book.delete({
      where: {
        id
      }
    })
  } catch (error) {
    console.log(error)
    return { message: 'Database Error: Failed to delete account book' };
  }
  revalidatePath('/books');
}

export async function getAccountBooks() {
  try {

    const accountBooks = await prisma.book.findMany({
      select: {
        id: true,
        name: true
      }
    })
    return accountBooks
  } catch (error) {
    throw new Error("Failed to get account book details.")
  }
}

export async function getBookById(id: number) {
  console.log("id in get account book is %d", id)
  try {
    const { bookIds } = await getUserSession()
    if (!bookIds.includes(id)) {
      throw new Error('Invalid book id.')
    }

    const book = await prisma.book.findUnique({
      where: {
        id
      }
    })
    return book;
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get account book.')
  }

}

export async function getFilteredAccountBooks(query: string, currentPage: number) {
  try {
    const { bookIds } = await getUserSession()
    return await prisma.book.findMany({
      where: {
        id: {
          in: bookIds,
        },
        name: {
          contains: query,
          mode: 'insensitive'
        },
      },
      select: {
        id: true,
        name: true,
        createdAt: true
      },
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE
    })
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get filtered account.')
  }

}

export async function getAccountBooksPages(query: string) {
  try {
    const { bookIds } = await getUserSession()
    const count = await prisma.book.count({
      where: {
        id: {
          in: bookIds
        },
        name: {
          contains: query,
          mode: 'insensitive'

        }
      }
    })
    const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get total account book pages.')
  }

}
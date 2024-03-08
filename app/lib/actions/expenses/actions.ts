'use server';

import { ITEMS_PER_PAGE } from '@/app/lib/constants';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { prisma } from '../../db';
import { getUserSession } from '../auth/actions';

const FormSchema = z.object({
  bookId: z.coerce.number(),
  name: z.string().min(2),
  date: z.coerce.date().max(new Date()),
  amount: z.coerce.number(),
})

const AddExpense = FormSchema
const UpdateExpense = FormSchema

export type State = {
  errors?: {
    name?: string[];
    date?: string[];
    amount?: string[];
  };
  message?: string | null;
};

export async function addExpense(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = AddExpense.safeParse({
    bookId: formData.get('bookId'),
    name: formData.get('name'),
    date: formData.get('date'),
    amount: formData.get('amount'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to create expense.',
    };
  }

  // Prepare data for insertion into the database
  const { bookId, name, date, amount } = validatedFields.data;
  try {
    const { bookIds } = await getUserSession()
    if (!bookIds.includes(bookId)) {
      throw new Error('Invalid book id.')
    }

    await prisma.expense.create({
      data: {
        name,
        date,
        amount,
        book: {
          connect: {
            id: bookId
          }
        }
      }
    })
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log(error)
    return {
      message: 'Database Error: Failed to create expense.',
    };
  }
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath(`/books/${bookId}/dashboard/expenses`);
  redirect(`/books/${bookId}/dashboard/expenses`);
}

export async function updateExpense(expenseId: number, formData: FormData) {
  // Validate form using Zod
  const validatedFields = UpdateExpense.safeParse({
    bookId: formData.get('bookId'),
    name: formData.get('name'),
    date: formData.get('date'),
    amount: formData.get('amount'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to update expense.',
    };
  }

  // Prepare data for insertion into the database
  const { bookId, name, date, amount } = validatedFields.data;
  try {
    const { bookIds } = await getUserSession()
    if (!bookIds.includes(bookId)) {
      throw new Error('Invalid book id.')
    }

    await prisma.expense.update({
      where: {
        id: expenseId,
        bookId: bookId,
      },
      data: {
        name,
        date,
        amount,
        updatedAt: new Date()
      }
    })
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log(error)
    return {
      message: 'Database Error: Failed to update expense.',
    };
  }
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath(`/books/${bookId}/dashboard/expenses`);
  redirect(`/books/${bookId}/dashboard/expenses`);
}

export async function deleteExpense(bookId: number, expenseId: number) {
  console.log("Deleting expense with id %d", expenseId)
  try {
    const { bookIds } = await getUserSession()
    if (!bookIds.includes(bookId)) {
      throw new Error('Invalid book id.')
    }

    await prisma.expense.delete({
      where: {
        id: expenseId,
        bookId: bookId
      }
    })
  } catch (error) {
    console.log(error)
    return { message: 'Database Error: Failed to delete expense' };
  }
  revalidatePath(`/books/${bookId}/dashboard/expenses`);
}

export async function getExpenseById(bookId: number, expenseId: number) {
  console.log("id in get expense is %d", expenseId)
  try {
    const { bookIds } = await getUserSession()
    if (!bookIds.includes(bookId)) {
      throw new Error('Invalid book id.')
    }

    const customer = await prisma.expense.findUnique({
      where: {
        id: expenseId,
        bookId: bookId
      },
      select: {
        id: true,
        name: true,
        date: true,
        amount: true,
      }
    })
    return customer;
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get expense with id ')
  }

}

export async function getFilteredExpenses(bookId: number, date: string, currentPage: number) {
  try {
    const { bookIds } = await getUserSession()
    if (!bookIds.includes(bookId)) {
      throw new Error('Invalid book id.')
    }
    return await prisma.expense.findMany({
      where: {
        bookId: bookId,
        date: new Date(date)
      },
      select: {
        id: true,
        name: true,
        date: true,
        amount: true,
      },
      orderBy: {
        updatedAt: 'desc'
      },
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE
    })
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get filtered expenses.')
  }

}

export async function getExpensePages(bookId: number, date: string) {
  try {
    const { bookIds } = await getUserSession()
    if (!bookIds.includes(bookId)) {
      throw new Error('Invalid book id.')
    }

    const count = await prisma.expense.count({
      where: {
        bookId: bookId,
        date: new Date(date)
      }
    })
    const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get total expense pages.")
  }
}
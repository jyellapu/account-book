'use server';

import { AccountStatusType, PaymentType } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { ITEMS_PER_PAGE } from '../../constants';
import { prisma } from '../../db';
import { convertUTCtoUserTimezone } from '../../utils';
import { getUserSession } from '../auth/actions';

const FormSchema = z.object({
  bookId: z.coerce.number(),
  customerId: z.coerce.number(),
  amount: z.coerce.number().min(1),
  openedAt: z.coerce.date(),
  dueDate: z.coerce.date(),
  status: z.enum([AccountStatusType.OPEN, AccountStatusType.CLOSED]),
  paymentType: z.enum([PaymentType.CASH, PaymentType.UPI])
})

const AddAccount = FormSchema.omit({ status: true })
const UpdateAccount = FormSchema

export type State = {
  errors?: {
    amount?: string[];
    openedAt?: string[];
    dueDate?: string[];
  };
  message?: string | null;
};

export async function addAccount(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = AddAccount.safeParse({
    bookId: formData.get('bookId'),
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    openedAt: formData.get('openedAt'),
    dueDate: formData.get('dueDate'),
    paymentType: formData.get('paymentType')

  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to create account.',
    };
  }

  // Prepare data for insertion into the database
  const { bookId, customerId, amount, openedAt, dueDate, paymentType } = validatedFields.data;
  try {
    if (openedAt.getTime() > convertUTCtoUserTimezone(new Date()).getTime()) {
      throw new Error('Account open date is in future.')
    }

    if (dueDate.getTime() < openedAt.getTime()) {
      throw new Error('Due date is less than opened date.')
    }

    const { bookIds } = await getUserSession()
    if (!bookIds.includes(bookId)) {
      throw new Error('Invalid book id.')
    }
    await prisma.account.create({
      data: {
        amount,
        openedAt,
        dueDate,
        paymentType,
        customer: {
          connect: {
            id: customerId,
            bookId: bookId
          }
        }
      },
    })
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log(error);
    return {
      message: 'Database Error: Failed to create account.',
    };
  }
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath(`/books/${bookId}/dashboard/customers/${customerId}/accounts`);
  redirect(`/books/${bookId}/dashboard/customers/${customerId}/accounts`);
}

export async function updateAccount(accountId: number, formData: FormData) {
  // Validate form using Zod
  const validatedFields = UpdateAccount.safeParse({
    bookId: formData.get('bookId'),
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    openedAt: formData.get('openedAt'),
    dueDate: formData.get('dueDate'),
    status: formData.get('status'),
    paymentType: formData.get('paymentType')

  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to create account.',
    };
  }

  // Prepare data for insertion into the database
  const { bookId, customerId, amount, openedAt, dueDate, status, paymentType } = validatedFields.data;
  try {
    if (openedAt.getTime() > convertUTCtoUserTimezone(new Date()).getTime()) {
      throw new Error('Account open date is in future.')
    }

    if (dueDate.getTime() < openedAt.getTime()) {
      throw new Error('Due date is less than opened date.')
    }

    const { bookIds } = await getUserSession()
    if (!bookIds.includes(bookId)) {
      throw new Error('Invalid book id.')
    }

    await prisma.account.update({
      where: {
        id: accountId,
        customer: {
          id: customerId,
          bookId: bookId
        }
      },
      data: {
        amount,
        openedAt,
        dueDate,
        status,
        paymentType,
        updatedAt: new Date()
      }
    })
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log(error);
    return {
      message: 'Database Error: Failed to update account.',
    };
  }
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath(`/books/${bookId}/dashboard/customers/${customerId}/accounts`);
  redirect(`/books/${bookId}/dashboard/customers/${customerId}/accounts`);
}

export async function deleteAccount(bookId: number, customerId: number, accountId: number) {

  console.log("Deleting customer account with id %d", accountId)
  try {
    const { bookIds } = await getUserSession()
    if (!bookIds.includes(bookId)) {
      throw new Error('Invalid book id.')
    }

    await prisma.account.delete({
      where: {
        id: accountId,
        customer: {
          id: customerId,
          bookId: bookId
        }
      }
    })
  } catch (error) {
    return { message: 'Database Error: Failed to delete account' };
  }
  revalidatePath(`/books/${bookId}/dashboard/customers/${customerId}/accounts/`);
}

export async function getCustomerAccountById(bookId: number, customerId: number, accountId: number) {
  try {
    const { bookIds } = await getUserSession()
    if (!bookIds.includes(bookId)) {
      throw new Error('Invalid book id.')
    }
    const customer = await prisma.account.findFirst({
      where: {
        id: accountId,
        customer: {
          id: customerId,
          bookId: bookId
        }

      },
      select: {
        id: true,
        amount: true,
        openedAt: true,
        dueDate: true,
        status: true,
        paymentType: true,
      }
    })
    return customer;
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get customer account with id ')
  }

}

export async function getFilteredCustomerAccounts(bookId: number, customerId: number, currentPage: number) {
  try {
    const { bookIds } = await getUserSession()
    if (!bookIds.includes(bookId)) {
      throw new Error('Invalid book id.')
    }
    return await prisma.account.findMany({
      where: {
        customer: {
          id: customerId,
          bookId: bookId
        }
      },
      select: {
        id: true,
        amount: true,
        openedAt: true,
        dueDate: true,
        status: true,
        paymentType: true,
      },
      orderBy: {
        status: 'asc'
      },
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    })
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get filtered customer.')
  }

}

export async function getCustomerAccountPages(bookId: number, customerId: number) {
  try {
    const { bookIds } = await getUserSession()
    if (!bookIds.includes(bookId)) {
      throw new Error('Invalid book id.')
    }

    const count = await prisma.account.count({
      where: {
        customer: {
          id: customerId,
          bookId: bookId
        }
      }
    })
    const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get total customer account pages.")
  }
}
'use server';

import { ITEMS_PER_PAGE } from '@/app/lib/constants';
import { PaymentType } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { prisma } from '../../db';
import { getUserSession } from '../auth/actions';
import { convertUTCtoUserTimezone } from '../../utils';

const FormSchema = z.object({
  bookId: z.coerce.number(),
  customerId: z.coerce.number(),
  accountId: z.coerce.number(),
  amount: z.coerce.number().min(1),
  date: z.coerce.date(),
  paymentType: z.enum([PaymentType.CASH, PaymentType.UPI])
})

const AddTransaction = FormSchema
const UpdateTransaction = FormSchema

export type State = {
  errors?: {
    amount?: string[];
    date?: string[];
    paymentType?: string[];
  };
  message?: string | null;
};

export async function addTransaction(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = AddTransaction.safeParse({
    bookId: formData.get('bookId'),
    customerId: formData.get('customerId'),
    accountId: formData.get('accountId'),
    amount: formData.get('amount'),
    date: formData.get('date'),
    paymentType: formData.get('paymentType'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to create transaction.',
    };
  }

  // Prepare data for insertion into the database
  const { bookId, customerId, accountId, amount, date, paymentType } = validatedFields.data;
  try {
    if (date.getTime() > convertUTCtoUserTimezone(new Date()).getTime()) {
      throw new Error('Transaction date is in future.')
    }
    const { id: staffId, bookIds } = await getUserSession()
    if (!bookIds.includes(bookId)) {
      throw new Error('Invalid book id.')
    }
    await prisma.transaction.create({
      data: {
        amount,
        date,
        paymentType,
        createdByStaff: {
          connect: {
            id: staffId
          }
        },
        account: {
          connect: {
            id: accountId,
            customer: {
              id: customerId,
              book: {
                id: bookId
              }
            }
          }
        }
      }
    })
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log(error);
    return {
      message: 'Database Error: Failed to create transaction.',
    };
  }
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath(`/books/${bookId}/dashboard/customers/${customerId}/accounts/${accountId}/transactions`);
  redirect(`/books/${bookId}/dashboard/customers/${customerId}/accounts/${accountId}/transactions`);
}

export async function updateTransaction(transactionId: number, prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = UpdateTransaction.safeParse({
    bookId: formData.get('bookId'),
    customerId: formData.get('customerId'),
    accountId: formData.get('accountId'),
    amount: formData.get('amount'),
    date: formData.get('date'),
    paymentType: formData.get('paymentType'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to create transaction.',
    };
  }

  // Prepare data for insertion into the database
  const { bookId, customerId, accountId, amount, date, paymentType } = validatedFields.data;
  try {
    if (date.getTime() > convertUTCtoUserTimezone(new Date()).getTime()) {
      throw new Error('Transaction date is in future.')
    }

    const { id: staffId, bookIds } = await getUserSession()
    if (!bookIds.includes(bookId)) {
      throw new Error('Invalid book id.')
    }
    await prisma.transaction.update({
      where: {
        id: transactionId,
        account: {
          id: accountId,
          customer: {
            id: customerId,
            bookId: bookId
          }
        }
      },
      data: {
        amount,
        date,
        paymentType,
        updatedAt: new Date()
      }
    })
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log(error);
    return {
      message: 'Database Error: Failed to update transaction.',
    };
  }
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath(`/books/${bookId}/dashboard/customers/${customerId}/accounts/${accountId}/transactions`);
  redirect(`/books/${bookId}/dashboard/customers/${customerId}/accounts/${accountId}/transactions`);
}

export async function deleteTransaction(bookId: number, customerId: number, accountId: number, transactionId: number) {
  try {
    const { bookIds } = await getUserSession()
    if (!bookIds.includes(bookId)) {
      throw new Error('Invalid book id.')
    }

    await prisma.transaction.delete({
      where: {
        id: transactionId,
        account: {
          id: accountId,
          customer: {
            id: customerId,
            bookId: bookId
          }
        }
      }
    })
  } catch (error) {
    return { message: 'Database Error: Failed to delete transaction.' };
  }
  revalidatePath(`/books/${bookId}/dashboard/customers/${customerId}/accounts/${accountId}/transactions`);
}


export async function getTransactionById(bookId: number, customerId: number, accountId: number, transactionId: number) {
  try {
    const { bookIds } = await getUserSession()
    if (!bookIds.includes(bookId)) {
      throw new Error('Invalid book id.')
    }
    const transaction = await prisma.transaction.findUnique({
      where: {
        id: transactionId,
        account: {
          id: accountId,
          customer: {
            id: customerId,
            bookId: bookId
          }
        }
      },
      select: {
        id: true,
        amount: true,
        date: true,
        paymentType: true,
      }
    })
    return transaction;
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get transaction with id ')
  }

}

export async function getFilteredTransactions(bookId: number, customerId: number, accountId: number, currentPage: number) {
  try {
    return await prisma.transaction.findMany({
      where: {
        account: {
          id: accountId,
          customer: {
            id: customerId,
            bookId: bookId
          }
        }
      },
      select: {
        id: true,
        amount: true,
        date: true,
        paymentType: true,
        createdAt: true,
        createdByStaff: {
          select: {
            name: true
          }
        }
      },
      orderBy: [
        { date: 'desc' },
        { createdAt: 'desc' }
      ],
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE
    })
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get filtered transactions.')
  }

}

export async function getTransactionPages(bookId: number, customerId: number, accountId: number) {
  try {
    const count = await prisma.transaction.count({
      where: {
        account: {
          id: accountId,
          customer: {
            id: customerId,
            bookId: bookId
          }
        }
      }
    })
    const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get total customer account transaction pages.")
  }
}

export async function getCustomerPaidAmount(bookId: number, customerId: number, accountId: number) {
  try {
    const totalAmountPaid = await prisma.transaction.aggregate({
      _sum: {
        amount: true
      },
      where: {
        account: {
          id: accountId,
          customer: {
            id: customerId,
            bookId: bookId
          }
        }
      }
    })

    return totalAmountPaid._sum.amount || 0;
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get customer total paid amount.')
  }
}
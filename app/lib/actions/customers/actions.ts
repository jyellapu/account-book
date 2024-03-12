'use server';

import { ITEMS_PER_PAGE } from '@/app/lib/constants';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { prisma } from '../../db';
import { capitalize } from '../../utils';
import { getUserSession } from '../auth/actions';

const FormSchema = z.object({
  bookId: z.coerce.number(),
  firstName: z.string().min(3).transform(capitalize),
  lastName: z.string().min(1).transform(capitalize),
  mobileNumber: z.coerce.number()
})

const AddCustomer = FormSchema
const UpdateCustomer = FormSchema

export type State = {
  errors?: {
    firstName?: string[];
    lastName?: string[];
    mobileNumber?: string[];
  };
  message?: string | null;
};

export async function addCustomer(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = AddCustomer.safeParse({
    bookId: formData.get('bookId'),
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    mobileNumber: formData.get('mobileNumber'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to create customer.',
    };
  }

  // Prepare data for insertion into the database
  const { bookId, firstName, lastName, mobileNumber } = validatedFields.data;
  try {
    const { bookIds } = await getUserSession()
    if (!bookIds.includes(bookId)) {
      throw new Error('Invalid book id.')
    }

    await prisma.customer.create({
      data: {
        firstName,
        lastName,
        mobileNumber: mobileNumber.toString(),
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
      message: 'Database Error: Failed to create customer.',
    };
  }
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath(`/books/${bookId}/dashboard/customers`);
  redirect(`/books/${bookId}/dashboard/customers`);
}

export async function updateCustomer(customerId: number, formData: FormData) {
  // Validate form using Zod
  const validatedFields = UpdateCustomer.safeParse({
    bookId: formData.get('bookId'),
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    mobileNumber: formData.get('mobileNumber'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to update customer.',
    };
  }

  // Prepare data for insertion into the database
  const { bookId, firstName, lastName, mobileNumber } = validatedFields.data;
  try {
    const { bookIds } = await getUserSession()
    if (!bookIds.includes(bookId)) {
      throw new Error('Invalid book id.')
    }

    await prisma.customer.update({
      where: {
        id: customerId,
        bookId: bookId
      },
      data: {
        firstName,
        lastName,
        mobileNumber: mobileNumber.toString(),
        updatedAt: new Date()
      }
    })
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to update customer.',
    };
  }
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath(`/books/${bookId}/dashboard/customers`);
  redirect(`/books/${bookId}/dashboard/customers`);
}

export async function deleteCustomer(bookId: number, customerId: number) {
  console.log("Deleting customer with id %d", customerId)
  try {
    const { bookIds } = await getUserSession()
    if (!bookIds.includes(bookId)) {
      throw new Error('Invalid book id.')
    }

    await prisma.customer.delete({
      where: {
        id: customerId,
        bookId: bookId
      }
    })
  } catch (error) {
    console.log(error)
    return { message: 'Database Error: Failed to delete customer' };
  }
  revalidatePath(`/books/${bookId}/dashboard/customers`);
}

export async function getCustomers() {
  try {
    const customers = await prisma.customer.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })
    return customers
  } catch (error) {
    throw new Error("Failed to get customer details.")
  }
}

export async function getCustomerById(bookId: number, customerId: number) {
  console.log("id in get customer is %d", customerId)
  try {
    const { bookIds } = await getUserSession()
    if (!bookIds.includes(bookId)) {
      throw new Error('Invalid book id.')
    }
    const customer = await prisma.customer.findUnique({
      where: {
        id: customerId,
        bookId: bookId
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        mobileNumber: true,
      }
    })
    return customer;
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get customer with id ')
  }

}

export async function getFilteredCustomers(bookId: number, query: string, currentPage: number) {
  try {
    const { bookIds } = await getUserSession()
    if (!bookIds.includes(bookId)) {
      throw new Error('Invalid book id.')
    }

    return await prisma.customer.findMany({
      where: {
        bookId: bookId,
        OR: [
          {
            firstName: {
              contains: query,
              mode: 'insensitive'

            }
          },
          {
            lastName: {
              contains: query,
              mode: 'insensitive'
            }
          }
        ]
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        mobileNumber: true,
      },
      orderBy: {
        firstName: 'asc',
      },
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    })
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get filtered customer.')
  }

}

export async function getCustomersPages(bookId: number, query: string) {
  try {
    const { bookIds } = await getUserSession()
    if (!bookIds.includes(bookId)) {
      throw new Error('Invalid book id.')
    }

    const count = await prisma.customer.count({
      where: {
        bookId: bookId,
        OR: [
          {
            firstName: {
              contains: query,
              mode: 'insensitive'

            }
          },
          {
            lastName: {
              contains: query,
              mode: 'insensitive'
            }
          }
        ]
      }
    })
    const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get total customer pages.")
  }
}
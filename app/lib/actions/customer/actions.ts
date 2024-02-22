'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { prisma } from '../../db';

const FormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
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
  console.log(formData)
  // Validate form using Zod
  const validatedFields = AddCustomer.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    mobileNumber: formData.get('mobileNumber'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  // Prepare data for insertion into the database
  const { firstName, lastName, mobileNumber } = validatedFields.data;
  try {
    await prisma.user.create({
      data: {
        firstName,
        lastName,
        mobileNumber: mobileNumber.toString(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to create customer.',
    };
  }
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}

export async function updateCustomer(id: number, formData: FormData) {
  console.log(formData)
  // Validate form using Zod
  const validatedFields = UpdateCustomer.safeParse({
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
  const { firstName, lastName, mobileNumber } = validatedFields.data;
  try {
    await prisma.user.update({
      where: {
        id: id
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
  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}

export async function deleteCustomer(id: number) {
  console.log("Deleting customer with id %d", id)
  try {
    await prisma.user.delete({
      where: {
        id
      }
    })
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice' };
  }
  revalidatePath('/dashboard/customers');
}

export async function getCustomers() {
  try {
    const customers = await prisma.user.findMany({
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

export async function getCustomerById(id: number) {
  console.log("id in get customer is %d", id)
  try {
    const customer = await prisma.user.findUnique({
      where: {
        id: Number(id)
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

const ITEMS_PER_PAGE = 6;
export async function getFilteredCustomers(query: string, currentPage: number) {
  try {
    return await prisma.user.findMany({
      where: {
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
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE
    })
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get filtered customer.')
  }

}

export async function getCustomersPages(query: string) {
  try {
    const count = await prisma.user.count({
      where: {
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
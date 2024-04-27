"use server";
import { ITEMS_PER_PAGE } from "@/app/lib/constants";
import { prisma } from "../../db";

export async function getDailySlip(
  bookId: number,
  date: string,
  currentPage: number
) {
  try {
    const customerAccounts = await prisma.customer.findMany({
      where: {
        bookId: bookId,
      },
      select: {
        accounts: {
          select: { id: true },
        },
      },
    });
    const accountIds: number[] = [];
    customerAccounts.forEach((customerAccount) => {
      customerAccount.accounts.forEach((account) =>
        accountIds.push(account.id)
      );
    });
    return await prisma.transaction.findMany({
      where: {
        accountId: {
          in: accountIds,
        },
        date: new Date(date),
      },
      select: {
        id: true,
        amount: true,
        date: true,
        paymentType: true,
        account: {
          select: {
            id: true,
            customer: true,
          },
        },
      },
      orderBy: {
        account: {
          customer: {
            firstName: "desc",
          },
        },
      },
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get daily slip.");
  }
}

export async function getDailySlipTotal(bookId: number, date: string) {
  try {
    const customerAccounts = await prisma.customer.findMany({
      where: {
        bookId: bookId,
      },
      select: {
        accounts: {
          select: { id: true },
        },
      },
    });
    const accountIds: number[] = [];
    customerAccounts.forEach((customerAccount) => {
      customerAccount.accounts.forEach((account) =>
        accountIds.push(account.id)
      );
    });
    const totalAmount = await prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        accountId: {
          in: accountIds,
        },
        date: new Date(date),
      },
    });
    return totalAmount._sum.amount || 0;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get daily slip total.");
  }
}

export async function getDailySlipPages(bookId: number, date: string) {
  try {
    const customerAccounts = await prisma.customer.findMany({
      where: {
        bookId: bookId,
      },
      select: {
        accounts: {
          select: { id: true },
        },
      },
    });
    const accountIds: number[] = [];
    customerAccounts.forEach((customerAccount) => {
      customerAccount.accounts.forEach((account) =>
        accountIds.push(account.id)
      );
    });
    const count = await prisma.transaction.count({
      where: {
        accountId: {
          in: accountIds,
        },
        date: new Date(date),
      },
    });
    const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get daily slip pages.");
  }
}

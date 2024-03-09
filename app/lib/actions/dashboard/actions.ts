'use server'

import { AccountStatusType } from "@prisma/client"
import { prisma } from "../../db"

export async function getCardData(bookId: number) {
    const totalCustomersPromise = prisma.customer.aggregate({
        _count: {
            id: true,
        },
        where: {
            bookId: bookId
        }
    })

    const totalOpenAccountsPromise = prisma.account.aggregate({
        _count: {
            id: true,
        },
        where: {
            status: AccountStatusType.OPEN,
            customer: {
                bookId: bookId
            },
        }
    })

    const totalAmountGivenPromise = prisma.account.aggregate({
        _sum: {
            amount: true
        },
        where: {
            status: AccountStatusType.OPEN,
            customer: {
                bookId: bookId
            }
        }
    })

    const totalAmountCollectedPromise = prisma.transaction.aggregate({
        _sum: {
            amount: true
        },
        where: {
            account: {
                status: AccountStatusType.OPEN,
                customer: {
                    bookId: bookId
                }
            }
        }
    })
    const data = await Promise.all([
        totalCustomersPromise,
        totalOpenAccountsPromise,
        totalAmountGivenPromise,
        totalAmountCollectedPromise
    ])
    const totalCustomers = data[0]._count.id
    const totalOpenAccounts = data[1]._count.id
    const totalAmountGiven = Number(data[2]._sum.amount)
    const totalAmountCollected = Number(data[3]._sum.amount)
    const totalAmountPending = totalAmountGiven - totalAmountCollected

    return { totalCustomers, totalOpenAccounts, totalAmountCollected, totalAmountPending }
}
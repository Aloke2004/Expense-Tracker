'use client';

import React, {useState, useEffect} from 'react';
import { useUser } from '@clerk/nextjs';
import CardInfo from './_components/CardInfo';
import { db } from '../../../../utils/dbConfig';
import { Budgets, Expenses } from '../../../../utils/schema';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import BarChartDashboard from './_components/BarChartDashboard';
import BudgetItem from './budgets/_components/BudgetItem';
import ExpenseListTable from './expenses/_components/ExpenseListTable';

export default function Dashboard(){
  const {user} = useUser(); 

  const [budgetList, setBudgetList] = useState([]);
  const [incomeList, setIncomeList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);

  useEffect(() => {
    user && getBudgetList();
  }, [user]);

  /**
   * used to get budget List
   */
  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),

        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));
    setBudgetList(result);
    getAllExpenses();
  };

  /**
   * Used to get All expenses belong to users
   */
  const getAllExpenses = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
      .orderBy(desc(Expenses.id));
    setExpensesList(result);
  };

  return (
    <div className='p-8'>
      <h2 className='font-bold text-4xl'>Hi, {user?.fullName}</h2>
      <p className="text-gray-500 mt-2">
        Here's what happenning with your money, Lets Manage your expense
      </p>
      <CardInfo budgetList={budgetList} />
      <div className='grid grid-cols-1 md:grid-cols-3 mt-8 gap-5'>
        <div className='md:col-span-2'>
          <BarChartDashboard budgetList={budgetList}/>
          <ExpenseListTable expensesList={expensesList} refreshData={()=>getBudgetList()} />
        </div>
        <div className='gap-4'>
          <h2 className='font-bold text-lg mb-4'>Latest Budgets</h2>
          {budgetList.map((budget, index) => (
            <BudgetItem budget={budget} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}



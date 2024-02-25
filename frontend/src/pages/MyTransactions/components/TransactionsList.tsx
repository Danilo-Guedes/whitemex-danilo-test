import { Transaction } from "@/types/transactions";
import TransactionCard from "./TransactionCard";

type TransactionListProps = {
  transactions: Transaction[];
};

function TransactionsList({ transactions }: TransactionListProps) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl font-bold text-primary my-10">
        Minhas Transações
      </span>
      <div className="flex flex-col gap-10">
        {transactions.map((transaction) => {
          return (
            <TransactionCard key={transaction._id} transaction={transaction} />
          );
        })}
      </div>
    </div>
  );
}
export default TransactionsList;

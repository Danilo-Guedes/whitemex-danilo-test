import { getTransactionsApi } from "@/api/transactions";
import PageTemplate from "@/components/shared/PageTemplate";
import SadFaceSvg from "@/svg/sad-face.svg";
import { useQuery } from "@tanstack/react-query";
import TransactionsList from "./components/TransactionsList";
import TransactionSkeleton from "./components/TransactionSkeleton";

function MyTransactions() {
  // const data = [];

  const { data : transactions, isLoading } = useQuery({
    queryKey: ["transactions-list"],
    queryFn: getTransactionsApi,
  });
  return (
    <PageTemplate>
      {isLoading ? (
        <TransactionSkeleton />
      ) : transactions?.length === 0 ? (
        <div className="flex flex-col items-center my-20">
          <img src={SadFaceSvg} className="w-full max-h-96" />
          <h2 className="text-xl text-secondary font-bold text-center">
            Opa, você ainda não tem transações registradas
          </h2>
        </div>
      ) : (
        <div className="mb-20">
          <TransactionsList transactions={transactions} />
        </div>
      )}
    </PageTemplate>
  );
}

export default MyTransactions;

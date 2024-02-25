import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Transaction } from "@/types/transactions";
import { ROUTES } from "@/utils/routes";
import { Link } from "react-router-dom";

type TransactionCardProps = {
  transaction: Transaction;
};
function TransactionCard({ transaction }: TransactionCardProps) {
  const formatedDate = new Date(transaction.created_at).toLocaleDateString(
    "pt-BR",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
  const formatedValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(transaction.value);
  return (
    <Link
      to={ROUTES.transactionsById(transaction._id)}
      className="hover:scale-[101%] transition-transform duration-300 w-full"
    >
      <Card className="flex flex-col md:flex-row flex-1 p-5 gap-5 shadow-lg shadow-secondary ">
        <CardHeader className="flex p-0 items-center justify-center text-muted-foreground">
          <span>{formatedDate}</span>
        </CardHeader>
        <CardContent className="flex text-center md:text-start w-full flex-col justify-around p-0 gap-5 lg:gap-8">
          <span>Nome: {transaction.name}</span>
          <span>Nº Cartão: {transaction.number_card}</span>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-end">
          <span className="text-lg text-destructive font-semibold">{formatedValue}</span>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default TransactionCard;

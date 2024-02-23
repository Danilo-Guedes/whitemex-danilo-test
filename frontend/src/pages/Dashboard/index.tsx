import PageTemplate from "@/components/shared/PageTemplate";
import DashBoardCard from "./components/DashBoardCard";

import MoneySVG from "@/svg/money-transfer.svg";
import DataAnalysisSVG from "@/svg/data-analyzing.svg";
import { ROUTES } from "@/utils/routes";
function DashBoard() {
  return (
    <PageTemplate>
      <div className="flex flex-col p-10 md:flex-row items-center justify-center gap-10 md:gap-24 md:mt-20">
        <DashBoardCard
          title="Nova Transação"
          subtitle="Cadastre uma nova transação"
          icon={<img src={MoneySVG} />}
          href={ROUTES.newTransactions}
        />
        <DashBoardCard
          title="Minhas Transação"
          subtitle="Gerencie suas transações aqui"
          icon={<img src={DataAnalysisSVG} />}
          href={ROUTES.myTransactions}
        />
      </div>
    </PageTemplate>
  );
}

export default DashBoard;

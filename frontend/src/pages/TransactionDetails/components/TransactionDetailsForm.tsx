import { useFormik } from "formik";
import * as Yup from "yup";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useParams } from "react-router";
import { ROUTES } from "@/utils/routes";
import { getTransactionsByIdApi } from "@/api/transactions";
import { useEffect } from "react";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Nome do evento é obrigatório"),
  number_card: Yup.string()
    .required("Número do cartão é obrigatório")
    .min(19, "Número do cartão inválido"),
  cvv: Yup.string().required("CVV é obrigatório").min(3, "CVV inválido"),
  date_expiration: Yup.string().required("Data de expiração é obrigatória"),
  value: Yup.string()
    .required("Valor é obrigatório")
    .test("is-zero-value", "Valor não pode ser R$ 0,00", (value) => {
      return parseFloat(value.replace(/\D/g, "")) > 0;
    }),
});

function NewTransactionForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: transaction, isError } = useQuery({
    queryKey: ["transaction", "id"],
    queryFn: async () => await getTransactionsByIdApi(id),
    refetchOnMount: false,
    retry: false,
  });

  const formik = useFormik({
    initialValues: {
      name: transaction?.name,
      number_card: transaction?.number_card,
      cvv: transaction?.cvv,
      date_expiration: transaction?.date_expiration,
      value: transaction?.value,
    },
    validationSchema,
    onSubmit: () => {},
    enableReinitialize: true,
  });

  useEffect(() => {
    if (isError) {
      toast({
        title: "Erro",
        description: "Erro ao buscar a transação",
        variant: "destructive",
      });
      navigate(ROUTES.dashboard);
    }
  }, [isError, toast, navigate]);

  return (
    <>
      <h1 className="text-2xl text-primary font-bold text-center mt-16">
        Detalhes da Transação
      </h1>
      <form
        className="flex flex-col items-center justify-center w-full gap-3 py-10 lg:px-16 xl:px-32 mt-8"
        onSubmit={formik.handleSubmit}
      >
        <div className="w-full flex flex-col lg:grid  lg:grid-cols-2 lg:gap-10">
          <div className="flex flex-col items-start justify-center w-full gap-1">
            <label
              htmlFor="event-name"
              className="text-lg text-secondary font-bold text-center mb-2"
            >
              Nome do títular
            </label>
            <Input
              readOnly
              id="event-name"
              className="w-full border border-primary rounded-lg p-2"
              placeholder="Preencha..."
              autoComplete="off"
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name ? (
              <span className="text-sm text-red-500">{formik.errors.name}</span>
            ) : null}
          </div>
          <div className="flex flex-col items-start justify-center w-full gap-1">
            <label
              htmlFor="event-name"
              className="text-lg text-secondary font-bold text-center mb-2"
            >
              Número do cartão
            </label>
            <Input
              readOnly
              id="event-name"
              className="w-full border border-primary rounded-lg p-2"
              placeholder="Preencha..."
              type="text"
              {...formik.getFieldProps("number_card")}
            />

            {formik.touched.number_card && formik.errors.number_card ? (
              <span className="text-sm text-red-500">
                {formik.errors.number_card}
              </span>
            ) : null}
          </div>
        </div>
        <div className="w-full flex flex-col lg:grid  lg:grid-cols-3 lg:gap-10">
          <div className="flex flex-col items-start justify-center w-full gap-1">
            <label
              htmlFor="event-name"
              className="text-lg text-secondary font-bold text-center mb-2"
            >
              Data de expiração
            </label>
            <Input
              readOnly
              id="event-name"
              className="w-full border border-primary rounded-lg p-2"
              placeholder="Preencha..."
              {...formik.getFieldProps("date_expiration")}
            />
            {formik.touched.date_expiration && formik.errors.date_expiration ? (
              <span className="text-sm text-red-500">
                {formik.errors.date_expiration}
              </span>
            ) : null}
          </div>
          <div className="flex flex-col items-start justify-center w-full gap-1">
            <label
              htmlFor="event-name"
              className="text-lg text-secondary font-bold text-center mb-2"
            >
              CVV
            </label>
            <Input
              readOnly
              id="event-name"
              className="w-full border border-primary rounded-lg p-2"
              placeholder="Preencha..."
              type="number"
              {...formik.getFieldProps("cvv")}
            />
            {formik.touched.cvv && formik.errors.cvv ? (
              <span className="text-sm text-red-500">{formik.errors.cvv}</span>
            ) : null}
          </div>

          <div className="flex flex-col items-start justify-center w-full gap-1">
            <label
              htmlFor="event-name"
              className="text-lg text-secondary font-bold text-center mb-2"
            >
              Valor
            </label>
            <Input
              readOnly
              id="event-name"
              className="w-full border border-primary rounded-lg p-2"
              placeholder="Preencha..."
              {...formik.getFieldProps("value")}
            />
            {formik.touched.value && formik.errors.value ? (
              <span className="text-sm text-red-500">
                {formik.errors.value}
              </span>
            ) : null}
          </div>
        </div>
        <Button
          className="w-full mt-5"
          onClick={(e) => {
            e.preventDefault();
            alert("Em Construção");
          }}
        >
          Editar Transação
        </Button>
        {/* <pre>
          {JSON.stringify(formik.values, null, 2)}
          {JSON.stringify(formik.errors, null, 2)}
          {JSON.stringify(transaction, null, 2)}
          {JSON.stringify(String(isError), null, 2)}
        </pre> */}
      </form>
    </>
  );
}

export default NewTransactionForm;

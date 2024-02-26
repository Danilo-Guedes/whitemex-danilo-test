import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUserData from "@/hooks/useUserData";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router";
import { ROUTES } from "@/utils/routes";
import { createTransactionApi } from "@/api/transactions";

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
  const queryClient = useQueryClient();

  const { user } = useUserData();

  const { mutate } = useMutation({
    mutationFn: createTransactionApi,
    onError: () => {
      toast({
        title: "Opa",
        description: "Algo de errado com a sua criação",
        variant: "destructive",
      });
      formik.resetForm();
    },
    onSuccess: (data) => {
      if (data.created) {
        toast({
          title: "Sucesso",
          description: "transação criada com sucesso",
        });
      }
      queryClient.invalidateQueries({ queryKey: ["transactions-list"] });
      navigate(ROUTES.dashboard);
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      number_card: "",
      cvv: "",
      date_expiration: "",
      value: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (user && user.id) {
        const preparedValues = {
          ...values,
          value: parseFloat(values.value.replace("R$", "").replace(",", ".")),
          user_id: user.id,
        };
        mutate(preparedValues);
      }
    },
  });

  return (
    <>
      <h1 className="text-2xl text-primary font-bold text-center mt-16">
        Nova Transação
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
              id="event-name"
              className="w-full border border-primary rounded-lg p-2"
              placeholder="Preencha..."
              type="text"
              {...formik.getFieldProps("number_card")}
              onChange={(e) => {
                formik.setFieldValue(
                  "number_card",
                  e.target.value
                    .replace(/\D/g, "")
                    .replace(/\s/g, "")
                    .replace(/(\d{4})/g, "$1 ")
                    .trim()
                    .substring(0, 19)
                );
              }}
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
              id="event-name"
              className="w-full border border-primary rounded-lg p-2"
              placeholder="Preencha..."
              {...formik.getFieldProps("date_expiration")}
              onChange={(e) => {
                formik.setFieldValue(
                  "date_expiration",
                  e.target.value
                    .replace(/\D/g, "")
                    .replace(/(\d{2})(\d{2})/, "$1/$2")
                    .substring(0, 5)
                );
              }}
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
              id="event-name"
              className="w-full border border-primary rounded-lg p-2"
              placeholder="Preencha..."
              type="number"
              {...formik.getFieldProps("cvv")}
              onChange={(e) => {
                formik.setFieldValue(
                  "cvv",
                  e.target.value.replace(/\D/g, "").substring(0, 3)
                );
              }}
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
              id="event-name"
              className="w-full border border-primary rounded-lg p-2"
              placeholder="Preencha..."
              {...formik.getFieldProps("value")}
              onChange={(e) => {
                const value =
                  parseFloat(e.target.value.replace(/\D/g, "")) / 100;
                if (isNaN(value)) {
                  formik.setFieldValue("value", "");
                  return;
                }
                formik.setFieldValue(
                  "value",
                  value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                );
              }}
            />
            {formik.touched.value && formik.errors.value ? (
              <span className="text-sm text-red-500">
                {formik.errors.value}
              </span>
            ) : null}
          </div>
        </div>
        <Button type="submit" className="w-full mt-5">
          Adicionar Transação
        </Button>
        {/* <pre>
        {JSON.stringify(formik.values, null, 2)}
        {JSON.stringify(formik.errors, null, 2)}
      </pre> */}
      </form>
    </>
  );
}

export default NewTransactionForm;

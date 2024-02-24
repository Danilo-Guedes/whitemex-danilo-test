import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Calendar } from "lucide-react";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUserData from "@/hooks/useUserData";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router";
import { ROUTES } from "@/utils/routes";
import { createTransactionApi } from "@/api/transaction";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Nome do evento é obrigatório"),
  number_card: Yup.string()
    .required("Número do cartão é obrigatório")
    .min(19, "Número do cartão inválido"),
  cvv: Yup.string().required("CVV é obrigatório").min(3, "CVV inválido"),
  date_expiration: Yup.string().required("Data de expiração é obrigatória"),
  value: Yup.string().required("Valor é obrigatório"),
});

function NewTransactionForm() {
  // const { toast } = useToast();
  // const navigate = useNavigate();
  // const queryClient = useQueryClient();

  // const { user } = useUserData();

  const { mutate } = useMutation({
    mutationFn: createTransactionApi,
    onError: (error) => {
      console.log(error);

      // if (error.response?.data?.error?.includes("overlap")) {
      //   toast({
      //     title: "Opa",
      //     description:
      //       "Você já tem um evento nesse horário, verifique seu calendário",
      //     variant: "destructive",
      //   });

      //   formik.resetForm();

      // }
      // toast({
      //   title: "Opa",
      //   description: "Algo de errado com a sua criação",
      //   variant: "destructive",
      // });
    },
    onSuccess: () => {
      alert("aqui deu bom");
      // if (data?.guestToRemove?.length > 0) {
      //   toast({
      //     title: "Atenção!!",
      //     description: `O Evento ${
      //       data.name
      //     } foi criado, porém o(s) convidado(s) com id ${data?.guestToRemove?.map(
      //       (v) => `${v} `
      //     )} não fora(m) adicionado(s)`,
      //     variant: "warning",
      //   });
      // } else {
      //   toast({
      //     title: "Evento criado com sucesso",
      //     description: `"${data.name}" criado com sucesso`,
      //   });
      // }
      // queryClient.invalidateQueries({ queryKey: ["events-list"] });
      // navigate(ROUTES.events);
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
      console.log({ values });
      // mutate(values);
    },
  });

  return (
    <form
      className="flex flex-col items-center justify-center w-full gap-3 py-10 lg:px-32"
      onSubmit={formik.handleSubmit}
    >
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
                .replace(/\D/g, "") // Replace all non-numeric characters with an empty string
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
        />
        {formik.touched.value && formik.errors.value ? (
          <span className="text-sm text-red-500">{formik.errors.value}</span>
        ) : null}
      </div>
      <Button type="submit" className="w-full mt-5">
        Adicionar Transação
      </Button>
      {/* <pre>
        {JSON.stringify(formik.values, null, 2)}
        {JSON.stringify(formik.errors, null, 2)}
      </pre> */}
    </form>
  );
}

export default NewTransactionForm;

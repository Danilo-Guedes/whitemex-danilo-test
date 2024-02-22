import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router";
import { ROUTES } from "@/utils/routes";
import { LogOutIcon } from "lucide-react";
import { logout } from "@/utils/auth";

import { User } from "@/types/user";

const validationSchema = Yup.object({
  name: Yup.string().required("Nome é obrigatório"),
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  user_since: Yup.date().required("Data de início é obrigatória"),
});

type ProfileFormProps = {
    user: User;
    };

function ProfileForm({ user }: ProfileFormProps) {
  const { toast } = useToast();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log({ values });
    },
  });

  const handleLogout = () => {
    logout();
    toast({
      title: "Até Mais",
      description: `Você foi desconectado com sucesso!`,
    });
    navigate(ROUTES.home);
  };

  return (
    <form
      className="flex flex-col items-center justify-center w-full gap-5 lg:px-52"
      onSubmit={formik.handleSubmit}
    >
      <div className="my-10">
        <div className="overflow-hidden rounded-full ">
          <img src="/images/madruga.jpeg" className="object-cover w-56 h-56" />
        </div>
      </div>
      <div className="flex flex-col items-start justify-center w-full gap-1">
        <label
          htmlFor="event-name"
          className="text-lg text-primary font-bold text-center mb-5"
        >
          Nome
        </label>
        <Input
          disabled
          id="name"
          className="w-full border border-primary rounded-lg p-2"
          placeholder="Preencha..."
          {...formik.getFieldProps("name")}
        />
        {formik.touched.name && formik.errors.name ? (
          <span className="text-sm text-red-500">
            {JSON.stringify(formik.errors.name)}
          </span>
        ) : null}
      </div>
      <div className="flex flex-col items-start justify-center w-full gap-1">
        <label
          htmlFor="event-description"
          className="text-lg text-primary font-bold text-center mb-5"
        >
          E-mail
        </label>
        <Input
          disabled
          id="email"
          className="w-full border border-primary rounded-lg p-2"
          placeholder="Preencha..."
          {...formik.getFieldProps("email")}
        />
        {formik.touched.email && formik.errors.email ? (
          <span className="text-sm text-red-500">
            {JSON.stringify(formik.errors.email)}
          </span>
        ) : null}
      </div>
      <Button
        className="w-full my-10"
        variant="destructive"
        onClick={handleLogout}
      >
        <LogOutIcon className="mr-5" />
        Sair
      </Button>
    </form>
  );
}

export default ProfileForm;

import CustomTypewriter from "@/components/shared/CustomTypewriter";
import SignUpForm from "../../components/shared/SignUpForm";

function SignUp() {
  return (
    <div className="h-full p-2 md:p-5 m-2 flex items-center justify-center ">
      <section className="flex flex-col items-center container">
        <h1 className="text-3xl mt-10">Olá Devs !!</h1>
        <h1 className="text-3xl mt-10 text-center">
          <CustomTypewriter />
        </h1>
        <div className="flex flex-col items-center  lg:flex-row mt-10 w-full border rounded-lg overflow-hidden">
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
            <img
              src="/logos/logo-whitemex.jpg"
              className="w-full self-center md:w-96"
            />
            <img
              src="/images/foto-danilo-green.jpg"
              className="w-full xl:w-1/2  2xl:w-8/12"
            />
          </div>
          <div className="w-full   lg:w-1/2 flex flex-col items-center justify-center p-2  xl:p-10 mt-10 md:mt-0">
            <SignUpForm />
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignUp;

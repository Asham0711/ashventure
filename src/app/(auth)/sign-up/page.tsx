import SignupForm from "@/components/Auth/SignupForm";

const SignupPage = () => {
  return (
    <div className="max-w-screen min-h-screen mx-auto overflow-x-hidden w-full h-full flex justify-center items-center flex-col gap-4 md:mt-12 mb-12 mt-16">
      <SignupForm />
    </div>
  );
};

export default SignupPage;

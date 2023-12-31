"use client";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";

const LoginModal = () => {
  const router = useRouter();
  const RegisterModal = useRegisterModal();
  const LoginModal = useLoginModal();
  const [isLoading, setisLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setisLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setisLoading(false);

      if (callback?.ok) {
        toast.success("Logged in successfully");
        router.refresh();
        LoginModal.onClose();
      }

      if (callback?.error) {
        toast.error("callback.error");
      }
    });
  };

  const toggle = useCallback(() => {
    LoginModal.onClose();
    RegisterModal.onOpen();
  }, [LoginModal, RegisterModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back! " subtitle="Login to your account!" />
      <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button outline label="Continue with Google" icon={FcGoogle} onClick={() => signIn("google")} />
      <Button outline label="Continue with GitHub" icon={AiFillGithub} onClick={() => signIn("github")} />
      <div className="  text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>First time using Airbnb ?</div>
          <div onClick={toggle} className="text-neutral-800 cursor-pointer hover:underline">
            Create an account!
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={LoginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={LoginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;

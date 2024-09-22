import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  //The user id is gotten from params
  const user = await getUser(userId);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container mx-auto">
          <Image
            src={"/assets/icons/logo-full.svg"}
            height={1000}
            width={1000}
            alt="logo-patient"
            className="mb-2 h-10 w-fit"
          />
        </div>
        <RegisterForm user={user} />
        <div className="text-14-regular mt-8 flex justify-between">
          <p className="justify-items-end text-dark-600 xl:text-left">
            © 2024. The Hosiptal Application
          </p>
          <Link href={"/?admin=true"} className="text-green-500">
            Admin
          </Link>
        </div>
      </section>
      <Image
        src="/assets/images/register-img.png"
        alt="patient"
        width={1000}
        height={1000}
        className="side-img max-w-[400px]"
      />
    </div>
  );
};

export default Register;

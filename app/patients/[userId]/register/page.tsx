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
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          {/* <div className="sub-container max-w-[860px] flex-1 flex-col py-10"> */}
          <Image
            src={"/assets/icons/logo-full.svg"}
            height={1000}
            width={1000}
            alt="logo-patient"
            className="mb-2 h-10 w-fit"
          />

          <RegisterForm user={user} />
          <p className="copyright py-12">© 2024. The Hosiptal Application</p>
        </div>
      </section>
      <Image
        src="/assets/images/register-img.png"
        alt="patient"
        width={1000}
        height={3000}
        className="side-img max-w-[400px]"
      />
    </div>
  );
};

export default Register;

import  AppointmentForm  from "@/components/forms/AppointmentForm";
import PatientForm from "@/components/forms/PatientForm";
import Image from "next/image";
import Link from "next/link";

const AppointmentPage = () =>{
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[870px] flex-1 justify-between">
          <Image
            src={"/assets/icons/logo-full.svg"}
            height={1000}
            width={1000}
            alt="logo-patient"
            className="mb-2 h-10 w-fit"
          />
        </div>
        <AppointmentForm />
        
          <p className="justify-items-end text-dark-600 xl:text-left">
            © 2024. The Hosiptal Application
          </p>
      </section>
      <Image
        src="/assets/images/appointment-img.png"
        alt="appointment"
        width={1000}
        height={1000}
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
}

export default AppointmentPage;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateAppointmentSchema } from "@/lib/zodValidation";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAppointment } from "@/lib/actions/appointment.actions";
import { FormFieldType } from "./PatientForm";
import { Doctors } from "@/constant";
import { SelectItem } from "../ui/select";
import Image from "next/image";

interface AppointmentFormProps {
  userId: string;
  patientId: string;
  type: "create" | "cancel" | "schedule";
}

const AppointmentForm = ({ userId, patientId, type }: AppointmentFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof CreateAppointmentSchema>>({
    resolver: zodResolver(CreateAppointmentSchema),
    defaultValues: {
     primaryPhysician: "",
     schedule: new Date(),
     reason: "",
     note:"",
     cancellationReason:"",
    },
  });

  const onSubmit = async (values: z.infer<typeof CreateAppointmentSchema>) => {
    setIsLoading(true);
    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
    }
    try {
      if (type === "create" && patientId) {
        const appointment = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          status: status as Status,
          note: values.note,
        };

        const newAppointment = await createAppointment(appointment);

        if (newAppointment) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  let buttonLabel;
    switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;
    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;
    default:
      buttonLabel = "Submit Apppointment";
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex-1">
        <section className="mb-8 space-y-2">
          <h1 className="header"> New Appointment</h1>
          <p className="text-dark-700"> Request a new appointment</p>
        </section>

        {type !== "cancel" && (
          <>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.SELECT}
              name="primaryPhysician"
              label="Doctor"
              placeholder="Select a doctor"
            >
              {Doctors.map((doctor) => (
                <SelectItem key={doctor.name} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt={doctor.name}
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.DATE_PICKER}
              name="schedule"
              label="Expected Appointment Date"
              showTimeSelect
              dateFormat="dd/MM/yyyy - h:mm aa"
            />

            <div
              className={`flex flex-col gap-6 ${
                type === "create" && "xl:flex-row"
              }`}
            >
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="Appointment reason"
                placeholder="Reasib for appointment"
                disabled={type === "schedule"}
              />

              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="Comments/notes"
                placeholder="Enter notes"
                disabled={type === "schedule"}
              />
            </div>
          </>
        )}

        {type === "cancel" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="Urgent meeting came up"
          />
        )}
        <SubmitButton
          isLoading={isLoading}
          className={`${type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"} w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;

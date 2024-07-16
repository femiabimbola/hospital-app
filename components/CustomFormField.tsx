"use client"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  
import { Input } from "@/components/ui/input"
import { Control } from "react-hook-form"
import { FormFieldType } from "./forms/PatientForm"

interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldType,  //it helps you pick the error
    name: string,
    label?:string ,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?:(field:any) => React.ReactNode
}

const RenderInput = {
  
}

const CustomFormField = ({control, fieldType, name, label}: CustomProps) => {
  return (
    <FormField
    // control={form.control}
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="flex-1">
      {fieldType !== FormFieldType.CHECKBOX && label && (
        <FormLabel> {label} </FormLabel>
      )}
      </FormItem>
    )}
  />
  )
}

export default CustomFormField
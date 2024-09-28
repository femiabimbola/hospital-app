"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { E164Number } from "libphonenumber-js/core";
import { Control } from "react-hook-form";
import { FormFieldType } from "./forms/PatientForm";
import Image from "next/image";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Eye, EyeOff, Key } from "lucide-react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType; //it helps you pick the error
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}



const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => { 
  const { fieldType, iconSrc, iconAlt, placeholder, dateFormat, showTimeSelect   } = props;
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              width={24}
              height={24}
              alt={iconAlt || "icon"}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="NG"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone text-white"
          />
        </FormControl>
      );

    case FormFieldType.DATE_PICKER:
        return (
          <div className="flex rounded-md border border-dark-500 bg-dark-400 text-white">
            <Image src="/assets/icons/calendar.svg" alt=""  height={24} width={24}
              className="ml-2"
            />
            <FormControl>
            <DatePicker selected={field.value} 
             onChange={(date) => field.onChange(date)} 
              dateFormat={dateFormat ?? 'dd/MM/yyyy'}
              showTimeSelect = { showTimeSelect ?? false}
              timeInputLabel="Time"
              wrapperClassName = "date-picker"
            />
            </FormControl>
            
          </div>
        );
  
    case FormFieldType.SKELETON:
      return (<div>

      </div>)
    case FormFieldType.PASSWORD:
     const [showPassword, setShowPassword] = useState(false)
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <Key width={24} 
          height={24}  
          className="text-white ml-2 mt-3"
          />
        <FormControl>
          <Input
            placeholder={placeholder}
            {...field}
            className="shad-input border-0"
            type={showPassword ? 'text': 'password'}
          />
        </FormControl>
        {showPassword ? 
        <EyeOff 
          onClick={() => setShowPassword(false)}
          className="text-white mr-4 mt-3" 
           /> : 
        <Eye className="text-white mr-4 mt-3"
         onClick={() => setShowPassword(true)} />
         }
      </div>
      );
    default:
      break;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className="shad-input-label"> {label} </FormLabel>
          )}
          <RenderInput field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;

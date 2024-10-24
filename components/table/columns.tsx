"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent,DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator,DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import StatusBadge from "../StatusBadge"
import { formatDateTime } from "@/lib/utils"
import { Doctors } from "@/constant"
import Image from "next/image"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell:({row}) =><p className="text-14-medium">{row.index + 1}</p>
  },
  {
    accessorKey:'patient',
    header:'Patient',
    cell:({row}) =>{
      const appointment = row.original;
      return <p className="text-14-medium">{appointment.patient.name}</p>
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell:({row}) =>(
      <div className="min-w-[115px]">
        <StatusBadge status={row.original.status}/>
       </div>
    )
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell:({row}) => (
      <p className="text-14-regular min-w-[100px]">
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    )
  },
  { 
    accessorKey: "primaryPhysician",
    header: () => <div>Doctor</div>,
    cell: ({ row }) => {
      const doctor = Doctors.find((doc)=> doc.name === row.original.primaryPhysician)
 
      return (<div className="flex items-center gap-3">
        <Image src={doctor?.image} alt={doctor.name} width={50} height={50}
         className="size-8"
        />
        <p className="whitespace-nowrap"> Dr. {doctor?.name}</p>
      </div>)
    },
  },

  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      return(
        <div className="flex gap-1">

        </div>
      )
    },
  }
]

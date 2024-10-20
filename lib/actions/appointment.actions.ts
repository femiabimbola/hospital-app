"use server"

import { ID, Query } from "node-appwrite";
import { database, DATABASE_ID, PATIENT_COLLECTION_ID,APPOINTMENT_COLLECTION_ID, } from "../appwrite.config";
import { parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";

//3.10
export const createAppointment = async (appointment: CreateAppointmentParams) => {
  try {
    console.log(appointment)
    const newAppointment = await database.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );
    return parseStringify(newAppointment);
  } catch (error) {
    console.error("An error occurred while creating a new appointment:", error);
  }
}


export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await database.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );

    return parseStringify(appointment);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the existing patient:",
      error
    );
  }
};

//  GET RECENT APPOINTMENTS
export const getRecentAppointmentList = async () => {
  try {
    const appointments = await database.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );
      const initialCounts = {
        scheduledCount: 0,
        pendingCount: 0,
        cancelledCount: 0,
      };
  
      const counts = (appointments.documents as Appointment[]).reduce(
        (acc, appointment) => {
          if (appointment.status === "scheduled"){
            acc.scheduledCount += 1
          }else if (appointment.status === "pending"){
            acc.pendingCount += 1
          } else if ( appointment.status === "cancelled"){
            acc.cancelledCount += 1;
          } 
          return acc;
        },
        initialCounts
      );
      const data = {
        totalCount: appointments.total,
        ...counts,
        documents: appointments.documents,
      };
  
      return parseStringify(data);
  }catch (error) {
    console.error("An error occurred while creating a new appointment:", error);
  }
} 
"use server"


import { ID, Query } from "node-appwrite";
import { database, DATABASE_ID, PATIENT_COLLECTION_ID,APPOINTMENT_COLLECTION_ID, } from "../appwrite.config";
import { parseStringify } from "../utils";

//3.10
export const createAppointment = async (appointment: CreateAppointmentParams) => {
  try {
    const newAppointment = await database.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
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
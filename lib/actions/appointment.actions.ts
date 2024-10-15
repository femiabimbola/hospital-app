"use server"

import { ID } from "node-appwrite";
import { database, DATABASE_ID, PATIENT_COLLECTION_ID } from "../appwrite.config";
import { parseStringify } from "../utils";

export const createAppointment = async (appointment: CreateAppointmentParams) => {
  try {
    const newPatient = await database.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );
    
    return parseStringify(createAppointment);
    
  } catch (error) {
    
  }
 
}
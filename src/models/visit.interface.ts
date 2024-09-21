// export interface Visit {
//     id: number;
//     patientId: string;
//     date: string;
//     reason: string;
//     doctor: string;
//   }
  export interface Visit {
    id: number;
    date: string;
    time: string;
    treatment: string;
    symptoms: string;
    prescribedMedicine: string[];
    adviceToPatient: string;
    // Add other properties as needed
  }

export interface Prescription {
  medicine: string;
  dosage: Dosage;
  id: number;
  name: string;
  afterMeal: AfterMeal;
  durationDays: DurationDays;
}

// Dosage.ts
export interface Dosage {
  amount: number;
  frequency: string; // e.g., 'twice a day'
  // Add other properties as needed
}

// AfterMeal.ts
export interface AfterMeal {
  // Define properties based on your data structure
}

// DurationDays.ts
export interface DurationDays {
  // Define properties based on your data structure
}
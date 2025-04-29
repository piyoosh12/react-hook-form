import { z } from "zod";

/*
    This schema provides information on validations that are carried out in the Edit Life Event Form
*/
export const schema = z.object({
  employerName: z.string().nonempty("Employer's name is required"),
  annualGrossIncome: z
    .string()
    .nonempty("Annual Gross Income is required")
    .regex(
      /^(?!\$0(?:\.00)?$)\$\d{1,3}(,\d{3})*(\.\d{2})?$/,
      "Annual Gross Income must be greater than $0"
    ),
  startDate: z.union([z.date(), z.null()]).refine((date) => date !== null, {
    message: "Employment Start Date is required",
  }),
  endDate: z.date().optional().nullable(),
  notes: z.string().optional(),
});

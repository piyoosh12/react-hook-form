import {
  Box,
  Grid,
  TextField,
  Typography,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { useForm, Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { schema } from "../../utils/validation/lifeEventFormValidations";
import ActionPanel from "../../components/ActionPanel";
import { extractDate } from "../../utils/helper/extractDate";

type FormValues = {
  employerName: string;
  annualGrossIncome: string;
  startDate: Date | null;
  endDate?: Date | null;
  notes?: string;
};

const styles = {
  card: {
    p: 4,
    background: "#f9f9f9",
  },
  gridStyling: { display: "flex", justifyContent: "flex-start" },
  fullWidth: { width: "100%" },
  marginRight: { mr: 2 },
};

const EditLifeEventForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onSubmit",
    resolver: zodResolver(schema),
    defaultValues: {
      employerName: "",
      annualGrossIncome: "",
      startDate: null,
      endDate: null,
      notes: "",
    },
  });

  const annualIncome = watch("annualGrossIncome");
  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const parseCurrency = (value: string) =>
    parseFloat(value.replace(/\$|,/g, "")) || 0;

  const calculateTotalIncome = (): string => {
    if (!startDate || !annualIncome) return "$0";

    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();

    let years =
      end.getFullYear() -
      start.getFullYear() +
      (end.getMonth() - start.getMonth()) / 12;
    if (years < 0) years = 0;
    const income = parseCurrency(annualIncome);
    return (income * years).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
  };

  const onSubmit = (data: FormValues): void => {
    const formattedData = {
      ...data,
      startDate: data.startDate ? extractDate(data.startDate) : null,
      endDate: data.endDate ? extractDate(data.endDate) : null,
    };
    const fileData = JSON.stringify(formattedData, null, 2);
    const blob = new Blob([fileData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.download = "employment_data.json";
    link.href = url;
    link.click();
    alert("File created");
  };

  return (
    <Card sx={styles.card}>
      <CardContent>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 12 }} sx={styles.gridStyling}>
                <Typography variant="h6" gutterBottom fontWeight="600">
                  Edit Life Event
                </Typography>
              </Grid>
              {/* Employer Name Field */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="employerName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Employer's Name"
                      fullWidth
                      sx={{fontWeight:600}}

                      error={!!errors.employerName}
                      helperText={errors.employerName?.message}
                      {...field}
                    />
                  )}
                />
              </Grid>

              {/* Annual Gross Income Field */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="annualGrossIncome"
                  control={control}
                  render={({ field }) => (
                    <NumericFormat
                      {...field}
                      customInput={TextField}
                      label="Annual Gross Income (Amount)"
                      fullWidth
                      thousandSeparator
                      prefix="$"
                      error={!!errors.annualGrossIncome}
                      helperText={errors.annualGrossIncome?.message}
                      onValueChange={(values) => {
                        field.onChange(values.formattedValue);
                      }}
                    />
                  )}
                />
              </Grid>

              {/* Employment Start Date Field */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="Employment Start Date"
                      value={field.value}
                      onChange={field.onChange}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors.startDate,
                          helperText: errors.startDate?.message,
                        },
                      }}
                    />
                  )}
                />
              </Grid>

              {/* Employment End Date(optional) */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="endDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="Employment End Date"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors.endDate,
                          helperText: errors.endDate?.message,
                        },
                      }}
                      {...field}
                    />
                  )}
                />
              </Grid>

              {/* Notes Field*/}
              <Grid size={{ xs: 12, md: 12 }}>
                <Controller
                  name="notes"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      color="primary"
                      label="Notes"
                      fullWidth
                      multiline
                      minRows={5}
                      {...field}
                    />
                  )}
                />
              </Grid>

              {/* Total Income */}
              <Grid size={{ xs: 6, md: 12 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mt={4}
                >
                  <Typography variant="h6" fontWeight="600">
                    Total Income: {calculateTotalIncome()}
                  </Typography>
                </Box>
                  <Divider sx={styles.fullWidth} />
              </Grid>
              <Grid size={{ xs: 6, md: 12 }}>
                {/* Action Panel with Cancel and Save Buttons*/}
                <ActionPanel onCancel={() => reset()} />
              </Grid>
            </Grid>
          </form>
        </LocalizationProvider>
      </CardContent>
    </Card>
  );
};

export default EditLifeEventForm;

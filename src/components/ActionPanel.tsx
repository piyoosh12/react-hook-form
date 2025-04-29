import { Box, Button } from "@mui/material";

interface ActionPanelProps {
  onCancel: () => void;
}
const styles = {
  cancelButton: {
    mr: 2,
    textTransform: "none",
  },
  saveButton: {
    textTransform: "none",
  },
};
const ActionPanel: React.FC<ActionPanelProps> = ({ onCancel }) => {
  return (
    <Box display="flex" justifyContent="flex-end">
      <Button variant="outlined" onClick={onCancel} sx={styles.cancelButton}>
        Cancel
      </Button>
      <Button variant="contained" type="submit" sx={styles.saveButton}>
        Save
      </Button>
    </Box>
  );
};

export default ActionPanel;

// components/ui/Loader.tsx
import { Backdrop, Typography } from "@mui/material";

export const Loader = ({
  open,
  progress,
  message,
}: {
  open: boolean;
  progress?: number;
  message?: string;
}) => {
  return (
    <Backdrop
      sx={{
        zIndex: 9999999999,
        display: "flex",
        flexDirection: "column",
        color: "white",
      }}
      open={open}
    >
      <span className="loader" />
      {message && (
        <Typography variant="h6" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
      {typeof progress === "number" && (
        <Typography variant="body2">{progress}% completado</Typography>
      )}
    </Backdrop>
  );
};

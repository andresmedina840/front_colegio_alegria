"use client";

import {
  Box,
  Paper,
  SxProps,
  Typography,
  useTheme,
  Theme,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";

interface Props {
  children: React.ReactNode;
  title: string;
  icon?: OverridableComponent<SvgIconTypeMap<unknown, "svg">>;
  sx?: SxProps<Theme>;
}

export const EnhancedPaper = ({ children, title, icon: Icon, sx }: Props) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={4}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        bgcolor: theme.palette.background.paper,
        ...sx,
      }}
    >
      <Box
        sx={{
          background: `linear-gradient(90deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
          px: 2,
          py: 1.5,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        {Icon && (
          <Icon
            sx={{
              fontSize: 28,
              color: theme.palette.secondary.contrastText,
              flexShrink: 0,
            }}
          />
        )}

        <Typography
          variant="h6"
          sx={{
            color: theme.palette.secondary.contrastText,
            fontWeight: 600,
            flexGrow: 1,
            textAlign: "center",
          }}
          component="h2"
        >
          {title}
        </Typography>
      </Box>

      <Box sx={{ px: { xs: 2, sm: 3 }, py: { xs: 2, sm: 3, md: 4 } }}>
        {children}
      </Box>
    </Paper>
  );
};

export default EnhancedPaper;
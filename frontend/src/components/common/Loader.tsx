import { Box, CircularProgress } from '@mui/material';
import { colors } from '@/theme/colors';

export const Loader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress sx={{ color: colors.primary }} />
    </Box>
  );
};

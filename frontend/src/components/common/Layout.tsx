import { ReactNode } from 'react';
import { Box } from '@mui/material';
import { colors } from '@/theme/colors';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: colors.background,
      }}
    >
      {children}
    </Box>
  );
};

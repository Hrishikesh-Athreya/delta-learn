import { Box, AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Dashboard, Visibility, SpaceDashboard } from '@mui/icons-material';
import { colors } from '@/theme/colors';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Animated Background */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, ${colors.primary}05, ${colors.secondary}05)`,
          zIndex: 0,
        }}
      >
        {/* Animated Grid */}
        <motion.div
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              linear-gradient(${colors.primary}08 1px, transparent 1px),
              linear-gradient(90deg, ${colors.primary}08 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </Box>

      {/* AppBar with Animation */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${colors.white}20`,
        }}
      >
        <Toolbar>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, flexGrow: 1 }}
          >
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <SpaceDashboard sx={{ fontSize: 32 }} />
            </motion.div>
            <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: '0.5px' }}>
              Admin Dashboard
            </Typography>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              color="inherit"
              onClick={() => navigate('/')}
              startIcon={<Visibility />}
              sx={{
                borderRadius: 3,
                px: 3,
                py: 1,
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${colors.white}30`,
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.3)',
                },
              }}
            >
              User View
            </Button>
          </motion.div>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
        {children}
      </Container>
    </Box>
  );
};

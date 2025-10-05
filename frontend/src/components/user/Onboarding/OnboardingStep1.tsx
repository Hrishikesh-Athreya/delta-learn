import { Box, Typography, TextField, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Public as GlobeIcon, ArrowForward, Public } from '@mui/icons-material';
import { colors } from '@/theme/colors';

interface OnboardingStep1Props {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    x: -100,
    transition: { duration: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const OnboardingStep1 = ({ value, onChange, onNext }: OnboardingStep1Props) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Box sx={{ textAlign: 'center', maxWidth: 500, mx: 'auto' }}>
        {/* Animated Icon */}
        <motion.div
          variants={itemVariants}
          style={{ display: 'inline-block' }}
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Box
              sx={{
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
                boxShadow: `0 20px 60px ${colors.primary}40`,
              }}
            >
              <GlobeIcon sx={{ fontSize: 60, color: colors.white }} />
            </Box>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Typography
            variant="h2"
            sx={{
              mb: 2,
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 800,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
            }}
          >
            Welcome!
          </Typography>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              color: colors.textSecondary,
              fontWeight: 400,
            }}
          >
            Let's get to know you better
          </Typography>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: 2,
                  background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Public sx={{ fontSize: 18, color: colors.primary }} />
              </Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  fontSize: '1rem',
                  color: colors.text,
                  letterSpacing: '0.2px',
                }}
              >
                Country Going To
              </Typography>
            </Box>

            <TextField
              fullWidth
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Start typing your country..."
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  fontSize: '1.1rem',
                  backgroundColor: colors.white,
                  border: `2px solid transparent`,
                  background: `linear-gradient(${colors.white}, ${colors.white}) padding-box,
                      linear-gradient(135deg, ${colors.textSecondary}20, ${colors.textSecondary}20) border-box`,
                  padding: '4px 8px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover': {
                    background: `linear-gradient(${colors.white}, ${colors.white}) padding-box,
                        linear-gradient(135deg, ${colors.primary}40, ${colors.secondary}40) border-box`,
                    boxShadow: `0 4px 20px ${colors.primary}15`,
                    transform: 'translateY(-3px)',
                  },
                  '&.Mui-focused': {
                    background: `linear-gradient(${colors.white}, ${colors.white}) padding-box,
                        linear-gradient(135deg, ${colors.primary}, ${colors.secondary}) border-box`,
                    boxShadow: `0 8px 32px ${colors.primary}25`,
                    transform: 'translateY(-3px)',
                  },
                },
                '& .MuiOutlinedInput-input': {
                  padding: '18px 16px',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  color: colors.text,
                  '&::placeholder': {
                    color: colors.textSecondary,
                    opacity: 0.5,
                    fontSize: '1rem',
                    fontWeight: 400,
                  },
                },
              }}
            />
          </Box>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            fullWidth
            variant="contained"
            onClick={onNext}
            disabled={!value}
            endIcon={<ArrowForward />}
            sx={{
              py: 2,
              fontSize: '1.1rem',
              borderRadius: 3,
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              boxShadow: `0 10px 40px ${colors.primary}40`,
              '&:hover': {
                background: `linear-gradient(135deg, ${colors.primary}dd, ${colors.secondary}dd)`,
                boxShadow: `0 15px 50px ${colors.primary}50`,
              },
              '&.Mui-disabled': {
                background: colors.textSecondary + '30',
              },
            }}
          >
            Continue
          </Button>
        </motion.div>
      </Box>
    </motion.div>
  );
};

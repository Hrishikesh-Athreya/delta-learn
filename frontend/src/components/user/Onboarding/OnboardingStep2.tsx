import { Box, Typography, Button, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { Payment as PaymentIcon, ArrowBack, ArrowForward } from '@mui/icons-material';
import { colors } from '@/theme/colors';

interface OnboardingStep2Props {
  selected: string[];
  onChange: (methods: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const comingFromCountries = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'Germany',
  'France',
  'India',
  'Japan',
  'Brazil',
  'South Africa',
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    x: -100,
    transition: { duration: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 400, damping: 15 },
  },
};

export const OnboardingStep2 = ({ selected, onChange, onNext, onBack }: OnboardingStep2Props) => {
  const toggleMethod = (method: string) => {
    if (selected.includes(method)) {
      onChange(selected.filter(m => m !== method));
    } else {
      onChange([...selected, method]);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Box sx={{ textAlign: 'center', maxWidth: 700, mx: 'auto' }}>
        {/* Animated Icon */}
        <motion.div variants={itemVariants}>
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${colors.secondary}, ${colors.accent})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
                boxShadow: `0 20px 60px ${colors.secondary}40`,
              }}
            >
              <PaymentIcon sx={{ fontSize: 50, color: colors.white }} />
            </Box>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Typography
            variant="h3"
            sx={{
              mb: 2,
              background: `linear-gradient(135deg, ${colors.secondary}, ${colors.accent})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 800,
            }}
          >
            Country Selection
          </Typography>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Typography variant="h6" sx={{ mb: 4, color: colors.textSecondary }}>
            Which country are you coming from?
          </Typography>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              justifyContent: 'center',
              mb: 4,
            }}
          >
            {comingFromCountries.map((method, index) => (
              <motion.div
                key={method}
                variants={chipVariants}
                custom={index}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Chip
                  label={method}
                  onClick={() => toggleMethod(method)}
                  sx={{
                    px: 3,
                    py: 4,
                    fontSize: '1rem',
                    fontWeight: 600,
                    background: selected.includes(method)
                      ? `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
                      : colors.white,
                    color: selected.includes(method) ? colors.white : colors.text,
                    border: `2px solid ${selected.includes(method) ? 'transparent' : colors.textSecondary + '40'
                      }`,
                    boxShadow: selected.includes(method)
                      ? `0 10px 30px ${colors.primary}40`
                      : '0 5px 15px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: `0 15px 40px ${colors.primary}50`,
                    },
                  }}
                />
              </motion.div>
            ))}
          </Box>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <motion.div
              style={{ flex: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                fullWidth
                variant="outlined"
                onClick={onBack}
                startIcon={<ArrowBack />}
                sx={{
                  py: 1.5,
                  fontSize: '1rem',
                  borderRadius: 3,
                  borderColor: colors.textSecondary,
                  color: colors.textSecondary,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                    borderColor: colors.primary,
                    backgroundColor: colors.primary + '10',
                  },
                }}
              >
                Back
              </Button>
            </motion.div>
            <motion.div
              style={{ flex: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                fullWidth
                variant="contained"
                onClick={onNext}
                disabled={selected.length === 0}
                endIcon={<ArrowForward />}
                sx={{
                  py: 1.5,
                  fontSize: '1rem',
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
      </Box>
    </motion.div>
  );
};

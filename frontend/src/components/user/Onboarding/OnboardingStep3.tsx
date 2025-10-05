import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { CheckCircle as CheckIcon, ArrowBack, Celebration } from '@mui/icons-material';
import { colors } from '@/theme/colors';

interface OnboardingStep3Props {
  onComplete: () => void;
  onBack: () => void;
}

const containerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const confettiVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (custom: number) => ({
    opacity: [0, 1, 1, 0],
    scale: [0, 1.5, 1, 0.5],
    y: [0, -100, -200, -300],
    x: [0, custom * 50, custom * 100, custom * 150],
    rotate: [0, custom * 180, custom * 360],
    transition: {
      duration: 2,
      delay: custom * 0.1,
      repeat: Infinity,
      repeatDelay: 1,
    },
  }),
};

export const OnboardingStep3 = ({ onComplete, onBack }: OnboardingStep3Props) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Box sx={{ textAlign: 'center', maxWidth: 500, mx: 'auto', position: 'relative' }}>
        {/* Confetti Animation */}
        {[-2, -1, 0, 1, 2].map((i) => (
          <motion.div
            key={i}
            custom={i}
            variants={confettiVariants}
            initial="hidden"
            animate="visible"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: i % 2 === 0 ? colors.primary : colors.secondary,
            }}
          />
        ))}

        {/* Success Icon with Pulse */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{
            scale: 1,
            rotate: 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 15,
            delay: 0.2,
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Box
              sx={{
                width: 150,
                height: 150,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${colors.accent}, ${colors.accent}dd)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
                boxShadow: `0 20px 60px ${colors.accent}50`,
              }}
            >
              <CheckIcon sx={{ fontSize: 80, color: colors.white }} />
            </Box>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
            <Typography
              variant="h2"
              sx={{
                background: `linear-gradient(135deg, ${colors.accent}, ${colors.primary})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 800,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
              }}
            >
              All Set!
            </Typography>
            <motion.div
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              <Celebration sx={{ fontSize: 40, color: colors.accent }} />
            </motion.div>
          </Box>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Typography variant="h6" sx={{ mb: 4, color: colors.textSecondary, lineHeight: 1.6 }}>
            We've personalized your course recommendations based on your preferences.
          </Typography>
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
                    borderColor: colors.accent,
                    backgroundColor: colors.accent + '10',
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
                onClick={onComplete}
                sx={{
                  py: 1.5,
                  fontSize: '1rem',
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${colors.accent}, ${colors.primary})`,
                  boxShadow: `0 10px 40px ${colors.accent}40`,
                  '&:hover': {
                    background: `linear-gradient(135deg, ${colors.accent}dd, ${colors.primary}dd)`,
                    boxShadow: `0 15px 50px ${colors.accent}50`,
                  },
                }}
              >
                Get Started
              </Button>
            </motion.div>
          </Box>
        </motion.div>
      </Box>
    </motion.div>
  );
};

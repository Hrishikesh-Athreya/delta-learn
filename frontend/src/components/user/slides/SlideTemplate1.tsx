import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { colors } from '@/theme/colors';
import { Slide } from '@/types';

interface SlideTemplate1Props {
  slide: Slide;
}

export const SlideTemplate1 = ({ slide }: SlideTemplate1Props) => {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${colors.primary}15, ${colors.secondary}15)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated Background Circles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
          style={{
            position: 'absolute',
            width: 300 + i * 100,
            height: 300 + i * 100,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${colors.primary}40, transparent)`,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.5rem', md: '4rem' },
            fontWeight: 800,
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
          }}
        >
          {slide.text_list[0]}
        </Typography>
        <Box
          sx={{
            width: 100,
            height: 4,
            background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
            borderRadius: 2,
            mx: 'auto',
          }}
        />
      </motion.div>
    </Box>
  );
};

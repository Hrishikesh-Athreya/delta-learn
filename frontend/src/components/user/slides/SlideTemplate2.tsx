import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { colors } from '@/theme/colors';
import { Slide } from '@/types';

interface SlideTemplate2Props {
  slide: Slide;
}

export const SlideTemplate2 = ({ slide }: SlideTemplate2Props) => {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        p: 6,
        background: `linear-gradient(135deg, ${colors.white}, ${colors.primary}05)`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2rem', md: '3rem' },
            fontWeight: 700,
            color: colors.primary,
            mb: 3,
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              left: -30,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 6,
              height: '100%',
              background: `linear-gradient(180deg, ${colors.primary}, ${colors.secondary})`,
              borderRadius: 3,
            },
          }}
        >
          {slide.text_list[0]}
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Typography
          variant="h5"
          sx={{
            color: colors.textSecondary,
            fontWeight: 400,
            lineHeight: 1.6,
            maxWidth: 700,
          }}
        >
          {slide.text_list[1]}
        </Typography>
      </motion.div>
    </Box>
  );
};

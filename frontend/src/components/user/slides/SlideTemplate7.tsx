import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { colors } from '@/theme/colors';
import { Slide } from '@/types';

interface SlideTemplate7Props {
  slide: Slide;
}

export const SlideTemplate7 = ({ slide }: SlideTemplate7Props) => {
  return (
    <Box sx={{ height: '100%', p: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h3" sx={{ mb: 5, fontWeight: 700, color: colors.primary }}>
          {slide.text_list[0]}
        </Typography>
      </motion.div>

      {slide.image_list[0] && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Box
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: `0 10px 40px ${colors.primary}20`,
              border: `3px solid ${colors.primary}30`,
              maxWidth: 800,
              mx: 'auto',
            }}
          >
            <img
              src={slide.image_list[0]}
              alt="Slide content"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
          </Box>
        </motion.div>
      )}
    </Box>
  );
};

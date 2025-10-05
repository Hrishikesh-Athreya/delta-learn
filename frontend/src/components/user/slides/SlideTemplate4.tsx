import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { colors } from '@/theme/colors';
import { Slide } from '@/types';
import { CheckCircle } from '@mui/icons-material';

interface SlideTemplate4Props {
  slide: Slide;
}

export const SlideTemplate4 = ({ slide }: SlideTemplate4Props) => {
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

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {[slide.text_list[1], slide.text_list[2]].map((text, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 2,
                p: 3,
                borderRadius: 3,
                background: `linear-gradient(135deg, ${colors.primary}05, ${colors.secondary}05)`,
                border: `2px solid ${colors.primary}15`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateX(10px)',
                  borderColor: colors.primary + '40',
                  boxShadow: `0 8px 24px ${colors.primary}15`,
                },
              }}
            >
              <CheckCircle sx={{ color: colors.primary, fontSize: 32, mt: 0.5 }} />
              <Typography
                variant="h6"
                sx={{
                  color: colors.text,
                  fontWeight: 500,
                  lineHeight: 1.6,
                  flex: 1,
                }}
              >
                {text}
              </Typography>
            </Box>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

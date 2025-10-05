import { Box, IconButton, Paper, Button } from '@mui/material';
import { ArrowBack, ArrowForward, NavigateBefore, NavigateNext, CheckCircle } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '@/theme/colors';
import { Slide } from '@/types';
import { SlideTemplate1 } from '../slides/SlideTemplate1';
import { SlideTemplate2 } from '../slides/SlideTemplate2';
import { SlideTemplate3 } from '../slides/SlideTemplate3';
import { SlideTemplate4 } from '../slides/SlideTemplate4';
import { SlideTemplate5 } from '../slides/SlideTemplate5';
import { SlideTemplate6 } from '../slides/SlideTemplate6';
import { SlideTemplate7 } from '../slides/SlideTemplate7';
import { SlideTemplate8 } from '../slides/SlideTemplate8';

interface SlideViewerProps {
  slide: Slide;
  onPrevious: () => void;
  onNext: () => void;
  onFinish: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
}

export const SlideViewer = ({
  slide,
  onPrevious,
  onNext,
  onFinish,
  hasPrevious,
  hasNext
}: SlideViewerProps) => {
  const renderSlide = () => {
    switch (slide.type) {
      case 1:
        return <SlideTemplate1 slide={slide} />;
      case 2:
        return <SlideTemplate2 slide={slide} />;
      case 3:
        return <SlideTemplate3 slide={slide} />;
      case 4:
        return <SlideTemplate4 slide={slide} />;
      case 5:
        return <SlideTemplate5 slide={slide} />;
      case 6:
        return <SlideTemplate6 slide={slide} />;
      case 7:
        return <SlideTemplate7 slide={slide} />;
      case 8:
        return <SlideTemplate8 slide={slide} />;
      default:
        return <SlideTemplate1 slide={slide} />;
    }
  };

  return (
    <Box sx={{ flex: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
      <Paper
        elevation={3}
        sx={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              style={{ height: '100%' }}
            >
              {renderSlide()}
            </motion.div>
          </AnimatePresence>
        </Box>

        {/* Bottom navigation buttons */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 2,
            p: 3,
            borderTop: `1px solid ${colors.textSecondary}20`,
            backgroundColor: colors.background,
          }}
        >
          <Button
            variant="outlined"
            startIcon={<NavigateBefore />}
            onClick={onPrevious}
            disabled={!hasPrevious}
            sx={{
              borderColor: colors.primary,
              color: colors.primary,
              minWidth: 120,
              '&:hover': {
                borderColor: colors.primary,
                backgroundColor: colors.primary + '10',
              },
              '&.Mui-disabled': {
                borderColor: colors.textSecondary + '30',
                color: colors.textSecondary + '50',
              },
            }}
          >
            Previous
          </Button>

          {hasNext ? (
            <Button
              variant="contained"
              endIcon={<NavigateNext />}
              onClick={onNext}
              sx={{
                backgroundColor: colors.primary,
                color: colors.white,
                minWidth: 120,
                '&:hover': {
                  backgroundColor: colors.primary + 'dd',
                },
              }}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              endIcon={<CheckCircle />}
              onClick={onFinish}
              sx={{
                backgroundColor: colors.accent,
                color: colors.white,
                minWidth: 120,
                '&:hover': {
                  backgroundColor: colors.accent + 'dd',
                },
              }}
            >
              Finish
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

import { Box, Typography, Table, TableBody, TableCell, TableRow, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { colors } from '@/theme/colors';
import { Slide } from '@/types';

interface SlideTemplate3Props {
  slide: Slide;
}

export const SlideTemplate3 = ({ slide }: SlideTemplate3Props) => {
  const table = slide.figures.find(f => f.type === 'table');

  return (
    <Box sx={{ height: '100%', p: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h3" sx={{ mb: 2, fontWeight: 700, color: colors.primary }}>
          {slide.text_list[0]}
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: colors.textSecondary, fontSize: '1.1rem' }}>
          {slide.text_list[1]}
        </Typography>
      </motion.div>

      {table && (
        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            border: `2px solid ${colors.primary}20`,
          }}
        >
          <Table>
            <TableBody>
              {table.data.values.map((row, idx) => (
                <TableRow
                  key={idx}
                  component={motion.tr}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  sx={{
                    '&:hover': {
                      backgroundColor: colors.primary + '08',
                    },
                  }}
                >
                  <TableCell
                    sx={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: colors.primary,
                      borderBottom: `1px solid ${colors.primary}15`,
                      py: 2.5,
                    }}
                  >
                    {row[0]}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: '1rem',
                      color: colors.text,
                      borderBottom: `1px solid ${colors.primary}15`,
                      py: 2.5,
                    }}
                  >
                    {row[1]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
};

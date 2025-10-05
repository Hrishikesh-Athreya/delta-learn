import { Box, Typography, Table, TableBody, TableCell, TableRow, Paper, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { colors } from '@/theme/colors';
import { Slide } from '@/types';

interface SlideTemplate5Props {
  slide: Slide;
}

export const SlideTemplate5 = ({ slide }: SlideTemplate5Props) => {
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
          elevation={3}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            background: colors.white,
          }}
        >
          <Table>
            <TableBody>
              {table.data.values.map((row, idx) => (
                <TableRow
                  key={idx}
                  component={motion.tr}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  sx={{
                    background: idx % 2 === 0 ? colors.primary + '05' : colors.white,
                    '&:hover': {
                      backgroundColor: colors.primary + '10',
                    },
                  }}
                >
                  <TableCell
                    sx={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: colors.primary,
                      py: 3,
                      borderBottom: 'none',
                    }}
                  >
                    <Chip
                      label={row[0]}
                      sx={{
                        backgroundColor: colors.primary,
                        color: colors.white,
                        fontWeight: 600,
                        fontSize: '0.95rem',
                      }}
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: '1rem',
                      color: colors.text,
                      py: 3,
                      borderBottom: 'none',
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

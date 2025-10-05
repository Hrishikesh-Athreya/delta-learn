import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { colors } from '@/theme/colors';
import { Slide } from '@/types';

interface SlideTemplate6Props {
  slide: Slide;
}

export const SlideTemplate6 = ({ slide }: SlideTemplate6Props) => {
  const table = slide.figures.find(f => f.type === 'table');

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

      {table && (
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            border: `2px solid ${colors.primary}20`,
          }}
        >
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                }}
              >
                {table.data.columns.map((col, idx) => (
                  <TableCell
                    key={idx}
                    sx={{
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: colors.white,
                      py: 2.5,
                      borderBottom: 'none',
                    }}
                  >
                    {col}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {table.data.values.map((row, idx) => (
                <TableRow
                  key={idx}
                  component={motion.tr}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  sx={{
                    '&:nth-of-type(odd)': {
                      backgroundColor: colors.primary + '05',
                    },
                    '&:hover': {
                      backgroundColor: colors.primary + '15',
                    },
                  }}
                >
                  {row.map((cell, cellIdx) => (
                    <TableCell
                      key={cellIdx}
                      sx={{
                        fontSize: '1rem',
                        color: colors.text,
                        py: 2.5,
                        fontWeight: cellIdx === 0 ? 600 : 400,
                        borderBottom: `1px solid ${colors.primary}10`,
                      }}
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
};

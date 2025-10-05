import { useState } from 'react';
import { Box, Typography, Link, Paper, Collapse, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '@/theme/colors';
import { Link as LinkIcon, ExpandMore, ExpandLess } from '@mui/icons-material';

interface ReferencesProps {
  references: string[];
}

export const References = ({ references }: ReferencesProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Box sx={{ borderBottom: `1px solid ${colors.primary}20` }}>
      {/* Header - Always Visible */}
      <Box
        onClick={() => setIsExpanded(!isExpanded)}
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          background: colors.white,
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: `${colors.primary}05`,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: 2,
              background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <LinkIcon sx={{ fontSize: 18, color: colors.primary }} />
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: colors.primary, fontSize: '0.9rem' }}>
              References
            </Typography>
            <Typography variant="caption" sx={{ color: colors.textSecondary, fontSize: '0.75rem' }}>
              {references.length} link{references.length !== 1 ? 's' : ''} available
            </Typography>
          </Box>
        </Box>
        
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <IconButton size="small">
            <ExpandMore sx={{ color: colors.primary }} />
          </IconButton>
        </motion.div>
      </Box>

      {/* Collapsible Content */}
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Box sx={{ p: 2, pt: 0, maxHeight: 300, overflowY: 'auto', background: `${colors.primary}03` }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 2 }}>
            <AnimatePresence>
              {references.map((url, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      border: `1px solid ${colors.primary}20`,
                      background: colors.white,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'translateX(4px)',
                        boxShadow: `0 4px 12px ${colors.primary}15`,
                        borderColor: `${colors.primary}50`,
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          minWidth: 24,
                          height: 24,
                          borderRadius: 1,
                          background: `${colors.primary}15`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <LinkIcon sx={{ fontSize: 14, color: colors.primary }} />
                      </Box>
                      <Link
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          fontSize: '0.85rem',
                          fontWeight: 500,
                          color: colors.text,
                          textDecoration: 'none',
                          wordBreak: 'break-all',
                          flex: 1,
                          '&:hover': {
                            color: colors.primary,
                            textDecoration: 'underline',
                          },
                        }}
                      >
                        {url}
                      </Link>
                    </Box>
                  </Paper>
                </motion.div>
              ))}
            </AnimatePresence>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};

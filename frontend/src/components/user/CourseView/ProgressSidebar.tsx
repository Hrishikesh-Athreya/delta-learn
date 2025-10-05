import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Checkbox,
  Collapse,
  Typography,
  LinearProgress,
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  CheckCircle,
  RadioButtonUnchecked
} from '@mui/icons-material';
import { useState } from 'react';
import { colors } from '@/theme/colors';
import { Module } from '@/types';

interface ProgressSidebarProps {
  modules: Module[];
  currentSlideId: string;
  completedSlides: string[];
  onSelectSlide: (moduleId: string, slideId: string) => void;
  onToggleComplete: (slideId: string) => void;
}

export const ProgressSidebar = ({
  modules,
  currentSlideId,
  completedSlides,
  onSelectSlide,
  onToggleComplete,
}: ProgressSidebarProps) => {
  const [openModules, setOpenModules] = useState<string[]>(modules.map(m => m.id));

  const toggleModule = (moduleId: string) => {
    setOpenModules(prev =>
      prev.includes(moduleId) ? prev.filter(id => id !== moduleId) : [...prev, moduleId]
    );
  };

  // Calculate progress
  const totalSlides = modules.reduce((acc, module) => acc + module.slides.length, 0);
  const completedCount = completedSlides.length;
  const progressPercentage = totalSlides > 0 ? (completedCount / totalSlides) * 100 : 0;

  return (
    <Box
      sx={{
        width: 300,
        height: '100vh',
        overflow: 'auto',
        borderRight: `1px solid ${colors.textSecondary}20`,
        backgroundColor: colors.white,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ p: 2, borderBottom: `1px solid ${colors.textSecondary}20` }}>
        <Typography variant="h6" sx={{ color: colors.primary, fontWeight: 600, mb: 2 }}>
          Course Progress
        </Typography>
        <Box sx={{ mb: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="caption" sx={{ color: colors.textSecondary }}>
              {completedCount} of {totalSlides} completed
            </Typography>
            <Typography variant="caption" sx={{ color: colors.primary, fontWeight: 600 }}>
              {Math.round(progressPercentage)}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progressPercentage}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: colors.textSecondary + '20',
              '& .MuiLinearProgress-bar': {
                backgroundColor: colors.accent,
                borderRadius: 4,
              },
            }}
          />
        </Box>
      </Box>

      <List sx={{ flex: 1, overflow: 'auto' }}>
        {modules.map((module) => {
          const moduleCompletedCount = module.slides.filter(slide =>
            completedSlides.includes(slide.id)
          ).length;
          const moduleProgress = (moduleCompletedCount / module.slides.length) * 100;

          return (
            <Box key={module.id}>
              <ListItemButton
                onClick={() => toggleModule(module.id)}
                sx={{
                  '&:hover': {
                    backgroundColor: colors.primary + '08',
                  },
                }}
              >
                <ListItemText
                  primary={module.heading}
                  secondary={`${moduleCompletedCount}/${module.slides.length} completed`}
                  primaryTypographyProps={{
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    color: colors.text,
                  }}
                  secondaryTypographyProps={{
                    fontSize: '0.75rem',
                    color: colors.textSecondary,
                  }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: colors.accent,
                      fontWeight: 600,
                      minWidth: 35,
                      textAlign: 'right',
                    }}
                  >
                    {Math.round(moduleProgress)}%
                  </Typography>
                  {openModules.includes(module.id) ? (
                    <ExpandLess sx={{ color: colors.primary }} />
                  ) : (
                    <ExpandMore sx={{ color: colors.textSecondary }} />
                  )}
                </Box>
              </ListItemButton>

              <Collapse in={openModules.includes(module.id)} timeout="auto">
                <List component="div" disablePadding>
                  {module.slides.map((slide, idx) => {
                    const isCompleted = completedSlides.includes(slide.id);
                    const isCurrent = currentSlideId === slide.id;

                    return (
                      <ListItem
                        key={slide.id}
                        sx={{
                          pl: 2,
                          pr: 1,
                          py: 0.5,
                          backgroundColor: isCurrent
                            ? colors.primary + '15'
                            : 'transparent',
                          borderLeft: isCurrent
                            ? `3px solid ${colors.primary}`
                            : '3px solid transparent',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            backgroundColor: colors.primary + '08',
                          },
                        }}
                      >
                        <Checkbox
                          checked={isCompleted}
                          onChange={() => onToggleComplete(slide.id)}
                          icon={
                            <RadioButtonUnchecked
                              sx={{
                                fontSize: 20,
                                color: colors.textSecondary + '60',
                              }}
                            />
                          }
                          checkedIcon={
                            <CheckCircle
                              sx={{
                                fontSize: 20,
                                color: colors.accent,
                              }}
                            />
                          }
                          sx={{
                            p: 0.5,
                            '&:hover': {
                              backgroundColor: 'transparent',
                            },
                          }}
                        />
                        <ListItemButton
                          onClick={() => onSelectSlide(module.id, slide.id)}
                          sx={{
                            py: 1,
                            px: 1.5,
                            borderRadius: 1,
                            '&:hover': {
                              backgroundColor: 'transparent',
                            },
                          }}
                        >
                          <ListItemText
                            primary={`Slide ${idx + 1}`}
                            primaryTypographyProps={{
                              fontSize: '0.85rem',
                              fontWeight: isCurrent ? 600 : 400,
                              color: isCurrent ? colors.primary : colors.text,
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Collapse>
            </Box>
          );
        })}
      </List>
    </Box>
  );
};

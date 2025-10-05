import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  IconButton,
  Divider,
  Collapse,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  ExpandMore,
  ExpandLess,
  School,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '@/theme/colors';
import { Course } from '@/types';

interface CourseFormProps {
  initialData?: Course;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export const CourseForm = ({ initialData, onSubmit, onCancel }: CourseFormProps) => {
  const [courseTitle, setCourseTitle] = useState(initialData?.title || '');
  const [modules, setModules] = useState<{ heading: string; subtopics: string[]; expanded: boolean }[]>(
    initialData?.modules.map(m => ({ heading: m.heading, subtopics: [], expanded: true })) || []
  );

  const addModule = () => {
    setModules([...modules, { heading: '', subtopics: [], expanded: true }]);
  };

  const removeModule = (index: number) => {
    setModules(modules.filter((_, i) => i !== index));
  };

  const updateModule = (index: number, heading: string) => {
    const updated = [...modules];
    updated[index].heading = heading;
    setModules(updated);
  };

  const toggleModule = (index: number) => {
    const updated = [...modules];
    updated[index].expanded = !updated[index].expanded;
    setModules(updated);
  };

  const addSubtopic = (moduleIndex: number) => {
    const updated = [...modules];
    updated[moduleIndex].subtopics.push('');
    setModules(updated);
  };

  const removeSubtopic = (moduleIndex: number, subtopicIndex: number) => {
    const updated = [...modules];
    updated[moduleIndex].subtopics = updated[moduleIndex].subtopics.filter(
      (_, i) => i !== subtopicIndex
    );
    setModules(updated);
  };

  const updateSubtopic = (moduleIndex: number, subtopicIndex: number, value: string) => {
    const updated = [...modules];
    updated[moduleIndex].subtopics[subtopicIndex] = value;
    setModules(updated);
  };

  const handleSubmit = () => {
    onSubmit({
      title: courseTitle,
      modules: modules.map(m => ({ heading: m.heading, subtopics: m.subtopics })),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          maxWidth: 800,
          mx: 'auto',
          borderRadius: 3,
          background: colors.white,
          border: `2px solid ${colors.primary}20`,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <School sx={{ color: colors.white, fontSize: 32 }} />
          </Box>
          <Typography
            variant="h4"
            sx={{
              color: colors.primary,
              fontWeight: 700,
            }}
          >
            {initialData ? 'Edit Course' : 'Create New Course'}
          </Typography>
        </Box>

        <TextField
          fullWidth
          label="Course Title"
          value={courseTitle}
          onChange={(e) => setCourseTitle(e.target.value)}
          sx={{
            mb: 4,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              '&:hover fieldset': {
                borderColor: colors.primary,
              },
            },
          }}
        />

        <Typography variant="h6" sx={{ mb: 2, color: colors.text, fontWeight: 600 }}>
          Modules
        </Typography>

        <AnimatePresence>
          {modules.map((module, moduleIndex) => (
            <motion.div
              key={moduleIndex}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <Box
                sx={{
                  mb: 3,
                  p: 2.5,
                  border: `2px solid ${colors.primary}30`,
                  borderRadius: 3,
                  background: colors.primary + '05',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: colors.primary + '60',
                    boxShadow: `0 4px 16px ${colors.primary}15`,
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <TextField
                    fullWidth
                    label={`Module ${moduleIndex + 1} Title`}
                    value={module.heading}
                    onChange={(e) => updateModule(moduleIndex, e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        background: colors.white,
                      },
                    }}
                  />
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <IconButton onClick={() => toggleModule(moduleIndex)}>
                      {module.expanded ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}>
                    <IconButton onClick={() => removeModule(moduleIndex)} sx={{ color: colors.error }}>
                      <DeleteIcon />
                    </IconButton>
                  </motion.div>
                </Box>

                <Collapse in={module.expanded}>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1.5, color: colors.textSecondary, fontWeight: 600 }}>
                      Subtopics
                    </Typography>

                    <AnimatePresence>
                      {module.subtopics.map((subtopic, subtopicIndex) => (
                        <motion.div
                          key={subtopicIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 100 }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <TextField
                              fullWidth
                              size="small"
                              label={`Subtopic ${subtopicIndex + 1}`}
                              value={subtopic}
                              onChange={(e) => updateSubtopic(moduleIndex, subtopicIndex, e.target.value)}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: 2,
                                  background: colors.white,
                                },
                              }}
                            />
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <IconButton
                                size="small"
                                onClick={() => removeSubtopic(moduleIndex, subtopicIndex)}
                                sx={{ color: colors.error }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </motion.div>
                          </Box>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={() => addSubtopic(moduleIndex)}
                        sx={{
                          mt: 1.5,
                          color: colors.secondary,
                          borderRadius: 2,
                          '&:hover': {
                            background: colors.secondary + '15',
                          },
                        }}
                      >
                        Add Subtopic
                      </Button>
                    </motion.div>
                  </Box>
                </Collapse>
              </Box>
            </motion.div>
          ))}
        </AnimatePresence>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={addModule}
            sx={{
              mb: 4,
              py: 1.5,
              borderRadius: 3,
              borderWidth: 2,
              borderColor: colors.primary + '40',
              color: colors.primary,
              fontWeight: 600,
              '&:hover': {
                borderWidth: 2,
                borderColor: colors.primary,
                background: colors.primary + '10',
              },
            }}
          >
            Add Module
          </Button>
        </motion.div>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <motion.div style={{ flex: 1 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              sx={{
                py: 1.5,
                borderRadius: 3,
                fontSize: '1rem',
                fontWeight: 600,
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                boxShadow: `0 8px 24px ${colors.primary}30`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${colors.primary}dd, ${colors.secondary}dd)`,
                  boxShadow: `0 12px 32px ${colors.primary}40`,
                },
              }}
            >
              {initialData ? 'Update Course' : 'Create Course'}
            </Button>
          </motion.div>
          <motion.div style={{ flex: 1 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={onCancel}
              sx={{
                py: 1.5,
                borderRadius: 3,
                borderWidth: 2,
                borderColor: colors.textSecondary + '60',
                color: colors.textSecondary,
                fontWeight: 600,
                '&:hover': {
                  borderWidth: 2,
                  borderColor: colors.textSecondary,
                },
              }}
            >
              Cancel
            </Button>
          </motion.div>
        </Box>
      </Paper>
    </motion.div>
  );
};

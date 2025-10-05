import {
  Box,
  Paper,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, MenuBook } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { colors } from '@/theme/colors';
import { Course } from '@/types';

interface CourseListProps {
  courses: Course[];
  onEdit: (course: Course) => void;
  onDelete: (id: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export const CourseList = ({ courses, onEdit, onDelete }: CourseListProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        background: colors.white,
        border: `1px solid ${colors.primary}15`,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 3,
            background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MenuBook sx={{ color: colors.primary, fontSize: 24 }} />
        </Box>
        <Box>
          <Typography variant="h5" sx={{ color: colors.primary, fontWeight: 700 }}>
            All Courses
          </Typography>
          <Typography variant="body2" sx={{ color: colors.textSecondary }}>
            {courses.length} course{courses.length !== 1 ? 's' : ''} available
          </Typography>
        </Box>
      </Box>

      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <List>
          {courses.map((course) => (
            <motion.div key={course.id} variants={itemVariants}>
              <ListItem
                sx={{
                  mb: 2,
                  border: `2px solid ${colors.primary}15`,
                  borderRadius: 3,
                  background: colors.white,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: colors.primary + '05',
                    borderColor: colors.primary + '40',
                    transform: 'translateX(8px)',
                    boxShadow: `0 8px 24px ${colors.primary}15`,
                  },
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                  }}
                >
                  <MenuBook sx={{ color: colors.white, fontSize: 24 }} />
                </Box>
                <ListItemText
                  primary={
                    <Typography variant="h6" sx={{ fontWeight: 600, color: colors.text }}>
                      {course.title || `Course ${course.id}`}
                    </Typography>
                  }
                  secondary={
                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                      <Chip
                        label={`${course.modules.length} modules`}
                        size="small"
                        sx={{
                          backgroundColor: colors.accent + '20',
                          color: colors.accent,
                          fontWeight: 600,
                          fontSize: '0.75rem',
                        }}
                      />
                      <Chip
                        label={`${course.modules.reduce((acc, m) => acc + m.slides.length, 0)} slides`}
                        size="small"
                        sx={{
                          backgroundColor: colors.secondary + '20',
                          color: colors.secondary,
                          fontWeight: 600,
                          fontSize: '0.75rem',
                        }}
                      />
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <IconButton
                      onClick={() => onEdit(course)}
                      sx={{
                        color: colors.secondary,
                        mr: 1,
                        '&:hover': {
                          background: colors.secondary + '15',
                        },
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <IconButton
                      onClick={() => onDelete(course.id)}
                      sx={{
                        color: colors.error,
                        '&:hover': {
                          background: colors.error + '15',
                        },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </motion.div>
                </ListItemSecondaryAction>
              </ListItem>
            </motion.div>
          ))}
        </List>
      </motion.div>

      {courses.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <MenuBook sx={{ fontSize: 80, color: colors.textSecondary + '40', mb: 2 }} />
            <Typography variant="h6" sx={{ color: colors.textSecondary, mb: 1 }}>
              No courses yet
            </Typography>
            <Typography variant="body2" sx={{ color: colors.textSecondary }}>
              Create your first course to get started
            </Typography>
          </Box>
        </motion.div>
      )}
    </Paper>
  );
};

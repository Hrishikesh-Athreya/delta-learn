import { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  TextField,
  InputAdornment,
  Chip,
} from '@mui/material';
import {
  Search as SearchIcon,
  Book as BookIcon,
  TrendingUp,
  Star,
  Schedule,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { colors } from '@/theme/colors';
import { Course } from '@/types';

interface CourseGridProps {
  courses: Course[];
  onSelectCourse: (courseId: string) => void;
}

export const CourseGrid = ({ courses, onSelectCourse }: CourseGridProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courses.filter(course =>
    course.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Animated background particles
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
  }));

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Animated Background */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, ${colors.primary}08 0%, ${colors.secondary}08 50%, ${colors.accent}08 100%)`,
          zIndex: 0,
        }}
      >
        {/* Floating Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${particle.id % 3 === 0
                ? colors.primary
                : particle.id % 3 === 1
                  ? colors.secondary
                  : colors.accent
                }15, transparent)`,
              filter: 'blur(40px)',
              pointerEvents: 'none',
            }}
          />
        ))}

        {/* Animated Grid Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              linear-gradient(${colors.primary}08 1px, transparent 1px),
              linear-gradient(90deg, ${colors.primary}08 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            opacity: 0.3,
          }}
        />
      </Box>

      {/* Content */}
      <Box sx={{ position: 'relative', zIndex: 1, p: 4 }}>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography
              variant="h3"
              sx={{
                mb: 1,
                fontWeight: 800,
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Your Learning Journey
            </Typography>
            <Typography variant="h6" sx={{ color: colors.textSecondary, fontWeight: 400 }}>
              Explore compliance courses tailored for you
            </Typography>
          </Box>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
            <TextField
              placeholder="Search for courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                maxWidth: 600,
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  borderRadius: 5,
                  backgroundColor: colors.white,
                  boxShadow: `0 4px 20px ${colors.primary}15`,
                  transition: 'all 0.3s ease',
                  '& fieldset': {
                    border: `2px solid transparent`,
                  },
                  '&:hover': {
                    boxShadow: `0 8px 30px ${colors.primary}25`,
                    transform: 'translateY(-2px)',
                  },
                  '&.Mui-focused': {
                    boxShadow: `0 8px 30px ${colors.primary}30`,
                    transform: 'translateY(-2px)',
                    '& fieldset': {
                      border: `2px solid ${colors.primary}`,
                    },
                  },
                },
                '& .MuiOutlinedInput-input': {
                  padding: '18px 16px',
                  fontSize: '1.05rem',
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: colors.primary, fontSize: 28 }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </motion.div>

        {/* Course Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={3}>
            {filteredCourses.map((course, index) => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      height: '100%',
                      borderRadius: 4,
                      background: colors.white,
                      border: `1px solid ${colors.textSecondary}15`,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      overflow: 'visible',
                      '&:hover': {
                        boxShadow: `0 12px 40px ${colors.primary}25`,
                        border: `1px solid ${colors.primary}30`,
                      },
                    }}
                  >
                    <CardActionArea onClick={() => onSelectCourse(course.id)} sx={{ height: '100%' }}>
                      {/* Course Header with Gradient */}
                      <Box
                        sx={{
                          height: 160,
                          background: `linear-gradient(135deg, ${colors.primary}${90 + index * 5
                            }, ${colors.secondary}${90 + index * 5})`,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                        {/* Animated Background Pattern */}
                        <motion.div
                          animate={{
                            rotate: [0, 360],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                          style={{
                            position: 'absolute',
                            width: '200%',
                            height: '200%',
                            background: `radial-gradient(circle, ${colors.white}10 1px, transparent 1px)`,
                            backgroundSize: '30px 30px',
                          }}
                        />

                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <BookIcon sx={{ fontSize: 70, color: colors.white, position: 'relative', zIndex: 1 }} />
                        </motion.div>
                      </Box>

                      <CardContent sx={{ p: 3 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            mb: 2,
                            color: colors.text,
                            fontWeight: 700,
                            fontSize: '1.15rem',
                            lineHeight: 1.4,
                          }}
                        >
                          {course.title || `Course ${course.id}`}
                        </Typography>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                          <Chip
                            icon={<BookIcon />}
                            label={`${course.modules.length} modules`}
                            size="small"
                            sx={{
                              backgroundColor: colors.primary + '15',
                              color: colors.primary,
                              fontWeight: 600,
                              fontSize: '0.8rem',
                            }}
                          />
                          <Chip
                            icon={<Star />}
                            label="Recommended"
                            size="small"
                            sx={{
                              backgroundColor: colors.accent + '15',
                              color: colors.accent,
                              fontWeight: 600,
                              fontSize: '0.8rem',
                            }}
                          />
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: colors.textSecondary }}>
                          <Schedule sx={{ fontSize: 18 }} />
                          <Typography variant="body2">
                            {course.modules.length * 15} min
                          </Typography>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <SearchIcon sx={{ fontSize: 80, color: colors.textSecondary + '40', mb: 2 }} />
              <Typography variant="h6" sx={{ color: colors.textSecondary }}>
                No courses found
              </Typography>
              <Typography variant="body2" sx={{ color: colors.textSecondary, mt: 1 }}>
                Try adjusting your search query
              </Typography>
            </Box>
          </motion.div>
        )}
      </Box>
    </Box>
  );
};

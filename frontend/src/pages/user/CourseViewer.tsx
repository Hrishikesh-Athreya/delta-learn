import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, IconButton, Typography, AppBar, Toolbar } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { getCourse } from '@/services/api';
import { ProgressSidebar } from '@/components/user/CourseView/ProgressSidebar';
import { SlideViewer } from '@/components/user/CourseView/SlideViewer';
import { ChatPanel } from '@/components/user/CourseView/ChatPanel';
import { References } from '@/components/user/CourseView/References';
import { useUser } from '@/context/UserContext';
import { Loader } from '@/components/common/Loader';
import { Course } from '@/types';
import { colors } from '@/theme/colors';

export const CourseViewer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [currentModuleIdx, setCurrentModuleIdx] = useState(0);
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const { userProgress, updateProgress } = useUser();

  useEffect(() => {
    if (id) loadCourse();
  }, [id]);

  // Auto-mark slide as completed when navigating to it
  useEffect(() => {
    if (course && id) {
      const currentSlide = course.modules[currentModuleIdx]?.slides[currentSlideIdx];
      if (currentSlide) {
        updateProgress(id, currentSlide.id);
      }
    }
  }, [currentModuleIdx, currentSlideIdx, course, id]);

  const loadCourse = async () => {
    if (!id) return;
    try {
      const data = await getCourse(id);
      setCourse(data);
    } catch (error) {
      console.error('Failed to load course:', error);
    }
  };

  const handleBackToCourses = () => {
    navigate('/dashboard');
  };

  const handleFinishCourse = () => {
    navigate('/dashboard');
  };

  if (!course) return <Loader />;

  const currentSlide = course.modules[currentModuleIdx]?.slides[currentSlideIdx];
  const completedSlides = userProgress.find(p => p.courseId === id)?.completedSlides || [];

  const handleNext = () => {
    const currentModule = course.modules[currentModuleIdx];
    if (currentSlideIdx < currentModule.slides.length - 1) {
      setCurrentSlideIdx(prev => prev + 1);
    } else if (currentModuleIdx < course.modules.length - 1) {
      setCurrentModuleIdx(prev => prev + 1);
      setCurrentSlideIdx(0);
    }
  };

  const handlePrevious = () => {
    if (currentSlideIdx > 0) {
      setCurrentSlideIdx(prev => prev - 1);
    } else if (currentModuleIdx > 0) {
      setCurrentModuleIdx(prev => prev - 1);
      setCurrentSlideIdx(course.modules[currentModuleIdx - 1].slides.length - 1);
    }
  };

  const handleSelectSlide = (moduleId: string, slideId: string) => {
    const moduleIdx = course.modules.findIndex(m => m.id === moduleId);
    const slideIdx = course.modules[moduleIdx].slides.findIndex(s => s.id === slideId);
    setCurrentModuleIdx(moduleIdx);
    setCurrentSlideIdx(slideIdx);
  };

  const hasPrevious = currentModuleIdx > 0 || currentSlideIdx > 0;
  const hasNext =
    currentModuleIdx < course.modules.length - 1 ||
    currentSlideIdx < course.modules[currentModuleIdx].slides.length - 1;

  const currentModule = course.modules[currentModuleIdx];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Top Navigation Bar */}
      <AppBar
        position="static"
        elevation={1}
        sx={{
          backgroundColor: colors.white,
          color: colors.text,
          borderBottom: `1px solid ${colors.textSecondary}20`,
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            onClick={handleBackToCourses}
            sx={{
              mr: 2,
              color: colors.primary,
              '&:hover': {
                backgroundColor: colors.primary + '10',
              },
            }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600, color: colors.text }}>
            {course.title || `Course ${course.id}`}
          </Typography>
          <Typography variant="body2" sx={{ color: colors.textSecondary }}>
            Module {currentModuleIdx + 1} of {course.modules.length}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content Area */}
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <ProgressSidebar
          modules={course.modules}
          currentSlideId={currentSlide.id}
          completedSlides={completedSlides}
          onSelectSlide={handleSelectSlide}
          onToggleComplete={(slideId) => updateProgress(id!, slideId)}
        />

        <Box sx={{ flex: 1, display: 'flex' }}>
          <SlideViewer
            slide={currentSlide}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onFinish={handleFinishCourse}
            hasPrevious={hasPrevious}
            hasNext={hasNext}
          />
        </Box>

        {/* Right sidebar with References above Chat */}
        <Box sx={{ width: 320, display: 'flex', flexDirection: 'column', borderLeft: `1px solid ${colors.primary}20` }}>
          {/* Dynamic References Dropdown for Current Module */}
          {currentModule?.references && currentModule.references.length > 0 && (
            <References references={currentModule.references} />
          )}

          {/* Chat Panel */}
          <Box sx={{ flex: 1 }}>
            <ChatPanel courseId={id!} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

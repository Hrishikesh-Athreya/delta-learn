import { useState, useEffect } from 'react';
import { Box, Button, Tabs, Tab, Paper } from '@mui/material';
import { Add as AddIcon, School, Folder } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminLayout } from './AdminLayout';
import { CourseForm } from '@/components/admin/CourseForm';
import { CourseList } from '@/components/admin/CourseList';
import { FileUploader } from '@/components/admin/FileUploader';
import { FileManager } from '@/components/admin/FileManager';
import { getAllCourses, createCourse, updateCourse, deleteCourse } from '@/services/api';
import { Course, FolderNode } from '@/types';
import { colors } from '@/theme/colors';

export const AdminDashboard = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [fileRefresh, setFileRefresh] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const [folders, setFolders] = useState<FolderNode[]>([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const data = await getAllCourses();
      setCourses(data);
    } catch (error) {
      console.error('Failed to load courses:', error);
    }
  };

  const handleCreateCourse = async (data: any) => {
    try {
      await createCourse(data);
      loadCourses();
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create course:', error);
    }
  };

  const handleUpdateCourse = async (data: any) => {
    if (!editingCourse) return;
    try {
      await updateCourse(editingCourse.id, data);
      loadCourses();
      setEditingCourse(null);
      setShowForm(false);
    } catch (error) {
      console.error('Failed to update course:', error);
    }
  };

  const handleDeleteCourse = async (id: string) => {
    try {
      await deleteCourse(id);
      loadCourses();
    } catch (error) {
      console.error('Failed to delete course:', error);
    }
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setShowForm(true);
  };

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={0}
          sx={{
            mb: 3,
            borderRadius: 3,
            background: colors.white,
            border: `1px solid ${colors.primary}15`,
          }}
        >
          <Tabs
            value={tabValue}
            onChange={(_, v) => setTabValue(v)}
            sx={{
              '& .MuiTab-root': {
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                minHeight: 60,
                '&.Mui-selected': {
                  color: colors.primary,
                },
              },
              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: 3,
                background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
              },
            }}
          >
            <Tab icon={<School />} iconPosition="start" label="Courses" />
            <Tab icon={<Folder />} iconPosition="start" label="Files" />
          </Tabs>
        </Paper>

        <AnimatePresence mode="wait">
          {tabValue === 0 && (
            <motion.div
              key="courses"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {!showForm && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => {
                      setEditingCourse(null);
                      setShowForm(true);
                    }}
                    sx={{
                      mb: 3,
                      py: 1.5,
                      px: 4,
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
                    Create New Course
                  </Button>
                </motion.div>
              )}

              <AnimatePresence mode="wait">
                {showForm ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CourseForm
                      initialData={editingCourse || undefined}
                      onSubmit={editingCourse ? handleUpdateCourse : handleCreateCourse}
                      onCancel={() => {
                        setShowForm(false);
                        setEditingCourse(null);
                      }}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CourseList courses={courses} onEdit={handleEdit} onDelete={handleDeleteCourse} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {tabValue === 1 && (
            <motion.div
              key="files"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <FileUploader
                onUploadSuccess={() => setFileRefresh(prev => prev + 1)}
                folders={folders}
              />
              <FileManager
                refresh={fileRefresh}
                onFoldersUpdate={setFolders}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AdminLayout>
  );
};

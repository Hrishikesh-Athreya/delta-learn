import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCourses } from '@/services/api';
import { CourseGrid } from '@/components/user/CourseGrid';
import { Loader } from '@/components/common/Loader';
import { Layout } from '@/components/common/Layout';
import { Course } from '@/types';

export const UserDashboard = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const data = await getAllCourses();
      setCourses(data);
    } catch (error) {
      console.error('Failed to load courses:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <Layout>
      <CourseGrid courses={courses} onSelectCourse={(id) => navigate(`/course/${id}`)} />
    </Layout>
  );
};

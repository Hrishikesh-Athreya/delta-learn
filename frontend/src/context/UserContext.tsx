import { createContext, useContext, useState, ReactNode } from 'react';
import { OnboardingData, UserProgress } from '@/types';

interface UserContextType {
  onboardingData: OnboardingData | null;
  setOnboardingData: (data: OnboardingData) => void;
  userProgress: UserProgress[];
  updateProgress: (courseId: string, slideId: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);

  const updateProgress = (courseId: string, slideId: string) => {
    setUserProgress(prev => {
      const courseProgress = prev.find(p => p.courseId === courseId);
      if (courseProgress) {
        if (!courseProgress.completedSlides.includes(slideId)) {
          return prev.map(p =>
            p.courseId === courseId
              ? { ...p, completedSlides: [...p.completedSlides, slideId] }
              : p
          );
        }
        return prev;
      }
      return [...prev, { courseId, completedSlides: [slideId] }];
    });
  };

  return (
    <UserContext.Provider value={{ onboardingData, setOnboardingData, userProgress, updateProgress }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};

import { useState } from 'react';
import { Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { OnboardingStep1 } from '@/components/user/Onboarding/OnboardingStep1';
import { OnboardingStep2 } from '@/components/user/Onboarding/OnboardingStep2';
import { OnboardingStep3 } from '@/components/user/Onboarding/OnboardingStep3';
import { useUser } from '@/context/UserContext';
import { colors } from '@/theme/colors';
import {
  Gavel,
  Security,
  VerifiedUser,
  AccountBalance,
  Description,
  Business,
  Person,
} from '@mui/icons-material';

export const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [country, setCountry] = useState('');
  const [paymentMethods, setPaymentMethods] = useState<string[]>([]);
  const { setOnboardingData } = useUser();
  const navigate = useNavigate();

  const handleComplete = () => {
    setOnboardingData({ country, paymentMethods });
    navigate('/dashboard');
  };

  // Floating compliance icons with positions
  const complianceIcons = [
    { Icon: Gavel, top: '15%', left: '10%', color: colors.primary, id: 'legal' },
    { Icon: Security, top: '25%', left: '88%', color: colors.accent, id: 'security' },
    { Icon: VerifiedUser, top: '45%', left: '8%', color: colors.secondary, id: 'verified' },
    { Icon: AccountBalance, top: '60%', left: '85%', color: colors.primary, id: 'bank' },
    { Icon: Description, top: '75%', left: '12%', color: colors.accent, id: 'docs' },
    { Icon: Business, top: '35%', left: '90%', color: colors.secondary, id: 'business' },
    { Icon: Person, top: '80%', left: '82%', color: colors.primary, id: 'user' },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${colors.primary}15, ${colors.secondary}15, ${colors.accent}10)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated SVG Connection Lines */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.primary} stopOpacity="0.3" />
            <stop offset="100%" stopColor={colors.secondary} stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Animated connecting lines between icons */}
        {[
          { x1: '10%', y1: '15%', x2: '88%', y2: '25%' },
          { x1: '88%', y1: '25%', x2: '90%', y2: '35%' },
          { x1: '8%', y1: '45%', x2: '10%', y2: '15%' },
          { x1: '85%', y1: '60%', x2: '90%', y2: '35%' },
          { x1: '12%', y1: '75%', x2: '8%', y2: '45%' },
          { x1: '82%', y1: '80%', x2: '85%', y2: '60%' },
          { x1: '12%', y1: '75%', x2: '82%', y2: '80%' },
        ].map((line, index) => (
          <motion.line
            key={index}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="url(#lineGradient)"
            strokeWidth="2"
            strokeDasharray="10 5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: [0, 0.6, 0],
              strokeDashoffset: [0, -15],
            }}
            transition={{
              pathLength: { duration: 2, delay: index * 0.3 },
              opacity: { duration: 2, delay: index * 0.3, repeat: Infinity, repeatDelay: 1 },
              strokeDashoffset: { duration: 2, repeat: Infinity, ease: 'linear' },
            }}
          />
        ))}
      </svg>

      {/* Animated Compliance Icons */}
      {complianceIcons.map((item, index) => {
        const IconComponent = item.Icon;
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              delay: index * 0.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              top: item.top,
              left: item.left,
              zIndex: 1,
            }}
          >
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${item.color}40, ${item.color}20)`,
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `2px solid ${item.color}60`,
                boxShadow: `0 10px 30px ${item.color}30`,
              }}
            >
              <IconComponent sx={{ fontSize: 30, color: item.color }} />
            </Box>
          </motion.div>
        );
      })}

      {/* Progress Indicator - Fixed positioning 
      <Box
        sx={{
          position: 'fixed',
          top: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 2,
          zIndex: 100,
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          padding: '12px 24px',
          borderRadius: 4,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        {[1, 2, 3].map((s) => (
          <Box key={s} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0.3 }}
              animate={{
                scale: step >= s ? 1 : 0.8,
                opacity: step >= s ? 1 : 0.3,
              }}
              transition={{ duration: 0.3 }}
              style={{
                width: step === s ? 14 : 12,
                height: step === s ? 14 : 12,
                borderRadius: '50%',
                background:
                  step >= s
                    ? `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
                    : colors.textSecondary + '40',
                boxShadow: step === s ? `0 4px 12px ${colors.primary}40` : 'none',
              }}
            />
            {step === s && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                style={{
                  height: 3,
                  borderRadius: 2,
                  background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                }}
              />
            )}
          </Box>
        ))}
      </Box>
*/}
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 10 }}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <OnboardingStep1
              key="step1"
              value={country}
              onChange={setCountry}
              onNext={() => setStep(2)}
            />
          )}
          {step === 2 && (
            <OnboardingStep2
              key="step2"
              selected={paymentMethods}
              onChange={setPaymentMethods}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <OnboardingStep3
              key="step3"
              onComplete={handleComplete}
              onBack={() => setStep(2)}
            />
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

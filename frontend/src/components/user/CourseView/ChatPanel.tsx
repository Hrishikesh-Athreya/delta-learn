import { useState } from 'react';
import { Box, TextField, IconButton, Paper, Typography, Avatar } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { colors } from '@/theme/colors';
import { ChatMessage } from '@/types';
import { chatWithCourse } from '@/services/api';

interface ChatPanelProps {
  courseId: string;
}

export const ChatPanel = ({ courseId }: ChatPanelProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await chatWithCourse(courseId, input);
      const assistantMessage: ChatMessage = { role: 'assistant', content: response };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: 350,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderLeft: `1px solid ${colors.textSecondary}20`,
        backgroundColor: colors.white,
      }}
    >
      <Box sx={{ p: 2, borderBottom: `1px solid ${colors.textSecondary}20` }}>
        <Typography variant="h6" sx={{ color: colors.primary, fontWeight: 600 }}>
          Ask a Question
        </Typography>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        {messages.map((msg, idx) => (
          <Box
            key={idx}
            sx={{
              display: 'flex',
              gap: 1,
              mb: 2,
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            {msg.role === 'assistant' && (
              <Avatar sx={{ bgcolor: colors.primary, width: 32, height: 32 }}>AI</Avatar>
            )}
            <Paper
              elevation={1}
              sx={{
                p: 1.5,
                maxWidth: '70%',
                backgroundColor: msg.role === 'user' ? colors.primary : colors.background,
                color: msg.role === 'user' ? colors.white : colors.text,
              }}
            >
              <Typography variant="body2">{msg.content}</Typography>
            </Paper>
            {msg.role === 'user' && (
              <Avatar sx={{ bgcolor: colors.secondary, width: 32, height: 32 }}>U</Avatar>
            )}
          </Box>
        ))}
        {loading && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Avatar sx={{ bgcolor: colors.primary, width: 32, height: 32 }}>AI</Avatar>
            <Paper elevation={1} sx={{ p: 1.5 }}>
              <Typography variant="body2" sx={{ color: colors.textSecondary }}>
                Typing...
              </Typography>
            </Paper>
          </Box>
        )}
      </Box>

      <Box sx={{ p: 2, borderTop: `1px solid ${colors.textSecondary}20` }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <IconButton
            onClick={handleSend}
            disabled={!input.trim() || loading}
            sx={{
              backgroundColor: colors.primary,
              color: colors.white,
              '&:hover': { backgroundColor: colors.primary + 'dd' },
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

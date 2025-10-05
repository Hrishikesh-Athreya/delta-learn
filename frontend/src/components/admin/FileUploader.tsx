import { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  LinearProgress,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { CloudUpload as UploadIcon, Folder as FolderIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { colors } from '@/theme/colors';
import { uploadFileToFolder } from '@/services/api';
import { FolderNode } from '@/types';

interface FileUploaderProps {
  onUploadSuccess: () => void;
  folders: FolderNode[];
}

export const FileUploader = ({ onUploadSuccess, folders }: FileUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedFolder, setSelectedFolder] = useState('/');

  const getFolderPaths = (node: FolderNode, paths: string[] = []): string[] => {
    if (node.type === 'folder') {
      paths.push(node.path);
      if (node.children) {
        node.children.forEach(child => getFolderPaths(child, paths));
      }
    }
    return paths;
  };

  const allFolderPaths = folders.length > 0
    ? getFolderPaths(folders[0])
    : ['/'];

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setProgress(0);

    try {
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 100);

      await uploadFileToFolder(file, selectedFolder);

      clearInterval(progressInterval);
      setProgress(100);
      onUploadSuccess();

      setTimeout(() => {
        setUploading(false);
        setProgress(0);
      }, 1000);
    } catch (error) {
      console.error('Upload failed:', error);
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${colors.white}, ${colors.secondary}05)`,
          border: `2px solid ${colors.secondary}20`,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${colors.secondary}, ${colors.accent})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <UploadIcon sx={{ color: colors.white, fontSize: 24 }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ color: colors.secondary, fontWeight: 700 }}>
              Upload Files
            </Typography>
            <Typography variant="caption" sx={{ color: colors.textSecondary }}>
              Select destination and upload your file
            </Typography>
          </Box>
        </Box>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Destination Folder</InputLabel>
          <Select
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
            label="Destination Folder"
            disabled={uploading}
            startAdornment={
              <FolderIcon sx={{ mr: 1, color: colors.secondary, fontSize: 20 }} />
            }
            sx={{
              borderRadius: 2,
              '&:hover': {
                boxShadow: `0 0 0 2px ${colors.secondary}30`,
              },
            }}
          >
            {allFolderPaths.map((path) => (
              <MenuItem key={path} value={path}>
                📁 {path === '/' ? 'Root' : path}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ textAlign: 'center' }}>
          <input
            accept="*"
            style={{ display: 'none' }}
            id="file-upload"
            type="file"
            onChange={handleFileUpload}
            disabled={uploading}
          />
          <label htmlFor="file-upload">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="contained"
                component="span"
                startIcon={<UploadIcon />}
                disabled={uploading}
                fullWidth
                sx={{
                  py: 1.5,
                  borderRadius: 3,
                  fontSize: '1rem',
                  fontWeight: 600,
                  background: `linear-gradient(135deg, ${colors.secondary}, ${colors.accent})`,
                  boxShadow: `0 6px 20px ${colors.secondary}30`,
                  '&:hover': {
                    boxShadow: `0 8px 28px ${colors.secondary}40`,
                  },
                }}
              >
                Select File to Upload
              </Button>
            </motion.div>
          </label>

          {uploading && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Box sx={{ mt: 3 }}>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: colors.textSecondary + '20',
                    '& .MuiLinearProgress-bar': {
                      background: `linear-gradient(90deg, ${colors.secondary}, ${colors.accent})`,
                      borderRadius: 4,
                    },
                  }}
                />
                <Typography variant="caption" sx={{ mt: 1.5, display: 'block', color: colors.textSecondary, fontWeight: 600 }}>
                  📤 Uploading to {selectedFolder}... {Math.round(progress)}%
                </Typography>
              </Box>
            </motion.div>
          )}
        </Box>
      </Paper>
    </motion.div>
  );
};

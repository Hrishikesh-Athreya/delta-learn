import { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Tooltip,
  Chip,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon,
  Folder as FolderIcon,
  FolderOpen as FolderOpenIcon,
  InsertDriveFile as FileIcon,
  Delete as DeleteIcon,
  CreateNewFolder as CreateFolderIcon,
  Download as DownloadIcon,
  Edit as EditIcon,
  MoreVert as MoreIcon,
  FolderSpecial,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '@/theme/colors';
import { getFolderTree, createFolder, deleteFile, deleteFolder } from '@/services/api';
import { FolderNode } from '@/types';

interface FileManagerProps {
  refresh: number;
  onFoldersUpdate: (folders: FolderNode[]) => void;
}

export const FileManager = ({ refresh, onFoldersUpdate }: FileManagerProps) => {
  const [folderTree, setFolderTree] = useState<FolderNode | null>(null);
  const [expanded, setExpanded] = useState<string[]>(['root']);
  const [createFolderDialog, setCreateFolderDialog] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedPath, setSelectedPath] = useState('/');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    loadFolderTree();
  }, [refresh]);

  const loadFolderTree = async () => {
    try {
      const data = await getFolderTree();
      setFolderTree(data.root);
      onFoldersUpdate([data.root]);
    } catch (error) {
      console.error('Failed to load folder tree:', error);
    }
  };

  const handleToggle = (nodeId: string) => {
    setExpanded(prev =>
      prev.includes(nodeId) ? prev.filter(id => id !== nodeId) : [...prev, nodeId]
    );
  };

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return;

    try {
      await createFolder(selectedPath, newFolderName);
      setCreateFolderDialog(false);
      setNewFolderName('');
      loadFolderTree();
    } catch (error) {
      console.error('Failed to create folder:', error);
    }
  };

  const handleDelete = async (node: FolderNode, event: React.MouseEvent) => {
    event.stopPropagation();
    try {
      if (node.type === 'folder') {
        await deleteFolder(node.path);
      } else {
        await deleteFile(node.name);
      }
      loadFolderTree();
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  };

  const getFileTypeColor = (name: string) => {
    const ext = name.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf': return colors.error;
      case 'docx': case 'doc': return colors.primary;
      case 'xlsx': case 'xls': return colors.accent;
      case 'png': case 'jpg': case 'jpeg': return colors.secondary;
      default: return colors.textSecondary;
    }
  };

  const renderTree = (node: FolderNode, level: number = 0) => {
    const isExpanded = expanded.includes(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const isHovered = hoveredNode === node.id;

    return (
      <motion.div
        key={node.id}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.2 }}
      >
        <ListItem
          disablePadding
          onMouseEnter={() => setHoveredNode(node.id)}
          onMouseLeave={() => setHoveredNode(null)}
          sx={{
            pl: level * 3,
            position: 'relative',
            '&::before': level > 0 ? {
              content: '""',
              position: 'absolute',
              left: level * 3 - 20,
              top: 0,
              bottom: 0,
              width: '2px',
              background: `linear-gradient(180deg, ${colors.primary}30, transparent)`,
            } : {},
          }}
        >
          <ListItemButton
            onClick={() => {
              if (node.type === 'folder') {
                handleToggle(node.id);
                setSelectedPath(node.path);
              }
            }}
            sx={{
              py: 1.5,
              px: 2,
              borderRadius: 2,
              transition: 'all 0.3s ease',
              background: isHovered ? `${colors.primary}08` : 'transparent',
              border: `2px solid ${isHovered ? colors.primary + '30' : 'transparent'}`,
              '&:hover': {
                background: `${colors.primary}10`,
                transform: 'translateX(4px)',
              },
            }}
          >
            {/* Tree Icon */}
            <ListItemIcon sx={{ minWidth: 40 }}>
              <motion.div
                animate={isExpanded && hasChildren ? { rotate: 0 } : { rotate: -90 }}
                transition={{ duration: 0.3 }}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                {node.type === 'folder' && hasChildren ? (
                  <ChevronRightIcon sx={{ color: colors.textSecondary }} />
                ) : (
                  <Box sx={{ width: 24 }} />
                )}
              </motion.div>
            </ListItemIcon>

            {/* Folder/File Icon */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: node.type === 'folder' ? 5 : 0 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 2,
                  background: node.type === 'folder'
                    ? `linear-gradient(135deg, ${colors.secondary}30, ${colors.secondary}10)`
                    : `${getFileTypeColor(node.name)}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 1.5,
                  border: `1px solid ${node.type === 'folder' ? colors.secondary : getFileTypeColor(node.name)}40`,
                }}
              >
                {node.type === 'folder' ? (
                  isExpanded ? (
                    <FolderOpenIcon sx={{ color: colors.secondary, fontSize: 20 }} />
                  ) : (
                    <FolderIcon sx={{ color: colors.secondary, fontSize: 20 }} />
                  )
                ) : (
                  <FileIcon sx={{ color: getFileTypeColor(node.name), fontSize: 20 }} />
                )}
              </Box>
            </motion.div>

            {/* Name and Details */}
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: node.type === 'folder' ? 600 : 500,
                      fontSize: '0.95rem',
                      color: colors.text,
                    }}
                  >
                    {node.name}
                  </Typography>
                  {node.type === 'file' && (
                    <Chip
                      label={node.name.split('.').pop()?.toUpperCase()}
                      size="small"
                      sx={{
                        height: 18,
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        backgroundColor: getFileTypeColor(node.name) + '20',
                        color: getFileTypeColor(node.name),
                        border: `1px solid ${getFileTypeColor(node.name)}40`,
                      }}
                    />
                  )}
                </Box>
              }
              secondary={
                node.type === 'file' && (
                  <Typography variant="caption" sx={{ color: colors.textSecondary, fontSize: '0.75rem' }}>
                    {formatFileSize(node.size)} • {new Date(node.uploadDate!).toLocaleDateString()}
                  </Typography>
                )
              }
            />

            {/* Action Buttons - Visible on Hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex', gap: 4 }}
                >
                  {node.type === 'file' && (
                    <Tooltip title="Download">
                      <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                        <IconButton
                          size="small"
                          onClick={(e) => e.stopPropagation()}
                          sx={{
                            width: 32,
                            height: 32,
                            color: colors.accent,
                            background: colors.accent + '15',
                            '&:hover': {
                              background: colors.accent + '25',
                            },
                          }}
                        >
                          <DownloadIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      </motion.div>
                    </Tooltip>
                  )}

                  <Tooltip title="Delete">
                    <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                      <IconButton
                        size="small"
                        onClick={(e) => handleDelete(node, e)}
                        sx={{
                          width: 32,
                          height: 32,
                          color: colors.error,
                          background: colors.error + '15',
                          '&:hover': {
                            background: colors.error + '25',
                          },
                        }}
                      >
                        <DeleteIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </motion.div>
                  </Tooltip>
                </motion.div>
              )}
            </AnimatePresence>
          </ListItemButton>
        </ListItem>

        {/* Children */}
        {node.type === 'folder' && hasChildren && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <AnimatePresence>
                {node.children!.map(child => renderTree(child, level + 1))}
              </AnimatePresence>
            </List>
          </Collapse>
        )}
      </motion.div>
    );
  };

  if (!folderTree) return <Typography>Loading...</Typography>;

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          background: colors.white,
          border: `1px solid ${colors.primary}15`,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
              <FolderSpecial sx={{ color: colors.primary, fontSize: 24 }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ color: colors.primary, fontWeight: 700 }}>
                File Manager
              </Typography>
              <Typography variant="caption" sx={{ color: colors.textSecondary }}>
                Organize your course materials
              </Typography>
            </Box>
          </Box>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              startIcon={<CreateFolderIcon />}
              onClick={() => setCreateFolderDialog(true)}
              sx={{
                borderRadius: 3,
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                boxShadow: `0 4px 16px ${colors.primary}30`,
                '&:hover': {
                  boxShadow: `0 6px 20px ${colors.primary}40`,
                },
              }}
            >
              New Folder
            </Button>
          </motion.div>
        </Box>

        <Typography variant="body2" sx={{ mb: 2, px: 2, py: 1, backgroundColor: colors.primary + '08', borderRadius: 2, color: colors.primary, fontWeight: 600 }}>
          📁 Current: {selectedPath}
        </Typography>

        <Box sx={{ maxHeight: 500, overflow: 'auto' }}>
          <List>
            {renderTree(folderTree)}
          </List>
        </Box>
      </Paper>

      {/* Create Folder Dialog */}
      <Dialog
        open={createFolderDialog}
        onClose={() => setCreateFolderDialog(false)}
        PaperProps={{
          sx: { borderRadius: 3, minWidth: 400 }
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: colors.primary }}>
          Create New Folder
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2, color: colors.textSecondary }}>
            📂 Creating in: <strong>{selectedPath}</strong>
          </Typography>
          <TextField
            autoFocus
            fullWidth
            label="Folder Name"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleCreateFolder();
              }
            }}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setCreateFolderDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleCreateFolder}
            disabled={!newFolderName.trim()}
            sx={{
              borderRadius: 2,
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

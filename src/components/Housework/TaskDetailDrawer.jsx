// src/components/Housework/TaskDetailDrawer.jsx

import CloseIcon from '@mui/icons-material/Close';
import { Box, Checkbox, Divider, Drawer, FormControlLabel, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';

/**
 * 任務細節抽屜 (Drawer)
 * @param {boolean} open - 抽屜是否開啟
 * @param {object} task - 當前選中的任務資料
 * @param {function} onClose - 關閉抽屜的回調
 * @param {function} onToggleItem - 切換細項完成狀態的回調
 */
function TaskDetailDrawer({ open, task, onClose, onToggleItem }) {

  if (!task) return null; // 如果沒有選中任務，則不渲染

  return (
    <Drawer
      anchor="bottom" // Mobile-First 選擇底部彈出
      open={open}
      onClose={onClose}
      // 設定抽屜的最大高度 (例如，80vh)
      PaperProps={{ sx: { maxHeight: '80vh', borderTopLeftRadius: 16, borderTopRightRadius: 16 } }}
    >
      <Box sx={{ p: 2, pb: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" component="div" color="primary.main">
            {task.WorkName}
          </Typography>
          <IconButton onClick={onClose} aria-label="關閉">
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ my: 1 }} />

        {/* 1. 任務描述與備註 */}
        <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 1 }}>描述:</Typography>
        <Typography variant="body2" color="text.secondary">{task.WorkDesc || '無'}</Typography>

        {task.Remarks && (
          <>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 1 }}>備註:</Typography>
            <Typography variant="body2" color="secondary.main">{task.Remarks}</Typography>
          </>
        )}

        {/* 2. 細項 WorkItem 清單 */}
        {task.Items && task.Items.length > 0 && (
          <Box sx={{ mt: 2, maxHeight: '30vh', overflowY: 'auto' }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>細項清單 ({task.Items.length} 項):</Typography>
            <List dense>
              {task.Items.map((item, index) => (
                <ListItem
                  key={index}
                  disablePadding
                  sx={{ py: 0.5, px: 0 }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={item.isItemCompleted}
                        onChange={(e) => onToggleItem(task.WorkId, index, e.target.checked)}
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        {/* 左側文字資訊 */}
                        <Box sx={{ flexGrow: 1, mr: 1 }}>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {item.ItemName} {item.ItemLocation ? `- ${item.ItemLocation}` : ''}
                          </Typography>
                          {item.Remarks && (
                            <Typography variant="caption" color="text.secondary" display="block">
                              {item.Remarks}
                            </Typography>
                          )}
                        </Box>

                        {/* 右側圖片：如果有 URL 則顯示 */}
                        {item.ItemImage && (
                          <Box
                            component="img"
                            src={item.ItemImage}
                            alt={item.ItemName}
                            sx={{
                              width: 60,
                              height: 60,
                              borderRadius: 1,
                              objectFit: 'cover',
                              border: '1px solid #eee',
                              // 點擊圖片可以在新分頁打開大圖
                              cursor: 'pointer'
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation(); // 防止觸發 Checkbox
                              window.open(item.ItemImage, '_blank');
                            }}
                          />
                        )}
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {/* {!task.Items || task.Items.length === 0 && (
          <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
            此工作沒有細項需要逐一確認。
          </Typography>
        )} */}
      </Box>
    </Drawer>
  );
}

export default TaskDetailDrawer;
// src/components/Housework/TaskCard.jsx

import InfoIcon from '@mui/icons-material/Info';
import { Box, Card, IconButton, Switch, Typography } from '@mui/material';

/**
 * @param {object} task - 單一 HouseWork 任務資料
 * @param {function} onCardClick - 點擊卡片時，用於打開細節抽屜
 * @param {function} onToggleComplete - 切換任務完成狀態
 */
function TaskCard({ task, onCardClick, onToggleComplete }) {
    // 計算細項完成進度 (例如：6個貓砂盆，已完成 X 個)
    const completedItemsCount = task.Items.filter(item => item.isItemCompleted).length;
    const totalItemsCount = task.Items.length;

    return (
        <Card
            sx={{
                my: 1.5,
                opacity: task.RequiredFlag ? 1 : 0.6,
                elevation: 4,
                borderRadius: 2,
                // 根據完成狀態改變樣式
                backgroundColor: task.isCompleted ? '#e8f5e9' : 'white',
                borderLeft: `8px solid ${task.isCompleted ? '#4caf50' : '#ff9800'}` // 左側狀態條
            }}
        >
            <Box sx={
                {
                    display: 'flex',
                    alignItems: 'center',
                    p: 2, '&:hover': { cursor: 'pointer', backgroundColor: '#f5f5f5' }
                }
            }
                onClick={() => onCardClick(task)}>

                {/* 左側：完成狀態切換 */}
                <Switch
                    disabled={!task.RequiredFlag}
                    checked={task.isCompleted}
                    onChange={(e) => {
                        e.stopPropagation(); // 阻止 Switch 的點擊事件傳播到 Card
                        onToggleComplete(task.WorkId, !task.isCompleted);
                    }}
                    color="success"
                    size="large"
                    sx={{ mr: 1 }}
                />

                {/* 中間：任務名稱與細節進度 */}
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div" sx={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
                        {task.WorkName}
                    </Typography>
                    {totalItemsCount > 0 && (
                        <Typography variant="body2" color="text.secondary">
                            細項進度: {completedItemsCount}/{totalItemsCount}
                        </Typography>
                    )}
                </Box>

                {/* 右側：查看詳情圖標 */}
                <IconButton color="primary" aria-label="查看詳情">
                    <InfoIcon />
                </IconButton>
            </Box>
        </Card>
    );
}

export default TaskCard;
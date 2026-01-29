// src/pages/Settings.jsx

import React, { useMemo } from 'react';
import { Container, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Box, Divider, Paper } from '@mui/material';

function Settings({ currentTab, allData }) {

    if (currentTab !== 2) return null;
    const houseWorks = allData?.houseWorks || [];

    // 篩選出與「備品」相關的 HouseWork 項目
    const requiredItems = useMemo(() => {
        // WorkName 中有「備品」相關關鍵字，或 InfoFlag 欄位

        const filteredTasks = houseWorks.filter(task =>
            task.InfoFlag === 'Y' && String(task.WorkName || '').includes('備品')
        );

        // 整理備品清單 (從 WorkItem 來的 Items)
        const itemsList = filteredTasks.flatMap(task =>
            task.Items.map(item => ({
                WorkName: task.WorkName,
                ...item
            }))
        );

        return { filteredTasks, itemsList };

    }, [houseWorks]);


    return (
        <Container maxWidth="sm" sx={{ mb: 8, pt: 1 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 2, textAlign: 'center' }}>
                ⚙️ 備品與說明
            </Typography>

            <Typography variant="h6" color="secondary.dark" sx={{ mb: 1 }}>
                各工作所需備品清單 ({requiredItems.itemsList.length} 項)
            </Typography>

            <List dense component={Paper} elevation={3} sx={{ overflow: 'hidden' }}>
                {requiredItems.itemsList.length === 0 ? (
                    <ListItem>
                        <ListItemText primary="目前沒有找到相關的備品資訊。" />
                    </ListItem>
                ) : (
                    requiredItems.itemsList.map((item, index) => (
                        <React.Fragment key={index}>
                            {/* ⭐️ 核心部分：左側圖片 */}
                            <ListItemAvatar>
                                <Avatar
                                    src={item.ItemImage}
                                    alt={item.ItemName}
                                    variant="rounded" // 圓角矩形，比圓形更適合看清楚備品
                                    sx={{
                                        width: 60,
                                        height: 60,
                                        mr: 1,
                                        border: '1px solid #eee',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => item.ItemImage && window.open(item.ItemImage, '_blank')}
                                >
                                    {/* 如果沒圖片時的佔位符 */}
                                    {item.ItemName?.charAt(0) || 'B'}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItem sx={{ py: 0.5 }}>
                                <ListItemText
                                    primary={
                                        <Box component="span" sx={{ fontWeight: 'bold' }}>
                                            {item.ItemName || 'N/A'}
                                        </Box>
                                    }
                                    secondary={
                                        `位置：${item.ItemLocation || ''}${item.ItemLocationDetail ? `(${item.ItemLocationDetail})` : ''} 
                                        ${item.Remarks ? ` \r\n 備註：${item.Remarks}` : ''}`}
                                />
                            </ListItem>

                            {index < requiredItems.itemsList.length - 1 && <Divider component="li" />}
                        </React.Fragment>
                    ))
                )}
            </List>
        </Container>
    );
}

export default Settings;
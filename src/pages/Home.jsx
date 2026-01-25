// src/pages/Home.jsx (最終版，包含所有邏輯)

import React, { useState, useEffect } from 'react';
import { Container, Typography, CircularProgress, Alert, Box } from '@mui/material';
import { fetchAllAndTransform } from '../api/dataService'; 
import TaskCard from '../components/Housework/TaskCard';
import TaskDetailDrawer from '../components/Housework/TaskDetailDrawer';

function Home({ currentTab, setAllData }) { // 接收 Layout 傳來的 tab 資訊

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // 1. 資料載入 (保留之前邏輯)
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const { houseWorks, plants } = await fetchAllAndTransform();
        
        // 初始化任務狀態，並儲存到 Home 頁面的狀態
        setTasks(houseWorks.map(t => ({ 
            ...t, 
            isCompleted: false, 
            Items: t.Items.map(item => ({...item, isItemCompleted: false}))
        })));
        
        // 傳遞給父層 App.jsx 儲存整個應用程式的資料
        setAllData({ houseWorks, plants }); 
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [setAllData]);

  // 2. 處理任務總體完成狀態的切換
  const handleToggleComplete = (taskId, isChecked) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.WorkId === taskId 
          ? { 
              ...task, 
              isCompleted: isChecked,
              // 如果勾選主任務，將所有細項也勾選
              Items: task.Items.map(item => ({...item, isItemCompleted: isChecked}))
            } 
          : task
      )
    );
  };
  
  // 3. 處理細項完成狀態的切換
  const handleToggleItem = (taskId, itemIndex, isChecked) => {
    setTasks(prevTasks => {
      return prevTasks.map(task => {
        if (task.WorkId !== taskId) return task;
        
        const newItems = task.Items.map((item, index) => 
          index === itemIndex ? { ...item, isItemCompleted: isChecked } : item
        );
        
        // 檢查是否所有細項都已完成
        const allItemsCompleted = newItems.every(item => item.isItemCompleted);
        
        // 更新主任務的 isCompleted 狀態
        return { 
          ...task, 
          Items: newItems,
          isCompleted: allItemsCompleted
        };
      });
    });
    // 立即更新 Drawer 內選中的 Task 狀態，以實現即時視覺回饋
    setSelectedTask(prev => ({ 
      ...prev, 
      Items: prev.Items.map((item, index) => 
        index === itemIndex ? { ...item, isItemCompleted: isChecked } : item
      ),
      isCompleted: prev.Items.every((item, index) => index === itemIndex ? isChecked : item.isItemCompleted)
    }));
  };

  // 4. 處理點擊卡片 (打開細節 Drawer)
  const handleCardClick = (task) => {
    setSelectedTask(task);
    setDrawerOpen(true);
  };

  // 5. 渲染邏輯
  if (currentTab !== 0) return null; // 只有在選中第一分頁時才顯示內容

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
        <Typography>載入家務資料中...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">資料載入錯誤: {error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mb: 8 }}> {/* 底部留出 BottomNav 的空間 */}
    
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 2, textAlign: 'center' }}>
        🧹 家務清單
      </Typography>
      
      {tasks.map((task) => (
        <TaskCard 
          key={task.WorkId} 
          task={task} 
          onCardClick={handleCardClick}
          onToggleComplete={handleToggleComplete}
        />
      ))}

      {/* 任務細節抽屜 */}
      <TaskDetailDrawer
        open={drawerOpen}
        task={selectedTask}
        onClose={() => setDrawerOpen(false)}
        onToggleItem={handleToggleItem}
      />

    </Container>
  );
}

export default Home;
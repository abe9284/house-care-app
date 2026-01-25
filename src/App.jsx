// src/App.jsx (最終版)

import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useCallback, useState } from 'react';
import BottomNav from './components/Layout/BottomNav';
import Home from './pages/Home';
import PlantGuide from './pages/PlantGuide';
import Settings from './pages/Settings';

// 1. 定義主題
const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50', // 綠色系
    },
    secondary: {
      main: '#ff9800', // 橘色系
    },
    background: {
      default: '#f4f6f8', // 輕微的背景色
    }
  },
});

function App() {
  // 狀態 1: 控制當前選中的分頁
  const [currentTab, setCurrentTab] = useState(0); 
  // 狀態 2: 儲存從 API 獲取的 HouseWork 和 Plant 資料
  const [allData, setAllData] = useState(null); 
  
  // 使用 useCallback 傳遞給子組件，避免 Home 組件重複渲染
  const updateAllData = useCallback((data) => {
      setAllData(data);
  }, []);

  // 頁面內容根據 currentTab 決定
  const renderPage = () => {
    switch (currentTab) {
      case 0:
        // Home 負責資料載入，並將結果傳回給 App
        return <Home currentTab={currentTab} setAllData={updateAllData} />;
      case 1:
        // PlantGuide 使用 App 中儲存的資料
        return <PlantGuide currentTab={currentTab} allData={allData} />;
      case 2:
        // 備品與說明頁面 (目前為佔位符)
        return <Settings currentTab={currentTab} allData={allData} />;;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* 頁面內容 */}
      <Box sx={{ pb: 7 }}> {/* 留出底部導航的空間 */}
        {renderPage()}
      </Box>
      
      {/* 底部導航 */}
      <BottomNav value={currentTab} onChange={setCurrentTab} />

    </ThemeProvider>
  );
}

export default App;
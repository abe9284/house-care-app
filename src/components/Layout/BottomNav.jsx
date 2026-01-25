// src/components/Layout/BottomNav.jsx

import React from 'react';
import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox'; // 家務清單
import LocalFloristIcon from '@mui/icons-material/LocalFlorist'; // 澆花指南
import SettingsIcon from '@mui/icons-material/Settings'; // 備品與說明

/**
 * 底部導航組件
 * @param {number} value - 當前選中的索引 (0, 1, 2)
 * @param {function} onChange - 改變選中索引的回調函式
 */
function BottomNav({ value, onChange }) {
  return (
    <Box sx={{ 
      width: '100%', 
      position: 'fixed', 
      bottom: 0, 
      left: 0, 
      zIndex: 100 
    }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          onChange(newValue);
        }}
        sx={{ borderTop: '1px solid #e0e0e0' }}
      >
        <BottomNavigationAction label="家務清單" icon={<CheckBoxIcon />} />
        <BottomNavigationAction label="澆花指南" icon={<LocalFloristIcon />} />
        <BottomNavigationAction label="備品說明" icon={<SettingsIcon />} />
      </BottomNavigation>
    </Box>
  );
}

export default BottomNav;
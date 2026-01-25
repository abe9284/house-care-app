// src/api/dataService.js

const API_KEY = import.meta.env.VITE_REACT_APP_GOOGLE_SHEETS_API_KEY;
const SPREADSHEET_ID = import.meta.env.VITE_REACT_APP_SPREADSHEET_ID;


// 檢查環境變數是否設定
if (!API_KEY || !SPREADSHEET_ID) {
    console.error("錯誤：請確認 .env.local 檔案中已設定 VITE_REACT_APP_GOOGLE_SHEETS_API_KEY 和 VITE_REACT_APP_SPREADSHEET_ID。");
}

const BASE_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/`;

/**
 * 輔助函式：從 Google Sheet 獲取指定工作表的資料
 */
const fetchSheetData = async (sheetName) => {
    const range = `${sheetName}!A:Z`;
    const url = `${BASE_URL}${range}?key=${API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            // 處理 HTTP 錯誤，例如 404, 403 (權限問題)
            const errorData = await response.json();
            console.error(`API 請求失敗 (${response.status} ${response.statusText}):`, errorData);
            throw new Error(`無法載入 ${sheetName} 資料。請檢查 API Key 和試算表公開權限。`);
        }
        const data = await response.json();
        return data.values || [];
    } catch (error) {
        console.error(`獲取 ${sheetName} 資料時發生錯誤:`, error.message);
        return [];
    }
};

// 引入轉換函式
import { transformData } from '../utils/dataTransformer.js';

/**
 * 組合所有資料並進行轉換
 */
export const fetchAllAndTransform = async () => {
    // 您資料表的 Sheet 名稱
    const sheetNames = ['HouseWork', 'WorkItem', 'Plant'];

    try {
        const [houseWorkRaw, workItemRaw, plantRaw] = await Promise.all(
            sheetNames.map(name => fetchSheetData(name))
        );

        // 進行前端資料結構的轉換與整合
        return transformData(houseWorkRaw, workItemRaw, plantRaw);

    } catch (error) {
        console.error("資料載入或轉換時發生主要錯誤:", error);
        return { houseWorks: [], plants: [] };
    }
};
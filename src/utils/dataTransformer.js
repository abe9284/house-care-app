// src/utils/dataTransformer.js

/**
 * 輔助函式：將 Sheets API 傳回的二維陣列轉換為 JSON 陣列
 */
const arrayToJson = (data) => {
    if (!data || data.length < 2) return [];
    
    // 欄位名稱應為第一列
    const headers = data[0].map(h => String(h || '').trim());
    const rows = data.slice(1);
    
    return rows.map((row, rowIndex) => {
        let obj = {};
        headers.forEach((header, index) => {
            // 清理欄位值，去除前後空白
            obj[header] = row[index] ? String(row[index]).trim() : null;
        });
        // 加入一個 unique ID 以方便 React 渲染
        obj.InternalId = rowIndex + 1; 
        return obj;
    }).filter(obj => obj.WorkName || obj.PlantName); // 排除完全空白的列
};

/**
 * 主要轉換函式：整合三張表格並建立前端所需的結構
 */
export const transformData = (houseWorkRaw, workItemRaw, plantRaw) => {
    
    // Step 1: 原始資料轉換為 JSON 陣列
    const houseWorks = arrayToJson(houseWorkRaw);
    const workItems = arrayToJson(workItemRaw);
    const plants = arrayToJson(plantRaw);

    // Step 2: 建立 WorkItem 的 Map，方便查找
    const itemsByWorkName = workItems.reduce((acc, item) => {
        const workName = item.WorkName;
        if (workName) {
            if (!acc[workName]) acc[workName] = [];
            // 為每個細項加上狀態
            acc[workName].push({ ...item, isItemCompleted: false });
        }
        return acc;
    }, {});

    // Step 3: 整合 HouseWork 與 WorkItem
    const integratedHouseWorks = houseWorks.map(work => ({
        ...work,
        // 為每個工作加上狀態和唯一的數字 ID (WorkId)
        WorkId: work.InternalId, 
        isCompleted: false, 
        Items: itemsByWorkName[work.WorkName] || [],
    }));
    
    // Step 4: 回傳整合後的資料
    return { 
        houseWorks: integratedHouseWorks, 
        plants // Plant 資料結構已夠用，無需複雜整合
    };
};
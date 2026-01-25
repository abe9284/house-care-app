// src/pages/PlantGuide.jsx

import { AccessTime, LocalFlorist, LocationOn } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Container, List, Typography } from '@mui/material';
import { useMemo } from 'react';

function PlantGuide({ currentTab, allData }) {

    if (currentTab !== 1) return null;

    const plants = allData?.plants || []; // 安全取值

    // ⭐️ 修正點：如果資料還沒載入，顯示載入中或不顯示
    if (plants.length === 0) {
        return (
            <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
                <Typography color="text.secondary">澆花資料載入中...</Typography>
            </Container>
        );
    }

    // 將植物依 PlantCategory 分組
    const groupedPlants = useMemo(() => {
        return plants.reduce((acc, plant) => {
            const category = plant.PlantCategory || '其他';
            if (!acc.has(category)) {
                acc.set(category, plant);
            }
            return acc;
        }, new Map());
    }, [plants]);

    return (
        <Container maxWidth="sm" sx={{ mb: 8 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 2, textAlign: 'center' }}>
                🌱 澆花指南
            </Typography>

            {Object.entries(groupedPlants).map(([category, categoryPlants]) => (

                <Accordion> {/* 預設展開最複雜的類別 */}
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`${category}-content`}
                        id={`${category}-header`}
                        sx={{ backgroundColor: '#f5f5f5', borderBottom: '1px solid #e0e0e0' }}
                    >
                        <Typography variant="h6" color="primary.dark" sx={{ fontWeight: 'bold' }}>
                            {category} ({categoryPlants.length} 種)
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0 }}>
                        <List dense>
                            {categoryPlants.map((plant, index) => (
                                <Box key={index} sx={{ borderBottom: index < categoryPlants.length - 1 ? '1px dashed #eee' : 'none', p: 1.5 }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                                        <LocalFlorist sx={{ fontSize: 18, mr: 0.5 }} /> {plant.PlantName}
                                    </Typography>

                                    <Box sx={{ ml: 2, mt: 0.5, fontSize: '0.875rem' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                                            <LocationOn sx={{ fontSize: 14, mr: 0.5 }} />
                                            位置: {plant.Location} {plant.Remarks ? `(${plant.Remarks})` : ''}
                                        </Box>

                                        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                                            <AccessTime sx={{ fontSize: 14, mr: 0.5 }} />
                                            澆水方法: {plant.WaterMethod}
                                        </Box>

                                        {/* 複雜澆水條件（如果有） */}
                                        {plant.WaterFreq1 && (
                                            <Box sx={{ ml: 2, borderLeft: '3px solid #ff9800', pl: 1, mt: 0.5 }}>
                                                <Typography variant="body2" color="secondary.dark" sx={{ fontWeight: 'bold' }}>
                                                    {plant.WaterCondition1}: {plant.WaterFreq1}
                                                </Typography>
                                                {plant.WaterFreq2 && (
                                                    <Typography variant="body2" color="text.secondary">
                                                        {plant.WaterCondition2}: {plant.WaterFreq2}
                                                    </Typography>
                                                )}
                                            </Box>
                                        )}
                                    </Box>
                                </Box>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Container>
    );
}

export default PlantGuide;
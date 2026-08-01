// src/pages/PlantGuide.jsx

import { AccessTime, LocalFlorist, LocationOn } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Container, List, Typography } from '@mui/material';
import { useMemo } from 'react';
import { pageContainerSx, pageTitleSx } from '../styles/shared';

function PlantGuide({ currentTab, allData }) {

    if (currentTab !== 1) return null;

    const plants = allData?.plants || []; 

    // 如果無資料，顯示載入中或不顯示
    if (plants.length === 0) {
        return (
            <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
                <Typography color="text.secondary">澆花資料載入中...</Typography>
            </Container>
        );
    }

    // 將植物依 PlantCategory 分組
    const groupedPlants = useMemo(() => {
        const map = plants.reduce((acc, plant) => {
            const category = plant.PlantCategory || '其他';
            const group = acc.get(category) ?? [];
            acc.set(category, [...group, plant]);
            return acc;
        }, new Map());
        return Array.from(map.entries());
    }, [plants]);

    return (
        <Container maxWidth="sm" sx={pageContainerSx}>
            <Typography variant="h4" component="h1" gutterBottom sx={pageTitleSx}>
                🌱 澆花指南
            </Typography>

            {groupedPlants.map(([category, categoryPlants], groupIndex) => {
                const groupId = `plant-guide-group-${groupIndex}`;
                return (
                    <Accordion key={groupId}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`${groupId}-content`}
                            id={`${groupId}-header`}
                        >
                            <Typography variant="h6" color="primary.dark" sx={{ fontWeight: 'bold' }}>
                                {category} ({categoryPlants.length} 種)
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ p: 0 }}>
                            <List dense>
                                {categoryPlants.map((plant, index) => (
                                    <Box key={index} sx={{ borderBottom: index < categoryPlants.length - 1 ? '1px dashed #eee' : 'none', p: 1.5 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                                            <Box
                                                sx={{
                                                    flexShrink: 0,
                                                    width: 96,
                                                    height: 96,
                                                    borderRadius: 2,
                                                    overflow: 'hidden',
                                                    bgcolor: '#f3f3f3',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    border: '1px solid #e0e0e0',
                                                    cursor: plant.PlantPhoto ? 'pointer' : 'default'
                                                }}
                                                onClick={() => plant.PlantPhoto && window.open(plant.PlantPhoto, '_blank')}
                                            >
                                                {plant.PlantPhoto ? (
                                                    <Box
                                                        component="img"
                                                        src={plant.PlantPhoto}
                                                        alt={plant.PlantName}
                                                        sx={{
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'cover',
                                                        }}
                                                    />
                                                ) : (
                                                    <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', px: 1 }}>
                                                        尚無照片
                                                    </Typography>
                                                )}
                                            </Box>

                                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                                                    <LocalFlorist sx={{ fontSize: 18, mr: 0.5 }} /> {plant.PlantName}
                                                </Typography>

                                                <Box sx={{ mt: 0.5, fontSize: '0.875rem' }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                                                        <LocationOn sx={{ fontSize: 14, mr: 0.5 }} />
                                                        位置: {plant.Location} {plant.LocationRemark? `(${plant.LocationRemark})` : ''}
                                                    </Box>

                                                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                                                        <AccessTime sx={{ fontSize: 14, mr: 0.5 }} />
                                                        澆水方法: {plant.WaterMethod} {plant.WaterRemark? `(${plant.WaterRemark})` : ''}
                                                    </Box>

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
                                        </Box>
                                    </Box>
                                ))}
                            </List>
                        </AccordionDetails>
                    </Accordion>
                );
            })}
        </Container>
    );
}

export default PlantGuide;
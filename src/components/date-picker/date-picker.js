'use client';
import React, {useState, useEffect} from "react";
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';

export default function DatePicker() {
    
    const [cleared, setCleared] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        if (cleared) {
        const timeout = setTimeout(() => {
            setCleared(false);
        }, 1500);

        return () => clearTimeout(timeout);
        }
        return () => {};
    }, [cleared]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
            sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            }}
        >
            <DemoContainer components={['DatePicker', 'DatePicker']}>
            <DatePicker
                format="YYYY-MM-DD"
                mask={"____-__-__"}
                label={"Start Date"}
                value={startValue}
                sx={{ width: 200 }}
                slotProps={{
                field: { clearable: true, onClear: () => setCleared(true), size: 'small' },
                }}
                onChange={(newValue) => setStartDate(newValue)}
            />
            <DatePicker
                format="YYYY-MM-DD"
                mask={"____-__-__"}
                label={"End Date"}
                value={endValue}
                sx={{ width: 200 }}
                slotProps={{
                field: { clearable: true, onClear: () => setCleared(true), size: 'small' },
                }}
                onChange={(nesValue) => setEndDate(nesValue)}
            />
            </DemoContainer>
        </Box>
        </LocalizationProvider>
    );
}
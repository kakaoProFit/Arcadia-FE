'use client';
import { useState, useEffect } from 'react';

export default function GetChatBotResponse() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          const settings = {
            method: 'GET',
          }
          try {
            const response = await fetch('/api/chatbot', settings); // API 엔드포인트 호출
            const result = await response.json();
            setData(result);
          } catch (error) {
            console.error('API 요청 중 에러 발생:', error);
          }
        };
        fetchData();
      }, []);
    return (data);
}
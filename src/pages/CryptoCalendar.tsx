import React, { useState, useCallback, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Alert, Spin } from 'antd';

import type { CryptoEvent } from '../types/CryptoEvent';
import CalendarView from '../pages/Components/Calendar/CalendarView';
import EventsList from '../pages/Components/Calendar/EventsList';
import EventModal from '../pages/Components/Calendar/EventsModal';
import NewEventModal from '../pages/Components/Calendar/NewEventModal';
import { useCalendarCrypto } from '../hooks/useCalendarCrypto';

const EVENT_COLORS: Record<CryptoEvent['type'], string> = {
  'Unlock Tokens': '#faad14',
  Airdrops: '#52c41a',
  ICO: '#1890ff',
  Listing: '#722ed1',
  Halving: '#f5222d',
};

const EVENT_LABELS: Record<CryptoEvent['type'], string> = {
  'Unlock Tokens': 'بازگشایی توکن',
  Airdrops: 'ایردراپ',
  ICO: 'آی‌سی‌او',
  Listing: 'لیستینگ',
  Halving: 'هالوینگ',
};

const CryptoDashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CryptoEvent | null>(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  const { data, isLoading, error, isError } = useCalendarCrypto();

  useEffect(() => {
    if (data?.data) {
      const keys = Object.keys(data.data);
      if (keys.length > 0) {
        const currentKey = selectedDate?.toISOString().split('T')[0];
        if (!currentKey || !data.data[currentKey]) {
          const firstDate = keys[0];
          const [year, month, day] = firstDate.split('-').map(Number);
          const dateObj = new Date(year, month - 1, day);
          setSelectedDate(dateObj);
        }
      }
    }
  }, [data]); 


  useEffect(() => {
    if (error) {
      console.error('❌ خطای شناسایی‌شده در کامپوننت:', error);
    }
  }, [error]);

  const getEventsForDate = useCallback(
    (date: Date | null) => {
      if (!date || !data?.data) {
        return [];
      }
      const key = date.toISOString().split('T')[0];
      const events = data.data[key] ?? [];
    
      return events;
    },
    [data],
  );



  const handleEventClick = useCallback((event: CryptoEvent) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  }, []);

  const handleCloseEventModal = useCallback(() => {
    setIsEventModalOpen(false);
    setSelectedEvent(null);
  }, []);

  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spin size="large" tip="در حال بارگذاری تقویم..." />
      </div>
    );
  }

  if (isError || error) {
    return (
      <div className="min-h-screen flex items-center  justify-center p-4 bg-gray-50">
        <Alert
          message="خطا در دریافت رویدادها"
          description={
            (error as any)?.message || 'مشکلی در ارتباط با سرور رخ داده است.'
          }
          type="error"
          showIcon
          className="max-w-md"
        />
      </div>
    );
  }

  if (!data || !data.data) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <Alert
          message="داده‌ای وجود ندارد"
          description="پاسخ سرور فاقد داده است."
          type="warning"
          showIcon
          className="max-w-md"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        rtl
        theme="colored"
      />

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">تقویم کریپتو</h1>
          <button
            onClick={() => setIsNewModalOpen(true)}
            className="bg-orange-500 !text-lg hover:bg-gray-900 !text-white px-8 py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl"
          >
            افزودن رویداد
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-3xl shadow-xl">
            <CalendarView
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              getEventsForDate={getEventsForDate}
              EVENT_COLORS={EVENT_COLORS}
            />
          </div>

          <EventsList
            selectedDate={selectedDate}
            onEventClick={handleEventClick}
            EVENT_COLORS={EVENT_COLORS}
            EVENT_LABELS={EVENT_LABELS}
          />
        </div>
      </div>

      <NewEventModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        initialDate={selectedDate}
      />

      <EventModal
        visible={isEventModalOpen}
        event={selectedEvent}
        onClose={handleCloseEventModal}
        EVENT_COLORS={EVENT_COLORS}
        EVENT_LABELS={EVENT_LABELS}
      />
    </div>
  );
};

export default CryptoDashboard;
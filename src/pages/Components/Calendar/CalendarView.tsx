import React, { useCallback, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import { faIR } from 'date-fns-jalali/locale';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import type { EventType } from '../../../types/CryptoEvent';

registerLocale('fa', faIR);

export interface CalendarEvent {
  id: number;
  title: string;
  description: string;
  type: EventType;
}

interface CalendarViewProps {
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  getEventsForDate: (date: Date | null) => CalendarEvent[];
  EVENT_COLORS: Record<EventType, string>;
}

const CalendarView: React.FC<CalendarViewProps> = ({
  selectedDate,
  setSelectedDate,
  getEventsForDate,
  EVENT_COLORS,
}) => {
  const toJalaliDay = useCallback((date: Date) => {
    return new Intl.DateTimeFormat('fa-IR', {
      day: 'numeric',
    }).format(date);
  }, []);

  const renderDayContents = useCallback(
    (_day: number, date: Date) => {
      const events = getEventsForDate(date);
      const dayNumber = toJalaliDay(date);

      return (
        <div className="relative flex flex-col items-center justify-center w-full h-full">
          {/* عدد روز با فونت بزرگ‌تر */}
          <span className="text-base md:text-xl font-medium text-gray-800">
            {dayNumber}
          </span>

          {/* نقطه‌های رویداد */}
          {events.length > 0 && (
            <div className="flex gap-0.5 mt-1 flex-wrap justify-center">
              {events.slice(0, 2).map((event) => (
                <div
                  key={event.id}
                  className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-200 hover:scale-125"
                  style={{
                    backgroundColor: EVENT_COLORS[event.type],
                  }}
                  title={event.title}
                />
              ))}
              {events.length > 2 && (
                <span className="text-[10px] md:text-xs text-gray-500 font-medium leading-none">
                  +{events.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      );
    },
    [getEventsForDate, EVENT_COLORS, toJalaliDay],
  );

  // هدر سفارشی ماه و سال (شمسی) با فونت بزرگ‌تر
  const renderCustomHeader = useCallback(
    ({
      date,
      decreaseMonth,
      increaseMonth,
    }: {
      date: Date;
      decreaseMonth: () => void;
      increaseMonth: () => void;
    }) => {
      const month = new Intl.DateTimeFormat('fa-IR', {
        month: 'long',
      }).format(date);

      const year = new Intl.DateTimeFormat('fa-IR', {
        year: 'numeric',
      }).format(date);

      return (
        <div className="flex justify-between items-center px-4 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-2xl">
          <button
            type="button"
            onClick={decreaseMonth}
            className="p-3 rounded-full hover:bg-white/80 transition-colors text-blue-700 text-xl md:text-2xl"
            aria-label="ماه قبل"
          >
            ◀
          </button>

          <span className="text-lg md:text-2xl font-bold text-blue-800">
            {month} {year}
          </span>

          <button
            type="button"
            onClick={increaseMonth}
            className="p-3 rounded-full hover:bg-white/80 transition-colors text-blue-700 text-xl md:text-2xl"
            aria-label="ماه بعد"
          >
            ▶
          </button>
        </div>
      );
    },
    [],
  );

  const calendarClassNames = useMemo(
    () =>
      'calendar-responsive w-full border-0 shadow-none ' +
   
      '[&_.react-datepicker__month-container]:w-full ' +
     
      '[&_.react-datepicker__day-names]:flex [&_.react-datepicker__day-names]:justify-around ' +
      '[&_.react-datepicker__day-names]:text-sm [&_.react-datepicker__day-names]:font-medium ' +
      '[&_.react-datepicker__day-names]:mb-2 ' +
    
      '[&_.react-datepicker__week]:flex [&_.react-datepicker__week]:justify-around ' +
      '[&_.react-datepicker__week]:gap-1 ' +
   
      '[&_.react-datepicker__day]:w-[14%] [&_.react-datepicker__day]:aspect-square ' +
      '[&_.react-datepicker__day]:py-3 [&_.react-datepicker__day]:rounded-2xl ' +
      '[&_.react-datepicker__day]:text-base [&_.react-datepicker__day]:hover:bg-blue-50 ' +
    
      '[&_.react-datepicker__day--selected]:bg-blue-600 [&_.react-datepicker__day--selected]:text-white ' +
      '[&_.react-datepicker__day--selected]:hover:bg-blue-700 ' +
   
      '[&_.react-datepicker__day--today]:font-bold [&_.react-datepicker__day--today]:text-blue-600 ' +
      '[&_.react-datepicker__day--today]:border-2 [&_.react-datepicker__day--today]:border-blue-200 ' +
  
      '[&_.react-datepicker__day--outside-month]:text-gray-300 ' +
   
      '[&_.react-datepicker__month]:m-2 [&_.react-datepicker__month]:gap-1 ' +
      'transition-all duration-200',
    [],
  );

  return (
    <div className="flex justify-center w-full" dir="rtl">
      {/* کانتینر کارت مانند */}
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100/50 p-2 md:p-4">
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date | null) => setSelectedDate(date)}
          locale="fa"
          inline
          renderCustomHeader={renderCustomHeader}
          renderDayContents={renderDayContents}
          calendarClassName={calendarClassNames}
          showPopperArrow={false}
          wrapperClassName="w-full"
      
          dayClassName={() => 'flex items-center justify-center'}
        />
      </div>
    </div>
  );
};

export default CalendarView;
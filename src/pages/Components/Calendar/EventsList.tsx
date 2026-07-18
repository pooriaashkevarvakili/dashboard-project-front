import React, { useMemo } from 'react';
import { List, Tag, Empty, Badge, Typography, Alert } from 'antd';
import { useCalendarCrypto } from '../../../hooks/useCalendarCrypto';
import type { CryptoEvent } from '../../../types/CryptoEvent';
import { MdEventNote } from 'react-icons/md';
<Empty
  image={<MdEventNote style={{ fontSize: 64, color: '#f97316' }} />}
  description={
    <span className="text-black text-lg font-bold">
      هیچ رویدادی در این تاریخ نیست
    </span>
  }
/>
const { Text, Title } = Typography;

interface EventsListProps {
  selectedDate: Date | null;
  onEventClick: (event: CryptoEvent) => void;
  EVENT_COLORS: Record<CryptoEvent['type'], string>;
  EVENT_LABELS: Record<CryptoEvent['type'], string>;
}

const EventsList: React.FC<EventsListProps> = ({
  selectedDate,
  onEventClick,
  EVENT_COLORS,
  EVENT_LABELS,
}) => {
  const { data, isLoading, error } = useCalendarCrypto();



  const formattedDate = selectedDate
    ? new Intl.DateTimeFormat('fa-IR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(selectedDate)
    : '';

  const events = useMemo<CryptoEvent[]>(() => {
    if (!selectedDate || !data?.data) {
      return [];
    }
    const key = selectedDate.toISOString().split('T')[0];
    const raw = data.data[key] ?? [];

    return raw as CryptoEvent[];
  }, [selectedDate, data]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-5 h-full flex items-center justify-center">
        <Text>در حال بارگذاری رویدادها...</Text>
      </div>
    );
  }

  if (error) {
    console.error('❌ EventsList خطا:', error);
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-5 h-full">
        <Alert
          message="خطا در دریافت رویدادها"
          description={(error as any)?.message || 'مشکلی در ارتباط با سرور رخ داده است.'}
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4 border-b pb-3">
        <Title level={4} className="!mb-0">
          رویدادهای <span className="text-blue-600">{formattedDate || 'تاریخ نامشخص'}</span>
        </Title>
        <Badge count={events.length} color="#1890ff" />
      </div>

      {events.length === 0 ? (
     <Empty
       image={<MdEventNote style={{ fontSize: 64, color: '#f97316' }} />}

  description={
    <span className="text-black text-lg font-bold">
      هیچ رویدادی در این تاریخ نیست
    </span>
  }
  className="mt-10 flex-1 flex flex-col justify-center"
/>
      ) : (
        <List
          dataSource={events}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              className="cursor-pointer hover:bg-gray-50 rounded-xl px-3 py-3 transition-all"
              onClick={() => onEventClick(item)}
            >
              <div className="flex items-start gap-3 w-full">
                <Tag color={EVENT_COLORS[item.type]}>
                  {EVENT_LABELS[item.type]}
                </Tag>
                <div className="flex-1">
                  <Text strong>{item.title}</Text>
                  <br />
                  <Text type="secondary" className="line-clamp-2">
                    {item.description}
                  </Text>
                </div>
              </div>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default EventsList;
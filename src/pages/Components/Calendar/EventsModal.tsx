import React from 'react';
import { Modal, Tag, Button, Space, Typography } from 'antd';
import type { CryptoEvent } from '../../../types/CryptoEvent';

const { Text, Paragraph } = Typography;

interface EventModalProps {
  visible: boolean;
  event: CryptoEvent | null;
  onClose: () => void;
  EVENT_COLORS: Record<CryptoEvent['type'], string>;
  EVENT_LABELS: Record<CryptoEvent['type'], string>;
}

const EventModal: React.FC<EventModalProps> = ({
  visible,
  event,
  onClose,
  EVENT_COLORS,
  EVENT_LABELS,
}) => {
  if (!event) return null;


  const formattedDate = new Intl.DateTimeFormat('fa-IR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(event.eventDate));

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      width={520}
      title={
        <Space>
          <div
            className="w-5 h-5 rounded-full"
            style={{ backgroundColor: EVENT_COLORS[event.type] }}
          />
          <span>{event.title}</span>
        </Space>
      }
      footer={[
        <Button key="close" onClick={onClose}>
          بستن
        </Button>,
        event.link ? (
          <Button key="link" type="primary" href={event.link} target="_blank">
            مشاهده جزئیات
          </Button>
        ) : null,
      ]}
    >
      <div className="space-y-5 py-2">
        <div>
          <Text className="text-gray-500">نوع رویداد: </Text>
          <Tag color={EVENT_COLORS[event.type]}>
            {EVENT_LABELS[event.type]}
          </Tag>
        </div>

        <div>
          <Text className="text-gray-500">تاریخ: </Text>
          <Text>{formattedDate}</Text>
        </div>

        <div>
          <Text className="text-gray-500 block mb-2">توضیحات:</Text>
          <Paragraph className="bg-gray-50 p-4 rounded-xl leading-relaxed">
            {event.description}
          </Paragraph>
        </div>

        {event.link && (
          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-blue-600 hover:underline break-all"
          >
            {event.link}
          </a>
        )}
      </div>
    </Modal>
  );
};

export default EventModal;
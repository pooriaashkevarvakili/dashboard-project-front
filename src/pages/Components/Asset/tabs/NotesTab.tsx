import React from "react";
import {
  Row,
  Col,
  Card,
  Input,
  Button,
  
  Form,
} from "antd";
import { FaPlus } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";

import createNote from "../../../../services/NotesTab";

interface NotesTabForm {
  title: string;
  content: string;
}

interface NotesTabProps {
  isMobile: boolean;
}

const NotesTab: React.FC<NotesTabProps> = ({  }) => {

  const addMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      toast.success("نت با موفقیت اضافه شد");
    },
    onError: () => {
      toast.error("خطا در ثبت نت");
    },
  });

  const onFinish = (values: NotesTabForm) => {
    addMutation.mutate(values);
  };

  
  return (
    <Row gutter={[16, 16]}>
      <ToastContainer />

      <Col xs={24}>
        <Card title="Add New Note" size="small">
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true }]}
            >
              <Input placeholder="Note title" />
            </Form.Item>

            <Form.Item
              name="content"
              label="Content"
              rules={[{ required: true }]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Write your note..."
              />
            </Form.Item>

            <Button
              htmlType="submit"
              type="primary"
              block
              icon={<FaPlus />}
              loading={addMutation.isPending}
            >
              Add Note
            </Button>
          </Form>
        </Card>
      </Col>

  
    </Row>
  );
};

export default NotesTab;
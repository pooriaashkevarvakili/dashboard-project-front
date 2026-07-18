import React from "react";
import {
  Row,
  Col,
  Card,
  Input,
  Button,
  Form,
} from "antd";
import { FaPlus, FaHeading, FaAlignLeft } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import * as yup from "yup";

import createNote from "../../../../services/NotesTab";

interface NotesTabForm {
  title: string;
  content: string;
}

interface NotesTabProps {
  isMobile?: boolean;
}

const noteSchema = yup.object().shape({
  title: yup
    .string()
    .required("عنوان الزامی است")
    .min(3, "عنوان حداقل ۳ کاراکتر باشد")
    .max(50, "عنوان حداکثر ۵۰ کاراکتر"),
  content: yup
    .string()
    .required("متن یادداشت الزامی است")
    .min(5, "متن حداقل ۵ کاراکتر باشد")
    .max(500, "متن حداکثر ۵۰۰ کاراکتر"),
});

const NotesTab: React.FC<NotesTabProps> = ({  }) => {
  const [form] = Form.useForm<NotesTabForm>();
  const [fieldErrors, setFieldErrors] = React.useState<{
    title?: string;
    content?: string;
  }>({});

  const addMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      toast.success("نت با موفقیت اضافه شد");
      form.resetFields();
      setFieldErrors({});
    },
    onError: () => {
      toast.error("خطا در ثبت نت");
    },
  });

  const validateField = (field: keyof NotesTabForm, value: string) => {
    try {
      noteSchema.validateSyncAt(field, { [field]: value });
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setFieldErrors((prev) => ({ ...prev, [field]: err.message }));
      }
    }
  };

  const onFinish = async (values: NotesTabForm) => {
    try {
      await noteSchema.validate(values, { abortEarly: false });
      addMutation.mutate(values);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors: { title?: string; content?: string } = {};
        err.inner.forEach((e) => {
          if (e.path) {
            errors[e.path as keyof NotesTabForm] = e.message;
          }
        });
        setFieldErrors(errors);
      }
    }
  };

  return (
    <Row gutter={[16, 16]} justify="center" className="w-full">
      <ToastContainer />

      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
        <Card
          title={
            <div className="flex items-center gap-3 text-xl font-bold text-gray-800">
              <span>📝</span> افزودن یادداشت جدید
            </div>
          }
          bordered={false}
          className="rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow duration-300 w-full"
          headStyle={{
            borderBottom: "2px solid #f0f0f0",
            padding: "16px 20px",
            fontSize: "1.1rem",
          }}
          bodyStyle={{ padding: "20px 16px 24px" }}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
            className="space-y-2"
          >
            <Form.Item
              name="title"
              label={
                <span className="font-semibold text-gray-700 text-sm sm:text-base">
                  <FaHeading className="inline ml-1 text-gray-400" /> عنوان
                  <span className="text-red-500 mr-1">*</span>
                </span>
              }
              validateStatus={fieldErrors.title ? "error" : ""}
              help={fieldErrors.title}
              hasFeedback
            >
              <Input
                placeholder="عنوان یادداشت را وارد کنید..."
                maxLength={50}
                size="large"
                className="rounded-xl border-gray-200 hover:border-orange-400 focus:border-orange-500 focus:shadow-lg transition-all"
                onChange={(e) => validateField("title", e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="content"
              label={
                <span className="font-semibold text-gray-700 text-sm sm:text-base">
                  <FaAlignLeft className="inline ml-1 text-gray-400" /> متن
                  <span className="text-red-500 mr-1">*</span>
                </span>
              }
              validateStatus={fieldErrors.content ? "error" : ""}
              help={fieldErrors.content}
              hasFeedback
            >
              <Input.TextArea
                placeholder="متن یادداشت را بنویسید..."
                rows={5}
                maxLength={500}
                showCount
                size="large"
                className="rounded-xl border-gray-200 hover:border-orange-400 focus:border-orange-500 focus:shadow-lg transition-all resize-none"
                onChange={(e) => validateField("content", e.target.value)}
              />
            </Form.Item>

            <Button
              htmlType="submit"
              type="primary"
              block
              size="large"
              icon={<FaPlus className="ml-2" />}
              loading={addMutation.isPending}
              className="h-12 rounded-xl !text-base !bg-orange-500  bg-gradient-to-r !from-orange-500 !to-orange-600 !hover:from-orange-600 !hover:to-orange-700 border-0 text-white font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
            >
              افزودن یادداشت
            </Button>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default NotesTab;
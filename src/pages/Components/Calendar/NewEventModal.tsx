import React, { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { faIR } from 'date-fns-jalali/locale';
import { registerLocale } from 'react-datepicker';
import { format } from 'date-fns-jalali';
import 'react-datepicker/dist/react-datepicker.css';
import type { CryptoEvent } from '../../../types/CryptoEvent';
import { FiCalendar, FiEdit3, FiFileText, FiX } from "react-icons/fi";
import * as yup from 'yup';
import { useCreateCalendarCrypto } from '../../../hooks/useCreateCalendarCrypto';

registerLocale('fa', faIR);

const CustomDateInput = forwardRef<HTMLInputElement, any>(({ value, onClick, onChange }, ref) => {
  const displayValue = value ? format(new Date(value), 'yyyy/MM/dd', { locale: faIR }) : '';
  return (
    <input
      ref={ref}
      value={displayValue}
      onClick={onClick}
      onChange={onChange}
      className="w-full rounded-2xl border-2 py-4 pr-12 pl-4 text-center focus:outline-none focus:ring-4 focus:ring-orange-200 focus:border-orange-500 border-gray-200"
      placeholder="انتخاب تاریخ"
    />
  );
});

interface NewEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDate?: Date | null;
}

const NewEventModal: React.FC<NewEventModalProps> = ({
  isOpen,
  onClose,
  initialDate,
}) => {
  const { mutate, isPending } = useCreateCalendarCrypto();

  const eventSchema = yup.object().shape({
    title: yup.string().trim().required('عنوان رویداد الزامی است'),
    type: yup.string().required('نوع رویداد الزامی است'),
    date: yup.date().required('تاریخ الزامی است'),
    description: yup
      .string()
      .required('توضیحات الزامی است')
      .max(500, 'توضیحات نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد'),
  });

  const [title, setTitle] = useState('');
  const [type, setType] = useState<CryptoEvent['type']>('Unlock Tokens');
  const [date, setDate] = useState(initialDate || new Date());
  const [description, setDescription] = useState('');

  const [errors, setErrors] = useState<{
    title?: string;
    type?: string;
    date?: string;
    description?: string;
  }>({});

  const renderCustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
  }: {
    date: Date;
    decreaseMonth: () => void;
    increaseMonth: () => void;
  }) => {
    const jalaliMonth = format(date, 'MMMM', { locale: faIR });
    const jalaliYear = format(date, 'yyyy', { locale: faIR });

    return (
      <div className="flex justify-between items-center px-4 py-3 bg-blue-50 rounded-t-2xl">
        <button
          type="button"
          onClick={decreaseMonth}
          className="text-xl px-4 py-1 hover:bg-white rounded-lg"
        >
          ◀
        </button>
        <span className="text-xl font-bold text-blue-700">
          {jalaliMonth} {jalaliYear}
        </span>
        <button
          type="button"
          onClick={increaseMonth}
          className="text-xl px-4 py-1 hover:bg-white rounded-lg"
        >
          ▶
        </button>
      </div>
    );
  };

  // توابع اعتبارسنجی (بدون تغییر)
  const validateTitle = (val: string) => {
    try {
      eventSchema.validateSyncAt('title', { title: val });
      setErrors(prev => ({ ...prev, title: undefined }));
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setErrors(prev => ({ ...prev, title: err.message }));
      }
    }
  };

  const validateType = (val: string) => {
    try {
      eventSchema.validateSyncAt('type', { type: val });
      setErrors(prev => ({ ...prev, type: undefined }));
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setErrors(prev => ({ ...prev, type: err.message }));
      }
    }
  };

  const validateDate = (val: Date) => {
    try {
      eventSchema.validateSyncAt('date', { date: val });
      setErrors(prev => ({ ...prev, date: undefined }));
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setErrors(prev => ({ ...prev, date: err.message }));
      }
    }
  };

  const validateDescription = (val: string) => {
    try {
      eventSchema.validateSyncAt('description', { description: val });
      setErrors(prev => ({ ...prev, description: undefined }));
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setErrors(prev => ({ ...prev, description: err.message }));
      }
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    validateTitle(val);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value as CryptoEvent["type"];
    setType(val);
    validateType(val);
  };

  const handleDateChange = (d: Date | null) => {
    if (d) {
      setDate(d);
      validateDate(d);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setDescription(val);
    validateDescription(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await eventSchema.validate(
        { title, type, date, description },
        { abortEarly: false },
      );

      mutate(
        {
          title: title.trim(),
          description: description.trim(),
          eventDate: date.toISOString().split('T')[0],
          type,
        },
        {
          onSuccess: () => {
            setTitle('');
            setDescription('');
            setType('Unlock Tokens');
            setDate(initialDate || new Date());
            setErrors({});
            onClose();
          },
        },
      );
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const validationErrors: Record<string, string> = {};
        err.inner.forEach((e) => {
          if (e.path) {
            validationErrors[e.path] = e.message;
          }
        });
        setErrors(validationErrors);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
        <button
          type="button"
          onClick={onClose}
          aria-label="بستن"
          className="absolute top-5 left-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-500 transition hover:bg-gray-100 hover:text-red-500"
        >
          <FiX size={22} />
        </button>

        <div className="px-8 pt-8 pb-6">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            افزودن رویداد جدید
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* عنوان رویداد */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                عنوان رویداد
              </label>
              <div className="relative group">
                <FiEdit3
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl transition-colors group-focus-within:text-orange-500"
                />
                <input
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="مثلاً: لیست شدن BTC در Binance"
                  required
                  className={`w-full rounded-2xl border-2 bg-gray-50 pr-12 pl-4 py-4 text-base font-medium text-gray-800 placeholder:text-gray-400 transition-all duration-200 shadow-sm hover:border-orange-300 hover:bg-white focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-200 focus:outline-none ${
                    errors.title ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200'
                  }`}
                />
              </div>
              {errors.title && (
                <p className="text-red-500 text-xs mt-1 pr-2">{errors.title}</p>
              )}
            </div>

            {/* نوع و تاریخ */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <select
                  value={type}
                  onChange={handleTypeChange}
                  className={`w-full appearance-none rounded-2xl border-2 bg-white px-5 py-4 pr-12 text-base font-medium text-gray-700 shadow-sm transition duration-200 cursor-pointer hover:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-200 focus:border-orange-500 ${
                    errors.type ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200'
                  }`}
                >
                  <option value="Unlock Tokens">🔓 Unlock Tokens</option>
                  <option value="Airdrops">🎁 Airdrops</option>
                  <option value="ICO">🚀 ICO</option>
                  <option value="Listing">📈 Listing</option>
                  <option value="Halving">⛏️ Halving</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                  <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {errors.type && (
                  <p className="text-red-500 text-xs mt-1">{errors.type}</p>
                )}
              </div>

              <div className="relative w-full">
                <FiCalendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl z-10" />
                <DatePicker
                  selected={date}
                  onChange={handleDateChange}
                  locale="fa"
                  dateFormat="yyyy/MM/dd"
                  customInput={<CustomDateInput />}
                  renderCustomHeader={renderCustomHeader} // ✅ هدر شمسی
                  wrapperClassName="w-full"
                  className="hidden"
                />
                {errors.date && (
                  <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                )}
              </div>
            </div>

            {/* توضیحات */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                توضیحات <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <FiFileText
                  className="absolute top-5 left-4 text-gray-400 text-xl transition-colors group-focus-within:text-orange-500"
                />
                <textarea
                  value={description}
                  onChange={handleDescriptionChange}
                  placeholder="توضیحات رویداد را وارد کنید..."
                  rows={5}
                  maxLength={500}
                  className={`w-full rounded-2xl border-2 bg-gray-50 pl-12 pr-5 py-4 text-base text-gray-700 placeholder:text-gray-400 resize-none transition-all duration-300 shadow-sm hover:border-orange-300 hover:bg-white focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 focus:shadow-lg focus:outline-none ${
                    errors.description ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200'
                  }`}
                />
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">اجباری</span>
                <span className={description.length > 450 ? "text-red-500" : "text-gray-400"}>
                  {description.length}/500
                </span>
              </div>
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">{errors.description}</p>
              )}
            </div>

            {/* دکمه ارسال */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={isPending}
                className="flex-1  py-4 !text-lg font-medium bg-orange-500 !text-white rounded-2xl hover:bg-gray-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isPending ? 'در حال ثبت...' : 'ثبت رویداد'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewEventModal;
import React, { useState } from "react";
import { FiBell, FiPlus } from "react-icons/fi";
import type { Indicator, Condition } from "../../../types/Alert";
import AlertPost from '../../../services/ALertPost';
import * as yup from "yup";
import { toast } from "react-toastify";

interface NewAlertFormProps {
  symbols: string[];
  newSymbol: string;
  newIndicator: Indicator;
  newCondition: Condition;
  newValue: number;
  setNewSymbol: (s: string) => void;
  setNewIndicator: (i: Indicator) => void;
  setNewCondition: (c: Condition) => void;
  setNewValue: (v: number) => void;
  addAlert: () => void;
}

const inputStyle =
  "w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-4 py-3 text-sm text-gray-700 dark:text-gray-100 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20";

const errorStyle = "mt-1 text-sm text-red-500 dark:text-red-400";

const NewAlertForm: React.FC<NewAlertFormProps> = ({
  symbols,
  newSymbol,
  newIndicator,
  newCondition,
  newValue,
  setNewSymbol,
  setNewIndicator,
  setNewCondition,
  setNewValue,
  addAlert,
}) => {
  // استیت برای نگهداری خطاهای هر فیلد
  const [errors, setErrors] = useState<{
    symbol?: string;
    indicator?: string;
    condition?: string;
    value?: string;
  }>({});

  const alertSchema = yup.object({
    symbol: yup.string().required("لطفاً یک نماد انتخاب کنید."),
    indicator: yup
      .mixed<Indicator>()
      .oneOf(["Price", "Volume", "RSI", "MACD"])
      .required("لطفاً یک اندیکاتور انتخاب کنید."),
    condition: yup
      .mixed<Condition>()
      .oneOf([">", "<", "="])
      .required("لطفاً یک شرط انتخاب کنید."),
    value: yup
      .number()
      .typeError("مقدار هدف باید عدد باشد.")
      .required("مقدار هدف الزامی است.")
      .moreThan(0, "مقدار هدف باید بزرگ‌تر از صفر باشد."),
  });

  const handleCreateAlert = async () => {
    // پاک کردن خطاهای قبلی
    setErrors({});

    try {
      // اعتبارسنجی با abortEarly: false تا تمام خطاها جمع شوند
      await alertSchema.validate(
        {
          symbol: newSymbol,
          indicator: newIndicator,
          condition: newCondition,
          value: newValue,
        },
        { abortEarly: false }
      );

      await AlertPost({
        symbol: newSymbol,
        indicator: newIndicator,
        condition: newCondition,
        value: newValue,
      });

      toast.success("✅ هشدار جدید اضافه شد");
      addAlert();  
    } catch (err: any) {
      if (err.name === "ValidationError") {
        const fieldErrors: Record<string, string> = {};
        err.inner.forEach((e: yup.ValidationError) => {
          if (e.path) {
            fieldErrors[e.path] = e.message;
          }
        });
        setErrors(fieldErrors);

        toast.error(err.errors[0]);
        return;
      }

      console.error("Error in AlertPost:", err);

      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "ثبت هشدار با خطا مواجه شد.";
      toast.error(`❌ ${errorMessage}`);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
      <div className="flex items-center gap-3 border-b border-gray-100 dark:border-gray-700 px-6 py-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-900/40">
          <FiBell className="text-xl text-indigo-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            ایجاد هشدار
          </h2>
          <p className="text-sm text-gray-500">
            وقتی شرط شما برآورده شود، اعلان دریافت کنید.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-6 p-6">
        {/* Symbol */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-600 dark:text-gray-300">
            نماد معاملاتی
          </label>
          <select
            value={newSymbol}
            onChange={(e) => {
              setNewSymbol(e.target.value);
              // پاک کردن خطای این فیلد هنگام تغییر
              setErrors((prev) => ({ ...prev, symbol: undefined }));
            }}
            className={inputStyle}
          >
            {symbols.length ? (
              symbols.map((symbol) => (
                <option key={symbol} value={symbol}>
                  {symbol}
                </option>
              ))
            ) : (
              <option>هیچ نمادی موجود نیست</option>
            )}
          </select>
          {errors.symbol && <div className={errorStyle}>{errors.symbol}</div>}
        </div>

        {/* Indicator */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-600 dark:text-gray-300">
            اندیکاتور
          </label>
          <select
            value={newIndicator}
            onChange={(e) => {
              setNewIndicator(e.target.value as Indicator);
              setErrors((prev) => ({ ...prev, indicator: undefined }));
            }}
            className={inputStyle}
          >
            <option value="Price">💲 قیمت</option>
            <option value="Volume">📊 حجم</option>
            <option value="RSI">📈 RSI</option>
            <option value="MACD">📉 MACD</option>
          </select>
          {errors.indicator && <div className={errorStyle}>{errors.indicator}</div>}
        </div>

        {/* Condition & Value */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-600 dark:text-gray-300">
              شرط
            </label>
            <select
              value={newCondition}
              onChange={(e) => {
                setNewCondition(e.target.value as Condition);
                setErrors((prev) => ({ ...prev, condition: undefined }));
              }}
              className={inputStyle}
            >
              <option value=">">بزرگ‌تر (&gt;)</option>
              <option value="<">کوچک‌تر (&lt;)</option>
              <option value="=">مساوی (=)</option>
            </select>
            {errors.condition && <div className={errorStyle}>{errors.condition}</div>}
          </div>

          <div className="col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-600 dark:text-gray-300">
              مقدار هدف
            </label>
            <input
              type="number"
              value={newValue || ""}
              onChange={(e) => {
                const val = e.target.value === "" ? 0 : Number(e.target.value);
                setNewValue(val);
                setErrors((prev) => ({ ...prev, value: undefined }));
              }}
              placeholder="مقدار را وارد کنید..."
              className={inputStyle}
            />
            {errors.value && <div className={errorStyle}>{errors.value}</div>}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 dark:border-gray-700 p-6">
        <button
          onClick={handleCreateAlert}
          className="
            flex w-full items-center justify-center gap-2 rounded-xl
            bg-indigo-600 px-5 py-3 text-sm font-semibold text-white
            transition-all hover:bg-indigo-700 hover:shadow-lg
            active:scale-[0.98]
          "
        >
          <FiPlus className="text-lg" />
          ایجاد هشدار
        </button>
      </div>
    </div>
  );
};

export default NewAlertForm;
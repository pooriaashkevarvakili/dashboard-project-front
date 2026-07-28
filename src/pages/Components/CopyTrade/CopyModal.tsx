import React from "react";
import { Modal, Button, Row, Col, Slider, Switch, InputNumber } from "antd";
import { CopyOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { FaCopy } from "react-icons/fa";
import type { Trader } from "../../../types/Trade";

interface CopyModalProps {
  open: boolean;
  trader: Trader | null;
  copyAmount: number;
  setCopyAmount: (value: number) => void;
  riskMultiplier: number;
  setRiskMultiplier: (value: number) => void;
  autoCopy: boolean;
  setAutoCopy: (value: boolean) => void;
  stopLoss: number;
  setStopLoss: (value: number) => void;
  takeProfit: number;
  setTakeProfit: (value: number) => void;
  onClose: () => void;
  onCopy: () => void;
}

const CopyModal: React.FC<CopyModalProps> = ({
  open,
  trader,
  copyAmount,
  setCopyAmount,
  riskMultiplier,
  setRiskMultiplier,
  autoCopy,
  setAutoCopy,
  stopLoss,
  setStopLoss,
  takeProfit,
  setTakeProfit,
  onClose,
  onCopy,
}) => {
  if (!trader) return null;

  return (
    <Modal
      title={
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            <CopyOutlined className="text-white text-lg" />
          </div>
          <div>
            <div className="font-semibold">Copy Trading</div>
            <span className="text-gray-400 text-xs">
              {trader.name} • {trader.strategy}
            </span>
          </div>
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      width={560}
      centered
      destroyOnClose
    >
      <div className="py-2">
        <div className="bg-gray-50 rounded-xl p-4 mb-5">
          <Row gutter={[12, 12]}>
            <Col span={8}>
              <span className="text-gray-400 text-xs">Total PnL</span>
              <div
                className={`font-bold text-lg ${trader.totalPnL >= 0 ? "text-emerald-500" : "text-red-500"}`}
              >
                {trader.totalPnL >= 0 ? "+" : ""}$
                {trader.totalPnL.toLocaleString()}
              </div>
            </Col>
            <Col span={8}>
              <span className="text-gray-400 text-xs">Win Rate</span>
              <div className="font-bold text-lg text-gray-800">
                {trader.winRate}%
              </div>
            </Col>
            <Col span={8}>
              <span className="text-gray-400 text-xs">ROI</span>
              <div
                className={`font-bold text-lg ${trader.roi >= 0 ? "text-emerald-500" : "text-red-500"}`}
              >
                {trader.roi >= 0 ? "+" : ""}
                {trader.roi}%
              </div>
            </Col>
          </Row>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-sm">Copy Amount</span>
              <span className="text-gray-400 text-xs">
                ${copyAmount.toLocaleString()}
              </span>
            </div>
            <Slider
              min={100}
              max={10000}
              step={100}
              value={copyAmount}
              onChange={setCopyAmount}
              tooltip={{ formatter: (v) => `$${v?.toLocaleString()}` }}
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>$100</span>
              <span>$10,000</span>
            </div>
          </div>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <span className="font-semibold text-sm">Risk Multiplier</span>
              <div className="flex items-center gap-2 mt-1">
                <Button
                  size="small"
                  onClick={() =>
                    setRiskMultiplier(Math.max(0.5, riskMultiplier - 0.5))
                  }
                >
                  -
                </Button>
                <span className="font-semibold w-8 text-center">
                  {riskMultiplier}x
                </span>
                <Button
                  size="small"
                  onClick={() =>
                    setRiskMultiplier(Math.min(3, riskMultiplier + 0.5))
                  }
                >
                  +
                </Button>
              </div>
            </Col>
            <Col span={12}>
              <span className="font-semibold text-sm">Auto Copy</span>
              <div className="flex items-center gap-2 mt-1">
                <Switch
                  checked={autoCopy}
                  onChange={setAutoCopy}
                  checkedChildren="On"
                  unCheckedChildren="Off"
                />
              </div>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <span className="font-semibold text-sm">Stop Loss</span>
              <InputNumber
                value={stopLoss}
                onChange={(v) => setStopLoss(v || 0)}
                min={1}
                max={50}
                className="w-full mt-1"
                formatter={(v) => `${v}%`}
                parser={(v) => parseFloat(v?.replace("%", "") || "0")}
              />
            </Col>
            <Col span={12}>
              <span className="font-semibold text-sm">Take Profit</span>
              <InputNumber
                value={takeProfit}
                onChange={(v) => setTakeProfit(v || 0)}
                min={5}
                max={100}
                className="w-full mt-1"
                formatter={(v) => `${v}%`}
                parser={(v) => parseFloat(v?.replace("%", "") || "0")}
              />
            </Col>
          </Row>

          <div className="bg-blue-50 rounded-lg p-3 flex items-start gap-2">
            <InfoCircleOutlined className="text-blue-500 text-base mt-0.5" />
            <span className="text-gray-500 text-xs leading-relaxed">
              You are about to copy <strong>{trader.name}</strong> with{" "}
              <strong>${copyAmount.toLocaleString()}</strong> at{" "}
              <strong>{riskMultiplier}x</strong> risk multiplier.
              {autoCopy && " New trades will be copied automatically."}
            </span>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button
              type="primary"
              block
              size="large"
              onClick={onCopy}
              icon={<FaCopy />}
              className="!h-12 !rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 border-0 hover:from-blue-700 hover:to-purple-700 font-semibold"
            >
              Start Copying
            </Button>
            <Button
              size="large"
              onClick={onClose}
              className="!h-12 !rounded-xl"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CopyModal;

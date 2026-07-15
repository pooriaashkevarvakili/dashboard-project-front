// components/WalletsNotesRoiTab.tsx

import React from "react";
import {
  Tabs,
  Table,
  Button,
  Card,
  Row,
  Col,
  Input,
  List,
  Empty,
  Progress,
  Statistic,
  Timeline,
} from "antd";

import {
  FaWallet,
  FaFileAlt,
  FaDollarSign,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

const { TabPane } = Tabs;
const { TextArea } = Input;

interface Props {
  walletColumns: any[];
  mockWallets: any[];

  notes: any[];
  newNoteTitle: string;
  newNoteContent: string;

  setNewNoteTitle: (v: string) => void;
  setNewNoteContent: (v: string) => void;

  addNote: () => void;
  deleteNote: (id: string) => void;

  roi: number;
  totalInvested: number;
  currentValue: number;
}

const WalletsNotesRoiTab: React.FC<Props> = ({
  walletColumns,
  mockWallets,

  notes,
  newNoteTitle,
  newNoteContent,

  setNewNoteTitle,
  setNewNoteContent,

  addNote,
  deleteNote,

  roi,
  totalInvested,
  currentValue,
}) => {
  return (
    <Tabs defaultActiveKey="wallets">

      {/* ================= Wallets ================= */}

      <TabPane
        key="wallets"
        tab={
          <span>
            <FaWallet /> Wallets
          </span>
        }
      >
        <Table
          columns={walletColumns}
          dataSource={mockWallets}
          pagination={false}
        />
      </TabPane>

      {/* ================= Notes ================= */}

      <TabPane
        key="notes"
        tab={
          <span>
            <FaFileAlt /> Notes
          </span>
        }
      >
        <Row gutter={16}>

          <Col xs={24} md={8}>
            <Card title="Add Note">

              <Input
                placeholder="Title"
                value={newNoteTitle}
                onChange={(e) =>
                  setNewNoteTitle(e.target.value)
                }
              />

              <br />
              <br />

              <TextArea
                rows={5}
                value={newNoteContent}
                onChange={(e) =>
                  setNewNoteContent(e.target.value)
                }
              />

              <br />
              <br />

              <Button
                type="primary"
                block
                icon={<FaPlus />}
                onClick={addNote}
              >
                Add Note
              </Button>

            </Card>
          </Col>

          <Col xs={24} md={16}>

            {notes.length === 0 ? (
              <Empty />
            ) : (
              <List
                dataSource={notes}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Button
                        danger
                        type="text"
                        icon={<FaTrash />}
                        onClick={() =>
                          deleteNote(item.id)
                        }
                      />,
                    ]}
                  >
                    <List.Item.Meta
                      title={item.title}
                      description={item.content}
                    />
                  </List.Item>
                )}
              />
            )}

          </Col>

        </Row>
      </TabPane>

      {/* ================= ROI ================= */}

      <TabPane
        key="roi"
        tab={
          <span>
            <FaDollarSign /> ROI
          </span>
        }
      >
        <Row gutter={16}>

          <Col xs={24} md={12}>

            <Card title="ROI">

              <Statistic
                title="ROI"
                value={roi}
                suffix="%"
              />

              <br />

              <Progress
                percent={Math.min(
                  Math.abs(roi),
                  100
                )}
              />

              <br />

              <Statistic
                title="Invested"
                value={totalInvested}
              />

              <Statistic
                title="Current Value"
                value={currentValue}
              />

            </Card>

          </Col>

          <Col xs={24} md={12}>

            <Card title="Performance">

              <Timeline
                items={[
                  {
                    children: "All Time High",
                  },
                  {
                    children: "Current Price",
                  },
                  {
                    children: "All Time Low",
                  },
                  {
                    children: "Year To Date",
                  },
                ]}
              />

            </Card>

          </Col>

        </Row>
      </TabPane>

    </Tabs>
  );
};

export default WalletsNotesRoiTab;
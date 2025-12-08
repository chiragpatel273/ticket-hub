import { Button, message, Popconfirm, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import theatreApi from "../../api/theatreApi";

export default function AdminTheatres() {
  const [theatres, setTheatres] = useState([]);

  const loadData = () => {
    theatreApi.getAll().then((res) => {
      setTheatres(res.data.theatres);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const approve = async (id: string) => {
    await theatreApi.approve(id);
    message.success("Theatre approved");
    loadData();
  };

  const reject = async (id: string) => {
    await theatreApi.reject(id);
    message.error("Theatre rejected");
    loadData();
  };

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "City", dataIndex: "city" },
    { title: "Address", dataIndex: "address" },
    {
      title: "Partner",
      dataIndex: "owner",
      render: (u: any) => `${u?.name} (${u?.email})`,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => {
        if (status === "approved") return <Tag color="green">APPROVED</Tag>;
        if (status === "pending") return <Tag color="orange">PENDING</Tag>;
        return <Tag color="red">REJECTED</Tag>;
      },
    },
    {
      title: "Actions",
      render: (_: any, record: any) => (
        <>
          {record.status === "pending" && (
            <>
              <Popconfirm title="Approve theatre?" onConfirm={() => approve(record._id)}>
                <Button type="link" style={{ color: "green" }}>
                  Approve
                </Button>
              </Popconfirm>

              <Popconfirm title="Reject theatre?" onConfirm={() => reject(record._id)}>
                <Button type="link" danger>
                  Reject
                </Button>
              </Popconfirm>
            </>
          )}
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>Theatre Approvals</h1>

      <Table columns={columns} dataSource={theatres} rowKey="_id" style={{ marginTop: 20 }} />
    </div>
  );
}

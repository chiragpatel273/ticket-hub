import { Button, Form, Image, Input, message, Modal, Popconfirm, Space, Table } from "antd";
import { useEffect, useState } from "react";
import adminMovieApi from "../../api/adminMovieApi";

export default function AdminMovies() {
  const [movies, setMovies] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingMovie, setEditingMovie] = useState<any>(null);
  const [form] = Form.useForm();

  const loadMovies = () => {
    adminMovieApi.list().then((res) => setMovies(res.data.movies));
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const openModal = (record = null) => {
    setEditingMovie(record);
    setVisible(true);
    form.resetFields();
    form.setFieldsValue(record || {});
  };

  const onSubmit = async (values: any) => {
    try {
      if (editingMovie) {
        await adminMovieApi.update(editingMovie._id, values);
        message.success("Movie updated");
      } else {
        await adminMovieApi.create(values);
        message.success("Movie created");
      }

      setVisible(false);
      loadMovies();
    } catch (err) {
      message.error("Error saving movie");
    }
  };

  const deleteMovie = async (id: any) => {
    await adminMovieApi.delete(id);
    message.success("Movie deleted");
    loadMovies();
  };

  const columns = [
    {
      title: "Poster",
      dataIndex: "poster",
      render: (poster: string) =>
        poster ? (
          <Image src={poster} alt="Poster" width={60} height={90} style={{ objectFit: "cover" }} />
        ) : (
          <span style={{ color: "#94a3b8" }}>No poster</span>
        ),
    },
    { title: "Title", dataIndex: "title" },
    { title: "Language", dataIndex: "language" },
    { title: "Genre", dataIndex: "genre" },
    { title: "Duration", dataIndex: "duration" },
    {
      title: "Actions",
      render: (_: any, record: any) => (
        <Space size="small">
          <Button type="link" onClick={() => openModal(record)}>
            Edit
          </Button>
          <Popconfirm title="Delete movie?" onConfirm={() => deleteMovie(record._id)}>
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>Manage Movies</h1>

      <Button type="primary" onClick={() => openModal()}>
        Add Movie
      </Button>

      <Table columns={columns} dataSource={movies} rowKey="_id" style={{ marginTop: 20 }} />

      <Modal
        open={visible}
        title={editingMovie ? "Edit Movie" : "Add Movie"}
        onCancel={() => setVisible(false)}
        onOk={() => form.submit()}
      >
        <Form layout="vertical" form={form} onFinish={onSubmit}>
          <Form.Item name="poster" label="Poster URL">
            <Input placeholder="https://..." />
          </Form.Item>

          <Form.Item shouldUpdate noStyle>
            {() => {
              const poster = form.getFieldValue("poster");
              return (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ marginBottom: 8, fontWeight: 500 }}>Poster Preview</div>
                  {poster ? (
                    <Image
                      src={poster}
                      alt="Poster Preview"
                      width={120}
                      height={180}
                      style={{ objectFit: "cover", borderRadius: 8 }}
                      fallback="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 180'><rect width='100%' height='100%' fill='%23f1f5f9'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8' font-size='12'>No preview</text></svg>"
                    />
                  ) : (
                    <div
                      style={{
                        width: 120,
                        height: 180,
                        borderRadius: 8,
                        border: "1px dashed #cbd5f5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#94a3b8",
                        background: "#f8fafc",
                      }}
                    >
                      Preview unavailable
                    </div>
                  )}
                </div>
              );
            }}
          </Form.Item>

          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="language" label="Language" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="genre" label="Genre" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="duration" label="Duration" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

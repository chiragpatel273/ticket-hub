import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  TimePicker,
  message,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import movieApi from "../../api/movieApi";
import screenApi from "../../api/screenApi";
import showApi from "../../api/showApi";
import theatreApi from "../../api/theatreApi";

export default function PartnerTheatreShows() {
  const { theatreId } = useParams();

  const [theatre, setTheatre] = useState<any>(null);
  const [screens, setScreens] = useState<any[]>([]);
  const [movies, setMovies] = useState<any[]>([]);
  const [shows, setShows] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [editingShow, setEditingShow] = useState<any>(null);
  const [modalLoading, setModalLoading] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    if (!theatreId) return;

    theatreApi
      .getMyTheatres()
      .then((res) => {
        const t = res.data.theatres.find((item: any) => item._id === theatreId);
        setTheatre(t ?? null);
      })
      .catch(() => message.error("Failed to load theatre details"));

    fetchScreens();
    fetchShows();

    movieApi
      .getAll()
      .then((res) => setMovies(res.data.movies))
      .catch(() => message.error("Failed to load movies"));
  }, [theatreId]);

  const fetchScreens = () => {
    screenApi
      .getMyScreens()
      .then((res) => {
        const filteredScreens = res.data.screens.filter((s: any) => s.theatre?._id === theatreId);
        setScreens(filteredScreens);
      })
      .catch(() => message.error("Failed to load screens"));
  };

  const fetchShows = () => {
    showApi
      .getMyShows()
      .then((res) => {
        const filteredShows = res.data.shows.filter((s: any) => s.theatre?._id === theatreId);
        setShows(filteredShows);
      })
      .catch(() => message.error("Failed to load shows"));
  };

  const openCreateModal = () => {
    setEditingShow(null);
    form.resetFields();
    setVisible(true);
  };

  const handleEdit = (show: any) => {
    setEditingShow(show);
    form.setFieldsValue({
      movie: show.movie?._id || show.movie,
      screen: show.screen?._id || show.screen,
      date: dayjs(show.date, "YYYY-MM-DD"),
      time: dayjs(show.time, "HH:mm"),
      ticketPrice: show.ticketPrice,
    });
    setVisible(true);
  };

  const handleDelete = async (showId: string) => {
    try {
      await showApi.deleteShow(showId);
      message.success("Show deleted");
      fetchShows();
    } catch (err) {
      message.error("Error deleting show");
    }
  };

  const handleModalClose = () => {
    setVisible(false);
    setEditingShow(null);
    setModalLoading(false);
    form.resetFields();
  };

  const onSubmit = async (values: any) => {
    const payload = {
      ...values,
      theatre: theatreId,
      date: values.date.format("YYYY-MM-DD"),
      time: values.time.format("HH:mm"),
    };

    try {
      setModalLoading(true);
      if (editingShow) {
        await showApi.updateShow(editingShow._id, payload);
        message.success("Show updated!");
      } else {
        await showApi.createShow(payload);
        message.success("Show created!");
      }

      fetchShows();
      handleModalClose();
    } catch (err) {
      message.error(editingShow ? "Error updating show" : "Error creating show");
      setModalLoading(false);
    }
  };

  const columns = [
    { title: "Movie", render: (s: any) => s.movie?.title },
    { title: "Screen", render: (s: any) => s.screen?.name },
    { title: "Date", dataIndex: "date" },
    { title: "Time", dataIndex: "time" },
    { title: "Ticket Price", dataIndex: "ticketPrice" },
    {
      title: "Actions",
      render: (record: any) => (
        <Space size="small">
          <Button size="small" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete show"
            description="Are you sure you want to delete this show?"
            okText="Delete"
            okButtonProps={{ danger: true }}
            onConfirm={() => handleDelete(record._id)}
          >
            <Button danger size="small">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>Shows — {theatre?.name}</h1>

      <Button type="primary" onClick={openCreateModal}>
        Add Show
      </Button>

      <Table columns={columns} dataSource={shows} rowKey="_id" style={{ marginTop: 20 }} />

      <Modal
        title={editingShow ? "Edit Show" : "Add Show"}
        open={visible}
        onCancel={handleModalClose}
        onOk={() => form.submit()}
        confirmLoading={modalLoading}
      >
        <Form layout="vertical" form={form} onFinish={onSubmit}>
          <Form.Item name="movie" label="Movie" rules={[{ required: true }]}>
            <Select>
              {movies.map((m) => (
                <Select.Option value={m._id} key={m._id}>
                  {m.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="screen" label="Screen" rules={[{ required: true }]}>
            <Select>
              {screens.map((s) => (
                <Select.Option value={s._id} key={s._id}>
                  {s.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="date" label="Date" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>

          <Form.Item name="time" label="Time" rules={[{ required: true }]}>
            <TimePicker format="HH:mm" />
          </Form.Item>

          <Form.Item name="ticketPrice" label="Ticket Price" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

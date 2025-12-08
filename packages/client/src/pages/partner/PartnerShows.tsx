import { Button, DatePicker, Form, Input, Modal, Select, Table, TimePicker, message } from "antd";
import { useEffect, useState } from "react";
import movieApi from "../../api/movieApi";
import screenApi from "../../api/screenApi";
import showApi from "../../api/showApi";
import theatreApi from "../../api/theatreApi";

export default function PartnerShows() {
  const [movies, setMovies] = useState([]);
  const [theatres, setTheatres] = useState([]);
  const [screens, setScreens] = useState([]);
  const [shows, setShows] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    movieApi.getAll().then((res: any) => setMovies(res.data.movies));
    theatreApi.getMyTheatres().then((res: any) => setTheatres(res.data.theatres));
    screenApi.getMyScreens().then((res: any) => setScreens(res.data.screens));
    showApi.getMyShows().then((res: any) => setShows(res.data.shows));
  }, []);

  const onSubmit = async (values: any) => {
    const payload = {
      ...values,
      date: values.date.format("YYYY-MM-DD"),
      time: values.time.format("HH:mm"),
    };

    try {
      await showApi.createShow(payload);
      message.success("Show created!");
      setVisible(false);
      showApi.getMyShows().then((res: any) => setShows(res.data.shows));
    } catch (err) {
      message.error("Error creating show");
    }
  };

  return (
    <div>
      <h1>My Shows</h1>

      <Button type="primary" onClick={() => setVisible(true)}>
        Add Show
      </Button>

      <Table
        dataSource={shows}
        rowKey="_id"
        style={{ marginTop: 20 }}
        columns={[
          { title: "Movie", render: (s) => s.movie?.title },
          { title: "Theatre", render: (s) => s.theatre?.name },
          { title: "Screen", render: (s) => s.screen?.name },
          { title: "Date", dataIndex: "date" },
          { title: "Time", dataIndex: "time" },
          { title: "Ticket Price", dataIndex: "ticketPrice" },
        ]}
      />

      <Modal
        title="Add Show"
        open={visible}
        onCancel={() => setVisible(false)}
        onOk={() => form.submit()}
      >
        <Form layout="vertical" form={form} onFinish={onSubmit}>
          <Form.Item name="movie" label="Select Movie" rules={[{ required: true }]}>
            <Select>
              {movies.map((m: any) => (
                <Select.Option value={m._id} key={m._id}>
                  {m.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="theatre" label="Select Theatre" rules={[{ required: true }]}>
            <Select>
              {theatres.map((t: any) => (
                <Select.Option value={t._id} key={t._id}>
                  {t.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="screen" label="Select Screen" rules={[{ required: true }]}>
            <Select>
              {screens.map((s: any) => (
                <Select.Option value={s._id} key={s._id}>
                  {s.name} — {s.theatre?.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="date" label="Select Date" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>

          <Form.Item name="time" label="Select Time" rules={[{ required: true }]}>
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

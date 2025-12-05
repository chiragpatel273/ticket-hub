import { Layout } from "antd";
import type { PropsWithChildren } from "react";
import Navbar from "../components/Navbar";

const { Content } = Layout;

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
      }}
    >
      <Navbar />

      <Content
        style={{
          paddingBlock: 32,
          paddingInline: 16,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 1280,
          }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  );
}

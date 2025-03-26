import React from "react";
import NavBar from "./NavBar";
import { ColorPicker, Image, Dropdown, Space } from "antd";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";

const items = [
  {
    key: "1",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item (disabled)
      </a>
    ),
    icon: <SmileOutlined />,
    disabled: true,
  },
  {
    key: "3",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
  {
    key: "4",
    danger: true,
    label: "a danger item",
  },
];

export default function App() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen max-w-[1000px] mt-24 mx-auto">
        <p>Put your design system components in the space below...</p>

        <ColorPicker defaultValue="#1677ff" />

        <h2 className="font-Comfortaa my-4 font-bold text-xl">Photo Gallery</h2>
        <div className="flex flex-wrap content-start">
          <Image src="https://picsum.photos/600/600?id=1" width={200} />
          <Image src="https://picsum.photos/600/600?id=2" width={200} />
          <Image src="https://picsum.photos/600/600?id=3" width={200} />
          <Image src="https://picsum.photos/600/600?id=4" width={200} />
          <Image src="https://picsum.photos/600/600?id=5" width={200} />
          <Image src="https://picsum.photos/600/600?id=6" width={200} />
          <Image src="https://picsum.photos/600/600?id=7" width={200} />
          <Image src="https://picsum.photos/600/600?id=8" width={200} />
          <Image src="https://picsum.photos/600/600?id=9" width={200} />
          <Image src="https://picsum.photos/600/600?id=10" width={200} />
        </div>

        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()} className="mt-5 inline-block">
            <Space>
              Hover me
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </main>

      <footer className="p-5 bg-white">footer goes here</footer>
    </>
  );
}
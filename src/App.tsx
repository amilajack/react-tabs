import React, { useState } from "react";
import Tabs from "./tabs";
import "./styles.css";

export default function App() {
  const [text, setText] = useState("");
  const [tabs, setTabs] = useState([
    {
      id: "1",
      title: "Untitled",
      isActive: true,
      hasActivity: true
    }
  ]);
  const props = {
    tabs,
    borderColor: "black",
    onChange: (id: string) => {
      setTabs(
        tabs.map((tab) => ({
          ...tab,
          isActive: tab.id === id
        }))
      );
      switch (id) {
        case "1": {
          setText("f");
          break;
        }
        case "2": {
          setText("iii");
          break;
        }
      }
    },
    onClose: (id: string) => {
      let closedIdx = tabs.findIndex((tab, i) => tab.id === id);
      const newTabs = tabs
        .filter((tab) => tab.id !== id)
        .map((tab, idx, items) => {
          // clamp new tab index between 0 and tabs.length - 1
          let newActiveTabIdx = Math.max(
            0,
            Math.min(closedIdx, items.length - 1)
          );
          return {
            ...tab,
            isActive: idx === newActiveTabIdx
          };
        });
      setTabs(newTabs);
    },
    fullScreen: true
  };
  const newTab = () => {
    setTabs([
      ...tabs.map((tab) => ({ ...tab, isActive: false })),
      {
        id: String(Math.floor(Math.random() * 10000)),
        title: "tab",
        isActive: true,
        hasActivity: true
      }
    ]);
  };
  return (
    <div className="App">
      <Tabs {...props} />
      <span>{text}</span>
      <button onClick={newTab}>new tab</button>
    </div>
  );
}

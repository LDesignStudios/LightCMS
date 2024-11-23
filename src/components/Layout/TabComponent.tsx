"use client";

import { useState } from "react";
import { IoFilterSharp } from "react-icons/io5";

interface Tab {
  label: string;
  visible: boolean;
  content: JSX.Element;
}

interface TabComponentProps {
  tabs: Tab[];
}

export function TabComponent({ tabs }: TabComponentProps) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    console.log("Active Tab Changed to:", tabs[index].label);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Tab container */}
      <div className="flex items-start font-medium gap-x-2">
        <div className="bg-neutral-100 rounded p-1 space-x-2 border border-black/10">
          {tabs.map(
            (tab, index) =>
              tab.visible && (
                <button
                  key={index}
                  onClick={() => handleTabChange(index)}
                  className={`px-3 py-1 rounded ${
                    activeTab === index
                      ? "bg-white text-black/80 border border-black/10"
                      : "bg-transparent text-neutral-500 border border-transparent"
                  }`}
                  style={{
                    width: "auto",
                    whiteSpace: "nowrap",
                  }}
                >
                  {tab.label}
                </button>
              )
          )}
        </div>
        <button className="flex flex-row items-center  h-full py-2 px-6 rounded-md bg-neutral-100 gap-x-2 border border-black/10">
              <IoFilterSharp/>
              Filter
          </button>
      </div>

      {/* Tab content */}
      <div className="mt-4 w-full">
        {tabs[activeTab]?.visible && tabs[activeTab]?.content}
      </div>
    </div>
  );
}

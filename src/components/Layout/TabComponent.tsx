"use client";

import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { IoFilterSharp } from "react-icons/io5";

interface Tab {
  label: string;
  visible: boolean;
  buttonLabel?: string,
  buttonLink?: string | null,
  buttonVisible?: boolean;
  content: JSX.Element;
}

interface TabComponentProps {
  tabs: Tab[];
  renderFilter?: boolean;
}

export function TabComponent({
  tabs,
  renderFilter,
}: TabComponentProps) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  const buttonClassName = "inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"


  return (
    <div className="flex flex-col w-full">
      {/* Tab container */}
      <div className="flex items-center justify-between font-medium gap-x-2">
        <div className="flex flex-row gap-x-2 items-center h-full">
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
          {renderFilter && (
            <button className="h-full w-auto px-2 rounded-md bg-neutral-100 text-black/80 text-sm border border-black/10 ">
              <span className="py-1 px-4  gap-x-2 flex flex-row items-center w-full">
                <IoFilterSharp />
                Filtr
              </span>
            </button>
          )}
        </div>

        { tabs[activeTab]?.buttonVisible && tabs[activeTab].buttonLink && (
          <div>
            <Link href={tabs[activeTab].buttonLink} className={clsx(buttonClassName)}>
              {tabs[activeTab].buttonLabel}
            </Link>
          </div>
        )}
      </div>

      {/* Tab content */}
      <div className="mt-4 w-full">
        {tabs[activeTab]?.visible && tabs[activeTab]?.content}
      </div>
    </div>
  );
}

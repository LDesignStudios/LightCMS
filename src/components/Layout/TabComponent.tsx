"use client";

import { useState } from "react";

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
            <div className="bg-gray-100 flex items-start p-[6px] rounded  font-medium">
                {tabs.map((tab, index) =>
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

            {/* Tab content */}
            <div className="mt-4 w-full">
                {tabs[activeTab]?.visible && tabs[activeTab]?.content}
            </div>
        </div>
    );
}

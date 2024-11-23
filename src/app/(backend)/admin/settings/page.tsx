import { TabComponent } from "@/components/Layout/TabComponent";

const canManageSystem = true;
const canManageSeo = true;
const canManageIntegrations = true;

export default function SettingsScreen() {
    const tabs = [
        { label: "User Profile", visible: true, content: "User Profile" },
        { label: "Interface", visible: true, content: "User Interface" },
        { label: "System Preferences", visible: true, content: "System Preferences" },
        { label: "SEO", visible: canManageSeo, content: "SEO Management" },
        { label: "System", visible: canManageSystem , content: "System" },
        { label: "Integrations", visible: canManageIntegrations , content: "Integrations"},
    ];


    return (
        <div className="">
          <div className="flex flex-col items-start">          
            <TabComponent tabs={tabs} />            
          </div>
        </div>
    );
}

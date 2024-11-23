import { TabComponent } from "@/components/Layout/TabComponent";

const canManageSystem = true;
const canManageSeo = true;
const canManageIntegrations = true;

export default function SettingsScreen() {
    const tabs = [
        { label: "User Profile", visible: true, content: "User" },
        { label: "Interface", visible: true },
        { label: "System Preferences", visible: true },
        { label: "SEO", visible: canManageSeo },
        { label: "System", visible: canManageSystem },
        { label: "Integrations", visible: canManageIntegrations },
    ];


    return (
        <div className="p-4">
          <div className="flex flex-col items-start">          
            <TabComponent tabs={tabs} />
            
          </div>
        </div>
    );
}

import { TabComponent } from "@/components/layout/TabComponent";
import { EditUserProfileForm } from "@/features/Auth/EditUserForm";
import CollectionsSettingsForm from "@/features/Content/Settings/CollectionsForm";
import System from "@/features/Content/Settings/System";
import { getUser } from "@/utils/getUser";

const canManageInterface = false;
const canManageSystem = true;
const canManageSeo = false;
const canManageIntegrations = false;
const canManageCollections = true;

export default async function SettingsScreen() {
  const user = await getUser();

  const tabs = [
    {
      label: "User Profile",
      visible: true,
      content: (
        <div>
          <EditUserProfileForm user={user} />
        </div>
      ),
    },
    { label: "Interface", visible: canManageInterface, content: <></> },
    {
      label: "System Preferences",
      visible: canManageInterface,
      content: <></>,
    },
    { label: "SEO", visible: canManageSeo, content: <></> },
    {
      label: "System",
      visible: canManageSystem,
      content: (
        <>          
          <System />
        </>
      ),
    },
    {
      label: "Integrations",
      visible: canManageIntegrations,
      content: <></>,
    },
    {
      label: "Collections",
      visible: canManageCollections,
      content: (
        <div>
          <CollectionsSettingsForm />
        </div>
      ),
    },
    { label: "Plugins", visible: canManageIntegrations, content: <></> },
  ];

  return (
    <div className="">
      <div className="flex flex-col items-start">
        <TabComponent tabs={tabs} />
      </div>
    </div>
  );
}

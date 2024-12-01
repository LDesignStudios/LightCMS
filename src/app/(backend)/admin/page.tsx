import Container from "@/components/UI/container";
import { FaFileAlt } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import { StatCard } from "@/components/common/cards/StatCard";
import { FaUsers } from "react-icons/fa";
import { RecentActivityTable } from "@/components/layout/RecentActivityTable";
import WelcomeMessage from "@/components/common/header/WelcomeMessage";
import data from "@/translations/cz/cz.json";

export default function Admin() {
  const activities = [
    { id: 1, user: "JohnDoe", action: "Created a new post", timestamp: "2024-11-30 14:00" },
    { id: 2, user: "JaneDoe", action: "Commented on a post", timestamp: "2024-11-30 13:45" },
    { id: 3, user: "Admin123", action: "Updated user profile", timestamp: "2024-11-30 13:30" },
    { id: 4, user: "Alice", action: "Uploaded a file", timestamp: "2024-11-30 12:50" },
  ];

  return (
    <Container>      
      <WelcomeMessage message={data.dashboard.welcomeMessage}/>
      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value={232} icon={FaUsers} />
        <StatCard title="Total Comments" value={22223} icon={FaComments} />
        <StatCard title="Total Posts" value={194} icon={FaFileAlt} />
        <StatCard title="Total Collections" value={52681} icon={FaFileAlt} />
      </div>
      
      <h2 className="text-2xl font-bold mb-4 mt-8">Recent Activity</h2>
      <RecentActivityTable activities={activities} />
    </Container>
  );
}

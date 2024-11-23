import Link from "next/link";
import data from '@/translations/cz/cz.json'; 
import GetCurrentUser from "@/components/GetCurrentUser";
import Container from "@/components/UI/container";
import Heading from "@/components/UI/heading";

export default function Admin() {

  return (
      <Container className="p-8 bg-gray-100 rounded-lg shadow-md">
        <Heading className="text-3xl mb-6 text-center flex flex-row">
          {data.dashboard.welcomeMessage} 👋, <GetCurrentUser/>
        </Heading>

        <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Dashboard Items */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">Total Users</h2>
            <p className="text-2xl">150</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">Total Posts</h2>
            <p className="text-2xl">75</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">Total Comments</h2>
            <p className="text-2xl">300</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">Pending Reviews</h2>
            <p className="text-2xl">5</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">Recent Activities</h2>
            <ul>
              <li>User JohnDoe commented on a post.</li>
              <li>User JaneDoe created a new post.</li>
              <li>User Admin123 updated their profile.</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">Quick Links</h2>
            <ul>
              <li><Link href="/admin/user-profile">User Profile</Link></li>
              <li><Link href="/admin/posts">Manage Posts</Link></li>
              <li><Link href="/admin/comments">View Comments</Link></li>
              <li><Link href="/admin/pages">Manage Pages</Link></li>
            </ul>
          </div>
        </Container>
      </Container>
  );
}
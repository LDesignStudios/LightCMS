import { LikeButton } from "@/features/Content/Posts/Likes/LikeButton";
import { getPublishedPosts } from "@/features/Content/Posts/Posts/actions";
import { getSession } from "@/lib/sessions";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { HiChat } from "react-icons/hi";

type PublishedPost = {
  id: string;
  title: string;
  content: string;
  slug: string;
  imagePath: string | null;
  createdAt: Date;
  author: {
    name: string | null;
    email: string;
  };
  commentCount: number;
  likeCount: number;
  isLiked: boolean;  
};

export default async function Home() {
  const posts = await getPublishedPosts();
  const session = await getSession();

  const featuredPost = posts[0];
  const trendingPosts = posts.slice(1, 4);
  const latestPosts = posts.slice(4);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      {featuredPost && (
        <header className="bg-indigo-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-6">Welcome to Our Blog</h1>
            <p className="text-lg mb-8">
              Stay updated with the latest trends, insights, and stories.
            </p>
            <article className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Link href={`/posts/${featuredPost.slug}`}>
                <Image
                  src={featuredPost.imagePath || "/placeholder.webp"}
                  alt={featuredPost.title}
                  width={1200}
                  height={600}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 mt-3 line-clamp-3">
                    {featuredPost.content}
                  </p>
                  <div className="flex items-center mt-4 text-sm text-gray-500">
                    <span>{featuredPost.author.name || "Anonymous"}</span>
                    <span className="mx-2">•</span>
                    <span>
                      {formatDistanceToNow(new Date(featuredPost.createdAt))}{" "}
                      ago
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Trending Posts */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Trending</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {trendingPosts.map((post) => (
              <PostCard post={post} session={session} key={post.id} />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Latest Posts</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <PostCard post={post} session={session} key={post.id} />
            ))}
          </div>
        </section>
        
        <div className="text-center">
          <Link href="/posts">
            <button className="px-6 py-3 bg-indigo-600 text-white text-lg rounded-lg shadow-lg hover:bg-indigo-700">
              View All Posts
            </button>
          </Link>
        </div>

        <Link href="/admin" className="text-sm px-2 py-1 rounded-md bg-gradient-to-br from-rose-400 via-purple-400 to-blue-400 text-white fixed bottom-2 right-2"> Admin </Link>
      </main>
    </div>
  );
}

// PostCard Component
function PostCard({
  post,
  session,
}: {
  post: PublishedPost;
  session: any;
}) {
  return (
    <article className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition duration-300">
      <Link href={`/posts/${post.slug}`}>
        <Image
          src={post.imagePath || "/placeholder.webp"}
          alt={`${post.title} thumbnail`}
          width={400}
          height={250}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-indigo-600 font-semibold">
              {post.author.name || "Anonymous"}
            </span>
            <div className="flex items-center gap-4">
              <div className="flex items-center text-gray-500">
                <HiChat className="w-4 h-4 mr-1" />
                <span className="text-sm">{post.commentCount}</span>
              </div>
              <LikeButton
                postId={post.id}
                initialLikeCount={post.likeCount}
                initialIsLiked={post.isLiked}
                isLoggedIn={!!session}
              />
            </div>
          </div>
          <h3 className="text-lg font-bold text-gray-900">{post.title}</h3>
          <p className="text-gray-600 mt-2 line-clamp-3">{post.content}</p>
        </div>
      </Link>
    </article>
  );
}

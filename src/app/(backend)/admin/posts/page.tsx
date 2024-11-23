import { getPosts } from "@/features/Content/Posts/Posts/actions";
import { PostsList } from "@/features/Content/Posts/Posts/PostsList";
import { Suspense } from "react";
import data from "@/translations/cz/cz.json";
import PageHeader from "@/components/Layout/PageHeader";
import { TabComponent } from "@/components/Layout/TabComponent";

export default async function PostsPage() {
  const posts = await getPosts();

  const tabs = [
    { 
      label: "All posts",
      visible: true,
      content: (
        <Suspense fallback={<div>{data.loading.loading}</div>}>
          <PostsList filter="all" initialPosts={posts} />
        </Suspense>
      )
    },
    { label: "Published", visible: true, content: (
      <Suspense fallback={<div>{data.loading.loading}</div>}>
        <PostsList filter="published" initialPosts={posts} />
      </Suspense>
    ) },
    { label: "Drafts", visible: true, content: (
      <Suspense fallback={<div>{data.loading.loading}</div>}>
        <PostsList filter="drafts" initialPosts={posts} />
      </Suspense>
    ) },
];

  return (
    <div className="p-8 min-h-screen">
      <div className="mx-auto space-y-8">      
        <PageHeader
          title={data.posts.title}
          buttonLabel={`${data.buttons.add} ${data.buttons.new.toLowerCase()}`}
          buttonLink="/admin/posts/add-new"
        />
        
        <div className="flex">
          <TabComponent tabs={tabs} />
        </div>               
      </div>
    </div>
  );
}
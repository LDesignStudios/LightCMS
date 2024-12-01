import { getPosts } from "@/features/Content/Posts/Posts/actions";
import { PostsList } from "@/features/Content/Posts/Posts/PostsList";
import { Suspense } from "react";
import data from "@/translations/cz/cz.json";
import { TabComponent } from "@/components/layout/TabComponent";
import { CommentsList } from "@/features/Content/Posts/Comments/CommentsList";
import { LikesList } from "@/features/Content/Posts/Likes/LikesList";
import { getUser } from "@/utils/getUser";

export default async function PostsPage() {
  const posts = await getPosts();
  const user = await getUser();

  const tabs = [
    {
      label: data.posts.allPosts,
      visible: true,
      buttonLabel: data.buttons.add,
      buttonLink: "/admin/posts/add-new",
      buttonVisible: true,
      content: (
        <Suspense fallback={<div>{data.loading.loading}</div>}>
          <PostsList filter="all" initialPosts={posts} />
        </Suspense>
      ),
    },
    {
      label: data.posts.published,
      visible: true,
      buttonLabel: data.buttons.add,
      buttonLink: "/admin/posts/add-new",
      buttonVisible: true,
      content: (
        <Suspense fallback={<div>{data.loading.loading}</div>}>
          <PostsList filter="published" initialPosts={posts} />
        </Suspense>
      ),
    },
    {
      label: data.posts.drafts,
      visible: true,
      buttonLabel: data.buttons.add,
      buttonLink: "/admin/posts/add-new",
      buttonVisible: true,
      content: (
        <Suspense fallback={<div>{data.loading.loading}</div>}>
          <PostsList filter="drafts" initialPosts={posts} />
        </Suspense>
      ),
    },
    {
      label: data.posts.comments.title,
      visible: true,
      buttonLabel: data.buttons.add,
      buttonLink: null,
      buttonVisible: false,
      content: (
        <Suspense fallback={<div>{data.loading.loading}</div>}>
          <CommentsList authorId={user.id} />
        </Suspense>
      ),
    },
    {
      label: data.posts.likes.title,
      visible: true,
      buttonLabel: data.buttons.add,
      buttonLink: null,
      buttonVisible: false,
      content: (
        <Suspense fallback={<div>{data.loading.loading}</div>}>
          <LikesList authorId={user.id} />
        </Suspense>
      ),
    },
    {
      label: data.posts.categories.title,
      visible: true,
      buttonLabel: data.buttons.add,
      buttonLink: "/admin/posts/new-category",
      buttonVisible: true,
      content: (
        <Suspense fallback={<div>{data.loading.loading}</div>}>
          <LikesList authorId={user.id} />
        </Suspense>
      ),
    },
  ];

  return (
    <div className="flex">
      <TabComponent
        tabs={tabs}
        renderFilter={true}                    
      />
    </div>
  );
}

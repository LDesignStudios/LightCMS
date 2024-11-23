import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
        <h1 className="text-4xl font-bold"> LightCMS </h1>
        <div className="gap-x-4 flex flex-row absolute top-4 left-4">
            <Link href="/admin" className="p-2 bg-blue-400 text-white">
              Admin
            </Link>   

           <Link href="/posts" className="p-2 bg-blue-400 text-white">
              Posts
            </Link>                     
        </div>
    </div>
  );
}

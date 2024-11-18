import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
        <h1 className="text-4xl font-bold"> Portfolio v3 </h1>
        <div className="absolute top-4 left-4 p-2 bg-blue-400 text-white">
            <Link href="/admin">
              Admin
            </Link>          
        </div>
    </div>
  );
}

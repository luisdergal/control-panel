import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <Image
        src="/archi.jpg"
        alt="Archi"
        width={450} 
        height={450} 
        className="rounded-lg shadow-lg"
      />
      <h1 className="text-3xl font-bold mt-4">Control Panel</h1>
    </main>
  );
}
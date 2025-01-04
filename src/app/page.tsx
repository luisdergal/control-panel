
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <img
        src="/archi.jpg"
        alt="archi"
        width={450} 
        height={450} 
        className="rounded-lg shadow-lg"
      />
      <h1 className="text-3xl font-bold mt-4">Control Panel</h1>
      <h2> I&apos;m Building this site on my free time, so there is no hurry to finish it soon, but I really enjoy to work on this. </h2>
    </main>
  );
}
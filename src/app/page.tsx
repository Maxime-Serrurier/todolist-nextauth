import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex flex-col justify-center min-h-screen px-4 gap-y-4'>
      <Link
        className='self-center py-2 bg-gradient-to-l from-[#f4742f] to-[#FE4A14] rounded-xl px-4 text-[#FFF] hover:opacity-90'
        href='/connexion'
      >
        Connexion
      </Link>
      <Link
        className='self-center py-2 bg-gradient-to-l from-[#612be9] to-[#510094] rounded-xl px-4 text-[#FFF] hover:opacity-90'
        href='/inscription'
      >
        Inscription
      </Link>
    </main>
  );
}

import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

const page = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return (
      <div className='h-screen flex flex-col justify-center items-center'>
        <h2 className='text-2xl capitalize'>
          Bienvenue {session?.user.pseudo}
        </h2>
      </div>
    );
  }
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <h2 className='text-2xl'>
        Connectez-vous pour voir cette page !
      </h2>
    </div>
  );
};

export default page;

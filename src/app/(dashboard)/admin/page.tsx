import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

const page = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return (
      <div className='h-screen flex flex-col justify-center items-center'>
        <h2 className='text-2xl'>
          Welcome to admin {session?.user.pseudo}
        </h2>
      </div>
    );
  }
  return (
    <h2 className='text-2xl'>Please login to see this admin page</h2>
  );
};

export default page;

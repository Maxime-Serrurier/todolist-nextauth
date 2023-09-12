import CreateNewTask from '@/components/CreateNewTask';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

const page = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return (
      <div className='max-h-screen min-h-screen p-8'>
        <div className='grid grid-cols-4 gap-4'>
          <CreateNewTask />
          <CreateNewTask />
          <CreateNewTask />
          <CreateNewTask />
          <CreateNewTask />
        </div>
      </div>
    );
  }
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h2 className='text-2xl'>
        Connectez-vous pour voir cette page !
      </h2>
    </div>
  );
};

export default page;

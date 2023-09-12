// Libraries
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { Button, buttonVariants } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { PlusCircledIcon } from '@radix-ui/react-icons';

const CreateNewTask = async () => {
  const session = await getServerSession(authOptions);
  return (
    <Card className='rounded-xl bg-[#151A30] border-none text-[#FFF] flex'>
      <div className='items-center h-full'>
        <CardHeader className='pb-2'>
          <CardTitle>Bonjour {session?.user?.pseudo} !</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col'>
            <div className='pb-4'>
              Qu&apos;allons nous faire aujourd&apos;hui ?
            </div>
            <Link
              href='#'
              className='flex items-center gap-x-2 py-0.5 text-sm bg-gradient-to-l from-[#f4742f] to-[#FE4A14] rounded-xl px-4 text-[#FFF] hover:opacity-90 self-start'
            >
              Créer une liste
              <PlusCircledIcon />
            </Link>
          </div>
        </CardContent>
      </div>

      <Image
        width={200}
        height={200}
        alt='astronaute bienvenue'
        src='/assets/welcome.png'
      />
    </Card>
  );
};

export default CreateNewTask;

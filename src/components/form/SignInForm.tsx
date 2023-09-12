'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const FormSchema = z.object({
  email: z
    .string()
    .min(1, "L'Adresse email est requise")
    .email('Email invalide'),
  password: z
    .string()
    .min(1, 'Le mot de passe est requis')
    .min(8, 'Le mot de passe doit contenir 8 caractères minimum'),
});
const SignInForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    console.log(values);
    const signInData = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (signInData?.error) {
      console.log(signInData.error);
    } else {
      router.refresh();
      router.push('/dashboard');
    }
  };

  return (
    <div className='flex flex-col justify-center h-screen'>
      <div className='min-w-[300px] max-w-[500px] md:max-w-[500px] md:min-w-[500px] mx-auto max-h-[95vh] shadow-2xl bg-[#151A30] rounded-xl font-semibold'>
        <h1 className='pt-4 text-4xl text-center text-white lg:text-6xl'>
          Connexion
        </h1>
        <div className='h-full p-8'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-8'
            >
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='mail@exemple.com'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='text-center' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='********'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='text-center' />
                  </FormItem>
                )}
              />
              <Button
                className='self-end py-2 bg-gradient-to-l from-[#f4742f] to-[#FE4A14] rounded-xl px-4 text-[#FFF] hover:opacity-90'
                type='submit'
              >
                Je me connecte !
              </Button>
            </form>
          </Form>
          <p className='mt-4 text-sm text-center text-gray-600'>
            Vous n&apos;avez pas encore de compte ?&nbsp;
            <Link
              className='text-blue-500 hover:underline'
              href='/inscription'
            >
              Inscrivez-vous !
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;

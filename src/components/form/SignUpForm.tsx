'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';

import { useRouter } from 'next/navigation';

const FormSchema = z
  .object({
    pseudo: z.string().min(1, 'Pseudo is required').max(100),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
    confirmPassword: z
      .string()
      .min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password do not match',
  });

const SignUpForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pseudo: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pseudo: values.pseudo,
        email: values.email,
        password: values.password,
      }),
    });

    if (response.ok) {
      router.push('/connexion');
    } else {
      console.log(response);
    }
  };
  return (
    <div className='h-screen flex flex-col justify-center'>
      <div className='min-w-[300px] max-w-[500px] md:max-w-[500px] md:min-w-[500px] mx-auto max-h-[95vh] shadow-2xl bg-[#151A30] rounded-xl font-semibold'>
        <h1 className='pt-4 text-4xl lg:text-6xl text-center text-white'>
          Inscription
        </h1>
        <div className='p-8 h-full'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='w-full flex flex-col gap-y-4'
            >
              <div className='space-y-4'>
                <FormField
                  control={form.control}
                  name='pseudo'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pseudo</FormLabel>
                      <FormControl>
                        <Input placeholder='Pseudo' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='mail@example.com'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
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
                          placeholder='Mot de passe'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='confirmPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Confirmation du mot de passe
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Confirmation du mot de passe'
                          type='password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                className='self-end py-2 bg-gradient-to-l from-[#f4742f] to-[#FE4A14] rounded-xl px-4 text-[#FFF] hover:opacity-90'
                type='submit'
              >
                Je m&apos;inscris !
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;

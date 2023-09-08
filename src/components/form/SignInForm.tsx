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
import { Button, buttonVariants } from '../ui/button';
import { useForm } from 'react-hook-form';

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
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log(values);
    // const signInData = await signIn('credentials', {
    //   email: values.email,
    //   password: values.password,
    //   redirect: false,
    // });
    // if (signInData?.error) {
    //   console.log(signInData.error)
    // } else {
    //   router.refresh();
    //   // router.push('/admin');
    // }
  };

  return (
    <div className='h-screen flex flex-col justify-center'>
      <div className='min-w-[300px] max-w-[500px] md:max-w-[500px] md:min-w-[500px] mx-auto max-h-[95vh] shadow-2xl bg-[#151A30] rounded-xl font-semibold'>
        <h1 className='pt-4 text-4xl lg:text-6xl text-center text-white'>
          Connexion
        </h1>
        <div className='p-8 h-full'>
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
                      <Input placeholder='********' {...field} />
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
        </div>
      </div>
    </div>
  );
};

export default SignInForm;

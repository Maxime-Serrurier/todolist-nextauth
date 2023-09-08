// Libraries
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import * as z from 'zod';

// Define a schema for input validation
const userSchema = z.object({
  pseudo: z.string().min(1, 'Pseudo is required').max(100),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have than 8 characters'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, pseudo, password } = userSchema.parse(body);

    // check if email already exists
    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        {
          user: null,
          message: 'Cet email est déjà utilisée',
        },
        { status: 409 }
      );
    }

    // check if pseudo already exists
    const existingUserByPseudo = await db.user.findUnique({
      where: { pseudo: pseudo },
    });
    if (existingUserByPseudo) {
      return NextResponse.json(
        {
          user: null,
          message: 'Ce pseudo est déjà utilisé',
        },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        pseudo,
        email,
        password: hashedPassword,
      },
    });
    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      {
        user: rest,
        message: 'User created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Something went wrong!',
      },
      { status: 500 }
    );
  }
}

import { z } from 'zod';

export const visitorSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be under 100 characters')
    .regex(/^[A-Za-z ]+$/, 'Name can only contain letters and spaces'),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
  purpose: z.string().min(1, 'Purpose is required'),
  visit_date: z.string().min(1, 'Visit date is required'),
  status: z.enum(['pending', 'approved', 'rejected']),
  host_name: z
    .string()
    .trim()
    .min(2, 'Host name is required')
    .max(100, 'Host name must be under 100 characters')
    .regex(/^[A-Za-z ]+$/, 'Host name can only contain letters and spaces'),
  notes: z.string().max(500, 'Notes must be under 500 characters').optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type VisitorSchemaType = z.infer<typeof visitorSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;

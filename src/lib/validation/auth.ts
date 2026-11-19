import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

export const registerSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  fullName: z.string().min(2, "Le nom complet doit contenir au moins 2 caractères"),
  organizationName: z.string().min(2, "Le nom de l'entreprise doit contenir au moins 2 caractères"),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "Vous devez accepter les CGU et la politique de confidentialité" }),
  }),
});

export const resetPasswordSchema = z.object({
  email: z.string().email("Adresse email invalide"),
});

export const updatePasswordSchema = z
  .object({
    password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les deux mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

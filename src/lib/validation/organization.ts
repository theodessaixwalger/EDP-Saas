import { z } from "zod";

export const createOrganizationSchema = z.object({
  name: z.string().min(2, "Le nom de l'organisation doit contenir au moins 2 caractères").max(80),
  slug: z
    .string()
    .min(2)
    .max(80)
    .regex(/^[a-z0-9-]+$/, "Le slug ne doit contenir que des lettres minuscules, chiffres et tirets"),
  billingEmail: z.string().email("Adresse email de facturation invalide").optional().or(z.literal("")),
});

export const updateOrganizationSchema = z.object({
  name: z.string().min(2).max(80).optional(),
  billingEmail: z.string().email().optional().or(z.literal("")),
});

export const inviteMemberSchema = z.object({
  email: z.string().email("Adresse email du membre invalide"),
  role: z.enum(["owner", "manager", "staff"], {
    errorMap: () => ({ message: "Rôle invalide" }),
  }),
  establishmentId: z.string().uuid("ID d'établissement invalide").optional().nullable(),
});

export type CreateOrganizationInput = z.infer<typeof createOrganizationSchema>;
export type UpdateOrganizationInput = z.infer<typeof updateOrganizationSchema>;
export type InviteMemberInput = z.infer<typeof inviteMemberSchema>;

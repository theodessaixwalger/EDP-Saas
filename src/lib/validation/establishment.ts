import { z } from "zod";

export const createEstablishmentSchema = z.object({
  organizationId: z.string().uuid("ID d'organisation invalide"),
  categoryId: z.string().uuid("Secteur d'activité requis"),
  name: z.string().min(2, "Le nom du commerce doit contenir au moins 2 caractères").max(100),
  slug: z
    .string()
    .min(2)
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Le slug ne doit contenir que des minuscules et tirets"),
  address: z.string().min(3, "L'adresse est requise"),
  city: z.string().min(2, "La ville est requise"),
  postalCode: z.string().min(4, "Le code postal est requis").max(10),
  phone: z.string().optional().or(z.literal("")),
  email: z.string().email("Email invalide").optional().or(z.literal("")),
  websiteUrl: z.string().url("URL de site web invalide").optional().or(z.literal("")),
});

export const updateEstablishmentSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  categoryId: z.string().uuid().optional(),
  address: z.string().min(3).optional(),
  city: z.string().min(2).optional(),
  postalCode: z.string().min(4).max(10).optional(),
  phone: z.string().optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
  websiteUrl: z.string().url().optional().or(z.literal("")),
  isActive: z.boolean().optional(),
});

export const updateModuleSettingsSchema = z.object({
  moduleKey: z.string().min(2),
  isEnabled: z.boolean(),
  config: z.record(z.unknown()).default({}),
});

export type CreateEstablishmentInput = z.infer<typeof createEstablishmentSchema>;
export type UpdateEstablishmentInput = z.infer<typeof updateEstablishmentSchema>;
export type UpdateModuleSettingsInput = z.infer<typeof updateModuleSettingsSchema>;

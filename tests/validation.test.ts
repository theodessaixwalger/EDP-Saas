import { describe, it, expect } from "vitest";
import { loginSchema, registerSchema } from "../src/lib/validation/auth";
import { createOrganizationSchema } from "../src/lib/validation/organization";
import { createEstablishmentSchema } from "../src/lib/validation/establishment";

describe("Validation Schemas (Zod)", () => {
  describe("Auth Validation", () => {
    it("validates valid login input", () => {
      const result = loginSchema.safeParse({
        email: "commercant@test.fr",
        password: "securepassword123",
      });
      expect(result.success).toBe(true);
    });

    it("rejects invalid email or short password", () => {
      const invalidEmail = loginSchema.safeParse({
        email: "not-an-email",
        password: "securepassword123",
      });
      expect(invalidEmail.success).toBe(false);

      const shortPassword = loginSchema.safeParse({
        email: "commercant@test.fr",
        password: "short",
      });
      expect(shortPassword.success).toBe(false);
    });

    it("requires explicit acceptance of terms on register", () => {
      const withoutTerms = registerSchema.safeParse({
        email: "commercant@test.fr",
        password: "securepassword123",
        fullName: "Jean Dupont",
        organizationName: "Boulangerie Dupont",
        acceptTerms: false,
      });
      expect(withoutTerms.success).toBe(false);

      const withTerms = registerSchema.safeParse({
        email: "commercant@test.fr",
        password: "securepassword123",
        fullName: "Jean Dupont",
        organizationName: "Boulangerie Dupont",
        acceptTerms: true,
      });
      expect(withTerms.success).toBe(true);
    });
  });

  describe("Organization & Establishment Validation", () => {
    it("validates organization creation with clean slug", () => {
      const valid = createOrganizationSchema.safeParse({
        name: "Boulangerie du Marché",
        slug: "boulangerie-du-marche",
        billingEmail: "contact@marche.fr",
      });
      expect(valid.success).toBe(true);

      const invalidSlug = createOrganizationSchema.safeParse({
        name: "Boulangerie du Marché",
        slug: "Boulangerie Du Marché!",
      });
      expect(invalidSlug.success).toBe(false);
    });

    it("validates establishment creation with postal code, city and organizationId", () => {
      const valid = createEstablishmentSchema.safeParse({
        organizationId: "123e4567-e89b-12d3-a456-426614174000",
        categoryId: "123e4567-e89b-12d3-a456-426614174001",
        name: "Boulangerie — Centre",
        slug: "boulangerie-centre",
        address: "10 Rue de la République",
        city: "Lyon",
        postalCode: "69002",
      });
      expect(valid.success).toBe(true);
    });
  });
});

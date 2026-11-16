import { describe, it, expect } from "vitest";
import {
  evaluateSetupRules,
  onboardingSteps,
  type SetupSignals,
} from "@/features/marketing-actions/setup-rules";

const base: SetupSignals = {
  establishmentsCount: 0,
  googleBusinessConnected: false,
  loyaltyProgramConfigured: false,
  brevoConfigured: false,
  subscriptionActive: false,
};

describe("evaluateSetupRules (Module 4 — règles de mise en route)", () => {
  it("ne recommande que la création d'établissement pour un compte neuf", () => {
    const actions = evaluateSetupRules(base);
    expect(actions.map((a) => a.code)).toEqual(["INIT_ESTABLISHMENT_SETUP"]);
  });

  it("enchaîne Google, fidélité puis emails une fois l'établissement créé", () => {
    const actions = evaluateSetupRules({ ...base, establishmentsCount: 1 });
    expect(actions.map((a) => a.code)).toEqual([
      "CONNECT_GOOGLE_BUSINESS",
      "SETUP_LOYALTY_PROGRAM",
      "CONFIGURE_EMAIL_SENDER",
    ]);
  });

  it("ne renvoie plus rien quand toutes les conditions sont remplies", () => {
    const actions = evaluateSetupRules({
      establishmentsCount: 2,
      googleBusinessConnected: true,
      loyaltyProgramConfigured: true,
      brevoConfigured: true,
      subscriptionActive: true,
    });
    expect(actions).toEqual([]);
  });

  it("est déterministe : mêmes signaux, même résultat", () => {
    const signals = { ...base, establishmentsCount: 1, brevoConfigured: true };
    expect(evaluateSetupRules(signals)).toEqual(evaluateSetupRules(signals));
  });
});

describe("onboardingSteps", () => {
  it("compte 1 étape sur 5 pour un compte neuf", () => {
    const steps = onboardingSteps(base);
    expect(steps).toHaveLength(5);
    expect(steps.filter((s) => s.done)).toHaveLength(1);
  });

  it("valide l'étape établissement dès le premier point de vente", () => {
    const steps = onboardingSteps({ ...base, establishmentsCount: 1 });
    expect(steps.find((s) => s.label === "Premier établissement")?.done).toBe(true);
  });
});

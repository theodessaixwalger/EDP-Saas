import { describe, it, expect } from "vitest";

// Pure deterministic functions to test
function calculateLoyaltyPoints(
  mode: "spend" | "visit",
  input: { amountEuros?: number; visitCount?: number }
): number {
  if (mode === "spend") {
    // 1 Euro = 1 point, rounded down
    return Math.floor(input.amountEuros || 0);
  } else if (mode === "visit") {
    // 1 Visit = 10 points
    return (input.visitCount || 1) * 10;
  }
  return 0;
}

function evaluateInactivityRule(lastPurchaseDate: Date, thresholdDays: number = 30): boolean {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - lastPurchaseDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays >= thresholdDays;
}

function calculateDeterministicDiagnosticScore(criteria: {
  hasVerifiedGbp: boolean;
  hasHoursFilled: boolean;
  gbpRating: number;
  gbpReplyRatePercent: number;
  mobilePerformanceScore: number; // 0 to 100
}): number {
  let score = 0;

  // Google Business Profile (max 50 points)
  if (criteria.hasVerifiedGbp) score += 15;
  if (criteria.hasHoursFilled) score += 10;
  if (criteria.gbpRating >= 4.5) score += 15;
  else if (criteria.gbpRating >= 4.0) score += 10;
  if (criteria.gbpReplyRatePercent >= 80) score += 10;

  // Website Performance (max 50 points)
  score += Math.round((criteria.mobilePerformanceScore / 100) * 50);

  return Math.min(100, Math.max(0, score));
}

describe("Deterministic Business Engine (Zero LLM / 100% Deterministic)", () => {
  describe("Loyalty Points Calculation", () => {
    it("calculates exact points on spend mode (1€ = 1pt)", () => {
      expect(calculateLoyaltyPoints("spend", { amountEuros: 14.85 })).toBe(14);
      expect(calculateLoyaltyPoints("spend", { amountEuros: 0.99 })).toBe(0);
      expect(calculateLoyaltyPoints("spend", { amountEuros: 100 })).toBe(100);
    });

    it("calculates exact points on visit mode (1 visit = 10pts)", () => {
      expect(calculateLoyaltyPoints("visit", { visitCount: 1 })).toBe(10);
      expect(calculateLoyaltyPoints("visit", { visitCount: 3 })).toBe(30);
    });
  });

  describe("Inactivity Trigger Rule", () => {
    it("triggers re-engagement recommendation when customer is inactive >= 30 days", () => {
      const thirtyFiveDaysAgo = new Date();
      thirtyFiveDaysAgo.setDate(thirtyFiveDaysAgo.getDate() - 35);
      expect(evaluateInactivityRule(thirtyFiveDaysAgo, 30)).toBe(true);

      const tenDaysAgo = new Date();
      tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
      expect(evaluateInactivityRule(tenDaysAgo, 30)).toBe(false);
    });
  });

  describe("Diagnostic Score Calculation", () => {
    it("computes deterministic score out of 100 based on exact criteria", () => {
      const score = calculateDeterministicDiagnosticScore({
        hasVerifiedGbp: true, // 15
        hasHoursFilled: true, // 10
        gbpRating: 4.8, // 15
        gbpReplyRatePercent: 95, // 10
        mobilePerformanceScore: 80, // 40
      });
      expect(score).toBe(90);
    });

    it("handles lower performance deterministically without hallucination", () => {
      const score = calculateDeterministicDiagnosticScore({
        hasVerifiedGbp: true, // 15
        hasHoursFilled: false, // 0
        gbpRating: 3.8, // 0
        gbpReplyRatePercent: 40, // 0
        mobilePerformanceScore: 50, // 25
      });
      expect(score).toBe(40);
    });
  });
});

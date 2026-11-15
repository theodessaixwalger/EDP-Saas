import { describe, it, expect } from "vitest";
import {
  hasPermission,
  canManageOrganization,
  canManageBilling,
  canManageEstablishment,
  canManageCampaigns,
  canValidateLoyalty,
} from "../src/lib/permissions/rbac";

describe("RBAC Permissions & Tenant Security", () => {
  it("allows owner to manage organization, billing, establishments and loyalty", () => {
    expect(hasPermission("owner", "org:manage")).toBe(true);
    expect(hasPermission("owner", "org:billing")).toBe(true);
    expect(canManageOrganization("owner")).toBe(true);
    expect(canManageBilling("owner")).toBe(true);
    expect(canManageEstablishment("owner")).toBe(true);
    expect(canManageCampaigns("owner")).toBe(true);
    expect(canValidateLoyalty("owner")).toBe(true);
  });

  it("restricts manager from managing organization or billing, but allows campaigns and loyalty", () => {
    expect(hasPermission("manager", "org:manage")).toBe(false);
    expect(hasPermission("manager", "org:billing")).toBe(false);
    expect(canManageOrganization("manager")).toBe(false);
    expect(canManageBilling("manager")).toBe(false);
    expect(canManageEstablishment("manager")).toBe(true);
    expect(canManageCampaigns("manager")).toBe(true);
    expect(canValidateLoyalty("manager")).toBe(true);
  });

  it("strictly limits staff role to loyalty operations only (caisse / scanner)", () => {
    expect(hasPermission("staff", "org:manage")).toBe(false);
    expect(hasPermission("staff", "org:billing")).toBe(false);
    expect(hasPermission("staff", "establishment:update")).toBe(false);
    expect(hasPermission("staff", "campaigns:manage")).toBe(false);
    expect(hasPermission("staff", "content:create")).toBe(false);
    expect(hasPermission("staff", "loyalty:scan")).toBe(true);
    expect(hasPermission("staff", "loyalty:reward_redeem")).toBe(true);
    expect(canValidateLoyalty("staff")).toBe(true);
  });

  it("denies all permissions when role is null or undefined", () => {
    expect(hasPermission(null, "loyalty:scan")).toBe(false);
    expect(hasPermission(undefined, "loyalty:scan")).toBe(false);
    expect(canManageOrganization(null)).toBe(false);
  });
});

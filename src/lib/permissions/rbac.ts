import { UserRole, Permission } from "@/types";

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  super_admin: [
    "org:manage",
    "org:billing",
    "org:members",
    "establishment:create",
    "establishment:update",
    "establishment:delete",
    "establishment:settings",
    "content:create",
    "content:publish",
    "content:delete",
    "campaigns:manage",
    "loyalty:scan",
    "loyalty:reward_redeem",
    "loyalty:settings",
    "analytics:view",
    "reviews:reply",
    "audit:view",
  ],
  owner: [
    "org:manage",
    "org:billing",
    "org:members",
    "establishment:create",
    "establishment:update",
    "establishment:delete",
    "establishment:settings",
    "content:create",
    "content:publish",
    "content:delete",
    "campaigns:manage",
    "loyalty:scan",
    "loyalty:reward_redeem",
    "loyalty:settings",
    "analytics:view",
    "reviews:reply",
    "audit:view",
  ],
  manager: [
    "establishment:update",
    "establishment:settings",
    "content:create",
    "content:publish",
    "campaigns:manage",
    "loyalty:scan",
    "loyalty:reward_redeem",
    "loyalty:settings",
    "analytics:view",
    "reviews:reply",
  ],
  staff: [
    "loyalty:scan",
    "loyalty:reward_redeem",
  ],
};

export function hasPermission(role: UserRole | null | undefined, permission: Permission): boolean {
  if (!role) return false;
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
}

export function canManageOrganization(role: UserRole | null | undefined): boolean {
  return hasPermission(role, "org:manage");
}

export function canManageBilling(role: UserRole | null | undefined): boolean {
  return hasPermission(role, "org:billing");
}

export function canManageEstablishment(role: UserRole | null | undefined): boolean {
  return hasPermission(role, "establishment:update");
}

export function canManageCampaigns(role: UserRole | null | undefined): boolean {
  return hasPermission(role, "campaigns:manage");
}

export function canValidateLoyalty(role: UserRole | null | undefined): boolean {
  return hasPermission(role, "loyalty:scan");
}

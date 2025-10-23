# Migration Script - Schema Upgrade

## Overview
This migration upgrades from single-tenant to multi-tenant architecture.

## Steps

1. **Backup Database** (IMPORTANT!)
```bash
docker exec america-cannabis-db pg_dump -U postgres america_cannabis > backup.sql
```

2. **Apply Migration**
```bash
npx prisma db push
```

3. **Run Seed** (creates default tenant and migrates existing data)
```bash
npx prisma db seed
```

## What Changes

### Added Tables:
- `Tenant` - Multi-tenant support
- `TenantConfig` - Per-tenant configuration
- `Customer` - Frontend customers (separated from User/Admin)
- `Category` - Product categories
- `Tag` + `ProductTag` - Product tagging
- `ProductVariant` - Product variations (size, color, etc)
- `ProductRelation` - Related/Upsell products
- `Review` - Product reviews & ratings
- `WishlistItem` - Customer wishlists
- `Order` + `OrderItem` - WhatsApp order tracking
- `Coupon` - Discount coupons
- `Newsletter` - Email subscribers

### Modified Tables:
- `User` - Added `tenantId`, `role`, `isActive`
- `Product` - Added many fields (categoryId, slug, images[], SEO, stats, etc)

## Default Tenant

The seed script creates:
- Tenant: `americacannabis`
- Domain: `localhost:5178`
- All existing data migrated to this tenant

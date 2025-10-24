--
-- PostgreSQL database dump
--

\restrict OgoWCs78lQ1LA63sdO8UONOFtTKNM8xYcLDnddhZ23KBo84yguoYQkoIqIYpbMh

-- Dumped from database version 16.10
-- Dumped by pg_dump version 16.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public."WishlistItem" DROP CONSTRAINT IF EXISTS "WishlistItem_productId_fkey";
ALTER TABLE IF EXISTS ONLY public."WishlistItem" DROP CONSTRAINT IF EXISTS "WishlistItem_customerId_fkey";
ALTER TABLE IF EXISTS ONLY public."User" DROP CONSTRAINT IF EXISTS "User_tenantId_fkey";
ALTER TABLE IF EXISTS ONLY public."TenantConfig" DROP CONSTRAINT IF EXISTS "TenantConfig_tenantId_fkey";
ALTER TABLE IF EXISTS ONLY public."Review" DROP CONSTRAINT IF EXISTS "Review_productId_fkey";
ALTER TABLE IF EXISTS ONLY public."Review" DROP CONSTRAINT IF EXISTS "Review_customerId_fkey";
ALTER TABLE IF EXISTS ONLY public."Product" DROP CONSTRAINT IF EXISTS "Product_tenantId_fkey";
ALTER TABLE IF EXISTS ONLY public."Product" DROP CONSTRAINT IF EXISTS "Product_categoryId_fkey";
ALTER TABLE IF EXISTS ONLY public."Product" DROP CONSTRAINT IF EXISTS "Product_brandId_fkey";
ALTER TABLE IF EXISTS ONLY public."ProductVariant" DROP CONSTRAINT IF EXISTS "ProductVariant_productId_fkey";
ALTER TABLE IF EXISTS ONLY public."ProductTag" DROP CONSTRAINT IF EXISTS "ProductTag_tagId_fkey";
ALTER TABLE IF EXISTS ONLY public."ProductTag" DROP CONSTRAINT IF EXISTS "ProductTag_productId_fkey";
ALTER TABLE IF EXISTS ONLY public."ProductRelation" DROP CONSTRAINT IF EXISTS "ProductRelation_toId_fkey";
ALTER TABLE IF EXISTS ONLY public."ProductRelation" DROP CONSTRAINT IF EXISTS "ProductRelation_fromId_fkey";
ALTER TABLE IF EXISTS ONLY public."ProductFAQ" DROP CONSTRAINT IF EXISTS "ProductFAQ_productId_fkey";
ALTER TABLE IF EXISTS ONLY public."ProductBenefit" DROP CONSTRAINT IF EXISTS "ProductBenefit_productId_fkey";
ALTER TABLE IF EXISTS ONLY public."Order" DROP CONSTRAINT IF EXISTS "Order_tenantId_fkey";
ALTER TABLE IF EXISTS ONLY public."Order" DROP CONSTRAINT IF EXISTS "Order_customerId_fkey";
ALTER TABLE IF EXISTS ONLY public."OrderItem" DROP CONSTRAINT IF EXISTS "OrderItem_productId_fkey";
ALTER TABLE IF EXISTS ONLY public."OrderItem" DROP CONSTRAINT IF EXISTS "OrderItem_orderId_fkey";
ALTER TABLE IF EXISTS ONLY public."Newsletter" DROP CONSTRAINT IF EXISTS "Newsletter_customerId_fkey";
ALTER TABLE IF EXISTS ONLY public."Customer" DROP CONSTRAINT IF EXISTS "Customer_tenantId_fkey";
ALTER TABLE IF EXISTS ONLY public."Coupon" DROP CONSTRAINT IF EXISTS "Coupon_tenantId_fkey";
ALTER TABLE IF EXISTS ONLY public."Category" DROP CONSTRAINT IF EXISTS "Category_tenantId_fkey";
ALTER TABLE IF EXISTS ONLY public."Category" DROP CONSTRAINT IF EXISTS "Category_parentId_fkey";
ALTER TABLE IF EXISTS ONLY public."Banner" DROP CONSTRAINT IF EXISTS "Banner_categoryId_fkey";
DROP INDEX IF EXISTS public."WishlistItem_productId_idx";
DROP INDEX IF EXISTS public."WishlistItem_customerId_productId_key";
DROP INDEX IF EXISTS public."WishlistItem_customerId_idx";
DROP INDEX IF EXISTS public."User_tenantId_email_key";
DROP INDEX IF EXISTS public."User_email_idx";
DROP INDEX IF EXISTS public."Tenant_slug_key";
DROP INDEX IF EXISTS public."Tenant_slug_idx";
DROP INDEX IF EXISTS public."Tenant_domain_key";
DROP INDEX IF EXISTS public."Tenant_domain_idx";
DROP INDEX IF EXISTS public."TenantConfig_tenantId_key";
DROP INDEX IF EXISTS public."Tag_slug_key";
DROP INDEX IF EXISTS public."Tag_slug_idx";
DROP INDEX IF EXISTS public."Review_productId_idx";
DROP INDEX IF EXISTS public."Review_isApproved_idx";
DROP INDEX IF EXISTS public."Review_customerId_idx";
DROP INDEX IF EXISTS public."Product_type_idx";
DROP INDEX IF EXISTS public."Product_tenantId_slug_key";
DROP INDEX IF EXISTS public."Product_tenantId_idx";
DROP INDEX IF EXISTS public."Product_slug_idx";
DROP INDEX IF EXISTS public."Product_isFeatured_idx";
DROP INDEX IF EXISTS public."Product_isActive_idx";
DROP INDEX IF EXISTS public."Product_categoryId_idx";
DROP INDEX IF EXISTS public."Product_brandId_idx";
DROP INDEX IF EXISTS public."ProductVariant_sku_idx";
DROP INDEX IF EXISTS public."ProductVariant_productId_idx";
DROP INDEX IF EXISTS public."ProductTag_tagId_idx";
DROP INDEX IF EXISTS public."ProductTag_productId_tagId_key";
DROP INDEX IF EXISTS public."ProductTag_productId_idx";
DROP INDEX IF EXISTS public."ProductRelation_toId_idx";
DROP INDEX IF EXISTS public."ProductRelation_fromId_toId_key";
DROP INDEX IF EXISTS public."ProductRelation_fromId_idx";
DROP INDEX IF EXISTS public."ProductFAQ_productId_idx";
DROP INDEX IF EXISTS public."ProductFAQ_isActive_idx";
DROP INDEX IF EXISTS public."ProductBenefit_productId_idx";
DROP INDEX IF EXISTS public."Order_tenantId_idx";
DROP INDEX IF EXISTS public."Order_status_idx";
DROP INDEX IF EXISTS public."Order_orderNumber_key";
DROP INDEX IF EXISTS public."Order_orderNumber_idx";
DROP INDEX IF EXISTS public."Order_customerId_idx";
DROP INDEX IF EXISTS public."Order_createdAt_idx";
DROP INDEX IF EXISTS public."OrderItem_productId_idx";
DROP INDEX IF EXISTS public."OrderItem_orderId_idx";
DROP INDEX IF EXISTS public."Newsletter_tenantId_idx";
DROP INDEX IF EXISTS public."Newsletter_tenantId_email_key";
DROP INDEX IF EXISTS public."Newsletter_email_idx";
DROP INDEX IF EXISTS public."GlobalBenefit_tenantId_isActive_idx";
DROP INDEX IF EXISTS public."DefaultReview_tenantId_isActive_idx";
DROP INDEX IF EXISTS public."DefaultReview_showOnProducts_idx";
DROP INDEX IF EXISTS public."DefaultReview_showOnHome_idx";
DROP INDEX IF EXISTS public."DefaultReview_resultType_idx";
DROP INDEX IF EXISTS public."DefaultReview_isFeatured_idx";
DROP INDEX IF EXISTS public."Customer_tenantId_idx";
DROP INDEX IF EXISTS public."Customer_tenantId_email_key";
DROP INDEX IF EXISTS public."Customer_email_idx";
DROP INDEX IF EXISTS public."Coupon_tenantId_idx";
DROP INDEX IF EXISTS public."Coupon_tenantId_code_key";
DROP INDEX IF EXISTS public."Coupon_isActive_idx";
DROP INDEX IF EXISTS public."Coupon_code_idx";
DROP INDEX IF EXISTS public."Category_tenantId_slug_key";
DROP INDEX IF EXISTS public."Category_tenantId_idx";
DROP INDEX IF EXISTS public."Category_slug_idx";
DROP INDEX IF EXISTS public."Brand_tenantId_slug_key";
DROP INDEX IF EXISTS public."Brand_tenantId_idx";
DROP INDEX IF EXISTS public."Brand_slug_idx";
DROP INDEX IF EXISTS public."Banner_tenantId_type_isActive_idx";
DROP INDEX IF EXISTS public."Banner_categoryId_idx";
ALTER TABLE IF EXISTS ONLY public."WishlistItem" DROP CONSTRAINT IF EXISTS "WishlistItem_pkey";
ALTER TABLE IF EXISTS ONLY public."User" DROP CONSTRAINT IF EXISTS "User_pkey";
ALTER TABLE IF EXISTS ONLY public."Tenant" DROP CONSTRAINT IF EXISTS "Tenant_pkey";
ALTER TABLE IF EXISTS ONLY public."TenantConfig" DROP CONSTRAINT IF EXISTS "TenantConfig_pkey";
ALTER TABLE IF EXISTS ONLY public."Tag" DROP CONSTRAINT IF EXISTS "Tag_pkey";
ALTER TABLE IF EXISTS ONLY public."Review" DROP CONSTRAINT IF EXISTS "Review_pkey";
ALTER TABLE IF EXISTS ONLY public."Product" DROP CONSTRAINT IF EXISTS "Product_pkey";
ALTER TABLE IF EXISTS ONLY public."ProductVariant" DROP CONSTRAINT IF EXISTS "ProductVariant_pkey";
ALTER TABLE IF EXISTS ONLY public."ProductTag" DROP CONSTRAINT IF EXISTS "ProductTag_pkey";
ALTER TABLE IF EXISTS ONLY public."ProductRelation" DROP CONSTRAINT IF EXISTS "ProductRelation_pkey";
ALTER TABLE IF EXISTS ONLY public."ProductFAQ" DROP CONSTRAINT IF EXISTS "ProductFAQ_pkey";
ALTER TABLE IF EXISTS ONLY public."ProductBenefit" DROP CONSTRAINT IF EXISTS "ProductBenefit_pkey";
ALTER TABLE IF EXISTS ONLY public."Order" DROP CONSTRAINT IF EXISTS "Order_pkey";
ALTER TABLE IF EXISTS ONLY public."OrderItem" DROP CONSTRAINT IF EXISTS "OrderItem_pkey";
ALTER TABLE IF EXISTS ONLY public."Newsletter" DROP CONSTRAINT IF EXISTS "Newsletter_pkey";
ALTER TABLE IF EXISTS ONLY public."GlobalBenefit" DROP CONSTRAINT IF EXISTS "GlobalBenefit_pkey";
ALTER TABLE IF EXISTS ONLY public."DefaultReview" DROP CONSTRAINT IF EXISTS "DefaultReview_pkey";
ALTER TABLE IF EXISTS ONLY public."Customer" DROP CONSTRAINT IF EXISTS "Customer_pkey";
ALTER TABLE IF EXISTS ONLY public."Coupon" DROP CONSTRAINT IF EXISTS "Coupon_pkey";
ALTER TABLE IF EXISTS ONLY public."Category" DROP CONSTRAINT IF EXISTS "Category_pkey";
ALTER TABLE IF EXISTS ONLY public."Brand" DROP CONSTRAINT IF EXISTS "Brand_pkey";
ALTER TABLE IF EXISTS ONLY public."Banner" DROP CONSTRAINT IF EXISTS "Banner_pkey";
DROP TABLE IF EXISTS public."WishlistItem";
DROP TABLE IF EXISTS public."User";
DROP TABLE IF EXISTS public."TenantConfig";
DROP TABLE IF EXISTS public."Tenant";
DROP TABLE IF EXISTS public."Tag";
DROP TABLE IF EXISTS public."Review";
DROP TABLE IF EXISTS public."ProductVariant";
DROP TABLE IF EXISTS public."ProductTag";
DROP TABLE IF EXISTS public."ProductRelation";
DROP TABLE IF EXISTS public."ProductFAQ";
DROP TABLE IF EXISTS public."ProductBenefit";
DROP TABLE IF EXISTS public."Product";
DROP TABLE IF EXISTS public."OrderItem";
DROP TABLE IF EXISTS public."Order";
DROP TABLE IF EXISTS public."Newsletter";
DROP TABLE IF EXISTS public."GlobalBenefit";
DROP TABLE IF EXISTS public."DefaultReview";
DROP TABLE IF EXISTS public."Customer";
DROP TABLE IF EXISTS public."Coupon";
DROP TABLE IF EXISTS public."Category";
DROP TABLE IF EXISTS public."Brand";
DROP TABLE IF EXISTS public."Banner";
DROP TYPE IF EXISTS public."ProductType";
DROP TYPE IF EXISTS public."BannerType";
-- *not* dropping schema, since initdb creates it
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: BannerType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."BannerType" AS ENUM (
    'HOME',
    'CATEGORY',
    'PRODUCT'
);


ALTER TYPE public."BannerType" OWNER TO postgres;

--
-- Name: ProductType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ProductType" AS ENUM (
    'INDICA',
    'SATIVA',
    'HIBRIDA'
);


ALTER TYPE public."ProductType" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Banner; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Banner" (
    id text NOT NULL,
    "tenantId" text NOT NULL,
    title text,
    subtitle text,
    "imageUrl" text NOT NULL,
    "imageMobile" text,
    "linkUrl" text,
    "linkText" text,
    type public."BannerType" DEFAULT 'HOME'::public."BannerType" NOT NULL,
    "categoryId" text,
    "isActive" boolean DEFAULT true NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    impressions integer DEFAULT 0 NOT NULL,
    clicks integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Banner" OWNER TO postgres;

--
-- Name: Brand; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Brand" (
    id text NOT NULL,
    "tenantId" text NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    description text,
    "imageUrl" text,
    "isActive" boolean DEFAULT true NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Brand" OWNER TO postgres;

--
-- Name: Category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Category" (
    id text NOT NULL,
    "tenantId" text NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    description text,
    "imageUrl" text,
    "parentId" text,
    "isActive" boolean DEFAULT true NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Category" OWNER TO postgres;

--
-- Name: Coupon; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Coupon" (
    id text NOT NULL,
    "tenantId" text NOT NULL,
    code text NOT NULL,
    description text,
    type text NOT NULL,
    value numeric(10,2) NOT NULL,
    "minPurchase" numeric(10,2),
    "maxDiscount" numeric(10,2),
    "usageLimit" integer,
    "usageCount" integer DEFAULT 0 NOT NULL,
    "startsAt" timestamp(3) without time zone,
    "expiresAt" timestamp(3) without time zone,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Coupon" OWNER TO postgres;

--
-- Name: Customer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Customer" (
    id text NOT NULL,
    "tenantId" text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    name text NOT NULL,
    phone text,
    cpf text,
    address text,
    city text,
    state text,
    "zipCode" text,
    country text DEFAULT 'BR'::text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Customer" OWNER TO postgres;

--
-- Name: DefaultReview; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."DefaultReview" (
    id text NOT NULL,
    "tenantId" text NOT NULL,
    "customerName" text,
    "customerPhoto" text,
    rating integer DEFAULT 5,
    comment text,
    "isActive" boolean DEFAULT true NOT NULL,
    "isFeatured" boolean DEFAULT false NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "showOnHome" boolean DEFAULT true NOT NULL,
    "showOnProducts" boolean DEFAULT true NOT NULL,
    "mediaType" text,
    "mediaUrl" text,
    "customerCity" text,
    "productName" text,
    "resultType" text,
    "usageDuration" text
);


ALTER TABLE public."DefaultReview" OWNER TO postgres;

--
-- Name: GlobalBenefit; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."GlobalBenefit" (
    id text NOT NULL,
    "tenantId" text NOT NULL,
    icon text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."GlobalBenefit" OWNER TO postgres;

--
-- Name: Newsletter; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Newsletter" (
    id text NOT NULL,
    "tenantId" text NOT NULL,
    "customerId" text,
    email text NOT NULL,
    name text,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Newsletter" OWNER TO postgres;

--
-- Name: Order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Order" (
    id text NOT NULL,
    "tenantId" text NOT NULL,
    "customerId" text,
    "orderNumber" text NOT NULL,
    status text DEFAULT 'pending'::text NOT NULL,
    "customerName" text NOT NULL,
    "customerEmail" text NOT NULL,
    "customerPhone" text NOT NULL,
    subtotal numeric(10,2) NOT NULL,
    discount numeric(10,2) DEFAULT 0 NOT NULL,
    total numeric(10,2) NOT NULL,
    "couponCode" text,
    "deliveryAddress" text,
    "deliveryCity" text,
    "deliveryState" text,
    "deliveryZipCode" text,
    "whatsappConversationUrl" text,
    "customerNotes" text,
    "adminNotes" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Order" OWNER TO postgres;

--
-- Name: OrderItem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."OrderItem" (
    id text NOT NULL,
    "orderId" text NOT NULL,
    "productId" text NOT NULL,
    "productName" text NOT NULL,
    "productSku" text,
    "imageUrl" text,
    quantity integer NOT NULL,
    price numeric(10,2) NOT NULL,
    total numeric(10,2) NOT NULL,
    "variantInfo" jsonb,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."OrderItem" OWNER TO postgres;

--
-- Name: Product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Product" (
    id text NOT NULL,
    "tenantId" text NOT NULL,
    "categoryId" text,
    name text NOT NULL,
    slug text NOT NULL,
    description text NOT NULL,
    "shortDesc" text,
    price numeric(10,2) NOT NULL,
    "comparePrice" numeric(10,2),
    cost numeric(10,2),
    "imageUrl" text NOT NULL,
    images text[],
    stock integer DEFAULT 0 NOT NULL,
    sku text,
    "trackStock" boolean DEFAULT true NOT NULL,
    "lowStockAlert" integer DEFAULT 5,
    "isActive" boolean DEFAULT true NOT NULL,
    "isFeatured" boolean DEFAULT false NOT NULL,
    "metaTitle" text,
    "metaDescription" text,
    "metaKeywords" text,
    "viewCount" integer DEFAULT 0 NOT NULL,
    "orderCount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "brandId" text,
    type public."ProductType"
);


ALTER TABLE public."Product" OWNER TO postgres;

--
-- Name: ProductBenefit; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProductBenefit" (
    id text NOT NULL,
    "productId" text NOT NULL,
    icon text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."ProductBenefit" OWNER TO postgres;

--
-- Name: ProductFAQ; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProductFAQ" (
    id text NOT NULL,
    "productId" text NOT NULL,
    question text NOT NULL,
    answer text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."ProductFAQ" OWNER TO postgres;

--
-- Name: ProductRelation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProductRelation" (
    id text NOT NULL,
    "fromId" text NOT NULL,
    "toId" text NOT NULL,
    type text DEFAULT 'related'::text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."ProductRelation" OWNER TO postgres;

--
-- Name: ProductTag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProductTag" (
    id text NOT NULL,
    "productId" text NOT NULL,
    "tagId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."ProductTag" OWNER TO postgres;

--
-- Name: ProductVariant; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProductVariant" (
    id text NOT NULL,
    "productId" text NOT NULL,
    name text NOT NULL,
    sku text,
    price numeric(10,2),
    stock integer DEFAULT 0 NOT NULL,
    "imageUrl" text,
    options jsonb NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."ProductVariant" OWNER TO postgres;

--
-- Name: Review; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Review" (
    id text NOT NULL,
    "productId" text NOT NULL,
    "customerId" text NOT NULL,
    rating integer NOT NULL,
    title text,
    comment text NOT NULL,
    "isApproved" boolean DEFAULT false NOT NULL,
    "isVerified" boolean DEFAULT false NOT NULL,
    helpful integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Review" OWNER TO postgres;

--
-- Name: Tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Tag" (
    id text NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Tag" OWNER TO postgres;

--
-- Name: Tenant; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Tenant" (
    id text NOT NULL,
    slug text NOT NULL,
    name text NOT NULL,
    domain text,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Tenant" OWNER TO postgres;

--
-- Name: TenantConfig; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TenantConfig" (
    id text NOT NULL,
    "tenantId" text NOT NULL,
    "siteName" text DEFAULT 'My Store'::text NOT NULL,
    "primaryColor" text DEFAULT '#2D1B4E'::text NOT NULL,
    logo text,
    favicon text,
    email text,
    phone text,
    "whatsappNumber" text,
    "metaTitle" text,
    "metaDescription" text,
    "metaKeywords" text,
    "enableReviews" boolean DEFAULT true NOT NULL,
    "enableWishlist" boolean DEFAULT true NOT NULL,
    "enableNewsletter" boolean DEFAULT true NOT NULL,
    "enableCoupons" boolean DEFAULT true NOT NULL,
    currency text DEFAULT 'BRL'::text NOT NULL,
    language text DEFAULT 'pt-BR'::text NOT NULL,
    timezone text DEFAULT 'America/Sao_Paulo'::text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "allowGuestReviews" boolean DEFAULT false NOT NULL,
    "enableProductFAQ" boolean DEFAULT true NOT NULL,
    "enableUrgency" boolean DEFAULT true NOT NULL,
    "enableViewCount" boolean DEFAULT false NOT NULL,
    "enableZoom" boolean DEFAULT true NOT NULL,
    "privacyPolicy" text,
    "relatedProductsCount" integer DEFAULT 4 NOT NULL,
    "requireApproval" boolean DEFAULT true NOT NULL,
    "returnPolicy" text,
    "shippingPolicy" text,
    "showRelatedProducts" boolean DEFAULT true NOT NULL,
    "socialProofText" text,
    "termsOfService" text,
    "trustBadges" jsonb,
    "urgencyThreshold" integer DEFAULT 5 NOT NULL,
    "enableDefaultReviews" boolean DEFAULT false NOT NULL,
    "enableGlobalBenefits" boolean DEFAULT false NOT NULL,
    "accentColor" text DEFAULT '#C4FF61'::text NOT NULL,
    "backgroundColor" text DEFAULT '#FFFFFF'::text NOT NULL,
    "secondaryColor" text DEFAULT '#B8986B'::text NOT NULL,
    "textColor" text DEFAULT '#1A1A1A'::text NOT NULL,
    "googleAnalyticsId" text,
    "googleTagManagerId" text,
    "metaPixelId" text
);


ALTER TABLE public."TenantConfig" OWNER TO postgres;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    "tenantId" text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    name text,
    role text DEFAULT 'admin'::text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: WishlistItem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."WishlistItem" (
    id text NOT NULL,
    "customerId" text NOT NULL,
    "productId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."WishlistItem" OWNER TO postgres;

--
-- Data for Name: Banner; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Banner" (id, "tenantId", title, subtitle, "imageUrl", "imageMobile", "linkUrl", "linkText", type, "categoryId", "isActive", "order", impressions, clicks, "createdAt", "updatedAt") FROM stdin;
d9a01f0a-4d14-4201-84af-5a8bafda4297	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	\N	http://localhost:4000/uploads/images/banners/ba8dec1d-bafd-475e-8d16-9866d40221a0.jpg	\N	\N	\N	HOME	\N	t	0	53	0	2025-10-20 14:15:09.554	2025-10-22 00:39:10.838
\.


--
-- Data for Name: Brand; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Brand" (id, "tenantId", name, slug, description, "imageUrl", "isActive", "order", "createdAt", "updatedAt") FROM stdin;
fd7dfce0-f860-4116-a011-f966498002f6	0fb61585-3cb3-48b3-ae76-0a5358084a8c	Tree House	tree-house	\N	\N	t	0	2025-10-21 02:05:54.681	2025-10-21 02:05:54.681
\.


--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Category" (id, "tenantId", name, slug, description, "imageUrl", "parentId", "isActive", "order", "createdAt", "updatedAt") FROM stdin;
e71fce7e-b558-411f-93bd-76e2e196b338	0fb61585-3cb3-48b3-ae76-0a5358084a8c	Comestíveis (Gummy)	comestiveis-gummy		\N	\N	t	0	2025-10-20 14:10:16.07	2025-10-20 14:10:16.07
e1a0004e-48f9-4d79-a351-334b64ff1ace	0fb61585-3cb3-48b3-ae76-0a5358084a8c	Vaporizadores Descartáveis	vaporizadores-descartaveis		\N	\N	t	0	2025-10-20 14:09:52.113	2025-10-20 14:11:05.199
805af8ff-aa2e-44a2-a212-66946a05fa2b	0fb61585-3cb3-48b3-ae76-0a5358084a8c	Vaporizadores Refil	vaporizadores-refil		\N	\N	t	0	2025-10-20 14:11:20.048	2025-10-20 14:11:20.048
\.


--
-- Data for Name: Coupon; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Coupon" (id, "tenantId", code, description, type, value, "minPurchase", "maxDiscount", "usageLimit", "usageCount", "startsAt", "expiresAt", "isActive", "createdAt", "updatedAt") FROM stdin;
3a3dbb21-a185-4b26-96f2-5b0a41467fef	0fb61585-3cb3-48b3-ae76-0a5358084a8c	WELCOME10	Cupom de boas-vindas - 10% de desconto	percentage	10.00	100.00	50.00	\N	0	\N	2025-12-31 00:00:00	t	2025-10-16 04:43:28.058	2025-10-16 04:43:28.058
8817e17d-9049-4b74-9f47-8ddc20e55412	0fb61585-3cb3-48b3-ae76-0a5358084a8c	PRIMEIRA COMPRA	Primeira compra - R$ 30 de desconto	fixed	30.00	150.00	\N	100	0	\N	2025-12-31 00:00:00	t	2025-10-16 04:43:28.061	2025-10-16 04:43:28.061
8bb70dc6-d63f-4a24-b7e4-af6480ea8c84	0fb61585-3cb3-48b3-ae76-0a5358084a8c	BLACK25	Black Friday - 25% de desconto	percentage	25.00	200.00	150.00	\N	0	2025-11-20 00:00:00	2025-11-30 00:00:00	t	2025-10-16 04:43:28.062	2025-10-16 04:43:28.062
\.


--
-- Data for Name: Customer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Customer" (id, "tenantId", email, password, name, phone, cpf, address, city, state, "zipCode", country, "isActive", "createdAt", "updatedAt") FROM stdin;
6572805b-6312-4c1d-b9c8-45eddf6dcab7	0fb61585-3cb3-48b3-ae76-0a5358084a8c	maria@example.com	$2b$10$peKAOu7j2LwZpKRihuxf/OAC/xMZzY5/P906rtLsBGoyVqDKF6g52	Maria Silva	+55 11 98765-4321	\N	\N	São Paulo	SP	\N	BR	t	2025-10-16 04:43:28.048	2025-10-16 04:43:28.048
9c5691b9-f241-499f-a0fc-eb7743246e9c	0fb61585-3cb3-48b3-ae76-0a5358084a8c	joao@example.com	$2b$10$peKAOu7j2LwZpKRihuxf/OAC/xMZzY5/P906rtLsBGoyVqDKF6g52	João Santos	+55 21 91234-5678	\N	\N	Rio de Janeiro	RJ	\N	BR	t	2025-10-16 04:43:28.051	2025-10-16 04:43:28.051
\.


--
-- Data for Name: DefaultReview; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."DefaultReview" (id, "tenantId", "customerName", "customerPhoto", rating, comment, "isActive", "isFeatured", "order", "createdAt", "updatedAt", "showOnHome", "showOnProducts", "mediaType", "mediaUrl", "customerCity", "productName", "resultType", "usageDuration") FROM stdin;
570fe3fd-bfa1-4a3e-845a-9abe70649b21	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	\N	5	\N	t	f	0	2025-10-21 16:56:33.14	2025-10-21 16:56:33.14	t	t	image	http://localhost:4000/uploads/images/banners/12d34f35-c7fa-4477-935b-dcaf05709092.jpg	\N	\N	\N	\N
b9e0d691-0659-4696-94b1-e9073b1292c6	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	\N	5	\N	t	f	0	2025-10-21 16:56:45.999	2025-10-21 16:56:45.999	t	t	image	http://localhost:4000/uploads/images/banners/b05a4c02-4b7e-42c8-b3e0-0b07eb2b05c2.jpg	\N	\N	\N	\N
219ac9c0-a057-46fb-8bec-b2e3c963367e	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	\N	5	\N	t	f	0	2025-10-21 16:56:57.495	2025-10-21 16:56:57.495	t	t	image	http://localhost:4000/uploads/images/banners/360d0152-f865-4ecc-82a0-f64a81044d18.jpg	\N	\N	\N	\N
0c048706-4acf-4b81-8bc0-835e849d5fb4	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	\N	5	\N	t	t	0	2025-10-22 16:44:27.051	2025-10-22 16:44:27.051	t	t	image	http://localhost:4000/uploads/images/banners/f995cf16-56fe-4a3d-9690-b0dbc4d8c7d8.jpg	\N	\N	\N	\N
5e5bae87-eb3e-4ef6-842b-193c9a7cfbe5	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	\N	5	\N	t	t	0	2025-10-21 16:56:17.727	2025-10-22 16:44:35.109	t	t	image	http://localhost:4000/uploads/images/banners/ecef7e0e-7ea7-4883-8e64-e7492eef3f2c.jpg	\N	\N	\N	\N
\.


--
-- Data for Name: GlobalBenefit; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."GlobalBenefit" (id, "tenantId", icon, title, description, "isActive", "order", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Newsletter; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Newsletter" (id, "tenantId", "customerId", email, name, "isActive", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Order" (id, "tenantId", "customerId", "orderNumber", status, "customerName", "customerEmail", "customerPhone", subtotal, discount, total, "couponCode", "deliveryAddress", "deliveryCity", "deliveryState", "deliveryZipCode", "whatsappConversationUrl", "customerNotes", "adminNotes", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: OrderItem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."OrderItem" (id, "orderId", "productId", "productName", "productSku", "imageUrl", quantity, price, total, "variantInfo", "createdAt") FROM stdin;
\.


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Product" (id, "tenantId", "categoryId", name, slug, description, "shortDesc", price, "comparePrice", cost, "imageUrl", images, stock, sku, "trackStock", "lowStockAlert", "isActive", "isFeatured", "metaTitle", "metaDescription", "metaKeywords", "viewCount", "orderCount", "createdAt", "updatedAt", "brandId", type) FROM stdin;
ddee5a58-1c6f-4d33-93f3-a0798cd2514c	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	EigthSix 2ml Delta 8 / 9 - Hibrida	eigthsix-2ml-delta-8-9-hibrida	Compre EigthSix 2ml Delta 8 / 9 - Hibrida por R$ 300.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	300.00	\N	\N	https://via.placeholder.com/800x800/10b981/ffffff?text=EigthSix%202ml%20Delta%208	{https://via.placeholder.com/800x800/10b981/ffffff?text=EigthSix%202ml%20Delta%208}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:31.9	2025-10-19 17:19:31.9	\N	\N
bb3cb2f1-e242-4362-a78a-fdfc69b855ab	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Jetter Juice Pen 1ml Thc-A Delta 9 Hibrida	jetter-juice-pen-1ml-thc-a-delta-9-hibrida	Compre Jetter Juice Pen 1ml Thc-A Delta 9 Hibrida por R$ 360.00 na America Cannabis. Vape de Delta THC de altíssima potência, testado em laboratório. Tecnologia de ponta para vapor suave e sabor premium. Cartucho descartável ou recarregável com bateria de longa duração. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	360.00	\N	\N	https://via.placeholder.com/800x800/10b981/ffffff?text=Jetter%20Juice%20Pen%201ml	{https://via.placeholder.com/800x800/10b981/ffffff?text=Jetter%20Juice%20Pen%201ml}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:32.413	2025-10-19 17:19:32.413	\N	\N
39716762-06a4-432e-843b-c493495e10fe	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Jetter Juice Pen 1ml Thc-A Delta 9 indica	jetter-juice-pen-1ml-thc-a-delta-9-indica	Compre Jetter Juice Pen 1ml Thc-A Delta 9 indica por R$ 360.00 na America Cannabis. Vape de Delta THC de altíssima potência, testado em laboratório. Tecnologia de ponta para vapor suave e sabor premium. Cartucho descartável ou recarregável com bateria de longa duração. Efeito Indica: Relaxamento corporal profundo, ideal para alívio de dores, insônia e estresse. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	360.00	\N	\N	https://via.placeholder.com/800x800/10b981/ffffff?text=Jetter%20Juice%20Pen%201ml	{https://via.placeholder.com/800x800/10b981/ffffff?text=Jetter%20Juice%20Pen%201ml}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:32.931	2025-10-19 17:19:32.931	\N	\N
2cba6add-11a1-4904-b2f7-5ff9fb139db5	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Jetter Juice Pen 1ml Thc-A Delta 9 Sativa	jetter-juice-pen-1ml-thc-a-delta-9-sativa	Compre Jetter Juice Pen 1ml Thc-A Delta 9 Sativa por R$ 360.00 na America Cannabis. Vape de Delta THC de altíssima potência, testado em laboratório. Tecnologia de ponta para vapor suave e sabor premium. Cartucho descartável ou recarregável com bateria de longa duração. Efeito Sativa: Energizante e criativo, perfeito para uso diurno, socialização e produtividade. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	360.00	\N	\N	https://via.placeholder.com/800x800/10b981/ffffff?text=Jetter%20Juice%20Pen%201ml	{https://via.placeholder.com/800x800/10b981/ffffff?text=Jetter%20Juice%20Pen%201ml}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:33.444	2025-10-19 17:19:33.444	\N	\N
8891c5e2-051b-45c0-870c-05d96729c055	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Tree House 2ml Delta 8 / 9 / 10 Thc A - Indica	tree-house-2ml-delta-8-9-10-thc-a-indica	Compre Tree House 2ml Delta 8 / 9 / 10 Thc A - Indica por R$ 400.00 na America Cannabis. Vape de Delta THC de altíssima potência, testado em laboratório. Tecnologia de ponta para vapor suave e sabor premium. Cartucho descartável ou recarregável com bateria de longa duração. Efeito Indica: Relaxamento corporal profundo, ideal para alívio de dores, insônia e estresse. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	400.00	\N	\N	https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=800	{https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=800}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:34.989	2025-10-19 17:27:09.18	\N	\N
789ceaf0-7f64-4d23-8574-5a3d4a3f30f7	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Pulse 5ml Digital Display Delta 9 Thc P Hhc P - Sativa	pulse-5ml-digital-display-delta-9-thc-p-hhc-p-sativa	Compre Pulse 5ml Digital Display Delta 9 Thc P Hhc P - Sativa por R$ 600.00 na America Cannabis. Vape de Delta THC de altíssima potência, testado em laboratório. Tecnologia de ponta para vapor suave e sabor premium. Cartucho descartável ou recarregável com bateria de longa duração. Efeito Sativa: Energizante e criativo, perfeito para uso diurno, socialização e produtividade. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	600.00	\N	\N	https://images.unsplash.com/photo-1587976305342-c47b6d2b7025?w=800	{https://images.unsplash.com/photo-1587976305342-c47b6d2b7025?w=800}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:34.473	2025-10-19 17:27:09.492	\N	\N
ebf47938-c374-4470-81e6-4e5116bf9ef2	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Natyva CBD Gummy Bear	natyva-cbd-gummy-bear	Compre Natyva CBD Gummy Bear por R$ 650.00 na America Cannabis. Gomas de THC premium com dosagem precisa, sabor incrível e efeitos potentes. Perfeito para quem busca discrição e praticidade no consumo. Gummies testados em laboratório, 100% legais e com entrega em todo Brasil. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	650.00	\N	\N	https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=800	{https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=800}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:33.958	2025-10-19 17:27:09.804	\N	\N
ac421e35-37b2-4ef5-badc-af4e0c96abf1	0fb61585-3cb3-48b3-ae76-0a5358084a8c	e1a0004e-48f9-4d79-a351-334b64ff1ace	Tree House 2ml Delta 8 / 9 / 10 Thc A - Sativa	tree-house-2ml-delta-8-9-10-thc-a-sativa	Compre Tree House 2ml Delta 8 / 9 / 10 Thc A - Sativa por R$ 400.00 na America Cannabis. Vape de Delta THC de altíssima potência, testado em laboratório. Tecnologia de ponta para vapor suave e sabor premium. Cartucho descartável ou recarregável com bateria de longa duração. Efeito Sativa: Energizante e criativo, perfeito para uso diurno, socialização e produtividade. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	400.00	599.00	\N	http://localhost:4000/uploads/images/products/fc0c9641-97d2-4501-8c1a-506fe0b9c1e5.jpg	{http://localhost:4000/uploads/images/products/fc0c9641-97d2-4501-8c1a-506fe0b9c1e5.jpg}	10	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:58.097	2025-10-21 02:06:11.835	\N	\N
28023bc9-f69b-464d-aa03-6df645f05bcd	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Torch Cogumelo Thc-A Magic Mintz - Ind 3.5ml	torch-cogumelo-thc-a-magic-mintz-ind-3-5ml	Compre Torch Cogumelo Thc-A Magic Mintz - Ind 3.5ml por R$ 450.00 na America Cannabis. Vape de cogumelo psicodélico de alta qualidade com THC-A. Experiência única e controlada, ideal para relaxamento profundo. Produto premium com ingredientes naturais e efeitos duradouros. Efeito Indica: Relaxamento corporal profundo, ideal para alívio de dores, insônia e estresse. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	450.00	\N	\N	https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg	{https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:09.758	2025-10-19 17:27:21.652	\N	\N
afc7a709-a312-48f5-b6c4-fa13441d1d2d	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Pressure Los Angeles 6g Jelly Doughnuts - Ind	pressure-los-angeles-6g-jelly-doughnuts-ind	Compre Pressure Los Angeles 6g Jelly Doughnuts - Ind por R$ 625.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Efeito Indica: Relaxamento corporal profundo, ideal para alívio de dores, insônia e estresse. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	625.00	\N	\N	https://images.leafly.com/flower-images/pressure-platinum-kush.png	{https://images.leafly.com/flower-images/pressure-platinum-kush.png}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:08.737	2025-10-19 17:27:22.277	\N	\N
4c0c57bb-a546-47fd-a174-a44e76f58130	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Delta King Ind Gummy 10uni	delta-king-ind-gummy-10uni	Compre Delta King Ind Gummy 10uni por R$ 200.00 na America Cannabis. Gomas de THC premium com dosagem precisa, sabor incrível e efeitos potentes. Perfeito para quem busca discrição e praticidade no consumo. Gummies testados em laboratório, 100% legais e com entrega em todo Brasil. Efeito Indica: Relaxamento corporal profundo, ideal para alívio de dores, insônia e estresse. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	200.00	\N	\N	https://cdn.shopify.com/s/files/1/0558/3340/6127/files/Delta_King_Disposable_Vape_-_Granddaddy_Purple_1_oz_480x480.jpg	{https://cdn.shopify.com/s/files/1/0558/3340/6127/files/Delta_King_Disposable_Vape_-_Granddaddy_Purple_1_oz_480x480.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:07.719	2025-10-19 17:27:22.904	\N	\N
abd850fe-9cbc-4728-a908-7776415b3893	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Delta King Ind Grande Daddy Purple 1g	delta-king-ind-grande-daddy-purple-1g	Compre Delta King Ind Grande Daddy Purple 1g por R$ 280.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Efeito Indica: Relaxamento corporal profundo, ideal para alívio de dores, insônia e estresse. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	280.00	\N	\N	https://cdn.shopify.com/s/files/1/0558/3340/6127/files/Delta_King_Disposable_Vape_-_Granddaddy_Purple_1_oz_480x480.jpg	{https://cdn.shopify.com/s/files/1/0558/3340/6127/files/Delta_King_Disposable_Vape_-_Granddaddy_Purple_1_oz_480x480.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:07.206	2025-10-19 17:27:23.215	\N	\N
b4e9cbae-39ae-4bd4-a525-28f1effa63cd	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Hallu 2g Tropical Cookies	hallu-2g-tropical-cookies	Compre Hallu 2g Tropical Cookies por R$ 350.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	350.00	\N	\N	https://images.unsplash.com/photo-1608181715572-5c9d0f337a3f?w=800	{https://images.unsplash.com/photo-1608181715572-5c9d0f337a3f?w=800}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:13.878	2025-10-19 17:27:19.168	\N	\N
82d8c136-1964-445e-91a0-7c83262f1035	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Hallu 2g Strawberry Cheesecake	hallu-2g-strawberry-cheesecake	Compre Hallu 2g Strawberry Cheesecake por R$ 350.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	350.00	\N	\N	https://images.unsplash.com/photo-1608181715572-5c9d0f337a3f?w=800	{https://images.unsplash.com/photo-1608181715572-5c9d0f337a3f?w=800}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:13.364	2025-10-19 17:27:19.479	\N	\N
913d5fe6-1086-4bce-8b08-6696bf665d2e	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Gummy Kapow 20uni	gummy-kapow-20uni	Compre Gummy Kapow 20uni por R$ 360.00 na America Cannabis. Gomas de THC premium com dosagem precisa, sabor incrível e efeitos potentes. Perfeito para quem busca discrição e praticidade no consumo. Gummies testados em laboratório, 100% legais e com entrega em todo Brasil. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	360.00	\N	\N	https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=800	{https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=800}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:12.849	2025-10-19 17:27:19.791	\N	\N
099dae8c-ee4d-4753-97b4-d78e7bec3ab1	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Cactus Sat Super Lemon Haze 1g	cactus-sat-super-lemon-haze-1g	Compre Cactus Sat Super Lemon Haze 1g por R$ 300.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Efeito Sativa: Energizante e criativo, perfeito para uso diurno, socialização e produtividade. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	300.00	\N	\N	https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=800	{https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=800}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:12.333	2025-10-19 17:27:20.099	\N	\N
e9dcde73-19fb-46ab-9447-d05d63e64322	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Cactus Sat Stawberry Cream 1g	cactus-sat-stawberry-cream-1g	Compre Cactus Sat Stawberry Cream 1g por R$ 300.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Efeito Sativa: Energizante e criativo, perfeito para uso diurno, socialização e produtividade. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	300.00	\N	\N	https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=800	{https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=800}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:11.81	2025-10-19 17:27:20.408	\N	\N
44462cb2-43cf-458b-92f3-cf3260473d9d	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Cactus Ind Gushers 1g	cactus-ind-gushers-1g	Compre Cactus Ind Gushers 1g por R$ 300.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Efeito Indica: Relaxamento corporal profundo, ideal para alívio de dores, insônia e estresse. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	300.00	\N	\N	https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=800	{https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=800}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:11.294	2025-10-19 17:27:20.72	\N	\N
0e1e01d4-802c-44a1-bb94-61fd2e693385	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Torch Cogumelo Thc-A Strawberry Mimosa - Sat 3.5ml	torch-cogumelo-thc-a-strawberry-mimosa-sat-3-5ml	Compre Torch Cogumelo Thc-A Strawberry Mimosa - Sat 3.5ml por R$ 450.00 na America Cannabis. Vape de cogumelo psicodélico de alta qualidade com THC-A. Experiência única e controlada, ideal para relaxamento profundo. Produto premium com ingredientes naturais e efeitos duradouros. Efeito Sativa: Energizante e criativo, perfeito para uso diurno, socialização e produtividade. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	450.00	\N	\N	https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg	{https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:10.779	2025-10-19 17:27:21.031	\N	\N
f8fdc061-28ea-438d-a9d6-317e27ff9ae4	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Pulse Thc Super Lemon Haze -Sat 5g	pulse-thc-super-lemon-haze-sat-5g	Compre Pulse Thc Super Lemon Haze -Sat 5g por R$ 600.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Efeito Sativa: Energizante e criativo, perfeito para uso diurno, socialização e produtividade. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	600.00	\N	\N	https://images.unsplash.com/photo-1587976305342-c47b6d2b7025?w=800	{https://images.unsplash.com/photo-1587976305342-c47b6d2b7025?w=800}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:18.539	2025-10-19 17:27:16.672	\N	\N
66714ae7-44ea-482d-98bc-47793cf32978	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Pulse Thc Og Mango Kush - Hyb 5g	pulse-thc-og-mango-kush-hyb-5g	Compre Pulse Thc Og Mango Kush - Hyb 5g por R$ 600.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Efeito Híbrido: Equilíbrio perfeito entre relaxamento e energia, versátil para qualquer momento. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	600.00	\N	\N	https://images.unsplash.com/photo-1587976305342-c47b6d2b7025?w=800	{https://images.unsplash.com/photo-1587976305342-c47b6d2b7025?w=800}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:18.014	2025-10-19 17:27:16.983	\N	\N
eff59a76-5ab7-42f8-a4c6-6b4c32a52715	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Pulse Thc Laughing Gás -Hyb 5g	pulse-thc-laughing-gas-hyb-5g	Compre Pulse Thc Laughing Gás -Hyb 5g por R$ 600.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Efeito Híbrido: Equilíbrio perfeito entre relaxamento e energia, versátil para qualquer momento. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	600.00	\N	\N	https://images.unsplash.com/photo-1587976305342-c47b6d2b7025?w=800	{https://images.unsplash.com/photo-1587976305342-c47b6d2b7025?w=800}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:17.478	2025-10-19 17:27:17.294	\N	\N
4966198d-04c9-488b-83a3-6763887361d8	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Pulse Thc Ice Cream Cake- Ind 5g	pulse-thc-ice-cream-cake-ind-5g	Compre Pulse Thc Ice Cream Cake- Ind 5g por R$ 600.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Efeito Indica: Relaxamento corporal profundo, ideal para alívio de dores, insônia e estresse. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	600.00	\N	\N	https://images.unsplash.com/photo-1587976305342-c47b6d2b7025?w=800	{https://images.unsplash.com/photo-1587976305342-c47b6d2b7025?w=800}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:16.962	2025-10-19 17:27:17.606	\N	\N
7cb9b42f-4fb4-4a27-9052-f7d5d89695ce	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Pulse Thc Blue Dream - Hyb 5g	pulse-thc-blue-dream-hyb-5g	Compre Pulse Thc Blue Dream - Hyb 5g por R$ 600.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Efeito Híbrido: Equilíbrio perfeito entre relaxamento e energia, versátil para qualquer momento. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	600.00	\N	\N	https://images.unsplash.com/photo-1587976305342-c47b6d2b7025?w=800	{https://images.unsplash.com/photo-1587976305342-c47b6d2b7025?w=800}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:16.448	2025-10-19 17:27:17.917	\N	\N
83e12014-edc6-42bd-a529-c7e8b5af99c4	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Ignite Ind BlueberryKush 7g	ignite-ind-blueberrykush-7g	Compre Ignite Ind BlueberryKush 7g por R$ 300.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Efeito Indica: Relaxamento corporal profundo, ideal para alívio de dores, insônia e estresse. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	300.00	\N	\N	https://cdn.shopify.com/s/files/1/0558/3340/6127/files/Ignite_Delta_8_Disposable_Vape_-_Blueberry_Kush_2g_480x480.jpg	{https://cdn.shopify.com/s/files/1/0558/3340/6127/files/Ignite_Delta_8_Disposable_Vape_-_Blueberry_Kush_2g_480x480.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:15.425	2025-10-19 17:27:18.227	\N	\N
a4d1e60b-3282-4baf-be7a-f685b42d78d5	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Hallu 3g Super Sour Diesel Sativa	hallu-3g-super-sour-diesel-sativa	Compre Hallu 3g Super Sour Diesel Sativa por R$ 450.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Efeito Sativa: Energizante e criativo, perfeito para uso diurno, socialização e produtividade. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	450.00	\N	\N	https://images.unsplash.com/photo-1608181715572-5c9d0f337a3f?w=800	{https://images.unsplash.com/photo-1608181715572-5c9d0f337a3f?w=800}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:14.911	2025-10-19 17:27:18.541	\N	\N
33c302ef-2b93-477a-9f88-07d352b02689	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Torch Cogumelo Thc-A Blue Berry Caps - Ind 3.5ml	torch-cogumelo-thc-a-blue-berry-caps-ind-3-5ml	Compre Torch Cogumelo Thc-A Blue Berry Caps - Ind 3.5ml por R$ 450.00 na America Cannabis. Vape de cogumelo psicodélico de alta qualidade com THC-A. Experiência única e controlada, ideal para relaxamento profundo. Produto premium com ingredientes naturais e efeitos duradouros. Efeito Indica: Relaxamento corporal profundo, ideal para alívio de dores, insônia e estresse. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	450.00	\N	\N	https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg	{https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:22.646	2025-10-19 17:27:14.172	\N	\N
d151073e-9945-4d85-9715-4424e727abb8	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Torch Blue Pineapple - Sat 5g	torch-blue-pineapple-sat-5g	Compre Torch Blue Pineapple - Sat 5g por R$ 600.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Efeito Sativa: Energizante e criativo, perfeito para uso diurno, socialização e produtividade. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	600.00	\N	\N	https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg	{https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:21.621	2025-10-19 17:27:14.795	\N	\N
b78cdf27-3cfe-46c6-99a0-64ca64a0941b	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Torch 3.5g Nitro Wedding Crasher - Sat	torch-3-5g-nitro-wedding-crasher-sat	Compre Torch 3.5g Nitro Wedding Crasher - Sat por R$ 450.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Efeito Sativa: Energizante e criativo, perfeito para uso diurno, socialização e produtividade. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	450.00	\N	\N	https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg	{https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:20.596	2025-10-19 17:27:15.428	\N	\N
ccd77869-28b4-4ef8-a04e-7b7bd3081eff	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Torch 3.5g Nitro Purple Boost - Sat	torch-3-5g-nitro-purple-boost-sat	Compre Torch 3.5g Nitro Purple Boost - Sat por R$ 450.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Efeito Sativa: Energizante e criativo, perfeito para uso diurno, socialização e produtividade. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	450.00	\N	\N	https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg	{https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:20.084	2025-10-19 17:27:15.735	\N	\N
898aba0c-44dd-4dd4-acec-d7fe8ea61c8a	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Torch 3.5g Nitro La Kush Cake - Hyb	torch-3-5g-nitro-la-kush-cake-hyb	Compre Torch 3.5g Nitro La Kush Cake - Hyb por R$ 450.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Efeito Híbrido: Equilíbrio perfeito entre relaxamento e energia, versátil para qualquer momento. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	450.00	\N	\N	https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg	{https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:19.565	2025-10-19 17:27:16.048	\N	\N
8df68adf-f574-49dd-9d65-93d35507865b	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Torch Watermelon Mint - Sat 5g	torch-watermelon-mint-sat-5g	Compre Torch Watermelon Mint - Sat 5g por R$ 600.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Efeito Sativa: Energizante e criativo, perfeito para uso diurno, socialização e produtividade. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	600.00	\N	\N	https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg	{https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:26.753	2025-10-19 17:27:11.681	\N	\N
3ee2be64-2443-4bbf-b378-bdafb6db43b1	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Torch Ind White Truffle 3.5g	torch-ind-white-truffle-3-5g	Compre Torch Ind White Truffle 3.5g por R$ 470.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Efeito Indica: Relaxamento corporal profundo, ideal para alívio de dores, insônia e estresse. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	470.00	\N	\N	https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg	{https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:26.24	2025-10-19 17:27:11.993	\N	\N
29c959e4-cbca-44b3-8493-6d102b22f5ef	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Torch Ind Cake Bomb 7.5g	torch-ind-cake-bomb-7-5g	Compre Torch Ind Cake Bomb 7.5g por R$ 750.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Efeito Indica: Relaxamento corporal profundo, ideal para alívio de dores, insônia e estresse. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	750.00	\N	\N	https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg	{https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:25.21	2025-10-19 17:27:12.617	\N	\N
2593ee68-8b54-4aea-91db-ff5694613fff	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Torch Hyb Space Runtz 3.5g	torch-hyb-space-runtz-3-5g	Compre Torch Hyb Space Runtz 3.5g por R$ 470.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Efeito Híbrido: Equilíbrio perfeito entre relaxamento e energia, versátil para qualquer momento. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	470.00	\N	\N	https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg	{https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:24.179	2025-10-19 17:27:13.239	\N	\N
ecf3adba-b5db-48fc-aa69-26d614c365b3	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Torch Hyb Paradise Og 7.5g	torch-hyb-paradise-og-7-5g	Compre Torch Hyb Paradise Og 7.5g por R$ 750.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Efeito Híbrido: Equilíbrio perfeito entre relaxamento e energia, versátil para qualquer momento. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	750.00	\N	\N	https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg	{https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:23.664	2025-10-19 17:27:13.547	\N	\N
80b1e39a-b9bb-4caa-bc61-3107fcd8315f	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Complexo Deltas 1g	complexo-deltas-1g	Compre Complexo Deltas 1g por R$ 300.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	300.00	\N	\N	https://via.placeholder.com/800x800/10b981/ffffff?text=Complexo%20Deltas%201g	{https://via.placeholder.com/800x800/10b981/ffffff?text=Complexo%20Deltas%201g}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:28.297	2025-10-19 17:19:28.297	\N	\N
36662e24-823d-49ae-8a6e-0e1ee43c8ba3	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Complexo Deltas Myrcene - Sat 1g	complexo-deltas-myrcene-sat-1g	Compre Complexo Deltas Myrcene - Sat 1g por R$ 300.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Efeito Sativa: Energizante e criativo, perfeito para uso diurno, socialização e produtividade. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	300.00	\N	\N	https://via.placeholder.com/800x800/10b981/ffffff?text=Complexo%20Deltas%20Myrc	{https://via.placeholder.com/800x800/10b981/ffffff?text=Complexo%20Deltas%20Myrc}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:28.813	2025-10-19 17:19:28.813	\N	\N
0019b0a4-f40d-4632-b702-d7961d40a280	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Complexo Deltas Pineapple Express - Sat 1g	complexo-deltas-pineapple-express-sat-1g	Compre Complexo Deltas Pineapple Express - Sat 1g por R$ 300.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Efeito Sativa: Energizante e criativo, perfeito para uso diurno, socialização e produtividade. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	300.00	\N	\N	https://via.placeholder.com/800x800/10b981/ffffff?text=Complexo%20Deltas%20Pine	{https://via.placeholder.com/800x800/10b981/ffffff?text=Complexo%20Deltas%20Pine}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:29.327	2025-10-19 17:19:29.327	\N	\N
d6a44778-eabd-4085-b5bb-6d5cb9fabc22	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Complexo Deltas Skywalker - Sat 1g	complexo-deltas-skywalker-sat-1g	Compre Complexo Deltas Skywalker - Sat 1g por R$ 300.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Efeito Sativa: Energizante e criativo, perfeito para uso diurno, socialização e produtividade. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	300.00	\N	\N	https://via.placeholder.com/800x800/10b981/ffffff?text=Complexo%20Deltas%20Skyw	{https://via.placeholder.com/800x800/10b981/ffffff?text=Complexo%20Deltas%20Skyw}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:29.84	2025-10-19 17:19:29.84	\N	\N
8c2344d5-7cf2-454e-8092-bc70bd2e8f53	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Stoney Cat Blue Dream 3.5g	stoney-cat-blue-dream-3-5g	Compre Stoney Cat Blue Dream 3.5g por R$ 500.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	500.00	\N	\N	https://images.unsplash.com/photo-1615486511262-2558ca0cc2ea?w=800	{https://images.unsplash.com/photo-1615486511262-2558ca0cc2ea?w=800}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:30.867	2025-10-19 17:27:10.428	\N	\N
5c635b84-0718-4e79-95d0-356e148d5fea	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Stoney Cat Berry Payton 3.5g	stoney-cat-berry-payton-3-5g	Compre Stoney Cat Berry Payton 3.5g por R$ 500.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	500.00	\N	\N	https://images.unsplash.com/photo-1615486511262-2558ca0cc2ea?w=800	{https://images.unsplash.com/photo-1615486511262-2558ca0cc2ea?w=800}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:30.355	2025-10-19 17:27:10.742	\N	\N
04c46a03-fcdb-495a-bde2-6215c7100d0f	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Torch Yuzu Peach Runtz - Ind 5g	torch-yuzu-peach-runtz-ind-5g	Compre Torch Yuzu Peach Runtz - Ind 5g por R$ 600.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Efeito Indica: Relaxamento corporal profundo, ideal para alívio de dores, insônia e estresse. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	600.00	\N	\N	https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg	{https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:27.782	2025-10-19 17:27:11.054	\N	\N
1865b54b-7233-400b-9081-69aa6d807732	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Chapo SuperMax Diamont 5ml Delta 9 Thc A / P - Sativa	chapo-supermax-diamont-5ml-delta-9-thc-a-p-sativa	Compre Chapo SuperMax Diamont 5ml Delta 9 Thc A / P - Sativa por R$ 600.00 na America Cannabis. Vape de Delta THC de altíssima potência, testado em laboratório. Tecnologia de ponta para vapor suave e sabor premium. Cartucho descartável ou recarregável com bateria de longa duração. Efeito Sativa: Energizante e criativo, perfeito para uso diurno, socialização e produtividade. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	600.00	\N	\N	https://via.placeholder.com/800x800/10b981/ffffff?text=Chapo%20SuperMax%20Diamo	{https://via.placeholder.com/800x800/10b981/ffffff?text=Chapo%20SuperMax%20Diamo}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:38.052	2025-10-19 17:19:38.052	\N	\N
f6c22037-d641-4854-a16d-9e25ac7e0301	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Delta 8ml Diamont Delta 9 / 10 / 11 Tch A / P / X - Indica	delta-8ml-diamont-delta-9-10-11-tch-a-p-x-indica	Compre Delta 8ml Diamont Delta 9 / 10 / 11 Tch A / P / X - Indica por R$ 300.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Efeito Indica: Relaxamento corporal profundo, ideal para alívio de dores, insônia e estresse. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	300.00	\N	\N	https://via.placeholder.com/800x800/10b981/ffffff?text=Delta%208ml%20Diamont%20De	{https://via.placeholder.com/800x800/10b981/ffffff?text=Delta%208ml%20Diamont%20De}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:38.568	2025-10-19 17:19:38.568	\N	\N
2defb366-edab-46b7-8ea6-36f1eeafbe5c	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Delta 8ml Diamont Delta 9 / 10 / 11 Tch A / P / X - Sativa	delta-8ml-diamont-delta-9-10-11-tch-a-p-x-sativa	Compre Delta 8ml Diamont Delta 9 / 10 / 11 Tch A / P / X - Sativa por R$ 300.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Efeito Sativa: Energizante e criativo, perfeito para uso diurno, socialização e produtividade. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	300.00	\N	\N	https://via.placeholder.com/800x800/10b981/ffffff?text=Delta%208ml%20Diamont%20De	{https://via.placeholder.com/800x800/10b981/ffffff?text=Delta%208ml%20Diamont%20De}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:39.081	2025-10-19 17:19:39.081	\N	\N
9593a2e1-e83f-4d51-867f-67ca19fa54cb	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Delta 8ml Diamont Delta 9 / 10 / 11 Thc A / P / X - Hibrida	delta-8ml-diamont-delta-9-10-11-thc-a-p-x-hibrida	Compre Delta 8ml Diamont Delta 9 / 10 / 11 Thc A / P / X - Hibrida por R$ 300.00 na America Cannabis. Vape de Delta THC de altíssima potência, testado em laboratório. Tecnologia de ponta para vapor suave e sabor premium. Cartucho descartável ou recarregável com bateria de longa duração. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	300.00	\N	\N	https://via.placeholder.com/800x800/10b981/ffffff?text=Delta%208ml%20Diamont%20De	{https://via.placeholder.com/800x800/10b981/ffffff?text=Delta%208ml%20Diamont%20De}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:39.6	2025-10-19 17:19:39.6	\N	\N
53c75a9c-36cc-4131-bfe4-b787bb4a5754	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	EigthSix 2ml Delta 8 / 9 - Indica	eigthsix-2ml-delta-8-9-indica	Compre EigthSix 2ml Delta 8 / 9 - Indica por R$ 300.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Efeito Indica: Relaxamento corporal profundo, ideal para alívio de dores, insônia e estresse. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	300.00	\N	\N	https://via.placeholder.com/800x800/10b981/ffffff?text=EigthSix%202ml%20Delta%208	{https://via.placeholder.com/800x800/10b981/ffffff?text=EigthSix%202ml%20Delta%208}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:40.129	2025-10-19 17:19:40.129	\N	\N
f09f966a-58fa-45b3-bdc5-c3314686dc53	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Cactus 6ml SixShot Delta 9 Thc A - Indica	cactus-6ml-sixshot-delta-9-thc-a-indica	Compre Cactus 6ml SixShot Delta 9 Thc A - Indica por R$ 700.00 na America Cannabis. Vape de Delta THC de altíssima potência, testado em laboratório. Tecnologia de ponta para vapor suave e sabor premium. Cartucho descartável ou recarregável com bateria de longa duração. Efeito Indica: Relaxamento corporal profundo, ideal para alívio de dores, insônia e estresse. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	700.00	\N	\N	https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=800	{https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=800}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:37.026	2025-10-19 17:27:08.243	\N	\N
13ca0371-8b95-4298-9308-e3ac2787789b	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Cactus 2ml Amanita Muscaria Cogumelo	cactus-2ml-amanita-muscaria-cogumelo	Compre Cactus 2ml Amanita Muscaria Cogumelo por R$ 400.00 na America Cannabis. Vape de cogumelo psicodélico de alta qualidade com THC-A. Experiência única e controlada, ideal para relaxamento profundo. Produto premium com ingredientes naturais e efeitos duradouros. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	400.00	\N	\N	https://images.unsplash.com/photo-1576776654949-0b0fad6c4e21?w=800	{https://images.unsplash.com/photo-1576776654949-0b0fad6c4e21?w=800}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:35.5	2025-10-19 17:27:08.868	\N	\N
9b31e3e7-19a2-498d-a85d-131f7854a338	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Stoney Cat Lemon Pez 3.5g	stoney-cat-lemon-pez-3-5g	Compre Stoney Cat Lemon Pez 3.5g por R$ 500.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	500.00	\N	\N	https://images.unsplash.com/photo-1615486511262-2558ca0cc2ea?w=800	{https://images.unsplash.com/photo-1615486511262-2558ca0cc2ea?w=800}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:31.383	2025-10-19 17:27:10.114	\N	\N
a5b38b9b-4b0c-4957-ab3f-ca250bffb489	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	EigthSix 2ml Delta 8 / 9 - Sativa	eigthsix-2ml-delta-8-9-sativa	Compre EigthSix 2ml Delta 8 / 9 - Sativa por R$ 300.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Efeito Sativa: Energizante e criativo, perfeito para uso diurno, socialização e produtividade. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	300.00	\N	\N	https://via.placeholder.com/800x800/10b981/ffffff?text=EigthSix%202ml%20Delta%208	{https://via.placeholder.com/800x800/10b981/ffffff?text=EigthSix%202ml%20Delta%208}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:40.65	2025-10-19 17:19:40.65	\N	\N
c75aeaf9-45a2-47f1-82ce-014e8c33669a	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Hallu Monkey 5ml Thc Delta 8 / 10 / 11 - Sativa	hallu-monkey-5ml-thc-delta-8-10-11-sativa	Compre Hallu Monkey 5ml Thc Delta 8 / 10 / 11 - Sativa por R$ 350.00 na America Cannabis. Vape de Delta THC de altíssima potência, testado em laboratório. Tecnologia de ponta para vapor suave e sabor premium. Cartucho descartável ou recarregável com bateria de longa duração. Efeito Sativa: Energizante e criativo, perfeito para uso diurno, socialização e produtividade. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	350.00	\N	\N	https://images.unsplash.com/photo-1608181715572-5c9d0f337a3f?w=800	{https://images.unsplash.com/photo-1608181715572-5c9d0f337a3f?w=800}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:43.74	2025-10-19 17:27:06.062	\N	\N
8d37c603-ed68-4b0d-a0a0-38f2f4552008	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Hallu Monkey 5ml Thc Delta 8 / 10 / 11 - Indica	hallu-monkey-5ml-thc-delta-8-10-11-indica	Compre Hallu Monkey 5ml Thc Delta 8 / 10 / 11 - Indica por R$ 350.00 na America Cannabis. Vape de Delta THC de altíssima potência, testado em laboratório. Tecnologia de ponta para vapor suave e sabor premium. Cartucho descartável ou recarregável com bateria de longa duração. Efeito Indica: Relaxamento corporal profundo, ideal para alívio de dores, insônia e estresse. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	350.00	\N	\N	https://images.unsplash.com/photo-1608181715572-5c9d0f337a3f?w=800	{https://images.unsplash.com/photo-1608181715572-5c9d0f337a3f?w=800}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:43.223	2025-10-19 17:27:06.37	\N	\N
2cdbe0d4-dc7e-439e-8b6f-98b4f9b5972d	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Hallu Monkey 5ml Thc Delta 8 / 10 / 11 - Hibrida	hallu-monkey-5ml-thc-delta-8-10-11-hibrida	Compre Hallu Monkey 5ml Thc Delta 8 / 10 / 11 - Hibrida por R$ 350.00 na America Cannabis. Vape de Delta THC de altíssima potência, testado em laboratório. Tecnologia de ponta para vapor suave e sabor premium. Cartucho descartável ou recarregável com bateria de longa duração. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	350.00	\N	\N	https://images.unsplash.com/photo-1608181715572-5c9d0f337a3f?w=800	{https://images.unsplash.com/photo-1608181715572-5c9d0f337a3f?w=800}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:42.711	2025-10-19 17:27:06.683	\N	\N
c00f9e6d-1324-4e79-9625-58fa3b85782b	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Hallu Monkey 2ml Thc Delta 8 Sativa	hallu-monkey-2ml-thc-delta-8-sativa	Compre Hallu Monkey 2ml Thc Delta 8 Sativa por R$ 350.00 na America Cannabis. Vape de Delta THC de altíssima potência, testado em laboratório. Tecnologia de ponta para vapor suave e sabor premium. Cartucho descartável ou recarregável com bateria de longa duração. Efeito Sativa: Energizante e criativo, perfeito para uso diurno, socialização e produtividade. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	350.00	\N	\N	https://images.unsplash.com/photo-1608181715572-5c9d0f337a3f?w=800	{https://images.unsplash.com/photo-1608181715572-5c9d0f337a3f?w=800}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:42.197	2025-10-19 17:27:06.992	\N	\N
bb0b1b1e-ba79-4a6c-8682-37abc882b696	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Hallu Monkey 2ml Thc Delta 8 Indica	hallu-monkey-2ml-thc-delta-8-indica	Compre Hallu Monkey 2ml Thc Delta 8 Indica por R$ 350.00 na America Cannabis. Vape de Delta THC de altíssima potência, testado em laboratório. Tecnologia de ponta para vapor suave e sabor premium. Cartucho descartável ou recarregável com bateria de longa duração. Efeito Indica: Relaxamento corporal profundo, ideal para alívio de dores, insônia e estresse. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	350.00	\N	\N	https://images.unsplash.com/photo-1608181715572-5c9d0f337a3f?w=800	{https://images.unsplash.com/photo-1608181715572-5c9d0f337a3f?w=800}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:41.68	2025-10-19 17:27:07.303	\N	\N
984b79f5-6b21-4df9-b2c5-26730c67205f	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Hallu Monkey 2ml Thc Delta 8 Hibrida	hallu-monkey-2ml-thc-delta-8-hibrida	Compre Hallu Monkey 2ml Thc Delta 8 Hibrida por R$ 350.00 na America Cannabis. Vape de Delta THC de altíssima potência, testado em laboratório. Tecnologia de ponta para vapor suave e sabor premium. Cartucho descartável ou recarregável com bateria de longa duração. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	350.00	\N	\N	https://images.unsplash.com/photo-1608181715572-5c9d0f337a3f?w=800	{https://images.unsplash.com/photo-1608181715572-5c9d0f337a3f?w=800}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:41.166	2025-10-19 17:27:07.617	\N	\N
bdc1c005-41ca-42b1-9410-97f7d22f023a	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Hidden Hills 2ml Refil Delta 9 Thc A / B / H /P / X - Hibrida	hidden-hills-2ml-refil-delta-9-thc-a-b-h-p-x-hibrida	Compre Hidden Hills 2ml Refil Delta 9 Thc A / B / H /P / X - Hibrida por R$ 420.00 na America Cannabis. Vape de Delta THC de altíssima potência, testado em laboratório. Tecnologia de ponta para vapor suave e sabor premium. Cartucho descartável ou recarregável com bateria de longa duração. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	420.00	\N	\N	https://cbd.market/cdn/shop/files/hidden-hills-thca-liquid-diamond-vape-2g-9-flavors-848_600x.jpg	{https://cbd.market/cdn/shop/files/hidden-hills-thca-liquid-diamond-vape-2g-9-flavors-848_600x.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:47.333	2025-10-19 17:27:03.884	\N	\N
a91b77a8-b364-44c1-8a9d-11c4682cefeb	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Hidden Hills 2ml PlugPlay Delta 9 Thc A / P / M - Indica	hidden-hills-2ml-plugplay-delta-9-thc-a-p-m-indica	Compre Hidden Hills 2ml PlugPlay Delta 9 Thc A / P / M - Indica por R$ 420.00 na America Cannabis. Vape de Delta THC de altíssima potência, testado em laboratório. Tecnologia de ponta para vapor suave e sabor premium. Cartucho descartável ou recarregável com bateria de longa duração. Efeito Indica: Relaxamento corporal profundo, ideal para alívio de dores, insônia e estresse. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	420.00	\N	\N	https://cbd.market/cdn/shop/files/hidden-hills-thca-liquid-diamond-vape-2g-9-flavors-848_600x.jpg	{https://cbd.market/cdn/shop/files/hidden-hills-thca-liquid-diamond-vape-2g-9-flavors-848_600x.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:46.303	2025-10-19 17:27:04.507	\N	\N
5c422e4f-64e0-4c90-b813-43e08b552ab9	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Hidden Hills 2ml PlugPlay Delta 9 Thc A / P / M - Hibrida	hidden-hills-2ml-plugplay-delta-9-thc-a-p-m-hibrida	Compre Hidden Hills 2ml PlugPlay Delta 9 Thc A / P / M - Hibrida por R$ 420.00 na America Cannabis. Vape de Delta THC de altíssima potência, testado em laboratório. Tecnologia de ponta para vapor suave e sabor premium. Cartucho descartável ou recarregável com bateria de longa duração. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	420.00	\N	\N	https://cbd.market/cdn/shop/files/hidden-hills-thca-liquid-diamond-vape-2g-9-flavors-848_600x.jpg	{https://cbd.market/cdn/shop/files/hidden-hills-thca-liquid-diamond-vape-2g-9-flavors-848_600x.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:45.793	2025-10-19 17:27:04.818	\N	\N
92843d42-1ced-4818-81aa-1a7364a71e0b	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Hidden Hills 2ml Delta 9 /11 Thc-A Ultra - Indica	hidden-hills-2ml-delta-9-11-thc-a-ultra-indica	Compre Hidden Hills 2ml Delta 9 /11 Thc-A Ultra - Indica por R$ 420.00 na America Cannabis. Vape de Delta THC de altíssima potência, testado em laboratório. Tecnologia de ponta para vapor suave e sabor premium. Cartucho descartável ou recarregável com bateria de longa duração. Efeito Indica: Relaxamento corporal profundo, ideal para alívio de dores, insônia e estresse. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	420.00	\N	\N	https://cbd.market/cdn/shop/files/hidden-hills-thca-liquid-diamond-vape-2g-9-flavors-848_600x.jpg	{https://cbd.market/cdn/shop/files/hidden-hills-thca-liquid-diamond-vape-2g-9-flavors-848_600x.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:44.768	2025-10-19 17:27:05.442	\N	\N
4ac5f8b2-67c8-4d14-877b-9270912ca239	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Pressure L.A 6ml Delta 9 Thc A / P - Indica	pressure-l-a-6ml-delta-9-thc-a-p-indica	Compre Pressure L.A 6ml Delta 9 Thc A / P - Indica por R$ 600.00 na America Cannabis. Vape de Delta THC de altíssima potência, testado em laboratório. Tecnologia de ponta para vapor suave e sabor premium. Cartucho descartável ou recarregável com bateria de longa duração. Efeito Indica: Relaxamento corporal profundo, ideal para alívio de dores, insônia e estresse. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	600.00	\N	\N	https://images.leafly.com/flower-images/pressure-platinum-kush.png	{https://images.leafly.com/flower-images/pressure-platinum-kush.png}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:50.936	2025-10-19 17:27:01.692	\N	\N
3f0852ca-4aa4-4270-9179-b0422960e9fc	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Pressure L.A 6ml Delta 9 Thc A / P - Hibrida	pressure-l-a-6ml-delta-9-thc-a-p-hibrida	Compre Pressure L.A 6ml Delta 9 Thc A / P - Hibrida por R$ 600.00 na America Cannabis. Vape de Delta THC de altíssima potência, testado em laboratório. Tecnologia de ponta para vapor suave e sabor premium. Cartucho descartável ou recarregável com bateria de longa duração. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	600.00	\N	\N	https://images.leafly.com/flower-images/pressure-platinum-kush.png	{https://images.leafly.com/flower-images/pressure-platinum-kush.png}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:50.412	2025-10-19 17:27:02.002	\N	\N
6a7ec56d-a0d4-4d94-b4d3-d906dbe6c18e	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Ignite 7ml 7000mg Diamont Thc A/P Delta 9 - Sativa	ignite-7ml-7000mg-diamont-thc-a-p-delta-9-sativa	Compre Ignite 7ml 7000mg Diamont Thc A/P Delta 9 - Sativa por R$ 700.00 na America Cannabis. Vape de Delta THC de altíssima potência, testado em laboratório. Tecnologia de ponta para vapor suave e sabor premium. Cartucho descartável ou recarregável com bateria de longa duração. Efeito Sativa: Energizante e criativo, perfeito para uso diurno, socialização e produtividade. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	700.00	\N	\N	https://cdn.shopify.com/s/files/1/0558/3340/6127/files/Ignite_Delta_8_Disposable_Vape_-_Blueberry_Kush_2g_480x480.jpg	{https://cdn.shopify.com/s/files/1/0558/3340/6127/files/Ignite_Delta_8_Disposable_Vape_-_Blueberry_Kush_2g_480x480.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:49.897	2025-10-19 17:27:02.314	\N	\N
dd18d0da-d26c-4357-b634-a6b9f4f5dbf1	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Ignite 7ml 7000mg Diamont Thc A/P Delta 9 - Hibrida	ignite-7ml-7000mg-diamont-thc-a-p-delta-9-hibrida	Compre Ignite 7ml 7000mg Diamont Thc A/P Delta 9 - Hibrida por R$ 700.00 na America Cannabis. Vape de Delta THC de altíssima potência, testado em laboratório. Tecnologia de ponta para vapor suave e sabor premium. Cartucho descartável ou recarregável com bateria de longa duração. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	700.00	\N	\N	https://cdn.shopify.com/s/files/1/0558/3340/6127/files/Ignite_Delta_8_Disposable_Vape_-_Blueberry_Kush_2g_480x480.jpg	{https://cdn.shopify.com/s/files/1/0558/3340/6127/files/Ignite_Delta_8_Disposable_Vape_-_Blueberry_Kush_2g_480x480.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:48.872	2025-10-19 17:27:02.943	\N	\N
5a4e153e-32fe-442d-bdec-62981fbe23ef	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Torch Dimound 5g Delta 9 Thc A/P Indica	torch-dimound-5g-delta-9-thc-a-p-indica	Compre Torch Dimound 5g Delta 9 Thc A/P Indica por R$ 600.00 na America Cannabis. Vape de Delta THC de altíssima potência, testado em laboratório. Tecnologia de ponta para vapor suave e sabor premium. Cartucho descartável ou recarregável com bateria de longa duração. Efeito Indica: Relaxamento corporal profundo, ideal para alívio de dores, insônia e estresse. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	600.00	\N	\N	https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg	{https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:56.561	2025-10-19 17:26:59.181	\N	\N
5541c2e8-2a9b-426a-9fe8-8d3388864077	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Snoop Dogg 3.5ml Delta 9 / 10 Thc - Sativa	snoop-dogg-3-5ml-delta-9-10-thc-sativa	Compre Snoop Dogg 3.5ml Delta 9 / 10 Thc - Sativa por R$ 450.00 na America Cannabis. Vape de Delta THC de altíssima potência, testado em laboratório. Tecnologia de ponta para vapor suave e sabor premium. Cartucho descartável ou recarregável com bateria de longa duração. Efeito Sativa: Energizante e criativo, perfeito para uso diurno, socialização e produtividade. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	450.00	\N	\N	https://everythingfor420.com/cdn/shop/files/SNOOP_20S_20DOGG_20VAPE_grande.jpg	{https://everythingfor420.com/cdn/shop/files/SNOOP_20S_20DOGG_20VAPE_grande.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:54.02	2025-10-19 17:26:59.81	\N	\N
07f2ce48-eb74-4564-bd06-fce5bc7df1c5	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Snoop Dogg 3.5ml Delta 9 / 10 Thc - Hibrida	snoop-dogg-3-5ml-delta-9-10-thc-hibrida	Compre Snoop Dogg 3.5ml Delta 9 / 10 Thc - Hibrida por R$ 450.00 na America Cannabis. Vape de Delta THC de altíssima potência, testado em laboratório. Tecnologia de ponta para vapor suave e sabor premium. Cartucho descartável ou recarregável com bateria de longa duração. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	450.00	\N	\N	https://everythingfor420.com/cdn/shop/files/SNOOP_20S_20DOGG_20VAPE_grande.jpg	{https://everythingfor420.com/cdn/shop/files/SNOOP_20S_20DOGG_20VAPE_grande.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:52.993	2025-10-19 17:27:00.437	\N	\N
926e90b4-c4b0-4d27-a56a-92abb303bdaa	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Pulse 5ml Digital Display Delta 9 Thc P Hhc P - Indica	pulse-5ml-digital-display-delta-9-thc-p-hhc-p-indica	Compre Pulse 5ml Digital Display Delta 9 Thc P Hhc P - Indica por R$ 600.00 na America Cannabis. Vape de Delta THC de altíssima potência, testado em laboratório. Tecnologia de ponta para vapor suave e sabor premium. Cartucho descartável ou recarregável com bateria de longa duração. Efeito Indica: Relaxamento corporal profundo, ideal para alívio de dores, insônia e estresse. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	600.00	\N	\N	https://images.unsplash.com/photo-1587976305342-c47b6d2b7025?w=800	{https://images.unsplash.com/photo-1587976305342-c47b6d2b7025?w=800}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:52.473	2025-10-19 17:27:00.759	\N	\N
422ff88f-c13a-40c8-a0d1-ef347493ecc6	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Tree House 2ml Delta 8 / 9 / 10 Thc A - Hibrida	tree-house-2ml-delta-8-9-10-thc-a-hibrida	Compre Tree House 2ml Delta 8 / 9 / 10 Thc A - Hibrida por R$ 400.00 na America Cannabis. Vape de Delta THC de altíssima potência, testado em laboratório. Tecnologia de ponta para vapor suave e sabor premium. Cartucho descartável ou recarregável com bateria de longa duração. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	400.00	\N	\N	https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=800	{https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=800}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:57.585	2025-10-19 17:26:58.548	\N	\N
771e7ac7-f761-4640-866e-1f4bc1533f3d	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Torch Dimound 5g Delta 9 Thc A/P Sativa	torch-dimound-5g-delta-9-thc-a-p-sativa	Compre Torch Dimound 5g Delta 9 Thc A/P Sativa por R$ 600.00 na America Cannabis. Vape de Delta THC de altíssima potência, testado em laboratório. Tecnologia de ponta para vapor suave e sabor premium. Cartucho descartável ou recarregável com bateria de longa duração. Efeito Sativa: Energizante e criativo, perfeito para uso diurno, socialização e produtividade. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	600.00	\N	\N	https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg	{https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:57.075	2025-10-19 17:26:58.867	\N	\N
e8110ae0-2dee-48f4-a29d-2bf4d7daf805	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Torch Dimound 5g Delta 9 Thc A/P Hibrida	torch-dimound-5g-delta-9-thc-a-p-hibrida	Compre Torch Dimound 5g Delta 9 Thc A/P Hibrida por R$ 600.00 na America Cannabis. Vape de Delta THC de altíssima potência, testado em laboratório. Tecnologia de ponta para vapor suave e sabor premium. Cartucho descartável ou recarregável com bateria de longa duração. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	600.00	\N	\N	https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg	{https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:56.043	2025-10-19 17:26:59.491	\N	\N
034e340b-51fa-4809-9cf7-abc7b882e9ff	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Snoop Dogg 3.5ml Delta 9 / 10 Thc - Indica	snoop-dogg-3-5ml-delta-9-10-thc-indica	Compre Snoop Dogg 3.5ml Delta 9 / 10 Thc - Indica por R$ 450.00 na America Cannabis. Vape de Delta THC de altíssima potência, testado em laboratório. Tecnologia de ponta para vapor suave e sabor premium. Cartucho descartável ou recarregável com bateria de longa duração. Efeito Indica: Relaxamento corporal profundo, ideal para alívio de dores, insônia e estresse. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	450.00	\N	\N	https://everythingfor420.com/cdn/shop/files/SNOOP_20S_20DOGG_20VAPE_grande.jpg	{https://everythingfor420.com/cdn/shop/files/SNOOP_20S_20DOGG_20VAPE_grande.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:53.506	2025-10-19 17:27:00.127	\N	\N
fd6fae4b-d0c9-441a-a098-4247efa4489c	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Pulse 5ml Digital Display Delta 9 Thc P Hhc P - Hibrida	pulse-5ml-digital-display-delta-9-thc-p-hhc-p-hibrida	Compre Pulse 5ml Digital Display Delta 9 Thc P Hhc P - Hibrida por R$ 600.00 na America Cannabis. Vape de Delta THC de altíssima potência, testado em laboratório. Tecnologia de ponta para vapor suave e sabor premium. Cartucho descartável ou recarregável com bateria de longa duração. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	600.00	\N	\N	https://images.unsplash.com/photo-1587976305342-c47b6d2b7025?w=800	{https://images.unsplash.com/photo-1587976305342-c47b6d2b7025?w=800}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:51.96	2025-10-19 17:27:01.071	\N	\N
94a3bf1a-b208-46ef-bcd1-2af21843019d	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Pressure L.A 6ml Delta 9 Thc A / P - Sativa	pressure-l-a-6ml-delta-9-thc-a-p-sativa	Compre Pressure L.A 6ml Delta 9 Thc A / P - Sativa por R$ 600.00 na America Cannabis. Vape de Delta THC de altíssima potência, testado em laboratório. Tecnologia de ponta para vapor suave e sabor premium. Cartucho descartável ou recarregável com bateria de longa duração. Efeito Sativa: Energizante e criativo, perfeito para uso diurno, socialização e produtividade. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	600.00	\N	\N	https://images.leafly.com/flower-images/pressure-platinum-kush.png	{https://images.leafly.com/flower-images/pressure-platinum-kush.png}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:51.447	2025-10-19 17:27:01.382	\N	\N
74093060-b6dd-4079-9e39-083950e4ce95	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Cactus 6ml SixShot Delta 9 Thc A - Hibrida	cactus-6ml-sixshot-delta-9-thc-a-hibrida	Compre Cactus 6ml SixShot Delta 9 Thc A - Hibrida por R$ 700.00 na America Cannabis. Vape de Delta THC de altíssima potência, testado em laboratório. Tecnologia de ponta para vapor suave e sabor premium. Cartucho descartável ou recarregável com bateria de longa duração. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	700.00	\N	\N	https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=800	{https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=800}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:36.513	2025-10-19 17:27:08.555	\N	\N
bb6e0e0e-d04e-4741-a2d4-ee6907b8ec40	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Ignite 7ml 7000mg Diamont Thc A/P Delta 9 - Indica	ignite-7ml-7000mg-diamont-thc-a-p-delta-9-indica	Compre Ignite 7ml 7000mg Diamont Thc A/P Delta 9 - Indica por R$ 700.00 na America Cannabis. Vape de Delta THC de altíssima potência, testado em laboratório. Tecnologia de ponta para vapor suave e sabor premium. Cartucho descartável ou recarregável com bateria de longa duração. Efeito Indica: Relaxamento corporal profundo, ideal para alívio de dores, insônia e estresse. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	700.00	\N	\N	https://cdn.shopify.com/s/files/1/0558/3340/6127/files/Ignite_Delta_8_Disposable_Vape_-_Blueberry_Kush_2g_480x480.jpg	{https://cdn.shopify.com/s/files/1/0558/3340/6127/files/Ignite_Delta_8_Disposable_Vape_-_Blueberry_Kush_2g_480x480.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:49.385	2025-10-19 17:27:02.627	\N	\N
6e1506ff-25ea-4f76-b11a-950390ef8bc4	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Hidden Hills 2ml Refil Delta 9 Thc A / B / H /P / X - Sativa	hidden-hills-2ml-refil-delta-9-thc-a-b-h-p-x-sativa	Compre Hidden Hills 2ml Refil Delta 9 Thc A / B / H /P / X - Sativa por R$ 420.00 na America Cannabis. Vape de Delta THC de altíssima potência, testado em laboratório. Tecnologia de ponta para vapor suave e sabor premium. Cartucho descartável ou recarregável com bateria de longa duração. Efeito Sativa: Energizante e criativo, perfeito para uso diurno, socialização e produtividade. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	420.00	\N	\N	https://cbd.market/cdn/shop/files/hidden-hills-thca-liquid-diamond-vape-2g-9-flavors-848_600x.jpg	{https://cbd.market/cdn/shop/files/hidden-hills-thca-liquid-diamond-vape-2g-9-flavors-848_600x.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:48.36	2025-10-19 17:27:03.253	\N	\N
80350fce-7c8e-4197-a1b5-30cd4c5837dc	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Hidden Hills 2ml Refil Delta 9 Thc A / B / H /P / X - Indica	hidden-hills-2ml-refil-delta-9-thc-a-b-h-p-x-indica	Compre Hidden Hills 2ml Refil Delta 9 Thc A / B / H /P / X - Indica por R$ 420.00 na America Cannabis. Vape de Delta THC de altíssima potência, testado em laboratório. Tecnologia de ponta para vapor suave e sabor premium. Cartucho descartável ou recarregável com bateria de longa duração. Efeito Indica: Relaxamento corporal profundo, ideal para alívio de dores, insônia e estresse. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	420.00	\N	\N	https://cbd.market/cdn/shop/files/hidden-hills-thca-liquid-diamond-vape-2g-9-flavors-848_600x.jpg	{https://cbd.market/cdn/shop/files/hidden-hills-thca-liquid-diamond-vape-2g-9-flavors-848_600x.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:47.846	2025-10-19 17:27:03.569	\N	\N
3eeace7a-dac1-4d77-9136-82728533f2d8	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Hidden Hills 2ml PlugPlay Delta 9 Thc A / P / M - Sativa	hidden-hills-2ml-plugplay-delta-9-thc-a-p-m-sativa	Compre Hidden Hills 2ml PlugPlay Delta 9 Thc A / P / M - Sativa por R$ 420.00 na America Cannabis. Vape de Delta THC de altíssima potência, testado em laboratório. Tecnologia de ponta para vapor suave e sabor premium. Cartucho descartável ou recarregável com bateria de longa duração. Efeito Sativa: Energizante e criativo, perfeito para uso diurno, socialização e produtividade. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	420.00	\N	\N	https://cbd.market/cdn/shop/files/hidden-hills-thca-liquid-diamond-vape-2g-9-flavors-848_600x.jpg	{https://cbd.market/cdn/shop/files/hidden-hills-thca-liquid-diamond-vape-2g-9-flavors-848_600x.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:46.817	2025-10-19 17:27:04.196	\N	\N
4dd941b3-a85c-4f42-a473-753d79104c1f	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Hidden Hills 2ml Delta 9 /11 Thc-A Ultra - Sativa	hidden-hills-2ml-delta-9-11-thc-a-ultra-sativa	Compre Hidden Hills 2ml Delta 9 /11 Thc-A Ultra - Sativa por R$ 420.00 na America Cannabis. Vape de Delta THC de altíssima potência, testado em laboratório. Tecnologia de ponta para vapor suave e sabor premium. Cartucho descartável ou recarregável com bateria de longa duração. Efeito Sativa: Energizante e criativo, perfeito para uso diurno, socialização e produtividade. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	420.00	\N	\N	https://cbd.market/cdn/shop/files/hidden-hills-thca-liquid-diamond-vape-2g-9-flavors-848_600x.jpg	{https://cbd.market/cdn/shop/files/hidden-hills-thca-liquid-diamond-vape-2g-9-flavors-848_600x.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:45.284	2025-10-19 17:27:05.129	\N	\N
cf5a6e9e-503c-4bb3-b686-79a58fe40833	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Hidden Hills 2ml Delta 9 /11 Thc-A Ultra - Hibrida	hidden-hills-2ml-delta-9-11-thc-a-ultra-hibrida	Compre Hidden Hills 2ml Delta 9 /11 Thc-A Ultra - Hibrida por R$ 420.00 na America Cannabis. Vape de Delta THC de altíssima potência, testado em laboratório. Tecnologia de ponta para vapor suave e sabor premium. Cartucho descartável ou recarregável com bateria de longa duração. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	420.00	\N	\N	https://cbd.market/cdn/shop/files/hidden-hills-thca-liquid-diamond-vape-2g-9-flavors-848_600x.jpg	{https://cbd.market/cdn/shop/files/hidden-hills-thca-liquid-diamond-vape-2g-9-flavors-848_600x.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:44.254	2025-10-19 17:27:05.753	\N	\N
cb065f50-9362-4626-a34e-9263d8c99dca	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Cactus 6ml SixShot Delta 9 Thc A - Sativa	cactus-6ml-sixshot-delta-9-thc-a-sativa	Compre Cactus 6ml SixShot Delta 9 Thc A - Sativa por R$ 700.00 na America Cannabis. Vape de Delta THC de altíssima potência, testado em laboratório. Tecnologia de ponta para vapor suave e sabor premium. Cartucho descartável ou recarregável com bateria de longa duração. Efeito Sativa: Energizante e criativo, perfeito para uso diurno, socialização e produtividade. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	700.00	\N	\N	https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=800	{https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=800}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:37.539	2025-10-19 17:27:07.931	\N	\N
acc80f3f-f0a3-4245-9326-18bcc66f26fa	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Torch x Grdnt Blue Raspberry - Sat 5g	torch-x-grdnt-blue-raspberry-sat-5g	Compre Torch x Grdnt Blue Raspberry - Sat 5g por R$ 600.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Efeito Sativa: Energizante e criativo, perfeito para uso diurno, socialização e produtividade. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	600.00	\N	\N	https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg	{https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:27.267	2025-10-19 17:27:11.367	\N	\N
9107174f-2b9f-4009-9529-ffc469501612	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Torch Ind Grape Gelato 7.5g	torch-ind-grape-gelato-7-5g	Compre Torch Ind Grape Gelato 7.5g por R$ 750.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Efeito Indica: Relaxamento corporal profundo, ideal para alívio de dores, insônia e estresse. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	750.00	\N	\N	https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg	{https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:25.724	2025-10-19 17:27:12.305	\N	\N
e4dce090-7915-4f4f-8d3c-604b3d55aa71	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Torch Ind 2 Sabores 4g	torch-ind-2-sabores-4g	Compre Torch Ind 2 Sabores 4g por R$ 500.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Efeito Indica: Relaxamento corporal profundo, ideal para alívio de dores, insônia e estresse. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	500.00	\N	\N	https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg	{https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:24.692	2025-10-19 17:27:12.927	\N	\N
cb482d1a-124d-4872-bb66-3954e632ceb6	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Torch Cogumelo Thc-A Tropical Trippy Twist - Sat 3.5ml	torch-cogumelo-thc-a-tropical-trippy-twist-sat-3-5ml	Compre Torch Cogumelo Thc-A Tropical Trippy Twist - Sat 3.5ml por R$ 450.00 na America Cannabis. Vape de cogumelo psicodélico de alta qualidade com THC-A. Experiência única e controlada, ideal para relaxamento profundo. Produto premium com ingredientes naturais e efeitos duradouros. Efeito Sativa: Energizante e criativo, perfeito para uso diurno, socialização e produtividade. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	450.00	\N	\N	https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg	{https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:23.155	2025-10-19 17:27:13.858	\N	\N
0f879835-33e9-4acb-ad05-1bbbd747d315	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Torch Cherry Banana - Hyb 5g	torch-cherry-banana-hyb-5g	Compre Torch Cherry Banana - Hyb 5g por R$ 600.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Efeito Híbrido: Equilíbrio perfeito entre relaxamento e energia, versátil para qualquer momento. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	600.00	\N	\N	https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg	{https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:22.133	2025-10-19 17:27:14.483	\N	\N
7dee1459-5e46-4ef6-8b6e-64d3d839fcfd	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Torch Banana Haze 7.5g	torch-banana-haze-7-5g	Compre Torch Banana Haze 7.5g por R$ 750.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	750.00	\N	\N	https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg	{https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:21.106	2025-10-19 17:27:15.107	\N	\N
51318a57-3390-4a97-a3dc-e86120126226	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Torch 2.2g Diamond Pink Rozay - Hyb	torch-2-2g-diamond-pink-rozay-hyb	Compre Torch 2.2g Diamond Pink Rozay - Hyb por R$ 400.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Efeito Híbrido: Equilíbrio perfeito entre relaxamento e energia, versátil para qualquer momento. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	400.00	\N	\N	https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg	{https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:19.051	2025-10-19 17:27:16.359	\N	\N
2dd74fb5-12e7-43b1-9aa6-bc37f606388c	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Hallu 3g Super Lemon Haze Sativa	hallu-3g-super-lemon-haze-sativa	Compre Hallu 3g Super Lemon Haze Sativa por R$ 450.00 na America Cannabis. Produto premium de cannabis com altíssima qualidade e pureza. Testado em laboratório, 100% legal e com certificação de origem. Efeitos potentes e duradouros para uma experiência única. Efeito Sativa: Energizante e criativo, perfeito para uso diurno, socialização e produtividade. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	450.00	\N	\N	https://images.unsplash.com/photo-1608181715572-5c9d0f337a3f?w=800	{https://images.unsplash.com/photo-1608181715572-5c9d0f337a3f?w=800}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:14.394	2025-10-19 17:27:18.852	\N	\N
2574e74f-8c16-4104-899a-d7f67c9ff027	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Torch Cogumelo Thc-A Shaman Sauce - Ind 3.5ml	torch-cogumelo-thc-a-shaman-sauce-ind-3-5ml	Compre Torch Cogumelo Thc-A Shaman Sauce - Ind 3.5ml por R$ 450.00 na America Cannabis. Vape de cogumelo psicodélico de alta qualidade com THC-A. Experiência única e controlada, ideal para relaxamento profundo. Produto premium com ingredientes naturais e efeitos duradouros. Efeito Indica: Relaxamento corporal profundo, ideal para alívio de dores, insônia e estresse. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	450.00	\N	\N	https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg	{https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:10.268	2025-10-19 17:27:21.342	\N	\N
09022e67-b7cb-4e3f-8d4b-9d387b870a89	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Torch Cogumelo Thc-A Electric Lemon G - Sat 3.5ml	torch-cogumelo-thc-a-electric-lemon-g-sat-3-5ml	Compre Torch Cogumelo Thc-A Electric Lemon G - Sat 3.5ml por R$ 450.00 na America Cannabis. Vape de cogumelo psicodélico de alta qualidade com THC-A. Experiência única e controlada, ideal para relaxamento profundo. Produto premium com ingredientes naturais e efeitos duradouros. Efeito Sativa: Energizante e criativo, perfeito para uso diurno, socialização e produtividade. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	450.00	\N	\N	https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg	{https://cdn11.bigcommerce.com/s-nihq3s5lmk/images/stencil/1280x1280/products/32478/40094/Torch-Diamond-THCA-Dispo-min__54128.1712083733.jpg}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:09.249	2025-10-19 17:27:21.963	\N	\N
88ffe63f-b8bd-42ca-8bb3-cb3e466661b3	0fb61585-3cb3-48b3-ae76-0a5358084a8c	\N	Goma Mike Tysson 25mg x1 Gummy Pack 20un Delta 9 Thc	goma-mike-tysson-25mg-x1-gummy-pack-20un-delta-9-thc	Compre Goma Mike Tysson 25mg x1 Gummy Pack 20un Delta 9 Thc por R$ 300.00 na America Cannabis. Gomas de THC premium com dosagem precisa, sabor incrível e efeitos potentes. Perfeito para quem busca discrição e praticidade no consumo. Gummies testados em laboratório, 100% legais e com entrega em todo Brasil. Entrega rápida e discreta em todo Brasil. Compre com segurança na America Cannabis - A maior loja de cannabis premium do Brasil. Atendimento especializado via WhatsApp. Garantia de satisfação ou seu dinheiro de volta.	\N	300.00	\N	\N	https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=800	{https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=800}	0	\N	t	5	t	f	\N	\N	\N	0	0	2025-10-19 17:19:08.227	2025-10-19 17:27:22.591	\N	\N
\.


--
-- Data for Name: ProductBenefit; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProductBenefit" (id, "productId", icon, title, description, "order", "createdAt") FROM stdin;
\.


--
-- Data for Name: ProductFAQ; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProductFAQ" (id, "productId", question, answer, "isActive", "order", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: ProductRelation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProductRelation" (id, "fromId", "toId", type, "createdAt") FROM stdin;
\.


--
-- Data for Name: ProductTag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProductTag" (id, "productId", "tagId", "createdAt") FROM stdin;
\.


--
-- Data for Name: ProductVariant; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProductVariant" (id, "productId", name, sku, price, stock, "imageUrl", options, "isActive", "order", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Review; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Review" (id, "productId", "customerId", rating, title, comment, "isApproved", "isVerified", helpful, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Tag" (id, name, slug, "createdAt", "updatedAt") FROM stdin;
de15ba7f-dccc-4558-96f2-6b1f4091d769	Orgânico	organico	2025-10-16 04:43:27.959	2025-10-16 04:43:27.959
3033d07b-b46f-40e9-ac36-129734c2f635	Premium	premium	2025-10-16 04:43:27.962	2025-10-16 04:43:27.962
b47aa712-5a13-4d4e-9ed8-60bb5b1d3a22	Best Seller	best-seller	2025-10-16 04:43:27.963	2025-10-16 04:43:27.963
57ea7a71-b169-4ca8-b2d0-ae247684916c	Novo	novo	2025-10-16 04:43:27.964	2025-10-16 04:43:27.964
5c4b2d3c-8e3b-4398-b0db-1679f01d532f	Em Promoção	em-promocao	2025-10-16 04:43:27.965	2025-10-16 04:43:27.965
01bceacb-4b40-47c3-978a-175f3c4748a0	Full Spectrum	full-spectrum	2025-10-16 04:43:27.965	2025-10-16 04:43:27.965
9ef84697-bc97-4675-a318-6c6a24029d67	Isolado	isolado	2025-10-16 04:43:27.966	2025-10-16 04:43:27.966
\.


--
-- Data for Name: Tenant; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Tenant" (id, slug, name, domain, "isActive", "createdAt", "updatedAt") FROM stdin;
0fb61585-3cb3-48b3-ae76-0a5358084a8c	americacannabis	America Cannabis	localhost:5178	t	2025-10-16 04:43:27.872	2025-10-16 04:43:27.872
\.


--
-- Data for Name: TenantConfig; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TenantConfig" (id, "tenantId", "siteName", "primaryColor", logo, favicon, email, phone, "whatsappNumber", "metaTitle", "metaDescription", "metaKeywords", "enableReviews", "enableWishlist", "enableNewsletter", "enableCoupons", currency, language, timezone, "createdAt", "updatedAt", "allowGuestReviews", "enableProductFAQ", "enableUrgency", "enableViewCount", "enableZoom", "privacyPolicy", "relatedProductsCount", "requireApproval", "returnPolicy", "shippingPolicy", "showRelatedProducts", "socialProofText", "termsOfService", "trustBadges", "urgencyThreshold", "enableDefaultReviews", "enableGlobalBenefits", "accentColor", "backgroundColor", "secondaryColor", "textColor", "googleAnalyticsId", "googleTagManagerId", "metaPixelId") FROM stdin;
f4622232-e8e4-4734-812f-22feafc34048	0fb61585-3cb3-48b3-ae76-0a5358084a8c	America Cannabis	#2D1B4E	\N	\N	contato@americacannabis.com	+55 11 99999-9999	595982574068	America Cannabis - Produtos Premium de Cannabis	Produtos de cannabis premium de alta qualidade. CBD Oil, Hemp Flowers, extratos e muito mais.	cannabis, CBD, hemp, óleo CBD, flores hemp	t	t	t	t	BRL	pt-BR	America/Sao_Paulo	2025-10-16 04:43:27.89	2025-10-22 15:48:17.116	f	t	t	f	t	\N	4	t	\N	\N	t	\N	\N	\N	5	f	f	#5FAD56	#FFFFFF	#6B5435	#1A1A1A	\N	\N	\N
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, "tenantId", email, password, name, role, "isActive", "createdAt", "updatedAt") FROM stdin;
fbe501ae-7c2d-47a4-b616-a74cc7799600	0fb61585-3cb3-48b3-ae76-0a5358084a8c	admin@americacannabis.com	$2b$10$s5tqzcDHjmsJTbAAR3TeP.6sxW8sD1sPtCxkYCIZXrzYMORCHt27y	Administrador	admin	t	2025-10-16 04:43:27.949	2025-10-16 04:43:27.949
95d1e2c3-e9ed-40bb-a4eb-e96f971b9efd	0fb61585-3cb3-48b3-ae76-0a5358084a8c	admin@americacannabiss.com	$2b$10$otTsR9FHghsDkDV9U9RyjONcqjXpV88HKptwCTuN7x.Aj0i8ezFci	Administrator	admin	t	2025-10-19 17:17:46.521	2025-10-22 14:59:40.698
\.


--
-- Data for Name: WishlistItem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."WishlistItem" (id, "customerId", "productId", "createdAt") FROM stdin;
\.


--
-- Name: Banner Banner_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Banner"
    ADD CONSTRAINT "Banner_pkey" PRIMARY KEY (id);


--
-- Name: Brand Brand_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Brand"
    ADD CONSTRAINT "Brand_pkey" PRIMARY KEY (id);


--
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- Name: Coupon Coupon_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Coupon"
    ADD CONSTRAINT "Coupon_pkey" PRIMARY KEY (id);


--
-- Name: Customer Customer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Customer"
    ADD CONSTRAINT "Customer_pkey" PRIMARY KEY (id);


--
-- Name: DefaultReview DefaultReview_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DefaultReview"
    ADD CONSTRAINT "DefaultReview_pkey" PRIMARY KEY (id);


--
-- Name: GlobalBenefit GlobalBenefit_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GlobalBenefit"
    ADD CONSTRAINT "GlobalBenefit_pkey" PRIMARY KEY (id);


--
-- Name: Newsletter Newsletter_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Newsletter"
    ADD CONSTRAINT "Newsletter_pkey" PRIMARY KEY (id);


--
-- Name: OrderItem OrderItem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_pkey" PRIMARY KEY (id);


--
-- Name: Order Order_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (id);


--
-- Name: ProductBenefit ProductBenefit_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductBenefit"
    ADD CONSTRAINT "ProductBenefit_pkey" PRIMARY KEY (id);


--
-- Name: ProductFAQ ProductFAQ_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductFAQ"
    ADD CONSTRAINT "ProductFAQ_pkey" PRIMARY KEY (id);


--
-- Name: ProductRelation ProductRelation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductRelation"
    ADD CONSTRAINT "ProductRelation_pkey" PRIMARY KEY (id);


--
-- Name: ProductTag ProductTag_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductTag"
    ADD CONSTRAINT "ProductTag_pkey" PRIMARY KEY (id);


--
-- Name: ProductVariant ProductVariant_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductVariant"
    ADD CONSTRAINT "ProductVariant_pkey" PRIMARY KEY (id);


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- Name: Review Review_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_pkey" PRIMARY KEY (id);


--
-- Name: Tag Tag_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tag"
    ADD CONSTRAINT "Tag_pkey" PRIMARY KEY (id);


--
-- Name: TenantConfig TenantConfig_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TenantConfig"
    ADD CONSTRAINT "TenantConfig_pkey" PRIMARY KEY (id);


--
-- Name: Tenant Tenant_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tenant"
    ADD CONSTRAINT "Tenant_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: WishlistItem WishlistItem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WishlistItem"
    ADD CONSTRAINT "WishlistItem_pkey" PRIMARY KEY (id);


--
-- Name: Banner_categoryId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Banner_categoryId_idx" ON public."Banner" USING btree ("categoryId");


--
-- Name: Banner_tenantId_type_isActive_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Banner_tenantId_type_isActive_idx" ON public."Banner" USING btree ("tenantId", type, "isActive");


--
-- Name: Brand_slug_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Brand_slug_idx" ON public."Brand" USING btree (slug);


--
-- Name: Brand_tenantId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Brand_tenantId_idx" ON public."Brand" USING btree ("tenantId");


--
-- Name: Brand_tenantId_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Brand_tenantId_slug_key" ON public."Brand" USING btree ("tenantId", slug);


--
-- Name: Category_slug_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Category_slug_idx" ON public."Category" USING btree (slug);


--
-- Name: Category_tenantId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Category_tenantId_idx" ON public."Category" USING btree ("tenantId");


--
-- Name: Category_tenantId_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Category_tenantId_slug_key" ON public."Category" USING btree ("tenantId", slug);


--
-- Name: Coupon_code_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Coupon_code_idx" ON public."Coupon" USING btree (code);


--
-- Name: Coupon_isActive_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Coupon_isActive_idx" ON public."Coupon" USING btree ("isActive");


--
-- Name: Coupon_tenantId_code_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Coupon_tenantId_code_key" ON public."Coupon" USING btree ("tenantId", code);


--
-- Name: Coupon_tenantId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Coupon_tenantId_idx" ON public."Coupon" USING btree ("tenantId");


--
-- Name: Customer_email_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Customer_email_idx" ON public."Customer" USING btree (email);


--
-- Name: Customer_tenantId_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Customer_tenantId_email_key" ON public."Customer" USING btree ("tenantId", email);


--
-- Name: Customer_tenantId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Customer_tenantId_idx" ON public."Customer" USING btree ("tenantId");


--
-- Name: DefaultReview_isFeatured_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "DefaultReview_isFeatured_idx" ON public."DefaultReview" USING btree ("isFeatured");


--
-- Name: DefaultReview_resultType_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "DefaultReview_resultType_idx" ON public."DefaultReview" USING btree ("resultType");


--
-- Name: DefaultReview_showOnHome_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "DefaultReview_showOnHome_idx" ON public."DefaultReview" USING btree ("showOnHome");


--
-- Name: DefaultReview_showOnProducts_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "DefaultReview_showOnProducts_idx" ON public."DefaultReview" USING btree ("showOnProducts");


--
-- Name: DefaultReview_tenantId_isActive_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "DefaultReview_tenantId_isActive_idx" ON public."DefaultReview" USING btree ("tenantId", "isActive");


--
-- Name: GlobalBenefit_tenantId_isActive_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "GlobalBenefit_tenantId_isActive_idx" ON public."GlobalBenefit" USING btree ("tenantId", "isActive");


--
-- Name: Newsletter_email_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Newsletter_email_idx" ON public."Newsletter" USING btree (email);


--
-- Name: Newsletter_tenantId_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Newsletter_tenantId_email_key" ON public."Newsletter" USING btree ("tenantId", email);


--
-- Name: Newsletter_tenantId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Newsletter_tenantId_idx" ON public."Newsletter" USING btree ("tenantId");


--
-- Name: OrderItem_orderId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "OrderItem_orderId_idx" ON public."OrderItem" USING btree ("orderId");


--
-- Name: OrderItem_productId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "OrderItem_productId_idx" ON public."OrderItem" USING btree ("productId");


--
-- Name: Order_createdAt_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Order_createdAt_idx" ON public."Order" USING btree ("createdAt");


--
-- Name: Order_customerId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Order_customerId_idx" ON public."Order" USING btree ("customerId");


--
-- Name: Order_orderNumber_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Order_orderNumber_idx" ON public."Order" USING btree ("orderNumber");


--
-- Name: Order_orderNumber_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Order_orderNumber_key" ON public."Order" USING btree ("orderNumber");


--
-- Name: Order_status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Order_status_idx" ON public."Order" USING btree (status);


--
-- Name: Order_tenantId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Order_tenantId_idx" ON public."Order" USING btree ("tenantId");


--
-- Name: ProductBenefit_productId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "ProductBenefit_productId_idx" ON public."ProductBenefit" USING btree ("productId");


--
-- Name: ProductFAQ_isActive_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "ProductFAQ_isActive_idx" ON public."ProductFAQ" USING btree ("isActive");


--
-- Name: ProductFAQ_productId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "ProductFAQ_productId_idx" ON public."ProductFAQ" USING btree ("productId");


--
-- Name: ProductRelation_fromId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "ProductRelation_fromId_idx" ON public."ProductRelation" USING btree ("fromId");


--
-- Name: ProductRelation_fromId_toId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "ProductRelation_fromId_toId_key" ON public."ProductRelation" USING btree ("fromId", "toId");


--
-- Name: ProductRelation_toId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "ProductRelation_toId_idx" ON public."ProductRelation" USING btree ("toId");


--
-- Name: ProductTag_productId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "ProductTag_productId_idx" ON public."ProductTag" USING btree ("productId");


--
-- Name: ProductTag_productId_tagId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "ProductTag_productId_tagId_key" ON public."ProductTag" USING btree ("productId", "tagId");


--
-- Name: ProductTag_tagId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "ProductTag_tagId_idx" ON public."ProductTag" USING btree ("tagId");


--
-- Name: ProductVariant_productId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "ProductVariant_productId_idx" ON public."ProductVariant" USING btree ("productId");


--
-- Name: ProductVariant_sku_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "ProductVariant_sku_idx" ON public."ProductVariant" USING btree (sku);


--
-- Name: Product_brandId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Product_brandId_idx" ON public."Product" USING btree ("brandId");


--
-- Name: Product_categoryId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Product_categoryId_idx" ON public."Product" USING btree ("categoryId");


--
-- Name: Product_isActive_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Product_isActive_idx" ON public."Product" USING btree ("isActive");


--
-- Name: Product_isFeatured_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Product_isFeatured_idx" ON public."Product" USING btree ("isFeatured");


--
-- Name: Product_slug_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Product_slug_idx" ON public."Product" USING btree (slug);


--
-- Name: Product_tenantId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Product_tenantId_idx" ON public."Product" USING btree ("tenantId");


--
-- Name: Product_tenantId_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Product_tenantId_slug_key" ON public."Product" USING btree ("tenantId", slug);


--
-- Name: Product_type_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Product_type_idx" ON public."Product" USING btree (type);


--
-- Name: Review_customerId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Review_customerId_idx" ON public."Review" USING btree ("customerId");


--
-- Name: Review_isApproved_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Review_isApproved_idx" ON public."Review" USING btree ("isApproved");


--
-- Name: Review_productId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Review_productId_idx" ON public."Review" USING btree ("productId");


--
-- Name: Tag_slug_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Tag_slug_idx" ON public."Tag" USING btree (slug);


--
-- Name: Tag_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Tag_slug_key" ON public."Tag" USING btree (slug);


--
-- Name: TenantConfig_tenantId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "TenantConfig_tenantId_key" ON public."TenantConfig" USING btree ("tenantId");


--
-- Name: Tenant_domain_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Tenant_domain_idx" ON public."Tenant" USING btree (domain);


--
-- Name: Tenant_domain_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Tenant_domain_key" ON public."Tenant" USING btree (domain);


--
-- Name: Tenant_slug_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Tenant_slug_idx" ON public."Tenant" USING btree (slug);


--
-- Name: Tenant_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Tenant_slug_key" ON public."Tenant" USING btree (slug);


--
-- Name: User_email_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "User_email_idx" ON public."User" USING btree (email);


--
-- Name: User_tenantId_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_tenantId_email_key" ON public."User" USING btree ("tenantId", email);


--
-- Name: WishlistItem_customerId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WishlistItem_customerId_idx" ON public."WishlistItem" USING btree ("customerId");


--
-- Name: WishlistItem_customerId_productId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "WishlistItem_customerId_productId_key" ON public."WishlistItem" USING btree ("customerId", "productId");


--
-- Name: WishlistItem_productId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WishlistItem_productId_idx" ON public."WishlistItem" USING btree ("productId");


--
-- Name: Banner Banner_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Banner"
    ADD CONSTRAINT "Banner_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Category Category_parentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Category Category_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenant"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Coupon Coupon_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Coupon"
    ADD CONSTRAINT "Coupon_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenant"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Customer Customer_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Customer"
    ADD CONSTRAINT "Customer_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenant"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Newsletter Newsletter_customerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Newsletter"
    ADD CONSTRAINT "Newsletter_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES public."Customer"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: OrderItem OrderItem_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Order"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: OrderItem OrderItem_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Order Order_customerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES public."Customer"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Order Order_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenant"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProductBenefit ProductBenefit_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductBenefit"
    ADD CONSTRAINT "ProductBenefit_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProductFAQ ProductFAQ_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductFAQ"
    ADD CONSTRAINT "ProductFAQ_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProductRelation ProductRelation_fromId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductRelation"
    ADD CONSTRAINT "ProductRelation_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProductRelation ProductRelation_toId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductRelation"
    ADD CONSTRAINT "ProductRelation_toId_fkey" FOREIGN KEY ("toId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProductTag ProductTag_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductTag"
    ADD CONSTRAINT "ProductTag_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProductTag ProductTag_tagId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductTag"
    ADD CONSTRAINT "ProductTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES public."Tag"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProductVariant ProductVariant_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductVariant"
    ADD CONSTRAINT "ProductVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Product Product_brandId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES public."Brand"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Product Product_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Product Product_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenant"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Review Review_customerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES public."Customer"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Review Review_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: TenantConfig TenantConfig_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TenantConfig"
    ADD CONSTRAINT "TenantConfig_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenant"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: User User_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenant"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: WishlistItem WishlistItem_customerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WishlistItem"
    ADD CONSTRAINT "WishlistItem_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES public."Customer"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: WishlistItem WishlistItem_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WishlistItem"
    ADD CONSTRAINT "WishlistItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict OgoWCs78lQ1LA63sdO8UONOFtTKNM8xYcLDnddhZ23KBo84yguoYQkoIqIYpbMh


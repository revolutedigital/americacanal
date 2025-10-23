--
-- PostgreSQL database dump
--

\restrict 2oKuyiSH94SgLo2toWUmx0vcfxRleWOo9mWUTieXnj8zpU69zuwuhiguTi0urfe

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Product" (
    id text NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    price numeric(10,2) NOT NULL,
    "imageUrl" text NOT NULL,
    stock integer DEFAULT 0 NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Product" OWNER TO postgres;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    name text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Product" (id, name, description, price, "imageUrl", stock, "isActive", "createdAt", "updatedAt") FROM stdin;
72097fcb-b1db-4553-9169-d325bf39b871	CBD Oil Premium 30ml	Óleo de CBD premium de alta qualidade, extraído de plantas orgânicas. Ideal para alívio de ansiedade e estresse. Concentração de 10% de CBD.	299.90	https://images.unsplash.com/photo-1608181563277-4c0f1d3f6c7f	15	t	2025-10-15 23:30:16.501	2025-10-15 23:30:16.501
7b565f6c-07c4-43d4-acb6-88493d019b9a	Hemp Flower - Strain Blue Dream	Flor de cânhamo premium, strain Blue Dream. Rico em terpenos naturais e baixo THC. Produto 100% legal e certificado.	149.90	https://images.unsplash.com/photo-1605792657660-596af9009e82	0	t	2025-10-15 23:30:16.501	2025-10-15 23:30:16.501
d5b9c62c-4c75-496b-ae8a-4298a72a5fe6	CBD Cream - Alívio Muscular	Creme tópico de CBD para alívio de dores musculares e articulares. Fórmula com mentol e arnica. Embalagem 100g.	129.90	https://images.unsplash.com/photo-1608571423902-eed4a5ad8108	8	t	2025-10-15 23:30:16.501	2025-10-15 23:30:16.501
5130e06f-6ce5-448a-84c9-11115e833882	CBD Gummies - Pack 30un	Gomas de CBD saborosas e práticas. Cada goma contém 10mg de CBD. Pack com 30 unidades. Sabor frutas vermelhas.	189.90	https://images.unsplash.com/photo-1582054593b0e-42c1c8b0d1e8	42	t	2025-10-15 23:30:16.501	2025-10-16 03:48:55.052
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, email, password, name, "createdAt", "updatedAt") FROM stdin;
d34800c5-99b6-42f9-9beb-3566d3a22117	admin@americacannabis.com	$2b$10$Jh/OJ3YBIaWMJe1YP1Adn.CkHLMigZGpbq6BJ01n3z.aIbMrXyDNO	Administrador	2025-10-15 23:30:16.496	2025-10-15 23:30:16.496
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
\.


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Product_isActive_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Product_isActive_idx" ON public."Product" USING btree ("isActive");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- PostgreSQL database dump complete
--

\unrestrict 2oKuyiSH94SgLo2toWUmx0vcfxRleWOo9mWUTieXnj8zpU69zuwuhiguTi0urfe


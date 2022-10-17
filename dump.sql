--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

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
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "userId" integer,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "visitCounter" integer DEFAULT 0,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (16, 4, 'f9074462-5dc1-4abc-af77-52bacf62197d', '2022-10-16 04:32:18.665833');
INSERT INTO public.sessions VALUES (17, 5, '1e3715d9-eaf1-4056-be1b-972a263f25df', '2022-10-16 19:32:49.679609');
INSERT INTO public.sessions VALUES (18, 8, '4f10edbd-9299-48aa-bdd0-9af636c4cad4', '2022-10-17 10:22:02.161742');
INSERT INTO public.sessions VALUES (19, 10, 'ac616d85-a875-4781-8613-14e17fc2754a', '2022-10-17 10:55:54.123522');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (32, 8, 'https://www.w3schools.com/howto/howto_js_remove_property_object.asp', '-aRBJLzd', 9, '2022-10-17 10:22:15.023213');
INSERT INTO public.urls VALUES (34, 10, 'https://bootcampra.notion.site/Projeto-Shortly-API-21533489cd5042058524caf3429b62e4', '2cNjGWIA', 1, '2022-10-17 10:57:44.154171');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (4, 'junin', 'junin@email.com', '$2b$10$yNDD32pPc7yPLPhX3FEWEOpUNG/dDoFxcrd2IHTnw2Z4MoGExX/AW', '2022-10-15 16:46:35.141067');
INSERT INTO public.users VALUES (5, 'maria', 'maria@email.com', '$2b$10$GEQMFZkittViipFDoRPa3.hMlGReZdIVxp0XHdDYBqzFEvV3V0JDK', '2022-10-15 16:51:15.363596');
INSERT INTO public.users VALUES (6, 'cleitin', 'cleitin@email.com', '$2b$10$Bo31Fm8I420cYDldryL7kewWEgBE/CN4x9cARXm4jCaqCHuECQ.bq', '2022-10-17 10:21:30.186224');
INSERT INTO public.users VALUES (7, 'jorgin', 'jorgin@email.com', '$2b$10$44zwp.6B1y4U0uMTucxdjONtvKZl2nKlRrRA/lC4fP0IR/qqzFFDq', '2022-10-17 10:21:43.767144');
INSERT INTO public.users VALUES (8, 'pedrin', 'pedrin@email.com', '$2b$10$1T8r6OaEo/dnwXIq.mF4.eWXdgeomVowNLQH5/zxJRToaIhyhUH02', '2022-10-17 10:21:53.449715');
INSERT INTO public.users VALUES (9, 'mireleuca', 'mireleuca@email.com', '$2b$10$ULf57SVmHpCmNqZ3ZCZBa..bY/ubgiWHmAmqTzBrZsJLsRxvzeXOe', '2022-10-17 10:55:07.423972');
INSERT INTO public.users VALUES (10, 'sakura', 'sakura@email.com', '$2b$10$ne/fAtuuseHGvjlb5l1YzOQHd/KuBymkS0FXULnLXl5J/fASu7if2', '2022-10-17 10:55:28.27653');
INSERT INTO public.users VALUES (11, 'naruto calvo', 'naruto@email.com', '$2b$10$7cjRL.DKuibcmZh//Ppes.6Qh0bsT.E09lq39v3aFMQv9rY4JUzO.', '2022-10-17 10:58:26.29924');
INSERT INTO public.users VALUES (12, 'goku careca', 'goku@email.com', '$2b$10$/AhHfXRzgOY1gHQPNOnUdutdOzCsXmGylOaTvy/D6g/uPdqceJ28G', '2022-10-17 10:58:37.027507');
INSERT INTO public.users VALUES (13, 'bob esponja com implante capilar da turquia careca', 'esponja@email.com', '$2b$10$asRa1wB/UwY3F3LW1Ler4udF4xLruAXhh/v8poXsylFm7q7f/bGUi', '2022-10-17 10:59:14.908231');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 19, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 35, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 13, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: sessions sessions_userId_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_key" UNIQUE ("userId");


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: urls urls_shortUrl_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_shortUrl_key" UNIQUE ("shortUrl");


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--


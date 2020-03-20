--billing application database

-- Table: public.customer

-- DROP TABLE public.customer;

CREATE TABLE public.customer
(
    customerid character varying COLLATE pg_catalog."default" NOT NULL,
    customername character varying COLLATE pg_catalog."default" NOT NULL,
    customeraddress character varying COLLATE pg_catalog."default" NOT NULL,
    customernumber character varying COLLATE pg_catalog."default" NOT NULL,
    date character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT customer_pkey PRIMARY KEY (customerid)
)

TABLESPACE pg_default;

ALTER TABLE public.customer
    OWNER to postgres;
	
	
--////////////////////////////////////////

	-- Table: public.item

-- DROP TABLE public.item;

CREATE TABLE public.item
(
    itemid character varying COLLATE pg_catalog."default" NOT NULL,
    itemname character varying COLLATE pg_catalog."default" NOT NULL,
    itemquantity character varying COLLATE pg_catalog."default" NOT NULL,
    itemprice character varying COLLATE pg_catalog."default" NOT NULL,
    totalprice character varying COLLATE pg_catalog."default" NOT NULL,
    customerid character varying COLLATE pg_catalog."default" NOT NULL,
    username character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT item_pkey PRIMARY KEY (itemid),
    CONSTRAINT "customerid_FK" FOREIGN KEY (customerid)
        REFERENCES public.customer (customerid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "username_FK" FOREIGN KEY (username)
        REFERENCES public.userdata (username) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.item
    OWNER to postgres;
	
--////////////////////////////////////////

-- Table: public.userdata

-- DROP TABLE public.userdata;

CREATE TABLE public.userdata
(
    username character varying COLLATE pg_catalog."default" NOT NULL,
    password character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT userdata_pkey PRIMARY KEY (username)
)

TABLESPACE pg_default;

ALTER TABLE public.userdata
    OWNER to postgres;
	

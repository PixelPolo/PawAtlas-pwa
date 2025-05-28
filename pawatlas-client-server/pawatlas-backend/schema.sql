-----------------------------------------------------------------
-- Schema synchronization will execute following sql queries (44):
-----------------------------------------------------------------
CREATE TABLE
    "role" (
        "roleID" character varying(8) NOT NULL,
        "roleName" character varying(64) NOT NULL,
        "roleDescription" character varying(128) NOT NULL,
        CONSTRAINT "UQ_a6142dcc61f5f3fb2d6899fa264" UNIQUE ("roleName"),
        CONSTRAINT "PK_cbd498d66822a00ae6bde8265c2" PRIMARY KEY ("roleID")
    );

CREATE TABLE
    "contact" (
        "contactID" uuid NOT NULL DEFAULT uuid_generate_v4 (),
        "firstName" character varying(64),
        "lastName" character varying(64),
        "phoneNumber" character varying(64),
        "email" character varying(128),
        "website" character varying(256),
        CONSTRAINT "PK_d36c600334a66d18e9c7e45a52c" PRIMARY KEY ("contactID")
    );

CREATE TABLE
    "disease" (
        "diseaseID" uuid NOT NULL DEFAULT uuid_generate_v4 (),
        "diseaseDate" date NOT NULL,
        "diseaseDescription" character varying(512) NOT NULL,
        "animalID" uuid NOT NULL,
        CONSTRAINT "PK_99ff93d3842ae13cf7fcbcd9246" PRIMARY KEY ("diseaseID")
    );

CREATE TABLE
    "size" (
        "sizeID" uuid NOT NULL DEFAULT uuid_generate_v4 (),
        "sizeDate" date NOT NULL,
        "sizeValue" double precision NOT NULL,
        "animalID" uuid NOT NULL,
        CONSTRAINT "PK_20ad3528fdb7dd9c54e5e46d8ab" PRIMARY KEY ("sizeID")
    );

CREATE TABLE
    "vaccine" (
        "vaccineID" uuid NOT NULL DEFAULT uuid_generate_v4 (),
        "vaccineDate" date NOT NULL,
        "vaccineName" character varying(128) NOT NULL,
        "animalID" uuid NOT NULL,
        CONSTRAINT "PK_64eb9ba9e4f4315d35d1748250d" PRIMARY KEY ("vaccineID")
    );

CREATE TABLE
    "vermifuge" (
        "vermifugeID" uuid NOT NULL DEFAULT uuid_generate_v4 (),
        "vermifugeDate" date NOT NULL,
        "vermifugeName" character varying(128) NOT NULL,
        "animalID" uuid NOT NULL,
        CONSTRAINT "PK_24bb309ebc50ef30c3f268e70a1" PRIMARY KEY ("vermifugeID")
    );

CREATE TABLE
    "weight" (
        "weightID" uuid NOT NULL DEFAULT uuid_generate_v4 (),
        "weightDate" date NOT NULL,
        "weightValue" double precision NOT NULL,
        "animalID" uuid NOT NULL,
        CONSTRAINT "PK_4413772e94c15d0cca503fbd2af" PRIMARY KEY ("weightID")
    );

CREATE TABLE
    "image" (
        "imageID" uuid NOT NULL DEFAULT uuid_generate_v4 (),
        "imageData" bytea NOT NULL,
        "imageMimeType" character varying(64) NOT NULL,
        "imageDate" TIMESTAMP DEFAULT now (),
        CONSTRAINT "PK_e9d6535c1288520da339a175a29" PRIMARY KEY ("imageID")
    );

CREATE TABLE
    "animal_event" (
        "animalEventID" uuid NOT NULL DEFAULT uuid_generate_v4 (),
        "animalEventDate" date NOT NULL,
        "animalEventDescription" character varying(512) NOT NULL,
        "animalID" uuid NOT NULL,
        CONSTRAINT "PK_f635e51642478ec4bf7f217d65e" PRIMARY KEY ("animalEventID")
    );

CREATE TABLE
    "gender" (
        "genderID" character varying(8) NOT NULL,
        "genderName" character varying(64) NOT NULL,
        CONSTRAINT "PK_16c188d2a3f76d7d678e753c81e" PRIMARY KEY ("genderID")
    );

CREATE TABLE
    "animal" (
        "animalID" uuid NOT NULL DEFAULT uuid_generate_v4 (),
        "chipNumber" character varying(128),
        "animalName" character varying(128) NOT NULL,
        "animalBirthName" character varying(128),
        "animalBirthDate" date NOT NULL,
        "animalType" character varying(128) NOT NULL,
        "animalBreed" character varying(128) NOT NULL,
        "genderID" character varying(8) NOT NULL,
        "animalColor" character varying(128) NOT NULL,
        "animalDescription" character varying(512),
        "sterile" boolean NOT NULL,
        "humanFriendly" boolean NOT NULL,
        "animalFriendly" boolean NOT NULL,
        "allergies" character varying(512),
        "imageID" uuid,
        "veterinarianID" uuid,
        CONSTRAINT "REL_714c5f6a5d67a61231f69d620c" UNIQUE ("imageID"),
        CONSTRAINT "PK_3109237524c72b71049983e6662" PRIMARY KEY ("animalID")
    );

CREATE TABLE
    "user_animal_ownership" (
        "userID" character varying(128) NOT NULL,
        "animalID" uuid NOT NULL,
        CONSTRAINT "PK_fc889f5544b9c20610376ae6f89" PRIMARY KEY ("userID", "animalID")
    );

CREATE TABLE
    "user" (
        "userID" character varying(128) NOT NULL,
        "displayName" character varying(64) NOT NULL,
        "roleID" character varying(8) NOT NULL,
        "contactID" uuid,
        "addressID" uuid,
        "genderID" character varying(8),
        CONSTRAINT "UQ_059e69c318702e93998f26d1528" UNIQUE ("displayName"),
        CONSTRAINT "REL_92cec2196b74f2f8de55339d2e" UNIQUE ("contactID"),
        CONSTRAINT "PK_46d78688eda2476cb18f7eae8a5" PRIMARY KEY ("userID")
    );

CREATE TABLE
    "like" (
        "userID" character varying(128) NOT NULL,
        "markerID" uuid NOT NULL,
        "isLiking" boolean NOT NULL,
        CONSTRAINT "PK_f6d1c2648fcddd81584414f18fd" PRIMARY KEY ("userID", "markerID")
    );

CREATE TABLE
    "type" (
        "typeID" character varying(8) NOT NULL,
        "typeName" character varying(64) NOT NULL,
        CONSTRAINT "PK_5a6089913c1a2bff8f1e005d7e0" PRIMARY KEY ("typeID")
    );

CREATE TABLE
    "category" (
        "categoryID" character varying(8) NOT NULL,
        "typeID" character varying(8) NOT NULL,
        "categoryName" character varying(64) NOT NULL,
        "categoryDescription" character varying(512) NOT NULL,
        CONSTRAINT "PK_41fb077311758c7fdb08f4f450d" PRIMARY KEY ("categoryID")
    );

CREATE TABLE
    "marker" (
        "markerID" uuid NOT NULL DEFAULT uuid_generate_v4 (),
        "markerDate" TIMESTAMP DEFAULT now (),
        "markerLat" double precision NOT NULL,
        "markerLng" double precision NOT NULL,
        "markerName" character varying(64) NOT NULL,
        "markerDescription" character varying(512) NOT NULL,
        "markerApprovedVotes" integer NOT NULL DEFAULT '0',
        "markerDisapprovedVotes" integer NOT NULL DEFAULT '0',
        "categoryID" character varying(8) NOT NULL,
        "userID" character varying(128),
        "imageID" uuid,
        "contactID" uuid,
        "addressID" uuid,
        CONSTRAINT "REL_3507836c3b7ea9041c1366a0de" UNIQUE ("imageID"),
        CONSTRAINT "REL_1aaaf1da72d4331614a3baadac" UNIQUE ("contactID"),
        CONSTRAINT "PK_0bbcabd66d86db1ecdf01f9df39" PRIMARY KEY ("markerID")
    );

CREATE TABLE
    "address" (
        "addressID" uuid NOT NULL DEFAULT uuid_generate_v4 (),
        "street" character varying(128),
        "city" character varying(128),
        "postalCode" character varying(64),
        "state" character varying(128),
        "country" character varying(128),
        CONSTRAINT "PK_5b896be9d17ec531621100337b4" PRIMARY KEY ("addressID")
    );

CREATE TABLE
    "veterinarian" (
        "veterinarianID" uuid NOT NULL DEFAULT uuid_generate_v4 (),
        "contactID" uuid,
        "addressID" uuid,
        CONSTRAINT "REL_5c45521f97e46e7bae0b78b46a" UNIQUE ("contactID"),
        CONSTRAINT "PK_eee8f87241a43cc2446d2d9c4bf" PRIMARY KEY ("veterinarianID")
    );

ALTER TABLE "disease" ADD CONSTRAINT "FK_aa42a7e1871dd4daa1f666302f0" FOREIGN KEY ("animalID") REFERENCES "animal" ("animalID") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "size" ADD CONSTRAINT "FK_1810d78d76e5fce805fbb1a8972" FOREIGN KEY ("animalID") REFERENCES "animal" ("animalID") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "vaccine" ADD CONSTRAINT "FK_16260ad5374433dae0ac87b721d" FOREIGN KEY ("animalID") REFERENCES "animal" ("animalID") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "vermifuge" ADD CONSTRAINT "FK_6868d32757ec2001bb1047725df" FOREIGN KEY ("animalID") REFERENCES "animal" ("animalID") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "weight" ADD CONSTRAINT "FK_2d47f2954d0ce07c62879d02b18" FOREIGN KEY ("animalID") REFERENCES "animal" ("animalID") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "animal_event" ADD CONSTRAINT "FK_c3a0aabed87b6d7369668daecd0" FOREIGN KEY ("animalID") REFERENCES "animal" ("animalID") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "animal" ADD CONSTRAINT "FK_0dc74a172d971863286d67cf96c" FOREIGN KEY ("genderID") REFERENCES "gender" ("genderID") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "animal" ADD CONSTRAINT "FK_cf4abaca3fd071fb9b083dc37ca" FOREIGN KEY ("veterinarianID") REFERENCES "veterinarian" ("veterinarianID") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "animal" ADD CONSTRAINT "FK_714c5f6a5d67a61231f69d620c7" FOREIGN KEY ("imageID") REFERENCES "image" ("imageID") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "user_animal_ownership" ADD CONSTRAINT "FK_d2cbe28e06e33607be66dda06c3" FOREIGN KEY ("userID") REFERENCES "user" ("userID") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "user_animal_ownership" ADD CONSTRAINT "FK_265b95911e19d0fe6bb02c11ccc" FOREIGN KEY ("animalID") REFERENCES "animal" ("animalID") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "user" ADD CONSTRAINT "FK_b01165b3c7e8ada9be207daa303" FOREIGN KEY ("roleID") REFERENCES "role" ("roleID") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "user" ADD CONSTRAINT "FK_92cec2196b74f2f8de55339d2e4" FOREIGN KEY ("contactID") REFERENCES "contact" ("contactID") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "user" ADD CONSTRAINT "FK_c54b3f4088e71ed7675d3157276" FOREIGN KEY ("addressID") REFERENCES "address" ("addressID") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "user" ADD CONSTRAINT "FK_368bddefad6a9532bb889f025a2" FOREIGN KEY ("genderID") REFERENCES "gender" ("genderID") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "like" ADD CONSTRAINT "FK_18e608eb4d35dbc3674e52fe5a0" FOREIGN KEY ("userID") REFERENCES "user" ("userID") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "like" ADD CONSTRAINT "FK_8f41cd7ddb34d49562ee78d0c9c" FOREIGN KEY ("markerID") REFERENCES "marker" ("markerID") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "category" ADD CONSTRAINT "FK_47c3e0effa3f040294956493a84" FOREIGN KEY ("typeID") REFERENCES "type" ("typeID") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "marker" ADD CONSTRAINT "FK_0f6aa6520017ecd9db1b5192ec0" FOREIGN KEY ("categoryID") REFERENCES "category" ("categoryID") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "marker" ADD CONSTRAINT "FK_3aa283198883159fd5cd793d9ea" FOREIGN KEY ("userID") REFERENCES "user" ("userID") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "marker" ADD CONSTRAINT "FK_3507836c3b7ea9041c1366a0dee" FOREIGN KEY ("imageID") REFERENCES "image" ("imageID") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "marker" ADD CONSTRAINT "FK_1aaaf1da72d4331614a3baadacf" FOREIGN KEY ("contactID") REFERENCES "contact" ("contactID") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "marker" ADD CONSTRAINT "FK_df71f6937349806cb5272ce2794" FOREIGN KEY ("addressID") REFERENCES "address" ("addressID") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "veterinarian" ADD CONSTRAINT "FK_5c45521f97e46e7bae0b78b46ab" FOREIGN KEY ("contactID") REFERENCES "contact" ("contactID") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "veterinarian" ADD CONSTRAINT "FK_4c788f8ee01af37645d117d1fe2" FOREIGN KEY ("addressID") REFERENCES "address" ("addressID") ON DELETE SET NULL ON UPDATE CASCADE;
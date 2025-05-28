----- NestJS framework will init the Database
---- This script is just for seeding
---
-- MARKER CATEGORIES ---
INSERT INTO
    public.category (
        "categoryID",
        "typeID",
        "categoryName",
        "categoryDescription"
    )
VALUES
    (
        'c01',
        't03',
        'SPA',
        'Société protectrice des animaux'
    ),
    ('c02', 't03', 'Vétérinaire', 'Soins médicaux'),
    (
        'c03',
        't03',
        'Toilettage',
        'Soins esthétiques et d''hygiènes'
    ),
    (
        'c04',
        't03',
        'Animalerie',
        'Accessoire, nourriture, etc.'
    ),
    (
        'c05',
        't03',
        'Médecine alternative',
        'Soins médicaux alternatifs'
    ),
    ('c06', 't01', 'Poubelle', 'Poubelle avec sacs'),
    (
        'c07',
        't01',
        'Eau potable',
        'Source d''eau potable'
    ),
    ('c08', 't01', 'Parc', 'Parc pour animaux'),
    (
        'c09',
        't03',
        'Centre animalier',
        'Vétérinaire, toilettage, garde, etc.'
    ),
    (
        'c10',
        't03',
        'Service de garde',
        'Garde d''animaux'
    ),
    ('c11', 't01', 'Baignade', 'Point d''eau'),
    ('c12', 't01', 'Loisirs', 'Centre de loisir'),
    ('c13', 't01', 'Autre intérêt', 'Autre intérêt'),
    ('c14', 't02', 'Toxique', 'Zone toxique'),
    ('c15', 't02', 'Patous', 'Présence de patous'),
    (
        'c16',
        't02',
        'Cyanobactéries',
        'Présence de cyanobactéries'
    ),
    ('c17', 't02', 'Rage', 'Zone à risque de rage'),
    ('c18', 't02', 'Chasse', 'Zone de chasse'),
    ('c19', 't02', 'Bétail', 'Présence de bétails'),
    (
        'c20',
        't02',
        'Interdit',
        'Zone interdite aux animaux'
    ),
    ('c21', 't02', 'Autre danger', 'Autre danger');

-- GENDERS --
INSERT INTO
    public.gender ("genderID", "genderName")
VALUES
    ('g01', 'Mâle');

INSERT INTO
    public.gender ("genderID", "genderName")
VALUES
    ('g02', 'Femelle');

-- ROLES ---
INSERT INTO
    public."role" ("roleID", "roleName", "roleDescription")
VALUES
    (
        'user',
        'standard',
        'standard role for normal users'
    );

-- TYPES --
INSERT INTO
    public."type" ("typeID", "typeName")
VALUES
    ('t01', 'Intérêt');

INSERT INTO
    public."type" ("typeID", "typeName")
VALUES
    ('t02', 'Danger');

INSERT INTO
    public."type" ("typeID", "typeName")
VALUES
    ('t03', 'Service');
const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'assets/products');
const outFile = path.join(__dirname, 'js/perfumesDB.js');

if (!fs.existsSync(path.dirname(outFile))) {
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
}

const rawList = `nombre_perfume	Tipo	estado	familia_olfativa	ocasion	intensidad	genero
9pm-rebel---afnan	ESTANDAR	ACTIVO	ORIENTALES/ESPECIADAS	CITA ROMATICA	ALTA	HOMBRE
9pm-night-out---armaf	ESTANDAR	ACTIVO	ORIENTALES/ESPECIADAS	CITA ROMATICA	ALTA	HOMBRE
212-heroes---carolina-herrerahombre	ESTANDAR	INACTIVO	ACTIVO	ACTIVO	ACTIVO	HOMBRE
212-men-nyc---carolina-herrera	ESTANDAR	ACTIVO	CITRICAS	DEPORTE	MEDIA	HOMBRE
212-vip---carolina-herrera	1.1	INACTIVO	DULCE	USO DIARIO	ALTA	HOMBRE
360-for-men---perry-ellis	1.1	ACTIVO	CITRICAS	USO DIARIO	ALTA	HOMBRE
adrenalina---yanbal	ESTANDAR	ACTIVO	CITRICAS	DEPORTE	MEDIA	HOMBRE
al-contrario---tiziana-terenzi	ESTANDAR	ACTIVO	ORIENTALES/ESPECIADAS	EVENTO FORMAL	ALTA	HOMBRE
alexandria-ii---xerjoff	ESTANDAR	ACTIVO	ACTIVO	ACTIVO	ACTIVO	HOMBRE
allure-home-sport---chanel	ESTANDAR	ACTIVO	AMADERADAS	EVENTO FORMAL	MEDIA	HOMBRE
althair---marly	ESTANDAR	ACTIVO	ORIENTALES/ESPECIADAS	CITA ROMATICA	ALTA	HOMBRE
amber-dubai-night---al-hamarain	ESTANDAR	ACTIVO	ORIENTALES/ESPECIADAS	EVENTO FORMAL	ALTA	HOMBRE
9pm-night-out---armaf	ESTANDAR	ACTIVO	ACUATICAS	CITA ROMATICA	ALTA	HOMBRE
angels-share---kilian	ESTANDAR	ACTIVO	AMADERADAS	EVENTO FORMAL	ALTA	HOMBRE
aqva---bvlgari	ESTANDAR	ACTIVO	ACUATICAS	USO DIARIO	MEDIA	HOMBRE
asad-bourbon---lattafa	1.1	ACTIVO	ORIENTALES/ESPECIADAS	CITA ROMATICA	ALTA	HOMBRE
ahli-vega---lataffa	ESTANDAR	INACTIVO	DULCES	EVENTO FORMAL	MEDIA	UNISEX
asad---lattafa	1.1	ACTIVO	ORIENTALES/ESPECIADAS	OFICINA	ALTA	HOMBRE
aventus---creed	ESTANDAR	ACTIVO	AMADERADAS	EVENTO FORMAL	MEDIA	HOMBRE
azul---la-coste	ESTANDAR	ACTIVO	FRESCO	DEPORTE	BAJA	HOMBRE
azure-fantasy---orientica	ESTANDAR	ACTIVO	CITRICAS	DEPORTE	ALTA	HOMBRE
bad-boy---carolina-herrera	ESTANDAR	ACTIVO	DULCES	CITA ROMATICA	MEDIA	HOMBRE
bharara-onyx---bharara	ESTANDAR	INACTIVO	ACTIVO	ACTIVO	ACTIVO	HOMBRE
black-xs---paco-rabanne	ESTANDAR	ACTIVO	ORIENTALES/ESPECIADAS	OFICINA	MEDIA	HOMBRE
black-xs-afrodisiaque---paco-rabanne	ESTANDAR	ACTIVO	DULCES	CITA ROMATICA	MEDIA	HOMBRE
blanc---la-coste	1.1	ACTIVO	CITRICAS	OFICINA	ALTA	HOMBRE
blue---polo	ESTANDAR	ACTIVO	ACUATICAS	OFICINA	MEDIA	HOMBRE
bleu---channel	ESTANDAR	ACTIVO	AMADERADAS	OFICINA	MEDIA	HOMBRE
born-in-roma---valentino	ESTANDAR	ACTIVO	ORIENTALES/ESPECIADAS	EVENTO FORMAL	ALTA	HOMBRE
bottled-clasica---boss	ESTANDAR	ACTIVO	CITRICAS	USO DIARIO	MEDIA	HOMBRE
centaurus---creed	ESTANDAR	ACTIVO	ORIENTALES/ESPECIADAS	EVENTO FORMAL	ALTA	HOMBRE
ch-men---carolina-herrera	ESTANDAR	ACTIVO	CITRICAS	USO DIARIO	BAJA	HOMBRE
clasica---one-million	ESTANDAR	ACTIVO	AMADERADAS	OFICINA	MEDIA	HOMBRE
clasica-bvlgari---bvlgari	ESTANDAR	INACTIVO	ACUATICAS	USO DIARIO	BAJA	HOMBRE
club-de-nuit-intense---armaf	1.1	ACTIVO	ORIENTALES/ESPECIADAS	EVENTO FORMAL	MEDIA	HOMBRE
club-de-nuit-sillage---armaf	ESTANDAR	ACTIVO	CITRICAS	USO DIARIO	MEDIA	HOMBRE
club-de-nuit-untold---armaf	ESTANDAR	INACTIVO	DULCES	CITA ROMATICA	ALTA	HOMBRE
cool-water---davidoff	ESTANDAR	INACTIVO	ACUATICAS	DEPORTE	MEDIA	HOMBRE
declaration---cartier	ESTANDAR	ACTIVO	AMADERADAS	USO DIARIO	MEDIA	HOMBRE
diesel-plus-plus---diesel	ESTANDAR	ACTIVO	FRUTALES	USO DIARIO	MEDIA	HOMBRE
dylan-blue---versace	ESTANDAR	ACTIVO	ACUATICAS	OFICINA	MEDIA	HOMBRE
eau-de-cartier---cartier	ESTANDAR	ACTIVO	AROMATICO	OFICINA	BAJA	HOMBRE
eau-fraiche---versace	ESTANDAR	ACTIVO	ACUATICAS	OFICINA	MEDIA	HOMBRE
elixir---sauvage	ESTANDAR	ACTIVO	AMADERADAS	EVENTO FORMAL	ALTA	HOMBRE
emblem---montblanc	ESTANDAR	ACTIVO	AMADERADAS	USO DIARIO	MEDIA	HOMBRE
emeer---lattafa	ESTANDAR	ACTIVO	CITRICAS	USO DIARIO	MEDIA	HOMBRE
energise---boss	ESTANDAR	INACTIVO	CITRICAS	OFICINA	ALTA	HOMBRE
erba-pura---xerjoff	ESTANDAR	ACTIVO	ORIENTALES/ESPECIADAS	CITA ROMATICA	ALTA	UNISEX
eros---versace	ESTANDAR	ACTIVO	FRUTALES	USO DIARIO	MEDIA	HOMBRE
eros-flame---versace	1.1	ACTIVO	CITRICAS	DEPORTE	ALTA	HOMBRE
eternity---calvin-klein	ESTANDAR	ACTIVO	AROMATICO	USO DIARIO	MEDIA	HOMBRE
fahrenheit---dior	ESTANDAR	ACTIVO	CITRICAS	EVENTO FORMAL	ALTA	HOMBRE
fhakar-black---lattafa	ESTANDAR	ACTIVO	CITRICAS	USO DIARIO	MEDIA	HOMBRE
hawas---rasasi	ESTANDAR	ACTIVO	ACUATICAS	USO DIARIO	BAJA	HOMBRE
hawas-fire---rasasi	ESTANDAR	ACTIVO	AROMATICO	CITA ROMATICA	ALTA	HOMBRE
herot---marly	ESTANDAR	INACTIVO	ACTIVO	ACTIVO	ACTIVO	HOMBRE
il-kakuno---ilmin	ESTANDAR	ACTIVO	ORIENTALES/ESPECIADAS	EVENTO FORMAL	ALTA	HOMBRE
il-orgasme---ilmin	ESTANDAR	ACTIVO	DULCES	CITA ROMATICA	ALTA	HOMBRE
ilmin-erotique---ilmin	ESTANDAR	ACTIVO	DULCES	CITA ROMATICA	ALTA	HOMBRE
imagination---louis-vuitton	ESTANDAR	ACTIVO	CITRICAS	EVENTO FORMAL	ALTA	HOMBRE
invictus-clasica---paco-rabanne	ESTANDAR	ACTIVO	AROMATICO	USO DIARIO	MEDIA	HOMBRE
invictus-intense---paco-rabanne	ESTANDAR	ACTIVO	ORIENTALES/ESPECIADAS	CITA ROMATICA	ALTA	HOMBRE
irish-tweed---creed	ESTANDAR	ACTIVO	ACTIVO	ACTIVO	ACTIVO	HOMBRE
khamrah-dunkhan---lattafa	ESTANDAR	ACTIVO	ORIENTALES/ESPECIADAS	CITA ROMATICA	ALTA	HOMBRE
khamrah-qahwa---lattafa	1.1	ACTIVO	ORIENTALES/ESPECIADAS	CITA ROMATICA	ALTA	HOMBRE
king---bharara	1.1	ACTIVO	DULCES	CITA ROMATICA	ALTA	HOMBRE
king-of-seduction---antonio-banderas	ESTANDAR	ACTIVO	AROMATICO	OFICINA	MEDIA	HOMBRE
limmensite---louis-vuitton	ESTANDAR	ACTIVO	AROMATICO	OFICINA	ALTA	HOMBRE
leau-dissey-miyake	ESTANDAR	ACTIVO	AROMATICO	USO DIARIO	ALTA	HOMBRE
la-coste-essential	1.1	ACTIVO	CITRICAS	USO DIARIO	ALTA	HOMBRE
la-coste-red	ESTANDAR	ACTIVO	FRUTALES	USO DIARIO	MEDIA	HOMBRE
layton---marly	1.1	ACTIVO	AROMATICO	CITA ROMATICA	ALTA	HOMBRE
le-beau---jean-paul-gaultier	ESTANDAR	ACTIVO	FRUTALES	USO DIARIO	MEDIA	HOMBRE
le-beau-paradise---jpg	ESTANDAR	INACTIVO	FRUTALES	USO DIARIO	MEDIA	HOMBRE
le-male---jpg	ESTANDAR	ACTIVO	AROMATICO	OFICINA	MEDIA	HOMBRE
le-male-le-parfum---jpg	1.1	ACTIVO	AROMATICO	EVENTO FORMAL	ALTA	HOMBRE
loewe-7---loewe	ESTANDAR	ACTIVO	AMADERADAS	OFICINA	MEDIA	HOMBRE
man-extreme---bvlgari	ESTANDAR	ACTIVO	CITRICAS	EVENTO FORMAL	ALTA	HOMBRE
man-in-black---bvlgari	ESTANDAR	ACTIVO	AMADERADAS	EVENTO FORMAL	MEDIA	HOMBRE
mandarin-sky---armaf	1.1	ACTIVO	CITRICAS	CITA ROMATICA	ALTA	HOMBRE
mandarin-sky-elixir---armaf	1.1	ACTIVO	CITRICAS	USO DIARIO	ALTA	HOMBRE
maria-farina---roger-gallet	ESTANDAR	ACTIVO	CITRICAS	EVENTO FORMAL	ALTA	HOMBRE
megamare---orto-parasi	ESTANDAR	ACTIVO	ACUATICAS	OFICINA	MEDIA	HOMBRE
millesime-imperial---creed	ESTANDAR	ACTIVO	ACUATICAS	DEPORTE	MEDIA	HOMBRE
montana-homme---montana	ESTANDAR	ACTIVO	ORIENTALES/ESPECIADAS	EVENTO FORMAL	ALTA	HOMBRE
nebras---lattafa	ESTANDAR	ACTIVO	DULCES	CITA ROMATICA	ALTA	MUJER
niche---bharara	ESTANDAR	INACTIVO	AMADERADAS	OFICINA	MEDIA	MUJER
nitro-red---dumont	ESTANDAR	ACTIVO	FRUTALES	USO DIARIO	MEDIA	HOMBRE
noir-extreme---tom-ford	ESTANDAR	ACTIVO	ORIENTALES/ESPECIADAS	EVENTO FORMAL	ALTA	HOMBRE
oddyssey-aqua---armaf	ESTANDAR	ACTIVO	ACUATICAS	USO DIARIO	MEDIA	HOMBRE
ohm---yanbal	ESTANDAR	ACTIVO	AMADERADAS	USO DIARIO	ALTA	HOMBRE
ombre-leather---tom-ford	ESTANDAR	ACTIVO	AMADERADAS	EVENTO FORMAL	ALTA	HOMBRE
ombre-nomade---louis-vuitton	ESTANDAR	ACTIVO	AMADERADAS	OFICINA	ALTA	HOMBRE
one---calvin-klein	ESTANDAR	ACTIVO	FRESCO	DEPORTE	MEDIA	HOMBRE
one-million-golden-oud---paco-rabanne	ESTANDAR	ACTIVO	AMADERADAS	EVENTO FORMAL	ALTA	HOMBRE
one-million-lucky---paco-rabanne	ESTANDAR	ACTIVO	DULCES	CITA ROMATICA	MEDIA	HOMBRE
onix---invictus	ESTANDAR	ACTIVO	AROMATICO	USO DIARIO	MEDIA	HOMBRE
opulend-oud---lattafa	ESTANDAR	ACTIVO	ORIENTALES/ESPECIADAS	EVENTO FORMAL	ALTA	HOMBRE
osadia---yanbal	ESTANDAR	ACTIVO	AMADERADAS	OFICINA	MEDIA	HOMBRE
osadia---yanbalmujer	ESTANDAR	ACTIVO	DULCES	OFICINA	MEDIA	MUJER
oud-maracuja---maison-crivelli	ESTANDAR	ACTIVO	FRUTALES	EVENTO FORMAL	ALTA	UNISEX
oud-of-glory---lattafa	ESTANDAR	ACTIVO	ORIENTALES/ESPECIADAS	EVENTO FORMAL	ALTA	HOMBRE
oud-amethyst---lataffa	ESTANDAR	ACTIVO	ORIENTALES/ESPECIADAS	CITA ROMATICA	ALTA	UNISEX
oud-saffron---orientica	ESTANDAR	INACTIVO	ACTIVO	ACTIVO	ACTIVO	HOMBRE
phantom---paco-rabanne	ESTANDAR	ACTIVO	DULCES	CITA ROMATICA	MEDIA	HOMBRE
polo-red---ralph-lauren	ESTANDAR	ACTIVO	AROMATICO	USO DIARIO	MEDIA	HOMBRE
profumo---aqua-di-gio	1.1	ACTIVO	ACUATICAS	EVENTO FORMAL	MEDIA	HOMBRE
clasica---aqua-di-gio	1.1	ACTIVO	ACUATICAS	DEPORTE	MEDIA	HOMBRE
ra-ed-silver---lattafa	ESTANDAR	ACTIVO	ORIENTALES/ESPECIADAS	USO DIARIO	ALTA	HOMBRE
santal-33---le-labo	ESTANDAR	INACTIVO	AMADERADAS	EVENTO FORMAL	MEDIA	HOMBRE
sauvage---dior	ESTANDAR	ACTIVO	AMADERADAS	OFICINA	ALTA	HOMBRE
scandal-men---jpg	ESTANDAR	INACTIVO	ACTIVO	ACTIVO	ACTIVO	HOMBRE
silver-mountain---creed	1.1	ACTIVO	CITRICAS	USO DIARIO	ALTA	HOMBRE
solo---loewe	ESTANDAR	ACTIVO	AMADERADAS	OFICINA	MEDIA	HOMBRE
solo---yanbal	ESTANDAR	ACTIVO	AMADERADAS	OFICINA	ALTA	HOMBRE
spice-boom---viktor-rolf	ESTANDAR	ACTIVO	ORIENTALES/ESPECIADAS	OFICINA	ALTA	HOMBRE
starwalker---montblanc	1.1	ACTIVO	FRESCO	OFICINA	MEDIA	HOMBRE
stronger-with-you---lattafa	ESTANDAR	ACTIVO	ORIENTALES/ESPECIADAS	EVENTO FORMAL	ALTA	HOMBRE
summer-hammer---lorenzo-pazzaglia	ESTANDAR	ACTIVO	FRUTALES	CITA ROMATICA	ALTA	HOMBRE
sun-gria---lorenzo-pazzaglia	ESTANDAR	INACTIVO	FRUTALES	CITA ROMATICA	ALTA	HOMBRE
swiss-army---victorinox	1.1	ACTIVO	AROMATICO	OFICINA	ALTA	HOMBRE
the-most-wanted---azzaro	ESTANDAR	ACTIVO	ORIENTALES/ESPECIADAS	EVENTO FORMAL	MEDIA	HOMBRE
tommy-hilfiger---tommy	ESTANDAR	ACTIVO	FRESCO	USO DIARIO	MEDIA	HOMBRE
toy-boy---moschino	ESTANDAR	ACTIVO	FRUTALES	CITA ROMATICA	ALTA	HOMBRE
ultramale---jean-paul-gaultier	1.1	ACTIVO	DULCES	CITA ROMATICA	ALTA	HOMBRE
uomo---valentino	ESTANDAR	ACTIVO	AROMATICO	DEPORTE	BAJA	HOMBRE
victory---invictus	ESTANDAR	ACTIVO	DULCES	CITA ROMATICA	ALTA	HOMBRE
voyage---nautica	1.1	ACTIVO	ACUATICAS	EVENTO FORMAL	ALTA	HOMBRE
yves-saint-laurent	ESTANDAR	ACTIVO	AROMATICO	DEPORTE	MEDIA	HOMBRE
212-heroes-for-her---carolina-herrera	ESTANDAR	INACTIVO	ACTIVO	ACTIVO	ACTIVO	MUJER
212-nyc-for-her---carolina-herrera	ESTANDAR	ACTIVO	FLORALES	USO DIARIO	BAJA	MUJER
212-vip-for-her---carolina-herrera	ESTANDAR	ACTIVO	FRUTALES	CITA ROMATICA	MEDIA	MUJER
212-vip-rose---carolina-herrera	ESTANDAR	ACTIVO	FRUTALES	CITA ROMATICA	ALTA	MUJER
273---beverly-hills	ESTANDAR	ACTIVO	ATALCADO	EVENTO FORMAL	ALTA	MUJER
360°---perry-ellis	ESTANDAR	ACTIVO	FLORALES	USO DIARIO	ALTA	MUJER
acqua-di-gioia---giorgio-armani	ESTANDAR	ACTIVO	ACUATICAS	USO DIARIO	MEDIA	MUJER
adrenalina---yanbal	ESTANDAR	ACTIVO	FLORALES	USO DIARIO	ALTA	MUJER
agua-mistica---sol-de-janeiro	ESTANDAR	ACTIVO	ACUATICAS	USO DIARIO	MEDIA	MUJER
amber-oud-gold---al-hamarain	ESTANDAR	ACTIVO	DULCES	CITA ROMATICA	ALTA	UNISEX
amber-rouge---orientica	1.1	ACTIVO	DULCES	EVENTO FORMAL	ALTA	UNISEX
amethyste-omnia---bvlgari	ESTANDAR	ACTIVO	ATALCADO	USO DIARIO	BAJA	MUJER
arabian-tonka---montale	ESTANDAR	ACTIVO	DULCES	EVENTO FORMAL	ALTA	MUJER
ari---ariana-grande	ESTANDAR	ACTIVO	FRUTALES	OFICINA	MEDIA	MUJER
almaz---kajal	ESTANDAR	ACTIVO	FRUTALES	USO DIARIO	MEDIA	MUJER
atonic-rose---initio	ESTANDAR	ACTIVO	FLORALES	EVENTO FORMAL	ALTA	MUJER
aventus-for-her---creed	ESTANDAR	INACTIVO	CITRICAS	DEPORTE	BAJA	MUJER
azure-fantasy---orientica	ESTANDAR	ACTIVO	CITRICAS	DEPORTE	MEDIA	UNISEX
berry-on-top---lattafa	ESTANDAR	ACTIVO	DULCES	OFICINA	ALTA	MUJER
bff---kim-kardashian	ESTANDAR	ACTIVO	FRUTALES	CITA ROMATICA	ALTA	MUJER
bianco-latte---gardoni-toscana	ESTANDAR	ACTIVO	DULCES	CITA ROMATICA	ALTA	MUJER
bright-crystal---versace	ESTANDAR	ACTIVO	FLORALES	USO DIARIO	BAJA	MUJER
black-opium---ysaintlaurent	ESTANDAR	ACTIVO	DULCES	CITA ROMATICA	ALTA	MUJER
burberry-her---burberry	ESTANDAR	ACTIVO	FRUTALES	CITA ROMATICA	ALTA	MUJER
burberry-london---burberry	ESTANDAR	INACTIVO	FLORALES	USO DIARIO	BAJA	MUJER
can-can---paris-hilton	ESTANDAR	ACTIVO	FLORALES	EVENTO FORMAL	MEDIA	MUJER
clasica---paris-hilton	ESTANDAR	ACTIVO	DULCES	USO DIARIO	MEDIA	MUJER
candy---yara	1.1	ACTIVO	DULCES	CITA ROMATICA	ALTA	MUJER
carioca-crush---sol-de-janeiro	ESTANDAR	ACTIVO	FRUTALES	DEPORTE	MEDIA	MUJER
ccori---yanbal	ESTANDAR	INACTIVO	FLORALES	EVENTO FORMAL	ALTA	MUJER
celos---yanbal	ESTANDAR	ACTIVO	DULCES	EVENTO FORMAL	ALTA	MUJER
chance---chanel	ESTANDAR	ACTIVO	FLORALES	USO DIARIO	BAJA	MUJER
chanel-n5---chanel	ESTANDAR	ACTIVO	AMADERADAS	EVENTO FORMAL	ALTA	MUJER
cielo---yanbal	ESTANDAR	ACTIVO	ATALCADO	CITA ROMATICA	ALTA	MUJER
cloud---ariana-grande	ESTANDAR	ACTIVO	DULCES	CITA ROMATICA	ALTA	MUJER
cloud-pink---ariana-grande	ESTANDAR	ACTIVO	DULCES	CITA ROMATICA	ALTA	MUJER
cloud-2-0---ariana-grande	1.1	ACTIVO	DULCES	CITA ROMATICA	ALTA	MUJER
club-de-nuit-lionheart---armaf	ESTANDAR	ACTIVO	AMADERADAS	OFICINA	MEDIA	MUJER
coco-madmoiselle---chanel	ESTANDAR	ACTIVO	CITRICAS	OFICINA	ALTA	MUJER
coconut-passion---victoria-secret	ESTANDAR	ACTIVO	FRUTALES	OFICINA	ALTA	MUJER
cookie-crave---lattafa	ESTANDAR	ACTIVO	DULCES	CITA ROMATICA	ALTA	MUJER
cosmic-power-charlotte-tibury	ESTANDAR	ACTIVO	DULCES	CITA ROMATICA	ALTA	MUJER
delina---marly	ESTANDAR	ACTIVO	AMADERADAS	EVENTO FORMAL	ALTA	MUJER
devotion---dolce-and-gabanna	ESTANDAR	ACTIVO	DULCES	EVENTO FORMAL	ALTA	MUJER
donna---valentino	ESTANDAR	ACTIVO	AMADERADAS	OFICINA	MEDIA	MUJER
eclaire---lattafa	ESTANDAR	ACTIVO	DULCES	EVENTO FORMAL	ALTA	MUJER
eden-juicy-apple---kayaly	ESTANDAR	ACTIVO	DULCES	CITA ROMATICA	ALTA	MUJER
elixir---shakira	ESTANDAR	INACTIVO	ATALCADO	EVENTO FORMAL	ALTA	MUJER
funny---mochino	ESTANDAR	ACTIVO	CITRICAS	DEPORTE	MEDIA	MUJER
gaia---yanbal	ESTANDAR	ACTIVO	ATALCADO	USO DIARIO	MEDIA	MUJER
gaultier-divine---jean-paul-gaultier	ESTANDAR	ACTIVO	FLORALES	EVENTO FORMAL	MEDIA	MUJER
good-girl---carolina-herrera	1.1	ACTIVO	FLORALES	OFICINA	ALTA	MUJER
good-girl-blush---carolina-herrera	ESTANDAR	INACTIVO	FLORALES	USO DIARIO	MEDIA	MUJER
guess---guess	ESTANDAR	ACTIVO	FRUTALES	USO DIARIO	MEDIA	MUJER
haya---lattafa	ESTANDAR	ACTIVO	FRUTALES	CITA ROMATICA	MEDIA	MUJER
her-confession---lattafa	ESTANDAR	INACTIVO	FLORALES	EVENTO FORMAL	ALTA	MUJER
her-elixir---burberry	ESTANDAR	ACTIVO	FRUTALES	USO DIARIO	MEDIA	MUJER
honor-and-glory---lattafa	ESTANDAR	ACTIVO	DULCES	OFICINA	ALTA	MUJER
il-femme---ilmin	ESTANDAR	ACTIVO	AMADERADAS	OFICINA	ALTA	MUJER
il-orgasme---ilmin	ESTANDAR	ACTIVO	DULCES	CITA ROMATICA	ALTA	HOMBRE
intense-cafe---montale	ESTANDAR	INACTIVO	FLORALES	OFICINA	ALTA	MUJER
juiced-berry---victoria-secret	ESTANDAR	ACTIVO	DULCES	USO DIARIO	ALTA	MUJER
karpos---ahli	ESTANDAR	ACTIVO	FRUTALES	CITA ROMATICA	ALTA	MUJER
khamrah---lattafa	1.1	ACTIVO	DULCES	CITA ROMATICA	ALTA	UNISEX
ladventure-grapefruit---al-hamarain	ESTANDAR	ACTIVO	DULCES	CITA ROMATICA	ALTA	MUJER
la-vie-est-belle---lancome	1.1	ACTIVO	FLORALES	USO DIARIO	ALTA	MUJER
lady-million-royal---paco-rabanne	ESTANDAR	INACTIVO	AMADERADAS	OFICINA	MEDIA	MUJER
light-blue-for-her---dng	ESTANDAR	ACTIVO	CITRICAS	DEPORTE	MEDIA	MUJER
mallow-madness---lattafa	ESTANDAR	ACTIVO	DULCES	CITA ROMATICA	ALTA	MUJER
mango-temptation---victoria-secret	ESTANDAR	ACTIVO	FRUTALES	USO DIARIO	MEDIA	MUJER
marshmallow-blush---paris-corner	ESTANDAR	ACTIVO	DULCES	CITA ROMATICA	ALTA	MUJER
meow---katty-perry	ESTANDAR	ACTIVO	DULCES	OFICINA	ALTA	MUJER
miss-dior-edp---dior	1.1	ACTIVO	AMADERADAS	OFICINA	ALTA	MUJER
bleecker-street---bond-n9	ESTANDAR	ACTIVO	ORIENTALES/ESPECIADAS	USO DIARIO	MEDIA	MUJER
mood-vanilla---ariana-grande	ESTANDAR	INACTIVO	ACTIVO	ACTIVO	ACTIVO	MUJER
moon-sparkle---escada	ESTANDAR	INACTIVO	ACTIVO	ACTIVO	ACTIVO	MUJER
narcotic-delight---initio	ESTANDAR	ACTIVO	ORIENTALES/ESPECIADAS	EVENTO FORMAL	ALTA	UNISEX
nebras---lattafa	ESTANDAR	ACTIVO	DULCES	EVENTO FORMAL	ALTA	MUJER
noble-blush---lattafa	ESTANDAR	ACTIVO	DULCES	CITA ROMATICA	MEDIA	MUJER
odyssey-candee---armaf	ESTANDAR	ACTIVO	FRUTALES	OFICINA	MEDIA	MUJER
olympea---paco-rabanne	ESTANDAR	ACTIVO	FLORALES	OFICINA	ALTA	MUJER
omnia-amethyst---bvlgari	ESTANDAR	ACTIVO	FLORALES	OFICINA	BAJA	MUJER
omnia-cristaline---bvlgari	ESTANDAR	ACTIVO	FRESCO	USO DIARIO	BAJA	MUJER
oud-maracuja---maison-crivelli	ESTANDAR	ACTIVO	FRUTALES	EVENTO FORMAL	ALTA	MUJER
oud-sublime---lattafa	ESTANDAR	ACTIVO	DULCES	CITA ROMATICA	ALTA	MUJER
paris-hilton---paris-hilton	ESTANDAR	ACTIVO	FRUTALES	OFICINA	MEDIA	MUJER
paradoxe---prada	ESTANDAR	ACTIVO	FLORALES	USO DIARIO	MEDIA	MUJER
pineapple---dolce-and-gabanna	ESTANDAR	ACTIVO	FRUTALES	USO DIARIO	MEDIA	MUJER
queen---bharara	1.1	ACTIVO	FLORALES	EVENTO FORMAL	ALTA	MUJER
ralph-lauren---ralph	ESTANDAR	ACTIVO	FRESCO	DEPORTE	MEDIA	MUJER
roses-musk---montale	ESTANDAR	ACTIVO	FLORALES	EVENTO FORMAL	MEDIA	MUJER
royal-amber---orientica-dorada	ESTANDAR	INACTIVO	ACTIVO	ACTIVO	ACTIVO	MUJER
sorbetto-rosso---escada	ESTANDAR	ACTIVO	FRUTALES	USO DIARIO	ALTA	MUJER
sublime---lattafa	ESTANDAR	ACTIVO	DULCES	CITA ROMATICA	ALTA	MUJER
sunkissed-goddess---killian	ESTANDAR	INACTIVO	ACTIVO	ACTIVO	ACTIVO	MUJER
sweet-like-candy---ariana-grande	ESTANDAR	INACTIVO	ACTIVO	ACTIVO	ACTIVO	MUJER
temptation---yanbal	ESTANDAR	ACTIVO	FRESCO	DEPORTE	BAJA	HOMBRE
thank-you-next---ariana-grande	ESTANDAR	ACTIVO	DULCES	CITA ROMATICA	MEDIA	MUJER
tous---yara	ESTANDAR	ACTIVO	FRUTALES	USO DIARIO	ALTA	MUJER
toy-2---mochino	ESTANDAR	ACTIVO	CITRICAS	DEPORTE	MEDIA	MUJER
toy-2-bubblegum---moschino	ESTANDAR	ACTIVO	DULCES	USO DIARIO	ALTA	MUJER
toy-2-pearls---moschino	ESTANDAR	ACTIVO	AROMATICO	USO DIARIO	MEDIA	MUJER
vanilla-lace---victoria-secret	ESTANDAR	ACTIVO	DULCES	OFICINA	ALTA	MUJER
velvet-gold---orientica	ESTANDAR	ACTIVO	ORIENTALES/ESPECIADAS	OFICINA	MEDIA	MUJER
very-good-girl-glam---carolina-herrera	ESTANDAR	INACTIVO	AMADERADAS	OFICINA	MEDIA	MUJER
whipped-pleasure---lattafa	ESTANDAR	ACTIVO	DULCES	CITA ROMATICA	ALTA	MUJER
yara---lattafa	1.1	ACTIVO	DULCES	EVENTO FORMAL	ALTA	MUJER
yara-candy---lattafa	1.1	ACTIVO	DULCES	CITA ROMATICA	ALTA	MUJER
yara-moi---lattafa	ESTANDAR	INACTIVO	FLORALES	OFICINA	MEDIA	MUJER
yum-yum---armaf	ESTANDAR	ACTIVO	FRUTALES	OFICINA	MEDIA	MUJER`;

const inventoryMap = {};

// Parse raw list
rawList.split('\n').slice(1).forEach(line => {
    let parts = line.split('\t');
    if (parts.length >= 7) {
        let nameRaw = parts[0].trim();
        let gen = parts[6].trim().toUpperCase();
        inventoryMap[nameRaw] = gen;
    }
});

const files = fs.readdirSync(imgDir).filter(f => f.match(/\.(png|jpe?g)$/i) && !f.includes('placeholder'));

const db = {
    magnetismo: [],
    elegante: [],
    imponente: [],
    vibrante: [],
    sensual: [],
    diferente: []
};

// Formato de nombre
const formatName = (f) => {
    let name = f.replace(/\.(png|jpe?g)$/i, '')
                .replace(/---/g, ' - ')
                .replace(/-/g, ' ')
                .trim();
    return name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
};

// Función para obtener género estricto
const getStrictGender = (f) => {
    let baseName = f.replace(/\.(png|jpe?g)$/i, '').trim();
    let exactGen = inventoryMap[baseName];
    
    // Si lo encontró en el inventario
    if (exactGen === 'HOMBRE') return 'hombre';
    if (exactGen === 'MUJER') return 'mujer';
    if (exactGen === 'UNISEX') {
        // Obligatorio decidir entre hombre y mujer
        if (baseName.includes('oud-maracuja') || baseName.includes('oud-amethyst') || baseName.includes('narcotic') || baseName.includes('erba-pura') || baseName.includes('azure-fantasy')) return 'hombre';
        if (baseName.includes('amber-oud') || baseName.includes('amber-rouge') || baseName.includes('khamrah') || baseName.includes('ahli-vega')) return 'mujer';
        return 'mujer'; // Default for sweet unisex
    }
    
    // Fallback if not found exactly
    let fn = f.toLowerCase();
    if (fn.includes('hombre') || fn.includes('men') || fn.includes('pour homme') || fn.includes('boy')) return 'hombre';
    if (fn.includes('mujer') || fn.includes('her') || fn.includes('femme') || fn.includes('girl') || fn.includes('donna') || fn.includes('lady') || fn.includes('blush') || fn.includes('madmoiselle') || fn.includes('rose') || fn.includes('pink') || fn.includes('candy')) return 'mujer';
    
    // Hardcoded known fallbacks
    if (fn.includes('aventus') && !fn.includes('her')) return 'hombre';
    if (fn.includes('baccarat') || fn.includes('rouge')) return 'mujer';
    if (fn.includes('santal')) return 'hombre';
    if (fn.includes('megamare') || fn.includes('oud')) return 'hombre';

    return 'mujer';
};

const getPerfumeData = (filename, formattedName, genderVal) => {
    const fn = filename.toLowerCase();

    // Default template
    let data = {
        category: 'diferente',
        perfumerType: 'Comercial',
        climate: 'Versátil, Uso Diario',
        accords: 'Aromático, Amaderado',
        concentration: 'Eau de Parfum',
        year: 'Reciente',
        topBase: 'Bergamota, Pimienta Rosa',
        midBase: 'Jazmín, Lavanda',
        baseNotes: 'Almizcle, Maderas'
    };

    // 2. Base de Conocimiento de Perfumería
    if (fn.includes('aventus') && !fn.includes('her')) {
        data = { ...data, category: 'elegante', perfumerType: 'Nicho', climate: 'Versátil, Firma Personal', accords: 'Afrutado, Dulce, Cuero', concentration: 'Eau de Parfum', year: '2010', topBase: 'Piña, Bergamota, Manzana', midBase: 'Abedul, Pachulí, Jazmín', baseNotes: 'Almizcle, Musgo de Roble, Ámbar Gris' };
    } else if (fn.includes('aventus for her')) {
        data = { ...data, category: 'elegante', perfumerType: 'Nicho', climate: 'Primavera, Uso Diario', accords: 'Afrutado, Cítrico, Amaderado', concentration: 'Eau de Parfum', year: '2016', topBase: 'Manzana Verde, Bergamota, Pachulí', midBase: 'Rosa, Sándalo, Almizcle', baseNotes: 'Grosella Negra, Ylang-Ylang, Lila' };
    } else if (fn.includes('club de nuit intense')) {
        data = { ...data, category: 'imponente', perfumerType: 'Árabe', climate: 'Versátil (Día y Noche)', accords: 'Cítrico, Afrutado, Ahumado', concentration: 'Eau de Toilette', year: '2015', topBase: 'Limón, Piña, Bergamota, Grosellas', midBase: 'Abedul, Jazmín, Rosa', baseNotes: 'Almizcle, Ámbar Gris, Pachulí' };
    } else if (fn.includes('baccarat') || fn.includes('rouge')) {
        data = { ...data, category: 'imponente', perfumerType: 'Nicho', climate: 'Eventos, Noche', accords: 'Ámbar, Almizclado, Amaderado', concentration: 'Eau de Parfum', year: '2015', topBase: 'Azafrán, Jazmín', midBase: 'Amberwood, Ámbar Gris', baseNotes: 'Resina de Abeto, Cedro' };
    } else if (fn.includes('khamrah')) {
        data = { ...data, category: 'magnetismo', perfumerType: 'Árabe', climate: 'Otoño (Templado), Noche', accords: 'Dulce, Vainilla, Especiado Cálido', concentration: 'Eau de Parfum', year: '2022', topBase: 'Canela, Nuez Moscada, Bergamota', midBase: 'Dátiles, Praliné, Nardos', baseNotes: 'Vainilla, Haba Tonka, Mirra' };
    } else if (fn.includes('cloud')) {
        data = { ...data, category: 'sensual', perfumerType: 'Comercial', climate: 'Uso Diario, Invierno', accords: 'Dulce, Lactónico, Coco', concentration: 'Eau de Parfum', year: '2018', topBase: 'Lavanda, Pera, Bergamota', midBase: 'Crema Batida, Praliné, Coco', baseNotes: 'Almizcle, Notas Amaderadas' };
    } else if (fn.includes('9pm')) {
        data = { ...data, category: 'sensual', perfumerType: 'Árabe', climate: 'Noche, Fiesta', accords: 'Dulce, Afrutado, Vainilla', concentration: 'Eau de Parfum', year: '2020', topBase: 'Manzana, Canela, Lavanda Salvaje', midBase: 'Flor de Azahar, Lirio de los Valles', baseNotes: 'Vainilla, Haba Tonka, Ámbar' };
    } else if (fn.includes('delina')) {
        data = { ...data, category: 'elegante', perfumerType: 'Nicho', climate: 'Primavera, Eventos', accords: 'Rosa, Floral, Afrutado', concentration: 'Eau de Parfum', year: '2017', topBase: 'Lichi, Ruibarbo, Bergamota, Nuez Moscada', midBase: 'Rosa Turca, Peonía, Almizcle', baseNotes: 'Cachemira, Cedro, Incienso' };
    } else if (fn.includes('bleu')) {
        data = { ...data, category: 'elegante', perfumerType: 'Comercial', climate: 'Oficina, Formal', accords: 'Cítrico, Amaderado, Aromático', concentration: 'Eau de Parfum', year: '2014', topBase: 'Toronja, Limón, Menta, Pimienta Rosa', midBase: 'Jengibre, Nuez Moscada, Jazmín', baseNotes: 'Incienso, Vetiver, Cedro, Sándalo' };
    } else if (fn.includes('light blue')) {
        data = { ...data, category: 'vibrante', perfumerType: 'Comercial', climate: 'Verano (Calor), Uso Diario', accords: 'Cítrico, Amaderado, Fresco', concentration: 'Eau de Toilette', year: '2001', topBase: 'Limón Siciliano, Manzana, Cedro', midBase: 'Bambú, Jazmín, Rosa Blanca', baseNotes: 'Cedro, Almizcle, Ámbar' };
    } else if (fn.includes('black opium')) {
        data = { ...data, category: 'imponente', perfumerType: 'Comercial', climate: 'Noche, Eventos', accords: 'Vainilla, Café, Dulce', concentration: 'Eau de Parfum', year: '2014', topBase: 'Pera, Pimienta Rosa, Flor de Azahar', midBase: 'Café, Jazmín, Almandra Amarga', baseNotes: 'Vainilla, Pachulí, Cedro' };
    } else if (fn.includes('acqua di gioia') || fn.includes('aqua-di-gioia')) {
        data = { ...data, category: 'vibrante', perfumerType: 'Comercial', climate: 'Verano, Fresco', accords: 'Aromático, Cítrico, Acuático', concentration: 'Eau de Parfum', year: '2010', topBase: 'Limón de Amalfi, Menta', midBase: 'Jazmín de Agua', baseNotes: 'Pachulí, Azúcar Moreno' };
    } else if (fn.includes('acqva') || fn.includes('aqua') || fn.includes('aqva')) {
        data = { ...data, category: 'vibrante', perfumerType: 'Comercial', climate: 'Verano, Uso Diario', accords: 'Marino, Cítrico, Aromático', concentration: 'Eau de Toilette', year: 'Clásico', topBase: 'Lima, Limón, Bergamota, Jazmín', midBase: 'Notas Marinas, Durazno, Fresia', baseNotes: 'Musgo de Roble, Cedro, Almizcle Blanco' };
    } else if (fn.includes('santal 33')) {
        data = { ...data, category: 'diferente', perfumerType: 'Nicho', climate: 'Otoño, Firma Personal', accords: 'Amaderado, Atalcado, Cuero', concentration: 'Eau de Parfum', year: '2011', topBase: 'Cardamomo, Violeta, Papiro', midBase: 'Iris, Ámbar', baseNotes: 'Sándalo Australiano, Cuero, Madera de Cedro' };
    } else if (fn.includes('ombre leather')) {
        data = { ...data, category: 'imponente', perfumerType: 'Nicho', climate: 'Noche, Invierno', accords: 'Cuero, Animalico, Especiado', concentration: 'Eau de Parfum', year: '2018', topBase: 'Cardamomo', midBase: 'Cuero, Jazmín Sambac', baseNotes: 'Ámbar, Musgo, Pachulí' };
    } else if (fn.includes('sauvage')) {
        data = { ...data, category: 'magnetismo', perfumerType: 'Comercial', climate: 'Versátil, Noche', accords: 'Fresco Especiado, Ámbar, Cítrico', concentration: 'Eau de Parfum', year: '2015', topBase: 'Bergamota de Calabria, Pimienta', midBase: 'Pimienta de Sichuan, Lavanda, Vetiver', baseNotes: 'Ambroxan, Cedro, Ládano' };
    } else if (fn.includes('yara') && !fn.includes('tous')) {
        data = { ...data, category: 'sensual', perfumerType: 'Árabe', climate: 'Citas, Uso Diario', accords: 'Dulce, Vainilla, Tropical', concentration: 'Eau de Parfum', year: '2020', topBase: 'Orquídea, Heliotropo, Naranja', midBase: 'Gourmand, Frutas Tropicales', baseNotes: 'Vainilla, Almizcle, Sándalo' };
    } else if (fn.includes('megamare')) {
        data = { ...data, category: 'diferente', perfumerType: 'Nicho', climate: 'Día, Fresco Extremo', accords: 'Marino, Salado, Aromático', concentration: 'Parfum', year: '2019', topBase: 'Notas Marinas, Sal', midBase: 'Algas, Yodo', baseNotes: 'Ámbar Gris, Almizcle' };
    } else if (fn.includes('bianco latte')) {
        data = { ...data, category: 'diferente', perfumerType: 'Nicho', climate: 'Invierno, Dulce', accords: 'Gourmand, Caramelo, Vainilla', concentration: 'Eau de Parfum', year: '2020', topBase: 'Caramelo', midBase: 'Miel, Cumarina', baseNotes: 'Vainilla, Almizcle Blanco' };
    } else if (fn.includes('oud maracuja')) {
        data = { ...data, category: 'diferente', perfumerType: 'Nicho', climate: 'Otoño, Versátil', accords: 'Afrutado, Oud, Cuero', concentration: 'Extrait de Parfum', year: '2023', topBase: 'Maracuyá, Azafrán', midBase: 'Madera de Oud, Rosa Turca', baseNotes: 'Cuero, Pachulí, Vainilla' };
    } else if (fn.includes('angels share') || fn.includes('khamrah')) {
        data = { ...data, category: 'magnetismo', perfumerType: 'Nicho', climate: 'Fiesta, Invierno', accords: 'Cálido Especiado, Vainilla, Roble', concentration: 'Eau de Parfum', year: '2020', topBase: 'Coñac', midBase: 'Canela, Haba Tonka, Roble', baseNotes: 'Vainilla, Praliné, Sándalo' };
    } else if (fn.includes('nebras')) {
        data = { ...data, category: 'sensual', perfumerType: 'Árabe', climate: 'Noche, Citas', accords: 'Cacao, Vainilla, Dulce', concentration: 'Eau de Parfum', year: '2022', topBase: 'Frutos Rojos, Mandarina', midBase: 'Vainilla, Cacao, Rosa', baseNotes: 'Azúcar, Haba Tonka, Almizcle' };
    } else if (fn.includes('eclaire')) {
        data = { ...data, category: 'magnetismo', perfumerType: 'Árabe', climate: 'Citas, Uso Diario', accords: 'Caramelo, Dulce, Gourmand', concentration: 'Eau de Parfum', year: 'Reciente', topBase: 'Caramelo, Leche', midBase: 'Miel, Flores Blancas', baseNotes: 'Vainilla, Praliné, Almizcle' };
    } else if (fn.includes('invictus')) {
        data = { ...data, category: 'vibrante', perfumerType: 'Comercial', climate: 'Deporte, Calor', accords: 'Marino, Cítrico, Fresco', concentration: 'Eau de Toilette', year: '2013', topBase: 'Notas Marinas, Toronja, Mandarina', midBase: 'Hoja de Laurel, Jazmín', baseNotes: 'Ámbar Gris, Madera de Guaico' };
    } else if (fn.includes('one million') || fn.includes('1 million')) {
        data = { ...data, category: 'magnetismo', perfumerType: 'Comercial', climate: 'Fiesta, Noche', accords: 'Cálido Especiado, Cuero, Canela', concentration: 'Eau de Toilette', year: '2008', topBase: 'Mandarina Roja, Toronja, Menta', midBase: 'Canela, Notas Especiadas, Rosa', baseNotes: 'Ambar, Cuero, Pachulí Hindú' };
    } else if (fn.includes('good girl')) {
        data = { ...data, category: 'magnetismo', perfumerType: 'Comercial', climate: 'Noche, Citas', accords: 'Dulce, Floral Blanco, Cacao', concentration: 'Eau de Parfum', year: '2016', topBase: 'Almendra, Café, Bergamota', midBase: 'Nardos, Jazmín, Flor de Azahar', baseNotes: 'Haba Tonka, Cacao, Vainilla' };
    } else if (fn.includes('212')) {
        if (fn.includes('vip')) {
            data = { ...data, category: 'magnetismo', perfumerType: 'Comercial', climate: 'Fiesta, Noche', accords: 'Dulce, Afrutado, Ron', topBase: 'Maracuyá, Ron', midBase: 'Gardenia, Almizcle', baseNotes: 'Vainilla, Haba Tonka' };
        } else {
            data = { ...data, category: 'vibrante', perfumerType: 'Comercial', climate: 'Día, Oficina', accords: 'Fresco, Floral, Verde', topBase: 'Cítricos, Notas Verdes', midBase: 'Gardenia, Jazmín', baseNotes: 'Madera de Sándalo, Almizcle' };
        }
    } else {
        // Asignación heurística genérica si no es reconocida directamente
        if (fn.includes('oud') || fn.includes('leather') || fn.includes('noir') || fn.includes('black') || fn.includes('intense')) {
            data.category = 'imponente';
            data.accords = 'Amaderado, Ahumado, Cuero';
            data.topBase = 'Especias, Pimienta, Bergamota';
            data.midBase = 'Cuero, Oud, Incienso';
            data.baseNotes = 'Ámbar, Maderas Oscuras, Pachulí';
            data.climate = 'Noche, Formal, Invierno';
        } else if (fn.includes('aqua') || fn.includes('blue') || fn.includes('sport') || fn.includes('fresh') || fn.includes('summer')) {
            data.category = 'vibrante';
            data.accords = 'Cítrico, Marino, Fresco Especiado';
            data.topBase = 'Limón, Bergamota, Brisa Marina';
            data.midBase = 'Jazmín, Notas Verdes, Lavanda';
            data.baseNotes = 'Almizcle, Cedro, Musgo';
            data.climate = 'Verano, Día, Deporte';
        } else if (fn.includes('amber') || fn.includes('gold') || fn.includes('rouge') || fn.includes('rose')) {
            data.category = 'magnetismo';
            data.accords = 'Dulce, Oriental, Cálido';
            data.topBase = 'Frutos Rojos, Especias Dulces';
            data.midBase = 'Rosa, Ámbar, Vainilla';
            data.baseNotes = 'Praliné, Almizcle, Maderas Finas';
            data.climate = 'Otoño, Versátil, Citas';
        } else if (fn.includes('sensual') || fn.includes('night') || fn.includes('secret') || fn.includes('seduction') || fn.includes('kiss')) {
            data.category = 'sensual';
            data.accords = 'Gourmand, Atalcado, Íntimo';
            data.topBase = 'Frutas Jugosas, Naranja';
            data.midBase = 'Flores Blancas, Cacao, Caramelo';
            data.baseNotes = 'Vainilla, Almizcle, Sándalo';
            data.climate = 'Noche, Romántico, Citas';
        } else if (fn.includes('classic') || fn.includes('chanel') || fn.includes('dior') || fn.includes('white')) {
            data.category = 'elegante';
            data.accords = 'Floral Limpio, Fresco, Amaderado';
            data.topBase = 'Cítricos Finos, Neroli';
            data.midBase = 'Lirio, Peonía, Geranio';
            data.baseNotes = 'Vetiver, Cedro, Almizcle Blanco';
            data.climate = 'Oficina, Formal, Todo el Año';
        }

        // Determinar "Tipo" de Perfume según nombre
        if (fn.includes('lattafa') || fn.includes('armaf') || fn.includes('orientica') || fn.includes('afnan') || fn.includes('al-hamarain')) {
            data.perfumerType = 'Árabe';
        } else if (fn.includes('creed') || fn.includes('xerjoff') || fn.includes('marly') || fn.includes('initio') || fn.includes('montale') || fn.includes('mancera') || fn.includes('tiziana') || fn.includes('crivelli') || fn.includes('ilmin') || fn.includes('le labo') || fn.includes('orto')) {
            data.perfumerType = 'Nicho';
        } else {
            data.perfumerType = 'Comercial';
        }
    }

    return data;
};

// Generador de descripciones
const getDescriptions = (data, pName) => {
    let p1 = "";
    let p2 = "";

    switch(data.category) {
        case 'magnetismo':
            p1 = `El magnetismo envuelto en un frasco. ${pName} es una obra maestra olfativa diseñada para paralizar el tiempo y atraer todas las miradas hacia ti. Su ADN olfativo rico y denso se mezcla con la piel para crear una experiencia inolvidable.`;
            p2 = `Su estela es altamente adictiva y proyecta una gran aura de misterio y calidez. Perfecta para ocasiones donde buscas destacar, conquistar y dejar una huella imborrable a tu paso.`;
            break;
        case 'elegante':
            p1 = `Elegancia, estructura y pulcritud absoluta. ${pName} representa el equilibrio perfecto entre sofisticación y buen gusto, siendo una fragancia impecable para el entorno profesional o eventos de gran categoría.`;
            p2 = `Proyecta un aura de limpieza y gran clase sin ser invasiva. Su estela moderada pero duradera habla de una persona que cuida cada detalle de su imagen y transmite autoridad cálida.`;
            break;
        case 'imponente':
            p1 = `Oscura, bestial e intensamente dominante. ${pName} no es una fragancia para personas tímidas; es un manifiesto de poder. Un aroma estructurado para quienes lideran y exigen respeto en cualquier situación.`;
            p2 = `Cuenta con una de las estelas más agresivas y potentes de la perfumería moderna. Su longevidad es extrema, asegurando que tu presencia se sienta mucho antes de llegar y mucho después de irte.`;
            break;
        case 'vibrante':
            p1 = `Un estallido de frescura y vitalidad embotellada. ${pName} es el toque de energía perfecto para iniciar tu día. Una interpretación brillante de la pureza que refresca y revitaliza tus sentidos al instante.`;
            p2 = `Su proyección es ligera, chispeante y altamente agradable para cualquier olfato. Es tu mejor aliado para climas cálidos, actividades al aire libre o jornadas deportivas intensas.`;
            break;
        case 'sensual':
            p1 = `Calidez en estado puro. ${pName} ha sido diseñada meticulosamente para las distancias cortas, con un perfil gourmand e íntimo que reconforta, seduce y provoca el deseo de acercarse más.`;
            p2 = `En piel se comporta como un suave velo adictivo y cremoso. No busca llenar la habitación, sino premiar a aquellos que tienen el privilegio de estar cerca de ti, creando una memoria olfativa romántica.`;
            break;
        case 'diferente':
            p1 = `Una experiencia olfativa fuera del radar. ${pName} es una creación vanguardista, exótica y desafiante. Representa la perfumería como arte abstracto para quienes buscan romper con las reglas de lo comercial.`;
            p2 = `Su evolución en piel es compleja y cuenta una historia diferente con el paso de las horas. Ideal para convertirte en el centro de la conversación y proyectar una identidad 100% exclusiva y enigmática.`;
            break;
    }

    return `${p1}<br><br>${p2}`;
};

files.forEach(f => {
    let name = formatName(f);
    let strictGender = getStrictGender(f);
    let data = getPerfumeData(f, name, strictGender);
    let desc = getDescriptions(data, name);

    let displayGender = strictGender === 'hombre' ? 'Masculino' : 'Femenino';

    let details = [
        { i: '⚧️', l: 'GÉNERO', v: displayGender },
        { i: '🌟', l: 'CATEGORÍA', v: data.perfumerType },
        { i: '🌤️', l: 'CLIMA', v: data.climate },
        { i: '🎼', l: 'ACORDES', v: data.accords },
        { i: '💧', l: 'CONCENTRACIÓN', v: data.concentration },
        { i: '📅', l: 'AÑO', v: data.year },
        { i: '🔺', l: 'NOTAS DE SALIDA', v: data.topBase },
        { i: '🔶', l: 'NOTAS DE CORAZÓN', v: data.midBase },
        { i: '🔻', l: 'NOTAS DE BASE', v: data.baseNotes }
    ];

    db[data.category].push({
        name: name,
        gender: strictGender, // EXACTLY AND ONLY 'hombre' or 'mujer'
        img: `assets/products/${f}`,
        desc: desc,
        details: details
    });
});

let jsContent = `// Base de datos de perfumes regenerada Estrictamente por Género
const perfumesDB = ${JSON.stringify(db, null, 4)};

// Bloqueamos modificaciones adicionales a la base de datos
Object.freeze(perfumesDB);
`;

fs.writeFileSync(outFile, jsContent, 'utf-8');
console.log('js/perfumesDB.js STRICTLY ENRICHED successfully! Total items:', files.length);

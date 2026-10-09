const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'assets/products');
const outFile = path.join(__dirname, 'js/perfumesDB.js');

if (!fs.existsSync(path.dirname(outFile))) {
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
}

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
    // Capitalize
    return name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
};

files.forEach(f => {
    let filename = f.toLowerCase();
    let name = formatName(f);
    
    // Asignar Género
    let gender = 'unisex';
    if (filename.includes('hombre') || filename.includes('men') || filename.includes('pour homme') || filename.includes('boy')) {
        gender = 'hombre';
    } else if (filename.includes('mujer') || filename.includes('her') || filename.includes('femme') || filename.includes('girl') || filename.includes('donna') || filename.includes('lady')) {
        gender = 'mujer';
    }

    // Clasificación a través de palabras clave y hardcoded para los más conocidos
    let category = 'diferente';
    
    // Categorías específicas (heurísticas)
    const vibranteKeys = ['aqua', 'acqua', 'blue', 'bleu', 'sport', 'fresh', 'cool', 'voyage', 'summer', 'cedrat', 'cielo', 'diesel', 'energise', 'funny', 'invictus', 'limmensite', 'limoni', 'mandarin', 'moon', 'nautica', 'polo', 'ralph', 'sorbetto', 'starwalker', 'tommy'];
    const imponenteKeys = ['oud', 'leather', 'black', 'noir', 'megamare', 'extreme', 'asad', 'centaurus', 'club de nuit intense', 'elixir sauvage', 'man in black', 'montana', 'ombre', 'spice boom', 'viking'];
    const magnetismoKeys = ['gold', 'rouge', 'amber', 'khamrah', 'million', 'club de nuit untold', 'atomic rose', 'eclaire', 'honor and glory', 'naxxos', 'nebras', 'narcotic', 'olympea', 'queen', 'royal', 'stronger', 'victory', 'velvet'];
    const sensualKeys = ['night', 'opium', 'sensual', 'eros', 'scandal', 'seduction', '9pm', 'angels', 'ari', 'bff', 'can can', 'celos', 'cloud', 'dessert', 'devotion', 'il femme', 'il orgasme', 'mallow', 'meow', 'osadia', 'paradise', 'candy', 'yara', 'yum'];
    const eleganteKeys = ['rose', 'classic', 'elegante', 'chanel', 'dior', 'loewe', 'cartier', 'bvlgari', 'amethyste', 'aventus', 'bottled', 'burberry', 'ch men', 'ccori', 'delina', 'donna', 'emblem', 'eternity', 'gaia', 'givenchy', 'guess', 'haya', 'insurrection', 'le male', 'millesime', 'omnia', 'paradoxe', 'profumo', 'silver mountain'];
    
    if (vibranteKeys.some(k => filename.includes(k))) category = 'vibrante';
    else if (imponenteKeys.some(k => filename.includes(k))) category = 'imponente';
    else if (magnetismoKeys.some(k => filename.includes(k))) category = 'magnetismo';
    else if (sensualKeys.some(k => filename.includes(k))) category = 'sensual';
    else if (eleganteKeys.some(k => filename.includes(k))) category = 'elegante';
    
    // Correcciones manuales
    if (filename.includes('212')) {
        if (filename.includes('vip')) category = 'magnetismo';
        else category = 'vibrante';
    }

    let descMap = {
        vibrante: "Un estallido de energía y frescura. Ideal para días activos donde necesitas proyectar limpieza y vitalidad constante.",
        imponente: "Oscura, densa y absolutamente dominante. Para cuando necesitas que tu presencia llene la habitación de inmediato.",
        magnetismo: "Dulce, exótica y highly adictiva. Una fragancia que envuelve y atrae todas las miradas hacia ti.",
        sensual: "Íntima, cálida y misteriosa. Diseñada para las distancias cortas y dejar un recuerdo imborrable en la piel.",
        elegante: "Sofisticación pura. Impecable, pulcra y estructurada. La elección perfecta para proyectar profesionalismo y gran clase.",
        diferente: "Innovadora, inusual y fuera de lo convencional. Para quienes prefieren una firma olfativa verdaderamente única."
    };

    let detailsMap = {
        vibrante: { clima: 'Día, Calor, Deporte', acordes: 'Cítricos, Acuáticos, Frescos', intensidad: 'Media' },
        imponente: { clima: 'Noche, Frio, Formal', acordes: 'Maderas pesadas, Cuero', intensidad: 'Extrema' },
        magnetismo: { clima: 'Tarde/Noche, Versátil', acordes: 'Dulce, Oriental, Cálido', intensidad: 'Alta' },
        sensual: { clima: 'Noche, Citas, Íntimo', acordes: 'Vainilla, Gourmand, Atalcado', intensidad: 'Alta' },
        elegante: { clima: 'Oficina, Formal, Día', acordes: 'Florales limpios, Maderas', intensidad: 'Media-Alta' },
        diferente: { clima: 'Cualquier momento', acordes: 'Nicho, Exóticos, Contrastes', intensidad: 'Alta' }
    };

    let details = [
        { i: '⚧️', l: 'Género', v: gender === 'hombre' ? 'Masculino' : gender === 'mujer' ? 'Femenino' : 'Unisex' },
        { i: '🌤️', l: 'Clima', v: detailsMap[category].clima },
        { i: '🎼', l: 'Acordes', v: detailsMap[category].acordes },
        { i: '💧', l: 'Intensidad', v: detailsMap[category].intensidad }
    ];

    db[category].push({
        name: name,
        gender: gender,
        img: `assets/products/${f}`,
        desc: descMap[category],
        details: details
    });
});

let jsContent = `// Base de datos de perfumes generada automáticamente
const perfumesDB = ${JSON.stringify(db, null, 4)};
`;

fs.writeFileSync(outFile, jsContent, 'utf-8');
console.log('js/perfumesDB.js generated successfully! Total items:', files.length);

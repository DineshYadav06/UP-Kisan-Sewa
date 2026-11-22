"""Seed script to populate crops, schemes, videos, KVKs, and expert questions."""

import asyncio
import os
import sys
from datetime import datetime, timezone

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from app.db.mongo import get_db, close_mongo


async def seed_content():
    db = get_db()
    now = datetime.now(timezone.utc).isoformat()

    # 1. CROPS
    crops = [
        {
            "slug": "gehu-sample",
            "name_hi": "गेहूँ",
            "name_en": "Wheat",
            "botanical": "Triticum aestivum",
            "category": "cereal",
            "category_hi": "अनाज",
            "category_en": "Cereals",
            "seasons": ["rabi"],
            "season_hi": "रबी",
            "season_en": "Rabi",
            "duration": "115-130 दिन",
            "suitable_climate": "समशीतोष्ण जलवायु। बुवाई पर 20-22°C और पकते समय 25-30°C तापमान।",
            "soil_requirement": "दोमट एवं बलुई दोमट भूमि, जल निकास की उत्तम व्यवस्था। pH 6.5 - 7.5।",
            "sowing_period": "समय से बुवाई: 15-25 नवम्बर; देर से बुवाई: 25 नवम्बर - 15 दिसम्बर।",
            "seed_rate": "100 किग्रा/हेक्टेयर (सामान्य), 125 किग्रा/हेक्टेयर (देरी से बुवाई)।",
            "recommended_varieties": [
                {"name": "डीबीडब्ल्यू 187 (करन वंदना)", "yield": "55-65 कुंतल/हे.", "features": "पीला रतुआ रोधी, उच्च प्रोटीन"},
                {"name": "डीबीडब्ल्यू 303 (करन वैष्णवी)", "yield": "60-70 कुंतल/हे.", "features": "अगेती बुवाई, मजबूत तना"},
                {"name": "एचडी 2967", "yield": "50-55 कुंतल/हे.", "features": "समय से बुवाई हेतु उ.प्र. में लोकप्रिय"},
                {"name": "एचडी 3086 (पूसा गौतमी)", "yield": "52-58 कुंतल/हे.", "features": "ताप सहनशील, दाना चमकदार"}
            ],
            "irrigation": [
                {"stage": "प्रथम सिंचाई (ताज मूल / CRI)", "days": "20-25 दिन पर (सर्वाधिक महत्वपूर्ण)"},
                {"stage": "द्वितीय सिंचाई (कल्ले फूटते समय)", "days": "40-45 दिन पर"},
                {"stage": "तृतीय सिंचाई (गाभा अवस्था)", "days": "60-65 दिन पर"},
                {"stage": "चतुर्थ सिंचाई (फूल आते समय)", "days": "80-85 दिन पर"},
                {"stage": "पंचम सिंचाई (दूधिया अवस्था)", "days": "100-105 दिन पर"}
            ],
            "fertilizers": "एनपीके: 120:60:40 किग्रा/हेक्टेयर। बुवाई समय पूरी फास्फोरस व पोटाश, आधी यूरिया। शेष यूरिया पहली व दूसरी सिंचाई पर।",
            "weed_management": "सकरी पत्ती (गुल्ली डंडा) हेतु क्लोडिनाफॉप 15% WP 160 ग्राम/एकड़ बुवाई के 30-35 दिन पर 150 लीटर पानी में।",
            "diseases": [
                {"name": "पीला रतुआ (Yellow Rust)", "symptom": "पत्तियों पर पीली धारियां व चूर्ण", "treatment": "प्रोपिकोनाजोल 25 EC का छिड़काव"},
                {"name": "करनाल बंट (Karnal Bunt)", "symptom": "दाने काले चूर्ण में बदलना व दुर्गंध", "treatment": "सत्यापित बीज व थीरम बीजोपचार"}
            ],
            "source": "आचार्य नरेंद्र देव कृषि एवं प्रौद्योगिकी विश्वविद्यालय (NDUAT), कुमारगंज, अयोध्या",
            "source_url": "https://www.nduat.org/",
            "status": "published",
            "created_at": now
        },
        {
            "slug": "dhan-sample",
            "name_hi": "धान",
            "name_en": "Paddy / Rice",
            "botanical": "Oryza sativa",
            "category": "cereal",
            "category_hi": "अनाज",
            "category_en": "Cereals",
            "seasons": ["kharif"],
            "season_hi": "खरीफ",
            "season_en": "Kharif",
            "duration": "120-140 दिन",
            "suitable_climate": "गर्म व नम जलवायु, 25-35°C तापमान और भरपूर वर्षा उपयुक्त।",
            "soil_requirement": "मटियार दोमट एवं भारी दोमट भूमि जिसमें जल धारण क्षमता अधिक हो।",
            "sowing_period": "नर्सरी: 20 मई - 20 जून; रोपाई: 20 जून - 15 जुलाई।",
            "seed_rate": "महीन किस्में: 30-35 किग्रा/हे.; संकर किस्में: 15-20 किग्रा/हे.",
            "recommended_varieties": [
                {"name": "एनडीआर 359", "yield": "55-60 कुंतल/हे.", "features": "मध्यम अवधि, उ.प्र. हेतु सर्वाधिक लोकप्रिय"},
                {"name": "एनडीआर 2064", "yield": "50-55 कुंतल/हे.", "features": "झुलसा व तना छेदक मध्यम रोधी"},
                {"name": "सरजू 52", "yield": "50-55 कुंतल/हे.", "features": "समय पर रोपाई, उत्कृष्ट दाना"},
                {"name": "पूसा बासमती 1509", "yield": "45-50 कुंतल/हे.", "features": "शीघ्र पकने वाली सुगंधित बासमती"}
            ],
            "irrigation": [
                {"stage": "रोपाई के समय", "days": "2-3 सेमी जल भराव"},
                {"stage": "कल्ले निकलते समय", "days": "सक्रिय जल प्रबंधन"},
                {"stage": "बाली निकलते एवं दाना भरते समय", "days": "नमी अति आवश्यक"}
            ],
            "fertilizers": "एनपीके: 120:60:40 + 25 किग्रा जिंक सल्फेट प्रति हेक्टेयर।",
            "weed_management": "रोपाई के 2-3 दिन के भीतर प्रेटिलाक्लोर 50% EC 1.5 लीटर/हे. का छिड़काव।",
            "diseases": [
                {"name": "शीथ ब्लाइट (झुलसा)", "symptom": "तने व पत्ती पर धब्बे", "treatment": "वैलिडामाइसिन 3L 2 मिली/लीटर"},
                {"name": "जीवाणु झुलसा (BLB)", "symptom": "पत्ती किनारों से सूखना", "treatment": "स्ट्रेप्टोसाइक्लिन 6 ग्राम + कॉपर ऑक्सीक्लोराइड 500 ग्राम/हेक्टेयर"}
            ],
            "source": "एनडीयूएटी प्रसार निदेशालय / सस्य विज्ञान विभाग",
            "source_url": "https://www.nduat.org/",
            "status": "published",
            "created_at": now
        },
        {
            "slug": "sarson-sample",
            "name_hi": "सरसों / राई",
            "name_en": "Mustard",
            "botanical": "Brassica juncea",
            "category": "oilseed",
            "category_hi": "तिलहन",
            "category_en": "Oilseeds",
            "seasons": ["rabi"],
            "season_hi": "रबी",
            "season_en": "Rabi",
            "duration": "110-125 दिन",
            "suitable_climate": "ठंडी व शुष्क जलवायु। 15-25°C तापमान।",
            "soil_requirement": "बलुई दोमट से मटियार दोमट भूमि।",
            "sowing_period": "25 सितम्बर - 20 अक्टूबर।",
            "seed_rate": "4-5 किग्रा प्रति हेक्टेयर।",
            "recommended_varieties": [
                {"name": "एनडीआर 8501 (नरेंद्र राई)", "yield": "20-25 कुंतल/हे.", "features": "तेल मात्रा 40%, पाला सहनशील"},
                {"name": "वरुणा (टी 59)", "yield": "18-22 कुंतल/हे.", "features": "पारंपरिक विश्वसनीय किस्म"},
                {"name": "गिरिराज (डीआरएमआरआईजे 31)", "yield": "22-26 कुंतल/हे.", "features": "बोल्ड दाना, उच्च तेल"}
            ],
            "irrigation": [
                {"stage": "प्रथम सिंचाई", "days": "फूल आने से पूर्व (30-35 दिन)"},
                {"stage": "द्वितीय सिंचाई", "days": "फलियाँ बनते समय (60-65 दिन)"}
            ],
            "fertilizers": "एनपीके: 80:40:40 + 20 किग्रा गंधक (सल्फर) प्रति हेक्टेयर।",
            "weed_management": "पेंडीमेथालिन 30% EC 3.3 लीटर/हेक्टेयर बुवाई के 48 घंटे में।",
            "diseases": [
                {"name": "छाछिया / सफेद रतुआ (White Rust)", "symptom": "पत्तियों के नीचे सफेद फफोले", "treatment": "रिडोमिल एमजेड 2 ग्राम/लीटर पानी"},
                {"name": "माहू / चेपा कीट (Aphids)", "symptom": "कोमल डालियों से रस चूसना", "treatment": "इमिडाक्लोप्रिड 17.8 SL 1 मिली प्रति 3 लीटर पानी"}
            ],
            "source": "एनडीयूएटी कृषि अनुसंधान केंद्र",
            "source_url": "https://www.nduat.org/",
            "status": "published",
            "created_at": now
        },
        {
            "slug": "arhar-sample",
            "name_hi": "अरहर (तूर)",
            "name_en": "Pigeon Pea",
            "botanical": "Cajanus cajan",
            "category": "pulse",
            "category_hi": "दलहन",
            "category_en": "Pulses",
            "seasons": ["kharif"],
            "season_hi": "खरीफ",
            "season_en": "Kharif",
            "duration": "140-180 दिन",
            "suitable_climate": "गर्म व अर्द्ध-शुष्क जलवायु।",
            "soil_requirement": "गहरी दोमट भूमि, जलभराव रहित।",
            "sowing_period": "15 जून - 10 जुलाई।",
            "seed_rate": "15-20 किग्रा/हेक्टेयर।",
            "recommended_varieties": [
                {"name": "नरेंद्र अरहर 1 (एनडीए 1)", "yield": "20-25 कुंतल/हे.", "features": "उकठा रोग रोधी, एनडीयूएटी विकसित"},
                {"name": "नरेंद्र अरहर 2", "yield": "22-26 कुंतल/हे.", "features": "मध्यम अवधि, शाखादार"},
                {"name": "बहार", "yield": "25-30 कुंतल/हे.", "features": "दीर्घकालिक, उच्च पैदावार"}
            ],
            "irrigation": [
                {"stage": "शाखाएं बनते समय", "days": "आवश्यकतानुसार"},
                {"stage": "फूल व फली बनते समय", "days": "नमी बनाए रखें"}
            ],
            "fertilizers": "एनपीके: 20:50:20 किग्रा/हेक्टेयर + राइजोबियम संवर्धन।",
            "weed_management": "खुरपी से 25-30 दिन पर निराई-गुड़ाई।",
            "diseases": [
                {"name": "उकठा रोग (Wilt)", "symptom": "पौधे का अचानक सूखना", "treatment": "ट्राइकोडर्मा 5 ग्राम/किग्रा बीजोपचार"},
                {"name": "फली छेदक कीट (Pod Borer)", "symptom": "फलियों में छेद कर दाना खाना", "treatment": "क्लोरांट्रानिलिप्रोल 18.5 SC 0.3 मिली/लीटर"}
            ],
            "source": "दलहन संभाग, एनडीयूएटी कुमारगंज",
            "source_url": "https://www.nduat.org/",
            "status": "published",
            "created_at": now
        },
        {
            "slug": "ganna-sample",
            "name_hi": "गन्ना",
            "name_en": "Sugarcane",
            "botanical": "Saccharum officinarum",
            "category": "commercial",
            "category_hi": "व्यावसायिक",
            "category_en": "Commercial",
            "seasons": ["annual"],
            "season_hi": "वार्षिक / वसंतकालीन",
            "season_en": "Annual",
            "duration": "10-12 माह",
            "suitable_climate": "उष्णकटिबंधीय जलवायु, 20-35°C तापमान।",
            "soil_requirement": "गहरी उपजाऊ दोमट भूमि, उत्तम जल निकास।",
            "sowing_period": "शरदकालीन: अक्टूबर; वसंतकालीन: फरवरी-मार्च।",
            "seed_rate": "75-80 कुंतल तीन आंख वाले टुकड़े प्रति हेक्टेयर।",
            "recommended_varieties": [
                {"name": "को. 0238 (करण 4)", "yield": "800-1000 कुंतल/हे.", "features": "उच्च शर्करा मात्रा, शीघ्र पकने वाली"},
                {"name": "को.शा. 13235", "yield": "850-950 कुंतल/हे.", "features": "लाल सड़न रोधी, नई अगेती किस्म"},
                {"name": "को. लख. 14201", "yield": "800-900 कुंतल/हे.", "features": "मजबूत तना, जलभराव सहनशील"}
            ],
            "irrigation": [
                {"stage": "जमाव उपरांत", "days": "15-20 दिन के अंतराल पर"},
                {"stage": "ग्रीष्म काल में", "days": "10-12 दिन के अंतराल पर"}
            ],
            "fertilizers": "एनपीके: 150:60:60 किग्रा/हेक्टेयर।",
            "weed_management": "एट्राजीन 50% WP 2 किग्रा/हेक्टेयर बुवाई उपरांत।",
            "diseases": [
                {"name": "लाल सड़न रोग (Red Rot)", "symptom": "तने के अंदर लाल रंग व सफेद धारियां", "treatment": "कार्बेन्डाजिम से बीजोपचार व रोगमुक्त बीज"}
            ],
            "source": "उ.प्र. गन्ना शोध संस्थान (UPCSR) / एनडीयूएटी",
            "source_url": "https://www.nduat.org/",
            "status": "published",
            "created_at": now
        }
    ]

    for c in crops:
        await db.crops.delete_many({"slug": c["slug"]})
        await db.crops.insert_one(c)
    print(f"Seeded {len(crops)} crops.")

    # 2. SCHEMES
    schemes = [
        {
            "slug": "pm-kisan",
            "name_hi": "प्रधानमंत्री किसान सम्मान निधि योजना (PM-KISAN)",
            "name_en": "PM Kisan Samman Nidhi Yojana",
            "category_id": "central",
            "category": "central",
            "category_hi": "केन्द्रीय योजना",
            "department": "कृषि एवं किसान कल्याण मंत्रालय, भारत सरकार",
            "benefit": "पात्र कृषक परिवारों को ₹6,000 प्रति वर्ष (₹2,000 की 3 समान किस्तों में) प्रत्यक्ष बैंक खाते (DBT) में।",
            "eligibility": "भूमिधर कृषक परिवार जिनके नाम भू-अभिलेख दर्ज हो एवं e-KYC पूर्ण हो।",
            "documents": [
                "आधार कार्ड (Aadhaar Card)",
                "भू-अभिलेख खतौनी (Khatauni Land Record)",
                "बैंक खाता पासबुक (Aadhaar Seeded)",
                "सक्रिय मोबाइल नंबर"
            ],
            "process": [
                "pmkisan.gov.in पर जाएँ और 'Farmers Corner' में न्यू फार्मर रजिस्ट्रेशन चुनें।",
                "आधार संख्या एवं मोबाइल नंबर दर्ज कर ओटीपी सत्यापित करें।",
                "जनपद, तहसील, ब्लॉक, गाँव एवं खतौनी गाटा संख्या दर्ज करें।",
                "फॉर्म सबमिट करें और पंजीकरण रसीद सुरक्षित रखें।"
            ],
            "officialLink": "https://pmkisan.gov.in/",
            "helpline": "155261 / 1800-180-1551",
            "source": "कृषि एवं किसान कल्याण मंत्रालय",
            "status": "published",
            "created_at": now
        },
        {
            "slug": "pmfby",
            "name_hi": "प्रधानमंत्री फसल बीमा योजना (PMFBY)",
            "name_en": "Pradhan Mantri Fasal Bima Yojana",
            "category_id": "insurance",
            "category": "insurance",
            "category_hi": "फसल बीमा",
            "department": "कृषि एवं किसान कल्याण मंत्रालय, भारत सरकार",
            "benefit": "प्राकृतिक आपदाओं, कीट व रोगों से फसल क्षति पर वित्तीय सुरक्षा। खरीफ में 2%, रबी में 1.5% एवं वाणिज्यिक फसलों पर 5% मात्र प्रीमियम।",
            "eligibility": "अधिसूचित क्षेत्रों में अधिसूचित फसलें बोने वाले समस्त ऋणी एवं गैर-ऋणी किसान।",
            "documents": [
                "आधार कार्ड",
                "भू-अभिलेख खतौनी",
                "फसल बुवाई स्व-प्रमाणपत्र / खसरा पड़ताल",
                "बैंक पासबुक"
            ],
            "process": [
                "pmfby.gov.in या निकटतम जन सेवा केंद्र (CSC) पर आवेदन करें।",
                "फसल बुवाई की अंतिम तिथि से पूर्व प्रीमियम जमा करें।"
            ],
            "officialLink": "https://pmfby.gov.in/",
            "helpline": "14447 / 1800-180-1551",
            "source": "कृषि मंत्रालय, भारत सरकार",
            "status": "published",
            "created_at": now
        },
        {
            "slug": "kusum-solar-pump",
            "name_hi": "पीएम कुसुम योजना (सोलर सिंचाई पंप अनुदान)",
            "name_en": "PM KUSUM Solar Pump Scheme",
            "category_id": "irrigation",
            "category": "irrigation",
            "category_hi": "सिंचाई एवं ऊर्जा",
            "department": "कृषि विभाग, उत्तर प्रदेश सरकार",
            "benefit": "2 एचपी से 10 एचपी क्षमता के सोलर पंपों पर 60% तक भारी सरकारी अनुदान। बिजली/डीजल पंप पर निर्भरता शून्य।",
            "eligibility": "उत्तर प्रदेश के पंजीकृत किसान जिनके पास सिंचाई हेतु क्रियाशील बोरवेल उपलब्ध हो।",
            "documents": [
                "किसान पंजीकरण संख्या (पारदर्शी किसान सेवा पोर्टल)",
                "आधार कार्ड",
                "खतौनी की नकल",
                "बोरवेल सत्यापन प्रमाण"
            ],
            "process": [
                "agriculture.up.gov.in पर ऑनलाइन टोकन बुक करें।",
                "टोकन कन्फर्मेशन उपरांत अंशदान धनराशि निर्धारित बैंक में जमा करें।"
            ],
            "officialLink": "https://agriculture.up.gov.in/",
            "helpline": "1800-180-1551",
            "source": "उ.प्र. कृषि विभाग",
            "status": "published",
            "created_at": now
        },
        {
            "slug": "up-khet-talab",
            "name_hi": "उत्तर प्रदेश खेत तालाब योजना",
            "name_en": "UP Khet Talab Yojana",
            "category_id": "state",
            "category": "state",
            "category_hi": "राज्य योजना",
            "department": "कृषि विभाग, उत्तर प्रदेश सरकार",
            "benefit": "वर्षा जल संचयन हेतु खेत में तालाब निर्माण पर 50% सरकारी अनुदान (अधिकतम ₹1,05,000)।",
            "eligibility": "उत्तर प्रदेश के लघु एवं सीमांत किसान जिनके पास तालाब निर्माण हेतु पर्याप्त भूमि हो।",
            "documents": ["आधार कार्ड", "खतौनी", "बैंक पासबुक", "किसान पंजीकरण"],
            "process": [
                "पारदर्शी किसान सेवा पोर्टल पर ऑनलाइन टोकन जनरेट करें।",
                "सहायक कृषि अधिकारी द्वारा स्थल सत्यापन उपरांत अनुदान सीधे खाते में प्राप्त करें।"
            ],
            "officialLink": "https://agriculture.up.gov.in/",
            "helpline": "1800-180-1551",
            "source": "उ.प्र. कृषि विभाग",
            "status": "published",
            "created_at": now
        },
        {
            "slug": "krishi-yantrikaran-token",
            "name_hi": "कृषि यंत्रीकरण एवं कस्टम हायरिंग सेंटर अनुदान",
            "name_en": "Farm Mechanization Subsidy",
            "category_id": "subsidy",
            "category": "subsidy",
            "category_hi": "यंत्र अनुदान",
            "department": "कृषि विभाग, उत्तर प्रदेश सरकार",
            "benefit": "सुपर सीडर, रोटावेटर, रीपर एवं लेजर लैंड लेवलर पर 40% से 50% अनुदान। सीएचसी स्थापना पर ₹4 लाख तक।",
            "eligibility": "पारदर्शी किसान सेवा पोर्टल पर पंजीकृत समस्त किसान एवं किसान समूह।",
            "documents": ["किसान पंजीकरण संख्या", "आधार कार्ड", "खतौनी", "ट्रैक्टर पंजीयन प्रमाण"],
            "process": [
                "upagriculture.com पर टोकन व्यवस्था के तहत ऑनलाइन बुकिंग करें।"
            ],
            "officialLink": "https://agriculture.up.gov.in/",
            "helpline": "1800-180-1551",
            "source": "उ.प्र. कृषि विभाग",
            "status": "published",
            "created_at": now
        }
    ]

    for s in schemes:
        await db.schemes.delete_many({"slug": s["slug"]})
        await db.schemes.insert_one(s)
    print(f"Seeded {len(schemes)} schemes.")

    # 3. EXPERT QUESTIONS
    questions = [
        {
            "id": "UKS-2026-894",
            "farmer_name": "रामकिशन वर्मा",
            "farmer_email": "ramkishan.verma@gmail.com",
            "farmer_phone": "9839123456",
            "district": "अयोध्या",
            "crop": "गेहूँ",
            "category": "रोग व फफूंद (Disease)",
            "question": "गेहूँ की पत्तियों पर पीली धारियां दिखाई दे रही हैं तथा छूने पर हाथ पीला हो जाता है। कौन सी दवा डालें?",
            "status": "answered",
            "answer": "यह 'पीला रतुआ' (Yellow Rust) रोग के लक्षण हैं। तुरंत प्रोपिकोनाजोल 25% EC (टिल्ट) दवा 1 मिली प्रति लीटर पानी की दर से (200 मिली प्रति 200 लीटर पानी प्रति एकड़) दोपहर बाद धूप में छिड़काव करें। 15 दिन बाद आवश्यकता पड़ने पर दोहराएं।",
            "answered_by": "डॉ. नीरज कुमार सिंह, सह-प्राध्यापक (MCAET, NDUAT)",
            "answered_at": now,
            "created_at": now
        },
        {
            "id": "UKS-2026-912",
            "farmer_name": "संतोष कुमार मौर्य",
            "farmer_email": "santosh.maurya@gmail.com",
            "farmer_phone": "9415678901",
            "district": "बाराबंकी",
            "crop": "सरसों",
            "category": "कीट व इल्ली (Pest)",
            "question": "सरसों की फलियों और फूलों पर काले रंग के छोटे माहू (माहो) कीट लग गए हैं, रस चूस रहे हैं। क्या करें?",
            "status": "answered",
            "answer": "माहू (Aphid) नियंत्रण हेतु इमिडाक्लोप्रिड 17.8 SL दवा 1 मिलीलीटर को 3 लीटर पानी में घोलकर छिड़कें या डाइमेथोएट 30 EC 1.5 मिली/लीटर पानी में स्प्रे करें। मित्र कीट लेडीबर्ड बीटल होने पर रासायनिक कीटनाशक का हल्का प्रयोग करें।",
            "answered_by": "कीट विज्ञान विशेषज्ञ, KVK प्रसार संभाग, NDUAT",
            "answered_at": now,
            "created_at": now
        },
        {
            "id": "UKS-2026-950",
            "farmer_name": "अरविन्द प्रताप सिंह",
            "farmer_email": "arvind.singh@gmail.com",
            "farmer_phone": "9125345678",
            "district": "अम्बेडकर नगर",
            "crop": "गन्ना",
            "category": "उर्वरक व पीलापन (Nutrient)",
            "question": "पेड़ी गन्ने में पीलापन आ रहा है और नई पत्तियां सफेद पड़ रही हैं। कौन सा खाद या सूक्ष्म तत्व दें?",
            "status": "pending",
            "answer": None,
            "answered_by": None,
            "answered_at": None,
            "created_at": now
        }
    ]

    for q in questions:
        await db.expert_questions.delete_many({"id": q["id"]})
        await db.expert_questions.insert_one(q)
    print(f"Seeded {len(questions)} expert questions.")

    # 4. VIDEOS (ensure status is published)
    videos = [
        {
            "id": "vid-01",
            "youtube_id": "8P2_N7eZ3uQ",
            "title": "Super Seeder Operation & Direct Wheat Sowing in Residue",
            "title_hi": "सुपर सीडर से पराली में गेहूँ की सीधी बुवाई विधि एवं संचालन",
            "channel": "NDUAT Extension Media Cell",
            "category": "कृषि यंत्रीकरण",
            "category_en": "Farm Machinery",
            "duration": "12:45",
            "description": "पराली प्रबंधन के साथ गेहूँ की सटीक बुवाई, बीज व खाद का समायोजन और मशीन की सेटिंग।",
            "description_en": "Scientific demonstration of operating super seeders for direct wheat sowing after paddy harvest without straw burning.",
            "views": "48.5K",
            "status": "published",
            "published_at": "2026-01-15"
        },
        {
            "id": "vid-02",
            "youtube_id": "V2jHq1yM5XQ",
            "title": "Paddy Stem Borer Biological Management & Pheromone Traps",
            "title_hi": "धान की फसल में तना छेदक कीट की पहचान व जैविक नियंत्रण (फेरोमोन ट्रैप)",
            "channel": "KVK NDUAT Extension Cell",
            "category": "कीट नियंत्रण",
            "category_en": "Pest Control",
            "duration": "08:30",
            "description": "खेत में फेरोमोन ट्रैप व ट्राइकोग्रामा कार्ड लगाने की प्रयोगात्मक विधि।",
            "description_en": "Practical demonstration of installing pheromone traps and trichogramma cards in paddy fields.",
            "views": "32.1K",
            "status": "published",
            "published_at": "2026-02-01"
        },
        {
            "id": "vid-03",
            "youtube_id": "N7jL4r3Z8q0",
            "title": "Natural Farming: Scientific Preparation of Jeevamrit",
            "title_hi": "प्राकृतिक खेती: जीवामृत बनाने की वैज्ञानिक विधि",
            "channel": "NDUAT Natural Farming Cell",
            "category": "प्राकृतिक खेती",
            "category_en": "Natural Farming",
            "duration": "15:20",
            "description": "देशी गाय का गोबर, गोमूत्र, बेसन, गुड़ एवं सजीव मिट्टी से 48 घंटे में जीवामृत तैयार करना।",
            "description_en": "Standard 48-hour preparation of microbial Jeevamrit from indigenous cattle dung and urine.",
            "views": "64.2K",
            "status": "published",
            "published_at": "2026-02-10"
        },
        {
            "id": "vid-04",
            "youtube_id": "K3wL8m5P9xY",
            "title": "Soil Sampling 5-Step Protocol & Testing Demo",
            "title_hi": "मृदा नमूना एकत्र करने की सही 5-चरणीय विधि",
            "channel": "Soil Science Division, NDUAT",
            "category": "मृदा स्वास्थ्य",
            "category_en": "Soil Health",
            "duration": "06:15",
            "description": "खेत में 'V' आकार का गड्ढा बनाकर मिट्टी का सही सम्मिश्रण एवं प्रयोगशाला पैकिंग।",
            "description_en": "V-shaped soil sampling method, composite mixing, and soil health card laboratory packing.",
            "views": "28.7K",
            "status": "published",
            "published_at": "2026-02-20"
        }
    ]

    for v in videos:
        await db.videos.delete_many({"id": v["id"]})
        await db.videos.insert_one(v)
    print(f"Seeded {len(videos)} videos.")

    # 5. MANDI PRICES
    mandi_records = [
        {
            "state": "Uttar Pradesh",
            "district": "Ayodhya",
            "district_hi": "अयोध्या",
            "market": "अयोध्या (फैजाबाद)",
            "commodity": "Wheat",
            "commodity_hi": "गेहूँ",
            "variety": "दड़ा (Dara)",
            "min_price": 2420,
            "max_price": 2510,
            "modal_price": 2475,
            "arrival_date": "2026-11-22",
            "status": "published"
        },
        {
            "state": "Uttar Pradesh",
            "district": "Barabanki",
            "district_hi": "बाराबंकी",
            "market": "बाराबंकी",
            "commodity": "Paddy",
            "commodity_hi": "धान",
            "variety": "कॉमन (Common)",
            "min_price": 2180,
            "max_price": 2320,
            "modal_price": 2260,
            "arrival_date": "2026-11-22",
            "status": "published"
        },
        {
            "state": "Uttar Pradesh",
            "district": "Sultanpur",
            "district_hi": "सुल्तानपुर",
            "market": "सुल्तानपुर",
            "commodity": "Mustard",
            "commodity_hi": "सरसों",
            "variety": "काली (Black)",
            "min_price": 5200,
            "max_price": 5650,
            "modal_price": 5450,
            "arrival_date": "2026-11-22",
            "status": "published"
        },
        {
            "state": "Uttar Pradesh",
            "district": "Ayodhya",
            "district_hi": "अयोध्या",
            "market": "रूधौली / सोहावल",
            "commodity": "Potato",
            "commodity_hi": "आलू",
            "variety": "लाल / देसी",
            "min_price": 1100,
            "max_price": 1350,
            "modal_price": 1220,
            "arrival_date": "2026-11-22",
            "status": "published"
        },
        {
            "state": "Uttar Pradesh",
            "district": "Basti",
            "district_hi": "बस्ती",
            "market": "बस्ती",
            "commodity": "Bengal Gram",
            "commodity_hi": "चना",
            "variety": "देसी चना",
            "min_price": 5800,
            "max_price": 6150,
            "modal_price": 5980,
            "arrival_date": "2026-11-21",
            "status": "published"
        },
        {
            "state": "Uttar Pradesh",
            "district": "Gorakhpur",
            "district_hi": "गोरखपुर",
            "market": "गोरखपुर मंडी",
            "commodity": "Maize",
            "commodity_hi": "मक्का",
            "variety": "पीली मक्का",
            "min_price": 2050,
            "max_price": 2200,
            "modal_price": 2140,
            "arrival_date": "2026-11-21",
            "status": "published"
        },
        {
            "state": "Uttar Pradesh",
            "district": "Ambedkar Nagar",
            "district_hi": "अम्बेडकर नगर",
            "market": "अकबरपुर मंडी",
            "commodity": "Wheat",
            "commodity_hi": "गेहूँ",
            "variety": "एचडी 2967",
            "min_price": 2400,
            "max_price": 2490,
            "modal_price": 2450,
            "arrival_date": "2026-11-22",
            "status": "published"
        },
        {
            "state": "Uttar Pradesh",
            "district": "Lucknow",
            "district_hi": "लखनऊ",
            "market": "दुबग्गा मंडी",
            "commodity": "Onion",
            "commodity_hi": "प्याज",
            "variety": "नासिक / लाल",
            "min_price": 1800,
            "max_price": 2200,
            "modal_price": 2000,
            "arrival_date": "2026-11-22",
            "status": "published"
        }
    ]

    await db.mandi_prices.delete_many({"state": "Uttar Pradesh"})
    for m in mandi_records:
        await db.mandi_prices.insert_one(m)
    print(f"Seeded {len(mandi_records)} mandi price records.")

    # 6. ANNOUNCEMENTS
    announcements = [
        {
            "title_hi": "कृषि यंत्रीकरण ई-लॉटरी टोकन बुकिंग पोर्टल सक्रिय",
            "body_hi": "सुपर सीडर, हैप्पी सीडर एवं कस्टम हायरिंग सेंटर हेतु 50% अनुदान टोकन व्यवस्था पारदर्शी किसान सेवा पोर्टल पर उपलब्ध है।",
            "show_from": "2026-11-20",
            "pinned": True,
            "source_name": "कृषि विभाग, उत्तर प्रदेश",
            "status": "published"
        },
        {
            "title_hi": "पीएम किसान सम्मान निधि 17वीं किस्त e-KYC अनिवार्य सूचना",
            "body_hi": "सभी पंजीकृत किसान 30 नवम्बर से पूर्व अपने बैंक खाते में NPCI आधार सीडिंग एवं बायोमेट्रिक ई-केवाईसी पूर्ण कराएं।",
            "show_from": "2026-11-18",
            "pinned": True,
            "source_name": "कृषि एवं किसान कल्याण मंत्रालय",
            "status": "published"
        },
        {
            "title_hi": "एनडीयूएटी कुमारगंज में राज्य स्तरीय खरीफ समीक्षा एवं रबी कृषि मेला",
            "body_hi": "उन्नत प्रमाणित बीज, मृदा परीक्षण एवं वैज्ञानिक प्रदर्शनी हेतु सभी किसान आमंत्रित हैं।",
            "show_from": "2026-11-15",
            "pinned": False,
            "source_name": "NDUAT प्रसार निदेशालय",
            "status": "published"
        }
    ]
    await db.announcements.delete_many({})
    for a in announcements:
        await db.announcements.insert_one(a)
    print(f"Seeded {len(announcements)} announcements.")

    # 7. ADVISORIES (Agro-meteorology)
    advisories = [
        {
            "title_hi": "मौसम चेतावनी: रबी बुवाई एवं सिंचाई परामर्श (IMD अधिकृत)",
            "body_hi": "पूर्वी उत्तर प्रदेश में आगामी 5 दिन मौसम शुष्क व साफ रहेगा। गेहूँ की ताज मूल (CRI) सिंचाई 20-25 दिन की फसल पर अवश्य करें।",
            "valid_from": "2026-11-22",
            "valid_to": "2026-11-27",
            "source_name": "आईएमडी एवं एनडीयूएटी ग्रामीण कृषि मौसम सेवा",
            "status": "published"
        },
        {
            "title_hi": "सरसों में माहू (माहो) कीट निगरानी एवं नियंत्रण",
            "body_hi": "सरसों में फूल आने के समय माहू कीट का प्रकोप हो सकता है। 50 माहू प्रति 10 सेमी तने पर दिखने पर इमिडाक्लोप्रिड 17.8 SL का छिड़काव करें।",
            "valid_from": "2026-11-20",
            "valid_to": "2026-11-30",
            "source_name": "पादप सुरक्षा संभाग, NDUAT",
            "status": "published"
        }
    ]
    await db.advisories.delete_many({})
    for adv in advisories:
        await db.advisories.insert_one(adv)
    print(f"Seeded {len(advisories)} advisories.")

    # 8. TRAININGS
    trainings = [
        {
            "title_hi": "प्राकृतिक खेती एवं जीवामृत-बीजामृत निर्माण कार्यशाला",
            "start_date": "2026-11-28",
            "venue": "कृषि विज्ञान केंद्र, कुमारगंज, अयोध्या",
            "district": "Ayodhya",
            "status": "published"
        },
        {
            "title_hi": "ड्रिप एवं स्प्रिंकलर सूक्ष्म सिंचाई प्रणाली संचालन प्रशिक्षण",
            "start_date": "2026-12-05",
            "venue": "MCAET परिसर, अम्बेडकर नगर",
            "district": "Ambedkar Nagar",
            "status": "published"
        }
    ]
    await db.trainings.delete_many({})
    for tr in trainings:
        await db.trainings.insert_one(tr)
    print(f"Seeded {len(trainings)} trainings.")

    # 9. KVK DIRECTORY
    kvks = [
        {
            "district": "Ayodhya",
            "name_hi": "कृषि विज्ञान केंद्र, एनडीयूएटी कुमारगंज",
            "head_hi": "वरिष्ठ वैज्ञानिक एवं अध्यक्ष",
            "address_hi": "कुमारगंज, अयोध्या, उत्तर प्रदेश - 224229",
            "phone": "05270-262024",
            "email": "kvkayodhya@nduat.org",
            "status": "published"
        },
        {
            "district": "Ambedkar Nagar",
            "name_hi": "कृषि विज्ञान केंद्र, पांती (NDUAT)",
            "head_hi": "वरिष्ठ वैज्ञानिक एवं अध्यक्ष",
            "address_hi": "पांती, कटेहरी, अम्बेडकर नगर, उत्तर प्रदेश",
            "phone": "05271-245310",
            "email": "kvkambedkarnagar@nduat.org",
            "status": "published"
        },
        {
            "district": "Barabanki",
            "name_hi": "कृषि विज्ञान केंद्र, हैदरगढ़",
            "head_hi": "वरिष्ठ वैज्ञानिक एवं अध्यक्ष",
            "address_hi": "हैदरगढ़, बाराबंकी, उत्तर प्रदेश",
            "phone": "05244-242111",
            "email": "kvk.barabanki@icar.gov.in",
            "status": "published"
        },
        {
            "district": "Sultanpur",
            "name_hi": "कृषि विज्ञान केंद्र, कटका (NDUAT)",
            "head_hi": "वरिष्ठ वैज्ञानिक एवं अध्यक्ष",
            "address_hi": "कटका, सुल्तानपुर, उत्तर प्रदेश",
            "phone": "05362-240120",
            "email": "kvksultanpur@nduat.org",
            "status": "published"
        }
    ]
    await db.kvk_directory.delete_many({})
    for k in kvks:
        await db.kvk_directory.insert_one(k)
    print(f"Seeded {len(kvks)} KVK records.")

    await close_mongo()


if __name__ == "__main__":
    asyncio.run(seed_content())

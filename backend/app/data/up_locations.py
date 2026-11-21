"""Centralized Uttar Pradesh 75 Districts, 18 Divisions and Postal Data.
Covers the entire state of Uttar Pradesh with official administrative hierarchy.
"""

from typing import Any

# 18 Administrative Divisions of Uttar Pradesh and their constituent districts
UP_DIVISIONS: list[dict[str, Any]] = [
    {"id": "ayodhya", "name_hi": "अयोध्या मण्डल", "name_en": "Ayodhya Division", "districts": [
        "अयोध्या (Ayodhya)", "बाराबंकी (Barabanki)", "अम्बेडकर नगर (Ambedkar Nagar)", "सुल्तानपुर (Sultanpur)", "अमेठी (Amethi)"
    ]},
    {"id": "lucknow", "name_hi": "लखनऊ मण्डल", "name_en": "Lucknow Division", "districts": [
        "लखनऊ (Lucknow)", "हरदोई (Hardoi)", "लखीमपुर खीरी (Lakhimpur Kheri)", "रायबरेली (Raebareli)", "सीतापुर (Sitapur)", "उन्नाव (Unnao)"
    ]},
    {"id": "kanpur", "name_hi": "कानपुर मण्डल", "name_en": "Kanpur Division", "districts": [
        "कानपुर नगर (Kanpur Nagar)", "कानपुर देहात (Kanpur Dehat)", "इटावा (Etawah)", "फर्रुखाबाद (Farrukhabad)", "कन्नौज (Kannauj)", "औरैया (Auraiya)"
    ]},
    {"id": "varanasi", "name_hi": "वाराणसी मण्डल", "name_en": "Varanasi Division", "districts": [
        "वाराणसी (Varanasi)", "चंदौली (Chandauli)", "गाजीपुर (Ghazipur)", "जौनपुर (Jaunpur)"
    ]},
    {"id": "gorakhpur", "name_hi": "गोरखपुर मण्डल", "name_en": "Gorakhpur Division", "districts": [
        "गोरखपुर (Gorakhpur)", "देवरिया (Deoria)", "कुशीनगर (Kushinagar)", "महराजगंज (Maharajganj)"
    ]},
    {"id": "prayagraj", "name_hi": "प्रयागराज मण्डल", "name_en": "Prayagraj Division", "districts": [
        "प्रयागराज (Prayagraj)", "कौशाम्बी (Kaushambi)", "फतेहपुर (Fatehpur)", "प्रतापगढ़ (Pratapgarh)"
    ]},
    {"id": "bareilly", "name_hi": "बरेली मण्डल", "name_en": "Bareilly Division", "districts": [
        "बरेली (Bareilly)", "बदायूँ (Badaun)", "पीलीभीत (Pilibhit)", "शाहजहाँपुर (Shahjahanpur)"
    ]},
    {"id": "meerut", "name_hi": "मेरठ मण्डल", "name_en": "Meerut Division", "districts": [
        "मेरठ (Meerut)", "बागपत (Baghpat)", "बुलंदशहर (Bulandshahr)", "गौतम बुद्ध नगर (Gautam Buddha Nagar)", "गाजियाबाद (Ghaziabad)", "हापुड़ (Hapur)"
    ]},
    {"id": "agra", "name_hi": "आगरा मण्डल", "name_en": "Agra Division", "districts": [
        "आगरा (Agra)", "फिरोजाबाद (Firozabad)", "मैनपुरी (Mainpuri)", "मथुरा (Mathura)"
    ]},
    {"id": "aligarh", "name_hi": "अलीगढ़ मण्डल", "name_en": "Aligarh Division", "districts": [
        "अलीगढ़ (Aligarh)", "एटा (Etah)", "हाथरस (Hathras)", "कासगंज (Kasganj)"
    ]},
    {"id": "azamgarh", "name_hi": "आजमगढ़ मण्डल", "name_en": "Azamgarh Division", "districts": [
        "आजमगढ़ (Azamgarh)", "बलिया (Ballia)", "मऊ (Mau)"
    ]},
    {"id": "basti", "name_hi": "बस्ती मण्डल", "name_en": "Basti Division", "districts": [
        "बस्ती (Basti)", "संत कबीर नगर (Sant Kabir Nagar)", "सिद्धार्थनगर (Siddharthnagar)"
    ]},
    {"id": "chitrakoot", "name_hi": "चित्रकूट मण्डल", "name_en": "Chitrakoot Division", "districts": [
        "चित्रकूट (Chitrakoot)", "बांदा (Banda)", "हमीरपुर (Hamirpur)", "महोबा (Mahoba)"
    ]},
    {"id": "devipatan", "name_hi": "देवीपाटन मण्डल", "name_en": "Devipatan Division", "districts": [
        "गोंडा (Gonda)", "बहराइच (Bahraich)", "बलरामपुर (Balrampur)", "श्रावस्ती (Shravasti)"
    ]},
    {"id": "jhansi", "name_hi": "झाँसी मण्डल", "name_en": "Jhansi Division", "districts": [
        "झाँसी (Jhansi)", "जालौन (Jalaun)", "ललितपुर (Lalitpur)"
    ]},
    {"id": "mirzapur", "name_hi": "मिर्ज़ापुर मण्डल", "name_en": "Mirzapur Division", "districts": [
        "मिर्ज़ापुर (Mirzapur)", "संत रविदास नगर / भदोही (Bhadohi)", "सोनभद्र (Sonbhadra)"
    ]},
    {"id": "moradabad", "name_hi": "मुरादाबाद मण्डल", "name_en": "Moradabad Division", "districts": [
        "मुरादाबाद (Moradabad)", "अमरोहा (Amroha)", "बिजनौर (Bijnor)", "रामपुर (Rampur)", "संभल (Sambhal)"
    ]},
    {"id": "saharanpur", "name_hi": "सहारनपुर मण्डल", "name_en": "Saharanpur Division", "districts": [
        "सहारनपुर (Saharanpur)", "मुजफ्फरनगर (Muzaffarnagar)", "शामली (Shamli)"
    ]},
]

# Complete 75 Districts of Uttar Pradesh with Hindi, English, Division and HQ
ALL_75_UP_DISTRICTS: list[dict[str, Any]] = [
    {"code": "AGR", "name_hi": "आगरा", "name_en": "Agra", "division": "आगरा मण्डल", "pincode_prefix": "282"},
    {"code": "ALI", "name_hi": "अलीगढ़", "name_en": "Aligarh", "division": "अलीगढ़ मण्डल", "pincode_prefix": "202"},
    {"code": "PRY", "name_hi": "प्रयागराज", "name_en": "Prayagraj", "division": "प्रयागराज मण्डल", "pincode_prefix": "211"},
    {"code": "AMB", "name_hi": "अम्बेडकर नगर", "name_en": "Ambedkar Nagar", "division": "अयोध्या मण्डल", "pincode_prefix": "224"},
    {"code": "AME", "name_hi": "अमेठी", "name_en": "Amethi", "division": "अयोध्या मण्डल", "pincode_prefix": "227"},
    {"code": "AMR", "name_hi": "अमरोहा", "name_en": "Amroha", "division": "मुरादाबाद मण्डल", "pincode_prefix": "244"},
    {"code": "AUR", "name_hi": "औरैया", "name_en": "Auraiya", "division": "कानपुर मण्डल", "pincode_prefix": "206"},
    {"code": "AYO", "name_hi": "अयोध्या", "name_en": "Ayodhya", "division": "अयोध्या मण्डल", "pincode_prefix": "224"},
    {"code": "AZA", "name_hi": "आजमगढ़", "name_en": "Azamgarh", "division": "आजमगढ़ मण्डल", "pincode_prefix": "276"},
    {"code": "BAG", "name_hi": "बागपत", "name_en": "Baghpat", "division": "मेरठ मण्डल", "pincode_prefix": "250"},
    {"code": "BAH", "name_hi": "बहराइच", "name_en": "Bahraich", "division": "देवीपाटन मण्डल", "pincode_prefix": "271"},
    {"code": "BAL", "name_hi": "बलिया", "name_en": "Ballia", "division": "आजमगढ़ मण्डल", "pincode_prefix": "277"},
    {"code": "BLR", "name_hi": "बलरामपुर", "name_en": "Balrampur", "division": "देवीपाटन मण्डल", "pincode_prefix": "271"},
    {"code": "BAN", "name_hi": "बांदा", "name_en": "Banda", "division": "चित्रकूट मण्डल", "pincode_prefix": "210"},
    {"code": "BAR", "name_hi": "बाराबंकी", "name_en": "Barabanki", "division": "अयोध्या मण्डल", "pincode_prefix": "225"},
    {"code": "BER", "name_hi": "बरेली", "name_en": "Bareilly", "division": "बरेली मण्डल", "pincode_prefix": "243"},
    {"code": "BAS", "name_hi": "बस्ती", "name_en": "Basti", "division": "बस्ती मण्डल", "pincode_prefix": "272"},
    {"code": "BHA", "name_hi": "भदोही", "name_en": "Bhadohi", "division": "मिर्ज़ापुर मण्डल", "pincode_prefix": "221"},
    {"code": "BIJ", "name_hi": "बिजनौर", "name_en": "Bijnor", "division": "मुरादाबाद मण्डल", "pincode_prefix": "246"},
    {"code": "BAD", "name_hi": "बदायूँ", "name_en": "Badaun", "division": "बरेली मण्डल", "pincode_prefix": "243"},
    {"code": "BUL", "name_hi": "बुलंदशहर", "name_en": "Bulandshahr", "division": "मेरठ मण्डल", "pincode_prefix": "203"},
    {"code": "CHA", "name_hi": "चंदौली", "name_en": "Chandauli", "division": "वाराणसी मण्डल", "pincode_prefix": "232"},
    {"code": "CHI", "name_hi": "चित्रकूट", "name_en": "Chitrakoot", "division": "चित्रकूट मण्डल", "pincode_prefix": "210"},
    {"code": "DEO", "name_hi": "देवरिया", "name_en": "Deoria", "division": "गोरखपुर मण्डल", "pincode_prefix": "274"},
    {"code": "ETA", "name_hi": "एटा", "name_en": "Etah", "division": "अलीगढ़ मण्डल", "pincode_prefix": "207"},
    {"code": "ETW", "name_hi": "इटावा", "name_en": "Etawah", "division": "कानपुर मण्डल", "pincode_prefix": "206"},
    {"code": "FAR", "name_hi": "फर्रुखाबाद", "name_en": "Farrukhabad", "division": "कानपुर मण्डल", "pincode_prefix": "209"},
    {"code": "FAT", "name_hi": "फतेहपुर", "name_en": "Fatehpur", "division": "प्रयागराज मण्डल", "pincode_prefix": "212"},
    {"code": "FIR", "name_hi": "फिरोजाबाद", "name_en": "Firozabad", "division": "आगरा मण्डल", "pincode_prefix": "283"},
    {"code": "GBN", "name_hi": "गौतम बुद्ध नगर", "name_en": "Gautam Buddha Nagar", "division": "मेरठ मण्डल", "pincode_prefix": "201"},
    {"code": "GHA", "name_hi": "गाजियाबाद", "name_en": "Ghaziabad", "division": "मेरठ मण्डल", "pincode_prefix": "201"},
    {"code": "GHZ", "name_hi": "गाजीपुर", "name_en": "Ghazipur", "division": "वाराणसी मण्डल", "pincode_prefix": "233"},
    {"code": "GON", "name_hi": "गोंडा", "name_en": "Gonda", "division": "देवीपाटन मण्डल", "pincode_prefix": "271"},
    {"code": "GOR", "name_hi": "गोरखपुर", "name_en": "Gorakhpur", "division": "गोरखपुर मण्डल", "pincode_prefix": "273"},
    {"code": "HAM", "name_hi": "हमीरपुर", "name_en": "Hamirpur", "division": "चित्रकूट मण्डल", "pincode_prefix": "210"},
    {"code": "HAP", "name_hi": "हापुड़", "name_en": "Hapur", "division": "मेरठ मण्डल", "pincode_prefix": "245"},
    {"code": "HAR", "name_hi": "हरदोई", "name_en": "Hardoi", "division": "लखनऊ मण्डल", "pincode_prefix": "241"},
    {"code": "HAT", "name_hi": "हाथरस", "name_en": "Hathras", "division": "अलीगढ़ मण्डल", "pincode_prefix": "204"},
    {"code": "JAL", "name_hi": "जालौन", "name_en": "Jalaun", "division": "झाँसी मण्डल", "pincode_prefix": "285"},
    {"code": "JAU", "name_hi": "जौनपुर", "name_en": "Jaunpur", "division": "वाराणसी मण्डल", "pincode_prefix": "222"},
    {"code": "JHA", "name_hi": "झाँसी", "name_en": "Jhansi", "division": "झाँसी मण्डल", "pincode_prefix": "284"},
    {"code": "KAN", "name_hi": "कन्नौज", "name_en": "Kannauj", "division": "कानपुर मण्डल", "pincode_prefix": "209"},
    {"code": "KND", "name_hi": "कानपुर देहात", "name_en": "Kanpur Dehat", "division": "कानपुर मण्डल", "pincode_prefix": "209"},
    {"code": "KNN", "name_hi": "कानपुर नगर", "name_en": "Kanpur Nagar", "division": "कानपुर मण्डल", "pincode_prefix": "208"},
    {"code": "KAS", "name_hi": "कासगंज", "name_en": "Kasganj", "division": "अलीगढ़ मण्डल", "pincode_prefix": "207"},
    {"code": "KAU", "name_hi": "कौशाम्बी", "name_en": "Kaushambi", "division": "प्रयागराज मण्डल", "pincode_prefix": "212"},
    {"code": "KUS", "name_hi": "कुशीनगर", "name_en": "Kushinagar", "division": "गोरखपुर मण्डल", "pincode_prefix": "274"},
    {"code": "LAK", "name_hi": "लखीमपुर खीरी", "name_en": "Lakhimpur Kheri", "division": "लखनऊ मण्डल", "pincode_prefix": "262"},
    {"code": "LAL", "name_hi": "ललितपुर", "name_en": "Lalitpur", "division": "झाँसी मण्डल", "pincode_prefix": "284"},
    {"code": "LUC", "name_hi": "लखनऊ", "name_en": "Lucknow", "division": "लखनऊ मण्डल", "pincode_prefix": "226"},
    {"code": "MAH", "name_hi": "महराजगंज", "name_en": "Maharajganj", "division": "गोरखपुर मण्डल", "pincode_prefix": "273"},
    {"code": "MHO", "name_hi": "महोबा", "name_en": "Mahoba", "division": "चित्रकूट मण्डल", "pincode_prefix": "210"},
    {"code": "MAI", "name_hi": "मैनपुरी", "name_en": "Mainpuri", "division": "आगरा मण्डल", "pincode_prefix": "205"},
    {"code": "MAT", "name_hi": "मथुरा", "name_en": "Mathura", "division": "आगरा मण्डल", "pincode_prefix": "281"},
    {"code": "MAU", "name_hi": "मऊ", "name_en": "Mau", "division": "आजमगढ़ मण्डल", "pincode_prefix": "275"},
    {"code": "MEE", "name_hi": "मेरठ", "name_en": "Meerut", "division": "मेरठ मण्डल", "pincode_prefix": "250"},
    {"code": "MIR", "name_hi": "मिर्ज़ापुर", "name_en": "Mirzapur", "division": "मिर्ज़ापुर मण्डल", "pincode_prefix": "231"},
    {"code": "MOR", "name_hi": "मुरादाबाद", "name_en": "Moradabad", "division": "मुरादाबाद मण्डल", "pincode_prefix": "244"},
    {"code": "MUZ", "name_hi": "मुजफ्फरनगर", "name_en": "Muzaffarnagar", "division": "सहारनपुर मण्डल", "pincode_prefix": "251"},
    {"code": "PIL", "name_hi": "पीलीभीत", "name_en": "Pilibhit", "division": "बरेली मण्डल", "pincode_prefix": "262"},
    {"code": "PRA", "name_hi": "प्रतापगढ़", "name_en": "Pratapgarh", "division": "प्रयागराज मण्डल", "pincode_prefix": "230"},
    {"code": "RAE", "name_hi": "रायबरेली", "name_en": "Raebareli", "division": "लखनऊ मण्डल", "pincode_prefix": "229"},
    {"code": "RAM", "name_hi": "रामपुर", "name_en": "Rampur", "division": "मुरादाबाद मण्डल", "pincode_prefix": "244"},
    {"code": "SAH", "name_hi": "सहारनपुर", "name_en": "Saharanpur", "division": "सहारनपुर मण्डल", "pincode_prefix": "247"},
    {"code": "SAM", "name_hi": "संभल", "name_en": "Sambhal", "division": "मुरादाबाद मण्डल", "pincode_prefix": "244"},
    {"code": "SKN", "name_hi": "संत कबीर नगर", "name_en": "Sant Kabir Nagar", "division": "बस्ती मण्डल", "pincode_prefix": "272"},
    {"code": "SHA", "name_hi": "शाहजहाँपुर", "name_en": "Shahjahanpur", "division": "बरेली मण्डल", "pincode_prefix": "242"},
    {"code": "SHM", "name_hi": "शामली", "name_en": "Shamli", "division": "सहारनपुर मण्डल", "pincode_prefix": "247"},
    {"code": "SHR", "name_hi": "श्रावस्ती", "name_en": "Shravasti", "division": "देवीपाटन मण्डल", "pincode_prefix": "271"},
    {"code": "SID", "name_hi": "सिद्धार्थनगर", "name_en": "Siddharthnagar", "division": "बस्ती मण्डल", "pincode_prefix": "272"},
    {"code": "SIT", "name_hi": "सीतापुर", "name_en": "Sitapur", "division": "लखनऊ मण्डल", "pincode_prefix": "261"},
    {"code": "SON", "name_hi": "सोनभद्र", "name_en": "Sonbhadra", "division": "मिर्ज़ापुर मण्डल", "pincode_prefix": "231"},
    {"code": "SUL", "name_hi": "सुल्तानपुर", "name_en": "Sultanpur", "division": "अयोध्या मण्डल", "pincode_prefix": "228"},
    {"code": "UNN", "name_hi": "उन्नाव", "name_en": "Unnao", "division": "लखनऊ मण्डल", "pincode_prefix": "209"},
    {"code": "VAR", "name_hi": "वाराणसी", "name_en": "Varanasi", "division": "वाराणसी मण्डल", "pincode_prefix": "221"},
]

# Common verified UP PIN Codes mapping for lookup and autofill
UP_PINCODE_MAP: dict[str, dict[str, Any]] = {
    "224001": {"pincode": "224001", "district": "अयोध्या", "division": "अयोध्या मण्डल", "tehsil": "सदर (अयोध्या)", "post_offices": ["Faizabad H.O", "Ayodhya City", "Rikabganj"]},
    "224123": {"pincode": "224123", "district": "अयोध्या", "division": "अयोध्या मण्डल", "tehsil": "अयोध्या", "post_offices": ["Ayodhya S.O", "Hanumangarhi", "Kanak Bhawan"]},
    "224229": {"pincode": "224229", "district": "अयोध्या", "division": "अयोध्या मण्डल", "tehsil": "मिल्कीपुर", "post_offices": ["NDUAT Kumarganj S.O", "Kumarganj Market", "Acharya Nagar"]},
    "224122": {"pincode": "224122", "district": "अम्बेडकर नगर", "division": "अयोध्या मण्डल", "tehsil": "अकबरपुर", "post_offices": ["Akbarpur H.O", "MCAET Campus", "Shezadpur"]},
    "224151": {"pincode": "224151", "district": "अम्बेडकर नगर", "division": "अयोध्या मण्डल", "tehsil": "जलालपुर", "post_offices": ["Jalalpur S.O", "Bhadila", "Kafalpur"]},
    "225001": {"pincode": "225001", "district": "बाराबंकी", "division": "अयोध्या मण्डल", "tehsil": "नवाबगंज", "post_offices": ["Barabanki H.O", "Civil Lines", "Satrikh Road"]},
    "226001": {"pincode": "226001", "district": "लखनऊ", "division": "लखनऊ मण्डल", "tehsil": "सदर (लखनऊ)", "post_offices": ["Lucknow G.P.O.", "Hazratganj", "Vidhan Sabha"]},
    "226010": {"pincode": "226010", "district": "लखनऊ", "division": "लखनऊ मण्डल", "tehsil": "सदर (लखनऊ)", "post_offices": ["Gomti Nagar S.O", "Vibhuti Khand", "Patrakar Puram"]},
    "208001": {"pincode": "208001", "district": "कानपुर नगर", "division": "कानपुर मण्डल", "tehsil": "कानपुर सदर", "post_offices": ["Kanpur H.O", "Mall Road", "Collectorganj"]},
    "221001": {"pincode": "221001", "district": "वाराणसी", "division": "वाराणसी मण्डल", "tehsil": "वाराणसी", "post_offices": ["Varanasi H.O", "Cantonment", "Kashi"]},
    "221005": {"pincode": "221005", "district": "वाराणसी", "division": "वाराणसी मण्डल", "tehsil": "वाराणसी", "post_offices": ["BHU S.O", "Lanka", "Sir Sundar Lal Hospital"]},
    "273001": {"pincode": "273001", "district": "गोरखपुर", "division": "गोरखपुर मण्डल", "tehsil": "सदर", "post_offices": ["Gorakhpur H.O", "Golghar", "Railway Colony"]},
    "211001": {"pincode": "211001", "district": "प्रयागराज", "division": "प्रयागराज मण्डल", "tehsil": "सदर", "post_offices": ["Prayagraj H.O", "Civil Lines", "Katra"]},
    "243001": {"pincode": "243001", "district": "बरेली", "division": "बरेली मण्डल", "tehsil": "बरेली", "post_offices": ["Bareilly H.O", "Civil Lines", "Cantonment"]},
    "250001": {"pincode": "250001", "district": "मेरठ", "division": "मेरठ मण्डल", "tehsil": "मेरठ", "post_offices": ["Meerut H.O", "Begum Bridge", "Cantonment"]},
    "282001": {"pincode": "282001", "district": "आगरा", "division": "आगरा मण्डल", "tehsil": "आगरा", "post_offices": ["Agra Fort H.O", "Tajganj", "Sadar Bazar"]},
    "201301": {"pincode": "201301", "district": "गौतम बुद्ध नगर", "division": "मेरठ मण्डल", "tehsil": "दादरी", "post_offices": ["Noida Sector 1", "Sector 12", "Atta Market"]},
    "201001": {"pincode": "201001", "district": "गाजियाबाद", "division": "मेरठ मण्डल", "tehsil": "गाजियाबाद", "post_offices": ["Ghaziabad H.O", "Navyug Market", "Railway Station"]},
    "228001": {"pincode": "228001", "district": "सुल्तानपुर", "division": "अयोध्या मण्डल", "tehsil": "सदर", "post_offices": ["Sultanpur H.O", "Civil Lines", "Palia"]},
    "227405": {"pincode": "227405", "district": "अमेठी", "division": "अयोध्या मण्डल", "tehsil": "गौरीगंज", "post_offices": ["Gauriganj S.O", "Amethi Market", "Tikarmafi"]},
    "271001": {"pincode": "271001", "district": "गोंडा", "division": "देवीपाटन मण्डल", "tehsil": "सदर", "post_offices": ["Gonda H.O", "Civil Lines", "Pant Nagar"]},
    "271801": {"pincode": "271801", "district": "बहराइच", "division": "देवीपाटन मण्डल", "tehsil": "सदर", "post_offices": ["Bahraich H.O", "Chhawani", "Dargah Road"]},
    "272001": {"pincode": "272001", "district": "बस्ती", "division": "बस्ती मण्डल", "tehsil": "सदर", "post_offices": ["Basti H.O", "Company Bagh", "Gandhi Nagar"]},
}

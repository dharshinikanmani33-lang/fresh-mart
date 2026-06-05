/* ============================================================
   FreshMart – script.js  (100% Unique Image & Multilingual Edition)
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

    // ═══════════════════════════════════════════════════════
    // GLOBAL IMAGE FALLBACK — catches ANY broken image
    // ═══════════════════════════════════════════════════════
    document.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG' && !e.target.dataset.fb) {
            e.target.dataset.fb = '1';
            e.target.src = 'assets/images/hero_banner.png';
        }
    }, true);

    // ─── LANGUAGE TOGGLE STATE & LOGIC ───
    let currentLang = 'en';
    let activeModalType = null; // 'dept', 'brand', 'offer'
    let activeModalKey = null;

    const applyTranslations = (lang) => {
        try {
            if (typeof translations === 'undefined') return;
            const dict = translations[lang] || translations['en'] || {};
            document.querySelectorAll('[data-i18n-key]').forEach(el => {
                const key = el.getAttribute('data-i18n-key');
                if (dict[key]) {
                    if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
                        el.placeholder = dict[key];
                    } else {
                        el.textContent = dict[key];
                    }
                }
            });
        } catch (err) {
            console.warn('Translation error (non-fatal):', err);
        }
    };

    // Custom dropdown toggle
    const langToggleBtn = document.getElementById('langToggle');
    const langMenu = document.getElementById('langMenu');
    if (langToggleBtn && langMenu) {
        langToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langMenu.classList.toggle('open');
        });
        document.querySelectorAll('.lang-option').forEach(opt => {
            opt.addEventListener('click', () => {
                currentLang = opt.dataset.lang;
                const label = opt.textContent;
                langToggleBtn.textContent = '🌐 ' + label + ' ▼';
                langToggleBtn.dataset.lang = currentLang;
                applyTranslations(currentLang);

                // Re-render offers grid in the new language
                renderOffersGrid();

                // Re-render active modal if one is open
                if (activeModalType === 'dept') {
                    openDeptModal(activeModalKey);
                } else if (activeModalType === 'brand') {
                    openBrandModal(activeModalKey);
                } else if (activeModalType === 'offer') {
                    openOfferModal(activeModalKey);
                }

                langMenu.classList.remove('open');
            });
        });
        // Close dropdown when clicking elsewhere
        document.addEventListener('click', () => langMenu.classList.remove('open'));
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('.anim').forEach(el => observer.observe(el));

    // ─── HERO SLIDER ───
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots   = document.querySelectorAll('.hero-dot');
    let heroIdx = 0, heroTimer;
    const gotoHero = (n) => {
        heroSlides[heroIdx].classList.remove('active');
        heroDots[heroIdx].classList.remove('active');
        heroIdx = (n + heroSlides.length) % heroSlides.length;
        heroSlides[heroIdx].classList.add('active');
        heroDots[heroIdx].classList.add('active');
    };
    heroDots.forEach(d => d.addEventListener('click', () => { clearInterval(heroTimer); gotoHero(+d.dataset.slide); startHero(); }));
    const startHero = () => heroTimer = setInterval(() => gotoHero(heroIdx + 1), 5000);
    startHero();

    // ─── MOBILE MENU ───
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinks  = document.getElementById('navLinks');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => navLinks.classList.toggle('mobile-open'));
        document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('mobile-open')));
    }

    // ─── SCROLL TO TOP ───
    const scrollTop = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => { scrollTop.classList.toggle('show', window.scrollY > 400); });
    scrollTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // ─── MODAL HELPERS ───
    const body = document.body;
    const closeAllModals = () => {
        document.querySelectorAll('.modal-overlay.open, .lightbox.open').forEach(m => m.classList.remove('open'));
        body.classList.remove('locked');
        activeModalType = null;
        activeModalKey = null;
    };
    document.querySelectorAll('.modal-overlay').forEach(m => {
        m.addEventListener('click', e => { if (e.target === m) closeAllModals(); });
    });
    document.querySelectorAll('.modal-close-btn').forEach(btn => btn.addEventListener('click', closeAllModals));
    document.querySelector('.lb-close').addEventListener('click', closeAllModals);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAllModals(); });

    // ═══════════════════════════════════════════════════════
    // UNIQUE IMAGE PATHS
    // ═══════════════════════════════════════════════════════
    const I = {
        // --- Category Banners ---
        fruits: 'assets/images/fruits.png',
        veg: 'assets/images/vegetables.png',
        grocery: 'assets/images/grocery.png',
        rice: 'assets/images/rice_grains.png',
        dairy: 'assets/images/dairy.png',
        bakery: 'assets/images/bakery.png',
        snacks: 'assets/images/snacks.png',
        frozen: 'assets/images/frozen_foods.png',
        personal: 'assets/images/personal_care.png',
        baby: 'assets/images/baby_care.png',
        household: 'assets/images/household.png',
        kitchen: 'assets/images/kitchen.png',
        stationery: 'assets/images/stationery.png',
        petcare: 'assets/images/pet_care.png',
        store: 'assets/images/store_interior.png',
        hero: 'assets/images/hero_banner.png',
        about: 'assets/images/about_store.png',
        tata_dal: 'assets/images/tata_dal.png',
        india_gate: 'assets/images/india_gate_rice.png',
        marie: 'assets/images/marie_gold.png',
        surf: 'assets/images/surf_excel.png',

        // --- Unique Product Images (Fruits & Veg) ---
        apples: 'assets/images/kashmir_apples.png',
        bananas: 'assets/images/robusta_bananas.png',
        mangoes: 'assets/images/alphonso_mangoes.png',
        oranges: 'assets/images/nagpur_oranges.png',
        grapes: 'assets/images/black_grapes.png',
        pomegranates: 'assets/images/pomegranates.png',
        watermelon: 'assets/images/watermelon.png',
        pineapple: 'assets/images/fresh_pineapple.png',
        tomatoes: 'assets/images/farm_tomatoes.png',
        onions: 'assets/images/fresh_onions.png',
        potatoes: 'assets/images/potatoes.png',
        carrots: 'assets/images/ooty_carrots.png',
        beans: 'assets/images/fresh_beans.png',
        brinjal: 'assets/images/brinjal.png',
        cabbage: 'assets/images/cabbage.png',
        cauliflower: 'assets/images/cauliflower.png',

        // --- Unique Product Images (Staples, Grains & Dairy) ---
        wheat_flour: 'assets/images/wheat_flour.png',
        sugar: 'assets/images/sugar.png',
        spice_mix: 'assets/images/spice_mix.png',
        cooking_oil: 'assets/images/cooking_oil.png',
        raw_rice: 'assets/images/raw_rice.png',
        moong_dal: 'assets/images/moong_dal.png',
        cow_milk: 'assets/images/cow_milk.png',
        salted_butter: 'assets/images/salted_butter.png',
        cheddar_cheese: 'assets/images/cheddar_cheese.png',
        fresh_paneer: 'assets/images/fresh_paneer.png',
        curd: 'assets/images/curd.png',

        // --- Unique Product Images (Bakery & Snacks) ---
        sandwich_bread: 'assets/images/sandwich_bread.png',
        cream_cakes: 'assets/images/cream_cakes.png',
        fresh_buns: 'assets/images/fresh_buns.png',
        potato_chips: 'assets/images/potato_chips.png',
        soft_drinks: 'assets/images/soft_drinks.png',
        fruit_juices: 'assets/images/fruit_juices.png',

        // --- Unique Product Images (Frozen, Personal & Baby) ---
        frozen_peas: 'assets/images/frozen_peas.png',
        ice_cream: 'assets/images/ice_cream.png',
        soap: 'assets/images/soap.png',
        shampoo: 'assets/images/shampoo.png',
        toothpaste: 'assets/images/toothpaste.png',
        baby_diapers: 'assets/images/baby_diapers.png',
        baby_food: 'assets/images/baby_food.png',

        // --- Unique Product Images (Household & Cleaning) ---
        storage_containers: 'assets/images/storage_containers.png',
        brooms_mops: 'assets/images/brooms_mops.png',
        floor_cleaners: 'assets/images/floor_cleaners.png',
        dishwash: 'assets/images/dishwash.png',

        // --- Unique Product Images (Kitchen, Stationery, Pet Care) ---
        pressure_cooker: 'assets/images/pressure_cooker.png',
        nonstick_pan: 'assets/images/nonstick_pan.png',
        notebooks: 'assets/images/notebooks.png',
        ball_pens: 'assets/images/ball_pens.png',
        dog_food: 'assets/images/dog_food.png',
        cat_food: 'assets/images/cat_food.png',

        // --- Brand Specific Products ---
        amul_milk: 'assets/images/amul_milk.png',
        amul_butter: 'assets/images/amul_butter.png',
        amul_cheese: 'assets/images/amul_cheese.png',
        amul_paneer: 'assets/images/amul_paneer.png',
        amul_ice_cream: 'assets/images/amul_ice_cream.png',
        tata_turmeric: 'assets/images/tata_turmeric.png',
        tata_chilli: 'assets/images/tata_chilli.png',
        aashirvaad_atta: 'assets/images/aashirvaad_atta.png',
        aashirvaad_spices: 'assets/images/aashirvaad_spices.png',
        good_day_biscuits: 'assets/images/good_day_biscuits.png',
        britannia_bread: 'assets/images/britannia_bread.png',
        parle_g: 'assets/images/parle_g.png',
        parle_2020: 'assets/images/parle_2020.png',
        dark_fantasy: 'assets/images/dark_fantasy.png',
        moms_magic: 'assets/images/moms_magic.png',
        aavin_milk: 'assets/images/aavin_milk.png',
        aavin_curd: 'assets/images/aavin_curd.png',
        aavin_butter: 'assets/images/aavin_butter.png',
        horlicks_original: 'assets/images/horlicks_original.png',
        junior_horlicks: 'assets/images/junior_horlicks.png',
        surf_excel_bar: 'assets/images/surf_excel_bar.png',
        vim_liquid: 'assets/images/vim_liquid.png',
        vim_bar: 'assets/images/vim_bar.png',

        // --- Offers Banners ---
        offer_weekend: 'assets/images/offer_weekend.png',
        offer_festival: 'assets/images/offer_festival.png',
        offer_monthly: 'assets/images/offer_monthly.png',
        offer_family: 'assets/images/offer_family.png',
        offer_summer: 'assets/images/offer_summer.png',
        offer_school: 'assets/images/offer_school.png'
    };

    // ═══════════════════════════════════════════════════════
    // MULTILINGUAL DEPARTMENT DATA
    // ═══════════════════════════════════════════════════════
    const deptData = {
        fruits: {
            title: { en: 'Fresh Fruits', ta: 'புதிய பழங்கள்' },
            desc: {
                en: 'We source the finest farm-fresh seasonal and exotic fruits every morning. Quality-checked and handpicked for your family\'s health.',
                ta: 'நாங்கள் தினமும் காலையில் சிறந்த பண்ணை-புதிய பருவகால மற்றும் கவர்ச்சியான பழங்களை பெறுகிறோம். உங்கள் குடும்பத்தின் ஆரோக்கியத்திற்காக தரமானவை கைமுறையாக தேர்ந்தெடுக்கப்படுகின்றன.'
            },
            banner: I.fruits,
            brands: ['Fresh Farm', 'Del Monte', 'Naturelle'],
            products: [
                { name: { en: 'Kashmir Apples', ta: 'காஷ்மீர் ஆப்பிள்' }, img: I.apples, desc: { en: 'Crisp & sweet Himalayan apples', ta: 'மொறுமொறுப்பான மற்றும் இனிப்பான இமயமலை ஆப்பிள்' } },
                { name: { en: 'Robusta Bananas', ta: 'ரோபஸ்டா வாழைப்பழம்' }, img: I.bananas, desc: { en: 'Ripe & nutritious bananas', ta: 'பழுத்த மற்றும் சத்தான வாழைப்பழம்' } },
                { name: { en: 'Alphonso Mangoes', ta: 'அல்போன்சா மாம்பழம்' }, img: I.mangoes, desc: { en: 'King of fruits — premium quality', ta: 'பழங்களின் ராஜா — பிரீமியம் தரம்' } },
                { name: { en: 'Nagpur Oranges', ta: 'நாக்பூர் ஆரஞ்சு' }, img: I.oranges, desc: { en: 'Vitamin C rich juicy oranges', ta: 'வைட்டமின் சி நிறைந்த சாறுள்ள ஆரஞ்சு' } },
                { name: { en: 'Black Grapes', ta: 'கருப்பு திராட்சை' }, img: I.grapes, desc: { en: 'Juicy & fresh seedless grapes', ta: 'சாறுள்ள மற்றும் புதிய விதை இல்லாத திராட்சை' } },
                { name: { en: 'Pomegranates', ta: 'மாதுளை' }, img: I.pomegranates, desc: { en: 'Antioxidant rich ruby gems', ta: 'ஆன்டி-ஆக்ஸிடன்ட் நிறைந்த மாதுளை முத்துக்கள்' } },
                { name: { en: 'Watermelon', ta: 'தர்பூசணி' }, img: I.watermelon, desc: { en: 'Summer favourite — chilled', ta: 'கோடைகாலத்தின் விருப்பம் — குளிர்ச்சியானது' } },
                { name: { en: 'Fresh Pineapple', ta: 'புதிய அன்னாசிப்பழம்' }, img: I.pineapple, desc: { en: 'Tropical & sweet whole pineapple', ta: 'வெப்பமண்டல மற்றும் இனிப்பான முழு அன்னாசிப்பழம்' } }
            ]
        },
        vegetables: {
            title: { en: 'Fresh Vegetables', ta: 'புதிய காய்கறிகள்' },
            desc: {
                en: 'Crisp, nutritious vegetables sourced directly from local farms every morning. Maximum freshness, guaranteed.',
                ta: 'உள்ளூர் பண்ணைகளிலிருந்து நேரடியாக தினமும் காலையில் பெறப்படும் மொறுமொறுப்பான, சத்தான காய்கறிகள். 100% புதிய தன்மைக்கு உத்தரவாதம்.'
            },
            banner: I.veg,
            brands: ['Local Farm', 'Green Valley', 'Organic India'],
            products: [
                { name: { en: 'Farm Tomatoes', ta: 'பண்ணை தக்காளி' }, img: I.tomatoes, desc: { en: 'Firm & red vine-ripened', ta: 'உறுதியான மற்றும் சிவப்பு நிற தக்காளி' } },
                { name: { en: 'Fresh Onions', ta: 'புதிய வெங்காயம்' }, img: I.onions, desc: { en: 'Sharp & flavorful all types', ta: 'காரமான மற்றும் சுவையான வெங்காயம்' } },
                { name: { en: 'Potatoes', ta: 'உருளைக்கிழங்கு' }, img: I.potatoes, desc: { en: 'All varieties — clean & sorted', ta: 'சுத்தமான மற்றும் தரம் பிரிக்கப்பட்ட உருளைக்கிழங்கு' } },
                { name: { en: 'Ooty Carrots', ta: 'ஊட்டி கேரட்' }, img: I.carrots, desc: { en: 'Sweet & crunchy hill carrots', ta: 'இனிப்பான மற்றும் மொறுமொறுப்பான மலை கேரட்' } },
                { name: { en: 'Fresh Beans', ta: 'புதிய பீன்ஸ்' }, img: I.beans, desc: { en: 'Tender & green hand-picked', ta: 'மென்மையான மற்றும் பசிய பச்சை பீன்ஸ்' } },
                { name: { en: 'Brinjal', ta: 'கத்தரிக்காய்' }, img: I.brinjal, desc: { en: 'Purple & firm for curries', ta: 'குழம்புகளுக்கு ஏற்ற ஊதா மற்றும் உறுதியான கத்தரிக்காய்' } },
                { name: { en: 'Cabbage', ta: 'முட்டைக்கோஸ்' }, img: I.cabbage, desc: { en: 'Crisp fresh green leaves', ta: 'மொறுமொறுப்பான புதிய பச்சை முட்டைக்கோஸ்' } },
                { name: { en: 'Cauliflower', ta: 'காலிஃபிளவர்' }, img: I.cauliflower, desc: { en: 'White & fresh — farm quality', ta: 'வெள்ளை மற்றும் புதிய காலிஃபிளவர்' } }
            ]
        },
        grocery: {
            title: { en: 'Grocery & Staples', ta: 'மளிகை மற்றும் மளிகைப் பொருட்கள்' },
            desc: {
                en: 'Premium quality everyday cooking essentials. From aromatic spices to pure cooking oils.',
                ta: 'பிரீமியம் தரமான தினசரி சமையல் தேவைகள். நறுமண மசாலாப் பொருட்கள் முதல் தூய சமையல் எண்ணெய்கள் வரை.'
            },
            banner: I.grocery,
            brands: ['Aashirvaad', 'Tata', 'Fortune', 'MDH'],
            products: [
                { name: { en: 'Basmati Rice', ta: 'பாசுமதி அரிசி' }, img: I.india_gate, desc: { en: 'Long grain premium basmati', ta: 'நீள ரக பிரீமியம் பாசுமதி அரிசி' } },
                { name: { en: 'Toor Dal', ta: 'துவரம் பருப்பு' }, img: I.tata_dal, desc: { en: 'Protein-rich unpolished pulses', ta: 'புரதம் நிறைந்த தீட்டப்படாத துவரம் பருப்பு' } },
                { name: { en: 'Wheat Flour', ta: 'கோதுமை மாவு' }, img: I.wheat_flour, desc: { en: 'Fresh ground whole wheat atta', ta: 'புதியதாக அரைக்கப்பட்ட கோதுமை மாவு' } },
                { name: { en: 'Sugar', ta: 'சர்க்கரை' }, img: I.sugar, desc: { en: 'Pure white refined sugar', ta: 'தூய வெள்ளை சுத்திகரிக்கப்பட்ட சர்க்கரை' } },
                { name: { en: 'Spice Mix', ta: 'மசாலா கலவை' }, img: I.spice_mix, desc: { en: 'Aromatic masala blends', ta: 'நறுமணமுள்ள மசாலா கலவைகள்' } },
                { name: { en: 'Cooking Oil', ta: 'சமையல் எண்ணெய்' }, img: I.cooking_oil, desc: { en: 'Sunflower & groundnut oils', ta: 'சூரியகாந்தி மற்றும் கடலை எண்ணெய்கள்' } }
            ]
        },
        rice: {
            title: { en: 'Rice & Grains', ta: 'அரிசி மற்றும் தானியங்கள்' },
            desc: {
                en: 'A wide selection of premium rice varieties, lentils, and whole grains for every cooking style.',
                ta: 'அனைத்து வகையான சமையல் முறைகளுக்கும் ஏற்ற பிரீமியம் அரிசி வகைகள், பருப்புகள் மற்றும் முழு தானியங்கள்.'
            },
            banner: I.rice,
            brands: ['India Gate', 'Tata Sampann', 'Aashirvaad'],
            products: [
                { name: { en: 'India Gate Basmati', ta: 'இந்தியா கேட் பாசுமதி' }, img: I.india_gate, desc: { en: 'Premium extra-long grain rice', ta: 'பிரீமியம் கூடுதல் நீள பாசுமதி அரிசி' } },
                { name: { en: 'Raw Rice (Ponni)', ta: 'பச்சரிசி (பொன்னி)' }, img: I.raw_rice, desc: { en: 'Ponni & Sona Masoori varieties', ta: 'பொன்னி மற்றும் சோனா மசூரி அரிசி வகைகள்' } },
                { name: { en: 'Toor Dal', ta: 'துவரம் பருப்பு' }, img: I.tata_dal, desc: { en: 'Unpolished protein-rich dal', ta: 'தீட்டப்படாத புரதம் நிறைந்த பருப்பு' } },
                { name: { en: 'Moong Dal', ta: 'பாசிப்பருப்பு' }, img: I.moong_dal, desc: { en: 'Yellow & green moong varieties', ta: 'மஞ்சள் மற்றும் பச்சை பாசிப்பருப்பு வகைகள்' } }
            ]
        },
        dairy: {
            title: { en: 'Dairy Products', ta: 'பால் பொருட்கள்' },
            desc: {
                en: 'Always fresh. Stored at optimal temperature. Our dairy section is stocked daily.',
                ta: 'எப்போதும் புதியது. சிறந்த வெப்பநிலையில் சேமிக்கப்படுகிறது. பால் பொருட்கள் தினமும் புதியதாக கொண்டுவரப்படுகின்றன.'
            },
            banner: I.dairy,
            brands: ['Amul', 'Aavin', 'Milky Mist', 'Nestlé'],
            products: [
                { name: { en: 'Fresh Cow Milk', ta: 'புதிய பசுவின் பால்' }, img: I.cow_milk, desc: { en: 'Full-cream & toned — daily fresh', ta: 'முழு கிரீம் மற்றும் டோன்டு பால் — தினமும் புதியது' } },
                { name: { en: 'Salted Butter', ta: 'உப்பு வெண்ணெய்' }, img: I.salted_butter, desc: { en: 'Rich & creamy Amul butter', ta: 'சுவையான மற்றும் கிரீமியான அமுல் வெண்ணெய்' } },
                { name: { en: 'Cheddar Cheese', ta: 'செடார் பாலாடைக்கட்டி' }, img: I.cheddar_cheese, desc: { en: 'Slices & blocks for sandwiches', ta: 'சாண்ட்விச்சிற்கான ஸ்லைஸ் மற்றும் பிளாக் சீஸ்' } },
                { name: { en: 'Fresh Paneer', ta: 'புதிய பனீர்' }, img: I.fresh_paneer, desc: { en: 'Soft & fresh — made daily', ta: 'மென்மையான மற்றும் புதிய பனீர் — தினமும் தயாரிக்கப்படுகிறது' } },
                { name: { en: 'Curd', ta: 'தயிர்' }, img: I.curd, desc: { en: 'Thick, creamy homestyle curd', ta: 'கெட்டியான, வீட்டு முறை தயிர்' } }
            ]
        },
        bakery: {
            title: { en: 'Bakery', ta: 'பேக்கரி' },
            desc: {
                en: 'Freshly baked breads, cakes, and pastries prepared daily.',
                ta: 'தினமும் தயாரிக்கப்படும் புதிய ரொட்டி, கேக்குகள் மற்றும் பேஸ்ட்ரிகள்.'
            },
            banner: I.bakery,
            brands: ['Britannia', 'Modern Bakeries', 'Local Bakery'],
            products: [
                { name: { en: 'Sandwich Bread', ta: 'சாண்ட்விச் ரொட்டி' }, img: I.sandwich_bread, desc: { en: 'White & whole wheat loaves', ta: 'வெள்ளை மற்றும் கோதுமை ரொட்டி' } },
                { name: { en: 'Cream Cakes', ta: 'கிரீம் கேக்குகள்' }, img: I.cream_cakes, desc: { en: 'Birthday & celebration cakes', ta: 'பிறந்தநாள் மற்றும் கொண்டாட்ட கேக்குகள்' } },
                { name: { en: 'Assorted Cookies', ta: 'பிஸ்கட் வகைகள்' }, img: I.marie, desc: { en: 'Chocolate, vanilla & butter', ta: 'சாக்லேட், வெண்ணிலா மற்றும் வெண்ணெய் குக்கீஸ்' } },
                { name: { en: 'Fresh Buns', ta: 'புதிய பன்கள்' }, img: I.fresh_buns, desc: { en: 'Soft dinner rolls — baked daily', ta: 'மென்மையான டின்னர் ரோல்ஸ் — தினமும் சுடப்படுகிறது' } }
            ]
        },
        snacks: {
            title: { en: 'Snacks & Beverages', ta: 'சிற்றுண்டி மற்றும் பானங்கள்' },
            desc: {
                en: 'Your favourite chips, biscuits, soft drinks, juices and health drinks.',
                ta: 'உங்களுக்கு பிடித்த சிப்ஸ், பிஸ்கட், குளிர்பானங்கள், ஜூஸ் மற்றும் ஆரோக்கிய பானங்கள்.'
            },
            banner: I.snacks,
            brands: ['Parle', 'Britannia', 'Sunfeast', 'PepsiCo', 'Coca-Cola'],
            products: [
                { name: { en: 'Potato Chips', ta: 'உருளைக்கிழங்கு சிப்ஸ்' }, img: I.potato_chips, desc: { en: 'Salted, masala & cream flavours', ta: 'உப்பு, மசாலா மற்றும் கிரீம் சுவைகள்' } },
                { name: { en: 'Marie Biscuits', ta: 'மாரி பிஸ்கட்' }, img: I.marie, desc: { en: 'Classic tea-time favourites', ta: 'கிளாசிக் டீ-டைம் பிஸ்கட்கள்' } },
                { name: { en: 'Soft Drinks', ta: 'குளிர்பானங்கள்' }, img: I.soft_drinks, desc: { en: 'Cola, Sprite, Fanta & more', ta: 'கோலா, ஸ்ப்ரைட், ஃபான்டா மற்றும் பல' } },
                { name: { en: 'Fruit Juices', ta: 'பழச்சாறுகள்' }, img: I.fruit_juices, desc: { en: 'Real fruit juices all flavours', ta: 'அனைத்து சுவைகளிலும் உண்மையான பழச்சாறுகள்' } }
            ]
        },
        frozen: {
            title: { en: 'Frozen Foods', ta: 'உறைந்த உணவுகள்' },
            desc: {
                en: 'Premium frozen vegetables, ready-to-eat meals, and frozen treats.',
                ta: 'பிரீமியம் உறைந்த காய்கறிகள், உண்ண தயாரான உணவுகள் மற்றும் ஐஸ்கிரீம்கள்.'
            },
            banner: I.frozen,
            brands: ['McCain', 'ITC', 'Mother\'s Recipe'],
            products: [
                { name: { en: 'Frozen Peas', ta: 'உறைந்த பட்டாணி' }, img: I.frozen_peas, desc: { en: 'Garden fresh flash-frozen', ta: 'பண்ணை புதிய உறைந்த பச்சை பட்டாணி' } },
                { name: { en: 'Ice Cream', ta: 'ஐஸ்கிரீம்' }, img: I.ice_cream, desc: { en: 'All flavours — Amul, Kwality', ta: 'அனைத்து சுவைகளும் — அமுல், குவாலிட்டி' } }
            ]
        },
        personal: {
            title: { en: 'Personal Care', ta: 'தனிநபர் பராமரிப்பு' },
            desc: {
                en: 'From soaps and shampoos to skincare and dental hygiene.',
                ta: 'சோப்புகள் மற்றும் ஷாம்புகள் முதல் தோல் பராமரிப்பு மற்றும் பல் சுகாதாரம் வரை.'
            },
            banner: I.personal,
            brands: ['Dove', 'Colgate', 'Himalaya', 'Pears'],
            products: [
                { name: { en: 'Soap', ta: 'சோப்பு' }, img: I.soap, desc: { en: 'Dove, Pears, Lux & more', ta: 'டவ், பியர்ஸ், லக்ஸ் மற்றும் பல' } },
                { name: { en: 'Shampoo', ta: 'ஷாம்பு' }, img: I.shampoo, desc: { en: 'Head & Shoulders, Dove & more', ta: 'ஹெட் & ஷோல்டர்ஸ், டவ் மற்றும் பல' } },
                { name: { en: 'Toothpaste', ta: 'பற்பசை' }, img: I.toothpaste, desc: { en: 'Colgate, Pepsodent & more', ta: 'கோல்கேட், பெப்சோடென்ட் மற்றும் பல' } }
            ]
        },
        baby: {
            title: { en: 'Baby Care', ta: 'குழந்தை பராமரிப்பு' },
            desc: {
                en: 'Everything your little one needs — diapers, baby food, gentle skincare.',
                ta: 'உங்கள் குழந்தைக்கு தேவையான அனைத்தும் — டயப்பர்கள், குழந்தை உணவு, மென்மையான தோல் பராமரிப்பு.'
            },
            banner: I.baby,
            brands: ['Pampers', 'Himalaya Baby', 'Johnson\'s'],
            products: [
                { name: { en: 'Baby Diapers', ta: 'குழந்தை டயப்பர்கள்' }, img: I.baby_diapers, desc: { en: 'Pampers — all sizes in stock', ta: 'பாம்பர்ஸ் டயப்பர்கள் — அனைத்து அளவுகளும் உள்ளன' } },
                { name: { en: 'Baby Food', ta: 'குழந்தை உணவு' }, img: I.baby_food, desc: { en: 'Cerelac, Nestum & more', ta: 'செரிலாக், நெஸ்டம் மற்றும் பல' } }
            ]
        },
        household: {
            title: { en: 'Household Essentials', ta: 'வீட்டு உபயோக பொருட்கள்' },
            desc: {
                en: 'Storage, cleaning tools and everyday home utilities.',
                ta: 'பொருட்கள் சேமிப்பு கொள்கலன்கள், துப்புரவு கருவிகள் மற்றும் அன்றாட வீட்டு உபகரணங்கள்.'
            },
            banner: I.household,
            brands: ['Tupperware', 'Prestige', 'Cello'],
            products: [
                { name: { en: 'Storage Containers', ta: 'சேமிப்பு கொள்கலன்கள்' }, img: I.storage_containers, desc: { en: 'Airtight & durable all sizes', ta: 'காற்று புகாத மற்றும் நீடித்த அனைத்து அளவுகளும்' } },
                { name: { en: 'Brooms & Mops', ta: 'துடைப்பம் மற்றும் துடைப்பான்கள்' }, img: I.brooms_mops, desc: { en: 'Full cleaning set for home', ta: 'வீட்டிற்கான முழுமையான துப்புரவு தொகுப்பு' } }
            ]
        },
        cleaning: {
            title: { en: 'Cleaning Products', ta: 'சுத்திகரிப்பு பொருட்கள்' },
            desc: {
                en: 'Detergents, floor cleaners, dishwash liquids and more.',
                ta: 'சலவை தூள், தரை சுத்தப்படுத்திகள், பாத்திரம் கழுவும் திரவங்கள் மற்றும் பல.'
            },
            banner: I.household,
            brands: ['Surf Excel', 'Vim', 'Lizol', 'Harpic'],
            products: [
                { name: { en: 'Surf Excel', ta: 'சர்ஃப் எக்செல்' }, img: I.surf, desc: { en: 'Matic liquid & washing bar', ta: 'மேடிக் லிக்விட் மற்றும் சலவை சோப்பு' } },
                { name: { en: 'Floor Cleaners', ta: 'தரை சுத்தப்படுத்திகள்' }, img: I.floor_cleaners, desc: { en: 'Lizol & Domex all variants', ta: 'லிசோல் மற்றும் டோமெக்ஸ் அனைத்து வகைகள்' } },
                { name: { en: 'Dishwash', ta: 'பாத்திரம் கழுவும் சோப்பு/திரவம்' }, img: I.dishwash, desc: { en: 'Vim liquid, gel & bar', ta: 'விம் லிக்விட், ஜெல் மற்றும் சோப்பு' } }
            ]
        },
        kitchen: {
            title: { en: 'Kitchen Essentials', ta: 'சமையலறை பொருட்கள்' },
            desc: {
                en: 'Pots, pans, cutlery, and every kitchen utensil you need.',
                ta: 'பானைகள், கடாய்கள், கத்திகள் மற்றும் உங்களுக்கு தேவையான அனைத்து சமையலறை உபகரணங்கள்.'
            },
            banner: I.kitchen,
            brands: ['Prestige', 'Hawkins', 'Pigeon'],
            products: [
                { name: { en: 'Pressure Cooker', ta: 'பிரஷர் குக்கர்' }, img: I.pressure_cooker, desc: { en: 'Prestige & Hawkins cookers', ta: 'பிரெஸ்டீஜ் மற்றும் ஹாக்கின்ஸ் குக்கர்கள்' } },
                { name: { en: 'Non-stick Pan', ta: 'ஒட்டாத பாத்திரம்' }, img: I.nonstick_pan, desc: { en: 'All sizes — dosa tava too', ta: 'அனைத்து அளவுகளும் — தோசை தவாவும் உள்ளது' } }
            ]
        },
        stationery: {
            title: { en: 'Stationery', ta: 'எழுத்துப் பொருட்கள்' },
            desc: {
                en: 'Pens, notebooks, files and school supplies.',
                ta: 'பேனாக்கள், குறிப்பேடுகள், கோப்புகள் மற்றும் பள்ளி உபகரணங்கள்.'
            },
            banner: I.stationery,
            brands: ['Reynolds', 'Camlin', 'Classmate'],
            products: [
                { name: { en: 'Notebooks', ta: 'குறிப்பேடுகள்' }, img: I.notebooks, desc: { en: 'Ruled, blank & graph books', ta: 'கோடிட்ட, வெற்று மற்றும் வரைபட புத்தகங்கள்' } },
                { name: { en: 'Ball Pens', ta: 'பால் பேனாக்கள்' }, img: I.ball_pens, desc: { en: 'Reynolds, Parker & Cello', ta: 'ரெனால்ட்ஸ், பார்க்கர் மற்றும் செல்லோ' } }
            ]
        },
        petcare: {
            title: { en: 'Pet Care Products', ta: 'செல்லப்பிராணி பராமரிப்பு' },
            desc: {
                en: 'Everything your pets love — food, grooming essentials, accessories.',
                ta: 'உங்கள் செல்லப்பிராணிகள் விரும்பும் அனைத்தும் — உணவு, பராமரிப்பு பொருட்கள், பாகங்கள்.'
            },
            banner: I.petcare,
            brands: ['Pedigree', 'Royal Canin', 'Whiskas'],
            products: [
                { name: { en: 'Dog Food', ta: 'நாய் உணவு' }, img: I.dog_food, desc: { en: 'Pedigree & Royal Canin bags', ta: 'பெடிகிரி மற்றும் ராயல் கேனின் உணவுகள்' } },
                { name: { en: 'Cat Food', ta: 'பூனை உணவு' }, img: I.cat_food, desc: { en: 'Whiskas wet & dry food', ta: 'விஸ்காஸ் ஈரமான மற்றும் உலர் உணவு' } }
            ]
        }
    };

    // ═══════════════════════════════════════════════════════
    // MULTILINGUAL BRAND DATA
    // ═══════════════════════════════════════════════════════
    const brandData = {
        amul: {
            title: 'Amul', color: 'linear-gradient(135deg,#1565C0,#1E88E5)',
            desc: {
                en: 'The Taste of India. Amul is India\'s largest dairy brand, trusted by millions of families for over 75 years.',
                ta: 'இந்தியாவின் சுவை. அமுல் இந்தியாவின் மிகப்பெரிய பால் தயாரிப்பு பிராண்ட் ஆகும், 75 ஆண்டுகளுக்கும் மேலாக மில்லியன் கணக்கான குடும்பங்களால் நம்பப்படுகிறது.'
            },
            products: [
                { name: { en: 'Amul Taaza Milk', ta: 'அமுல் தாசா பால்' }, img: I.amul_milk, desc: { en: 'Fresh full-cream milk, 1L & 500ml packs.', ta: 'புதிய முழு கிரீம் பால், 1 லிட்டர் மற்றும் 500 மிலி பாக்கெட்டுகள்.' } },
                { name: { en: 'Amul Butter', ta: 'அமுல் வெண்ணெய்' }, img: I.amul_butter, desc: { en: 'Salted & unsalted butter, 100g–500g.', ta: 'உப்பு சேர்க்கப்பட்ட மற்றும் சேர்க்கப்படாத வெண்ணெய், 100 கிராம்-500 கிராம்.' } },
                { name: { en: 'Amul Cheese', ta: 'அமுல் பாலாடைக்கட்டி' }, img: I.amul_cheese, desc: { en: 'Ready-to-use cheese slices & blocks.', ta: 'பயன்படுத்த தயாராக உள்ள சீஸ் துண்டுகள் மற்றும் பிளாக்குகள்.' } },
                { name: { en: 'Amul Paneer', ta: 'அமுல் பனீர்' }, img: I.amul_paneer, desc: { en: 'Soft, fresh paneer — 200g & 500g.', ta: 'மென்மையான, புதிய பனீர் — 200 கிராம் மற்றும் 500 கிராம்.' } },
                { name: { en: 'Amul Ice Cream', ta: 'அமுல் ஐஸ்கிரீம்' }, img: I.amul_ice_cream, desc: { en: 'Vanilla, chocolate and fruity flavours.', ta: 'வெண்ணிலா, சாக்லேட் மற்றும் பழ சுவைகள்.' } }
            ]
        },
        tata: {
            title: 'Tata Sampann', color: 'linear-gradient(135deg,#B71C1C,#E53935)',
            desc: {
                en: 'Tata Sampann brings authentic Indian flavours through premium quality pulses, spices, and staples.',
                ta: 'டாடா சம்பன் பிரீமியம் தரமான பருப்புகள், மசாலாப் பொருட்கள் மற்றும் உணவுப் பொருட்கள் மூலம் உண்மையான இந்திய சுவைகளைக் கொண்டுவருகிறது.'
            },
            products: [
                { name: { en: 'Tata Toor Dal', ta: 'டாடா துவரம் பருப்பு' }, img: I.tata_dal, desc: { en: 'Unpolished toor dal, rich in protein.', ta: 'புரதம் நிறைந்த மெருகூட்டப்படாத துவரம் பருப்பு.' } },
                { name: { en: 'Tata Turmeric', ta: 'டாடா மஞ்சள் தூள்' }, img: I.tata_turmeric, desc: { en: 'Bright yellow, aromatic turmeric powder.', ta: 'பிரகாசமான மஞ்சள், நறுமண மஞ்சள் தூள்.' } },
                { name: { en: 'Tata Chilli Powder', ta: 'டாடா மிளகாய் தூள்' }, img: I.tata_chilli, desc: { en: 'Vibrant colour, authentic Indian heat.', ta: 'துடிப்பான நிறம், உண்மையான இந்திய காரம்.' } }
            ]
        },
        aashirvaad: {
            title: 'Aashirvaad', color: 'linear-gradient(135deg,#E65100,#FB8C00)',
            desc: {
                en: 'Aashirvaad by ITC is India\'s leading flour brand, delivering freshness and nutrition.',
                ta: 'ஐடிசியின் ஆசிர்வாத் இந்தியாவின் முன்னணி மாவு பிராண்ட் ஆகும், இது புதிய தன்மையையும் ஊட்டச்சத்தையும் வழங்குகிறது.'
            },
            products: [
                { name: { en: 'Aashirvaad Atta', ta: 'ஆசிர்வாத் கோதுமை மாவு' }, img: I.aashirvaad_atta, desc: { en: 'Premium whole wheat flour, 5kg & 10kg.', ta: 'பிரீமியம் முழு கோதுமை மாவு, 5 கிலோ மற்றும் 10 கிலோ.' } },
                { name: { en: 'Aashirvaad Spices', ta: 'ஆசிர்வாத் மசாலாக்கள்' }, img: I.aashirvaad_spices, desc: { en: 'Authentic masala blends — all varieties.', ta: 'உண்மையான மசாலா கலவைகள் — அனைத்து வகைகள்.' } }
            ]
        },
        britannia: {
            title: 'Britannia', color: 'linear-gradient(135deg,#2E7D32,#4CAF50)',
            desc: {
                en: 'India\'s most loved food company, bringing joy with baked goods since 1892.',
                ta: 'இந்தியாவின் மிகவும் விரும்பப்படும் உணவு நிறுவனம், 1892 முதல் பேக்கரி தயாரிப்புகள் மூலம் மகிழ்ச்சியை அளிக்கிறது.'
            },
            products: [
                { name: { en: 'Good Day Biscuits', ta: 'குட் டே பிஸ்கட்' }, img: I.good_day_biscuits, desc: { en: 'Cashew & butter flavour cookies.', ta: 'முந்திரி மற்றும் வெண்ணெய் சுவை குக்கீஸ்.' } },
                { name: { en: 'Marie Gold', ta: 'மேரி கோல்ட்' }, img: I.marie, desc: { en: 'Classic tea-time light biscuits.', ta: 'கிளாசிக் டீ-டைம் இலகுவான பிஸ்கட்கள்.' } },
                { name: { en: 'Britannia Bread', ta: 'பிரிட்டானியா ரொட்டி' }, img: I.britannia_bread, desc: { en: 'White & brown bread loaves — daily fresh.', ta: 'வெள்ளை மற்றும் பிரவுன் ரொட்டி — தினமும் புதியது.' } }
            ]
        },
        parle: {
            title: 'Parle', color: 'linear-gradient(135deg,#4A148C,#7B1FA2)',
            desc: {
                en: 'India\'s most iconic biscuit brand, famous for Parle-G since 1938.',
                ta: 'இந்தியாவின் மிகவும் பிரபலமான பிஸ்கட் பிராண்ட், 1938 முதல் பார்லே-ஜி-க்கு பிரபலமானது.'
            },
            products: [
                { name: { en: 'Parle-G', ta: 'பார்லே-ஜி' }, img: I.parle_g, desc: { en: 'World\'s #1 selling glucose biscuit.', ta: 'உலகின் நம்பர் 1 விற்பனையாகும் குளுக்கோஸ் பிஸ்கட்.' } },
                { name: { en: '20-20 Cookies', ta: '20-20 குக்கீஸ்' }, img: I.parle_2020, desc: { en: 'Crunchy cashew & butter cookies.', ta: 'மொறுமொறுப்பான முந்திரி மற்றும் வெண்ணெய் குக்கீஸ்.' } }
            ]
        },
        sunfeast: {
            title: 'Sunfeast', color: 'linear-gradient(135deg,#F57F17,#FFB300)',
            desc: {
                en: 'Sunfeast by ITC — a premium biscuits and cakes brand for every age group.',
                ta: 'ஐடிசியின் சன்ஃபீஸ்ட் — அனைத்து வயதினருக்கும் ஏற்ற பிரீமியம் பிஸ்கட் மற்றும் கேக் பிராண்ட்.'
            },
            products: [
                { name: { en: 'Dark Fantasy', ta: 'டார்க் பேண்டஸி' }, img: I.dark_fantasy, desc: { en: 'Rich choco-filled cookie indulgence.', ta: 'நிறைய சாக்லேட் நிரப்பப்பட்ட குக்கீ சலுகை.' } },
                { name: { en: 'Mom\'s Magic', ta: 'மாம்ஸ் மேஜிக்' }, img: I.moms_magic, desc: { en: 'Butter-rich homestyle biscuits.', ta: 'வெண்ணெய் நிறைந்த வீட்டு முறை பிஸ்கட்கள்.' } }
            ]
        },
        aavin: {
            title: 'Aavin', color: 'linear-gradient(135deg,#006064,#00ACC1)',
            desc: {
                en: 'Tamil Nadu Co-operative Milk Federation — TN\'s most trusted dairy brand.',
                ta: 'தமிழ்நாடு கூட்டுறவு பால் உற்பத்தியாளர்கள் கூட்டமைப்பு — தமிழகத்தின் மிகவும் நம்பகமான பால் பிராண்ட்.'
            },
            products: [
                { name: { en: 'Aavin Milk', ta: 'ஆவின் பால்' }, img: I.aavin_milk, desc: { en: 'Full cream, toned, & double toned.', ta: 'முழு கிரீம், டோன்டு மற்றும் டபுள் டோன்டு பால்.' } },
                { name: { en: 'Aavin Curd', ta: 'ஆவின் தயிர்' }, img: I.aavin_curd, desc: { en: 'Thick, creamy set curd — daily.', ta: 'கெட்டியான, கிரீமியான தயிர் — தினமும்.' } },
                { name: { en: 'Aavin Butter', ta: 'ஆவின் வெண்ணெய்' }, img: I.aavin_butter, desc: { en: 'Fresh table butter — salted.', ta: 'புதிய டேபிள் வெண்ணெய் — உப்பு சேர்க்கப்பட்டது.' } }
            ]
        },
        horlicks: {
            title: 'Horlicks', color: 'linear-gradient(135deg,#33691E,#8BC34A)',
            desc: {
                en: 'Scientifically formulated health drink for stronger bones and immunity.',
                ta: 'வலுவான எலும்புகள் மற்றும் நோய் எதிர்ப்பு சக்திக்கு அறிவியல் பூர்வமாக தயாரிக்கப்பட்ட ஆரோக்கிய பானம்.'
            },
            products: [
                { name: { en: 'Horlicks Original', ta: 'ஹார்லிக்ஸ் ஒரிஜினல்' }, img: I.horlicks_original, desc: { en: 'Classic malt health drink, 500g jar.', ta: 'கிளாசிக் மால்ட் ஆரோக்கிய பானம், 500 கிராம் ஜாடி.' } },
                { name: { en: 'Junior Horlicks', ta: 'ஜூனியர் ஹார்லிக்ஸ்' }, img: I.junior_horlicks, desc: { en: 'Specially formulated for growing children.', ta: 'வளரும் குழந்தைகளுக்காக பிரத்யேகமாக தயாரிக்கப்பட்டது.' } }
            ]
        },
        surfexcel: {
            title: 'Surf Excel', color: 'linear-gradient(135deg,#0D47A1,#1976D2)',
            desc: {
                en: 'India\'s #1 laundry detergent for decades. Daag Ache Hain!',
                ta: 'பல தசாப்தங்களாக இந்தியாவின் நம்பர் 1 சலவை சோப்பு பிராண்ட். கறைகள் நல்லது!'
            },
            products: [
                { name: { en: 'Surf Excel Matic', ta: 'சர்ஃப் எக்செல் மேடிக்' }, img: I.surf, desc: { en: 'Liquid detergent for front & top load.', ta: 'முன் மற்றும் மேல் சுமைக்கான திரவ சலவை சோப்பு.' } },
                { name: { en: 'Surf Excel Bar', ta: 'சர்ஃப் எக்செல் சோப்' }, img: I.surf_excel_bar, desc: { en: 'Washing bar for tough stains.', ta: 'கடினமான கறைகளை நீக்கும் சலவை சோப்.' } }
            ]
        },
        vim: {
            title: 'Vim', color: 'linear-gradient(135deg,#558B2F,#8BC34A)',
            desc: {
                en: 'India\'s most trusted dishwashing brand — cuts through grease effectively.',
                ta: 'இந்தியாவின் மிகவும் நம்பகமான பாத்திரம் கழுவும் பிராண்ட் — கொழுப்பை திறம்பட நீக்குகிறது.'
            },
            products: [
                { name: { en: 'Vim Liquid', ta: 'விம் லிக்விட்' }, img: I.vim_liquid, desc: { en: 'Anti-bacterial formula, 500ml & 750ml.', ta: 'பாக்டீரியா எதிர்ப்பு ஃபார்முலா, 500 மிலி & 750 மிலி.' } },
                { name: { en: 'Vim Bar', ta: 'விம் சோப்' }, img: I.vim_bar, desc: { en: 'Classic lime bar for sparkling utensils.', ta: 'பாத்திரங்களை மின்ன வைக்கும் எலுமிச்சை சோப்.' } }
            ]
        }
    };

    // ═══════════════════════════════════════════════════════
    // MULTILINGUAL OFFER DATA
    // ═══════════════════════════════════════════════════════
    const offerData = {
        weekend: {
            title: { en: 'Weekend Savings Festival', ta: 'வார இறுதி சேமிப்புத் திருவிழா' },
            badge: { en: 'SAT & SUN ONLY', ta: 'சனி & ஞாயிறு மட்டும்' },
            banner: I.offer_weekend,
            img: I.fruits, // Visual identifier
            desc: {
                en: 'Make your weekends extra special! Enjoy massive discounts on fresh produce, dairy, and household essentials.',
                ta: 'உங்கள் வார இறுதி நாட்களை மிகவும் சிறப்பாக்குங்கள்! புதிய பொருட்கள், பால் மற்றும் வீட்டு உபயோகப் பொருட்களுக்கு பெரும் தள்ளுபடிகளைப் பெறுங்கள்.'
            },
            highlights: {
                en: ['Up to 20% off Fresh Fruits & Vegetables', 'Buy 2 Get 1 Free on Dairy Products', 'Special discounts on Bakery Items', '10% off on all Cleaning Products'],
                ta: ['புதிய பழங்கள் மற்றும் காய்கறிகளுக்கு 20% வரை தள்ளுபடி', 'பால் பொருட்களுக்கு 2 வாங்கினால் 1 இலவசம்', 'பேக்கரி தயாரிப்புகளுக்கு சிறப்பு தள்ளுபடிகள்', 'அனைத்து துப்புரவு தயாரிப்புகளுக்கும் 10% தள்ளுபடி']
            },
            validity: { en: 'Every Saturday & Sunday', ta: 'ஒவ்வொரு சனிக்கிழமை & ஞாயிற்றுக்கிழமை' },
            terms: {
                en: ['Valid on minimum purchase of ₹500.', 'Valid only on Saturday and Sunday in-store.', 'Offer cannot be combined with other coupons.'],
                ta: ['குறைந்தபட்சம் ₹500 வாங்குதலுக்கு செல்லுபடியாகும்.', 'கடையில் சனிக்கிழமை மற்றும் ஞாயிற்றுக்கிழமைகளில் மட்டுமே செல்லுபடியாகும்.', 'இந்த சலுகையை மற்ற சலுகைகளுடன் இணைக்க முடியாது.']
            }
        },
        festival: {
            title: { en: 'Grand Festival Offers', ta: 'பெரிய பண்டிகை சலுகைகள்' },
            badge: { en: 'FESTIVE SEASON', ta: 'பண்டிகை காலம்' },
            banner: I.offer_festival,
            img: I.cream_cakes,
            desc: {
                en: 'Celebrate the festive season with big savings on sweets, grocery bundles, and gift hampers.',
                ta: 'இனிப்புகள், மளிகைக் குவியல்கள் மற்றும் பரிசுப் பெட்டிகளில் பெரிய சேமிப்புடன் பண்டிகைக் காலத்தைக் கொண்டாடுங்கள்.'
            },
            highlights: {
                en: ['Exclusive Festival Gift Hampers', 'Discounts on Mithai & sweets', '15% off on bulk grocery purchases', 'Combo offers on packaged foods'],
                ta: ['பிரத்யேக பண்டிகை பரிசுப் பெட்டிகள்', 'மிட்டாய் மற்றும் இனிப்புகளுக்கு தள்ளுபடி', 'மொத்தமாக மளிகை வாங்குவதற்கு 15% தள்ளுபடி', 'தயாரிக்கப்பட்ட உணவுகளுக்கு காம்போ சலுகைகள்']
            },
            validity: { en: 'During all major festive seasons', ta: 'அனைத்து முக்கிய பண்டிகை காலங்களிலும்' },
            terms: {
                en: ['Applicable during announced festive weeks.', 'Valid on select brands and gift boxes only.', 'Limited stock available.'],
                ta: ['அறிவிக்கப்பட்ட பண்டிகை வாரங்களில் மட்டுமே பொருந்தும்.', 'தேர்ந்தெடுக்கப்பட்ட பிராண்டுகள் மற்றும் பரிசுப் பெட்டிகளுக்கு மட்டுமே செல்லுபடியாகும்.', 'வரம்பற்ற பங்குகள் மட்டுமே உள்ளன.']
            }
        },
        monthly: {
            title: { en: 'Monthly Mega Deals', ta: 'மாதாந்திர மெகா சலுகைகள்' },
            badge: { en: 'EVERY MONTH', ta: 'ஒவ்வொரு மாதமும்' },
            banner: I.offer_monthly,
            img: I.raw_rice,
            desc: {
                en: 'Stock up for the entire month at unbeatable prices.',
                ta: 'முழு மாதத்திற்கும் தேவையான பொருட்களை நிகரற்ற விலையில் சேமித்து வைத்துக் கொள்ளுங்கள்.'
            },
            highlights: {
                en: ['Up to 30% off on bulk staples', 'Special prices on branded rice & dal', 'Discounted household bundles', 'Monthly loyalty bonus points'],
                ta: ['மொத்த மளிகைப் பொருட்களுக்கு 30% வரை தள்ளுபடி', 'பிராண்டட் அரிசி மற்றும் பருப்புகளுக்கு சிறப்பு விலைகள்', 'தள்ளுபடி செய்யப்பட்ட வீட்டு உபயோக பொருட்கள்', 'மாதாந்திர விசுவாச போனஸ் புள்ளிகள்']
            },
            validity: { en: 'First week of every month', ta: 'ஒவ்வொரு மாதத்தின் முதல் வாரம்' },
            terms: {
                en: ['Valid from 1st to 7th of every month.', 'Applicable on bulk packs only.', 'Loyalty card must be presented for bonus points.'],
                ta: ['ஒவ்வொரு மாதமும் 1 முதல் 7 ஆம் தேதி வரை செல்லுபடியாகும்.', 'மொத்த பேக்குகளுக்கு மட்டுமே பொருந்தும்.', 'போனஸ் புள்ளிகளுக்கு விசுவாச அட்டையை சமர்ப்பிக்க வேண்டும்.']
            }
        },
        family: {
            title: { en: 'Family Combo Promotions', ta: 'குடும்ப காம்போ விளம்பரங்கள்' },
            badge: { en: 'FAMILY PACKS', ta: 'குடும்ப பேக்குகள்' },
            banner: I.offer_family,
            img: I.cow_milk,
            desc: {
                en: 'Save big on family-sized packs and reduce your monthly grocery bill.',
                ta: 'குடும்ப அளவிலான பேக்குகளில் பெரிய சேமிப்பைப் பெற்று உங்கள் மாதாந்திர மளிகைச் செலவைக் குறைக்கவும்.'
            },
            highlights: {
                en: ['Family pack combos across categories', 'Cereal + Milk combo at special price', 'Household bundle deals', 'Extra 5% off with loyalty card'],
                ta: ['அனைத்து பிரிவுகளிலும் குடும்ப பேக் காம்போக்கள்', 'சிறப்பு விலையில் தானியங்கள் + பால் காம்போ', 'வீட்டு உபயோகப் பொருட்கள் காம்போ சலுகைகள்', 'விசுவாச அட்டை மூலம் கூடுதல் 5% தள்ளுபடி']
            },
            validity: { en: 'All month long', ta: 'மாதம் முழுவதும்' },
            terms: {
                en: ['Valid on selected combo items marked in-store.', 'Cannot be clubbed with individual product offers.', 'Valid for retail customers only.'],
                ta: ['கடையில் குறிக்கப்பட்ட தேர்ந்தெடுக்கப்பட்ட காம்போ பொருட்களுக்கு மட்டுமே செல்லுபடியாகும்.', 'தனிநபர் தயாரிப்பு சலுகைகளுடன் இணைக்க முடியாது.', 'சில்லறை வாடிக்கையாளர்களுக்கு மட்டுமே செல்லுபடியாகும்.']
            }
        },
        summer: {
            title: { en: 'Summer Savings', ta: 'கோடைகால சேமிப்புகள்' },
            badge: { en: 'SUMMER SPECIAL', ta: 'கோடைகால சிறப்பு' },
            banner: I.offer_summer,
            img: I.fruit_juices,
            desc: {
                en: 'Beat the Chennai heat with cool deals on beverages, juices, and frozen foods.',
                ta: 'பானங்கள், பழச்சாறுகள் மற்றும் உறைந்த உணவுகளில் சிறந்த சலுகைகளுடன் சென்னையின் வெயிலை சமாளியுங்கள்.'
            },
            highlights: {
                en: ['Up to 25% off on all beverages', 'Special prices on Ice Cream & Frozen', 'Juice combo packs', 'Free drink with ₹500+ purchase'],
                ta: ['அனைத்து பானங்களுக்கும் 25% வரை தள்ளுபடி', 'ஐஸ்கிரீம் மற்றும் உறைந்த உணவுகளுக்கு சிறப்பு விலைகள்', 'பழச்சாறு காம்போ பேக்குகள்', '₹500+ வாங்குதலுக்கு இலவச பானம்']
            },
            validity: { en: 'April – June', ta: 'ஏப்ரல் – ஜூன்' },
            terms: {
                en: ['Valid during summer months only.', 'Free drink applicable on select options.', 'While stocks last.'],
                ta: ['கோடை மாதங்களில் மட்டுமே செல்லுபடியாகும்.', 'தேர்ந்தெடுக்கப்பட்ட விருப்பங்களுக்கு மட்டுமே இலவச பானம் பொருந்தும்.', 'பங்கு இருக்கும் வரை மட்டுமே.']
            }
        },
        school: {
            title: { en: 'Back To School Offers', ta: 'பள்ளிக்குத் திரும்பும் சலுகைகள்' },
            badge: { en: 'SCHOOL SEASON', ta: 'பள்ளி காலம்' },
            banner: I.offer_school,
            img: I.notebooks,
            desc: {
                en: 'Get your kids school-ready with special prices on stationery, snacks, and health drinks.',
                ta: 'எழுத்துப் பொருட்கள், சிற்றுண்டிகள் மற்றும் ஆரோக்கிய பானங்களில் சிறப்பு விலைகளுடன் உங்கள் குழந்தைகளை பள்ளிக்கு தயார்படுத்துங்கள்.'
            },
            highlights: {
                en: ['Flat 20% off on stationery', 'Special prices on health drinks', 'Snack combo packs for tiffins', 'Discounted school accessories'],
                ta: ['எழுத்துப் பொருட்களுக்கு தட்டையான 20% தள்ளுபடி', 'ஆரோக்கிய பானங்களுக்கு சிறப்பு விலைகள்', 'மதிய உணவிற்கான சிற்றுண்டி காம்போ பேக்குகள்', 'தள்ளுபடி செய்யப்பட்ட பள்ளி பாகங்கள்']
            },
            validity: { en: 'June & July', ta: 'ஜூன் & ஜூலை' },
            terms: {
                en: ['Valid during June and July school reopening seasons.', 'Discount applicable on notebooks and pens.', 'Valid on select school accessory brands.'],
                ta: ['ஜூன் மற்றும் ஜூலை பள்ளி திறப்பு காலங்களில் செல்லுபடியாகும்.', 'குறிப்பேடுகள் மற்றும் பேனாக்களுக்கு தள்ளுபடி பொருந்தும்.', 'தேர்ந்தெடுக்கப்பட்ட பள்ளி உபகரண பிராண்டுகளுக்கு மட்டுமே செல்லுபடியாகும்.']
            }
        }
    };

    // ═══════════════════════════════════════════════════════
    // MULTILINGUAL EXTENDED SHOWROOM & BRAND DATA
    // ═══════════════════════════════════════════════════════
    const deptHighlightsData = {
        fruits: {
            en: ['100% Organic Sourced', 'Chilled Chain Delivery', 'Zero Preservatives', 'Restocked at 5 AM Daily'],
            ta: ['100% இயற்கையானது', 'குளிர் சங்கிலி விநியோகம்', 'பாதுகாப்பு பொருட்கள் இல்லை', 'தினமும் காலை 5 மணிக்கு புதியது']
        },
        vegetables: {
            en: ['Sourced from Local Farms', 'Fresh Stock Every Morning', 'Crisp & Nutritious', 'Hygiene Grade Packed'],
            ta: ['உள்ளூர் பண்ணைகளிலிருந்து பெறப்பட்டது', 'தினமும் புதிய பங்குகள்', 'சத்தானது', 'சுகாதாரமாக பேக் செய்யப்பட்டது']
        },
        grocery: {
            en: ['Premium Grade Staples', 'Adulteration Free', 'Best Market Rates', 'Hygienically Packed'],
            ta: ['பிரீமியம் தர உணவுப் பொருட்கள்', 'கலப்படம் இல்லாதது', 'சிறந்த சந்தை விலைகள்', 'சுகாதாரமாக பேக் செய்யப்பட்டது']
        },
        rice: {
            en: ['Aged Premium Grains', 'Sorted and Cleaned', 'Top Brand Selection', 'No Broken Kernels'],
            ta: ['பழமையான பிரீமியம் தானியங்கள்', 'சுத்தம் செய்யப்பட்டது', 'சிறந்த பிராண்ட் தேர்வுகள்', 'உடைந்த அரிசிகள் இல்லை']
        },
        dairy: {
            en: ['Cold Chain Maintained', 'Strict Quality Checks', '100% Pure & Fresh', 'Zero Adulterants'],
            ta: ['குளிர் சங்கிலி பராமரிக்கப்படுகிறது', 'கடுமையான தர சோதனைகள்', '100% தூய்மையான & புதியது', 'கலப்படம் இல்லாதது']
        },
        bakery: {
            en: ['In-Store Baked Daily', 'Zero Artificial Preservatives', 'Soft & Melt-in-Mouth', 'Hand-Crafted Chefs'],
            ta: ['தினமும் சுடப்படுகிறது', 'செயற்கை பாதுகாப்பு இல்லை', 'மென்மையானது', 'கைவினைஞர்களால் தயாரிக்கப்பட்டது']
        },
        snacks: {
            en: ['Popular Brands Stocked', 'Perfect Party Combos', 'Fresh Stock Weekly', 'Wide Variety Range'],
            ta: ['பிரபலமான பிராண்டுகள்', 'சிறந்த காம்போக்கள்', 'வாராந்திர புதிய பங்குகள்', 'பரந்த அளவிலான தேர்வுகள்']
        },
        frozen: {
            en: ['Sub-Zero Temperature Storage', 'Preserved Freshness', 'Instant Food Selection', 'Safe Sealed Packs'],
            ta: ['துணை பூஜ்ஜிய வெப்பநிலை சேமிப்பு', 'பாதுகாக்கப்பட்ட புதிய தன்மை', 'உடனடி உணவு தேர்வுகள்', 'பாதுகாப்பாக சீல் செய்யப்பட்டது']
        },
        personal: {
            en: ['Top Quality Brands', 'Dermatologist Recommended', 'Gentle & Safe Care', '100% Original Brands'],
            ta: ['உயர் தர பிராண்டுகள்', 'சருமத்திற்கு பாதுகாப்பானது', 'மென்மையான பராமரிப்பு', '100% அசல் பிராண்டுகள்']
        },
        baby: {
            en: ['Pediatrician Approved Brands', 'Ultra Gentle & Safe', 'Premium Quality Care', 'Soft Fabrics Safe'],
            ta: ['மருத்துவர் அங்கீகரித்த பிராண்டுகள்', 'மென்மையானது & பாதுகாப்பானது', 'பிரீமியம் தர பராமரிப்பு', 'மென்மையான துணிகளுக்கு பாதுகாப்பானது']
        },
        household: {
            en: ['Durable Quality Tools', 'BPA Free Storage Containers', 'Modern Home Utilities', 'Best Utility Value'],
            ta: ['நீடித்த தரமான கருவிகள்', 'BPA இல்லாத சேமிப்பு கொள்கலன்கள்', 'நவீன வீட்டு உபகரணங்கள்', 'சிறந்த வீட்டு மதிப்பு']
        },
        cleaning: {
            en: ['Tough on Grease & Dirt', 'Eco-Friendly Options', 'Long-Lasting Fragrances', 'Disinfectant Formula'],
            ta: ['அழுக்குகளை நீக்கும்', 'சுற்றுச்சூழல் நட்பு விருப்பங்கள்', 'நீண்ட கால வாசனை', 'கிருமிநாசினி சூத்திரம்']
        },
        kitchen: {
            en: ['IS-Certified Cookware', 'Ergonomic Premium Handles', 'Heavy Gauge Steel', 'Non-Stick Long Life'],
            ta: ['IS-சான்றளிக்கப்பட்ட பாத்திரங்கள்', 'பிரீமியம் கைப்பிடிகள்', 'கனரக எஃகு', 'ஒட்டாத நீண்ட ஆயுள்']
        },
        stationery: {
            en: ['Fine Writing Quality Papers', 'Complete School Supplies', 'Non-Toxic Pens', 'Top Brand Stationery'],
            ta: ['சிறந்த எழுத்து தரம்', 'முழுமையான பள்ளி பொருட்கள்', 'பாதுகாப்பான பேனாக்கள்', 'சிறந்த பிராண்ட் எழுதுபொருட்கள்']
        },
        petcare: {
            en: ['High Protein Food Brands', 'Nutritious & Digestion Safe', 'Recommended by Vets', 'Balanced Diet Formula'],
            ta: ['அதிக புரத உணவுகள்', 'செரிமானத்திற்கு பாதுகாப்பானது', 'கால்நடை மருத்துவர்களால் பரிந்துரைக்கப்பட்டது', 'சீரான உணவு சூத்திரம்']
        }
    };

    const brandExtData = {
        amul: {
            history: {
                en: "Established in 1946 in Anand, Gujarat, Amul triggered India's White Revolution, making the country the world's largest milk producer. It is the gold standard of dairy cooperative systems.",
                ta: "1946 இல் குஜராத்தின் ஆனந்தில் தொடங்கப்பட்ட அமுல், இந்தியாவின் வெண்மைப் புரட்சியைத் தூண்டி, நாட்டின் பால் உற்பத்தியை உலகளவில் முதலிடத்திற்கு கொண்டு வந்தது. இது பால் கூட்டுறவு அமைப்புகளின் தரம் ஆகும்."
            },
            trust: {
                en: ["100% Purity Guaranteed", "Farmer-Owned Cooperative", "No Artificial Preservatives"],
                ta: ["100% தூய்மை உத்தரவாதம்", "விவசாயிகளுக்கு சொந்தமான கூட்டுறவு", "செயற்கை பாதுகாப்பு பொருட்கள் இல்லை"]
            }
        },
        tata: {
            history: {
                en: "Tata Sampann offers premium pulses and spices that are unpolished and sourced directly from select farms across India. It focuses on offering natural products that preserve nutrients.",
                ta: "டாடா சம்பன் பிரீமியம் பருப்புகள் மற்றும் மசாலாப் பொருட்களை மெருகூட்டாமல், இந்தியாவின் தேர்ந்தெடுக்கப்பட்ட பண்ணைகளிலிருந்து நேரடியாக வழங்குகிறது. இது ஊட்டச்சத்துக்களை பாதுகாப்பதில் கவனம் செலுத்துகிறது."
            },
            trust: {
                en: ["No Artificial Polish", "Naturally Sourced & Sorted", "Premium Sieve Graded"],
                ta: ["செயற்கை மெருகூட்டல் இல்லை", "இயற்கையாகப் பெறப்பட்டு பிரிக்கப்பட்டது", "பிரீமியம் தரம்"]
            }
        },
        aashirvaad: {
            history: {
                en: "Aashirvaad, launched by ITC in 2002, is India's leading flour brand. It uses a meticulous 3-step cleaning and grinding process to ensure that the flour makes soft and healthy rotis.",
                ta: "2002 இல் ஐடிசி நிறுவனத்தால் தொடங்கப்பட்ட ஆசிர்வாத், இந்தியாவின் முன்னணி மாவு பிராண்ட் ஆகும். மாவு மென்மையான மற்றும் ஆரோக்கியமான ரொட்டிகளை தயாரிப்பதை உறுதி செய்ய 3-கட்ட சுத்தம் செய்யும் முறையைப் பயன்படுத்துகிறது."
            },
            trust: {
                en: ["Carefully Chosen Grains", "Strict Hygiene Standards", "Rich in Natural Dietary Fiber"],
                ta: ["கவனமாக தேர்ந்தெடுக்கப்பட்ட தானியங்கள்", "கடுமையான சுகாதார தரநிலைகள்", "இயற்கை நார்சத்து நிறைந்தது"]
            }
        },
        britannia: {
            history: {
                en: "With a heritage of over 130 years, Britannia is one of India's favorite bakery brands. Britannia products have been a staple of Indian tea-times for generations.",
                ta: "130 ஆண்டுகளுக்கும் மேலான பாரம்பரியத்தைக் கொண்ட பிரிட்டானியா, இந்தியாவின் மிகவும் விரும்பப்படும் பேக்கரி பிராண்டுகளில் ஒன்றாகும். பிரிட்டானியா தயாரிப்புகள் பல தலைமுறைகளாக இந்திய டீ-டைமின் முக்கிய அங்கமாகும்."
            },
            trust: {
                en: ["Baked Daily Fresh", "Wholesome Good Ingredients", "Over 130 Years Legacy"],
                ta: ["தினமும் புதியதாக சுடப்பட்டது", "ஆரோக்கியமான நல்ல பொருட்கள்", "130 ஆண்டுகளுக்கும் மேலான பாரம்பரியம்"]
            }
        },
        parle: {
            history: {
                en: "Parle has been sweetening lives in India since 1929. The iconic Parle-G is the world's largest selling biscuit, bringing nourishment and glucose energy to kids.",
                ta: "பார்லே 1929 முதல் இந்தியாவில் மக்களின் வாழ்க்கையை இனிமையாக்கி வருகிறது. புகழ்பெற்ற பார்லே-ஜி உலகின் மிகப்பெரிய அளவில் விற்பனையாகும் பிஸ்கட் ஆகும், இது குழந்தைகளுக்கு ஊட்டச்சத்தையும் குளுக்கோஸ் ஆற்றலையும் அளிக்கிறது."
            },
            trust: {
                en: ["Generations of Love", "High-Energy Glucose", "Pocket-Friendly Quality"],
                ta: ["தலைமுறைகளின் அன்பு", "அதிக ஆற்றல் கொண்ட குளுக்கோஸ்", "விலைக்கேற்ற தரம்"]
            }
        },
        sunfeast: {
            history: {
                en: "ITC's Sunfeast brings delight with high-end, chocolate-filled cookies like Dark Fantasy. It is dedicated to bringing quality ingredients and rich flavors.",
                ta: "ஐடிசியின் சன்ஃபீஸ்ட் டார்க் ஃபேண்டஸி போன்ற நவீன, பிரீமியம் மற்றும் சாக்லேட் நிரப்பப்பட்ட குக்கீகளை வழங்குகிறது. இது தரமான பொருட்கள் மற்றும் சிறந்த சுவைகளை வழங்க அர்ப்பணிக்கப்பட்டுள்ளது."
            },
            trust: {
                en: ["Premium Rich Chocolate", "Superior Baking Quality", "Crisp & Delicious Textures"],
                ta: ["பிரீமியம் சிறந்த சாக்லேட்", "சிறந்த பேக்கிங் தரம்", "மொறுமொறுப்பான மற்றும் சுவையான அமைப்பு"]
            }
        },
        aavin: {
            history: {
                en: "Aavin milk is sourced directly from cooperative farmers across Tamil Nadu. It provides reliable livelihood to local farmers while ensuring high-quality milk reaches families daily.",
                ta: "ஆவின் பால் தமிழகம் முழுவதும் உள்ள கூட்டுறவு விவசாயிகளிடமிருந்து நேரடியாகப் பெறப்படுகிறது. இது உள்ளூர் விவசாயிகளுக்கு வாழ்வாதாரத்தை வழங்கும் அதே வேளையில், தரமான பால் குடும்பங்களை சென்றடைவதை உறுதி செய்கிறது."
            },
            trust: {
                en: ["Locally Sourced TN", "Daily Lab Tested Checks", "Supported Co-ops Farmers"],
                ta: ["தமிழகத்திலிருந்து பெறப்பட்டது", "தினமும் ஆய்வக சோதனைகள்", "கூட்டுறவு விவசாயிகளுக்கு ஆதரவு"]
            }
        },
        horlicks: {
            history: {
                en: "Horlicks has been a staple health drink in Indian households. Formulated with milk protein, vitamins, and minerals, it is a trusted choice for children's growth.",
                ta: "ஹார்லிக்ஸ் இந்திய வீடுகளில் ஒரு முக்கிய ஆரோக்கிய பானமாக இருந்து வருகிறது. பால் புரதம், வைட்டமின்கள் மற்றும் தாதுக்களுடன் தயாரிக்கப்பட்ட இது, குழந்தைகளின் வளர்ச்சிக்கு நம்பகமான தேர்வாகும்."
            },
            trust: {
                en: ["Clinically Proven Growth", "Essential Micronutrients", "Stronger Bones & Immunity"],
                ta: ["வளர்ச்சி மருத்துவ ரீதியாக நிரூபிக்கப்பட்டது", "அத்தியாவசிய சத்துக்கள்", "வலுவான எலும்புகள் & நோய் எதிர்ப்பு சக்தி"]
            }
        },
        surfexcel: {
            history: {
                en: "Surf Excel is a market leader in premium detergent products in India, famous for its stain-removing properties. It helps families remove tough stains with ease.",
                ta: "சர்ஃப் எக்செல் இந்தியாவில் பிரீமியம் சோப்பு தயாரிப்புகளில் சந்தையில் முன்னணியில் உள்ளது, அதன் கறை நீக்கும் பண்புகளுக்கு பெயர் பெற்றது. இது கடினமான கறைகளை எளிதில் அகற்ற உதவுகிறது."
            },
            trust: {
                en: ["Advanced Stain Removal", "Gentle on Colors & Fibers", "Most Trusted Detergent"],
                ta: ["மேம்பட்ட கறை நீக்கம்", "வண்ணங்கள் & இழைகளுக்கு மென்மையானது", "மிகவும் நம்பகமான சலவை சோப்பு"]
            }
        },
        vim: {
            history: {
                en: "Vim revolutionized dishwashing in India by introducing the first-ever dishwash bar. Formulated with the grease-cutting power of lemons, Vim makes kitchen cleanup quick.",
                ta: "விம் பாத்திரம் கழுவும் சோப்பை அறிமுகப்படுத்தி இந்தியாவில் பாத்திரம் கழுவும் முறையில் புரட்சியை ஏற்படுத்தியது. எலுமிச்சையின் கொழுப்பை நீக்கும் சக்தியுடன் தயாரிக்கப்பட்ட விம், சமையலறை சுத்தம் செய்வதை எளிதாக்குகிறது."
            },
            trust: {
                en: ["Real Lemon Juice Power", "Removes Tough Grease Easily", "Germ Removal Protection"],
                ta: ["உண்மையான எலுமிச்சை சாறு சக்தி", "கடினமான கொழுப்பை எளிதில் நீக்குகிறது", "கிருமி நீக்க பாதுகாப்பு"]
            }
        }
    };

    // Helper to generate premium product HTML
    const getProductCardHTML = (p, lang) => {
        const name = p.name[lang] || p.name['en'];
        const desc = p.desc[lang] || p.desc['en'];
        
        let badgeText = lang === 'en' ? 'Premium' : 'பிரீமியம்';
        let detailsText = lang === 'en' ? 'Fresh Sourced' : 'புதியதாக பெறப்பட்டது';
        let rating = (4.7 + (name.length % 4) * 0.1).toFixed(1);
        let qty = (name.length % 2 === 0) ? '500g' : '1 kg';
        
        if (name.includes('Apple') || name.includes('Mango') || name.includes('Orange') || name.includes('Grapes') || name.includes('Banana') || name.includes('Pineapple') || name.includes('Pomegranate') || name.includes('Watermelon')) {
            badgeText = lang === 'en' ? 'Organic' : 'இயற்கை';
            detailsText = lang === 'en' ? 'Daily Sourced' : 'தினமும் பெறப்பட்டது';
        } else if (name.includes('Tomato') || name.includes('Onion') || name.includes('Potato') || name.includes('Carrot') || name.includes('Beans') || name.includes('Brinjal') || name.includes('Cabbage') || name.includes('Cauliflower')) {
            badgeText = lang === 'en' ? 'Farm Fresh' : 'பண்ணை புதியது';
            detailsText = lang === 'en' ? 'Ooty Sourced' : 'ஊட்டியிலிருந்து பெறப்பட்டது';
        } else if (name.includes('Milk') || name.includes('Butter') || name.includes('Cheese') || name.includes('Paneer') || name.includes('Curd')) {
            badgeText = lang === 'en' ? '100% Pure' : '100% தூய்மையானது';
            detailsText = lang === 'en' ? 'Cold Chain' : 'குளிர்விக்கப்பட்டது';
            qty = '500ml / 200g';
        } else if (name.includes('Bread') || name.includes('Cake') || name.includes('Bun') || name.includes('Cookie')) {
            badgeText = lang === 'en' ? 'Freshly Baked' : 'புதியதாக சுடப்பட்டது';
            detailsText = lang === 'en' ? 'Daily Batch' : 'தினசரி தயாரிப்பு';
        }
        
        const waText = encodeURIComponent(`Hi FreshMart! I am interested in checking the store availability of "${p.name['en']}" at your Anna Nagar store. Could you please confirm if this is in stock?`);
        const waLink = `https://wa.me/919876543210?text=${waText}`;
        
        return `
            <div class="product-item">
                <span class="product-badge">${badgeText}</span>
                <div class="product-img-wrapper">
                    <img src="${p.img}" alt="${name}" loading="lazy">
                </div>
                <div class="product-item-info">
                    <div class="product-rating"><i class="fas fa-star"></i> ${rating}</div>
                    <h4>${name}</h4>
                    <p>${desc}</p>
                    <div class="product-meta-row">
                        <span class="product-qty"><i class="fas fa-balance-scale"></i> ${qty}</span>
                        <span class="product-origin"><i class="fas fa-map-marker-alt"></i> ${detailsText}</span>
                    </div>
                    <a href="${waLink}" target="_blank" class="btn-check-avail">
                        <i class="fab fa-whatsapp"></i> ${lang === 'en' ? 'Check Availability' : 'இருப்பு சரிபார்க்கவும்'}
                    </a>
                </div>
            </div>
        `;
    };

    // ═══════════════════════════════════════════════════════
    // OPEN MODAL FUNCTIONS
    // ═══════════════════════════════════════════════════════
    const openDeptModal = (key) => {
        activeModalType = 'dept';
        activeModalKey = key;
        const d = deptData[key]; if (!d) return;

        const titleText = d.title[currentLang] || d.title['en'];
        const descText = d.desc[currentLang] || d.desc['en'];

        document.getElementById('deptModalBanner').style.backgroundImage = `url('${d.banner}')`;
        document.getElementById('deptModalTitle').textContent = titleText;
        document.getElementById('deptModalDesc').textContent = descText;
        document.getElementById('deptModalBrands').innerHTML = d.brands.map(b => `<span class="modal-brand-tag">${b}</span>`).join('');
        
        // Populating department highlights list
        const highlightsEl = document.getElementById('deptModalHighlights');
        if (highlightsEl) {
            const hList = deptHighlightsData[key] ? deptHighlightsData[key][currentLang] : [];
            highlightsEl.innerHTML = hList.map(h => `<li><i class="fas fa-check-circle"></i> ${h}</li>`).join('');
        }

        // Populating product grid with premium card layouts
        document.getElementById('deptModalProducts').innerHTML = d.products.map(p => getProductCardHTML(p, currentLang)).join('');

        document.getElementById('deptModal').classList.add('open');
        body.classList.add('locked');
    };

    const openBrandModal = (key) => {
        activeModalType = 'brand';
        activeModalKey = key;
        const b = brandData[key]; if (!b) return;

        // Custom logo circle header
        document.getElementById('brandHeaderBlock').innerHTML = `
            <div class="brand-logo-xl" style="background:${b.color}">${b.title.slice(0,2)}</div>
            <h2>${b.title}</h2>
        `;

        // Brand history block
        const ext = brandExtData[key];
        const descText = ext ? ext.history[currentLang] : (b.desc[currentLang] || b.desc['en']);
        document.getElementById('brandDesc').textContent = descText;
        
        // Brand trust grid list
        const trustEl = document.getElementById('brandTrustGrid');
        if (trustEl && ext) {
            const trustList = ext.trust[currentLang] || [];
            trustEl.innerHTML = trustList.map(t => `
                <div class="brand-trust-item">
                    <i class="fas fa-shield-alt"></i>
                    <span>${t}</span>
                </div>
            `).join('');
        } else if (trustEl) {
            trustEl.innerHTML = '';
        }

        // Brand products available in-store
        document.getElementById('brandProducts').innerHTML = b.products.map(p => getProductCardHTML(p, currentLang)).join('');

        document.getElementById('brandModal').classList.add('open');
        body.classList.add('locked');
    };

    const openOfferModal = (key) => {
        activeModalType = 'offer';
        activeModalKey = key;
        const o = offerData[key]; if (!o) return;

        const titleText = o.title[currentLang] || o.title['en'];
        const descText = o.desc[currentLang] || o.desc['en'];
        const badgeText = o.badge[currentLang] || o.badge['en'];
        const validityText = o.validity[currentLang] || o.validity['en'];

        document.getElementById('offerModalBanner').style.backgroundImage = `url('${o.banner}')`;
        document.getElementById('offerModalBadge').textContent = badgeText;
        document.getElementById('offerModalTitle').textContent = titleText;
        document.getElementById('offerModalDesc').textContent = descText;
        
        // Dynamic Offer Product Image
        const offerModalImg = document.getElementById('offerModalImg');
        if (offerModalImg) {
            offerModalImg.src = o.img;
            offerModalImg.alt = titleText;
        }

        document.getElementById('offerHighlights').innerHTML = o.highlights[currentLang].map(h => 
            `<li><i class="fas fa-check-circle"></i>${h}</li>`
        ).join('');
        
        document.getElementById('offerValidity').textContent = validityText;

        // Custom prefilled claim link trigger
        const offerClaimBtn = document.getElementById('offerClaimBtn');
        if (offerClaimBtn) {
            const waText = encodeURIComponent(`Hi FreshMart! I'd like to check out the details or claim the offer "${o.title['en']}" (${badgeText}) at your Anna Nagar store. Please assist me.`);
            offerClaimBtn.href = `https://wa.me/919876543210?text=${waText}`;
        }

        // Reset terms block
        const offerTermsContent = document.getElementById('offerTermsContent');
        const offerTermsBtn = document.getElementById('offerTermsBtn');
        const offerTermsList = document.getElementById('offerTermsList');

        if (offerTermsContent && offerTermsBtn) {
            offerTermsContent.classList.remove('open');
            offerTermsBtn.innerHTML = `<i class="fas fa-file-contract"></i> ${currentLang === 'en' ? 'View Terms & Conditions' : 'நிபந்தனைகளைக் காண்க'}`;
        }

        if (offerTermsList) {
            offerTermsList.innerHTML = o.terms[currentLang].map(t => 
                `<li><i class="fas fa-info-circle"></i> ${t}</li>`
            ).join('');
        }

        document.getElementById('offerModal').classList.add('open');
        body.classList.add('locked');
    };

    // ─── OFFERS DYNAMIC GENERATION ───
    const renderOffersGrid = () => {
        const offersGrid = document.getElementById('offersGrid');
        if (!offersGrid) return;
        offersGrid.innerHTML = Object.keys(offerData).map(key => {
            const o = offerData[key];
            const titleText = o.title[currentLang];
            const descText = o.desc[currentLang];
            const badgeText = o.badge[currentLang];
            const bannerUrl = o.banner;
            return `
                <div class="offer-card anim visible" data-offer="${key}" style="background-image: url('${bannerUrl}')">
                    <div class="offer-gradient"></div>
                    <div class="offer-body">
                        <span class="offer-badge">${badgeText}</span>
                        <h3>${titleText}</h3>
                        <p>${descText}</p>
                        <span class="offer-cta">${currentLang === 'en' ? 'View Details' : 'விவரங்களைக் காண்க'} <i class="fas fa-arrow-right"></i></span>
                    </div>
                </div>
            `;
        }).join('');
        
        // Attach click triggers to dynamically rendered cards
        offersGrid.querySelectorAll('.offer-card').forEach(c => {
            c.addEventListener('click', () => openOfferModal(c.dataset.offer));
        });
    };

    // Initialize Offers Grid on Startup
    renderOffersGrid();

    // Wire up static department & brand card event listeners
    document.querySelectorAll('.department-card').forEach(c => c.addEventListener('click', () => openDeptModal(c.dataset.dept)));
    document.querySelectorAll('.brand-card').forEach(c => c.addEventListener('click', () => openBrandModal(c.dataset.brand)));

    // Wire up Terms & Conditions Accordion
    const offerTermsBtn = document.getElementById('offerTermsBtn');
    const offerTermsContent = document.getElementById('offerTermsContent');
    if (offerTermsBtn && offerTermsContent) {
        offerTermsBtn.addEventListener('click', () => {
            offerTermsContent.classList.toggle('open');
            const isOpen = offerTermsContent.classList.contains('open');
            offerTermsBtn.innerHTML = isOpen 
                ? `<i class="fas fa-times-circle"></i> ${currentLang === 'en' ? 'Hide Terms & Conditions' : 'நிபந்தனைகளை மறை'}`
                : `<i class="fas fa-file-contract"></i> ${currentLang === 'en' ? 'View Terms & Conditions' : 'நிபந்தனைகளைக் காண்க'}`;
        });
    }

    // ─── GALLERY FILTERING & LIGHTBOX ───
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = [...document.querySelectorAll('.gallery-item')];
    const lbOverlay = document.getElementById('lightbox');
    const lbImg     = document.getElementById('lbImg');
    const lbCap     = document.getElementById('lbCaption');
    let lbIdx = 0;
    
    // Track currently visible items for correct next/prev cycling
    let visibleItems = [...galleryItems];

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            visibleItems = [];

            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    // Trigger reflow for animation
                    void item.offsetWidth;
                    item.classList.add('visible');
                    visibleItems.push(item);
                } else {
                    item.style.display = 'none';
                    item.classList.remove('visible');
                }
            });
        });
    });

    const openLb = (i) => {
        if (visibleItems.length === 0) return;
        lbIdx = (i + visibleItems.length) % visibleItems.length;
        lbImg.src = visibleItems[lbIdx].dataset.img;
        lbCap.textContent = visibleItems[lbIdx].dataset.caption;
        lbOverlay.classList.add('open');
        body.classList.add('locked');
    };

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const idx = visibleItems.indexOf(item);
            if (idx !== -1) {
                openLb(idx);
            }
        });
    });

    document.querySelector('.lb-prev').addEventListener('click', () => openLb(lbIdx - 1));
    document.querySelector('.lb-next').addEventListener('click', () => openLb(lbIdx + 1));

    // ─── REVIEW SLIDER ───
    const track = document.getElementById('reviewsTrack');
    const cards = [...track.querySelectorAll('.review-card')];
    const dotsC = document.getElementById('reviewDots');
    let rIdx = 0;
    cards.forEach((_, i) => { const d = document.createElement('span'); d.className = 'rdot' + (i === 0 ? ' active' : ''); d.addEventListener('click', () => goReview(i)); dotsC.appendChild(d); });
    const getDots = () => [...dotsC.querySelectorAll('.rdot')];
    const goReview = (n) => {
        rIdx = (n + cards.length) % cards.length;
        const w = cards[0].offsetWidth + 24;
        track.style.transform = `translateX(-${rIdx * w}px)`;
        getDots().forEach((d, i) => d.classList.toggle('active', i === rIdx));
    };
    document.getElementById('reviewPrev').addEventListener('click', () => goReview(rIdx - 1));
    document.getElementById('reviewNext').addEventListener('click', () => goReview(rIdx + 1));
    setInterval(() => goReview(rIdx + 1), 5500);
    window.addEventListener('resize', () => goReview(rIdx));
});

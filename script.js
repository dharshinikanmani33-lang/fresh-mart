/* ============================================================
   FreshMart – script.js  (100% Local Images Edition)
   Every image uses LOCAL files from assets/images/
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

    // ═══════════════════════════════════════════════════════
    // GLOBAL IMAGE FALLBACK — catches ANY broken image
    // ═══════════════════════════════════════════════════════
    document.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG' && !e.target.dataset.fb) {
            e.target.dataset.fb = '1';
            // Use a local fallback — the store interior
            e.target.src = 'assets/images/hero_banner.png';
        }
    }, true);

    // ─── LANGUAGE TOGGLE (Premium Custom Dropdown) ───
    let currentLang = 'en';
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
    };
    document.querySelectorAll('.modal-overlay').forEach(m => {
        m.addEventListener('click', e => { if (e.target === m) closeAllModals(); });
    });
    document.querySelectorAll('.modal-close-btn').forEach(btn => btn.addEventListener('click', closeAllModals));
    document.querySelector('.lb-close').addEventListener('click', closeAllModals);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAllModals(); });

    // ═══════════════════════════════════════════════════════
    // LOCAL IMAGE PATHS — All local, all guaranteed to load
    // ═══════════════════════════════════════════════════════
    const I = {
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
        surf: 'assets/images/surf_excel.png'
    };

    // ═══════════════════════════════════════════════════════
    // DEPARTMENT DATA — All use local images
    // ═══════════════════════════════════════════════════════
    const deptData = {
        fruits: {
            title: 'Fresh Fruits',
            desc: 'We source the finest farm-fresh seasonal and exotic fruits every morning. Quality-checked and handpicked for your family\'s health.',
            banner: I.fruits,
            brands: ['Fresh Farm', 'Del Monte', 'Naturelle'],
            products: [
                { name: 'Kashmir Apples', img: I.fruits, desc: 'Crisp & sweet Himalayan apples' },
                { name: 'Robusta Bananas', img: I.fruits, desc: 'Ripe & nutritious bananas' },
                { name: 'Alphonso Mangoes', img: I.fruits, desc: 'King of fruits — premium quality' },
                { name: 'Nagpur Oranges', img: I.fruits, desc: 'Vitamin C rich juicy oranges' },
                { name: 'Black Grapes', img: I.fruits, desc: 'Juicy & fresh seedless grapes' },
                { name: 'Pomegranates', img: I.fruits, desc: 'Antioxidant rich ruby gems' },
                { name: 'Watermelon', img: I.fruits, desc: 'Summer favourite — chilled' },
                { name: 'Fresh Pineapple', img: I.fruits, desc: 'Tropical & sweet whole pineapple' }
            ]
        },
        vegetables: {
            title: 'Fresh Vegetables',
            desc: 'Crisp, nutritious vegetables sourced directly from local farms every morning. Maximum freshness, guaranteed.',
            banner: I.veg,
            brands: ['Local Farm', 'Green Valley', 'Organic India'],
            products: [
                { name: 'Farm Tomatoes', img: I.veg, desc: 'Firm & red vine-ripened' },
                { name: 'Fresh Onions', img: I.veg, desc: 'Sharp & flavorful all types' },
                { name: 'Potatoes', img: I.veg, desc: 'All varieties — clean & sorted' },
                { name: 'Ooty Carrots', img: I.veg, desc: 'Sweet & crunchy hill carrots' },
                { name: 'Fresh Beans', img: I.veg, desc: 'Tender & green hand-picked' },
                { name: 'Brinjal', img: I.veg, desc: 'Purple & firm for curries' },
                { name: 'Cabbage', img: I.veg, desc: 'Crisp fresh green leaves' },
                { name: 'Cauliflower', img: I.veg, desc: 'White & fresh — farm quality' }
            ]
        },
        grocery: {
            title: 'Grocery & Staples',
            desc: 'Premium quality everyday cooking essentials. From aromatic spices to pure cooking oils.',
            banner: I.grocery,
            brands: ['Aashirvaad', 'Tata', 'Fortune', 'MDH'],
            products: [
                { name: 'Basmati Rice', img: I.india_gate, desc: 'Long grain premium basmati' },
                { name: 'Toor Dal', img: I.tata_dal, desc: 'Protein-rich unpolished pulses' },
                { name: 'Wheat Flour', img: I.grocery, desc: 'Fresh ground whole wheat atta' },
                { name: 'Sugar', img: I.grocery, desc: 'Pure white refined sugar' },
                { name: 'Spice Mix', img: I.grocery, desc: 'Aromatic masala blends' },
                { name: 'Cooking Oil', img: I.grocery, desc: 'Sunflower & groundnut oils' }
            ]
        },
        rice: {
            title: 'Rice & Grains',
            desc: 'A wide selection of premium rice varieties, lentils, and whole grains for every cooking style.',
            banner: I.rice,
            brands: ['India Gate', 'Tata Sampann', 'Aashirvaad'],
            products: [
                { name: 'India Gate Basmati', img: I.india_gate, desc: 'Premium extra-long grain rice' },
                { name: 'Raw Rice (Ponni)', img: I.rice, desc: 'Ponni & Sona Masoori varieties' },
                { name: 'Toor Dal', img: I.tata_dal, desc: 'Unpolished protein-rich dal' },
                { name: 'Moong Dal', img: I.rice, desc: 'Yellow & green moong varieties' }
            ]
        },
        dairy: {
            title: 'Dairy Products',
            desc: 'Always fresh. Stored at optimal temperature. Our dairy section is stocked daily.',
            banner: I.dairy,
            brands: ['Amul', 'Aavin', 'Milky Mist', 'Nestlé'],
            products: [
                { name: 'Fresh Cow Milk', img: I.dairy, desc: 'Full-cream & toned — daily fresh' },
                { name: 'Salted Butter', img: I.dairy, desc: 'Rich & creamy Amul butter' },
                { name: 'Cheddar Cheese', img: I.dairy, desc: 'Slices & blocks for sandwiches' },
                { name: 'Fresh Paneer', img: I.dairy, desc: 'Soft & fresh — made daily' },
                { name: 'Curd', img: I.dairy, desc: 'Thick, creamy homestyle curd' }
            ]
        },
        bakery: {
            title: 'Bakery',
            desc: 'Freshly baked breads, cakes, and pastries prepared daily.',
            banner: I.bakery,
            brands: ['Britannia', 'Modern Bakeries', 'Local Bakery'],
            products: [
                { name: 'Sandwich Bread', img: I.bakery, desc: 'White & whole wheat loaves' },
                { name: 'Cream Cakes', img: I.bakery, desc: 'Birthday & celebration cakes' },
                { name: 'Assorted Cookies', img: I.marie, desc: 'Chocolate, vanilla & butter' },
                { name: 'Fresh Buns', img: I.bakery, desc: 'Soft dinner rolls — baked daily' }
            ]
        },
        snacks: {
            title: 'Snacks & Beverages',
            desc: 'Your favourite chips, biscuits, soft drinks, juices and health drinks.',
            banner: I.snacks,
            brands: ['Parle', 'Britannia', 'Sunfeast', 'PepsiCo', 'Coca-Cola'],
            products: [
                { name: 'Potato Chips', img: I.snacks, desc: 'Salted, masala & cream flavours' },
                { name: 'Marie Biscuits', img: I.marie, desc: 'Classic tea-time favourites' },
                { name: 'Soft Drinks', img: I.snacks, desc: 'Cola, Sprite, Fanta & more' },
                { name: 'Fruit Juices', img: I.snacks, desc: 'Real fruit juices all flavours' }
            ]
        },
        frozen: {
            title: 'Frozen Foods',
            desc: 'Premium frozen vegetables, ready-to-eat meals, and frozen treats.',
            banner: I.frozen,
            brands: ['McCain', 'ITC', 'Mother\'s Recipe'],
            products: [
                { name: 'Frozen Peas', img: I.frozen, desc: 'Garden fresh flash-frozen' },
                { name: 'Ice Cream', img: I.frozen, desc: 'All flavours — Amul, Kwality' }
            ]
        },
        personal: {
            title: 'Personal Care',
            desc: 'From soaps and shampoos to skincare and dental hygiene.',
            banner: I.personal,
            brands: ['Dove', 'Colgate', 'Himalaya', 'Pears'],
            products: [
                { name: 'Soap', img: I.personal, desc: 'Dove, Pears, Lux & more' },
                { name: 'Shampoo', img: I.personal, desc: 'Head & Shoulders, Dove & more' },
                { name: 'Toothpaste', img: I.personal, desc: 'Colgate, Pepsodent & more' }
            ]
        },
        baby: {
            title: 'Baby Care',
            desc: 'Everything your little one needs — diapers, baby food, gentle skincare.',
            banner: I.baby,
            brands: ['Pampers', 'Himalaya Baby', 'Johnson\'s'],
            products: [
                { name: 'Baby Diapers', img: I.baby, desc: 'Pampers — all sizes in stock' },
                { name: 'Baby Food', img: I.baby, desc: 'Cerelac, Nestum & more' }
            ]
        },
        household: {
            title: 'Household Essentials',
            desc: 'Storage, cleaning tools and everyday home utilities.',
            banner: I.household,
            brands: ['Tupperware', 'Prestige', 'Cello'],
            products: [
                { name: 'Storage Containers', img: I.household, desc: 'Airtight & durable all sizes' },
                { name: 'Brooms & Mops', img: I.household, desc: 'Full cleaning set for home' }
            ]
        },
        cleaning: {
            title: 'Cleaning Products',
            desc: 'Detergents, floor cleaners, dishwash liquids and more.',
            banner: I.household,
            brands: ['Surf Excel', 'Vim', 'Lizol', 'Harpic'],
            products: [
                { name: 'Surf Excel', img: I.surf, desc: 'Matic liquid & washing bar' },
                { name: 'Floor Cleaners', img: I.household, desc: 'Lizol & Domex all variants' },
                { name: 'Dishwash', img: I.household, desc: 'Vim liquid, gel & bar' }
            ]
        },
        kitchen: {
            title: 'Kitchen Essentials',
            desc: 'Pots, pans, cutlery, and every kitchen utensil you need.',
            banner: I.kitchen,
            brands: ['Prestige', 'Hawkins', 'Pigeon'],
            products: [
                { name: 'Pressure Cooker', img: I.kitchen, desc: 'Prestige & Hawkins cookers' },
                { name: 'Non-stick Pan', img: I.kitchen, desc: 'All sizes — dosa tava too' }
            ]
        },
        stationery: {
            title: 'Stationery',
            desc: 'Pens, notebooks, files and school supplies.',
            banner: I.stationery,
            brands: ['Reynolds', 'Camlin', 'Classmate'],
            products: [
                { name: 'Notebooks', img: I.stationery, desc: 'Ruled, blank & graph books' },
                { name: 'Ball Pens', img: I.stationery, desc: 'Reynolds, Parker & Cello' }
            ]
        },
        petcare: {
            title: 'Pet Care Products',
            desc: 'Everything your pets love — food, grooming essentials, accessories.',
            banner: I.petcare,
            brands: ['Pedigree', 'Royal Canin', 'Whiskas'],
            products: [
                { name: 'Dog Food', img: I.petcare, desc: 'Pedigree & Royal Canin bags' },
                { name: 'Cat Food', img: I.petcare, desc: 'Whiskas wet & dry food' }
            ]
        }
    };

    // ═══════════════════════════════════════════════════════
    // BRAND DATA — All use local images
    // ═══════════════════════════════════════════════════════
    const brandData = {
        amul: {
            title: 'Amul', color: 'linear-gradient(135deg,#1565C0,#1E88E5)',
            desc: 'The Taste of India. Amul is India\'s largest dairy brand, trusted by millions of families for over 75 years.',
            products: [
                { name: 'Amul Taaza Milk', img: I.dairy, desc: 'Fresh full-cream milk, 1L & 500ml packs.' },
                { name: 'Amul Butter', img: I.dairy, desc: 'Salted & unsalted butter, 100g–500g.' },
                { name: 'Amul Cheese', img: I.dairy, desc: 'Ready-to-use cheese slices & blocks.' },
                { name: 'Amul Paneer', img: I.dairy, desc: 'Soft, fresh paneer — 200g & 500g.' },
                { name: 'Amul Ice Cream', img: I.frozen, desc: 'Vanilla, chocolate and fruity flavours.' }
            ]
        },
        tata: {
            title: 'Tata Sampann', color: 'linear-gradient(135deg,#B71C1C,#E53935)',
            desc: 'Tata Sampann brings authentic Indian flavours through premium quality pulses, spices, and staples.',
            products: [
                { name: 'Tata Toor Dal', img: I.tata_dal, desc: 'Unpolished toor dal, rich in protein.' },
                { name: 'Tata Turmeric', img: I.grocery, desc: 'Bright yellow, aromatic turmeric powder.' },
                { name: 'Tata Chilli Powder', img: I.grocery, desc: 'Vibrant colour, authentic Indian heat.' }
            ]
        },
        aashirvaad: {
            title: 'Aashirvaad', color: 'linear-gradient(135deg,#E65100,#FB8C00)',
            desc: 'Aashirvaad by ITC is India\'s leading flour brand, delivering freshness and nutrition.',
            products: [
                { name: 'Aashirvaad Atta', img: I.grocery, desc: 'Premium whole wheat flour, 5kg & 10kg.' },
                { name: 'Aashirvaad Spices', img: I.grocery, desc: 'Authentic masala blends — all varieties.' }
            ]
        },
        britannia: {
            title: 'Britannia', color: 'linear-gradient(135deg,#2E7D32,#4CAF50)',
            desc: 'India\'s most loved food company, bringing joy with baked goods since 1892.',
            products: [
                { name: 'Good Day Biscuits', img: I.marie, desc: 'Cashew & butter flavour cookies.' },
                { name: 'Marie Gold', img: I.marie, desc: 'Classic tea-time light biscuits.' },
                { name: 'Britannia Bread', img: I.bakery, desc: 'White & brown bread loaves — daily fresh.' }
            ]
        },
        parle: {
            title: 'Parle', color: 'linear-gradient(135deg,#4A148C,#7B1FA2)',
            desc: 'India\'s most iconic biscuit brand, famous for Parle-G since 1938.',
            products: [
                { name: 'Parle-G', img: I.marie, desc: 'World\'s #1 selling glucose biscuit.' },
                { name: '20-20 Cookies', img: I.snacks, desc: 'Crunchy cashew & butter cookies.' }
            ]
        },
        sunfeast: {
            title: 'Sunfeast', color: 'linear-gradient(135deg,#F57F17,#FFB300)',
            desc: 'Sunfeast by ITC — a premium biscuits and cakes brand for every age group.',
            products: [
                { name: 'Dark Fantasy', img: I.snacks, desc: 'Rich choco-filled cookie indulgence.' },
                { name: 'Mom\'s Magic', img: I.marie, desc: 'Butter-rich homestyle biscuits.' }
            ]
        },
        aavin: {
            title: 'Aavin', color: 'linear-gradient(135deg,#006064,#00ACC1)',
            desc: 'Tamil Nadu Co-operative Milk Federation — TN\'s most trusted dairy brand.',
            products: [
                { name: 'Aavin Milk', img: I.dairy, desc: 'Full cream, toned, & double toned.' },
                { name: 'Aavin Curd', img: I.dairy, desc: 'Thick, creamy set curd — daily.' },
                { name: 'Aavin Butter', img: I.dairy, desc: 'Fresh table butter — salted.' }
            ]
        },
        horlicks: {
            title: 'Horlicks', color: 'linear-gradient(135deg,#33691E,#8BC34A)',
            desc: 'Scientifically formulated health drink for stronger bones and immunity.',
            products: [
                { name: 'Horlicks Original', img: I.snacks, desc: 'Classic malt health drink, 500g jar.' },
                { name: 'Junior Horlicks', img: I.baby, desc: 'Specially formulated for growing children.' }
            ]
        },
        surfexcel: {
            title: 'Surf Excel', color: 'linear-gradient(135deg,#0D47A1,#1976D2)',
            desc: 'India\'s #1 laundry detergent for decades. Daag Ache Hain!',
            products: [
                { name: 'Surf Excel Matic', img: I.surf, desc: 'Liquid detergent for front & top load.' },
                { name: 'Surf Excel Bar', img: I.surf, desc: 'Washing bar for tough stains.' }
            ]
        },
        vim: {
            title: 'Vim', color: 'linear-gradient(135deg,#558B2F,#8BC34A)',
            desc: 'India\'s most trusted dishwashing brand — cuts through grease effectively.',
            products: [
                { name: 'Vim Liquid', img: I.household, desc: 'Anti-bacterial formula, 500ml & 750ml.' },
                { name: 'Vim Bar', img: I.household, desc: 'Classic lime bar for sparkling utensils.' }
            ]
        }
    };

    // ═══════════════════════════════════════════════════════
    // OFFER DATA — No images needed, CSS gradients only
    // ═══════════════════════════════════════════════════════
    const offerData = {
        weekend: { title: 'Weekend Savings Festival', badge: 'SAT & SUN ONLY', bg: 'linear-gradient(135deg,#FF8F00,#FFB300)', desc: 'Make your weekends extra special! Enjoy massive discounts on fresh produce, dairy, and household essentials.', highlights: ['Up to 20% off Fresh Fruits & Vegetables', 'Buy 2 Get 1 Free on Dairy Products', 'Special discounts on Bakery Items', '10% off on all Cleaning Products'], validity: 'Every Saturday & Sunday' },
        festival: { title: 'Grand Festival Offers', badge: 'FESTIVE SEASON', bg: 'linear-gradient(135deg,#C62828,#E53935)', desc: 'Celebrate the festive season with big savings on sweets, grocery bundles, and gift hampers.', highlights: ['Exclusive Festival Gift Hampers', 'Discounts on Mithai & sweets', '15% off on bulk grocery purchases', 'Combo offers on packaged foods'], validity: 'During all major festive seasons' },
        monthly: { title: 'Monthly Mega Deals', badge: 'EVERY MONTH', bg: 'linear-gradient(135deg,#1565C0,#42A5F5)', desc: 'Stock up for the entire month at unbeatable prices.', highlights: ['Up to 30% off on bulk staples', 'Special prices on branded rice & dal', 'Discounted household bundles', 'Monthly loyalty bonus points'], validity: 'First week of every month' },
        family: { title: 'Family Combo Promotions', badge: 'FAMILY PACKS', bg: 'linear-gradient(135deg,#2E7D32,#66BB6A)', desc: 'Save big on family-sized packs and reduce your monthly grocery bill.', highlights: ['Family pack combos across categories', 'Cereal + Milk combo at special price', 'Household bundle deals', 'Extra 5% off with loyalty card'], validity: 'All month long' },
        summer: { title: 'Summer Savings', badge: 'SUMMER SPECIAL', bg: 'linear-gradient(135deg,#00838F,#26C6DA)', desc: 'Beat the Chennai heat with cool deals on beverages, juices, and frozen foods.', highlights: ['Up to 25% off on all beverages', 'Special prices on Ice Cream & Frozen', 'Juice combo packs', 'Free drink with ₹500+ purchase'], validity: 'April – June' },
        school: { title: 'Back To School Offers', badge: 'SCHOOL SEASON', bg: 'linear-gradient(135deg,#4A148C,#9C27B0)', desc: 'Get your kids school-ready with special prices on stationery, snacks, and health drinks.', highlights: ['Flat 20% off on stationery', 'Special prices on health drinks', 'Snack combo packs for tiffins', 'Discounted school accessories'], validity: 'June & July' }
    };

    // ═══════════════════════════════════════════════════════
    // OPEN MODAL FUNCTIONS
    // ═══════════════════════════════════════════════════════
    const openDeptModal = (key) => {
        const d = deptData[key]; if (!d) return;
        document.getElementById('deptModalBanner').style.backgroundImage = `url('${d.banner}')`;
        document.getElementById('deptModalTitle').textContent = d.title;
        document.getElementById('deptModalDesc').textContent = d.desc;
        document.getElementById('deptModalBrands').innerHTML = d.brands.map(b => `<span class="modal-brand-tag">${b}</span>`).join('');
        document.getElementById('deptModalProducts').innerHTML = d.products.map(p =>
            `<div class="product-item"><img src="${p.img}" alt="${p.name}"><div class="product-item-info"><h4>${p.name}</h4><p>${p.desc}</p></div></div>`
        ).join('');
        document.getElementById('deptModal').classList.add('open');
        body.classList.add('locked');
    };

    const openBrandModal = (key) => {
        const b = brandData[key]; if (!b) return;
        document.getElementById('brandHeaderBlock').innerHTML = `<div class="brand-logo-xl" style="background:${b.color}">${b.title.slice(0,2)}</div><h2>${b.title}</h2>`;
        document.getElementById('brandDesc').textContent = b.desc;
        document.getElementById('brandProducts').innerHTML = b.products.map(p =>
            `<div class="product-item"><img src="${p.img}" alt="${p.name}"><div class="product-item-info"><h4>${p.name}</h4><p>${p.desc}</p></div></div>`
        ).join('');
        document.getElementById('brandModal').classList.add('open');
        body.classList.add('locked');
    };

    const openOfferModal = (key) => {
        const o = offerData[key]; if (!o) return;
        document.getElementById('offerModalBanner').style.background = o.bg;
        document.getElementById('offerModalBadge').textContent = o.badge;
        document.getElementById('offerModalTitle').textContent = o.title;
        document.getElementById('offerModalDesc').textContent = o.desc;
        document.getElementById('offerHighlights').innerHTML = o.highlights.map(h => `<li><i class="fas fa-check-circle"></i>${h}</li>`).join('');
        document.getElementById('offerValidity').textContent = o.validity;
        document.getElementById('offerModal').classList.add('open');
        body.classList.add('locked');
    };

    document.querySelectorAll('.department-card').forEach(c => c.addEventListener('click', () => openDeptModal(c.dataset.dept)));
    document.querySelectorAll('.brand-card').forEach(c => c.addEventListener('click', () => openBrandModal(c.dataset.brand)));
    document.querySelectorAll('.offer-card').forEach(c => c.addEventListener('click', () => openOfferModal(c.dataset.offer)));

    // ─── LIGHTBOX ───
    const galleryItems = [...document.querySelectorAll('.gallery-item')];
    const lbOverlay = document.getElementById('lightbox');
    const lbImg     = document.getElementById('lbImg');
    const lbCap     = document.getElementById('lbCaption');
    let lbIdx = 0;
    const openLb = (i) => { lbIdx = i; lbImg.src = galleryItems[i].dataset.img; lbCap.textContent = galleryItems[i].dataset.caption; lbOverlay.classList.add('open'); body.classList.add('locked'); };
    galleryItems.forEach((item, i) => item.addEventListener('click', () => openLb(i)));
    document.querySelector('.lb-prev').addEventListener('click', () => openLb((lbIdx - 1 + galleryItems.length) % galleryItems.length));
    document.querySelector('.lb-next').addEventListener('click', () => openLb((lbIdx + 1) % galleryItems.length));

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

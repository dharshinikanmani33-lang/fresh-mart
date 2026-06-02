/* ============================================================
   FreshMart – script.js  (Zero-Broken-Image Edition)
   All images use placehold.co which is 100% reliable.
   Plus a global fallback system that catches ANY failure.
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

    // ═══════════════════════════════════════════════════════
    // GLOBAL IMAGE FALLBACK SYSTEM
    // Catches ANY image load failure anywhere on the page
    // and replaces it with a branded placeholder.
    // ═══════════════════════════════════════════════════════
    document.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG' && !e.target.dataset.fallbackApplied) {
            e.target.dataset.fallbackApplied = 'true';
            const alt = e.target.alt || 'FreshMart';
            const text = encodeURIComponent(alt);
            e.target.src = `https://placehold.co/400x300/2E7D32/FFF?text=${text}`;
        }
    }, true);

    // ─── SCROLL ANIMATIONS ───
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
    // HELPER: Generate placehold.co URL (never fails)
    // ═══════════════════════════════════════════════════════
    const img = (w, h, bg, fg, text) => `https://placehold.co/${w}x${h}/${bg}/${fg}?text=${encodeURIComponent(text)}`;

    // ═══════════════════════════════════════════════════════
    // DEPARTMENT DATA — Every product has a unique image
    // ═══════════════════════════════════════════════════════
    const deptData = {
        fruits: {
            title: 'Fresh Fruits',
            desc: 'We source the finest farm-fresh seasonal and exotic fruits every morning. Quality-checked and handpicked for your family\'s health.',
            banner: img(880, 300, '2E7D32', 'FFF', '🍎 Fresh Fruits Department'),
            brands: ['Fresh Farm', 'Del Monte', 'Naturelle'],
            products: [
                { name: 'Kashmir Apples', img: img(300, 200, 'C62828', 'FFF', '🍎 Apples'), desc: 'Crisp & sweet' },
                { name: 'Robusta Bananas', img: img(300, 200, 'F9A825', 'FFF', '🍌 Bananas'), desc: 'Ripe & nutritious' },
                { name: 'Alphonso Mangoes', img: img(300, 200, 'E65100', 'FFF', '🥭 Mangoes'), desc: 'King of fruits' },
                { name: 'Nagpur Oranges', img: img(300, 200, 'EF6C00', 'FFF', '🍊 Oranges'), desc: 'Vitamin C rich' },
                { name: 'Black Grapes', img: img(300, 200, '4A148C', 'FFF', '🍇 Grapes'), desc: 'Juicy & fresh' },
                { name: 'Pomegranates', img: img(300, 200, 'B71C1C', 'FFF', '🫐 Pomegranate'), desc: 'Antioxidant rich' },
                { name: 'Watermelon', img: img(300, 200, '388E3C', 'FFF', '🍉 Watermelon'), desc: 'Summer favourite' },
                { name: 'Pineapple', img: img(300, 200, 'F57F17', 'FFF', '🍍 Pineapple'), desc: 'Tropical & sweet' }
            ]
        },
        vegetables: {
            title: 'Fresh Vegetables',
            desc: 'Crisp, nutritious vegetables sourced directly from local farms every morning. Maximum freshness, guaranteed.',
            banner: img(880, 300, '388E3C', 'FFF', '🥕 Fresh Vegetables Department'),
            brands: ['Local Farm', 'Green Valley', 'Organic India'],
            products: [
                { name: 'Farm Tomatoes', img: img(300, 200, 'D32F2F', 'FFF', '🍅 Tomatoes'), desc: 'Firm & red' },
                { name: 'Fresh Onions', img: img(300, 200, '6D4C41', 'FFF', '🧅 Onions'), desc: 'Sharp & flavorful' },
                { name: 'Potatoes', img: img(300, 200, '795548', 'FFF', '🥔 Potatoes'), desc: 'All varieties' },
                { name: 'Ooty Carrots', img: img(300, 200, 'E65100', 'FFF', '🥕 Carrots'), desc: 'Sweet & crunchy' },
                { name: 'Fresh Beans', img: img(300, 200, '2E7D32', 'FFF', '🫘 Beans'), desc: 'Tender & green' },
                { name: 'Brinjal', img: img(300, 200, '4A148C', 'FFF', '🍆 Brinjal'), desc: 'Purple & firm' },
                { name: 'Cabbage', img: img(300, 200, '558B2F', 'FFF', '🥬 Cabbage'), desc: 'Crisp leaves' },
                { name: 'Cauliflower', img: img(300, 200, 'F5F5F5', '333', '🥦 Cauliflower'), desc: 'White & fresh' }
            ]
        },
        grocery: {
            title: 'Grocery & Staples',
            desc: 'Premium quality everyday cooking essentials. From aromatic spices to pure cooking oils.',
            banner: img(880, 300, 'E65100', 'FFF', '🛒 Grocery & Staples'),
            brands: ['Aashirvaad', 'Tata', 'Fortune', 'MDH'],
            products: [
                { name: 'Basmati Rice', img: img(300, 200, 'EFEBE9', '5D4037', '🌾 Rice'), desc: 'Long grain premium' },
                { name: 'Toor Dal', img: img(300, 200, 'F9A825', '5D4037', '🫘 Dal'), desc: 'Protein-rich pulses' },
                { name: 'Wheat Flour', img: img(300, 200, 'D7CCC8', '5D4037', '🌾 Wheat Flour'), desc: 'Fresh ground atta' },
                { name: 'Sugar', img: img(300, 200, 'FAFAFA', '333', '🍬 Sugar'), desc: 'Pure white sugar' },
                { name: 'Spice Mix', img: img(300, 200, 'BF360C', 'FFF', '🌶️ Spices'), desc: 'Aromatic blends' },
                { name: 'Cooking Oil', img: img(300, 200, 'FFF176', '5D4037', '🫗 Cooking Oil'), desc: 'Sunflower & groundnut' }
            ]
        },
        rice: {
            title: 'Rice & Grains',
            desc: 'A wide selection of premium rice varieties, lentils, and whole grains for every cooking style.',
            banner: img(880, 300, '5D4037', 'FFF', '🌾 Rice & Grains'),
            brands: ['India Gate', 'Tata Sampann', 'Aashirvaad'],
            products: [
                { name: 'India Gate Rice', img: img(300, 200, '4E342E', 'FFF', '🌾 India Gate Rice'), desc: 'Premium basmati' },
                { name: 'Raw Rice (Ponni)', img: img(300, 200, 'EFEBE9', '5D4037', '🍚 Raw Rice'), desc: 'Ponni & Sona Masoori' },
                { name: 'Toor Dal', img: img(300, 200, 'F9A825', '5D4037', '🫘 Toor Dal'), desc: 'Unpolished dal' },
                { name: 'Moong Dal', img: img(300, 200, '9E9D24', 'FFF', '🫛 Moong Dal'), desc: 'Yellow & green' }
            ]
        },
        dairy: {
            title: 'Dairy Products',
            desc: 'Always fresh. Stored at optimal temperature. Our dairy section is stocked daily.',
            banner: img(880, 300, '1565C0', 'FFF', '🥛 Dairy Products'),
            brands: ['Amul', 'Aavin', 'Milky Mist', 'Nestlé'],
            products: [
                { name: 'Fresh Cow Milk', img: img(300, 200, 'E3F2FD', '1565C0', '🥛 Milk'), desc: 'Full-cream & toned' },
                { name: 'Salted Butter', img: img(300, 200, 'FFF9C4', 'F57F17', '🧈 Butter'), desc: 'Rich & creamy' },
                { name: 'Cheddar Cheese', img: img(300, 200, 'FFF59D', 'E65100', '🧀 Cheese'), desc: 'Slices & blocks' },
                { name: 'Fresh Paneer', img: img(300, 200, 'FFFDE7', '5D4037', '🧈 Paneer'), desc: 'Soft & fresh daily' },
                { name: 'Curd', img: img(300, 200, 'F1F8E9', '33691E', '🥛 Curd'), desc: 'Thick & creamy' }
            ]
        },
        bakery: {
            title: 'Bakery',
            desc: 'Freshly baked breads, cakes, and pastries prepared daily.',
            banner: img(880, 300, 'BF360C', 'FFF', '🍞 Bakery'),
            brands: ['Britannia', 'Modern Bakeries', 'Local Bakery'],
            products: [
                { name: 'Sandwich Bread', img: img(300, 200, 'EFEBE9', '5D4037', '🍞 Bread'), desc: 'White & whole wheat' },
                { name: 'Cream Cakes', img: img(300, 200, 'FCE4EC', 'C62828', '🎂 Cakes'), desc: 'Birthday & celebration' },
                { name: 'Assorted Cookies', img: img(300, 200, 'FFF3E0', 'E65100', '🍪 Cookies'), desc: 'Chocolate & vanilla' },
                { name: 'Fresh Buns', img: img(300, 200, 'FFF8E1', '5D4037', '🥐 Buns'), desc: 'Soft dinner rolls' }
            ]
        },
        snacks: {
            title: 'Snacks & Beverages',
            desc: 'Your favourite chips, biscuits, soft drinks, juices and health drinks.',
            banner: img(880, 300, '7B1FA2', 'FFF', '🍪 Snacks & Beverages'),
            brands: ['Parle', 'Britannia', 'Sunfeast', 'PepsiCo', 'Coca-Cola'],
            products: [
                { name: 'Potato Chips', img: img(300, 200, 'FFF176', '5D4037', '🍟 Chips'), desc: 'Salted & flavoured' },
                { name: 'Marie Biscuits', img: img(300, 200, 'EFEBE9', '795548', '🍪 Biscuits'), desc: 'Classic tea-time' },
                { name: 'Soft Drinks', img: img(300, 200, 'B71C1C', 'FFF', '🥤 Soft Drinks'), desc: 'Cola, Sprite, Fanta' },
                { name: 'Fruit Juices', img: img(300, 200, 'FF8F00', 'FFF', '🧃 Juices'), desc: 'Real fruit juices' }
            ]
        },
        frozen: {
            title: 'Frozen Foods',
            desc: 'Premium frozen vegetables, ready-to-eat meals, and frozen treats.',
            banner: img(880, 300, '00838F', 'FFF', '❄️ Frozen Foods'),
            brands: ['McCain', 'ITC', 'Mother\'s Recipe'],
            products: [
                { name: 'Frozen Peas', img: img(300, 200, 'B2DFDB', '00695C', '🟢 Frozen Peas'), desc: 'Garden fresh frozen' },
                { name: 'Ice Cream', img: img(300, 200, 'FCE4EC', 'AD1457', '🍦 Ice Cream'), desc: 'All flavours' }
            ]
        },
        personal: {
            title: 'Personal Care',
            desc: 'From soaps and shampoos to skincare and dental hygiene.',
            banner: img(880, 300, 'AD1457', 'FFF', '🧴 Personal Care'),
            brands: ['Dove', 'Colgate', 'Himalaya', 'Pears'],
            products: [
                { name: 'Soap', img: img(300, 200, 'F3E5F5', '6A1B9A', '🧼 Soap'), desc: 'Dove, Pears & more' },
                { name: 'Shampoo', img: img(300, 200, 'E1F5FE', '0277BD', '🧴 Shampoo'), desc: 'All hair types' },
                { name: 'Toothpaste', img: img(300, 200, 'E8F5E9', '2E7D32', '🪥 Toothpaste'), desc: 'Colgate & others' }
            ]
        },
        baby: {
            title: 'Baby Care',
            desc: 'Everything your little one needs — diapers, baby food, gentle skincare.',
            banner: img(880, 300, 'E91E63', 'FFF', '👶 Baby Care'),
            brands: ['Pampers', 'Himalaya Baby', 'Johnson\'s'],
            products: [
                { name: 'Baby Diapers', img: img(300, 200, 'FCE4EC', 'C2185B', '🩱 Diapers'), desc: 'All sizes available' },
                { name: 'Baby Food', img: img(300, 200, 'FFF8E1', 'E65100', '🍼 Baby Food'), desc: 'Cerelac & more' }
            ]
        },
        household: {
            title: 'Household Essentials',
            desc: 'Storage, cleaning tools and everyday home utilities.',
            banner: img(880, 300, '455A64', 'FFF', '🏠 Household Essentials'),
            brands: ['Tupperware', 'Prestige', 'Cello'],
            products: [
                { name: 'Storage Containers', img: img(300, 200, 'ECEFF1', '37474F', '📦 Containers'), desc: 'Airtight & durable' },
                { name: 'Brooms & Mops', img: img(300, 200, 'EFEBE9', '5D4037', '🧹 Brooms'), desc: 'Full cleaning set' }
            ]
        },
        cleaning: {
            title: 'Cleaning Products',
            desc: 'Detergents, floor cleaners, dishwash liquids and more.',
            banner: img(880, 300, '1976D2', 'FFF', '🧹 Cleaning Products'),
            brands: ['Surf Excel', 'Vim', 'Lizol', 'Harpic'],
            products: [
                { name: 'Detergents', img: img(300, 200, 'E3F2FD', '0D47A1', '🧺 Detergents'), desc: 'Matic & bar' },
                { name: 'Floor Cleaners', img: img(300, 200, 'E8F5E9', '2E7D32', '🧴 Floor Cleaner'), desc: 'Lizol & Domex' },
                { name: 'Dishwash Liquid', img: img(300, 200, 'F1F8E9', '558B2F', '🍽️ Dishwash'), desc: 'Vim liquid & bar' }
            ]
        },
        kitchen: {
            title: 'Kitchen Essentials',
            desc: 'Pots, pans, cutlery, and every kitchen utensil you need.',
            banner: img(880, 300, 'E65100', 'FFF', '🍳 Kitchen Essentials'),
            brands: ['Prestige', 'Hawkins', 'Pigeon'],
            products: [
                { name: 'Pressure Cooker', img: img(300, 200, 'ECEFF1', '37474F', '♨️ Cooker'), desc: 'Prestige & Hawkins' },
                { name: 'Non-stick Pan', img: img(300, 200, '37474F', 'FFF', '🍳 Pan'), desc: 'All sizes' }
            ]
        },
        stationery: {
            title: 'Stationery',
            desc: 'Pens, notebooks, files and school supplies.',
            banner: img(880, 300, '3949AB', 'FFF', '✏️ Stationery'),
            brands: ['Reynolds', 'Camlin', 'Classmate'],
            products: [
                { name: 'Notebooks', img: img(300, 200, 'E8EAF6', '283593', '📓 Notebooks'), desc: 'Ruled & blank' },
                { name: 'Ball Pens', img: img(300, 200, 'E3F2FD', '0D47A1', '🖊️ Pens'), desc: 'All colours' }
            ]
        },
        petcare: {
            title: 'Pet Care Products',
            desc: 'Everything your pets love — food, grooming essentials, accessories.',
            banner: img(880, 300, '6D4C41', 'FFF', '🐾 Pet Care'),
            brands: ['Pedigree', 'Royal Canin', 'Whiskas'],
            products: [
                { name: 'Dog Food', img: img(300, 200, 'EFEBE9', '5D4037', '🐕 Dog Food'), desc: 'Pedigree & Royal Canin' },
                { name: 'Cat Food', img: img(300, 200, 'FFF3E0', 'E65100', '🐈 Cat Food'), desc: 'Whiskas & more' }
            ]
        }
    };

    // ═══════════════════════════════════════════════════════
    // BRAND DATA — Every brand has unique product images
    // ═══════════════════════════════════════════════════════
    const brandData = {
        amul: {
            title: 'Amul', color: 'linear-gradient(135deg,#1565C0,#1E88E5)',
            desc: 'The Taste of India. Amul is India\'s largest dairy brand, trusted by millions of families for over 75 years.',
            products: [
                { name: 'Amul Taaza Milk', img: img(300, 200, 'E3F2FD', '1565C0', '🥛 Amul Milk'), desc: 'Fresh full-cream milk, 1L & 500ml.' },
                { name: 'Amul Butter', img: img(300, 200, 'FFF9C4', 'F57F17', '🧈 Amul Butter'), desc: 'Salted & unsalted, 100g–500g.' },
                { name: 'Amul Cheese', img: img(300, 200, 'FFF59D', 'E65100', '🧀 Amul Cheese'), desc: 'Slices & blocks for sandwiches.' },
                { name: 'Amul Paneer', img: img(300, 200, 'FFFDE7', '5D4037', '🧈 Amul Paneer'), desc: 'Soft, fresh — 200g & 500g.' },
                { name: 'Amul Ice Cream', img: img(300, 200, 'FCE4EC', 'AD1457', '🍦 Amul Ice Cream'), desc: 'All flavours available.' }
            ]
        },
        tata: {
            title: 'Tata Sampann', color: 'linear-gradient(135deg,#B71C1C,#E53935)',
            desc: 'Tata Sampann brings authentic Indian flavours through premium quality pulses, spices, and staples.',
            products: [
                { name: 'Tata Toor Dal', img: img(300, 200, 'FFF3E0', 'BF360C', '🫘 Tata Dal'), desc: 'Unpolished toor dal, rich in protein.' },
                { name: 'Tata Turmeric', img: img(300, 200, 'FFF9C4', 'F57F17', '🌿 Turmeric'), desc: 'Bright yellow, aromatic.' },
                { name: 'Tata Chilli Powder', img: img(300, 200, 'FFCDD2', 'B71C1C', '🌶️ Chilli Powder'), desc: 'Vibrant colour & heat.' }
            ]
        },
        aashirvaad: {
            title: 'Aashirvaad', color: 'linear-gradient(135deg,#E65100,#FB8C00)',
            desc: 'Aashirvaad by ITC is India\'s leading flour brand, delivering freshness and nutrition.',
            products: [
                { name: 'Aashirvaad Atta', img: img(300, 200, 'FFF3E0', 'E65100', '🌾 Atta 5kg'), desc: 'Premium whole wheat flour.' },
                { name: 'Aashirvaad Spices', img: img(300, 200, 'FBE9E7', 'BF360C', '🌶️ Spices'), desc: 'Authentic masala blends.' }
            ]
        },
        britannia: {
            title: 'Britannia', color: 'linear-gradient(135deg,#2E7D32,#4CAF50)',
            desc: 'India\'s most loved food company, bringing joy with baked goods since 1892.',
            products: [
                { name: 'Good Day Biscuits', img: img(300, 200, 'FFF8E1', 'E65100', '🍪 Good Day'), desc: 'Cashew & butter cookies.' },
                { name: 'Marie Gold', img: img(300, 200, 'EFEBE9', '795548', '🍪 Marie Gold'), desc: 'Classic tea-time biscuits.' },
                { name: 'Britannia Bread', img: img(300, 200, 'FFF3E0', '5D4037', '🍞 Bread'), desc: 'White & brown bread loaves.' }
            ]
        },
        parle: {
            title: 'Parle', color: 'linear-gradient(135deg,#4A148C,#7B1FA2)',
            desc: 'India\'s most iconic biscuit brand, famous for Parle-G since 1938.',
            products: [
                { name: 'Parle-G', img: img(300, 200, 'FFF9C4', '5D4037', '🍪 Parle-G'), desc: 'World\'s #1 selling biscuit.' },
                { name: '20-20 Cookies', img: img(300, 200, 'EFEBE9', '795548', '🍪 20-20 Cookies'), desc: 'Crunchy cashew cookies.' }
            ]
        },
        sunfeast: {
            title: 'Sunfeast', color: 'linear-gradient(135deg,#F57F17,#FFB300)',
            desc: 'Sunfeast by ITC — a premium biscuits and cakes brand for every age group.',
            products: [
                { name: 'Dark Fantasy', img: img(300, 200, '3E2723', 'FFF', '🍫 Dark Fantasy'), desc: 'Choco-filled indulgence.' },
                { name: 'Mom\'s Magic', img: img(300, 200, 'FFF8E1', 'E65100', '🍪 Mom\'s Magic'), desc: 'Butter-rich biscuits.' }
            ]
        },
        aavin: {
            title: 'Aavin', color: 'linear-gradient(135deg,#006064,#00ACC1)',
            desc: 'Tamil Nadu Co-operative Milk Producers\' Federation — the most trusted dairy in TN.',
            products: [
                { name: 'Aavin Milk', img: img(300, 200, 'E0F7FA', '006064', '🥛 Aavin Milk'), desc: 'Full cream, toned, slim.' },
                { name: 'Aavin Curd', img: img(300, 200, 'F1F8E9', '33691E', '🥛 Aavin Curd'), desc: 'Thick, creamy curd.' },
                { name: 'Aavin Butter', img: img(300, 200, 'FFF9C4', 'F57F17', '🧈 Aavin Butter'), desc: 'Fresh table butter.' }
            ]
        },
        horlicks: {
            title: 'Horlicks', color: 'linear-gradient(135deg,#33691E,#8BC34A)',
            desc: 'A scientifically formulated health drink for stronger bones and immunity.',
            products: [
                { name: 'Horlicks Original', img: img(300, 200, 'F1F8E9', '33691E', '🥤 Horlicks'), desc: 'Classic malt drink, 500g.' },
                { name: 'Junior Horlicks', img: img(300, 200, 'FFF8E1', 'E65100', '🧒 Junior'), desc: 'Formulated for children.' }
            ]
        },
        surfexcel: {
            title: 'Surf Excel', color: 'linear-gradient(135deg,#0D47A1,#1976D2)',
            desc: 'India\'s number one laundry detergent for decades. Daag Ache Hain!',
            products: [
                { name: 'Surf Excel Matic', img: img(300, 200, 'E3F2FD', '0D47A1', '🧺 Matic Liquid'), desc: 'Liquid for front-load machines.' },
                { name: 'Surf Excel Bar', img: img(300, 200, 'BBDEFB', '1565C0', '🧼 Surf Bar'), desc: 'Bar for tough stains.' }
            ]
        },
        vim: {
            title: 'Vim', color: 'linear-gradient(135deg,#558B2F,#8BC34A)',
            desc: 'India\'s most trusted dishwashing brand, cutting through grease effectively.',
            products: [
                { name: 'Vim Liquid', img: img(300, 200, 'F1F8E9', '558B2F', '🍽️ Vim Liquid'), desc: 'Anti-bacterial, 500ml.' },
                { name: 'Vim Bar', img: img(300, 200, 'DCEDC8', '33691E', '🧼 Vim Bar'), desc: 'Classic lime bar.' }
            ]
        }
    };

    // ═══════════════════════════════════════════════════════
    // OFFER DATA
    // ═══════════════════════════════════════════════════════
    const offerData = {
        weekend: {
            title: 'Weekend Savings Festival', badge: 'SAT & SUN ONLY',
            bg: 'linear-gradient(135deg,#FF8F00,#FFB300)',
            desc: 'Make your weekends extra special! Enjoy massive discounts on fresh produce, dairy, and household essentials.',
            highlights: ['Up to 20% off Fresh Fruits & Vegetables', 'Buy 2 Get 1 Free on Dairy Products', 'Special discounts on Bakery Items', '10% off on all Cleaning Products'],
            validity: 'Every Saturday & Sunday'
        },
        festival: {
            title: 'Grand Festival Offers', badge: 'FESTIVE SEASON',
            bg: 'linear-gradient(135deg,#C62828,#E53935)',
            desc: 'Celebrate the festive season with big savings on sweets, grocery bundles, and gift hampers.',
            highlights: ['Exclusive Festival Gift Hampers', 'Discounts on Mithai and sweets', '15% off on bulk grocery purchases', 'Combo offers on packaged foods'],
            validity: 'During all major festive seasons'
        },
        monthly: {
            title: 'Monthly Mega Deals', badge: 'EVERY MONTH',
            bg: 'linear-gradient(135deg,#1565C0,#42A5F5)',
            desc: 'Stock up for the entire month at unbeatable prices.',
            highlights: ['Up to 30% off on bulk staples', 'Special prices on branded rice & dal', 'Discounted household bundles', 'Monthly loyalty bonus points'],
            validity: 'First week of every month'
        },
        family: {
            title: 'Family Combo Promotions', badge: 'FAMILY PACKS',
            bg: 'linear-gradient(135deg,#2E7D32,#66BB6A)',
            desc: 'Save big on family-sized packs and enjoy significant grocery savings.',
            highlights: ['Family pack combos across categories', 'Cereal + Milk combo at special price', 'Household bundle deals', 'Extra 5% off with loyalty card'],
            validity: 'All month long'
        },
        summer: {
            title: 'Summer Savings', badge: 'SUMMER SPECIAL',
            bg: 'linear-gradient(135deg,#00838F,#26C6DA)',
            desc: 'Beat the Chennai heat with cool deals on beverages, juices, and frozen foods.',
            highlights: ['Up to 25% off on all beverages', 'Special prices on Ice Cream & Frozen', 'Combo deals on Juice packs', 'Free drink with ₹500+ purchase'],
            validity: 'April – June'
        },
        school: {
            title: 'Back To School Offers', badge: 'SCHOOL SEASON',
            bg: 'linear-gradient(135deg,#4A148C,#9C27B0)',
            desc: 'Get your kids school-ready with special prices on stationery and snacks.',
            highlights: ['Flat 20% off on stationery', 'Special prices on health drinks', 'Snack combo packs for tiffins', 'Discounted school accessories'],
            validity: 'June & July'
        }
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
            `<div class="product-item"><img src="${p.img}" alt="${p.name}" loading="lazy"><div class="product-item-info"><h4>${p.name}</h4><p>${p.desc}</p></div></div>`
        ).join('');
        document.getElementById('deptModal').classList.add('open');
        body.classList.add('locked');
    };

    const openBrandModal = (key) => {
        const b = brandData[key]; if (!b) return;
        document.getElementById('brandHeaderBlock').innerHTML = `<div class="brand-logo-xl" style="background:${b.color}">${b.title.slice(0,2)}</div><h2>${b.title}</h2>`;
        document.getElementById('brandDesc').textContent = b.desc;
        document.getElementById('brandProducts').innerHTML = b.products.map(p =>
            `<div class="product-item"><img src="${p.img}" alt="${p.name}" loading="lazy"><div class="product-item-info"><h4>${p.name}</h4><p>${p.desc}</p></div></div>`
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

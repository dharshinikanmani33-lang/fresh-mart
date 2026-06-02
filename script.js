/* ============================================================
   FreshMart – script.js
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

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
        document.querySelectorAll('.modal-overlay.open').forEach(m => { m.classList.remove('open'); });
        body.classList.remove('locked');
    };
    document.querySelectorAll('.modal-overlay, .lightbox').forEach(m => {
        m.addEventListener('click', e => { if (e.target === m) closeAllModals(); });
    });
    document.querySelectorAll('.modal-close-btn').forEach(btn => btn.addEventListener('click', closeAllModals));
    document.querySelector('.lb-close').addEventListener('click', closeAllModals);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAllModals(); });

    // ─── DEPARTMENT DATA ───
    const deptData = {
        fruits: {
            title: 'Fresh Fruits',
            desc: 'We source the finest farm-fresh seasonal and exotic fruits every morning. Quality-checked and handpicked for your family\'s health.',
            banner: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=880&q=85',
            brands: ['Fresh Farm', 'Naturelle', 'Local Harvest'],
            products: [
                { name: 'Kashmir Apples', img: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&q=80', desc: 'Crisp & sweet' },
                { name: 'Robusta Bananas', img: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&q=80', desc: 'Ripe & nutritious' },
                { name: 'Alphonso Mangoes', img: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=400&q=80', desc: 'Premium quality' },
                { name: 'Nagpur Oranges', img: 'https://images.unsplash.com/photo-1559181567-c3190bab7b1d?w=400&q=80', desc: 'Vitamin C rich' },
                { name: 'Black Grapes', img: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400&q=80', desc: 'Juicy & fresh' },
                { name: 'Pomegranates', img: 'https://images.unsplash.com/photo-1621507882756-03c2c4f0ca47?w=400&q=80', desc: 'Antioxidant rich' },
                { name: 'Watermelon', img: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80', desc: 'Summer favourite' },
                { name: 'Fresh Pineapple', img: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&q=80', desc: 'Tropical & sweet' }
            ]
        },
        vegetables: {
            title: 'Fresh Vegetables',
            desc: 'Crisp, nutritious vegetables sourced directly from local farms every morning. Maximum freshness, guaranteed.',
            banner: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=880&q=85',
            brands: ['Local Farm', 'Green Valley', 'Organic India'],
            products: [
                { name: 'Farm Tomatoes', img: 'https://images.unsplash.com/photo-1546470427-227c20e6a94f?w=400&q=80', desc: 'Firm & red' },
                { name: 'Fresh Onions', img: 'https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?w=400&q=80', desc: 'Sharp & flavorful' },
                { name: 'Potatoes', img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&q=80', desc: 'All varieties' },
                { name: 'Ooty Carrots', img: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80', desc: 'Sweet & crunchy' },
                { name: 'Fresh Beans', img: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400&q=80', desc: 'Tender & green' },
                { name: 'Cabbage', img: 'https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?w=400&q=80', desc: 'Crisp leaves' },
                { name: 'Cauliflower', img: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=400&q=80', desc: 'White & fresh' },
                { name: 'Brinjal', img: 'https://images.unsplash.com/photo-1659993399613-37e18e0c9064?w=400&q=80', desc: 'Purple & firm' }
            ]
        },
        grocery: {
            title: 'Grocery & Staples',
            desc: 'Premium quality everyday cooking essentials. From aromatic spices to pure cooking oils — all your pantry needs in one place.',
            banner: 'https://images.unsplash.com/photo-1603431777007-61e42abeae28?w=880&q=85',
            brands: ['Aashirvaad', 'Tata', 'Fortune', 'MDH'],
            products: [
                { name: 'Basmati Rice', img: 'https://images.unsplash.com/photo-1536304993881-ff86e0c9ef1a?w=400&q=80', desc: 'Long grain premium' },
                { name: 'Toor Dal', img: 'https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?w=400&q=80', desc: 'Protein-rich pulses' },
                { name: 'Wheat Flour', img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80', desc: 'Fresh ground atta' },
                { name: 'Refined Sugar', img: 'https://images.unsplash.com/photo-1542990253-a781e04c8a2e?w=400&q=80', desc: 'Pure white sugar' },
                { name: 'Spice Mix', img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80', desc: 'Aromatic blends' },
                { name: 'Cooking Oil', img: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80', desc: 'Sunflower & groundnut' }
            ]
        },
        rice: {
            title: 'Rice & Grains',
            desc: 'A wide selection of premium rice varieties, lentils, and whole grains for every cooking style.',
            banner: 'https://images.unsplash.com/photo-1536304993881-ff86e0c9ef1a?w=880&q=85',
            brands: ['India Gate', 'Tata Sampann', 'Aashirvaad'],
            products: [
                { name: 'India Gate Rice', img: 'https://images.unsplash.com/photo-1536304993881-ff86e0c9ef1a?w=400&q=80', desc: 'Premium basmati' },
                { name: 'Raw Rice', img: 'https://images.unsplash.com/photo-1613728913341-8f536e60b8e1?w=400&q=80', desc: 'Ponni & sona masoori' },
                { name: 'Toor Dal', img: 'https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?w=400&q=80', desc: 'Unpolished dal' },
                { name: 'Moong Dal', img: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&q=80', desc: 'Yellow & green' }
            ]
        },
        dairy: {
            title: 'Dairy Products',
            desc: 'Always fresh. Stored at optimal temperature. Our dairy section is stocked daily for maximum freshness.',
            banner: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=880&q=85',
            brands: ['Amul', 'Aavin', 'Milky Mist', 'Nestlé'],
            products: [
                { name: 'Fresh Cow Milk', img: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&q=80', desc: 'Full-cream & toned' },
                { name: 'Salted Butter', img: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&q=80', desc: 'Rich & creamy' },
                { name: 'Cheddar Cheese', img: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&q=80', desc: 'Slices & blocks' },
                { name: 'Fresh Paneer', img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80', desc: 'Soft & fresh daily' },
                { name: 'Curd', img: 'https://images.unsplash.com/photo-1571167530149-c1105da4e354?w=400&q=80', desc: 'Thick & creamy' }
            ]
        },
        bakery: {
            title: 'Bakery',
            desc: 'Freshly baked breads, cakes, and pastries prepared daily. The warm aroma of the FreshMart bakery awaits you!',
            banner: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=880&q=85',
            brands: ['Britannia', 'Modern Bakeries', 'Local Bakery'],
            products: [
                { name: 'Sandwich Bread', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80', desc: 'White & whole wheat' },
                { name: 'Cream Cakes', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80', desc: 'Birthday & celebration' },
                { name: 'Assorted Cookies', img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&q=80', desc: 'Chocolate & vanilla' },
                { name: 'Fresh Buns', img: 'https://images.unsplash.com/photo-1550317138-10000687a72b?w=400&q=80', desc: 'Soft dinner rolls' }
            ]
        },
        snacks: {
            title: 'Snacks & Beverages',
            desc: 'Your favourite chips, biscuits, soft drinks, juices and health drinks — all under one roof.',
            banner: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=880&q=85',
            brands: ['Parle', 'Britannia', 'Sunfeast', 'PepsiCo', 'Coca-Cola'],
            products: [
                { name: 'Potato Chips', img: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=80', desc: 'Salted & flavoured' },
                { name: 'Marie Biscuits', img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80', desc: 'Classic tea-time' },
                { name: 'Soft Drinks', img: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400&q=80', desc: 'All brands in stock' },
                { name: 'Fruit Juices', img: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80', desc: 'Real fruit juices' }
            ]
        },
        frozen: {
            title: 'Frozen Foods',
            desc: 'Premium frozen vegetables, ready-to-eat meals, and frozen treats, always maintained at the right temperature.',
            banner: 'https://images.unsplash.com/photo-1574615552565-8aaef19e78b0?w=880&q=85',
            brands: ['McCain', 'Mother\'s Recipe', 'ITC'],
            products: [
                { name: 'Frozen Peas', img: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&q=80', desc: 'Garden fresh frozen' },
                { name: 'Ice Cream', img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80', desc: 'All flavours' }
            ]
        },
        personal: {
            title: 'Personal Care',
            desc: 'From soaps and shampoos to skincare and dental hygiene — all the trusted brands for your family.',
            banner: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=880&q=85',
            brands: ['Dove', 'Colgate', 'Himalaya', 'Pears', 'Head & Shoulders'],
            products: [
                { name: 'Dove Soap', img: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400&q=80', desc: 'Gentle moisturising' },
                { name: 'Shampoo', img: 'https://images.unsplash.com/photo-1626015365107-23b4c1d400d3?w=400&q=80', desc: 'All hair types' },
                { name: 'Toothpaste', img: 'https://images.unsplash.com/photo-1559393825-4e8e98fe3c80?w=400&q=80', desc: 'Colgate & others' }
            ]
        },
        baby: {
            title: 'Baby Care',
            desc: 'Everything your little one needs — diapers, baby food, gentle skincare products and more.',
            banner: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=880&q=85',
            brands: ['Pampers', 'Himalaya Baby', 'Johnsons'],
            products: [
                { name: 'Baby Diapers', img: 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=400&q=80', desc: 'All sizes available' },
                { name: 'Baby Food', img: 'https://images.unsplash.com/photo-1535572290543-960a8046f5af?w=400&q=80', desc: 'Cerelac & more' }
            ]
        },
        household: {
            title: 'Household Essentials',
            desc: 'Stock your home with everything it needs — from storage to cleaning tools and everyday utilities.',
            banner: 'https://images.unsplash.com/photo-1585664811087-47f65abbad64?w=880&q=85',
            brands: ['Tupperware', 'Prestige', 'Cello'],
            products: [
                { name: 'Storage Containers', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', desc: 'Airtight & durable' },
                { name: 'Brooms & Mops', img: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&q=80', desc: 'Full cleaning set' }
            ]
        },
        cleaning: {
            title: 'Cleaning Products',
            desc: 'Everything to keep your home spotless — detergents, floor cleaners, dishwash liquids and more.',
            banner: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=880&q=85',
            brands: ['Surf Excel', 'Vim', 'Lizol', 'Harpic', 'Domex'],
            products: [
                { name: 'Surf Excel', img: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&q=80', desc: 'Matic & bar' },
                { name: 'Vim Dishwash', img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80', desc: 'Liquid & bar' },
                { name: 'Floor Cleaner', img: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&q=80', desc: 'Lizol & Domex' }
            ]
        },
        kitchen: {
            title: 'Kitchen Essentials',
            desc: 'Pots, pans, cutlery, and every kitchen utensil you need for your cooking.',
            banner: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=880&q=85',
            brands: ['Prestige', 'Hawkins', 'Pigeon'],
            products: [
                { name: 'Pressure Cooker', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80', desc: 'Prestige & Hawkins' },
                { name: 'Non-stick Pan', img: 'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=400&q=80', desc: 'All sizes' }
            ]
        },
        stationery: {
            title: 'Stationery',
            desc: 'Pens, notebooks, files and school supplies for students and professionals.',
            banner: 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=880&q=85',
            brands: ['Reynolds', 'Camlin', 'Classmate'],
            products: [
                { name: 'Notebooks', img: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&q=80', desc: 'Ruled & blank' },
                { name: 'Ball Pens', img: 'https://images.unsplash.com/photo-1587200602602-5daae5d01a06?w=400&q=80', desc: 'All colours' }
            ]
        },
        petcare: {
            title: 'Pet Care Products',
            desc: 'Everything your pets love — food, grooming essentials, toys and accessories.',
            banner: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=880&q=85',
            brands: ['Pedigree', 'Royal Canin', 'Whiskas'],
            products: [
                { name: 'Dog Food', img: 'https://images.unsplash.com/photo-1623950810811-d7d84b0da8cf?w=400&q=80', desc: 'Pedigree & Royal Canin' },
                { name: 'Cat Food', img: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=400&q=80', desc: 'Whiskas & more' }
            ]
        }
    };

    // ─── BRAND DATA ───
    const brandData = {
        amul: {
            title: 'Amul', color: 'linear-gradient(135deg,#1565C0,#1E88E5)',
            desc: 'The Taste of India. Amul is India\'s largest dairy brand, trusted by millions of families across the country for over 75 years.',
            products: [
                { name: 'Amul Taaza Milk', img: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&q=80', desc: 'Fresh full-cream milk, 1L & 500ml packs.' },
                { name: 'Amul Butter', img: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300&q=80', desc: 'Salted & unsalted butter, 100g–500g.' },
                { name: 'Amul Cheese Slices', img: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&q=80', desc: 'Ready-to-use cheese slices for sandwiches.' },
                { name: 'Amul Fresh Paneer', img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&q=80', desc: 'Soft, fresh paneer — 200g & 500g.' },
                { name: 'Amul Ice Cream', img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&q=80', desc: 'Vanilla, chocolate and fruity flavours.' }
            ]
        },
        tata: {
            title: 'Tata Sampann', color: 'linear-gradient(135deg,#B71C1C,#E53935)',
            desc: 'Tata Sampann brings authentic Indian flavours through premium quality pulses, spices, and staples.',
            products: [
                { name: 'Toor Dal', img: 'https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?w=300&q=80', desc: 'Unpolished toor dal, rich in protein.' },
                { name: 'Turmeric Powder', img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&q=80', desc: 'Bright yellow, aromatic turmeric.' },
                { name: 'Chilli Powder', img: 'https://images.unsplash.com/photo-1585688800851-e081ffd0a0a5?w=300&q=80', desc: 'Vibrant colour, authentic flavour.' }
            ]
        },
        aashirvaad: {
            title: 'Aashirvaad', color: 'linear-gradient(135deg,#E65100,#FB8C00)',
            desc: 'Aashirvaad by ITC is India\'s leading flour brand, delivering freshness and nutrition through their superior grain selection.',
            products: [
                { name: 'Aashirvaad Atta', img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&q=80', desc: 'Premium whole wheat flour, 5kg & 10kg.' },
                { name: 'Aashirvaad Spices', img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&q=80', desc: 'Authentic masala blends.' }
            ]
        },
        britannia: {
            title: 'Britannia', color: 'linear-gradient(135deg,#2E7D32,#4CAF50)',
            desc: 'Britannia Industries is India\'s most loved food company, bringing joy to families with baked goods since 1892.',
            products: [
                { name: 'Good Day Biscuits', img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&q=80', desc: 'Cashew & butter cookies.' },
                { name: 'Marie Gold', img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&q=80', desc: 'Classic tea-time biscuits.' },
                { name: 'Bread', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&q=80', desc: 'White & brown bread loaves.' }
            ]
        },
        parle: {
            title: 'Parle', color: 'linear-gradient(135deg,#4A148C,#7B1FA2)',
            desc: 'Parle Products is India\'s most iconic biscuit and confectionery brand, famous for Parle-G since 1938.',
            products: [
                { name: 'Parle-G', img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&q=80', desc: 'World\'s #1 selling biscuit.' },
                { name: '20-20 Cookies', img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&q=80', desc: 'Crunchy cashew cookies.' }
            ]
        },
        sunfeast: {
            title: 'Sunfeast', color: 'linear-gradient(135deg,#F57F17,#FFB300)',
            desc: 'Sunfeast by ITC is a premium biscuits and cakes brand with a delightful range of snacks for every age group.',
            products: [
                { name: 'Dark Fantasy', img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&q=80', desc: 'Choco-filled indulgence.' },
                { name: 'Mom\'s Magic', img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&q=80', desc: 'Butter-rich biscuits.' }
            ]
        },
        aavin: {
            title: 'Aavin', color: 'linear-gradient(135deg,#006064,#00ACC1)',
            desc: 'Aavin (Tamil Nadu Co-operative Milk Producers\' Federation) is the most trusted dairy brand in Tamil Nadu.',
            products: [
                { name: 'Aavin Milk', img: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&q=80', desc: 'Full cream, toned, slim milk.' },
                { name: 'Aavin Curd', img: 'https://images.unsplash.com/photo-1571167530149-c1105da4e354?w=300&q=80', desc: 'Thick, creamy curd.' },
                { name: 'Aavin Butter', img: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300&q=80', desc: 'Fresh table butter.' }
            ]
        },
        horlicks: {
            title: 'Horlicks', color: 'linear-gradient(135deg,#33691E,#8BC34A)',
            desc: 'Horlicks is a scientifically formulated health drink that helps build stronger bones and boosts immunity in growing children.',
            products: [
                { name: 'Horlicks Original', img: 'https://images.unsplash.com/photo-1571167530149-c1105da4e354?w=300&q=80', desc: 'Classic malt health drink, 500g.' },
                { name: 'Junior Horlicks', img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&q=80', desc: 'Specially formulated for children.' }
            ]
        },
        surfexcel: {
            title: 'Surf Excel', color: 'linear-gradient(135deg,#0D47A1,#1976D2)',
            desc: 'Surf Excel has been India\'s number one laundry detergent for decades. Daag Ache Hain!',
            products: [
                { name: 'Surf Excel Matic', img: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=300&q=80', desc: 'Liquid detergent for front-load.' },
                { name: 'Surf Excel Bar', img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=300&q=80', desc: 'Washing bar for tough stains.' }
            ]
        },
        vim: {
            title: 'Vim', color: 'linear-gradient(135deg,#558B2F,#8BC34A)',
            desc: 'Vim is India\'s most trusted dishwashing brand, cutting through grease effectively while being gentle on hands.',
            products: [
                { name: 'Vim Dishwash Liquid', img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=300&q=80', desc: 'Anti-bacterial formula, 500ml.' },
                { name: 'Vim Dishwash Bar', img: 'https://images.unsplash.com/photo-1585664811087-47f65abbad64?w=300&q=80', desc: 'Classic lime bar for utensils.' }
            ]
        }
    };

    // ─── OFFER DATA ───
    const offerData = {
        weekend: {
            title: 'Weekend Savings Festival', badge: 'SAT & SUN ONLY',
            bg: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=620&q=85',
            desc: 'Make your weekends extra special! Enjoy massive discounts on fresh produce, dairy, and household essentials every Saturday and Sunday.',
            highlights: ['Up to 20% off Fresh Fruits & Vegetables', 'Buy 2 Get 1 Free on Dairy Products', 'Special discounts on Bakery Items', '10% off on all Cleaning Products'],
            validity: 'Every Saturday & Sunday'
        },
        festival: {
            title: 'Grand Festival Offers', badge: 'FESTIVE SEASON',
            bg: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=620&q=85',
            desc: 'Celebrate the festive season with big savings on sweets, grocery bundles, and special gift hampers curated for your family.',
            highlights: ['Exclusive Festival Gift Hampers available', 'Special discounts on Mithai and sweets', '15% off on bulk grocery purchases', 'Combo offers on packaged foods'],
            validity: 'During all major festive seasons'
        },
        monthly: {
            title: 'Monthly Mega Deals', badge: 'EVERY MONTH',
            bg: 'https://images.unsplash.com/photo-1506617420156-8e4536971650?w=620&q=85',
            desc: 'Stock up for the entire month at unbeatable prices. The bigger you buy, the more you save with our Monthly Mega Deals.',
            highlights: ['Up to 30% off on bulk staples', 'Special prices on branded rice & dal', 'Discounted household essential bundles', 'Monthly loyalty bonus points'],
            validity: 'First week of every month'
        },
        family: {
            title: 'Family Combo Promotions', badge: 'FAMILY PACKS',
            bg: 'https://images.unsplash.com/photo-1565945887714-d5139f4eb0ce?w=620&q=85',
            desc: 'Save big on family-sized packs. Buy your favourite products in bulk and enjoy significant savings on your monthly grocery bills.',
            highlights: ['Family pack combos across all categories', 'Cereal + Milk combo packs at special price', 'Household bundle deals for big savings', 'Extra 5% off with FreshMart loyalty card'],
            validity: 'All month long'
        },
        summer: {
            title: 'Summer Savings', badge: 'SUMMER SPECIAL',
            bg: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=620&q=85',
            desc: 'Beat the Chennai heat with cool deals on beverages, juices, ice cream, and frozen foods. Stay refreshed for less!',
            highlights: ['Up to 25% off on all beverages', 'Special prices on Ice Cream & Frozen foods', 'Combo deals on Juice & Snack packs', 'Free drink with every ₹500+ purchase'],
            validity: 'April – June'
        },
        school: {
            title: 'Back To School Offers', badge: 'SCHOOL SEASON',
            bg: 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=620&q=85',
            desc: 'Get your kids school-ready with special prices on stationery, tiffin snacks, health drinks, and all the essentials.',
            highlights: ['Flat 20% off on all stationery items', 'Special prices on Horlicks & health drinks', 'Snack combo packs for school tiffins', 'Discounted school bag accessories'],
            validity: 'June & July'
        }
    };

    // ─── OPEN MODAL HELPERS ───
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
        document.getElementById('offerModalBanner').style.backgroundImage = `url('${o.bg}')`;
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
    const track  = document.getElementById('reviewsTrack');
    const cards  = [...track.querySelectorAll('.review-card')];
    const dotsC  = document.getElementById('reviewDots');
    let rIdx = 0;
    cards.forEach((_, i) => { const d = document.createElement('span'); d.className = 'rdot' + (i === 0 ? ' active' : ''); d.addEventListener('click', () => goReview(i)); dotsC.appendChild(d); });
    const getDots = () => [...dotsC.querySelectorAll('.rdot')];

    const goReview = (n) => {
        rIdx = (n + cards.length) % cards.length;
        const w = cards[0].offsetWidth + 24;
        track.style.transform = `translateX(-${rIdx * w}px)`;
        getDots().forEach((d,i) => d.classList.toggle('active', i === rIdx));
    };
    document.getElementById('reviewPrev').addEventListener('click', () => goReview(rIdx - 1));
    document.getElementById('reviewNext').addEventListener('click', () => goReview(rIdx + 1));
    setInterval(() => goReview(rIdx + 1), 5500);
    window.addEventListener('resize', () => goReview(rIdx));
});

document.addEventListener("DOMContentLoaded", function() {
    // الحصول على اسم الصفحة الحالية من الرابط
    const currentLocation = window.location.pathname.split("/").pop() || "index.html";
    
    // استهداف كل روابط الناف بار
    const navLinks = document.querySelectorAll(".nav-links a");
    
    navLinks.forEach(link => {
        // إزالة الكلاس active من الكل أولاً لضمان عدم وجود تداخل
        link.classList.remove("active");
        
        // الحصول على اسم الملف من رابط العنصر
        const linkHref = link.getAttribute("href");
        
        // إذا كان الرابط يطابق الصفحة الحالية، أضف كلاس active
        if (linkHref === currentLocation) {
            link.classList.add("active");
        }
    });
});




// --- آيات يومية متجددة ---
const dailyVersesDatabase = [
    {
        verse: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
        source: "[سورة الرعد: 28]",
        tafsir: "أي: بذكر الله تسكن القلوب وتطمئن، وتزول عنها الوحشة والقلق، وتصل إلى اليقين الحقيقي والأمن الدائم."
    },
    {
        verse: "وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ",
        source: "[سورة البقرة: 186]",
        tafsir: "إخبار بقربه تعالى من عباده المجيب لدعواتهم، وفيه حث عظيم على كثرة الدعاء بيقين الإجابة."
    },
    {
        verse: "فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ",
        source: "[سورة البقرة: 152]",
        tafsir: "وعد إلهي كريم بأن ذكر العبد لربه يقابله ذكر الله للعبد بالثناء والرحمة."
    }
];

function loadNewDailyVerse() {
    const randomIndex = Math.floor(Math.random() * dailyVersesDatabase.length);
    const selected = dailyVersesDatabase[randomIndex];
    
    document.getElementById('main-daily-verse').textContent = `"${selected.verse}"`;
    document.getElementById('main-verse-source').textContent = selected.source;
    document.getElementById('main-verse-tafsir').textContent = selected.tafsir;
}

// --- نظام الوضع الليلي (Dark Mode) ---
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const bodyElement = document.body;

    // استرجاع الوضع المفضل للمستخدم
    if(localStorage.getItem('sakina_theme') === 'dark') {
        bodyElement.classList.add('dark-mode');
        if(themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    if(themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            bodyElement.classList.toggle('dark-mode');
            if(bodyElement.classList.contains('dark-mode')) {
                localStorage.setItem('sakina_theme', 'dark');
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
            } else {
                localStorage.setItem('sakina_theme', 'light');
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
            }
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {
    // تبديل الوضع الليلي والنهاري
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';

    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if(themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            let theme = 'light';
            if (document.body.classList.contains('dark-theme')) {
                theme = 'dark';
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
            } else {
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
            }
            localStorage.setItem('theme', theme);
        });
    }
});
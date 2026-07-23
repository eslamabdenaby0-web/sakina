document.addEventListener("DOMContentLoaded", function() {
    
    // 1. تحديد الصفحة النشطة في الناف بار
    const currentLocation = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav-links a");
    
    navLinks.forEach(link => {
        link.classList.remove("active");
        const linkHref = link.getAttribute("href");
        if (linkHref === currentLocation) {
            link.classList.add("active");
        }
    });


    // 2. نظام الوضع الليلي (Dark Mode) الموحد والمُصحح
    const themeToggleBtn = document.getElementById('theme-toggle');
    const bodyElement = document.body;
    const savedTheme = localStorage.getItem('sakina_theme') || 'light';

    // تطبيق الثيم المحفوظ مسبقاً
    if (savedTheme === 'dark') {
        bodyElement.classList.add('dark-mode');
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            bodyElement.classList.toggle('dark-mode');
            const isDarkMode = bodyElement.classList.contains('dark-mode');
            
            if (isDarkMode) {
                localStorage.setItem('sakina_theme', 'dark');
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
            } else {
                localStorage.setItem('sakina_theme', 'light');
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
            }
        });
    }


    // 3. قائمة الموبايل (Mobile Menu) والتحكم في إغلاقها وفتحها
    const menuToggle = document.getElementById("menu-toggle");
    const navLinksContainer = document.querySelector(".nav-links");

    if (menuToggle && navLinksContainer) {
        const icon = menuToggle.querySelector("i");

        // فتح وإغلاق القائمة عند النقر على الزر
        menuToggle.addEventListener("click", function(e) {
            e.stopPropagation();
            navLinksContainer.classList.toggle("show");
            
            if (navLinksContainer.classList.contains("show")) {
                if (icon) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                }
            } else {
                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        });

        // إغلاق القائمة تلقائياً عند النقر على أي رابط داخلها
        navLinksContainer.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinksContainer.classList.remove("show");
                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            });
        });

        // إغلاق القائمة عند النقر في أي مكان خارجها
        document.addEventListener("click", function(event) {
            if (!navLinksContainer.contains(event.target) && !menuToggle.contains(event.target)) {
                navLinksContainer.classList.remove("show");
                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        });
    }

    // تشغيل الآيات اليومية إن وجدت في الصفحة
    loadNewDailyVerse();
});


// --- آيات يومية متجددة ---
const dailyVersesDatabase = [
    {
        verse: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
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
    const mainVerseElem = document.getElementById('main-daily-verse');
    if (!mainVerseElem) return; // حماية الكود إذا لم يكن العنصر موجوداً في الصفحة الحالية
    
    const randomIndex = Math.floor(Math.random() * dailyVersesDatabase.length);
    const selected = dailyVersesDatabase[randomIndex];
    
    mainVerseElem.textContent = `"${selected.verse}"`;
    const sourceElem = document.getElementById('main-verse-source');
    const tafsirElem = document.getElementById('main-verse-tafsir');
    
    if (sourceElem) sourceElem.textContent = selected.source;
    if (tafsirElem) tafsirElem.textContent = selected.tafsir;
}
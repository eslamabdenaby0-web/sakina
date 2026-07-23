const SURAH_API_URL = "https://api.alquran.cloud/v1/surah";

// جلب قائمة كل السور (114 سورة) وتعبئتها في الشبكة
async function fetchAllSurahs() {
    const grid = document.getElementById('surahs-grid');
    if(!grid) return;

    try {
        grid.innerHTML = '<div style="text-align:center; grid-column: 1/-1; padding: 20px; font-weight:bold; color:var(--emerald-green);">جاري تحميل المصحف الشريف...</div>';
        
        const response = await fetch(SURAH_API_URL);
        const data = await response.json();
        
        if(data.code === 200) {
            window.allSurahsCache = data.data; // حفظ البيانات للبحث
            displaySurahsList(data.data);
        }
    } catch (error) {
        grid.innerHTML = '<div style="text-align:center; grid-column: 1/-1; color:red;">حدث خطأ أثناء تحميل سور القرآن، تأكد من اتصالك بالإنترنت.</div>';
    }
}

function displaySurahsList(surahs) {
    const grid = document.getElementById('surahs-grid');
    grid.innerHTML = '';

    surahs.forEach(surah => {
        const card = document.createElement('div');
        card.className = 'surah-card';
        card.innerHTML = `
            <div class="surah-info">
                <h3>${surah.number}. سورة ${surah.name}</h3>
                <span class="surah-type">${surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'} - عدد الآيات: ${surah.numberOfAyahs}</span>
            </div>
            <div class="surah-number">${surah.number}</div>
        `;
        card.addEventListener('click', () => loadSurahContent(surah.number, surah.name));
        grid.appendChild(card);
    });
}

// جلب وتفاصيل وعرض كل آيات السورة المحددة
async function loadSurahContent(surahNumber, surahName) {
    document.getElementById('surah-index-section').style.display = 'none';
    document.getElementById('surah-reader-section').style.display = 'block';
    document.getElementById('active-surah-title').textContent = `سورة ${surahName}`;

    const ayahsContainer = document.getElementById('ayahs-container');
    ayahsContainer.innerHTML = '<div style="text-align:center; padding: 40px; font-family:\'Cairo\'; font-size:1.1rem;">جاري تحميل الآيات...</div>';

    try {
        // جلب نص الآيات مع التفسير أو الرسم العثماني
        const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`);
        const data = await response.json();

        if(data.code === 200) {
            const ayahs = data.data.ayahs;
            let ayahsHTML = '';
            
            ayahs.forEach((ayah, index) => {
                // إزالة البسملة المتكررة في أول السور عدا التوبة والفاتحة لتجنب التكرار
                let text = ayah.text;
                if(surahNumber !== 1 && surahNumber !== 9 && index === 0) {
                    text = text.replace('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', '').trim();
                }
                ayahsHTML += `${text} <span class="ayah-number-badge" style="color:var(--islamic-gold); font-size:1.2rem; font-weight:bold;">(${ayah.numberInSurah})</span> `;
            });

            ayahsContainer.innerHTML = ayahsHTML;

            // تفعيل صوت التلاوة (بصوت القارئ مشاري العفاسي كمثال افتراضي)
            const audioElement = document.getElementById('quran-audio');
            // رابط صوت السورة الكامل
            audioElement.src = `https://server8.mp3quran.net/afs/${String(surahNumber).padStart(3, '0')}.mp3`;
        }
    } catch (error) {
        ayahsContainer.innerHTML = '<div style="text-align:center; color:red; font-family:\'Cairo\';">فشل تحميل الآيات.</div>';
    }
}

function backToSurahList() {
    document.getElementById('surah-reader-section').style.display = 'none';
    document.getElementById('surah-index-section').style.display = 'block';
    const audioElement = document.getElementById('quran-audio');
    if(audioElement) audioElement.pause();
}

function filterSurahs() {
    const query = document.getElementById('surah-search').value.toLowerCase();
    if(!window.allSurahsCache) return;
    const filtered = window.allSurahsCache.filter(s => s.name.toLowerCase().includes(query) || s.englishName.toLowerCase().includes(query));
    displaySurahsList(filtered);
}

document.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById('surahs-grid')) {
        fetchAllSurahs();
    }
});
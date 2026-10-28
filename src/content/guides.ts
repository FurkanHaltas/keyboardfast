/**
 * Long-form pages: the about page and typing guides, in all six interface languages
 * (English and Turkish here, the others in guides-*.ts). Slugs are shared across languages.
 * A body item is a paragraph, or `{ list }` for a bullet list.
 */
import { de } from "./guides-de";
import { es } from "./guides-es";
import { fr } from "./guides-fr";
import { pt } from "./guides-pt";

export type Block = string | { list: string[] };

export interface Article {
  slug: string;
  title: string;
  /** meta description and the teaser on the guides index */
  description: string;
  minutes: number;
  sections: { heading: string; body: Block[] }[];
}

export interface ArticleSet {
  about: Article;
  guides: Article[];
}

type ContentLang = "en" | "tr";

const about: Record<ContentLang, Article> = {
  en: {
    slug: "about",
    title: "About keyboardfast",
    description:
      "keyboardfast is a free typing test in six languages with a code mode, honest statistics and a practice mode that targets your weak keys.",
    minutes: 2,
    sections: [
      {
        heading: "What keyboardfast is",
        body: [
          "keyboardfast is a typing speed test built for people who want to actually get better, not just see a number. You can test yourself in English, Turkish, German, Spanish, French and Portuguese, or type real code in eight programming languages.",
          "Every result comes with more than speed: accuracy, consistency, a second-by-second chart, the keys that slowed you down and how you type letters compared with symbols.",
        ],
      },
      {
        heading: "What makes it different",
        body: [
          {
            list: [
              "Practice that adapts to you – after a few tests keyboardfast knows which letters and letter pairs cost you the most and builds practice text around them.",
              "A keyboard heatmap in your own layout (Turkish Q, QWERTZ, AZERTY and more), so you can see your weak spots at a glance.",
              "A fair leaderboard – every ranked result is replayed and verified on our server, so scripts and copy-paste don't make it onto the board.",
              "Code mode for developers, with automatic indentation so you practise the characters that matter.",
              "Privacy first – no tracking, no account needed to take tests, and you can download or delete your data at any time.",
            ],
          },
        ],
      },
      {
        heading: "Who makes it",
        body: [
          "keyboardfast is an independent project built and run by Furkan Haltas, a software developer from Turkey. It started as a way to build a fast, carefully designed web app end to end – from the typing engine to the server it runs on – and to make a typing test that respects its users.",
          "Ideas, bug reports and feedback are always welcome through the contact link at the bottom of every page.",
        ],
      },
    ],
  },
  tr: {
    slug: "about",
    title: "keyboardfast hakkında",
    description:
      "keyboardfast; altı dilde, kod modu, dürüst istatistikleri ve zayıf tuşlarını hedefleyen alıştırma moduyla ücretsiz bir klavye hız testidir.",
    minutes: 2,
    sections: [
      {
        heading: "keyboardfast nedir?",
        body: [
          "keyboardfast, sadece bir sayı görmek değil gerçekten gelişmek isteyenler için yapılmış bir klavye hız testi. Türkçe, İngilizce, Almanca, İspanyolca, Fransızca ve Portekizce test yapabilir ya da sekiz programlama dilinde gerçek kod yazabilirsin.",
          "Her sonuç sadece hızdan ibaret değil: doğruluk, tutarlılık, saniye saniye hız grafiği, seni yavaşlatan tuşlar ve harflerle sembolleri yazışının karşılaştırması da gösterilir.",
        ],
      },
      {
        heading: "Farkı ne?",
        body: [
          {
            list: [
              "Sana göre şekillenen alıştırma – birkaç testten sonra keyboardfast hangi harflerin ve harf ikililerinin sana en çok kaybettirdiğini bilir ve alıştırma metnini onların etrafında kurar.",
              "Kendi klavye düzeninde ısı haritası (Türkçe Q, QWERTZ, AZERTY ve diğerleri); zayıf noktalarını tek bakışta görürsün.",
              "Adil liderlik tablosu – sıralamaya giren her sonuç sunucumuzda yeniden oynatılıp doğrulanır; betikler ve kopyala-yapıştır tabloya giremez.",
              "Yazılımcılar için kod modu; girinti otomatik geçilir, sen önemli karakterlere odaklanırsın.",
              "Önce gizlilik – takip yok, test yapmak için hesap gerekmez, verilerini istediğin an indirip silebilirsin.",
            ],
          },
        ],
      },
      {
        heading: "Kim yapıyor?",
        body: [
          "keyboardfast, Türkiye'den yazılım geliştirici Furkan Haltas'ın geliştirip yönettiği bağımsız bir proje. Yazma motorundan üzerinde çalıştığı sunucuya kadar hızlı ve özenle tasarlanmış bir web uygulamasını baştan sona kurmak ve kullanıcısına saygı duyan bir klavye testi yapmak amacıyla başladı.",
          "Fikirlerini, hata bildirimlerini ve geri bildirimlerini her sayfanın altındaki iletişim bağlantısından iletebilirsin.",
        ],
      },
    ],
  },
};

const guides: Record<ContentLang, Article[]> = {
  en: [
    {
      slug: "what-is-wpm",
      title: "What WPM means and how typing speed is measured",
      description:
        "Words per minute, raw vs. net speed, accuracy and consistency explained – and what counts as a good typing speed.",
      minutes: 5,
      sections: [
        {
          heading: "A \"word\" is five characters",
          body: [
            "Typing tests don't count real words, because \"a\" and \"extraordinary\" would then be worth the same. Instead, every five characters – including spaces and punctuation – count as one word. Typing 250 characters in one minute is therefore 50 words per minute (WPM), no matter which words they were.",
            "This standard makes results comparable between languages and texts, although languages with long words and many special letters, such as German or Turkish, usually feel a little slower.",
          ],
        },
        {
          heading: "Net speed vs. raw speed",
          body: [
            "keyboardfast shows two speeds. Raw speed counts every key you pressed, right or wrong. Net speed – the big WPM number – only counts characters of words you typed correctly. If you type fast but leave mistakes behind, the gap between the two grows.",
            "Net speed is the one that matters in real life: a fast but error-filled paragraph still has to be fixed. A small gap between raw and net speed is a sign of clean typing.",
          ],
        },
        {
          heading: "Accuracy and consistency",
          body: [
            "Accuracy is the share of keystrokes that were correct. Corrected mistakes still count against it, because you spent time making and fixing them. Above 95% is a solid goal; top typists usually stay above 97%.",
            "Consistency shows how even your speed was during the test. A steady rhythm scores high, bursts and pauses score low. Consistent typists tend to improve faster, because their speed doesn't depend on the text happening to be easy.",
          ],
        },
        {
          heading: "What is a good typing speed?",
          body: [
            "Rough ranges for net speed on everyday text:",
            {
              list: [
                "Under 30 WPM – hunt-and-peck or just starting out.",
                "30–45 WPM – about average for adults who type regularly.",
                "45–65 WPM – comfortable and productive; enough for most office work.",
                "65–90 WPM – fast; typical for experienced touch typists.",
                "Over 100 WPM – exceptional, reached by a small share of people with focused practice.",
              ],
            },
            "Shorter tests produce higher numbers, because you can hold a sprint for 15 seconds but not for two minutes. Compare yourself with your own results in the same mode – that's what the progress page does.",
          ],
        },
        {
          heading: "Getting a reliable number",
          body: [
            "Take several tests and look at your average rather than your best run. Use the 60-second test for a realistic figure, keep punctuation and numbers off when comparing with others, and test in the language you actually type in every day.",
          ],
        },
      ],
    },
    {
      slug: "how-to-type-faster",
      title: "How to type faster: a practical plan",
      description:
        "A realistic, step-by-step way to raise your typing speed: accuracy first, short daily practice, targeting weak keys and breaking through plateaus.",
      minutes: 6,
      sections: [
        {
          heading: "Slow down to speed up",
          body: [
            "The most common mistake is practising at a speed where you make lots of errors. Every mistake you correct costs more time than typing the character carefully would have, and repeated mistakes train your fingers to make them again.",
            "Aim for 96–98% accuracy first. If you drop below that, ease off until the errors disappear, then let speed rise on its own. It feels slow for a week or two, and then it starts to pay off.",
          ],
        },
        {
          heading: "Look at the screen, not the keyboard",
          body: [
            "Looking down breaks your reading flow and caps your speed at roughly 40 WPM. If you still look at the keys, learning touch typing is the single biggest improvement you can make – see our guide to home row and finger placement.",
          ],
        },
        {
          heading: "Practise little and often",
          body: [
            "Fifteen focused minutes a day beats two hours on a Sunday. Typing is a motor skill, and motor skills consolidate between sessions, especially during sleep. A good routine:",
            {
              list: [
                "2–3 warm-up tests at a relaxed pace.",
                "5–10 minutes of practice mode on your weak keys.",
                "2–3 tests at your normal pace to measure progress.",
              ],
            },
          ],
        },
        {
          heading: "Fix your weak keys first",
          body: [
            "Most people lose most of their time on a handful of letters and letter pairs. keyboardfast tracks how often you miss each key and how long it takes you, and shows them on a heatmap on your results and progress pages.",
            "Practice mode builds text from real words that contain those keys, so you get many more repetitions of exactly what slows you down – without typing meaningless letter strings.",
          ],
        },
        {
          heading: "Read ahead and keep a rhythm",
          body: [
            "Fast typists read a word or two ahead of where they are typing, so their fingers never wait for the next word. Try to keep your eyes slightly ahead of the caret and type at an even pace instead of rushing easy words and stalling on hard ones. The consistency score shows how well it's working.",
          ],
        },
        {
          heading: "Getting past a plateau",
          body: [
            "Everyone gets stuck at some point. When your average stops moving for a couple of weeks, change something: switch to a longer test, turn on punctuation, practise in another language or in code mode, or do a few deliberately slow, perfectly accurate tests. Variety forces your fingers to stop relying on habits that only work for one kind of text.",
          ],
        },
        {
          heading: "Mind your body",
          body: [
            "Sit with relaxed shoulders, forearms roughly level with the keyboard and wrists floating rather than resting hard on the desk. Tension makes you slower and, over time, can hurt. Take a short break whenever your hands feel tired.",
          ],
        },
      ],
    },
    {
      slug: "touch-typing",
      title: "Touch typing: home row and finger placement",
      description:
        "Learn touch typing step by step: where your fingers rest, which finger presses which key, and how to switch without losing productivity.",
      minutes: 6,
      sections: [
        {
          heading: "What touch typing is",
          body: [
            "Touch typing means typing without looking at the keyboard, with each finger responsible for its own group of keys. Your fingers learn where the keys are, so your eyes can stay on the text. Almost every fast typist types this way.",
          ],
        },
        {
          heading: "The home row",
          body: [
            "Your fingers rest on the middle row of letters and return there after every keystroke. On a QWERTY keyboard the left hand rests on A S D F and the right hand on J K L and the key after it. The F and J keys have small bumps so you can find the position without looking.",
            "On a Turkish Q keyboard the home row is the same – A S D F and J K L Ş – which puts Ş and İ under your right little finger. On German QWERTZ it is A S D F / J K L Ö, and on French AZERTY it is Q S D F / J K L M.",
          ],
        },
        {
          heading: "Which finger presses which key",
          body: [
            "Each finger covers a diagonal column of keys above and below its home key:",
            {
              list: [
                "Index fingers do the most work: each covers two columns – F, G, R, T, V, B on the left and J, H, U, Y, N, M on the right.",
                "Middle fingers cover the D and K columns (E, C and I, comma).",
                "Ring fingers cover the S and L columns (W, X and O, period).",
                "Little fingers cover A and everything to the right of the right-hand home keys, plus Shift, Enter and Backspace.",
                "Thumbs press the space bar – usually the thumb of the hand that didn't type the last letter.",
              ],
            },
            "On Turkish Q, the letters Ğ, Ü, Ş, İ, Ö and Ç are all at the edges of the keyboard, so your little fingers and ring fingers get more work than in English. If those keys show up red on your heatmap, that's the reason.",
          ],
        },
        {
          heading: "How to learn it",
          body: [
            {
              list: [
                "Start slowly and accurately; 15–20 WPM without looking is a good first goal.",
                "Don't look down. If you must, look at the screen to see what you typed instead.",
                "Practise every day for 15–20 minutes rather than in long sessions.",
                "Use practice mode once you have a few tests – it will push you onto the keys you avoid.",
              ],
            },
          ],
        },
        {
          heading: "Expect a temporary slowdown",
          body: [
            "If you already type with a few fingers, switching will make you slower for a while – often for two to four weeks. Most people overtake their old speed after one to two months and keep improving long after, while hunt-and-peck typing usually stops improving around 40 WPM. If you need to stay productive, use touch typing in practice sessions first and switch fully once you're back to your old speed.",
          ],
        },
      ],
    },
    {
      slug: "typing-for-programmers",
      title: "Typing speed for programmers",
      description:
        "Why typing still matters for developers, which characters slow coders down, and how to practise brackets, symbols and indentation with code mode.",
      minutes: 5,
      sections: [
        {
          heading: "Does typing speed matter for coding?",
          body: [
            "Programmers spend more time thinking than typing, so raw speed isn't everything. But typing that needs no attention leaves your attention for the problem. If you have to think about where the curly brace is, that's focus taken away from the code – and in chats, reviews, commit messages and documentation, developers type a lot of plain text too.",
          ],
        },
        {
          heading: "Code is a different kind of text",
          body: [
            "Code is full of characters that ordinary typing practice never trains: brackets, braces, quotes, semicolons, operators, underscores and camelCase. Many of them need Shift or, on Turkish and other European layouts, the AltGr key, which makes them much slower than letters.",
            "keyboardfast's results page compares your speed on symbols with your speed on letters. If symbols take you twice as long, that's where the easiest gains are.",
          ],
        },
        {
          heading: "How code mode works",
          body: [
            "Code mode gives you real, idiomatic snippets in eight languages, including JavaScript, TypeScript, Python, Go and Rust. Indentation is typed for you – like a modern editor would – and you press Enter at the end of each line. That way you practise the characters you actually type when coding, not the spaces an editor would insert anyway.",
          ],
        },
        {
          heading: "Tips for faster code typing",
          body: [
            {
              list: [
                "Learn where every symbol is without looking – especially { } [ ] ( ) < > on your layout.",
                "Use the correct Shift key: the one on the opposite hand from the key you're pressing.",
                "Many developers on Turkish keyboards switch to a US layout for coding because brackets don't need AltGr there. Try it if symbols are your bottleneck.",
                "Practise the patterns of your main language: arrow functions, list comprehensions, error handling.",
                "Learn your editor's shortcuts for completion, multi-cursor and moving lines – they save more time than any extra WPM.",
              ],
            },
          ],
        },
      ],
    },
  ],
  tr: [
    {
      slug: "what-is-wpm",
      title: "WPM nedir, yazma hızı nasıl ölçülür?",
      description:
        "Dakikadaki kelime sayısı, ham ve net hız, doğruluk ve tutarlılık – ve iyi bir yazma hızının ne olduğu.",
      minutes: 5,
      sections: [
        {
          heading: "Bir \"kelime\" beş karakterdir",
          body: [
            "Klavye testleri gerçek kelimeleri saymaz; yoksa \"ve\" ile \"karşılaştırmalı\" aynı değerde olurdu. Bunun yerine boşluk ve noktalama dahil her beş karakter bir kelime sayılır. Bir dakikada 250 karakter yazmak, hangi kelimeler olursa olsun, dakikada 50 kelime (WPM) demektir.",
            "Bu standart sayesinde farklı dil ve metinlerdeki sonuçlar karşılaştırılabilir. Yine de Türkçe veya Almanca gibi uzun kelimeli ve özel harfli dillerde yazmak genelde biraz daha yavaş hissettirir.",
          ],
        },
        {
          heading: "Net hız ve ham hız",
          body: [
            "keyboardfast iki hız gösterir. Ham hız, doğru ya da yanlış bastığın her tuşu sayar. Net hız – büyük WPM sayısı – yalnızca doğru yazdığın kelimelerin karakterlerini sayar. Hızlı yazıp hataları geride bırakırsan ikisi arasındaki fark büyür.",
            "Gerçek hayatta önemli olan net hızdır: hızlı ama hatalı bir paragrafın yine düzeltilmesi gerekir. Ham ve net hız arasındaki farkın küçük olması temiz yazdığının işaretidir.",
          ],
        },
        {
          heading: "Doğruluk ve tutarlılık",
          body: [
            "Doğruluk, tuş vuruşlarının ne kadarının doğru olduğunu gösterir. Düzelttiğin hatalar da buna dahildir; çünkü hem hatayı yapmaya hem düzeltmeye zaman harcadın. %95'in üstü sağlam bir hedeftir; en iyiler genelde %97'nin üzerinde kalır.",
            "Tutarlılık, test boyunca hızının ne kadar dengeli olduğunu gösterir. Düzenli bir ritim yüksek puan alır; ani hızlanma ve duraklamalar puanı düşürür. Tutarlı yazanlar daha hızlı gelişir; çünkü hızları metnin kolay gelmesine bağlı değildir.",
          ],
        },
        {
          heading: "İyi bir yazma hızı nedir?",
          body: [
            "Günlük metinlerde net hız için yaklaşık aralıklar:",
            {
              list: [
                "30 WPM altı – tek tek tuş arayarak yazma ya da yeni başlangıç.",
                "30–45 WPM – düzenli bilgisayar kullanan yetişkinlerin ortalaması civarı.",
                "45–65 WPM – rahat ve verimli; çoğu ofis işi için yeterli.",
                "65–90 WPM – hızlı; deneyimli on parmak yazanlar için tipik.",
                "100 WPM üstü – istisnai; odaklı çalışmayla az sayıda kişinin ulaştığı seviye.",
              ],
            },
            "Kısa testler daha yüksek sonuç verir; 15 saniyelik bir atağı sürdürebilirsin ama iki dakikayı sürdüremezsin. Kendini aynı moddaki kendi sonuçlarınla karşılaştır – gelişim sayfası tam olarak bunu yapar.",
          ],
        },
        {
          heading: "Güvenilir bir sonuç almak",
          body: [
            "Tek bir rekora değil, birkaç testin ortalamasına bak. Gerçekçi bir değer için 60 saniyelik testi kullan, başkalarıyla karşılaştırırken noktalama ve sayıları kapalı tut ve her gün gerçekten yazdığın dilde test yap.",
          ],
        },
      ],
    },
    {
      slug: "how-to-type-faster",
      title: "Daha hızlı yazmak için uygulanabilir bir plan",
      description:
        "Yazma hızını artırmanın gerçekçi, adım adım yolu: önce doğruluk, kısa günlük çalışma, zayıf tuşları hedeflemek ve durağan dönemleri aşmak.",
      minutes: 6,
      sections: [
        {
          heading: "Hızlanmak için yavaşla",
          body: [
            "En sık yapılan hata, çok hata yaptığın bir hızda çalışmaktır. Düzelttiğin her hata, o karakteri dikkatle yazmaktan daha fazla zaman alır; tekrarlanan hatalar da parmaklarını onları yeniden yapmaya alıştırır.",
            "Önce %96–98 doğruluğu hedefle. Bunun altına düşersen hatalar kaybolana kadar yavaşla, hızın kendiliğinden artmasına izin ver. Bir iki hafta yavaş hissettirir, sonra karşılığını vermeye başlar.",
          ],
        },
        {
          heading: "Klavyeye değil ekrana bak",
          body: [
            "Aşağı bakmak okuma akışını böler ve hızını yaklaşık 40 WPM civarında sınırlar. Hâlâ tuşlara bakıyorsan, on parmak yazmayı öğrenmek yapabileceğin en büyük iyileştirmedir – temel sıra ve parmak yerleşimi rehberimize göz at.",
          ],
        },
        {
          heading: "Az ama sık çalış",
          body: [
            "Günde odaklı on beş dakika, pazar günü iki saatten iyidir. Yazmak motor bir beceridir ve motor beceriler çalışmalar arasında, özellikle uykuda pekişir. İyi bir rutin:",
            {
              list: [
                "Rahat tempoda 2–3 ısınma testi.",
                "Zayıf tuşların üzerine 5–10 dakika alıştırma modu.",
                "Gelişimini ölçmek için normal temponda 2–3 test.",
              ],
            },
          ],
        },
        {
          heading: "Önce zayıf tuşlarını düzelt",
          body: [
            "Çoğu insan zamanının büyük kısmını birkaç harf ve harf ikilisinde kaybeder. keyboardfast her tuşu ne sıklıkla kaçırdığını ve ne kadar sürede bastığını takip eder ve bunları sonuç ile gelişim sayfalarında bir ısı haritasında gösterir.",
            "Alıştırma modu, bu tuşları içeren gerçek kelimelerden metin oluşturur; böylece anlamsız harf dizileri yazmadan, seni tam olarak yavaşlatan şeyi çok daha fazla tekrar edersin.",
          ],
        },
        {
          heading: "İleriyi oku, ritmini koru",
          body: [
            "Hızlı yazanlar, yazdıkları yerin bir iki kelime ilerisini okur; böylece parmakları bir sonraki kelimeyi hiç beklemez. Gözünü imlecin biraz önünde tutmaya ve kolay kelimelerde acele edip zorlarda takılmak yerine eşit bir tempoda yazmaya çalış. Tutarlılık puanı bunun ne kadar işe yaradığını gösterir.",
          ],
        },
        {
          heading: "Durağan dönemi aşmak",
          body: [
            "Herkes bir noktada takılır. Ortalaman birkaç hafta yerinden oynamıyorsa bir şeyi değiştir: daha uzun teste geç, noktalamayı aç, başka bir dilde ya da kod modunda çalış veya bilerek yavaş ama kusursuz birkaç test yap. Çeşitlilik, parmaklarını tek tür metinde işe yarayan alışkanlıklara yaslanmaktan kurtarır.",
          ],
        },
        {
          heading: "Vücuduna dikkat et",
          body: [
            "Omuzların gevşek, ön kolların klavyeyle yaklaşık aynı hizada ve bileklerin masaya bastırmak yerine hafifçe havada olsun. Gerginlik seni yavaşlatır ve zamanla ağrıya yol açabilir. Ellerin yorulduğunda kısa bir mola ver.",
          ],
        },
      ],
    },
    {
      slug: "touch-typing",
      title: "On parmak klavye: temel sıra ve parmak yerleşimi",
      description:
        "On parmak yazmayı adım adım öğren: parmaklar nerede durur, hangi parmak hangi tuşa basar ve verimini kaybetmeden nasıl geçiş yaparsın.",
      minutes: 6,
      sections: [
        {
          heading: "On parmak yazma nedir?",
          body: [
            "On parmak yazma, klavyeye bakmadan, her parmağın kendi tuş grubundan sorumlu olduğu yazma şeklidir. Parmakların tuşların yerini öğrenir, gözlerin metinde kalır. Hızlı yazanların neredeyse tamamı böyle yazar.",
          ],
        },
        {
          heading: "Temel sıra",
          body: [
            "Parmakların harflerin orta sırasında durur ve her vuruştan sonra oraya döner. Türkçe Q klavyede sol el A S D F, sağ el J K L Ş üzerinde durur; sağ serçe parmağın Ş ve İ tuşlarından sorumludur. F ve J tuşlarındaki küçük çıkıntılar, bakmadan yerini bulmanı sağlar.",
            "İngilizce QWERTY'de temel sıra A S D F / J K L ve sonrasındaki tuştur; Almanca QWERTZ'de A S D F / J K L Ö, Fransızca AZERTY'de ise Q S D F / J K L M'dir.",
          ],
        },
        {
          heading: "Hangi parmak hangi tuşa basar?",
          body: [
            "Her parmak, temel tuşunun üstünde ve altında kalan çapraz bir sütundan sorumludur:",
            {
              list: [
                "İşaret parmakları en çok işi yapar: her biri iki sütuna bakar – solda F, G, R, T, V, B; sağda J, H, U, Y, N, M.",
                "Orta parmaklar D ve K sütunlarına bakar (E, C ve I, Ö).",
                "Yüzük parmakları S ve L sütunlarına bakar (W, X ve O, Ç).",
                "Serçe parmaklar A'ya ve sağ eldeki temel tuşların sağında kalan her şeye (P, Ğ, Ü, Ş, İ, nokta) ve ayrıca Shift, Enter ve Backspace'e bakar.",
                "Başparmaklar boşluk tuşuna basar – genelde son harfi yazmayan elin başparmağı.",
              ],
            },
            "Türkçe Q'da Ğ, Ü, Ş, İ, Ö ve Ç harflerinin hepsi klavyenin kenarlarında olduğu için serçe ve yüzük parmakları İngilizceye göre daha çok çalışır. Isı haritanda bu tuşlar kırmızı çıkıyorsa sebebi budur.",
          ],
        },
        {
          heading: "Nasıl öğrenilir?",
          body: [
            {
              list: [
                "Yavaş ve doğru başla; bakmadan 15–20 WPM iyi bir ilk hedeftir.",
                "Aşağı bakma. Mecbur kalırsan ne yazdığını görmek için ekrana bak.",
                "Uzun oturumlar yerine her gün 15–20 dakika çalış.",
                "Birkaç testin olunca alıştırma modunu kullan – kaçındığın tuşlara seni yönlendirir.",
              ],
            },
          ],
        },
        {
          heading: "Geçici yavaşlamaya hazır ol",
          body: [
            "Şu an birkaç parmakla yazıyorsan, geçiş bir süre seni yavaşlatır – çoğu zaman iki ila dört hafta. Çoğu insan bir iki ay içinde eski hızını geçer ve sonrasında da gelişmeye devam eder; tek tek tuş arayarak yazmak ise genelde 40 WPM civarında tıkanır. İşinde verimli kalman gerekiyorsa önce alıştırmalarda on parmak yaz, eski hızına ulaşınca tamamen geç.",
          ],
        },
      ],
    },
    {
      slug: "typing-for-programmers",
      title: "Yazılımcılar için yazma hızı",
      description:
        "Yazma hızı yazılımcılar için neden hâlâ önemli, kod yazarken hangi karakterler yavaşlatır ve parantez, sembol ve girintiyi kod moduyla nasıl çalışırsın.",
      minutes: 5,
      sections: [
        {
          heading: "Kod yazarken hız önemli mi?",
          body: [
            "Yazılımcılar yazmaktan çok düşünür; yani ham hız her şey değildir. Ama dikkat gerektirmeyen bir yazma becerisi, dikkatini probleme ayırmanı sağlar. Süslü parantezin nerede olduğunu düşünmek zorundaysan, o odak koddan çalınıyor demektir – üstelik sohbetlerde, kod incelemelerinde, commit mesajlarında ve dokümantasyonda yazılımcılar bolca düz metin de yazar.",
          ],
        },
        {
          heading: "Kod farklı bir metin türüdür",
          body: [
            "Kod, sıradan yazma çalışmalarının hiç çalıştırmadığı karakterlerle doludur: parantezler, süslü parantezler, tırnaklar, noktalı virgüller, operatörler, alt çizgiler ve camelCase. Bunların çoğu Shift ya da – Türkçe ve diğer Avrupa düzenlerinde – AltGr gerektirir; bu da onları harflerden çok daha yavaş yapar.",
            "keyboardfast'ın sonuç ekranı, sembollerdeki hızını harflerdeki hızınla karşılaştırır. Semboller sana iki kat uzun sürüyorsa en kolay kazanç oradadır.",
          ],
        },
        {
          heading: "Kod modu nasıl çalışır?",
          body: [
            "Kod modu; JavaScript, TypeScript, Python, Go ve Rust dahil sekiz dilde gerçek, dile özgü kod parçaları sunar. Girinti – modern bir editördeki gibi – senin yerine yazılır, her satırın sonunda Enter'a basarsın. Böylece editörün zaten ekleyeceği boşlukları değil, kod yazarken gerçekten bastığın karakterleri çalışırsın.",
          ],
        },
        {
          heading: "Daha hızlı kod yazmak için ipuçları",
          body: [
            {
              list: [
                "Her sembolün yerini bakmadan öğren – özellikle kendi düzenindeki { } [ ] ( ) < > tuşlarını.",
                "Doğru Shift'i kullan: bastığın tuşun karşı elindeki Shift'i.",
                "Türkçe klavye kullanan birçok yazılımcı, parantezler AltGr gerektirmediği için kod yazarken ABD düzenine geçer. Darboğazın semboller ise denemeye değer.",
                "Ana dilinin kalıplarını çalış: ok fonksiyonları, liste üreteçleri, hata yönetimi.",
                "Editörünün tamamlama, çoklu imleç ve satır taşıma kısayollarını öğren – fazladan her WPM'den daha çok zaman kazandırır.",
              ],
            },
          ],
        },
      ],
    },
  ],
};

const sets: Record<string, ArticleSet> = {
  en: { about: about.en, guides: guides.en },
  tr: { about: about.tr, guides: guides.tr },
  de,
  es,
  fr,
  pt,
};
const set = (locale: string) => sets[locale] ?? sets.en;

export const getAbout = (locale: string) => set(locale).about;
export const getGuides = (locale: string) => set(locale).guides;
export const getGuide = (locale: string, slug: string) => set(locale).guides.find((g) => g.slug === slug);
export const GUIDE_SLUGS = guides.en.map((g) => g.slug);

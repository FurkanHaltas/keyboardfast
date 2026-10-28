/**
 * Legal texts. English and Turkish are the authoritative versions; German, Spanish, French
 * and Portuguese are translations of the English text (legal-*.ts) shown with a notice.
 * Placeholders: {owner}, {email}, {site}.
 */
import { de } from "./legal-de";
import { es } from "./legal-es";
import { fr } from "./legal-fr";
import { pt } from "./legal-pt";

export type LegalKind = "privacy" | "cookies" | "terms";

export interface LegalDoc {
  title: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
}

export type Docs = Record<LegalKind, LegalDoc>;

const en: Docs = {
  privacy: {
    title: "Privacy Policy",
    intro:
      "This policy explains what personal data keyboardfast ({site}) processes, why, and what rights you have. It is written to meet the Turkish Personal Data Protection Law No. 6698 (KVKK) and the EU General Data Protection Regulation (GDPR).",
    sections: [
      {
        heading: "Who is responsible",
        body: [
          "The data controller is {owner}, the operator of keyboardfast. You can reach us about anything in this policy at {email}.",
        ],
      },
      {
        heading: "Using the site without an account",
        body: [
          "You can take typing tests without signing in. Your settings (theme, test options) and the results of your tests are stored only in your own browser's local storage. They are not sent to us and you can delete them at any time by clearing your browser's site data.",
        ],
      },
      {
        heading: "Data we process when you create an account",
        body: [
          "Email address – to sign you in with a one-time link and to identify your account.",
          "If you choose \"Continue with Google\", Google shares your email address, name, profile picture and account ID with us. We use only the email address and account ID to sign you in; we never receive your Google password.",
          "Username – the public name you choose; it is shown on the leaderboard together with your best scores.",
          "Test results – speed (WPM), accuracy, consistency, character counts, test mode and language, the date and time of each test, and a compact per-key summary (hits, misses, average time) used to show your weak keys.",
          "Test verification – when you finish a test while signed in, the keys you pressed in that test and their timing are sent to our server once, so it can recalculate the score and check that it wasn't produced by a script. Only the resulting score is stored; the keystroke log is discarded immediately. It covers the test text only, nothing else you type.",
          "We do not collect passwords (sign-in is passwordless), payment data or precise location.",
        ],
      },
      {
        heading: "Technical data",
        body: [
          "Like every website, our server receives your IP address and browser information with each request. We use this only to deliver the site and to protect it against abuse. Server logs are rotated automatically and are not kept longer than necessary for that purpose.",
        ],
      },
      {
        heading: "Why we process your data and on what legal basis",
        body: [
          "To provide the account features you asked for – saving results, showing your progress and ranking you on the leaderboard (KVKK art. 5(2)(c); GDPR art. 6(1)(b), performance of a contract).",
          "To keep the service secure and prevent cheating and abuse (KVKK art. 5(2)(f); GDPR art. 6(1)(f), legitimate interests).",
          "We do not sell your data, use it for advertising profiles or make automated decisions with legal effects about you.",
        ],
      },
      {
        heading: "Service providers",
        body: [
          "Supabase Inc. hosts our database and sign-in system. Your account data is stored in its European Union (Frankfurt, Germany) region.",
          "Our virtual server provider hosts the website itself.",
          "Sign-in emails are delivered by Resend Inc. from noreply@keyboardfast.com.",
          "If you sign in with Google, Google LLC (Google Ireland Ltd. for users in Europe) confirms your identity under its own privacy policy.",
          "These providers process data only on our instructions. Because some of them are established outside Turkey, using an account may involve transferring personal data abroad; this happens only to the extent needed to provide the service and under appropriate safeguards required by KVKK art. 9 and GDPR chapter V.",
        ],
      },
      {
        heading: "How long we keep data",
        body: [
          "Account data and results are kept until you delete your account. You can delete your account at any time from the account menu; this permanently removes your email address, username and all results from our database.",
        ],
      },
      {
        heading: "Your rights",
        body: [
          "Under KVKK art. 11 and GDPR you may ask whether your data is processed, obtain a copy of it, have it corrected or deleted, object to processing, and request information about transfers. You can download all your data as a JSON file and delete your account directly from the account menu.",
          "For any other request, email {email}. We answer within 30 days. You also have the right to complain to the Turkish Personal Data Protection Authority (KVKK) or to the data protection authority of your country.",
        ],
      },
      {
        heading: "Children",
        body: [
          "keyboardfast is open to everyone, but accounts are intended for people aged 16 or over. If you are younger, please ask a parent or guardian before creating an account.",
        ],
      },
      {
        heading: "Changes to this policy",
        body: [
          "We will update this page if the way we process data changes. The date at the top shows the latest version. Significant changes will be announced on the site.",
        ],
      },
    ],
  },
  cookies: {
    title: "Cookie Policy",
    intro:
      "keyboardfast uses only the storage it needs to work. We do not use advertising, analytics or other tracking cookies, so no consent for tracking is requested.",
    sections: [
      {
        heading: "What we store in your browser",
        body: [
          "locale (cookie, 1 year) – remembers the interface language you chose.",
          "kf:settings (local storage) – your theme and test options.",
          "kf:history (local storage) – results of tests you took while signed out; signed-in users have a local copy of their own results to keep the site fast.",
          "kf:pending (local storage) – results waiting to be uploaded to your account when you were offline.",
          "kf:ticket (local storage) – a pre-fetched test ticket that lets your next test be verified for the leaderboard (signed-in users only).",
          "kf:consent (local storage) – remembers that you have seen the cookie notice.",
          "sb-…-auth-token (local storage) – keeps you signed in. It is set only when you sign in and removed when you sign out.",
        ],
      },
      {
        heading: "Why no consent is needed",
        body: [
          "All of the items above are strictly necessary for features you use, or store choices you made yourself. Under the ePrivacy rules and KVKK they do not require prior consent. None of them is shared with third parties for marketing.",
        ],
      },
      {
        heading: "How to remove them",
        body: [
          "You can delete everything at any time by signing out and clearing the site data for {site} in your browser settings. The site will keep working, but your local results and preferences will be reset.",
        ],
      },
      {
        heading: "Future changes",
        body: [
          "If we ever add optional cookies (for example for analytics or advertising), we will ask for your consent before setting them and update this policy.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms of Use",
    intro: "These terms apply when you use keyboardfast ({site}). By using the site you agree to them.",
    sections: [
      {
        heading: "The service",
        body: [
          "keyboardfast is a free typing speed test. We may add, change or remove features at any time. The service is provided without charge and without a guarantee of availability.",
        ],
      },
      {
        heading: "Your account",
        body: [
          "You need a valid email address that you control to create an account. Keep access to that email secure, because sign-in links are sent there. One account per person.",
          "Your username must not impersonate others, contain offensive or hateful language, or advertise anything. We may change or remove usernames that break this rule.",
        ],
      },
      {
        heading: "Fair play",
        body: [
          "Results must come from your own typing. Using bots, scripts, macros, modified clients or any other way to submit results you did not type is not allowed. We may remove such results, hide them from the leaderboard or close accounts involved.",
          "Do not try to disrupt the service, access other users' data or bypass security measures.",
        ],
      },
      {
        heading: "Content and intellectual property",
        body: [
          "The site's design, code and texts belong to {owner} unless stated otherwise. Word lists and code snippets are provided for typing practice only.",
        ],
      },
      {
        heading: "Disclaimer and liability",
        body: [
          "keyboardfast is provided \"as is\". We do our best to keep results accurate and data safe, but we cannot guarantee that the service will always be available, error-free or that data will never be lost. To the extent permitted by law, we are not liable for indirect damages arising from use of the service.",
        ],
      },
      {
        heading: "Ending use",
        body: [
          "You can stop using the service and delete your account at any time from the account menu. We may suspend accounts that seriously or repeatedly break these terms.",
        ],
      },
      {
        heading: "Governing law and changes",
        body: [
          "These terms are governed by the laws of the Republic of Turkey. Mandatory consumer protection rules of your country of residence remain unaffected. We may update these terms; the date at the top shows the current version. Questions: {email}.",
        ],
      },
    ],
  },
};

const tr: Docs = {
  privacy: {
    title: "Gizlilik Politikası ve Aydınlatma Metni",
    intro:
      "Bu metin, keyboardfast'in ({site}) hangi kişisel verileri hangi amaçla işlediğini ve haklarınızı açıklar. 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamındaki aydınlatma yükümlülüğü ve AB Genel Veri Koruma Tüzüğü (GDPR) dikkate alınarak hazırlanmıştır.",
    sections: [
      {
        heading: "Veri sorumlusu",
        body: ["Veri sorumlusu: {owner} (keyboardfast'in işleteni). Bu metinle ilgili her konuda {email} adresinden bize ulaşabilirsiniz."],
      },
      {
        heading: "Hesap açmadan kullanım",
        body: [
          "Giriş yapmadan da yazma testi yapabilirsiniz. Ayarlarınız (tema, test seçenekleri) ve test sonuçlarınız yalnızca kendi tarayıcınızın yerel depolama alanında tutulur, bize gönderilmez. Tarayıcınızdan site verilerini temizleyerek bunları istediğiniz zaman silebilirsiniz.",
        ],
      },
      {
        heading: "Hesap açtığınızda işlenen veriler",
        body: [
          "E-posta adresi – tek kullanımlık bağlantıyla giriş yapmanız ve hesabınızın tanınması için.",
          "\"Google ile devam et\" seçeneğini kullanırsanız Google; e-posta adresinizi, adınızı, profil fotoğrafınızı ve hesap kimliğinizi bizimle paylaşır. Bunlardan yalnızca e-posta adresini ve hesap kimliğini giriş için kullanırız; Google şifrenizi hiçbir zaman almayız.",
          "Kullanıcı adı – seçtiğiniz herkese açık ad; liderlik tablosunda en iyi skorlarınızla birlikte gösterilir.",
          "Test sonuçları – hız (WPM), doğruluk, tutarlılık, karakter sayıları, test modu ve dili, her testin tarih ve saati ile zayıf tuşlarınızı göstermek için kullanılan tuş bazlı kısa bir özet (doğru, hatalı, ortalama süre).",
          "Test doğrulaması – oturum açıkken bir testi bitirdiğinizde, o testte bastığınız tuşlar ve zamanlamaları skoru yeniden hesaplamak ve bir betik tarafından üretilmediğini kontrol etmek için bir kez sunucumuza gönderilir. Yalnızca ortaya çıkan skor saklanır; tuş kaydı hemen silinir. Bu kayıt yalnızca test metnini kapsar, başka yazdıklarınızı değil.",
          "Şifre (giriş şifresizdir), ödeme bilgisi ya da hassas konum bilgisi toplamıyoruz.",
        ],
      },
      {
        heading: "Teknik veriler",
        body: [
          "Her web sitesinde olduğu gibi sunucumuz her istekte IP adresinizi ve tarayıcı bilgilerinizi alır. Bunları yalnızca siteyi sunmak ve kötüye kullanıma karşı korumak için kullanırız. Sunucu kayıtları otomatik olarak döndürülür ve bu amaç için gerekenden uzun saklanmaz.",
        ],
      },
      {
        heading: "İşleme amaçları ve hukuki sebepler",
        body: [
          "Talep ettiğiniz hesap özelliklerini sunmak – sonuçları kaydetmek, gelişiminizi göstermek ve liderlik tablosunda sıralamak (KVKK m. 5/2-c sözleşmenin ifası; GDPR m. 6/1-b).",
          "Hizmetin güvenliğini sağlamak, hile ve kötüye kullanımı önlemek (KVKK m. 5/2-f meşru menfaat; GDPR m. 6/1-f).",
          "Verilerinizi satmıyor, reklam profili oluşturmak için kullanmıyor ve hakkınızda hukuki sonuç doğuran otomatik kararlar almıyoruz.",
        ],
      },
      {
        heading: "Hizmet sağlayıcılar ve yurt dışına aktarım",
        body: [
          "Veritabanımız ve giriş sistemimiz Supabase Inc. tarafından barındırılır. Hesap verileriniz Avrupa Birliği (Frankfurt, Almanya) bölgesinde saklanır.",
          "Web sitesinin kendisi sanal sunucu sağlayıcımızda çalışır.",
          "Giriş e-postaları Resend Inc. tarafından noreply@keyboardfast.com adresinden gönderilir.",
          "Google ile giriş yaparsanız kimliğinizi Google LLC (Avrupa'daki kullanıcılar için Google Ireland Ltd.) kendi gizlilik politikası kapsamında doğrular.",
          "Bu sağlayıcılar verileri yalnızca bizim talimatlarımızla işler. Bazıları Türkiye dışında yerleşik olduğundan hesap kullanımı kişisel verilerin yurt dışına aktarılmasını içerebilir; bu aktarım yalnızca hizmetin sunulması için gerekli ölçüde ve KVKK m. 9 ile GDPR V. bölümde öngörülen güvencelere uygun olarak yapılır.",
        ],
      },
      {
        heading: "Saklama süresi",
        body: [
          "Hesap verileri ve sonuçlar, hesabınızı silene kadar saklanır. Hesabınızı istediğiniz zaman hesap menüsünden silebilirsiniz; bu işlem e-posta adresinizi, kullanıcı adınızı ve tüm sonuçlarınızı veritabanımızdan kalıcı olarak kaldırır.",
        ],
      },
      {
        heading: "Haklarınız",
        body: [
          "KVKK m. 11 ve GDPR kapsamında verilerinizin işlenip işlenmediğini öğrenme, bir kopyasını alma, düzeltilmesini veya silinmesini isteme, işlemeye itiraz etme ve aktarımlar hakkında bilgi talep etme haklarına sahipsiniz. Tüm verilerinizi JSON dosyası olarak indirmek ve hesabınızı silmek için hesap menüsünü kullanabilirsiniz.",
          "Diğer talepleriniz için {email} adresine yazabilirsiniz; en geç 30 gün içinde yanıt veririz. Ayrıca Kişisel Verileri Koruma Kurulu'na veya bulunduğunuz ülkenin veri koruma otoritesine şikâyette bulunma hakkınız vardır.",
        ],
      },
      {
        heading: "Çocuklar",
        body: [
          "keyboardfast herkese açıktır, ancak hesaplar 16 yaş ve üzeri kişiler için tasarlanmıştır. Daha küçükseniz hesap açmadan önce lütfen ebeveyninize veya vasinize danışın.",
        ],
      },
      {
        heading: "Değişiklikler",
        body: [
          "Veri işleme biçimimiz değişirse bu sayfayı güncelleriz. En üstteki tarih güncel sürümü gösterir. Önemli değişiklikler sitede duyurulur.",
        ],
      },
    ],
  },
  cookies: {
    title: "Çerez Politikası",
    intro:
      "keyboardfast yalnızca çalışması için gereken depolamayı kullanır. Reklam, analiz veya başka takip çerezleri kullanmıyoruz; bu nedenle takip için izin istenmez.",
    sections: [
      {
        heading: "Tarayıcınızda sakladıklarımız",
        body: [
          "locale (çerez, 1 yıl) – seçtiğiniz arayüz dilini hatırlar.",
          "kf:settings (yerel depolama) – tema ve test seçenekleriniz.",
          "kf:history (yerel depolama) – giriş yapmadan yaptığınız testlerin sonuçları; giriş yapan kullanıcılarda sitenin hızlı çalışması için kendi sonuçlarının yerel bir kopyası.",
          "kf:pending (yerel depolama) – çevrimdışıyken hesabınıza yüklenmeyi bekleyen sonuçlar.",
          "kf:ticket (yerel depolama) – bir sonraki testinizin liderlik tablosu için doğrulanabilmesini sağlayan, önceden alınmış test bileti (yalnızca oturum açıkken).",
          "kf:consent (yerel depolama) – çerez bildirimini gördüğünüzü hatırlar.",
          "sb-…-auth-token (yerel depolama) – oturumunuzu açık tutar. Yalnızca giriş yaptığınızda oluşturulur, çıkış yaptığınızda silinir.",
        ],
      },
      {
        heading: "Neden izin gerekmiyor",
        body: [
          "Yukarıdakilerin tamamı kullandığınız özellikler için zorunludur ya da kendi yaptığınız seçimleri saklar. Bu nedenle e-gizlilik kuralları ve KVKK kapsamında önceden izin gerektirmez. Hiçbiri pazarlama amacıyla üçüncü kişilerle paylaşılmaz.",
        ],
      },
      {
        heading: "Nasıl silinir",
        body: [
          "Çıkış yapıp tarayıcı ayarlarından {site} için site verilerini temizleyerek hepsini istediğiniz zaman silebilirsiniz. Site çalışmaya devam eder, ancak yerel sonuçlarınız ve tercihleriniz sıfırlanır.",
        ],
      },
      {
        heading: "Gelecekteki değişiklikler",
        body: [
          "İleride isteğe bağlı çerezler (örneğin analiz veya reklam için) eklersek, bunları kullanmadan önce izninizi isteyecek ve bu politikayı güncelleyeceğiz.",
        ],
      },
    ],
  },
  terms: {
    title: "Kullanım Koşulları",
    intro: "Bu koşullar keyboardfast'i ({site}) kullandığınızda geçerlidir. Siteyi kullanarak bu koşulları kabul etmiş olursunuz.",
    sections: [
      {
        heading: "Hizmet",
        body: [
          "keyboardfast ücretsiz bir klavye hız testidir. Özellikleri istediğimiz zaman ekleyebilir, değiştirebilir veya kaldırabiliriz. Hizmet ücretsiz ve kesintisiz çalışma garantisi olmadan sunulur.",
        ],
      },
      {
        heading: "Hesabınız",
        body: [
          "Hesap açmak için size ait, geçerli bir e-posta adresi gerekir. Giriş bağlantıları bu adrese gönderildiği için e-posta hesabınızın güvenliğini koruyun. Her kişi tek hesap açabilir.",
          "Kullanıcı adınız başkalarını taklit edemez, hakaret veya nefret içeremez ve reklam amacı taşıyamaz. Bu kurala aykırı kullanıcı adlarını değiştirebilir veya kaldırabiliriz.",
        ],
      },
      {
        heading: "Adil oyun",
        body: [
          "Sonuçlar sizin kendi yazmanızdan gelmelidir. Bot, betik, makro, değiştirilmiş istemci veya yazmadığınız sonuçları gönderen başka yöntemler kullanmak yasaktır. Bu tür sonuçları silebilir, liderlik tablosundan gizleyebilir veya ilgili hesapları kapatabiliriz.",
          "Hizmeti aksatmaya, diğer kullanıcıların verilerine erişmeye veya güvenlik önlemlerini aşmaya çalışmayın.",
        ],
      },
      {
        heading: "İçerik ve fikri haklar",
        body: [
          "Aksi belirtilmedikçe sitenin tasarımı, kodu ve metinleri üzerindeki haklar {owner} adına saklıdır. Kelime listeleri ve kod parçaları yalnızca yazma pratiği amacıyla sunulur.",
        ],
      },
      {
        heading: "Sorumluluk",
        body: [
          "keyboardfast \"olduğu gibi\" sunulur. Sonuçların doğru, verilerin güvende olması için elimizden geleni yaparız; ancak hizmetin her zaman erişilebilir ve hatasız olacağını veya verilerin hiçbir zaman kaybolmayacağını garanti edemeyiz. Kanunun izin verdiği ölçüde, hizmetin kullanımından doğan dolaylı zararlardan sorumlu değiliz.",
        ],
      },
      {
        heading: "Kullanımın sona ermesi",
        body: [
          "Hizmeti kullanmayı istediğiniz zaman bırakabilir ve hesabınızı hesap menüsünden silebilirsiniz. Bu koşulları ciddi veya tekrarlı biçimde ihlal eden hesapları askıya alabiliriz.",
        ],
      },
      {
        heading: "Uygulanacak hukuk ve değişiklikler",
        body: [
          "Bu koşullara Türkiye Cumhuriyeti hukuku uygulanır. Yaşadığınız ülkenin emredici tüketici koruma kuralları saklıdır. Koşulları güncelleyebiliriz; en üstteki tarih güncel sürümü gösterir. Sorularınız için: {email}.",
        ],
      },
    ],
  },
};

const docs: Record<string, Docs> = { en, tr, de, es, fr, pt };

/** The document in the requested language (English if unknown). `translated` marks non-authoritative versions. */
export function getLegalDoc(kind: LegalKind, locale: string) {
  const lang = locale in docs ? locale : "en";
  return { doc: docs[lang][kind], translated: lang !== "en" && lang !== "tr" };
}

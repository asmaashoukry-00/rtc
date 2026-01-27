gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    const tl = gsap.timeline();

    // 1. Loading Screen Animation
    tl.to("#loader-logo", { opacity: 1, scale: 1, duration: 1.2, ease: "back.out(1.7)" })
      .to("#progress-bar", { width: "100%", duration: 2, ease: "power4.inOut" }, "-=0.5")
      .to(".tagline", { opacity: 1, y: -10, duration: 0.8 }, "-=0.8")
      .to("#loading-screen", { 
          clipPath: "circle(0% at 50% 50%)", 
          duration: 1.5, 
          ease: "expo.inOut" 
      })

    // 2. Hero Content Staggered Reveal
    .to(".hero-reveal", { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        stagger: 0.2, 
        ease: "power3.out" 
    }, "-=0.5");

    // 3. Custom Cursor Movement
    const cursor = document.getElementById("cursor");
    window.addEventListener("mousemove", (e) => {
        gsap.to(cursor, {
            x: e.clientX - 16,
            y: e.clientY - 16,
            duration: 0.2,
            ease: "power2.out"
        });
    });

    // 4. Navbar Background Change on Scroll
    window.addEventListener("scroll", () => {
        const nav = document.getElementById("main-nav");
        if (window.scrollY > 50) {
            nav.classList.add("bg-white/90", "backdrop-blur-md", "shadow-sm", "py-4");
            nav.classList.remove("py-6");
        } else {
            nav.classList.remove("bg-white/90", "backdrop-blur-md", "shadow-sm", "py-4");
            nav.classList.add("py-6");
        }
    });

    // 5. Stats Counter Animation
    const stats = document.querySelectorAll("[data-target]");
    stats.forEach(stat => {
        const updateCount = () => {
            const target = +stat.getAttribute("data-target");
            const count = +stat.innerText.replace("+", "");
            const speed = target / 100;

            if (count < target) {
                stat.innerText = "+" + Math.ceil(count + speed);
                setTimeout(updateCount, 20);
            } else {
                stat.innerText = "+" + target.toLocaleString();
            }
        };
        
        ScrollTrigger.create({
            trigger: stat,
            onEnter: updateCount
        });
    });
});



const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
let currentSlide = 0;

function showSlide(index) {
    
    slides.forEach(slide => {
        slide.style.opacity = "0";
        slide.style.zIndex = "0";
    });
    dots.forEach(dot => dot.classList.remove("active-dot"));

   
    slides[index].style.opacity = "1";
    slides[index].style.zIndex = "10";
    dots[index].classList.add("active-dot");
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}


setInterval(nextSlide, 5000);


dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        currentSlide = index;
        showSlide(index);
    });
});
// --------------------------
// const servicesDetails = {
//     service1: {
//         category: "01. تموين احترافي",
//         title: "الإعاشة المطهية",
//         img: "assets2/hero1.png",
//         desc1: "نحن متخصصون في تقديم خدمات التغذية المطهية للمستشفيات، القطاعات العسكرية، والمجمعات السكنية. نعتمد على مطابخ مركزية تعمل بنظام 'الطهي الآمن' لضمان الجودة الطازجة.",
//         desc2: "تتضمن الخدمة: إعداد القوائم الصحية، الطهي الاحترافي، النقل المبرد، وتقديم الوجبات في الموقع.",
//         waText: "مرحباً، أود الاستفسار عن خدمة الإعاشة المطهية"
//     },
//     service2: {
//         category: "02. توريد خارجي",
//         title: "خدمات التموين",
//         img: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=1000",
//         desc1: "نوفر حلول تموين متكاملة للمواقع النائية ومشاريع الإنشاءات. سواء كانت وجبات جافة، معلبة، أو مطهية، نحن نصل إليكم في أصعب الظروف.",
//         desc2: "نتميز بأسطول نقل حديث مجهز بأحدث تقنيات الحفاظ على درجة حرارة الطعام.",
//         waText: "مرحباً، أود الاستفسار عن خدمات التموين للمشاريع"
//     },
//     service3: {
//         category: "03. إدارة مرافق",
//         title: "تجهيز المطابخ",
//         img: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1000",
//         desc1: "نساعدكم في تصميم وبناء المطابخ المركزية من الصفر. نوفر المعدات، خطوط الإنتاج من الستانلس ستيل، وأنظمة التهوية الحديثة.",
//         desc2: "نوفر أيضاً عقود صيانة دورية للمعدات لضمان عدم توقف عملياتكم التشغيلية.",
//         waText: "مرحباً، أود الاستفسار عن خدمة تجهيز المطابخ المركزية"
//     }
// };

// function openModal(id) {
//     const data = servicesDetails[id];
//     const modal = document.getElementById('serviceModal');
    
//     // تعبئة البيانات
//     document.getElementById('modalImage').src = data.img;
//     document.getElementById('modalCategory').innerText = data.category;
//     document.getElementById('modalTitle').innerText = data.title;
//     document.getElementById('modalDescription1').innerText = data.desc1;
//     document.getElementById('modalDescription2').innerText = data.desc2;
    
//     // ربط الواتساب (ضعي رقمك هنا بدل 966000000000)
//     document.getElementById('whatsappBtn').href = `https://wa.me/966000000000?text=${encodeURIComponent(data.waText)}`;

//     // إظهار المودال
//     modal.classList.remove('hidden');
//     document.body.style.overflow = 'hidden'; // منع سكرول الصفحة
// }

// function closeModal() {
//     const modal = document.getElementById('serviceModal');
//     modal.classList.add('hidden');
//     document.body.style.overflow = 'auto'; // إعادة سكرول الصفحة
// }
// -----
// gsap.utils.toArray(".achievement-block").forEach((block, i) => {
//     const img = block.querySelector("img");
//     const content = block.querySelector("div[class*='shadow-2xl']");

//     gsap.from(img, {
//         scrollTrigger: {
//             trigger: block,
//             start: "top 80%",
//             scrub: 1
//         },
//         scale: 1.3,
//         y: 50
//     });

//     gsap.from(content, {
//         scrollTrigger: {
//             trigger: block,
//             start: "top 70%",
//         },
//         x: i % 2 === 0 ? 150 : -150, // يخرج من اليمين أو اليسار حسب الترتيب
//         opacity: 0,
//         duration: 1.5,
//         ease: "expo.out"
//     });
// });

const servicesData = {
    'service1': {
        title: 'الإعاشة المطهية',
        category: 'تموين مباشر',
        desc1: 'نقدم خدمة إعداد وتقديم الوجبات الساخنة والمطهية مباشرة للمستفيدين، مع الالتزام التام بمعايير الجودة وسلامة الغذاء.',
        desc2: 'تشمل خدماتنا القطاعات العسكرية، التعليمية، والفعاليات، حيث نضمن وصول الطعام طازجاً وبأعلى معايير الطهي الاحترافي.',
        image: 'assets2/imgs/service1.webp'
    },
    'service2': {
        title: 'التغذية مسبقة التجهيز',
        category: 'حلول لوجستية',
        desc1: 'متخصصون في توفير الوجبات التي يتم إعدادها مسبقاً وتجهيزها للتوزيع وفق جداول زمنية دقيقة.',
            desc2: 'تعد هذه الخدمة مثالية للمستشفيات، المراكز الصحية، والمواقع التي تتطلب توزيعاً منظماً وسريعاً للوجبات مع الحفاظ على قيمتها الغذائية.',
            image: 'assets2/imgs/service2.webp'
    },
    'service3': {
        title: 'تشغيل المطابخ المركزية',
        category: 'إدارة وتجهيز',
        desc1: 'تعمل الشركة بالتعاون مع مطابخ مركزية محلية معتمدة لضمان جودة الوجبات وفق اشتراطات السلامة الغذائية العالمية.',
        desc2: 'نضمن من خلال هذه الشراكات المعتمدة قدرة تشغيلية عالية تلبي احتياجات العقود الكبرى والمشاريع الاستراتيجية بكفاءة واحترافية.',
        image: 'assets2/imgs/service3.webp'
    }
};

function openModal(serviceKey) {
    const data = servicesData[serviceKey];
    const modal = document.getElementById('serviceModal');
    
    document.getElementById('modalTitle').innerText = data.title;
    document.getElementById('modalCategory').innerText = data.category;
    document.getElementById('modalDescription1').innerText = data.desc1;
    document.getElementById('modalDescription2').innerText = data.desc2;
    document.getElementById('modalImage').src = data.image;
    
    const whatsappBtn = document.getElementById('whatsappBtn');
    const message = encodeURIComponent(`السلام عليكم، أرغب في الاستفسار عن خدمة: ${data.title}`);
    whatsappBtn.href = `https://wa.me/966550254234?text=${message}`;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; 
}

function closeModal() {
    const modal = document.getElementById('serviceModal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto'; 
}

// -------------
const menuToggle = document.getElementById('menu-toggle');
const fullMenu = document.getElementById('full-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const l1 = document.querySelector('.line-1');
const l2 = document.querySelector('.line-2');
const l3 = document.querySelector('.line-3');

let isMenuOpen = false;

const menuTl = gsap.timeline({ paused: true });

menuTl.to(fullMenu, {
    autoAlpha: 1, 
    duration: 0.5,
    ease: "power2.inOut"
})
.from(".mobile-link", {
    y: 30,
    opacity: 0,
    stagger: 0.1,
    duration: 0.4,
    ease: "power3.out"
}, "-=0.2");

menuToggle.addEventListener('click', () => {
    if (!isMenuOpen) {
        menuTl.play();
       
        gsap.to(l1, { rotation: 45, y: 8, duration: 0.3 });
        gsap.to(l2, { opacity: 0, x: -20, duration: 0.3 });
        gsap.to(l3, { rotation: -45, y: -8, duration: 0.3 });
        document.body.style.overflow = 'hidden'; 
    } else {
        menuTl.reverse();
       
        gsap.to([l1, l3], { rotation: 0, y: 0, duration: 0.3 });
        gsap.to(l2, { opacity: 1, x: 0, duration: 0.3 });
        document.body.style.overflow = 'auto';
    }
    isMenuOpen = !isMenuOpen;
});


mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuTl.reverse();
        gsap.to([l1, l3], { rotation: 0, y: 0, duration: 0.3 });
        gsap.to(l2, { opacity: 1, x: 0, duration: 0.3 });
        isMenuOpen = false;
        document.body.style.overflow = 'auto';
    });
});

const loadingTl = gsap.timeline();

loadingTl.to("#loader-logo", { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" })
  .to("#progress-bar", { width: "100%", duration: 1, ease: "power2.inOut" }, "-=0.3")
  .to("#loading-screen", { 
      yPercent: -100, 
      duration: 1.2, 
      ease: "expo.inOut" 
  })
  .to("#main-nav", { 
      opacity: 1, 
      y: 0, 
      duration: 0.8, 
      ease: "power2.out",
      pointerEvents: "auto" 
  }, "-=0.5") 
  .add(() => {
      animateHeroText(0);
  });
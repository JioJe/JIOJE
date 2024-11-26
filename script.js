document.addEventListener('DOMContentLoaded', function() {
    // 星空背景创建函数
    function createStarryBackground() {
        const starryBg = document.querySelector('.starry-background');
        if (!starryBg) return;

        // 创建多个星星
        const numberOfStars = 200;
        for (let i = 0; i < numberOfStars; i++) {
            createStar(starryBg);
        }
    }

    // 创建单个星星
    function createStar(container) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // 随机位置
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // 随机大小
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // 随机动画时间和透明度
        star.style.setProperty('--twinkle-duration', `${Math.random() * 3 + 2}s`);
        star.style.setProperty('--star-opacity', `${Math.random() * 0.7 + 0.3}`);
        
        container.appendChild(star);
    }

    // 创建流星
    function createShootingStar() {
        const star = document.createElement('div');
        star.className = 'star-sparkle';
        
        // 随机起始位置
        const startX = Math.random() * window.innerWidth;
        const startY = -50; // 从屏幕顶部开始
        
        star.style.left = `${startX}px`;
        star.style.top = `${startY}px`;
        
        // 设置流星的运动轨迹
        star.style.transform = 'rotate(45deg)';
        
        document.body.appendChild(star);
        
        // 动画结束后移除
        star.addEventListener('animationend', () => {
            star.remove();
        });
    }

    // 修改轮播图控制代码
    function initSlider() {
        const slider = document.querySelector('.slider');
        const slides = document.querySelectorAll('.slide');
        const prevButton = document.querySelector('.prev');
        const nextButton = document.querySelector('.next');
        
        let currentSlide = 0;
        const slideCount = slides.length;
        
        // 更新轮播图状态
        function updateSlider() {
            // 计算偏移量，使当前图片居中
            const offset = currentSlide * -11.111;
            slider.style.transform = `translateX(${offset}%)`;
            
            // 更新所有图片的状态
            slides.forEach((slide, index) => {
                slide.classList.remove('active', 'prev', 'next');
                
                // 计算与当前图片的距离
                const distance = Math.abs(index - currentSlide);
                
                if (index === currentSlide) {
                    // 当前图片
                    slide.classList.add('active');
                } else if (index === (currentSlide - 1 + slideCount) % slideCount) {
                    // 前一张图片
                    slide.classList.add('prev');
                } else if (index === (currentSlide + 1) % slideCount) {
                    // 后一张图片
                    slide.classList.add('next');
                }
                
                // 更新图片样式
                const img = slide.querySelector('.slide-img');
                if (distance === 0) {
                    // 当前图片
                    img.style.transform = 'scale(1.2) translateZ(0)';
                    img.style.opacity = '1';
                } else if (distance === 1) {
                    // 相邻图片
                    img.style.transform = 'scale(0.8) translateZ(-50px)';
                    img.style.opacity = '0.5';
                } else {
                    // 其他图片
                    img.style.transform = 'scale(0.6) translateZ(-100px)';
                    img.style.opacity = '0';
                }
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slideCount;
            updateSlider();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slideCount) % slideCount;
            updateSlider();
        }

        // 初始化显示
        updateSlider();

        // 添加事件监听
        prevButton.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });
        
        nextButton.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });

        // 自动轮播
        let autoSlideInterval = setInterval(nextSlide, 3000);

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(nextSlide, 3000);
        }

        // 鼠标悬停时暂停自动轮播
        slider.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });

        slider.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(nextSlide, 3000);
        });

        // 添加点击处理
        slides.forEach((slide, index) => {
            const link = slide.querySelector('.slide-link');
            if (link) {
                link.addEventListener('click', (e) => {
                    // 只有当前活动的幻灯片才能点击
                    if (!slide.classList.contains('active')) {
                        e.preventDefault();
                        return;
                    }
                    
                    // 可以在这里添加点击分析或其他处理
                    console.log(`Clicked slide ${index + 1}`);
                });
            }
        });
    }

    // 在 DOMContentLoaded 事件中初始化轮播图
    const sliderControl = initSlider();

    // 页面卸载时清理
    window.addEventListener('unload', () => {
        if (sliderControl) {
            sliderControl.cleanup();
        }
    });

    // 初始化星空背景
    createStarryBackground();

    // 处理加载动画
    const loadingScreen = document.querySelector('.loading-screen');
    const contentWrapper = document.querySelector('.content-wrapper');

    if (loadingScreen && contentWrapper) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.visibility = 'hidden';
                loadingScreen.remove();
            }, 800);
            
            contentWrapper.classList.add('visible');
        }, 1200);
    }

    // 定期创建流星
    setInterval(createShootingStar, 3000);

    // 清理函数
    function cleanup() {
        clearInterval(autoSlide);
    }

    // 页面卸载时清理
    window.addEventListener('unload', cleanup);

    // 添加滚动监听
    function handleScrollAnimation() {
        const elements = document.querySelectorAll('.scroll-fade');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight * 0.8) {
                element.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', handleScrollAnimation);

    // 进度条控制
    NProgress.configure({ 
        showSpinner: false,
        trickleSpeed: 200,
        easing: 'ease',
        speed: 500
    });

    // 页面加载进度
    window.addEventListener('load', () => {
        NProgress.done();
    });

    NProgress.start();

    // 移动端菜单控制
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // 添加菜单按钮动画
            menuToggle.classList.toggle('active');
        });
    }

    // 图片加载错误处理
    function handleImageError(img) {
        img.onerror = () => {
            const sliderError = document.querySelector('.slider-error');
            if (sliderError) {
                sliderError.style.display = 'block';
            }
            img.style.display = 'none';
        };
    }

    // 为所有轮播图片添加错误处理
    document.querySelectorAll('.slide').forEach(handleImageError);

    // 添加滚动指示器
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    document.body.appendChild(scrollIndicator);

    scrollIndicator.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 控制滚动指示器显示
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollIndicator.style.opacity = '1';
        } else {
            scrollIndicator.style.opacity = '0';
        }
    });

    // 优化图片加载
    const lazyLoadInstance = new LazyLoad({
        elements_selector: '.lazy',
        callback_loaded: (el) => {
            el.classList.add('loaded');
        }
    });

    // 添加页面切换动画
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 添加性能监控
    const performanceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
                console.log(`LCP: ${entry.startTime}`);
            }
        }
    });

    performanceObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // 移除重复的初始化
    // document.addEventListener('DOMContentLoaded', initThemeToggle);

    // 页面预加载
    function initPreloader() {
        const preloadOverlay = document.createElement('div');
        preloadOverlay.className = 'preload-overlay';
        preloadOverlay.innerHTML = '<div class="preload-spinner"></div>';
        document.body.appendChild(preloadOverlay);

        window.addEventListener('load', () => {
            setTimeout(() => {
                preloadOverlay.style.opacity = '0';
                setTimeout(() => {
                    preloadOverlay.remove();
                }, 500);
            }, 500);
        });
    }

    // 添加鼠标跟随效果
    function initMouseFollow() {
        const cursor = document.createElement('div');
        cursor.className = 'cursor-follow';
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
    }

    // 添加滚动视差效果
    function initParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            document.querySelectorAll('.parallax').forEach(element => {
                const speed = element.dataset.speed || 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    // 初始化所有新功能
    document.addEventListener('DOMContentLoaded', () => {
        initPreloader();
        initMouseFollow();
        initParallax();
        
        // 添加涟漪效果
        document.querySelectorAll('.ripple').forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                ripple.className = 'ripple-effect';
                this.appendChild(ripple);
                
                const rect = this.getBoundingClientRect();
                ripple.style.left = `${e.clientX - rect.left}px`;
                ripple.style.top = `${e.clientY - rect.top}px`;
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
    });

    // 视差滚动效果
    function initParallaxEffect() {
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        function updateParallax() {
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const rect = element.getBoundingClientRect();
                const scrolled = window.pageYOffset;
                
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const yPos = -(scrolled * speed);
                    element.style.transform = `translate3d(0, ${yPos}px, 0)`;
                }
            });
        }

        window.addEventListener('scroll', () => {
            requestAnimationFrame(updateParallax);
        });

        updateParallax();
    }

    // 在 DOMContentLoaded 事件中初始化
    document.addEventListener('DOMContentLoaded', () => {
        // ... 现有的初始化代码 ...
        initParallaxEffect();
    });

    // 修改导航交互功能
    function initNavigation() {
        // Logo点击事件 - 刷新页面
        const logoLink = document.getElementById('logo-link');
        if (logoLink) {
            logoLink.addEventListener('click', () => {
                window.location.reload();
            });
        }

        // 项目链接 - 滚动到项目区域
        const projectsLink = document.getElementById('projects-link');
        const projectsSection = document.getElementById('projects-section');
        if (projectsLink && projectsSection) {
            projectsLink.addEventListener('click', (e) => {
                e.preventDefault();
                projectsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        }

        // 联系我链接 - 滚动到页脚
        const contactLink = document.getElementById('contact-link');
        const footer = document.getElementById('footer');
        if (contactLink && footer) {
            contactLink.addEventListener('click', (e) => {
                e.preventDefault();
                footer.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        }
    }

    // 初始化导航功能
    initNavigation();

    // 添加平滑滚动效果
    function scrollToElement(element) {
        const headerOffset = 80; // 考虑固定导航栏的高度
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}); 
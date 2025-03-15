// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 平滑滚动
    const navLinks = document.querySelectorAll('nav a, .hero-buttons a, .footer-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 检查链接是否指向页面内部
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 服务卡片悬停效果
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // 移民卡片悬停效果
    const immigrantCards = document.querySelectorAll('.immigrant-card');
    immigrantCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            const icon = this.querySelector('i');
            icon.style.transform = 'scale(1.2)';
            icon.style.color = '#FECC02';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            const icon = this.querySelector('i');
            icon.style.transform = 'scale(1)';
            icon.style.color = '#005293';
        });
    });

    // 通讯表单提交
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email) {
                // 这里可以添加实际的表单提交逻辑
                alert('感谢您的订阅！我们将会向您发送最新的移民信息。');
                emailInput.value = '';
            }
        });
    }

    // 移民故事轮播
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonials = document.querySelectorAll('.testimonial');
    
    if (testimonialSlider && testimonials.length > 0) {
        let currentIndex = 0;
        
        // 自动轮播
        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            testimonialSlider.scrollTo({
                left: testimonials[currentIndex].offsetLeft,
                behavior: 'smooth'
            });
        }, 5000);
    }

    // 服务卡片点击效果
    serviceCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // 如果点击的是卡片内的链接，不执行卡片点击效果
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            
            // 添加点击波纹效果
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
            
            ripple.classList.add('active');
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // 获取服务类型并跳转到相应页面
            const serviceType = this.getAttribute('data-service');
            if (serviceType) {
                const serviceLink = this.querySelector('.service-link');
                if (serviceLink) {
                    window.open(serviceLink.getAttribute('href'), '_blank');
                }
            }
        });
    });

    // 添加页面加载动画
    document.body.classList.add('loaded');
    
    // 添加滚动显示动画
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .immigrant-card, .testimonial');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    };
    
    // 初始检查
    animateOnScroll();
    
    // 滚动时检查
    window.addEventListener('scroll', animateOnScroll);
}); 
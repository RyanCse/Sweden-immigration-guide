// 语言切换功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有语言按钮
    const langButtons = document.querySelectorAll('.lang-btn');
    
    // 获取所有带有语言数据属性的元素
    const langElements = document.querySelectorAll('[data-lang-zh], [data-lang-en], [data-lang-sv]');
    
    // 获取所有带有占位符语言数据属性的输入元素
    const placeholderElements = document.querySelectorAll('[data-lang-zh-placeholder], [data-lang-en-placeholder], [data-lang-sv-placeholder]');
    
    // 设置默认语言
    let currentLang = 'zh';
    
    // 检查本地存储中是否有保存的语言设置
    const savedLang = localStorage.getItem('selectedLanguage');
    if (savedLang) {
        currentLang = savedLang;
        updateLanguage(currentLang);
        updateActiveButton(currentLang);
    }
    
    // 为每个语言按钮添加点击事件
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            currentLang = lang;
            
            // 保存语言选择到本地存储
            localStorage.setItem('selectedLanguage', lang);
            
            // 更新语言
            updateLanguage(lang);
            
            // 更新活动按钮
            updateActiveButton(lang);
        });
    });
    
    // 更新语言函数
    function updateLanguage(lang) {
        // 更新所有带有语言数据属性的元素
        langElements.forEach(element => {
            const text = element.getAttribute(`data-lang-${lang}`);
            if (text) {
                element.textContent = text;
            }
        });
        
        // 更新所有带有占位符语言数据属性的输入元素
        placeholderElements.forEach(element => {
            const placeholder = element.getAttribute(`data-lang-${lang}-placeholder`);
            if (placeholder) {
                element.setAttribute('placeholder', placeholder);
            }
        });
        
        // 更新HTML语言属性
        document.documentElement.lang = lang;
    }
    
    // 更新活动按钮函数
    function updateActiveButton(lang) {
        langButtons.forEach(button => {
            if (button.getAttribute('data-lang') === lang) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
}); 
document.addEventListener('DOMContentLoaded', function () {

    const detailTitle = document.getElementById('detail-title');
    const detailImageContainer = document.getElementById('detail-image-container');
    const detailBody = document.getElementById('detail-body');
    const relatedPostsContainer = document.getElementById('related-posts-container');

    const params = new URLSearchParams(window.location.search);
    const keywordFromQuery = params.get('q') || '';

    const keyword = keywordFromQuery
        .replace(/-/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    // =========================================
    // Helper Functions
    // =========================================

    function capitalizeEachWord(str) {
        if (!str) return '';

        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    function getRandomItem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // =========================================
    // Pinterest SEO Modifier
    // =========================================

    function addPinterestModifiers(keyword) {

        const modifiers = [
            'ideas',
            'decor',
            'aesthetic',
            'modern',
            'cozy',
            'luxury',
            'minimalist',
            'small apartment',
            'small space',
            'organization',
            'inspiration',
            'room makeover',
            'home styling',
            'beautiful interiors',
            'dream house'
        ];

        const randomModifier = getRandomItem(modifiers);

        return `${keyword} ${randomModifier}`;
    }

    // =========================================
    // SEO Title Generator
    // =========================================

    function generateSeoTitle(baseKeyword) {

        const hookWords = [
            'Cozy',
            'Luxury',
            'Modern',
            'Minimalist',
            'Beautiful',
            'Elegant',
            'Budget',
            'Aesthetic',
            'Dreamy',
            'Warm',
            'Small Space',
            'Apartment',
            'Stylish',
            'Smart',
            'Viral'
        ];

        const randomHook = getRandomItem(hookWords);

        const capitalizedKeyword = capitalizeEachWord(baseKeyword);

        const titleFormats = [
            `${randomHook} ${capitalizedKeyword} Ideas`,
            `${randomHook} ${capitalizedKeyword} Inspiration`,
            `${randomHook} ${capitalizedKeyword} Decor Ideas`,
            `${randomHook} ${capitalizedKeyword} Makeover`,
            `${randomHook} ${capitalizedKeyword} Aesthetic`,
            `${randomHook} ${capitalizedKeyword} Design Trends`,
            `${randomHook} ${capitalizedKeyword} For Small Spaces`,
            `${randomHook} ${capitalizedKeyword} Setup`,
            `${randomHook} ${capitalizedKeyword} Room Inspiration`,
            `${randomHook} ${capitalizedKeyword} Home Ideas`
        ];

        return getRandomItem(titleFormats);
    }

    // =========================================
    // Spintax Processor
    // =========================================

    function processSpintax(text) {

        const spintaxPattern = /{([^{}]+)}/g;

        while (spintaxPattern.test(text)) {

            text = text.replace(spintaxPattern, function (match, choices) {

                const options = choices.split('|');

                return getRandomItem(options);

            });

        }

        return text;
    }

    // =========================================
    // Error State
    // =========================================

    if (!keyword) {

        detailTitle.textContent = 'Home Decor Inspiration Not Found';

        detailBody.innerHTML = `
            <p>
                Sorry, the requested decor inspiration could not be found.
                Please return to the <a href="index.html">homepage</a>.
            </p>
        `;

        if (relatedPostsContainer) {

            const section = relatedPostsContainer.closest('.related-posts-section');

            if (section) {
                section.style.display = 'none';
            }

        }

        return;
    }

    // =========================================
    // Main Content Generator
    // =========================================

    function populateMainContent(term) {

        const seoTitle = generateSeoTitle(term);

        const capitalizedTerm = capitalizeEachWord(term);

        document.title = `${seoTitle} | Home Decor Inspiration`;

        detailTitle.textContent = seoTitle;

        // =========================================
        // Pinterest Optimized Image Query
        // =========================================

        const enhancedKeyword = addPinterestModifiers(term);

        const imageUrl = `https://tse1.mm.bing.net/th?q=${encodeURIComponent(enhancedKeyword)}&w=1000&h=1500&c=7&rs=1&p=0&dpr=1.5&pid=1.7`;

        detailImageContainer.innerHTML = `
            <img 
                src="${imageUrl}" 
                alt="${seoTitle}" 
                loading="eager"
            >
        `;

        // =========================================
        // Pinterest Style Article
        // =========================================

        const articleTemplate = `

        <p>
        {Welcome|Hello|Greetings} to our {home decor inspiration|modern interior styling|design inspiration} guide.
        Today we are exploring <strong>${capitalizedTerm}</strong> ideas that are {beautiful|cozy|stylish|Pinterest-worthy}.
        </p>

        <p>
        Whether you love {minimalist interiors|cozy apartment aesthetics|luxury modern spaces|small space styling},
        these ideas will help you create a {warm|elegant|comfortable|dreamy} atmosphere.
        </p>

        <h2>
        ${capitalizedTerm} Inspiration
        </h2>

        <p>
        One of the biggest trends right now is combining {comfort and functionality|aesthetic styling and organization|warm textures and modern design}.
        This makes your <strong>${capitalizedTerm}</strong> look more {expensive|professional|relaxing|Instagram-worthy}.
        </p>

        <h3>
        1. Cozy Color Palette
        </h3>

        <p>
        Try using {warm neutral tones|soft earth colors|minimalist white palettes|modern beige accents}
        to create a calm and inviting space.
        </p>

        <h3>
        2. Smart Furniture Layout
        </h3>

        <p>
        Good furniture placement can make even a small room feel {larger|cleaner|more luxurious|more comfortable}.
        Focus on balance, lighting, and open walking areas.
        </p>

        <h3>
        3. Add Texture and Layers
        </h3>

        <p>
        Layering materials like {linen|wood|glass|soft fabrics|woven baskets}
        helps create a Pinterest-style aesthetic that feels warm and modern.
        </p>

        <h3>
        4. Lighting Matters
        </h3>

        <p>
        Use {warm lighting|natural sunlight|modern floor lamps|ambient lighting}
        to instantly improve the mood of your <strong>${capitalizedTerm}</strong>.
        </p>

        <h3>
        5. Small Space Organization
        </h3>

        <p>
        Smart storage solutions help your home stay {beautiful and functional|minimalist and organized}.
        Consider using hidden storage, wall shelves, and decorative baskets.
        </p>

        <h3>
        6. Add Personal Decor
        </h3>

        <p>
        Decorative items like {wall art|candles|plants|books|mirrors}
        can make your room feel more personal and stylish.
        </p>

        <h3>
        Final Thoughts
        </h3>

        <p>
        We hope these <strong>${capitalizedTerm}</strong> ideas inspire your next room makeover.
        Save this inspiration and explore more modern home decor ideas on our website.
        </p>

        `;

        detailBody.innerHTML = processSpintax(articleTemplate);

        // =========================================
        // Internal SEO Links
        // =========================================

        const seoLinks = `
            <section class="seo-links">
                <h3>Popular Home Decor Ideas</h3>

                <ul>
                    <li>
                        <a href="detail.html?q=cozy-living-room-ideas">
                            Cozy Living Room Ideas
                        </a>
                    </li>

                    <li>
                        <a href="detail.html?q=small-apartment-decor">
                            Small Apartment Decor
                        </a>
                    </li>

                    <li>
                        <a href="detail.html?q=modern-bedroom-inspiration">
                            Modern Bedroom Inspiration
                        </a>
                    </li>

                    <li>
                        <a href="detail.html?q=home-office-setup">
                            Home Office Setup
                        </a>
                    </li>

                    <li>
                        <a href="detail.html?q=luxury-bathroom-ideas">
                            Luxury Bathroom Ideas
                        </a>
                    </li>
                </ul>
            </section>
        `;

        detailBody.innerHTML += seoLinks;
    }

    // =========================================
    // Related Posts
    // =========================================

    function generateRelatedPosts(term) {

        const script = document.createElement('script');

        script.src = `https://suggestqueries.google.com/complete/search?jsonp=handleRelatedSuggest&hl=en&client=firefox&q=${encodeURIComponent(term)}`;

        document.head.appendChild(script);

        script.onload = function () {
            script.remove();
        };

        script.onerror = function () {

            relatedPostsContainer.innerHTML = `
                <div class="loading-placeholder">
                    Could not load related decor ideas.
                </div>
            `;

            script.remove();
        };
    }

    // =========================================
    // Google Suggest Callback
    // =========================================

    window.handleRelatedSuggest = function (data) {

        const suggestions = data[1];

        relatedPostsContainer.innerHTML = '';

        if (!suggestions || suggestions.length === 0) {

            const section = relatedPostsContainer.closest('.related-posts-section');

            if (section) {
                section.style.display = 'none';
            }

            return;
        }

        const originalKeyword = keyword.toLowerCase();

        let relatedCount = 0;

        suggestions.forEach(function (relatedTerm) {

            if (
                relatedTerm.toLowerCase() === originalKeyword ||
                relatedCount >= 12
            ) {
                return;
            }

            relatedCount++;

            const keywordForUrl = relatedTerm
                .replace(/\s+/g, '-')
                .toLowerCase();

            const linkUrl = `detail.html?q=${encodeURIComponent(keywordForUrl)}`;

            const enhancedKeyword = addPinterestModifiers(relatedTerm);

            const imageUrl = `https://tse1.mm.bing.net/th?q=${encodeURIComponent(enhancedKeyword)}&w=600&h=900&c=7&rs=1&p=0&dpr=1.5&pid=1.7`;

            const relatedTitle = generateSeoTitle(relatedTerm);

            const card = `
                <article class="content-card">
                    <a href="${linkUrl}">
                        <img 
                            src="${imageUrl}" 
                            alt="${relatedTitle}" 
                            loading="lazy"
                        >

                        <div class="content-card-body">
                            <h3>${relatedTitle}</h3>
                        </div>
                    </a>
                </article>
            `;

            relatedPostsContainer.innerHTML += card;

        });

        if (relatedCount === 0) {

            const section = relatedPostsContainer.closest('.related-posts-section');

            if (section) {
                section.style.display = 'none';
            }

        }
    };

    // =========================================
    // Initialize
    // =========================================

    populateMainContent(keyword);

    generateRelatedPosts(keyword);

});
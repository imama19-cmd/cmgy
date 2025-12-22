 document.addEventListener('DOMContentLoaded', function() {
            // Données des quartiers
            const quartiers = [
                { nom: "Grand-Yoff Centre", responsable: "Cheikh Ahmed Diop", membres: 215 },
                { nom: "HLM Grand-Yoff", responsable: "Moussa Sarr", membres: 180 },
                { nom: "Yoff Ngaparou", responsable: "Fatou Diallo", membres: 195 },
                { nom: "Sicap Grand-Yoff", responsable: "Omar Ndiaye", membres: 170 },
                { nom: "Cité Air Afrique", responsable: "Aminata Sow", membres: 145 },
                { nom: "Zone de Captage", responsable: "Mamadou Fall", membres: 160 },
                { nom: "Patte d'Oie", responsable: "Abdoulaye Mbaye", membres: 125 },
                { nom: "Ouakam", responsable: "Khady Diouf", membres: 135 },
                { nom: "Mermoz", responsable: "Mariama Sene", membres: 110 },
                { nom: "Autres quartiers", responsable: "Ibrahim Ba", membres: 90 }
            ];

            // Données des articles avec images et vidéos
            const articles = [
                {
                    id: 1,
                    title: "Préparation du Ramadan 2026",
                    excerpt: "La coordination organise les préparatifs pour le Ramadan.",
                    category: "evenement",
                    date: "10 décembre 2025",
                    author: "Secrétariat Général",
                    hasVideo: false,
                    image: "https://images.unsplash.com/photo-1518611507436-f9221403cca2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                },
                {
                    id: 2,
                    title: "Assemblée générale annuelle",
                    excerpt: "Compte-rendu de l'assemblée générale qui s'est tenue le 5 décembre 2025. Résolutions et orientations 2026.",
                    category: "reunion",
                    date: "7 décembre 2025",
                    author: "Présidence",
                    hasVideo: true,
                    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-1.2.1&auto=format&fit=crop&w-600&q=80"
                },
                {
                    id: 3,
                    title: "Atelier de formation des responsables",
                    excerpt: "Formation sur la gestion associative et la communication interne pour les responsables de quartiers.",
                    category: "formation",
                    date: "1 décembre 2025",
                    author: "Commission Formation",
                    hasVideo: false,
                    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                },
                {
                    id: 4,
                    title: "Lancement du projet éducatif 2026",
                    excerpt: "Nouveau programme d'éducation islamique pour les enfants et les jeunes de la communauté.",
                    category: "projet",
                    date: "28 novembre 2025",
                    author: "Commission Éducation",
                    hasVideo: false,
                    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                },
                {
                    id: 5,
                    title: "Collecte de fonds pour la mosquée",
                    excerpt: "Campagne de financement pour les travaux de rénovation de la mosquée centrale de Grand-Yoff.",
                    category: "projet",
                    date: "25 novembre 2025",
                    author: "Commission Finances",
                    hasVideo: false,
                    image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                },
                {
                    id: 6,
                    title: "Tournoi sportif inter-quartiers",
                    excerpt: "Compétition sportive annuelle pour renforcer les liens entre les jeunes des différents quartiers.",
                    category: "evenement",
                    date: "20 novembre 2025",
                    author: "Commission Jeunesse",
                    hasVideo: true,
                    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                }
            ];

            // Initialiser les quartiers
            function initializeQuartiers() {
                const neighborhoodsGrid = document.querySelector('.neighborhoods-grid');
                neighborhoodsGrid.innerHTML = '';
                quartiers.forEach(quartier => {
                    const quartierCard = document.createElement('div');
                    quartierCard.className = 'neighborhood-card';
                    quartierCard.innerHTML = `
                        <div class="neighborhood-icon">
                            <i class="fas fa-map-marker-alt"></i>
                        </div>
                        <h3>${quartier.nom}</h3>
                        <div class="neighborhood-responsable">
                            <i class="fas fa-user-tie"></i> ${quartier.responsable}
                        </div>
                        <div class="neighborhood-members">
                            <i class="fas fa-users"></i> ${quartier.membres} membres
                        </div>
                    `;
                    neighborhoodsGrid.appendChild(quartierCard);
                });
            }

            // Initialiser les articles
            function initializeArticles(filterCategory = 'all') {
                const newsGrid = document.getElementById('newsGrid');
                const filteredArticles = filterCategory === 'all' 
                    ? articles 
                    : articles.filter(article => article.category === filterCategory);

                newsGrid.innerHTML = '';
                
                filteredArticles.forEach(article => {
                    const newsCard = document.createElement('div');
                    newsCard.className = 'news-card';
                    newsCard.setAttribute('data-category', article.category);
                    newsCard.innerHTML = `
                        <div class="news-image">
                            ${article.image ? `<img src="${article.image}" alt="${article.title}">` : 
                              `<i class="fas fa-newspaper"></i>`}
                            ${article.hasVideo ? '<div class="video-indicator"><i class="fas fa-video"></i> Vidéo</div>' : ''}
                        </div>
                        <div class="news-content">
                            <span class="news-category">${getCategoryLabel(article.category)}</span>
                            <h3>${article.title}</h3>
                            <p class="news-excerpt">${article.excerpt}</p>
                            <div class="news-meta">
                                <div class="news-date">
                                    <i class="far fa-calendar"></i> ${article.date}
                                </div>
                                <div class="news-author">
                                    ${article.author}
                                </div>
                            </div>
                        </div>
                    `;
                    newsGrid.appendChild(newsCard);
                });
            }

            function getCategoryLabel(category) {
                const labels = {
                    'evenement': 'ÉVÉNEMENT',
                    'reunion': 'RÉUNION',
                    'formation': 'FORMATION',
                    'projet': 'PROJET'
                };
                return labels[category] || 'ACTUALITÉ';
            }

            // Initialiser FullCalendar
            function initializeCalendar() {
                const calendarEl = document.getElementById('calendar');
                const calendar = new FullCalendar.Calendar(calendarEl, {
                    initialView: 'dayGridMonth',
                    locale: 'fr',
                    headerToolbar: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,listMonth'
                    },
                    events: [
                        {
                            title: 'Réunion des responsables',
                            start: '2025-12-15',
                            backgroundColor: 'var(--primary)'
                        },
                        {
                            title: 'Collecte Zakat',
                            start: '2025-12-20',
                            backgroundColor: 'var(--secondary)'
                        },
                        {
                            title: 'Célébration Mawlid',
                            start: '2025-12-25',
                            backgroundColor: 'var(--accent)'
                        },
                        {
                            title: 'Assemblée générale',
                            start: '2026-01-10',
                            backgroundColor: 'var(--primary)'
                        },
                        {
                            title: 'Formation bénévoles',
                            start: '2025-12-28',
                            backgroundColor: 'var(--secondary)'
                        }
                    ],
                    eventClick: function(info) {
                        alert('Événement: ' + info.event.title + '\nDate: ' + info.event.start.toLocaleDateString('fr-FR'));
                    }
                });
                calendar.render();
            }

            // Initialiser les composants
            initializeQuartiers();
            initializeArticles();
            initializeCalendar();

            // Gestion de la recherche
            const searchButton = document.getElementById('searchButton');
            const newsSearch = document.getElementById('newsSearch');
            
            function performSearch() {
                const searchTerm = newsSearch.value.toLowerCase();
                const filteredArticles = articles.filter(article => 
                    article.title.toLowerCase().includes(searchTerm) || 
                    article.excerpt.toLowerCase().includes(searchTerm) ||
                    article.author.toLowerCase().includes(searchTerm)
                );
                
                const newsGrid = document.getElementById('newsGrid');
                newsGrid.innerHTML = '';
                
                filteredArticles.forEach(article => {
                    const newsCard = document.createElement('div');
                    newsCard.className = 'news-card';
                    newsCard.innerHTML = `
                        <div class="news-image">
                            ${article.image ? `<img src="${article.image}" alt="${article.title}">` : 
                              `<i class="fas fa-newspaper"></i>`}
                            ${article.hasVideo ? '<div class="video-indicator"><i class="fas fa-video"></i> Vidéo</div>' : ''}
                        </div>
                        <div class="news-content">
                            <span class="news-category">${getCategoryLabel(article.category)}</span>
                            <h3>${article.title}</h3>
                            <p class="news-excerpt">${article.excerpt}</p>
                            <div class="news-meta">
                                <div class="news-date">
                                    <i class="far fa-calendar"></i> ${article.date}
                                </div>
                                <div class="news-author">
                                    ${article.author}
                                </div>
                            </div>
                        </div>
                    `;
                    newsGrid.appendChild(newsCard);
                });
            }

            searchButton.addEventListener('click', performSearch);
            newsSearch.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    performSearch();
                }
            });

            // Gestion des filtres
            const filterButtons = document.querySelectorAll('.filter-btn');
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Retirer la classe active de tous les boutons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    // Ajouter la classe active au bouton cliqué
                    this.classList.add('active');
                    // Filtrer les articles
                    const category = this.getAttribute('data-category');
                    initializeArticles(category);
                });
            });

            // Charger plus d'articles
            const loadMoreBtn = document.getElementById('loadMoreNews');
            loadMoreBtn.addEventListener('click', function() {
                alert('Fonctionnalité de chargement supplémentaire - En développement');
            });

            // Effet de transparence sur l'en-tête au défilement
            window.addEventListener('scroll', function() {
                const header = document.getElementById('header');
                if (window.scrollY > 100) {
                    header.classList.add('header-scrolled');
                } else {
                    header.classList.remove('header-scrolled');
                }
            });

            // Navigation fluide
            document.querySelectorAll('nav a, .footer-section a').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const targetId = this.getAttribute('href');
                    
                    if (targetId && targetId.startsWith('#')) {
                        e.preventDefault();
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
        });

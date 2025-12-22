 document.addEventListener('DOMContentLoaded', function() {
            // Données de test
            const members = [
                { id: 1, nom: "DIOP", prenom: "Cheikh Ahmed", telephone: "77 123 45 67", quartier: "Grand-Yoff Centre", type: "Administrateur", statut: "Actif" },
                { id: 2, nom: "FALL", prenom: "Mamadou", telephone: "70 234 56 78", quartier: "Zone de Captage", type: "SG/CMA", statut: "Actif" },
                { id: 3, nom: "NDIAYE", prenom: "Omar", telephone: "76 345 67 89", quartier: "Sicap Grand-Yoff", type: "Trésorier", statut: "Actif" },
                { id: 4, nom: "SOW", prenom: "Aminata", telephone: "78 456 78 90", quartier: "Cité Air Afrique", type: "Responsable", statut: "Actif" },
                { id: 5, nom: "DIALLO", prenom: "Fatou", telephone: "77 567 89 01", quartier: "Yoff Ngaparou", type: "Responsable", statut: "Actif" },
                { id: 6, nom: "MBAYE", prenom: "Abdoulaye", telephone: "70 678 90 12", quartier: "Patte d'Oie", type: "Membre", statut: "Inactif" }
            ];

            const adhesions = [
                { id: 1, date: "2025-12-13", nom: "SARR", prenom: "Moussa", telephone: "77 789 01 23", quartier: "Ouakam", motivation: "Souhaite contribuer aux activités communautaires", statut: "En attente" },
                { id: 2, date: "2025-12-12", nom: "DIOUF", prenom: "Khady", telephone: "76 890 12 34", quartier: "Mermoz", motivation: "Intéressée par les formations islamiques", statut: "En attente" },
                { id: 3, date: "2025-12-11", nom: "SENE", prenom: "Mariama", telephone: "78 901 23 45", quartier: "HLM Grand-Yoff", motivation: "Veut participer aux projets sociaux", statut: "Approuvée" },
                { id: 4, date: "2025-12-10", nom: "BA", prenom: "Ibrahim", telephone: "77 012 34 56", quartier: "Autre", motivation: "Nouveau dans la ville", statut: "Refusée" }
            ];

            const articles = [
                { id: 1, titre: "Préparation du Grand Magal 2025", categorie: "Événement", auteur: "Admin", date: "2025-12-10", statut: "Publié" },
                { id: 2, titre: "Assemblée générale annuelle", categorie: "Réunion", auteur: "SG", date: "2025-12-07", statut: "Publié" },
                { id: 3, titre: "Atelier de formation", categorie: "Formation", auteur: "Responsable", date: "2025-12-05", statut: "En attente" },
                { id: 4, titre: "Projet éducatif 2026", categorie: "Projet", auteur: "Admin", date: "2025-12-03", statut: "Brouillon" }
            ];

            const documents = [
                { id: 1, nom: "Statuts CMGYE 2025.pdf", categorie: "Statuts", taille: "2.4 MB", date: "2025-11-15", accès: "Public" },
                { id: 2, nom: "PV Assemblée Générale.docx", categorie: "PV", taille: "1.8 MB", date: "2025-12-05", accès: "Membres seulement" },
                { id: 3, nom: "Rapport financier 2025.xlsx", categorie: "Finances", taille: "3.2 MB", date: "2025-11-30", accès: "Administrateurs seulement" },
                { id: 4, nom: "Calendrier activités 2026.pdf", categorie: "Divers", taille: "1.5 MB", date: "2025-12-01", accès: "Public" }
            ];

            // Initialisation
            initializeDateTime();
            initializeNavigation();
            loadMembers();
            loadAdhesions();
            loadArticles();
            loadDocuments();
            initializeCalendar();
            initializeCharts();
            setupEventListeners();

            // Fonctions d'initialisation
            function initializeDateTime() {
                const dateTimeElement = document.getElementById('currentDateTime');
                function updateDateTime() {
                    const now = new Date();
                    const dateStr = now.toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                    const timeStr = now.toLocaleTimeString('fr-FR');
                    dateTimeElement.textContent = `${dateStr} - ${timeStr}`;
                }
                updateDateTime();
                setInterval(updateDateTime, 1000);
            }

            function initializeNavigation() {
                const menuItems = document.querySelectorAll('.admin-menu a');
                const sections = document.querySelectorAll('.admin-section');

                menuItems.forEach(item => {
                    item.addEventListener('click', function(e) {
                        e.preventDefault();
                        
                        // Retirer la classe active de tous les éléments
                        menuItems.forEach(i => i.classList.remove('active'));
                        sections.forEach(s => s.classList.remove('active'));
                        
                        // Ajouter la classe active à l'élément cliqué
                        this.classList.add('active');
                        
                        // Afficher la section correspondante
                        const sectionId = this.getAttribute('data-section');
                        document.getElementById(sectionId).classList.add('active');
                    });
                });
            }

            function loadMembers() {
                const tbody = document.getElementById('membersTableBody');
                tbody.innerHTML = '';
                
                members.forEach(member => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${member.id}</td>
                        <td><strong>${member.nom} ${member.prenom}</strong></td>
                        <td>${member.telephone}</td>
                        <td>${member.quartier}</td>
                        <td><span class="status-badge ${member.type === 'Administrateur' ? 'status-active' : 'status-pending'}">${member.type}</span></td>
                        <td><span class="status-badge ${member.statut === 'Actif' ? 'status-active' : 'status-rejected'}">${member.statut}</span></td>
                        <td class="action-buttons">
                            <button class="action-btn edit" onclick="editMember(${member.id})" title="Modifier">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="action-btn delete" onclick="deleteMember(${member.id})" title="Supprimer">
                                <i class="fas fa-trash"></i>
                            </button>
                            <button class="action-btn ${member.statut === 'Actif' ? 'reject' : 'approve'}" 
                                    onclick="toggleMemberStatus(${member.id})" 
                                    title="${member.statut === 'Actif' ? 'Désactiver' : 'Activer'}">
                                <i class="fas ${member.statut === 'Actif' ? 'fa-user-slash' : 'fa-user-check'}"></i>
                            </button>
                        </td>
                    `;
                    tbody.appendChild(row);
                });
            }

            function loadAdhesions() {
                const tbody = document.getElementById('adhesionsTableBody');
                tbody.innerHTML = '';
                
                adhesions.forEach(adhesion => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${adhesion.date}</td>
                        <td><strong>${adhesion.nom} ${adhesion.prenom}</strong></td>
                        <td>${adhesion.telephone}</td>
                        <td>${adhesion.quartier}</td>
                        <td>${adhesion.motivation.substring(0, 50)}...</td>
                        <td><span class="status-badge ${adhesion.statut === 'En attente' ? 'status-pending' : adhesion.statut === 'Approuvée' ? 'status-active' : 'status-rejected'}">${adhesion.statut}</span></td>
                        <td class="action-buttons">
                            ${adhesion.statut === 'En attente' ? `
                                <button class="action-btn approve" onclick="approveAdhesion(${adhesion.id})" title="Accepter">
                                    <i class="fas fa-check"></i>
                                </button>
                                <button class="action-btn reject" onclick="rejectAdhesion(${adhesion.id})" title="Refuser">
                                    <i class="fas fa-times"></i>
                                </button>
                            ` : ''}
                            <button class="action-btn edit" onclick="viewAdhesion(${adhesion.id})" title="Voir détails">
                                <i class="fas fa-eye"></i>
                            </button>
                        </td>
                    `;
                    tbody.appendChild(row);
                });
            }

            function loadArticles() {
                const tbody = document.getElementById('articlesTableBody');
                tbody.innerHTML = '';
                
                articles.forEach(article => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${article.titre}</td>
                        <td><span class="status-badge status-pending">${article.categorie}</span></td>
                        <td>${article.auteur}</td>
                        <td>${article.date}</td>
                        <td><span class="status-badge ${article.statut === 'Publié' ? 'status-active' : article.statut === 'En attente' ? 'status-pending' : 'status-rejected'}">${article.statut}</span></td>
                        <td class="action-buttons">
                            <button class="action-btn edit" onclick="editArticle(${article.id})" title="Modifier">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="action-btn delete" onclick="deleteArticle(${article.id})" title="Supprimer">
                                <i class="fas fa-trash"></i>
                            </button>
                            ${article.statut === 'En attente' ? `
                                <button class="action-btn approve" onclick="publishArticle(${article.id})" title="Publier">
                                    <i class="fas fa-check"></i>
                                </button>
                            ` : article.statut === 'Publié' ? `
                                <button class="action-btn reject" onclick="unpublishArticle(${article.id})" title="Dépublier">
                                    <i class="fas fa-times"></i>
                                </button>
                            ` : ''}
                        </td>
                    `;
                    tbody.appendChild(row);
                });
            }

            function loadDocuments() {
                const tbody = document.getElementById('documentsTableBody');
                tbody.innerHTML = '';
                
                documents.forEach(doc => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td><i class="fas fa-file-pdf" style="color: #e74c3c;"></i> ${doc.nom}</td>
                        <td>${doc.categorie}</td>
                        <td>${doc.taille}</td>
                        <td>${doc.date}</td>
                        <td><span class="status-badge status-pending">${doc.accès}</span></td>
                        <td class="action-buttons">
                            <button class="action-btn edit" onclick="downloadDocument(${doc.id})" title="Télécharger">
                                <i class="fas fa-download"></i>
                            </button>
                            <button class="action-btn delete" onclick="deleteDocument(${doc.id})" title="Supprimer">
                                <i class="fas fa-trash"></i>
                            </button>
                            <button class="action-btn edit" onclick="shareDocument(${doc.id})" title="Partager">
                                <i class="fas fa-share-alt"></i>
                            </button>
                        </td>
                    `;
                    tbody.appendChild(row);
                });
            }

            function initializeCalendar() {
                const calendarEl = document.getElementById('adminCalendar');
                const calendar = new FullCalendar.Calendar(calendarEl, {
                    initialView: 'dayGridMonth',
                    locale: 'fr',
                    headerToolbar: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,listMonth'
                    },
                    editable: true,
                    events: [
                        {
                            title: 'Réunion des responsables',
                            start: '2025-12-15T10:00:00',
                            end: '2025-12-15T12:00:00',
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
                            title: 'Formation bénévoles',
                            start: '2025-12-28T14:00:00',
                            end: '2025-12-28T17:00:00',
                            backgroundColor: 'var(--info)'
                        }
                    ],
                    eventClick: function(info) {
                        showEventModal(info.event);
                    },
                    dateClick: function(info) {
                        showAddEventModal(info.dateStr);
                    }
                });
                calendar.render();
            }

            function initializeCharts() {
                // Chart.js pour les statistiques
                const quartierCtx = document.getElementById('quartierChart').getContext('2d');
                new Chart(quartierCtx, {
                    type: 'bar',
                    data: {
                        labels: ['Grand-Yoff Centre', 'HLM', 'Yoff Ngaparou', 'Sicap', 'Cité Air Afrique', 'Zone Captage', 'Patte d\'Oie', 'Ouakam', 'Mermoz', 'Autres'],
                        datasets: [{
                            label: 'Nombre de membres',
                            data: [215, 180, 195, 170, 145, 160, 125, 135, 110, 90],
                            backgroundColor: 'var(--primary)',
                            borderColor: 'var(--secondary)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                display: false
                            }
                        }
                    }
                });

                const accountTypeCtx = document.getElementById('accountTypeChart').getContext('2d');
                new Chart(accountTypeCtx, {
                    type: 'doughnut',
                    data: {
                        labels: ['Administrateurs', 'SG/CMA', 'Responsables', 'Membres'],
                        datasets: [{
                            data: [5, 12, 25, 1205],
                            backgroundColor: [
                                'var(--primary)',
                                'var(--secondary)',
                                'var(--accent)',
                                'var(--info)'
                            ]
                        }]
                    }
                });
            }

            function setupEventListeners() {
                // Déconnexion
                document.getElementById('logoutBtn').addEventListener('click', function() {
                    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
                        window.location.href = 'index.html';
                    }
                });

                // Export membres
                document.getElementById('exportMembersBtn').addEventListener('click', function() {
                    alert('Export des membres au format Excel - En cours de développement');
                });

                // Ajout membre
                document.getElementById('addMemberBtn').addEventListener('click', function() {
                    alert('Formulaire d\'ajout de membre - En cours de développement');
                });

                // Recherche membres
                document.getElementById('memberSearch').addEventListener('input', function(e) {
                    const searchTerm = e.target.value.toLowerCase();
                    // Filtrer les membres en fonction du terme de recherche
                });

                // Actualiser adhésions
                document.getElementById('refreshAdhesionsBtn').addEventListener('click', function() {
                    loadAdhesions();
                    alert('Liste des adhésions actualisée');
                });

                // Ajout événement
                document.getElementById('addEventBtn').addEventListener('click', function() {
                    showAddEventModal();
                });

                // Nouvel article
                document.getElementById('newArticleBtn').addEventListener('click', function() {
                    document.getElementById('articleEditor').style.display = 'block';
                    document.getElementById('articlesList').style.display = 'none';
                });

                // Annuler article
                document.getElementById('cancelArticleBtn').addEventListener('click', function() {
                    document.getElementById('articleEditor').style.display = 'none';
                    document.getElementById('articlesList').style.display = 'block';
                });

                // Sauvegarder article
                document.getElementById('saveArticleBtn').addEventListener('click', function() {
                    const title = document.getElementById('articleTitle').value;
                    const category = document.getElementById('articleCategory').value;
                    const content = document.getElementById('articleContent').innerHTML;
                    
                    if (!title || !category || !content) {
                        alert('Veuillez remplir tous les champs obligatoires');
                        return;
                    }
                    
                    alert('Article publié avec succès !');
                    document.getElementById('articleEditor').style.display = 'none';
                    document.getElementById('articlesList').style.display = 'block';
                    loadArticles();
                });

                // Upload document
                document.getElementById('uploadDocBtn').addEventListener('click', function() {
                    document.getElementById('uploadForm').style.display = 'block';
                });

                // Annuler upload
                document.getElementById('cancelUploadBtn').addEventListener('click', function() {
                    document.getElementById('uploadForm').style.display = 'none';
                });

                // Sauvegarder document
                document.getElementById('saveDocBtn').addEventListener('click', function() {
                    const title = document.getElementById('docTitle').value;
                    const category = document.getElementById('docCategory').value;
                    const file = document.getElementById('docFile').files[0];
                    
                    if (!title || !category || !file) {
                        alert('Veuillez remplir tous les champs obligatoires');
                        return;
                    }
                    
                    alert('Document uploadé avec succès !');
                    document.getElementById('uploadForm').style.display = 'none';
                    loadDocuments();
                });

                // Export statistiques
                document.getElementById('exportStatsBtn').addEventListener('click', function() {
                    alert('Export des statistiques au format PDF - En cours de développement');
                });

                // Sauvegarder paramètres
                document.getElementById('saveSettingsBtn').addEventListener('click', function() {
                    alert('Paramètres sauvegardés avec succès !');
                });

                // Éditeur d'article
                document.querySelectorAll('.editor-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const command = this.getAttribute('data-command');
                        const value = this.getAttribute('data-value');
                        document.execCommand(command, false, value);
                    });
                });
            }

            // Fonctions de gestion des membres
            window.editMember = function(id) {
                alert(`Modifier le membre ID: ${id} - En cours de développement`);
            };

            window.deleteMember = function(id) {
                if (confirm('Êtes-vous sûr de vouloir supprimer ce membre ? Cette action est irréversible.')) {
                    alert(`Membre ID: ${id} supprimé avec succès`);
                    // Ici, normalement, on enverrait une requête au serveur
                }
            };

            window.toggleMemberStatus = function(id) {
                alert(`Changer le statut du membre ID: ${id} - En cours de développement`);
            };

            // Fonctions de gestion des adhésions
            window.approveAdhesion = function(id) {
                if (confirm('Accepter cette demande d\'adhésion ?')) {
                    alert(`Demande ID: ${id} acceptée. Le membre sera notifié par SMS.`);
                    // Ici, normalement, on enverrait une requête au serveur
                }
            };

            window.rejectAdhesion = function(id) {
                const reason = prompt('Veuillez indiquer la raison du refus :');
                if (reason) {
                    alert(`Demande ID: ${id} refusée. Raison: ${reason}`);
                    // Ici, normalement, on enverrait une requête au serveur
                }
            };

            window.viewAdhesion = function(id) {
                alert(`Voir les détails de la demande ID: ${id} - En cours de développement`);
            };

            // Fonctions de gestion des articles
            window.editArticle = function(id) {
                alert(`Modifier l'article ID: ${id} - En cours de développement`);
            };

            window.deleteArticle = function(id) {
                if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
                    alert(`Article ID: ${id} supprimé avec succès`);
                    // Ici, normalement, on enverrait une requête au serveur
                }
            };

            window.publishArticle = function(id) {
                if (confirm('Publier cet article ?')) {
                    alert(`Article ID: ${id} publié avec succès`);
                    // Ici, normalement, on enverrait une requête au serveur
                }
            };

            window.unpublishArticle = function(id) {
                if (confirm('Dépublier cet article ?')) {
                    alert(`Article ID: ${id} dépublié avec succès`);
                    // Ici, normalement, on enverrait une requête au serveur
                }
            };

            // Fonctions de gestion des documents
            window.downloadDocument = function(id) {
                alert(`Télécharger le document ID: ${id} - En cours de développement`);
            };

            window.deleteDocument = function(id) {
                if (confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) {
                    alert(`Document ID: ${id} supprimé avec succès`);
                    // Ici, normalement, on enverrait une requête au serveur
                }
            };

            window.shareDocument = function(id) {
                alert(`Partager le document ID: ${id} - En cours de développement`);
            };

            // Fonctions pour le calendrier
            function showEventModal(event) {
                alert(`Événement: ${event.title}\nDate: ${event.start.toLocaleDateString('fr-FR')}\n\nOptions: Modifier | Supprimer | Dupliquer`);
            }

            function showAddEventModal(date) {
                const eventTitle = prompt('Titre de l\'événement :');
                if (eventTitle) {
                    const eventDate = date || prompt('Date de l\'événement (YYYY-MM-DD) :');
                    if (eventDate) {
                        alert(`Nouvel événement créé :\nTitre: ${eventTitle}\nDate: ${eventDate}`);
                        // Ici, normalement, on ajouterait l'événement au calendrier
                    }
                }
            }
        });
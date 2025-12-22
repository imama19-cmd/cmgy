 document.addEventListener('DOMContentLoaded', function () {
            const connexionForm = document.getElementById('connexionForm');

            // Gestion de la connexion
            connexionForm.addEventListener('submit', function (e) {
                e.preventDefault();

                // Récupération des données
                const identifiant = document.getElementById('identifiant').value;
                const motdepasse = document.getElementById('motdepasse').value;

                // Validation
                if (!identifiant || !motdepasse) {
                    alert('Veuillez remplir tous les champs.');
                    return;
                }

                // Simulation de connexion
                alert('Connexion en cours...\n\nRedirection vers votre tableau de bord.');

                // Ici, normalement, on ferait une requête AJAX vers le serveur
                // Pour cette démo, on simule une redirection après 2 secondes
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            });

            // Gestion du mot de passe oublié
            const forgotLink = document.querySelector('.forgot-link');
            forgotLink.addEventListener('click', function (e) {
                e.preventDefault();
                alert('Fonctionnalité de réinitialisation de mot de passe - En développement\n\nContactez l\'administration au 77 700 00 00');
            });
        });
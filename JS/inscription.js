  document.addEventListener('DOMContentLoaded', function () {
            const inscriptionForm = document.getElementById('inscriptionForm');

            // Gestion de l'inscription
            inscriptionForm.addEventListener('submit', function (e) {
                e.preventDefault();

                // Récupération des données
                const prenom = document.getElementById('prenom').value;
                const nom = document.getElementById('nom').value;
                const telephone = document.getElementById('telephone').value;
                const quartier = document.getElementById('quartier').value;

                // Validation
                if (!prenom || !nom || !telephone || !quartier) {
                    alert('Veuillez remplir tous les champs obligatoires (*).');
                    return;
                }

                // Validation du numéro de téléphone (Sénégal)
                const phoneRegex = /^(77|70|76|78)[0-9]{7}$/;
                if (!phoneRegex.test(telephone.replace(/\s/g, ''))) {
                    alert('Veuillez entrer un numéro de téléphone sénégalais valide (ex: 77 123 45 67)');
                    return;
                }

                // Simuler l'envoi
                alert('Votre demande d\'adhésion a été envoyée avec succès !\n\nVous recevrez un SMS de confirmation sous 48 heures.\n\nL\'administrateur définira votre type de compte après validation.');

                // Redirection vers la page de connexion après 3 secondes
                setTimeout(() => {
                    window.location.href = 'connexion.html';
                }, 3000);
            });

            // Formater le numéro de téléphone
            const telephoneInput = document.getElementById('telephone');
            telephoneInput.addEventListener('input', function (e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 0) {
                    value = value.match(/.{1,2}/g).join(' ');
                }
                e.target.value = value;
            });
        });
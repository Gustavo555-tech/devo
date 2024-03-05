// Voeg een eventlistener toe voor het meldingenicoon
document.getElementById("nav-notifications-btn").addEventListener("click", function () {
    // Toon of verberg het meldingencontainer wanneer het icoon wordt ingedrukt
    const notificationsContainer = document.getElementById("notifications-container");

    // Toggle de 'hidden' class om het container te tonen/verbergen
    notificationsContainer.classList.toggle("hidden");

    // Als het container wordt getoond, haal meldingen op van de server en vul het meldingencontainer
    if (!notificationsContainer.classList.contains("hidden")) {
        fetch('http://localhost:5500/api/notifications')
            .then(response => response.json())
            .then(notifications => {
                // Vul het meldingencontainer met de opgehaalde meldingen
                notificationsContainer.innerHTML = buildNotificationsHTML(notifications);
            })
            .catch(error => console.error('Error:', error));
    }
});

// Functie om HTML voor meldingen op te bouwen
function buildNotificationsHTML(notifications) {
    let html = '<ul>';
    notifications.forEach(notification => {
        html += `<li>${notification.message}</li>`;
    });
    html += '</ul>';
    return html;
}

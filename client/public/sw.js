console.log("Service Worker Loaded...");

self.addEventListener("push", e => {
    const data = e.data.json();
    console.log("Push Recieved...");
    self.registration.showNotification(data.title, {
        body: "Crypto Market Analysis!",
        icon: "https://www.nasdaq.com/sites/acquia.prod/files/styles/720x400/public/2021/05/07/cryptocurrency-Nuthawut-adobe.jpg?h=6acbff97&itok=kyPXtQ0N"
    });
});
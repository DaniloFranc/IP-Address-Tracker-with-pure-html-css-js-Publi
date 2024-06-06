document.addEventListener("DOMContentLoaded", function() {
    let map;
    let marker;

    
    function fetchIPData(ip = '') {
        let url = ip ? `https://ipapi.co/${ip}/json/` : 'https://ipapi.co/json/';
        
        fetch(url)
            .then(response => response.json())
            .then(data => {

                let utcOffset = data.utc_offset;
                let formattedOffset = utcOffset.slice(0, -2) + ':' + utcOffset.slice(-2);

                document.getElementById('ip').textContent = data.ip;
                document.getElementById('location').textContent = `${data.city}, ${data.region_code}, ${data.country_code}`;
                document.getElementById('timezone').textContent = 'UTC ' + formattedOffset;
                document.getElementById('isp').textContent = data.org;

                

               
                if (!map) {
                    
                    map = L.map('mapa', { zoomControl: false }).setView([data.latitude, data.longitude], 13);
                    
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    }).addTo(map);

                    var customIcon = L.icon({
                        iconUrl: 'icons/icon-location.svg',
                    });

                    marker = L.marker([data.latitude, data.longitude], { icon: customIcon }).addTo(map)
                        
                } else {
                    
                    
                    map.setView([data.latitude, data.longitude], 13);
                    marker.setLatLng([data.latitude, data.longitude])
                        .setPopupContent(`<b>${data.city}, ${data.region}, ${data.country_name}</b><br>IP: ${data.ip}`)
                        

                }
            })
            .catch(error => console.error('Error fetching IP data:', error));
    }

    
    fetchIPData();

    
    document.querySelector('.botao').addEventListener('click', function() {
        const ipInput = document.getElementById('ipnumber');
        if (ipInput.value) {
            fetchIPData(ipInput.value);
        }
        ipInput.value = ''; // Limpa o campo de entrada
    });

});

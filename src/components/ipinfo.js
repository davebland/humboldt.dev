// Query ipinfo.io for user's IP address data

export function getUserIp() {
    fetch('ipinfo.io/?token=3a3dca25b42d5e')
        .then((prom) => {
            if (prom.ok) {
                return prom.json();
            }
        })
        .then((response) => {
            console.log(response);
        })
}
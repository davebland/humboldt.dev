// Query ipinfo.io for user's IP address data

const AUTHPARAMS = "token=3a3dca25b42d5e"
const BASEURL = "https://ipinfo.io/"

export function getUserIp() {
    // Make a basic call to ipinfo and return user IP from response
    let ip = fetch(BASEURL+'?'+AUTHPARAMS)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                })
                .then((json) => {                    
                    return json['ip'];
                })
                .catch((e) => {
                    console.log("API Error: " + e);
                    return 'Not found'
                })
    return ip
}
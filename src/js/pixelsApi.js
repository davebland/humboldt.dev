// Methods to interface with pixels backend api

export async function getAllPixels() {
    // Retrieve coordinates & rgba values for all existing pixels on the canvas
    let data = fetch('https://api.humboldt.dev/pixels/all')
        .then((response) => {
            if (response.ok)
                return response.json();
            else
                throw response;
        })
        .then((jsonArray) => {
            console.log(jsonArray);
            jsonArray.forEach((item) => {
                // Expand the 6 digits out to x,y coordinates of 3 digits each
                let cords = Array.from(String(item['coordinates']));
                item['x'] = Number(cords.slice(0,3).reduce((prev,cur) => prev+cur));
                item['y'] = Number(cords.slice(3,7).reduce((prev,cur) => prev+cur));
            });
            return jsonArray;
        })
        .catch((e) => console.log(e));
    return data
}

export async function getPixelData(pixelCoords) {
    // Retrieve data for pixel at pixelCoords
    let data = fetch('https://api.humboldt.dev/pixels/data?'+pixelCoords)
        .then((response) => {
            if (response.ok)
                return response.json();
            else
                throw response;
        })
        .then((jsonArray) => {
            console.log(jsonArray);           
            return jsonArray;
        })
        .catch((e) => console.log(e));
    return data
}

export async function sendNewPixel(pixelData) {
    console.log(pixelData);
    // Send new pixel data to api'
    let result = fetch('https://api.humboldt.dev/pixels/new', {
        "method":"POST",
        "body": JSON.stringify({
            coordinates: 333333,
            rgba: [
                pixelData['pixelColour'][0],
                pixelData['pixelColour'][1],
                pixelData['pixelColour'][2],
                Math.round(pixelData['pixelColour'][3]*100),
            ]
            })
        })
        .catch((e) => console.log(e));
    return result
}
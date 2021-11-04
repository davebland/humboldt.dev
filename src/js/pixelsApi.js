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
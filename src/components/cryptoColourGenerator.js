// Create a colour using digest of pixel data

const sumReducer = (prev, cur) => (prev + cur);

export async function calculatePixelColour(infoObject) {
    const bytearray = new TextEncoder().encode(JSON.stringify(infoObject));
    const hash = await crypto.subtle.digest('SHA-256', bytearray);
    const hashArray = Array.from(new Uint8Array(hash)); 
    // Group hash array into 4 & average to get rgba values
    let rgba = [0,0,0,0]
    rgba[0] = Math.round(hashArray.slice(0,8).reduce(sumReducer) / 8)
    rgba[1] = Math.round(hashArray.slice(8,16).reduce(sumReducer) / 8)
    rgba[2] = Math.round(hashArray.slice(16,24).reduce(sumReducer) / 8)
    rgba[3] = hashArray.slice(24,32).reduce(sumReducer) / 1000
    return rgba
}
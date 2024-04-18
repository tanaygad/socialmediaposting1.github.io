const Jimp = require('jimp');
const fetch = require('node-fetch');

const postToInsta = async () => {
    try {
        const image = await Jimp.read({ url: 'https://clubartizen.com/wp-content/uploads/2023/09/PI-GND-Gond-box-7.png' });        

        const overlay = await Jimp.read({url:'https://github.com/Samarth23-sudo/ClubArtizen/blob/main/Club%20Artizen%20Logo%20Circle.png?raw=true'});
        
        if (!image || !overlay) {
            throw new Error('Failed to load images.');
        }
        width=600;
        height=600;
        aspect_ratio = 1;
        //await additionalImage.resize(100,100,Jimp.RESIZE_NEAREST_NEIGHBOR);
        await image.resize(width, height, Jimp.RESIZE_NEAREST_NEIGHBOR).quality(100);

        overlay.resize(width/6.5, width/6.5).quality(100);

        image.composite(overlay, 0, 0, {
            mode: Jimp.BLEND_SOURCE_OVER,
            opacityDest: 1,
            opacitySource: 1
        });

        await image.writeAsync("result.jpg");

    } catch (error) {
        console.error('Error:', error.message);
    }
};

postToInsta()
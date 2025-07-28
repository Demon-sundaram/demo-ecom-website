const https = require('https');
const fs = require('fs');

const images = {
    'images/denim-jacket.jpg': 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=600',
    'images/chinos.jpg': 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=600',
    'images/polo-shirt.jpg': 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=600',
    'images/sneakers.jpg': 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=600',
    'images/summer-dress.jpg': 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600',
    'images/high-waist-jeans.jpg': 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600',
    'images/leather-handbag.jpg': 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600',
    'images/blazer.jpg': 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600'
};

Object.entries(images).forEach(([filename, url]) => {
    https.get(url, (response) => {
        const fileStream = fs.createWriteStream(filename);
        response.pipe(fileStream);
        
        fileStream.on('finish', () => {
            console.log(`Downloaded: ${filename}`);
            fileStream.close();
        });
    }).on('error', (err) => {
        console.error(`Error downloading ${filename}: ${err.message}`);
    });
}); 
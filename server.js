const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3006;

// Serve static files from public directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// API to get all images with URLs
app.get('/api/images', (req, res) => {
    const imagesDir = path.join(__dirname, 'public/uploads/images');
    
    fs.readdir(imagesDir, (err, files) => {
        if (err) {
            return res.status(500).json({ 
                success: false, 
                error: 'Images directory not found' 
            });
        }

        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const images = files
            .filter(file => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file))
            .map(file => ({
                filename: file,
                url: `${baseUrl}/public/uploads/images/${file}`,
                path: `/public/uploads/images/${file}`
            }));

        res.json({
            success: true,
            data: images
        });
    });
});

// API to get specific image info
app.get('/api/images/:filename', (req, res) => {
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, 'public/uploads/images', filename);
    
    // Check if file exists
    if (!fs.existsSync(imagePath)) {
        return res.status(404).json({
            success: false,
            error: 'Image not found'
        });
    }

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    
    res.json({
        success: true,
        data: {
            filename: filename,
            url: `${baseUrl}/public/uploads/images/${filename}`,
            path: `/public/uploads/images/${filename}`,
            fullServerPath: imagePath
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Images served from: /public/uploads/images/`);
});
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3006;

// Serve static files from public directory
app.use('/public', express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Images served from: /public/uploads/images/`);
});
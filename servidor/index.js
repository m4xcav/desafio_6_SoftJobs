require('dotenv').config();
const app = require('./src/app');

const { PORT } = process.env;

app.listen(PORT, () => {
	console.log(`Server is running on http://127.0.0.1:${PORT}`);
});

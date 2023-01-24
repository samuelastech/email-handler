import app from '../app.js';
import database from '../config/mongoose.js';

database.on('error', (error) => console.log("Database isn't connected :( \n\n", error));
database.on('connected', () => console.log('Database connected!'));

const PORT = process.env.SERVER_PORT;

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
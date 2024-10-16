// app.js
const express = require("express");
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const seedDatabase = require('./databaseControl/seedDatabase')
dotenv.config();

const db = require('./models');

const accountRoutesPublic = require('./routes/public/accountRoutes');
const userRoutes = require('./routes/protected/userRoutes');
const gradeRoutesPublic = require('./routes/public/gradeRoutes')
const cateogryRoutesPublic = require('./routes/public/categoryRoutes')
const threadRoutes = require('./routes/protected/threadRoutes')
const threadRoutesPublic = require('./routes/public/threadRoutes')
const commentRoutes = require('./routes/protected/commentRoutes')
const gradeRoutes = require('./routes/protected/gradeRoutes')
const cateogryRoutes = require('./routes/protected/categoryRoutes')
const roleRoutes = require('./routes/protected/roleRoutes')

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true 
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/account', accountRoutesPublic);
app.use('/api/user', userRoutes)
app.use('/api/grade', gradeRoutesPublic)
app.use('/api/grade', gradeRoutes)
app.use('/api/category', cateogryRoutesPublic)
app.use('/api/category', cateogryRoutes)
app.use('/api/thread', threadRoutes)
app.use('/api/thread', threadRoutesPublic)
app.use('/api/thread/comment', commentRoutes)
app.use('/api/role', roleRoutes)

db.sequelize.sync({ force: false }).then(async () => {
    await seedDatabase();
    app.listen(process.env.PORT, () => {
        console.log(`Database server is running on port: ${process.env.PORT}`);
    });
});

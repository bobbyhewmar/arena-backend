import express from 'express';
import { accountRoutes, rankingRoutes } from './routes';

const app = express();

app.use(express.json());  // Certifique-se de que o middleware JSON está aqui

app.use('/auth', accountRoutes);

app.use('/ranking', rankingRoutes);

const PORT = process.env.EXTERNAL_PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

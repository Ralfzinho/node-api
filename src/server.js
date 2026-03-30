import app from "./app.js";
import { initDatabase } from "./config/database.js";

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  try {
    await initDatabase();
    app.listen(PORT, () => {
      console.log(`API rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao conectar no banco de dados:", error.message);
    process.exit(1);
  }
}

bootstrap();

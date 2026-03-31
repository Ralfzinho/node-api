import { Buysell } from "../models/buysell.js";
import { getRepository } from "../config/database.js";

export async function listBuysells() {
  const repo = getRepository(Buysell);
  return repo.find({
    relations: ["user", "game"],
  });
}

export async function getBuysellById(id) {
  const repo = getRepository(Buysell);
  return repo.findOne({
    where: { id },
    relations: ["user", "game"],
  });
}

export async function listBuysellsByUserId(userId) {
  const repo = getRepository(Buysell);
  return repo.find({
    where: { userId },
    relations: ["user", "game"],
  });
}

export async function listBuysellsByGameId(gameId) {
  const repo = getRepository(Buysell);
  return repo.find({
    where: { gameId },
    relations: ["user", "game"],
  });
}

export async function createBuysell(data) {
  const repo = getRepository(Buysell);
  const buysell = repo.create(data);
  return repo.save(buysell);
}

export async function updateBuysell(id, data) {
  const repo = getRepository(Buysell);
  await repo.update(id, data);
  return getBuysellById(id);
}

export async function removeBuysell(id) {
  const repo = getRepository(Buysell);
  return repo.delete(id);
}

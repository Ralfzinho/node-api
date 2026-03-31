import { getUserById } from "../repositories/userRepository.js";
import { getGameById } from "../repositories/gameRepository.js";
import {
  listBuysells,
  getBuysellById,
  createBuysell,
  updateBuysell,
  removeBuysell,
  listBuysellsByUserId,
  listBuysellsByGameId,
} from "../repositories/buysellRepository.js";

function parseId(id) {
  const parsed = Number(id);
  if (Number.isNaN(parsed)) {
    return null;
  }
  return parsed;
}

function parsePrice(price) {
  if (price === undefined || price === null || price === "") {
    return undefined;
  }

  const parsed = Number(price);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return undefined;
  }

  return parsed;
}

function parseQuantity(quantity) {
  if (quantity === undefined || quantity === null || quantity === "") {
    return 1;
  }

  const parsed = Number(quantity);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return undefined;
  }

  return parsed;
}

function validateBuysellPayload({
  userId,
  gameId,
  title,
  type,
  price,
  finalPrice,
  quantity,
}) {
  if (!userId || !gameId || !title || !type) {
    return { errorKey: "errors.required_buysell_fields", status: 400 };
  }

  if (!["buy", "sell"].includes(type)) {
    return { errorKey: "errors.invalid_buysell_type", status: 400 };
  }

  const parsedPrice = parsePrice(price);
  if (parsedPrice === undefined) {
    return { errorKey: "errors.invalid_price", status: 400 };
  }

  const parsedFinalPrice = parsePrice(finalPrice);
  if (parsedFinalPrice === undefined) {
    return { errorKey: "errors.invalid_final_price", status: 400 };
  }

  const parsedQuantity = parseQuantity(quantity);
  if (parsedQuantity === undefined) {
    return { errorKey: "errors.invalid_quantity", status: 400 };
  }

  return { parsedPrice, parsedFinalPrice, parsedQuantity };
}

export async function findAllBuysells() {
  return listBuysells();
}

export async function findBuysellById(id) {
  return getBuysellById(id);
}

export async function findBuysellsByUserId(userId) {
  return listBuysellsByUserId(userId);
}

export async function findBuysellsByGameId(gameId) {
  return listBuysellsByGameId(gameId);
}

export async function registerBuysell(payload) {
  const validation = validateBuysellPayload(payload);
  if (validation.errorKey) {
    return validation;
  }

  const userId = parseId(payload.userId);
  const gameId = parseId(payload.gameId);

  if (userId === null || gameId === null) {
    return { errorKey: "errors.invalid_id", status: 400 };
  }

  const user = await getUserById(userId);
  if (!user) {
    return { errorKey: "errors.user_not_found", status: 404 };
  }

  const game = await getGameById(gameId);
  if (!game) {
    return { errorKey: "errors.game_not_found", status: 404 };
  }

  const newBuysell = await createBuysell({
    userId,
    gameId,
    title: payload.title,
    description: payload.description || null,
    type: payload.type,
    price: validation.parsedPrice,
    finalPrice: validation.parsedFinalPrice,
    quantity: validation.parsedQuantity,
    image: payload.image || null,
    status: payload.status || "active",
  });

  return { data: newBuysell, status: 201 };
}

export async function editBuysell(id, payload) {
  const buysell = await findBuysellById(id);
  if (!buysell) {
    return { errorKey: "errors.buysell_not_found", status: 404 };
  }

  const updateData = {};

  if (payload.title) {
    updateData.title = payload.title;
  }

  if (payload.description !== undefined) {
    updateData.description = payload.description;
  }

  if (payload.type) {
    if (!["buy", "sell"].includes(payload.type)) {
      return { errorKey: "errors.invalid_buysell_type", status: 400 };
    }
    updateData.type = payload.type;
  }

  if (payload.price !== undefined) {
    const parsedPrice = parsePrice(payload.price);
    if (parsedPrice === undefined) {
      return { errorKey: "errors.invalid_price", status: 400 };
    }
    updateData.price = parsedPrice;
  }

  if (payload.finalPrice !== undefined) {
    const parsedFinalPrice = parsePrice(payload.finalPrice);
    if (parsedFinalPrice === undefined) {
      return { errorKey: "errors.invalid_final_price", status: 400 };
    }
    updateData.finalPrice = parsedFinalPrice;
  }

  if (payload.quantity !== undefined) {
    const parsedQuantity = parseQuantity(payload.quantity);
    if (parsedQuantity === undefined) {
      return { errorKey: "errors.invalid_quantity", status: 400 };
    }
    updateData.quantity = parsedQuantity;
  }

  if (payload.image !== undefined) {
    updateData.image = payload.image;
  }

  if (payload.status) {
    if (!["active", "sold", "closed"].includes(payload.status)) {
      return { errorKey: "errors.invalid_buysell_status", status: 400 };
    }
    updateData.status = payload.status;
  }

  const updated = await updateBuysell(id, updateData);
  return { data: updated, status: 200 };
}

export async function deleteBuysell(id) {
  const buysell = await findBuysellById(id);
  if (!buysell) {
    return { errorKey: "errors.buysell_not_found", status: 404 };
  }

  await removeBuysell(id);
  return { status: 204 };
}

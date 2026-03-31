import {
  findAllBuysells,
  findBuysellById,
  findBuysellsByUserId,
  findBuysellsByGameId,
  registerBuysell,
  editBuysell,
  deleteBuysell,
} from "../services/buysellService.js";

function parseId(idParam) {
  const id = Number(idParam);
  if (Number.isNaN(id)) {
    return null;
  }
  return id;
}

export async function getBuysells(req, res) {
  try {
    const { userId, gameId } = req.query;

    let buysells;

    if (userId) {
      const parsedUserId = parseId(userId);
      if (parsedUserId === null) {
        return res
          .status(400)
          .json({ message: req.__("errors.invalid_id") });
      }
      buysells = await findBuysellsByUserId(parsedUserId);
    } else if (gameId) {
      const parsedGameId = parseId(gameId);
      if (parsedGameId === null) {
        return res
          .status(400)
          .json({ message: req.__("errors.invalid_id") });
      }
      buysells = await findBuysellsByGameId(parsedGameId);
    } else {
      buysells = await findAllBuysells();
    }

    return res.json(buysells);
  } catch {
    return res.status(500).json({ message: req.__("errors.internal_server") });
  }
}

export async function getBuysell(req, res) {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({ message: req.__("errors.invalid_id") });
  }

  try {
    const buysell = await findBuysellById(id);
    if (!buysell) {
      return res
        .status(404)
        .json({ message: req.__("errors.buysell_not_found") });
    }

    return res.json(buysell);
  } catch {
    return res.status(500).json({ message: req.__("errors.internal_server") });
  }
}

export async function createNewBuysell(req, res) {
  try {
    const result = await registerBuysell(req.body);

    if (result.errorKey) {
      return res
        .status(result.status)
        .json({ message: req.__(result.errorKey) });
    }

    return res.status(result.status).json(result.data);
  } catch {
    return res.status(500).json({ message: req.__("errors.internal_server") });
  }
}

export async function updateExistingBuysell(req, res) {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({ message: req.__("errors.invalid_id") });
  }

  try {
    const result = await editBuysell(id, req.body);

    if (result.errorKey) {
      return res
        .status(result.status)
        .json({ message: req.__(result.errorKey) });
    }

    return res.status(result.status).json(result.data);
  } catch {
    return res.status(500).json({ message: req.__("errors.internal_server") });
  }
}

export async function deleteExistingBuysell(req, res) {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({ message: req.__("errors.invalid_id") });
  }

  try {
    const result = await deleteBuysell(id);

    if (result.errorKey) {
      return res
        .status(result.status)
        .json({ message: req.__(result.errorKey) });
    }

    return res.status(result.status).send();
  } catch {
    return res.status(500).json({ message: req.__("errors.internal_server") });
  }
}
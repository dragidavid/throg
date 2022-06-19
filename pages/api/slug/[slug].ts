import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const slug = req.query.slug;

  if (typeof slug !== "string") {
    res.status(400).json({ error: "Please make sure to provide a valid slug" });

    return;
  }

  const entry = await prisma.shortUrl.findFirst({
    where: {
      slug: slug,
    },
  });

  if (!entry) {
    res.status(404).json({ error: "Slug not found" });

    return;
  }

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=1000000000, stale-while-revalidate");

  res.status(200).json(entry);
}

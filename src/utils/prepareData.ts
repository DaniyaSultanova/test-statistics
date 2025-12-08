type RawVariation = {
  id?: number;
  name: string;
};

type RawDay = {
  date: string;
  visits: Record<string, number | undefined>;
  conversions: Record<string, number | undefined>;
};

type RawData = {
  variations: RawVariation[];
  data: RawDay[];
};

type ChartPoint = {
  date: string;
  [key: string]: number | null | string;
};

export function prepareData(raw: RawData): ChartPoint[] {
  const variationId = raw.variations.map((v) => ({
    ...v,
    id: v.id ? String(v.id) : "0",
  }));

  return raw.data.map((day) => {
    const point: ChartPoint = {
      date: day.date,
    };

    variationId.forEach((v) => {
      const visits = day.visits[v.id];
      const conversions = day.conversions[v.id];

      if (!visits || !conversions) {
        point[v.name] = null;
      } else {
        point[v.name] = Number(((conversions / visits) * 100).toFixed(2));
      }
    });
    return point;
  });
}

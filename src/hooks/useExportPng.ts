import { useCurrentPng } from "recharts-to-png";

export function useExportPng() {
  const [getPng, { ref }] = useCurrentPng();

  const handleExport = async (fileName:string) => {
    const png = await getPng();
    if (!png) return;
    const link = document.createElement("a");
    link.download = fileName;
    link.href = png;
    link.click();
  };

  return { ref, handleExport };
}

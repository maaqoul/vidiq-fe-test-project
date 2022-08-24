import ResponsiveTableElement from "./ResponsiveTableElement";

interface Props {
  id: number;
  content: string;
  trendingKeywords: any;
}
export default function TrendingKeyWordElement({
  id,
  content,
  trendingKeywords,
}: Props): JSX.Element {
  const getTrendingKeywords = (): string => {
    const fire = "🔥";
    if (trendingKeywords.includes(id)) {
      return `${content} ${fire}`;
    }
    return content;
  };

  return <ResponsiveTableElement children={getTrendingKeywords()} primary />;
}

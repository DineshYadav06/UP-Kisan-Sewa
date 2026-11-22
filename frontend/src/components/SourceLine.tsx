type Props = {
  source?: string;
  updatedAt?: string;
  sourceUrl?: string;
  labelSource?: string;
  labelUpdated?: string;
};

export function SourceLine({
  source,
  updatedAt,
  sourceUrl,
  labelSource = "स्रोत",
  labelUpdated = "अंतिम अद्यतन",
}: Props) {
  if (!source && !updatedAt) return null;
  const date = updatedAt ? new Date(updatedAt) : null;
  return (
    <p className="mt-2 border-t border-linen pt-2 text-xs text-grey-03">
      {source && (
        <>
          <span className="font-semibold text-ink">{labelSource}: </span>
          {sourceUrl ? (
            <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
              {source}
            </a>
          ) : (
            source
          )}
          {date ? " · " : null}
        </>
      )}
      {date && (
        <>
          <span className="font-semibold text-ink">{labelUpdated}: </span>
          {date.toLocaleDateString("hi-IN")}
        </>
      )}
    </p>
  );
}

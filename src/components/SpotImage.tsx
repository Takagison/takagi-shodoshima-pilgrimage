import type { Spot } from "@/lib/data";

export function SpotImage({
  spot,
  variant = "thumbnail",
  className = "",
}: {
  spot: Spot;
  variant?: "thumbnail" | "hero";
  className?: string;
}) {
  const src = variant === "hero" ? spot.image.hero : spot.image.thumbnail;

  return (
    <figure className={`overflow-hidden rounded-lg bg-sky-100 ${className}`}>
      <img
        src={src}
        alt={spot.image.alt}
        className="h-full w-full object-cover"
        loading={variant === "hero" ? "eager" : "lazy"}
      />
      <figcaption className="bg-white/90 px-4 py-3 text-xs leading-5 text-slate-500">
        {spot.image.caption} 图片：{spot.image.credit}，{spot.image.license}
      </figcaption>
    </figure>
  );
}

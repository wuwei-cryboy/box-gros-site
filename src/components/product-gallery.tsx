import { useState } from "react";
import { cn } from "@/lib/cn";

export function ProductGallery({ src, gallery, alt, className }: { src: string; gallery?: string[]; alt: string; className?: string }) {
  const images = gallery && gallery.length > 0 ? gallery : [src];
  const [active, setActive] = useState(0);
  const main = images[active] ?? src;

  if (images.length === 1) {
    return <img src={main} alt={alt} className={cn("aspect-square w-full object-cover", className)} />;
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <img src={main} alt={alt} className="aspect-square w-full object-cover" />
      <div className="flex gap-2 overflow-x-auto scroll-clean">
        {images.map((image, index) => {
          if (index > 0 && image === images[0]) return null;
          return (
            <button
              key={image}
              type="button"
              onClick={() => setActive(index)}
              className={cn(
                "shrink-0 border p-0.5 transition-opacity",
                index === active ? "border-primary" : "border-line opacity-60 hover:opacity-100",
              )}
              aria-label={`Photo ${index + 1}`}
            >
              <img src={image} alt="" className="size-16 object-cover" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

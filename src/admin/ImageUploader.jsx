import { useRef, useState } from "react";
import { Image, LoaderCircle, Upload, X } from "lucide-react";
import { getSupabaseClient } from "../../lib/supabase";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/svg+xml",
  "image/avif",
]);

function formatBytes(bytes) {
  return bytes < 1024 * 1024
    ? `${(bytes / 1024).toFixed(0)} KB`
    : `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getImageType(file) {
  const supportedTypes = {
    "image/png": "image/png",
    "image/jpeg": "image/jpeg",
    "image/webp": "image/webp",
    "image/svg+xml": "image/svg+xml",
    "image/avif": "image/avif",
  };
  if (supportedTypes[file.type]) return supportedTypes[file.type];
  if (file.type) return "";

  const extension = file.name.split(".").pop()?.toLowerCase();
  const extensionTypes = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    webp: "image/webp",
    svg: "image/svg+xml",
    avif: "image/avif",
  };
  return extensionTypes[extension] ?? "";
}

function getFileExtension(type) {
  if (type === "image/svg+xml") return "svg";
  if (type === "image/avif") return "avif";
  if (type === "image/webp") return "webp";
  if (type === "image/png" || type === "image/jpeg") return "webp";
  return "";
}

async function optimizeImage(file, imageType) {
  if (imageType !== "image/png" && imageType !== "image/jpeg") {
    return file;
  }

  const bitmap = await createImageBitmap(file);
  try {
    const longestSide = Math.max(bitmap.width, bitmap.height);
    const scale = Math.min(1, 1600 / longestSide);
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Could not prepare the image for optimization.");
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

    const optimized = await new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => blob
          ? resolve(blob)
          : reject(new Error("Could not convert the image to WebP.")),
        "image/webp",
        0.85,
      );
    });

    return new File(
      [optimized],
      `${file.name.replace(/\.[^.]+$/, "")}.webp`,
      { type: "image/webp", lastModified: Date.now() },
    );
  } finally {
    bitmap.close();
  }
}

function makeSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "project";
}

export default function ImageUploader({
  imageUrl,
  imagePosition,
  imageScale,
  title,
  onChange,
}) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [fileSizes, setFileSizes] = useState(null);
  const [useUrl, setUseUrl] = useState(false);

  async function handleFile(file) {
    if (!file) return;
    setError("");
    setFileSizes(null);

    const imageType = getImageType(file);
    if (!imageType || !ALLOWED_TYPES.has(imageType)) {
      setError("Choose a PNG, JPEG, WebP, SVG, or AVIF image.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("Image must be 5 MB or smaller.");
      return;
    }

    setUploading(true);
    try {
      const optimizedFile = await optimizeImage(file, imageType);
      const outputType = imageType === "image/png" || imageType === "image/jpeg"
        ? "image/webp"
        : imageType;
      const extension = getFileExtension(outputType);
      if (!extension) {
        setError("This image format is not supported.");
        return;
      }

      const path = `projects/${makeSlug(title)}-${Date.now()}.${extension}`;
      const supabase = getSupabaseClient();
      const { error: uploadError } = await supabase.storage
        .from("project-images")
        .upload(path, optimizedFile, {
          cacheControl: "31536000",
          upsert: false,
          contentType: outputType,
        });

      if (uploadError) {
        const message = /row-level security|not authorized|permission|policy/i.test(uploadError.message)
          ? "Not allowed, are you signed in as the admin?"
          : uploadError.message;
        setError(message);
        return;
      }

      const { data } = supabase.storage.from("project-images").getPublicUrl(path);
      onChange(data.publicUrl);
      setFileSizes({ before: file.size, after: optimizedFile.size });
    } catch (uploadError) {
      console.error("Project image upload failed.", uploadError);
      const message = /not authorized|permission|row-level security|policy/i.test(uploadError.message)
        ? "Not allowed, are you signed in as the admin?"
        : uploadError.message || "Image upload failed. Please try again.";
      setError(message);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function handleDrop(event) {
    event.preventDefault();
    setDragging(false);
    handleFile(event.dataTransfer.files?.[0]);
  }

  return (
    <div className="space-y-3">
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className="rounded-xl border border-dashed p-3 transition-colors"
        style={{
          borderColor: dragging ? "var(--color-primary)" : "var(--border-color)",
          backgroundColor: dragging ? "var(--color-bgtech-projects)" : "transparent",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="h-16 w-24 shrink-0 overflow-hidden rounded-lg" style={{ backgroundColor: "var(--color-bgtech-projects)" }}>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Current project image"
                className="h-full w-full object-cover"
                style={{ objectPosition: imagePosition || "50% 50%", transform: `scale(${imageScale ?? 1})` }}
              />
            ) : (
              <div className="flex h-full items-center justify-center" style={{ color: "var(--color-muted)" }}><Image size={22} /></div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold">{imageUrl ? "Current project image" : "Drop an image here"}</p>
            <p className="mt-1 text-[11px]" style={{ color: "var(--color-muted)" }}>PNG, JPEG, WebP, SVG, AVIF · up to 5 MB</p>
            <button
              type="button"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
              className="mt-2 inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-semibold disabled:opacity-50"
              style={{ borderColor: "var(--border-color)" }}
            >
              {uploading ? <LoaderCircle size={14} className="animate-spin" /> : <Upload size={14} />}
              {uploading ? "Optimizing and uploading..." : "Choose file"}
            </button>
          </div>
          {imageUrl && (
            <button
              type="button"
              disabled={uploading}
              onClick={() => {
                onChange("");
                setFileSizes(null);
                setError("");
              }}
              aria-label="Remove image"
              className="rounded-lg p-2 disabled:opacity-50"
              style={{ color: "var(--color-third)" }}
            >
              <X size={17} />
            </button>
          )}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/svg+xml,image/avif"
        className="hidden"
        onChange={(event) => handleFile(event.target.files?.[0])}
      />

      {fileSizes && (
        <p className="text-[11px]" style={{ color: "var(--color-muted)" }}>
          Image size: {formatBytes(fileSizes.before)} → {formatBytes(fileSizes.after)}
        </p>
      )}
      {error && <p role="alert" className="text-xs" style={{ color: "var(--color-third)" }}>{error}</p>}

      <button
        type="button"
        onClick={() => setUseUrl((current) => !current)}
        className="text-xs font-medium underline underline-offset-2"
        style={{ color: "var(--color-muted)" }}
      >
        {useUrl ? "Use image uploader" : "Use URL instead"}
      </button>
      {useUrl && (
        <input
          id="project-image-url"
          type="text"
          value={imageUrl}
          onChange={(event) => onChange(event.target.value)}
          placeholder="/imagesProjects/example.webp or https://..."
          className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2"
          style={{ backgroundColor: "var(--color-bg-projects)", borderColor: "var(--border-color)", color: "var(--color-text)" }}
        />
      )}
    </div>
  );
}

"use client";

import React, { useRef, useState } from "react";
import { upload } from "@imagekit/next";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Image } from "@imagekit/next";
import { Loader2, UploadCloud, X } from "lucide-react";

interface Props {
  value?: string;
  onChange: (url: string) => void;
  accept?: string;
  maxSizeBytes?: number; // optional validation
}

export const ImageKitUploader: React.FC<Props> = ({
  value,
  onChange,
  accept = "image/*",
  maxSizeBytes = 5_000_000,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAuth = async () => {
    const res = await fetch("/api/upload-auth");
    if (!res.ok) throw new Error("Upload auth failed");
    return res.json();
  };

  const handleChoose = () => inputRef.current?.click();

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setError(null);
    const f = e.target.files?.[0] ?? null;
    if (!f) return setSelectedFile(null);
    if (maxSizeBytes && f.size > maxSizeBytes) {
      setError(`File too large (>${Math.round(maxSizeBytes / 1_000_000)}MB)`);
      setSelectedFile(null);
      return;
    }
    setSelectedFile(f);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setError(null);
    setLoading(true);
    try {
      const auth = await getAuth();
      const res = await upload({
        file: selectedFile,
        fileName: selectedFile.name,
        publicKey: auth.publicKey,
        signature: auth.signature,
        expire: auth.expire,
        token: auth.token,
        onProgress: (e) => setProgress(Math.round((e.loaded / e.total) * 100)),
      });

      if (!res?.url) throw new Error("Upload failed");
      onChange(res.url);
      setSelectedFile(null);
    } catch (err) {
      console.error(err);
      setError((err as Error)?.message || String(err));
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <div className="space-y-3">
      {value ? (
        <div className="relative">
          <Image
            urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}
            src={value}
            width={300}
            height={200}
            alt="preview"
            className="rounded-lg border"
          />
          <Button
            size="icon"
            variant="destructive"
            className="absolute top-2 right-2"
            onClick={() => onChange("")}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div>
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={onFileChange}
            className="hidden"
          />
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleChoose} className="flex-1">
              <UploadCloud className="mr-2 h-4 w-4" />
              Choose
            </Button>
            <Button onClick={() => setSelectedFile(null)} variant="ghost">
              Clear
            </Button>
          </div>
          {selectedFile && (
            <div className="text-sm mt-2">
              Selected: {selectedFile.name} —{" "}
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </div>
          )}
        </div>
      )}

      {loading && (
        <div>
          <Progress value={progress} />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Uploading… {progress}%
          </div>
        </div>
      )}

      {error && <div className="text-sm text-red-600">{error}</div>}

      {!loading && selectedFile && (
        <Button className="w-full" onClick={handleUpload}>
          Upload
        </Button>
      )}
    </div>
  );
};

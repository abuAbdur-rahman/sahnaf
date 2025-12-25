"use client";

import React, { useRef, useState } from "react";
import { upload } from "@imagekit/next";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Image } from "@imagekit/next";
import { Loader2, UploadCloud, X, FileImage } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Props {
  value?: string;
  onChange: (url: string) => void;
  accept?: string;
  maxSizeBytes?: number;
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
      setError(
        `File too large (max ${Math.round(maxSizeBytes / 1_000_000)}MB)`,
      );
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
        <Card className="relative overflow-hidden group">
          <div className="relative w-full aspect-video bg-slate-100">
            <Image
              urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}
              src={value}
              alt="preview"
              fill
              className="object-contain"
            />
          </div>
          <Button
            size="icon"
            variant="destructive"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            onClick={() => onChange("")}
          >
            <X className="h-4 w-4" />
          </Button>
        </Card>
      ) : (
        <div className="space-y-3">
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={onFileChange}
            className="hidden"
          />

          {/* Choose File Button */}
          <Button
            variant="outline"
            onClick={handleChoose}
            className="w-full h-32 border-2 border-dashed hover:border-emerald-500 hover:bg-emerald-50 transition-colors"
            type="button"
          >
            <div className="flex flex-col items-center gap-2">
              <UploadCloud className="h-8 w-8 text-muted-foreground" />
              <span className="font-medium">Choose Image</span>
              <span className="text-xs text-muted-foreground">
                Max {Math.round(maxSizeBytes / 1_000_000)}MB
              </span>
            </div>
          </Button>

          {/* Selected File Info */}
          {selectedFile && (
            <Card className="p-3 bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <FileImage className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setSelectedFile(null)}
                  type="button"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Upload Progress */}
      {loading && (
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Uploading… {progress}%</span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <Card className="p-3 bg-red-50 border-red-200">
          <p className="text-sm text-red-600">{error}</p>
        </Card>
      )}

      {/* Upload Button */}
      {!loading && selectedFile && (
        <Button
          className="w-full bg-emerald-600 hover:bg-emerald-500"
          onClick={handleUpload}
          type="button"
        >
          <UploadCloud className="mr-2 h-4 w-4" />
          Upload Image
        </Button>
      )}
    </div>
  );
};

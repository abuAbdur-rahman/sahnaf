"use client";

import { upload } from "@imagekit/next";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Image } from "@imagekit/next";
import { Loader2, UploadCloud, X } from "lucide-react";
import { Input } from "./ui/input";

interface Props {
  value?: string;
  onChange: (url: string) => void;
}

export function ImageKitUploader({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const getAuth = async () => {
    const res = await fetch("/api/upload-auth");
    if (!res.ok) throw new Error("Upload auth failed");
    return res.json();
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);

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

    if (!res.url) throw new Error("Upload failed");

    onChange(res.url);
    setSelectedFile(null);
    setLoading(false);
  };

  return (
    <div className="space-y-3">
      {value ? (
        <div className="relative">
          <Image
            urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}
            src={value}
            width={400}
            height={225}
            alt="Preview"
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
        <>
          <Input
            ref={inputRef}
            type="file"
            hidden
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
          />
          <Button
            variant="outline"
            onClick={() => inputRef.current?.click()}
            className="w-full"
          >
            <UploadCloud className="mr-2 h-4 w-4" />
            Select Image
          </Button>
        </>
      )}

      {loading && (
        <>
          <Progress value={progress} />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Uploading…
          </div>
        </>
      )}

      {!loading && selectedFile ? (
        <Button onClick={handleUpload} className="w-full">
          Upload
        </Button>
      ) : null}
    </div>
  );
}

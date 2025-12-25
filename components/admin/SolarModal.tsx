// SolarModal.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageKitUploader } from "@/components/ImageKitUploader";
import { SolarProject } from "@/types";

interface Props {
  project: SolarProject | null;
  open: boolean;
  onClose: () => void;
  onSave: (data: Partial<SolarProject>) => Promise<void> | void;
}

export const SolarModal: React.FC<Props> = ({
  project,
  open,
  onClose,
  onSave,
}) => {
  const [form, setForm] = useState<Partial<SolarProject>>({
    title: "",
    location: "",
    kva: "",
    description: "",
    image: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (project) {
      setForm(project);
    } else {
      setForm({
        title: "",
        location: "",
        kva: "",
        description: "",
        image: "",
      });
    }
  }, [project]);

  const handleSubmit = async () => {
    setSaving(true);
    try {
      await onSave(form);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-125 max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{project ? "Edit Project" : "Add Project"}</DialogTitle>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 pr-2 -mr-2">
          <div className="space-y-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                value={form.title || ""}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Residential Solar Installation"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={form.location || ""}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="e.g. Lagos, Nigeria"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="kva">System Size</Label>
              <Input
                id="kva"
                value={form.kva || ""}
                onChange={(e) => setForm({ ...form, kva: e.target.value })}
                placeholder="e.g. 3.5KVA"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={form.description || ""}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Project details..."
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label>Project Image</Label>
              <ImageKitUploader
                value={form.image}
                onChange={(url) => setForm({ ...form, image: url })}
              />
            </div>
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="flex gap-3 pt-4 border-t">
          <Button onClick={handleSubmit} disabled={saving} className="flex-1">
            {saving ? "Saving..." : "Save Project"}
          </Button>
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

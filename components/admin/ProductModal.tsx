// ProductModal.tsx
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageKitUploader } from "@/components/ImageKitUploader";
import {
  Product,
  StockStatus,
  PRODUCT_CATEGORIES,
  SHOP_LOCATIONS,
} from "@/types";

interface Props {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  onSave: (data: Partial<Product>) => Promise<void> | void;
}

export const ProductModal: React.FC<Props> = ({
  product,
  open,
  onClose,
  onSave,
}) => {
  const [form, setForm] = useState<Partial<Product>>({
    name: "",
    price: 0,
    category: PRODUCT_CATEGORIES[0],
    shop: SHOP_LOCATIONS.UNDERG,
    stock: "in-stock" as StockStatus,
    description: "",
    image: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (product) setForm(product);
    else setForm((p) => ({ ...p, name: "", price: 0, image: "" }));
  }, [product]);

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
          <DialogTitle>{product ? "Edit Product" : "Add Product"}</DialogTitle>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 pr-2 -mr-2">
          <div className="space-y-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={form.name || ""}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Power Bank 20000mAh"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="price">Price (₦)</Label>
              <Input
                id="price"
                type="number"
                value={form.price ?? 0}
                onChange={(e) =>
                  setForm({ ...form, price: Number(e.target.value) })
                }
                placeholder="0"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => setForm({ ...form, category: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRODUCT_CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Shop Location</Label>
                <Select
                  value={form.shop}
                  onValueChange={(v) => setForm({ ...form, shop: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={SHOP_LOCATIONS.UNDERG}>
                      {SHOP_LOCATIONS.UNDERG}
                    </SelectItem>
                    <SelectItem value={SHOP_LOCATIONS.RANDA}>
                      {SHOP_LOCATIONS.RANDA}
                    </SelectItem>
                    <SelectItem value={SHOP_LOCATIONS.BOTH}>
                      {SHOP_LOCATIONS.BOTH}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Stock Status</Label>
              <Select
                value={form.stock}
                onValueChange={(v) =>
                  setForm({ ...form, stock: v as StockStatus })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in-stock">In Stock</SelectItem>
                  <SelectItem value="low-stock">Low Stock</SelectItem>
                  <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="desc">Description</Label>
              <Textarea
                id="desc"
                value={form.description || ""}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Product details..."
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label>Product Image</Label>
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
            {saving ? "Saving..." : "Save Product"}
          </Button>
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

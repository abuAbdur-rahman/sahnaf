"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product, SolarProject } from "@/types";
import { Button } from "@/components/ui/button";
import { Image } from "@imagekit/next";
import { ProductModal } from "@/components/admin/ProductModal";
import { SolarModal } from "@/components/admin/SolarModal";
import { apiGet, apiJson } from "@/lib/fetcher";
import {
  Loader2,
  LogOut,
  ShoppingBag,
  Droplets,
  Zap,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { ConfirmDeleteDialog } from "@/components/admin/confirmDeleteDialog";

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [solarProjects, setSolarProjects] = useState<SolarProject[]>([]);
  const [gasPrice, setGasPrice] = useState({ price: 1400, updatedAt: "" });
  const [loading, setLoading] = useState(true);

  // Modal state
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [solarModalOpen, setSolarModalOpen] = useState(false);
  const [editingSolar, setEditingSolar] = useState<SolarProject | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<{
    type: "product" | "solar";
    id: string | number;
  } | null>(null);

  const [deleting, setDeleting] = useState(false);
  const confirmDelete = async () => {
    if (!deleteTarget) return;

    setDeleting(true);
    try {
      if (deleteTarget.type === "product") {
        await apiJson(`/api/products`, "DELETE", { id: deleteTarget.id });
      }

      if (deleteTarget.type === "solar") {
        await apiJson(`/api/solar-projects`, "DELETE", {
          id: deleteTarget.id,
        });
      }

      await fetchData(); // 🔁 refresh after ANY delete
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsRes, solarRes, gasRes] = await Promise.all([
        apiGet<Product[]>("/api/products"),
        apiGet<SolarProject[]>("/api/solar-projects"),
        apiGet<{ price: number; updatedAt: string }>("/api/gas-price"),
      ]);

      setProducts(productsRes || []);
      setSolarProjects(solarRes || []);
      setGasPrice(gasRes || { price: 1400, updatedAt: "" });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Products
  const handleSaveProduct = async (data: Partial<Product>) => {
    try {
      const method = editingProduct ? "PUT" : "POST";
      const body = editingProduct ? { ...data, id: editingProduct.id } : data;
      await apiJson("/api/products", method, body);
      await fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // Gas
  const handleUpdateGasPrice = async (newPrice: number) => {
    try {
      await apiJson("/api/gas-price", "PATCH", { price: newPrice });
      await fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // Solar
  const handleSaveSolar = async (data: Partial<SolarProject>) => {
    try {
      const method = editingSolar ? "PUT" : "POST";
      const body = editingSolar ? { ...data, id: editingSolar.id } : data;
      await apiJson("/api/solar-projects", method, body);
      await fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // const handleDeleteSolar = async (id: number) => {
  //   if (!confirm("Delete project?")) return;
  //   try {
  //     await apiJson(`/api/solar-projects`, "DELETE", { id });
  //     await fetchData();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const imageKitEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!;

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={() => signOut()} variant="destructive">
          <LogOut className="h-4 w-4 mr-2" /> Logout
        </Button>
      </div>

      <Tabs defaultValue="products" className="mb-6">
        <TabsList>
          <TabsTrigger value="products">
            <ShoppingBag className="inline h-5 w-5 mr-2" /> Products
          </TabsTrigger>
          <TabsTrigger value="gas">
            <Droplets className="inline h-5 w-5 mr-2" /> Gas Price
          </TabsTrigger>
          <TabsTrigger value="solar">
            <Zap className="inline h-5 w-5 mr-2" /> Solar Projects
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Manage Products</h2>
              <Button
                onClick={() => {
                  setEditingProduct(null);
                  setProductModalOpen(true);
                }}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Product
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((p) => (
                <div key={p.id} className="bg-white rounded-lg border p-4">
                  <div className="h-40 mb-3 bg-gray-50 flex items-center justify-center relative">
                    {p.image ? (
                      <Image
                        urlEndpoint={imageKitEndpoint}
                        src={p.image}
                        alt={p.name}
                        fill
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <span className="text-gray-400">No image</span>
                    )}
                  </div>

                  <h3 className="font-semibold mb-2">{p.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    ₦{p.price.toLocaleString()}
                  </p>

                  <div className="flex gap-2 text-xs mb-2">
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {p.category}
                    </span>
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {p.shop}
                    </span>
                    <span
                      className={`px-2 py-1 rounded ${
                        p.stock === "in-stock"
                          ? "bg-emerald-100 text-emerald-800"
                          : p.stock === "low-stock"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {p.stock}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="flex-1"
                      onClick={() => {
                        setEditingProduct(p);
                        setProductModalOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-2" /> Edit
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={() =>
                        setDeleteTarget({ type: "product", id: p.id })
                      }
                    >
                      <Trash2 className="h-4 w-4 mr-2" /> Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="gas">
          <div className="max-w-md">
            <h2 className="text-xl font-bold mb-4">Update Gas Price</h2>
            <div className="bg-white rounded-lg border p-6">
              <label className="block text-sm font-medium mb-2">
                Current Price (per kg)
              </label>
              <input
                type="number"
                defaultValue={gasPrice.price}
                onBlur={(e) => {
                  const newPrice = parseInt(e.target.value || "0");
                  if (newPrice !== gasPrice.price)
                    handleUpdateGasPrice(newPrice);
                }}
                className="w-full px-4 py-3 border-2 rounded-lg focus:border-emerald-500 focus:outline-none text-2xl font-mono"
              />
              <p className="text-sm text-gray-600 mt-2">
                Last updated: {gasPrice.updatedAt || "Never"}
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="solar">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Manage Solar Projects</h2>
              <Button
                onClick={() => {
                  setEditingSolar(null);
                  setSolarModalOpen(true);
                }}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Project
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {solarProjects.map((s) => (
                <div
                  key={s.id}
                  className="bg-white rounded-lg border overflow-hidden"
                >
                  <div className="aspect-video bg-linear-to-br from-amber-500 to-orange-600 flex items-center justify-center relative">
                    {s.image ? (
                      <Image
                        urlEndpoint={imageKitEndpoint}
                        src={s.image}
                        alt={s.title}
                        fill // 👈 Add this
                        className="object-cover" // 👈 Add this to ensure it fills the space nicely
                      />
                    ) : (
                      <Zap className="h-12 w-12 text-white" />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1">{s.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{s.location}</p>
                    {s.kva && (
                      <p className="text-sm font-medium text-emerald-600 mb-3">
                        {s.kva}
                      </p>
                    )}
                    <div className="flex gap-2">
                      <Button
                        className="flex-1"
                        onClick={() => {
                          setEditingSolar(s);
                          setSolarModalOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4 mr-2" /> Edit
                      </Button>
                      <Button
                        variant="destructive"
                        className="flex-1"
                        onClick={() =>
                          setDeleteTarget({ type: "solar", id: s.id })
                        }
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <ProductModal
        product={editingProduct}
        open={productModalOpen}
        onClose={() => {
          setProductModalOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSaveProduct}
      />
      <SolarModal
        project={editingSolar}
        open={solarModalOpen}
        onClose={() => {
          setSolarModalOpen(false);
          setEditingSolar(null);
        }}
        onSave={handleSaveSolar}
      />
      <ConfirmDeleteDialog
        open={!!deleteTarget}
        loading={deleting}
        title="Delete item?"
        description="This action cannot be undone. The item will be permanently removed."
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

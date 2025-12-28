// app/shop/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Search, Loader2, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { Product, PRODUCT_CATEGORIES } from "@/types";
import BannerSlideshow from "@/components/banner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type SortOption =
  | "featured"
  | "price-low"
  | "price-high"
  | "name-asc"
  | "name-desc";

interface Filters {
  categories: string[];
  priceRange: [number, number];
  availability: "all" | "in-stock" | "out-of-stock";
  sortBy: SortOption;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [gasPrice, setGasPrice] = useState({
    price: 1300,
    updatedAt: new Date().toLocaleString(),
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    categories: [],
    priceRange: [0, 100000],
    availability: "all",
    sortBy: "featured",
  });

  // Calculate price range from products
  const [maxPrice, setMaxPrice] = useState(100000);

  useEffect(() => {
    async function fetchData() {
      try {
        const productsRes = await fetch("/api/products");
        if (productsRes.ok) {
          const productsData = await productsRes.json();
          setProducts(productsData);

          // Calculate max price
          if (productsData.length > 0) {
            const prices = productsData.map((p: Product) => p.price);
            const max = Math.max(...prices);
            setMaxPrice(Math.ceil(max / 1000) * 1000); // Round up to nearest 1000
            setFilters((prev) => ({ ...prev, priceRange: [0, max] }));
          }
        }

        const gasPriceRes = await fetch("/api/gas-price");
        if (gasPriceRes.ok) {
          const gasPriceData = await gasPriceRes.json();
          setGasPrice(gasPriceData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const categories = PRODUCT_CATEGORIES;

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      // Search filter
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      if (!matchesSearch) return false;

      // Category filter
      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(product.category);
      if (!matchesCategory) return false;

      // Price filter
      const matchesPrice =
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1];
      if (!matchesPrice) return false;

      // Availability filter
      const matchesAvailability =
        filters.availability === "all" ||
        (filters.availability === "in-stock" && product.stock) ||
        (filters.availability === "out-of-stock" && !product.stock);
      if (!matchesAvailability) return false;

      return true;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  const handleCategoryToggle = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, maxPrice],
      availability: "all",
      sortBy: "featured",
    });
  };

  const activeFilterCount =
    filters.categories.length +
    (filters.availability !== "all" ? 1 : 0) +
    (filters.priceRange[0] !== 0 || filters.priceRange[1] !== maxPrice ? 1 : 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <BannerSlideshow gasPrice={gasPrice} />

      {/* Search Bar */}
      <div className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* Filter Button */}
            <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  className="relative px-4 border-2"
                >
                  <SlidersHorizontal className="h-5 w-5 mr-2" />
                  <span className="hidden sm:inline">Filters</span>
                  {activeFilterCount > 0 && (
                    <Badge
                      variant="default"
                      className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-emerald-600"
                    >
                      {activeFilterCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Refine your product search
                  </SheetDescription>
                </SheetHeader>

                <div className="mt-6 space-y-6">
                  {/* Categories */}
                  <div>
                    <h3 className="font-semibold mb-3">Categories</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div
                          key={category}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={category}
                            checked={filters.categories.includes(category)}
                            onCheckedChange={() =>
                              handleCategoryToggle(category)
                            }
                          />
                          <Label
                            htmlFor={category}
                            className="text-sm font-normal cursor-pointer"
                          >
                            {category}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h3 className="font-semibold mb-3">Price Range</h3>
                    <div className="px-2">
                      <Slider
                        min={0}
                        max={maxPrice}
                        step={1000}
                        value={filters.priceRange}
                        onValueChange={(value) =>
                          setFilters((prev) => ({
                            ...prev,
                            priceRange: value as [number, number],
                          }))
                        }
                        className="mb-4"
                      />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>₦{filters.priceRange[0].toLocaleString()}</span>
                        <span>₦{filters.priceRange[1].toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <h3 className="font-semibold mb-3">Availability</h3>
                    <RadioGroup
                      value={filters.availability}
                      onValueChange={(value) =>
                        setFilters((prev) => ({
                          ...prev,
                          availability: value as
                            | "all"
                            | "in-stock"
                            | "out-of-stock",
                        }))
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all" id="all" />
                        <Label
                          htmlFor="all"
                          className="font-normal cursor-pointer"
                        >
                          All Products
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="in-stock" id="in-stock" />
                        <Label
                          htmlFor="in-stock"
                          className="font-normal cursor-pointer"
                        >
                          In Stock
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="out-of-stock"
                          id="out-of-stock"
                        />
                        <Label
                          htmlFor="out-of-stock"
                          className="font-normal cursor-pointer"
                        >
                          Out of Stock
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Clear Filters */}
                  {activeFilterCount > 0 && (
                    <Button
                      variant="outline"
                      onClick={clearFilters}
                      className="w-full"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Clear All Filters
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Active Filters & Sort */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center gap-3">
            {/* Active Filter Badges */}
            <div className="flex flex-wrap items-center gap-2 flex-1">
              {filters.categories.map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="cursor-pointer hover:bg-gray-200"
                  onClick={() => handleCategoryToggle(category)}
                >
                  {category}
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              ))}
              {filters.availability !== "all" && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer hover:bg-gray-200"
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, availability: "all" }))
                  }
                >
                  {filters.availability === "in-stock"
                    ? "In Stock"
                    : "Out of Stock"}
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              )}
              {(filters.priceRange[0] !== 0 ||
                filters.priceRange[1] !== maxPrice) && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer hover:bg-gray-200"
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      priceRange: [0, maxPrice],
                    }))
                  }
                >
                  ₦{filters.priceRange[0].toLocaleString()} - ₦
                  {filters.priceRange[1].toLocaleString()}
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              )}
            </div>

            {/* Sort Dropdown */}
            <Select
              value={filters.sortBy}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, sortBy: value as SortOption }))
              }
            >
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name-asc">Name: A to Z</SelectItem>
                <SelectItem value="name-desc">Name: Z to A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto px-4 py-6 md:py-8">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 text-emerald-600 animate-spin" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm
                ? `No results for "${searchTerm}"`
                : "Try adjusting your filters"}
            </p>
            {activeFilterCount > 0 && (
              <Button onClick={clearFilters} variant="outline">
                Clear Filters
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-600">
              Showing {filteredProducts.length} product
              {filteredProducts.length !== 1 ? "s" : ""}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-emerald-50 border-t border-emerald-100 py-8">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-bold mb-2">
            Can&apos;t find what you&apos;re looking for?
          </h3>
          <p className="text-gray-600 mb-4">
            Contact us on WhatsApp and we&apos;ll help you out!
          </p>
          <a
            href="https://wa.me/2347068288647?text=Hi, I'm looking for a product"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#20BA5A] transition"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}

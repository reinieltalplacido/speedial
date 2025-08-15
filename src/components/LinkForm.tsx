"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface Link {
  id: string;
  title: string;
  url: string;
  category: string;
}

interface LinkFormProps {
  onSubmit?: (linkData: Omit<Link, "id"> | Link) => void;
  onCancel?: () => void;
  initialValues?: Link;
  isEditing?: boolean;
}

export default function LinkForm({
  onSubmit = () => {},
  onCancel = () => {},
  initialValues,
  isEditing = false,
}: LinkFormProps) {
  const [formData, setFormData] = useState({
    title: initialValues?.title || "",
    url: initialValues?.url || "",
    category: initialValues?.category || "General",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.url.trim()) {
      newErrors.url = "URL is required";
    } else {
      try {
        // Check if URL is valid
        new URL(formData.url);
      } catch (e) {
        newErrors.url =
          "Please enter a valid URL (include http:// or https://)";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      if (isEditing && initialValues?.id) {
        onSubmit({ ...formData, id: initialValues.id });
      } else {
        onSubmit(formData);
      }
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="My Favorite Website"
          className={errors.title ? "border-destructive" : ""}
        />
        {errors.title && (
          <p className="text-xs text-destructive">{errors.title}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="url">URL</Label>
        <Input
          id="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          placeholder="https://example.com"
          className={errors.url ? "border-destructive" : ""}
        />
        {errors.url && <p className="text-xs text-destructive">{errors.url}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Enter category (e.g., Work, Social, Tools)"
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{isEditing ? "Save Changes" : "Add Link"}</Button>
      </div>
    </form>
  );
}

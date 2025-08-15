import { Link } from '@/app/page';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export const linksApi = {
  // Fetch all links for a profileId
  async getLinks(profileId?: string): Promise<Link[]> {
    try {
      const url = profileId
        ? `${API_BASE_URL}/api/links?profileId=${profileId}`
        : `${API_BASE_URL}/api/links`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new ApiError(response.status, 'Failed to fetch links');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching links:', error);
      throw error;
    }
  },

  // Create a new link for a profileId
  async createLink(link: Omit<Link, 'id'> & { profileId: string }): Promise<Link> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/links`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(link),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(response.status, errorData.error || 'Failed to create link');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating link:', error);
      throw error;
    }
  },

  // Update an existing link for a profileId
  async updateLink(link: Link & { profileId: string }): Promise<Link> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/links`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(link),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(response.status, errorData.error || 'Failed to update link');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating link:', error);
      throw error;
    }
  },

  // Delete a link for a profileId
  async deleteLink(id: string, profileId: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/links?id=${id}&profileId=${profileId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(response.status, errorData.error || 'Failed to delete link');
      }
    } catch (error) {
      console.error('Error deleting link:', error);
      throw error;
    }
  },
};

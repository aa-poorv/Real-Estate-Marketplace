import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const signUp = async ({ formData }) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const error = new Error("An error happened while creating the User!!");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const userCreation = await response.json();

  return userCreation;
};

export const signIn = async ({ formData }) => {
  const response = await fetch("/api/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const error = new Error("An error happened while Signing in!!");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const userData = await response.json();

  return userData;
};

export const updateUser = async ({ formData }) => {
  const response = await fetch("/api/user/update", {
    method: "PUT",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const error = new Error("Invalid update request");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const userData = await response.json();

  return userData;
};

export const deleteUser = async ({ id }) => {
  const response = await fetch(`/api/user/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new Error("Invalid delete request");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const userData = await response.json();

  return userData;
};

export const logoutUser = async () => {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new Error("Couldn't log out");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const userData = await response.json();

  return userData;
};

export const createListing = async ({ formData }) => {
  if (formData.imageURLs.length === 0)
    throw new Error("Please select at least 1 image");
  if (+formData.discountPrice > +formData.regularPrice)
    throw new Error("Discount price must be greater than regular price");

  const response = await fetch("/api/listing", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new Error("Invalid create listing request");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const listingData = await response.json();

  return listingData;
};

export const userListings = async ({ signal }) => {
  const response = await fetch("/api/user/listings", { signal });

  if (!response.ok) {
    const error = new Error("Invalid search request");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const userListingsData = await response.json();
  return userListingsData;
};

export const deleteListing = async ({ id }) => {
  const response = await fetch(`/api/listing/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new Error("Listing deletion failed");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const deletionData = await response.json();

  return deletionData;
};

export const updateListing = async ({ formData, id }) => {
  const response = await fetch(`/api/listing/update/${id}`, {
    method: "PUT",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new Error("Listing Update failed");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const updateListingData = await response.json();

  return updateListingData;
};

export const getListingData = async ({ id }) => {
  const response = await fetch(`/api/listing/${id}`);

  if (!response.ok) {
    const error = new Error("Listing data not found");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const listingData = await response.json();

  return listingData;
};

export const queryListings = async ({ queryString, pageParam }) => {
  const response = await fetch(`/api/listing?${queryString}&page=` + pageParam);

  if (!response.ok) {
    const error = new Error("Listings not found");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const queriedListing = await response.json();

  return queriedListing;
};

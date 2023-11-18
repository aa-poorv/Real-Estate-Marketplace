import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const id = req.userId;
    const listing = await Listing.create({ ...req.body, userRef: id });
    return res.status(201).json(listing);
  } catch (err) {
    next(err);
  }
};

export const deleteListing = async (req, res, next) => {
  try {
    const id = req.userId;
    const listingId = req.params.id;

    const listing = await Listing.findById(listingId);
    if (!listing) throw errorHandler(404, "Listing not found");
    if (listing.userRef.toString() !== id)
      throw errorHandler(401, "You can only delete your own listing");

    await Listing.findByIdAndDelete(listingId);

    res.status(200).json("Listing has beeen deleted");
  } catch (err) {
    next(err);
  }
};

export const getListingData = async (req, res, next) => {
  try {
    const listingId = req.params.id;
    const listing = await Listing.findById(listingId).populate("userRef");
    if (!listing) return next(errorHandler(404, "Listing not found"));

    res.status(200).json(listing);
  } catch (err) {
    next(err);
  }
};

export const updateListing = async (req, res, next) => {
  try {
    const listingId = req.params.id;
    const id = req.userId;

    const listing = await Listing.findById(listingId);
    if (!listing) return next(errorHandler(404, "No such listing"));
    if (listing.userRef.toString() !== id)
      return next(errorHandler(401, "User not allowed to update listing"));

    const newListingData = await Listing.findByIdAndUpdate(
      listingId,
      req.body,
      { new: true }
    );

    res.status(200).json(newListingData);
  } catch (err) {
    next(err);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const page = parseInt(req.query.page) || 1;

    let offer = req.query.offer;
    if (offer === undefined || offer === "false")
      offer = { $in: [false, true] };

    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === "false")
      furnished = { $in: [false, true] };

    let parking = req.query.parking;
    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;
    if (type === undefined || type === "all") type = { $in: ["sell", "rent"] };

    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";

    const listings = await Listing.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
      ],
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip((page - 1) * limit);

    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

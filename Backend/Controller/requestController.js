import { request_Model } from "../Models/requestModel.js";
import { userModel } from "../Models/userModel.js";

export const sendRequest = async (req, res) => {
  try {
    const senderId = req.user.userId;
    const { receiverId } = req.body;
    if (!receiverId) {
      return res.status(404).json({
        message: "Receiver Id is required",
      });
    }

    if (senderId == receiverId) {
      return res
        .status(409)
        .json({ message: "You con't send request to your self" });
    }
    const exitsingRequest = await request_Model.findOne({
      sender: senderId,
      receiver: receiverId,
      status: "pending",
    });
    if (exitsingRequest) {
      return res.status(205).json({
        message: "request already sent",
      });
    }
    await request_Model.create({
      sender: senderId,
      receiver: receiverId,
    });
    return res.status(201).json({
      message: "Request sent to the user sucessfully !",
    });
  } catch (e) {
    return res.status(405).json({
      message: "Server error",
      error: e,
    });
  }
};

export const checkRequest = async (req, res) => {
  try {
    const receiver_userId = req.user.userId;
    const available_requests = await request_Model
      .find({ receiver: receiver_userId, status: "pending" })
      .populate("sender");
    console.log("requestsss", available_requests);

    if (!available_requests) {
      return res.status(404).json({
        message: "No request found",
      });
    }
    return res.status(201).json({ available_requests });
  } catch (e) {
    return res.status(405).json({
      message: "Server error",
      error: e,
    });
  }
};

export const acceptRequest = async (req, res) => {
  try {
    const loginUserId = req.user.userId;
    const { requestId } = req.params;

    const request = await request_Model.findOne({
      _id: requestId,
      receiver: loginUserId,
      status: "pending",
    });
    if (!request) {
      return res.status(409).json({
        message: "There is no request or action to be taken",
      });
    }

    request.status = "accepted";
    await request.save();

    await userModel.findByIdAndUpdate(request.sender, {
      $addToSet: { friends: loginUserId },
    });
    await userModel.findByIdAndUpdate(loginUserId, {
      $addToSet: { friends: request.sender },
    });
    return res.status(200).json({
      message: "friend request accepted",
    });
  } catch (e) {
    return res.status(404).json({
      message: "Server error",
      error: e,
    });
  }
};
export const cancelRequest = async (req, res) => {
  try {
    const loginUserId = req.user.userId;
    const { requestId } = req.params;

    const request = await request_Model.findOne({
      _id: requestId,
      receiver: loginUserId,
      status: "pending",
    });
    if (!request) {
      return res.status(409).json({
        message: "There is no request or action to be taken",
      });
    }

    request.status = "rejected";
    await request.save();

    return res.status(200).json({
      message: "friend request cancelled",
    });
  } catch (e) {
    return res.status(404).json({
      message: "Server error",
      error: e,
    });
  }
};

export const getFriends = async (req, res) => {
  try {
    const loginUser = req.user.userId;
    const friendSerch = await userModel.findById(loginUser).populate("friends");
    console.log("friends".friendSerch);

    if (!friendSerch) {
      return res.status(409).json({
        message: "user not found",
      });
    }
    return res.status(201).json({
      message: "friends list",
      friends: friendSerch.friends,
    });
  } catch (e) {
    return res.status(404).json({
      message: "Server error",
      error: e,
    });
  }
};

import { request_Model } from "../Models/requestModel.js";

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

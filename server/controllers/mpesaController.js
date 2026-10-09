import axios from "axios";
import { getAccessToken } from "../config/mpesa.js";
import UserModel from "../models/userModel.js";

export const stkPush = async (req, res) => {
  try {
    const { amount, phone, userId } = req.body;

    if (!amount || !phone || !userId) {
      return res.status(400).json({
        success: false,
        message: "Amount, phone number, and user ID are required",
      });
    }

    const token = await getAccessToken();

    const timestamp = new Date()
      .toISOString()
      .replace(/[-:.TZ]/g, "")
      .slice(0, 14);

    const password = Buffer.from(
      `${process.env.SHORTCODE}${process.env.PASSKEY}${timestamp}`
    ).toString("base64");

    const payload = {
      BusinessShortCode: process.env.SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: process.env.SHORTCODE,
      PhoneNumber: phone,
      CallBackURL: process.env.CALLBACK_URL,
      AccountReference: userId,
      TransactionDesc: "Buy Credits",
    };

    const response = await axios.post(
      `${process.env.BASE_URL}/mpesa/stkpush/v1/processrequest`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res.json({
      success: true,
      data: response.data,
    });
  } catch (err) {
    console.error("STK Push Error:", err.message);
    res.status(500).json({
      success: false,
      message: err.response?.data?.errorMessage || err.message,
    });
  }
};

export const mpesaCallback = async (req, res) => {
  try {
    const body = req.body;
    const stkCallback = body?.Body?.stkCallback;
    const resultCode = stkCallback?.ResultCode;
    const accountReference = stkCallback?.AccountReference;

    if (resultCode === 0) {
      const items = stkCallback.CallbackMetadata.Item;
      const amount = items.find((item) => item.Name === "Amount")?.Value || 0;
      const mpesaCode = items.find((item) => item.Name === "MpesaReceiptNumber")?.Value;

      const creditsMap = { 100: 100, 400: 500, 3000: 5000 };
      const creditsToAdd = creditsMap[amount] || Math.floor(amount);

      const user = await UserModel.findByIdAndUpdate(
        accountReference,
        { $inc: { creditBalance: creditsToAdd } },
        { new: true }
      );

      if (!user) {
        console.error("User not found for ID:", accountReference);
      } else {
        console.log(`Payment of KSH ${amount} (ref: ${mpesaCode}) added ${creditsToAdd} credits to ${user.email}`);
      }
    } else {
      console.log("Payment failed with result code:", resultCode);
    }

    res.json({ message: "Callback received successfully" });
  } catch (error) {
    console.error("Callback error:", error);
    res.status(500).json({ message: "Error processing callback" });
  }
};
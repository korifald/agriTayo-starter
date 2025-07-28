import Preorder from "../models/Preorder.js";
import { toE164 } from "../utils/phoneNumParser.js";
// import { sendSMS } from "../utils/twilio.js";
import { sendInfobipSMS } from "../utils/infobipSMS.js";

export async function getPreorders(req, res) {
        try {
                const preorders = await Preorder.find();
                res.status(200).json(preorders);
        } catch (error) {
                console.error("Error in getPreOrders:", error);
                res.status(500).json(
                        { message: "Internal server error"});
        }
}

// export async function getPreorderById(req, res) {
//         const { id } = req.params;
//         try {
//                 const preorder = await Preorder.findById(id);
//                 if (!preorder) {
//                         return res.status(404).json(
//                                 { message: "Preorder not found" });
//                 }
//                 res.status(200).json(preorder);
//         } catch (error) {
//                 console.error("Error in getPreorderById:", error);
//                 res.status(500).json(
//                         { message: "Internal server error" });
//         }
// } may not need these yet

export async function createPreorder(req, res) {
        const { 
                name,
                contact,
                email,
                quantity,
                date,
                address,
                signature,
                agree,
                farmer,
                product      
        } = req.body;

        if (!name || !contact || !email || !quantity || !date || !address || !signature || !agree) {
                return res.status(400).json(
                        { message: "All fields are required" });
        }

        if (!contact || !farmer?.verifiedNum) {
        console.error("Missing contact or farmer.verifiedNum", contact, farmer?.verifiedNum);
        return res.status(400).json({ message: "Contact or farmer number missing" });
        }

        try {
                const newPreorder = new Preorder({
                        name,
                        contact,
                        email,
                        quantity,
                        date,
                        address,
                        signature,
                        agree,
                        farmer,
                        product 
                });

                await newPreorder.save();

                // Parse number to E.164
                const customerE164 = toE164(String(contact), 'PH');
                const farmerE164 = toE164(String(farmer.verifiedNum), 'PH');

                // SMS for customer
                const customerText = 
                `Hi ${name}! Your preorder for ${quantity} of ${product} has been sent to ${farmer.name}.\n` +
                `We’ve shared your contact info (Phone: ${contact}, Email: ${email}) with the farmer so they can reach out to you directly.\n\n` +
                `Thank you for supporting local farmers and choosing to purchase through agriTayo! 🌱`;

                // SMS for farmer
                const farmerText = 
                `Hi ${farmer.name}! You’ve got a new preorder from ${name} for ${quantity} of ${product}.\n` +
                `You can reach them at ${contact} or ${email}.\n\n` +
                `Happy planting and selling from your agriTayo family! 🌱`;

                await sendInfobipSMS(customerE164, customerText);
                await sendInfobipSMS(farmerE164, farmerText);

                res.status(201).json(newPreorder);

        } catch (error) {
                console.error("Error in createPreorder:", error);
                res.status(500).json({ message: "Internal server error" });
        }
}

// export async function updatePreorder(req, res) {
//         const { id } = req.params;
//         const { 
//                 customerName,
//                 customerEmail,
//                 customerPhone,
//                 pickupLocation,
//                 farmer,
//                 product,
//                 quantityKg 
//         } = req.body;

//         if (!customerName || !customerEmail || !customerPhone || !pickupLocation || !farmer || !product || !quantityKg) {
//                 return res.status(400).json(
//                         { message: "All fields are required" });
//         }

//         try {
//                 const updatedPreorder = await Preorder.findByIdAndUpdate(
//                         id, 
//                         { 
//                                 customerName,
//                                 customerEmail,
//                                 customerPhone,
//                                 pickupLocation,
//                                 farmer,
//                                 product,
//                                 quantityKg 
//                         }, 
//                         { new: true }
//                 );

//                 if (!updatedPreorder) {
//                         return res.status(404).json(
//                                 { message: "Preorder not found" });
//                 }

//                 res.status(200).json(updatedPreorder);
//         } catch (error) {
//                 console.error("Error in updatePreorder:", error);
//                 res.status(500).json({ message: "Internal server error" });
//         }
// }   need to build UI for this?

export async function deletePreorder(req, res) {
        const { id } = req.params;
        try {
                const deletedPreorder = await Preorder.findByIdAndDelete(id);
                if (!deletedPreorder) {
                        return res.status(404).json(
                                { message: "Preorder not found" });
                }
                res.status(200).json(
                        { message: "Preorder deleted successfully" });
        } catch (error) {
                console.error("Error in deletePreorder:", error);
                res.status(500).json(
                        { message: "Internal server error" });
        }
}



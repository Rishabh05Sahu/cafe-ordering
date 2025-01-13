// orderDummyData.js

const orderData = [
    {
        customer: "64ae61b8b85a620d34982ba1", // Replace with actual Customer ObjectId
        seatNumber: 12,
        items: [
            {
                menuItemId: "64ae61b8b85a620d34982bb1", // Replace with actual MenuItem ObjectId
                quantity: 2
            },
            {
                menuItemId: "64ae61b8b85a620d34982bb2", // Replace with actual MenuItem ObjectId
                quantity: 1
            }
        ],
        totalPrice: 520,
        ordrStatus: "pending",
        billStatus: "Unpaid",
        createdAt: new Date("2023-12-22T14:00:00")
    },
    {
        customer: "64ae61b8b85a620d34982ba2", // Replace with actual Customer ObjectId
        seatNumber: 5,
        items: [
            {
                menuItemId: "64ae61b8b85a620d34982bb3", // Replace with actual MenuItem ObjectId
                quantity: 1
            }
        ],
        totalPrice: 150,
        ordrStatus: "served",
        billStatus: "Paid",
        createdAt: new Date("2023-12-22T15:30:00")
    },
    {
        customer: "64ae61b8b85a620d34982ba3", // Replace with actual Customer ObjectId
        seatNumber: 20,
        items: [
            {
                menuItemId: "64ae61b8b85a620d34982bb4", // Replace with actual MenuItem ObjectId
                quantity: 3
            },
            {
                menuItemId: "64ae61b8b85a620d34982bb5", // Replace with actual MenuItem ObjectId
                quantity: 2
            }
        ],
        totalPrice: 850,
        ordrStatus: "pending",
        billStatus: "Unpaid",
        createdAt: new Date("2023-12-22T16:45:00")
    }
];

export default orderData;

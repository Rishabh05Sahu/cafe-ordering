// orderDummyData.js

const orderData = [
    {   id:1,
        customer: "64ae61b8b85a620d34982ba1", // Replace with actual Customer ObjectId
        seatNumber: 12,
        items: [
            {
                menuItemId: "1", // Replace with actual MenuItem ObjectId
                quantity: 2
            },
            {
                menuItemId: "2", // Replace with actual MenuItem ObjectId
                quantity: 1
            }
        ],
        totalPrice: 520,
        ordrStatus: "pending",
        billStatus: "Unpaid",
        createdAt: new Date("2023-12-22T14:00:00")
    },
    {   id:2,
        customer: "64ae61b8b85a620d34982ba2", // Replace with actual Customer ObjectId
        seatNumber: 5,
        items: [
            {
                menuItemId: "3", // Replace with actual MenuItem ObjectId
                quantity: 2
            }
        ],
        totalPrice: 150,
        ordrStatus: "served",
        billStatus: "Paid",
        createdAt: new Date("2023-12-22T15:30:00")
    },
    {   id:3,
        customer: "64ae61b8b85a620d34982ba3", // Replace with actual Customer ObjectId
        seatNumber: 20,
        items: [
            {
                menuItemId: "1", // Replace with actual MenuItem ObjectId
                quantity: 3
            },
            {
                menuItemId: "3", // Replace with actual MenuItem ObjectId
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

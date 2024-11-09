const mongoose = require("mongoose");
const zod = require("zod");
const bcrypt = require('bcrypt');
// iehCTKORDqDeF7AH
const mongoURI = "mongodb+srv://sultanpal81:iehCTKORDqDeF7AH@radhekrishna.lra7q.mongodb.net/?retryWrites=true&w=majority&appName=radhekrishna/user";

// Connect to MongoDB
mongoose.connect(mongoURI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB connection error:", error));

// Define Zod validation schema for user data
const userSchemaZod = zod.object({
    userfirstname: zod.string().min(1, "First name must be at leaset 1 character"),
    userlastname: zod.string().min(1, "First name must be at leaset 1 character"),
    gmailId: zod.string().email({ message: "Invalid email format" }),
    password: zod.string().min(6, { message: "Password must be at least 6 characters long" }),
});

const GmailValidateZod = zod.object({
    userGamil: zod.string().email({ message: "Invalid email format" })
});

// Define Mongoose schema and model
const userSchemaMongoose = new mongoose.Schema({
    userfirstname: { type: String, required: true },
    userlastname: { type: String, required: true },
    gmailId: { type: String, required: true },
    password: { type: String, required: true },
});

const User = mongoose.model("User", userSchemaMongoose);
async function createUser(data) {
    try {

        const validatedData = userSchemaZod.parse(data);

        const existingUser = await User.findOne({ gmailId: validatedData.gmailId });
        if (existingUser) {
            console.log("Existing user found.");
            return { success: false, message: "Account with this email already exists." };
        }
        const hashedPassword = await bcrypt.hash(validatedData.password, 10);
        const newUser1 = new User({
            userfirstname:  validatedData.userfirstname,
            userlastname :  validatedData.userlastname,
            gmailId: validatedData.gmailId,
            password: hashedPassword
        });
        const newUser = new User(newUser1);
        const savedUser = await newUser.save();
        console.log("User created successfully:", savedUser);

        return { success: true, user: savedUser };

    } catch (error) {
        if (error instanceof zod.ZodError) {
            console.error("Validation errors:", error.errors);
            return { success: false, message: "Validation errors", errors: error.errors };
        } else {
            console.error("Database error:", error);
            return { success: false, message: "Database error" };
        }
    }
}


//login page 
async function loginUser(info) {
    try {
        // Find the user by their Gmail ID
        const foundUser = await User.findOne({ gmailId: info.gmailId });

        // Check if the user exists
        if (!foundUser) {
            return { success: false, message: 'User not found' };
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(info.password, foundUser.password);

        if (isMatch) {
            return { success: true, user: foundUser };
        } else {
            return { success: false, message: 'Incorrect password' };
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        return { success: false, message: 'An error occurred' };
    }
}





module.exports = { createUser, userSchemaZod ,loginUser};

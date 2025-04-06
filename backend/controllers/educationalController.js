export const createEducational = async (req, res) => {
    console.log("Received Data:", req.body); // ✅ Debugging line

    const { title, description, content, category, contentType, mediaUrl } = req.body;

    if (!title || !description || !content || !category || !contentType) {
        return res.status(400).json({ error: "All required fields must be provided." });
    }
    
    try {
        const newEducational = new Educational({
            title,
            description,
            content,
            category,
            contentType,
            mediaUrl
        });

        await newEducational.save();
        res.status(201).json(newEducational);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

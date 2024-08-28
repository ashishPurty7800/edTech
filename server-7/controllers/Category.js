const Category = require("../models/Category");

// create Category ka handler function

exports.createCategory = async (req, res) => {
    try{
        // fetch data
        const {name, description} = req.body;

        // validation
        if(!name || !description) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            })
        }

        // create entry in DB
        const CategoryDetails = await Category.create({
            name: name,
            description: description,
        });
        console.log(CategoryDetails);

        // return response
        return res.status(200).json({
            success: true,
            message: "Category Created Successfully",
        });

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};


// showAllCategories handler function

exports.showAllCategories = async (req, res) => {
    try{
        const allTags = await Category.find({}, {name:true, description:true});
        res.status(200).json({
            success: true,
            message:"All tags returned successfully",
            allTags,
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })

    }
};




// categoryPageDetails
exports.categoryPageDetails = async (req, res) => {
    try{
            // get categoryId
            const {categoryId} = req.body;
            // console.log("Category ki id backend--", categoryId);

            // get courses for specified categoryId
            const selectedCategory = await Category.findById(categoryId)
                                           .populate("courses")
                                           .exec();

            // validation
            if(!selectedCategory){
                return res.status(404).json({
                    success:false,
                    message:'Data Not Found',
                })
            }

            // get courses for different category
            const differentCategories = await Category.find({
                                            _id: {$ne: categoryId},
                                            })
                                            .populate("courses")
                                            .exec();

            // get top 10 selling courses
            const allCategories = await Category.find()
                                            .populate({
                                                path: "courses",
                                                match: { status: "Published" },
                                                populate: {
                                                    path: "instructor",
                                                }
                                            })
                                            .exec()

            const allCourses = allCategories.flatMap((category) => category.courses);
            const mostSellingCourses = allCourses.sort((a, b) => b.sold - a.sold).slice(0, 10);

            // return response
            return res.status(200).json({
                success: true,
                data: {
                    selectedCategory,
                    differentCategories,
                    mostSellingCourses,
                },
            });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });

    }
}
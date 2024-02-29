import mongoose from "mongoose"

 const mongodbConnction =()=>{
  mongoose.connect(process.env.MONGO_URL)
}

export default mongodbConnction
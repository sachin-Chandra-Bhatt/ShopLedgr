
import mongoose from 'mongoose';
const schema = new mongoose.Schema({ name:String, userLimit:Number, features:Array }, { timestamps:true });
export default mongoose.model('Plan', schema);

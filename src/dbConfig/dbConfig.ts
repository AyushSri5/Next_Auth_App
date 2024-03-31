import  mongoose  from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection=mongoose.connection;
        console.log("Hello");
        

        connection.on('connected',() => {
            console.log("Connected successfully");
            
        });

        connection.on('error',(error) => {
            console.log('Mongodb connection error');
            //TODO Study exit
            process.exit();
            
        });
    } catch (error) {
        console.log("Something went wrong");
        console.log(error);
        
        
    }
}
export default async function handler(req, res) {

    if(req.method !== "POST"){
        return res.status(405).json({
            error:"Method Not Allowed"
        });
    }

    const {name,email}=req.body;

    if(!name || !email){
        return res.status(400).json({
            error:"Missing fields"
        });
    }

    try{

        const response=await fetch(
            "https://api.brevo.com/v3/contacts",
            {

                method:"POST",

                headers:{
                    "Content-Type":"application/json",
                    "api-key":process.env.BREVO_API_KEY
                },

                body:JSON.stringify({

                    email:email,

                    attributes:{
                        FIRSTNAME:name
                    },

                    updateEnabled:true

                })

            }
        );

        const data=await response.json();

        return res.status(response.status).json(data);

    }

    catch(err){

        return res.status(500).json({
            error:"Server Error"
        });

    }

}
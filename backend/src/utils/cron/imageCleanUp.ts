import ImageModel from "../../models/image.model";

const imagesCleanUp = async () => {
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

    try {
        console.log(`[SERVER]: Preparing deleting Image with status TEMPORARY and EXPIRED`);

        const result = await ImageModel.deleteMany({ status : "temporary", createdAt: {
            $lt: thirtyMinutesAgo
        }});

        if(result.deletedCount !== 0) {
            console.log(`[SERVER]: Image data with status TEMPORARY and EXPIRED already deleted! \n [SERVER]: Deleted = ${result.deletedCount} Data`);
        } else {
            console.log('[SERVER]: Image with spesific option not exist, continuing next proccess..')
        }
        
    } catch (err) {
        console.error(`[SERVER]: ERROR OCCURRED = ${err}`);
    }
}

export default imagesCleanUp;
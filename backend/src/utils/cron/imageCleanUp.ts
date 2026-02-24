import ImageModel from "../../models/image.model";
import uploader from "../uploader";

const imagesCleanUp = async () => {

    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

    try {
        console.log(`[SERVER]: Preparing deleting Image with status TEMPORARY and EXPIRED`);

        const images = await ImageModel.find({ 
            status : "temporary", 
            createdAt: {
                $lt: thirtyMinutesAgo
            }
        });

        if(images.length === 0){
            console.log('[SERVER]: No expired temporary images found');
            return;
        }

        let deletedImgCount = 0;

        for(const img of images) {
            try {
                await uploader.removeMedia(String(img.url));
                await ImageModel.deleteOne({ _id: img._id});
                deletedImgCount++;
            } catch (err) {
                console.error(`[SERVER]: Failed deleting image ${img._id}`, err);
            }
        }

        console.log(`[SERVER]: Cleanup finished. Deleted ${deletedImgCount} images`);
        
    } catch (err) {
        console.error(`[SERVER]: ERROR OCCURRED = ${err}`);
    }
}

export default imagesCleanUp;
import { CronJob } from 'cron';
import imagesCleanUp from './cron/imageCleanUp';

const job = new CronJob(
	'0 0 3 * * *', 
	async function () {
		console.log(`[SERVER]: Starting Cron Worker..`)
		try {
			await imagesCleanUp();

			console.log('[SERVER]: Works complete!')
		} catch (err) {
			console.error(`[SERVER]: ERROR OCCURRED = ${err}`);
		}
	}, 
	null, 
	true, 
	'Asia/Jakarta' 
);

export default job;
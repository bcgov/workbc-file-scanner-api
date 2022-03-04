import NodeClam from "clamscan";

// Scan //
export const scan = async (stream: any) => {
    let infected: boolean | undefined;
    const ClamScan = new NodeClam().init({
        clamdscan: {
            host: '127.0.0.1',
            port: 3311,
        }
    });

    // Get instance by resolving ClamScan promise object
    await ClamScan.then(async clamscan => {
        try {
            const { isInfected } = await clamscan.scanStream(stream);
            if (isInfected) {
                infected = true;
            }
            else {
                infected = false;
            }
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }).catch(err => { // Initialization errors
        console.log(err);
        throw new Error(err);
    });
    
    return infected;
}
import NodeClam from "clamscan"

// Scan //
const scan = async (stream: any) => {
    let infected: boolean | undefined

    const ClamScan = new NodeClam().init({
        clamdscan: {
            host: process.env.CLAMSCAN_HOST,
            port: Number(process.env.CLAMSCAN_PORT)
        }
    })

    // Get instance by resolving ClamScan promise object
    await ClamScan.then(async (clamscan) => {
        try {
            const { isInfected } = await clamscan.scanStream(stream)
            if (isInfected) {
                infected = true
            } else {
                infected = false
            }
        } catch (err: any) {
            console.log(err)
            throw new Error(err)
        }
    }).catch((err: any) => {
        // Initialization errors
        console.log(err)
        throw new Error(err)
    })

    return infected
}

export default scan

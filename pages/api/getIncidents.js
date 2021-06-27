import { connectToDatabase } from '@/hooks/mongoDB'

export default async function (_, res) {
    try {
        const { db } = await connectToDatabase()

        // const limit = parseInt(req.query.limit)
        // const skip = parseInt(req.query.skip)

        const incidents = await db.collection('hateCrime').find({}).sort({ _id: -1 }).skip(1).limit(10).toArray()

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Cache-Control', 'max-age=180000')
        res.end(JSON.stringify(incidents))
    } catch (error) {
        res.json(error)
        res.status(405).end()
    }
}

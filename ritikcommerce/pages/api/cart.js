import {featuredProducts} from '../../db'

export default async function handle(req,res) {
  const ids = req.body.ids;
  let result = []
  for (const id of ids) {
    const data = await featuredProducts(id.toString())
    result.push(data)
  }
  res.json(result);
}
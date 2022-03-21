import { createClient } from "contentful"
import RecipeCard from "../components/RecipeCard"
import safeJsonStringify from 'safe-json-stringify'

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  })

  const raw = await client.getEntries({content_type:'courseActivity'})
  const stringifyRaw = safeJsonStringify(raw)
  const res = JSON.parse(stringifyRaw)

   return {
     props: { activities: res.items },
     revalidate: 1
   }


}

export default function Recipes({ activities }) {
  console.log(activities)

  return (
    // <div>hi</div>
    <div className="recipe-list">

      {activities.map(activity =>
        // <div>{activity.fields.title}</div>         
          <RecipeCard key={activity.sys.id} activity={activity} />
        )}

        <style jsx>{`
          
          .recipe-list {
          display:grid;
          grid-template-columns: 1fr 1fr;
          grid-gap:20px 60px;
        }

        `}</style>
    </div>
  )
}
import { createClient } from "contentful"
import Image from 'next/image'
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Skeleton from "../../components/Skeleton"
import safeJsonStringify from 'safe-json-stringify'


const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,

})

export const getStaticPaths = async () => {
  const raw = await client.getEntries({ content_type: 'courseActivity' })
  const stringifyRaw = safeJsonStringify(raw)
  const res = JSON.parse(stringifyRaw)

  const paths = res.items.map(item => {
    return {
      params: {slug: item.fields.slug}
    }
  })

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({params}) {

  const raw = await client.getEntries({
    content_type: 'courseActivity', 
    'fields.slug': params.slug
  })
  const stringifyRaw = safeJsonStringify(raw)
  const { items } = JSON.parse(stringifyRaw)


  if (!items.length){
    return {
      redirect: {
        destination: '/',
        permanent: false 
      }
    }
  }

  return {
    props: { activity: items[0] },
    revalidate: 1
  }

}

export default function RecipeDetails({activity}) {
  if (!activity) return <Skeleton />

  const { heroImage, title, descriptionLong, descriptionFull } = activity.fields 
  console.log(activity)

         {/* actions: (3) [{…}, {…}, {…}]
        articlesRelated: [{…}]
        barriersRelated: [{…}]
        descriptionLong: "Lightweight, free-flying, foot-launched glider aircraft with no rigid primary structure.  One part adrenaline, one part serenity."
        descriptionShort: "Lightweight, free-flying, foot-launched glider aircraft with no rigid primary structure.  One part adrenaline, one part serenity."
        guides: [{…}]
        heroImage: {metadata: {…}, sys: {…}, fields: {…}}
        lessons: [{…}]
        locationKeywords: "Paragliding"
        slug: "paragliding"
        title: "Paragliding" */}

  return (
    <div>
      <div className="banner">

      {heroImage && 
        <Image 
          src = {'https:' + heroImage.fields.file.url}
          width = {heroImage.fields.file.details.image.width}
          height = {heroImage.fields.file.details.image.height}
          />
      }
          <h2>{ title }</h2>
      </div>
      {/* <div className="info">
        <p>{cookingTime} to cook.</p>
        <h3>Ingredients</h3>
        {ingredients.map(ing=>(
          <span key={ing}>{ing}</span>
        ))}
      </div> */}
      <div className="method">
        <h3>Learn:</h3>
        
          <div>{descriptionFull && documentToReactComponents(descriptionFull)}</div> 
          
      </div>

      <style jsx>{`
        h2,h3 {
          text-transform: uppercase;
        }
        .banner h2 {
          margin: 0;
          background: #fff;
          display: inline-block;
          padding: 20px;
          position: relative;
          top: -60px;
          left: -10px;
          transform: rotateZ(-1deg);
          box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
        }
        .info p {
          margin: 0;
        }
        .info span::after {
          content: ", ";
        }
        .info span:last-child::after {
          content: ".";
        }
      `}</style>
    </div>
  )
}
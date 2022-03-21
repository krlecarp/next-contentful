import Link from 'next/link'
import Image from 'next/image'

export default function RecipeCard ({ activity }) {

    const { title, slug, heroImage, descriptionShort } = activity.fields

    return (
        <div className="card">


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

            <div className="featured">
                
                 
                {heroImage && 
                    <Image 
                        src={heroImage && 'https:' + heroImage.fields.file.url}
                        width={heroImage && heroImage.fields.file.details.image.width}
                        height={heroImage && heroImage.fields.file.details.image.height}
                        // width={500}
                        // height={500}
                        // layout='intrinsic'
                        
                    />
                }   
            </div>
            <div className="content">
                <div className="info">
                    <h4>{title}</h4>
                    <p>{descriptionShort}</p>
                </div>
                <div className="actions">
                    <Link href={'/recipes/' + slug }><a>cook this</a></Link>
                </div>
            </div>

        <style jsx>{`
            .card {
            transform: rotateZ(-1deg);
            }
            .content {
            background: #fff;
            box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
            margin: 0;
            position: relative;
            top: -40px;
            left: -10px;
            }
            .info {
            padding: 16px;
            }
            .info h4 {
            margin: 4px 0;
            text-transform: uppercase;
            }
            .info p {
            margin: 0;
            color: #777;
            }
            .actions {
            margin-top: 20px;
            display: flex;
            justify-content: flex-end;
            }
            .actions a {
            color: #fff;
            background: #f01b29;
            padding: 16px 24px;
            text-decoration: none;
            }
      `}</style>
        </div>
    )
}
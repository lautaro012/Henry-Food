

export function Recipefav (params) {

    let {name, image, id, health_score} = params.recipe

    return (
        <div key={id}>
            <div>
            <img src= {image} alt='imagen' className='image'/>
            </div>
            <div>
                <div>
                    {name}
                </div>
                <div>
                    {health_score}
                </div>
            </div>
        </div>
    )




}
import { useState, useEffect } from "react"
import styles from './Card.module.css'
import Spinner from './Spinner'


const Card = ({pokemonName}) => {

    const [pokemon, setPokemon] = useState({
        imageUrl: '',
        name: '',
        type: '',
        abilities: []
    })

    const [validationApiError, setValidationApiError] = useState("");

    //  1. LLamada API
    const getData = () => {

        fetch(`https://pokeapi.co/api/v2/pokemon/`+ pokemonName)
        .then(response =>response.json())
        .then(info => setPokemon({
            imageUrl: info.sprites.front_default,
            name: info.name,
            type: info.types[0].type.name,
            abilities: info.abilities.map(ability=>ability.ability.name)
        } ))
    }

    // 2. useEffect

    useEffect(() => {
        
        getData();
        

    }, [pokemonName])

    //Set time out para darle tiempo a la api de que haga el fetch

    setTimeout(() => {
        if(pokemon.name.trim().length > 0){
            setValidationApiError(false)
        } else{
            setValidationApiError(true)
        }   
    }, 3000)


    //3. Reload

    const onClickToReload = () =>{ window.location.reload(); }



    //4. Render
    return(
        <>
            {validationApiError==="" && <Spinner />}
            {validationApiError===false && 
            <div className={styles.cardContainer}>
                <img src={pokemon.imageUrl} />
                <div>{pokemon.image}</div>
                <div className={styles.pokemonInfo}>
                    <div className={styles.divName}>Name: {pokemon.name}</div>
                    <div className={styles.divType}>Type: {pokemon.type}</div>
                    <div className={styles.divAbilities}>Abilities: {pokemon.abilities.join(', ')}</div>
                </div>
                <button className={styles.buttonVolverAEmpezar} onClick={onClickToReload}>Volver a empezar</button>
            </div>}
            {validationApiError===true && 
            <div>
                <div className={styles.divError}>El nombre del Pokémon ingresado no es válido. Por favor, vuelve a empezar.</div>
                <button className={styles.buttonVolverAEmpezar} onClick={onClickToReload}>Volver a empezar</button>
            </div>}
            </>
    )

}

export default Card;
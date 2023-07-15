import { useState, useEffect } from "react";
import Card from './Card'
import styles from './Pokemon.module.css'

const Pokemon = () => {
    //1. Declaración useState
    const [pokemonName, setPokemonName] = useState("");
    const [validationError, setValidationError] = useState("");

    //2. Handler input
    const onPokemonNameChange = (e) => {
        setPokemonName(e.target.value.toLowerCase().trim())
    }

    //3. Validaciones

    const validateName = (pokemonName) => {
        return pokemonName?.length >= 3;
    }

    useEffect(() => {
        validateName()
    }, [pokemonName]);

    //4. Handler form

    const onSubmitForm = (e) => {
        e.preventDefault();

        const isPokemonValid = validateName(pokemonName);
        isPokemonValid ? setValidationError(false) : setValidationError(true)
    }

    //5. Return

    return(
        <>
            <h1>Elige tu Pokémon</h1>
            <div>
                <form onSubmit={onSubmitForm}>
                    <input onChange={onPokemonNameChange} type="text" placeholder="Ingresa un pokemon" disabled={validationError===false}/>
                    <button type="submit" disabled={validationError===false}>Enviar</button>
                    {validationError===false && <Card pokemonName = {pokemonName} />}
                    {validationError===true && <div className={styles.divError}>Por favor, ingresa un Pokémon válido</div> }   
                </form>
            </div>
        </>
    )
}

export default Pokemon;
const vowels = "aeiou"

// Function that lets the name as close to proper tokiponization as possible.
const repeated_letters = function(word) {
    let name = word.toLowerCase()

    // Match up the repeated vowels and consonants like "ll" in Isabella and "ia" in Mia.
    let match_vowels = name.match(/[aeiou]{2}/g) || []
    let match_consonants = name.match(/[^aeiou ]{2}/g) || []
    match_consonants = match_consonants.filter(c => !c.startsWith("n"))
    let pattern = match_vowels.concat(match_consonants)
    let possibilities = []
    
    if (pattern.length === 0) {
        return name
    }

    /* Picks up every letter from the patterns and removes 
    the chars that happens to be at the string.
    Examples: Isabella -> ['l'] -> Isabela
    Miski -> ['sk'] -> Misi, Miki */
    for (const p of pattern) {
        for (let j = 0; j < p.length; j++) {
            let replacement = p.slice(0, j) + p.slice(j + 1)
            let new_name = name.replace(p, replacement)
            possibilities.push(new_name)
        }
    }
    possibilities = [...new Set(possibilities)]

    /* Recursive method to work on names with repeated vowels and consonants at once,
    since the previous method could still get repeated vowels/consonants.
    Example: Michael -> Micael, Mihael */
    let all_possibilities = []
    for (const new_name of possibilities) {
        let result = repeated_letters(new_name)
        if (Array.isArray(result)) {
            all_possibilities = all_possibilities.concat(result)
        } else {
            all_possibilities.push(result)
        }
    }

    /* Avoids repeated elements and make sure it returns a 
    string in case there's only one element in all_possibilities. */
    all_possibilities = [...new Set(all_possibilities)]
    if (all_possibilities.length === 1) {
        return all_possibilities[0]
    }
    return all_possibilities
}

// Function that makes the actual tokiponization and implements your chosen headnoun.
const tokiponize = function(headnoun, word) {
    let name = word.toLowerCase()
    /* All tokiponizations rules I found at 
    https://packbat.itch.io/naming-yourself-in-toki-pona
    if there's something else missing, please let me know. */
    const replacements = {
        'b': 'p', 'd': 't', 'g': 'k', 'v': 'w', 'f': 'p', 'r': 'l', 
        'ch': 's', 'j': 's', 'sh': 's', 'c': 'k', 'y': 'j', 'z': 's', 'x': 's'
    }

    const pattern = new RegExp(Object.keys(replacements).map(key => key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g')
    let actual_name = name.replace(pattern, match => replacements[match])

    const getEndVowel = (match) => `ij${match[1]}` // Applies the very specific case of tpzing where the words ends with i[vowel] like Nie or Italia.
    const wuwo = (match) => match[1] // Avoids the wu and wo in wuwojiti.

    actual_name = actual_name.replace(/sh$/, 'si') // 'Lush' case stated on the naming yourself in tp guide.
    actual_name = actual_name.replace(/[^aeioun]{1,3}$/, '') // Removes all ending letters except if it's a vowel or the letter n
    actual_name = actual_name.replace('ti', 'si')
    actual_name = actual_name.replace(/w[uo]/g, wuwo)
    actual_name = actual_name.replace(/i[aeiou]$/, getEndVowel) 
    actual_name = actual_name.replace(/nn/g, 'n') // -nn- isn't allowed in toki pona.
    actual_name = repeated_letters(actual_name) // The final detail :D

    // Made to capitalize composite names like Kekan San
    const toTitleCase = (str) => str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
    
    // Picks up the name and adds the headnoun.
    if (Array.isArray(actual_name)) {
        return actual_name.map(n => `${headnoun} ${toTitleCase(n)}`)
    }
    return `${headnoun} ${toTitleCase(actual_name)}`
}

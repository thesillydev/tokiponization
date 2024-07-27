import random, re, string
from ordered_set import OrderedSet as Oset  # Python sets are unfortunaly not ordered normally.

vowels = "aeiou"
# Made this to avoid having to type all consonants manually.
consonants = "".join(list(set(string.ascii_lowercase) - set(vowels)))


# Function that lets the name as close to proper tokiponization as possible.
def repeated_letters(name):
    name = name.lower()

    # Match up the repeated vowels and consonants like "ll" in Isabella and "ia" in Mia.
    match_vowels = re.findall(r"[aeiou]{2}", name)
    match_consonants = re.findall(r"[^aeiou ]{2}", name)  # The space is to deal with composite names
    match_consonants = [item for item in match_consonants if not item.startswith("n")]
    patterns = match_vowels + match_consonants
    possibilities = []

    if not patterns:
        return name

    # Picks up every letter from the patterns and removes
    # the chars that happens to be at the string.
    # Examples: Isabella -> ['l'] -> Isabela
    # Miski -> ['sk'] -> Misi, Miki
    for pattern in patterns:
        for i in range(len(pattern)):
            new_name = name.replace(pattern, pattern[:i] + pattern[i + 1:], 1)
            possibilities.append(new_name)
    possibilities = list(set(possibilities))

    # Recursive method to work on names with repeated vowels and consonants at once,
    # since the previous method could still get repeated vowels/consonants.
    # Example: Michael -> Micael, Mihael
    all_possibilities = []
    for new_name in possibilities:
        result = repeated_letters(new_name)
        if isinstance(result, list):
            all_possibilities.extend(result)
        else:
            all_possibilities.append(result)

    # Avoids repeated elements and make sure it returns a
    # string in case there's only one element in all_possibilities.
    all_possibilities = list(set(all_possibilities))
    if len(all_possibilities) == 1:
        return all_possibilities[0]
    return all_possibilities


# Function that makes the actual tokiponization and implements your chosen headnoun.
def tokiponize(headnoun, name):
    name = name.lower()
    # All tokiponizations rules I found at https://packbat.itch.io/naming-yourself-in-toki-pona
    # if there's something else missing, please let me know.
    replacements = {'b': 'p', 'd': 't', 'g': 'k',
                    'v': 'w', 'f': 'p', 'r': 'l',
                    'ch': 's', 'j': 's', 'sh': 's',
                    'c': 'k', 'y': 'j', 'z': 's',
                    'x': 's'}

    def replace(match):
        return replacements[match.group(0)]

    # Applies the very specific case of tpzing where the words ends with i[vowel] like Nie or Italia.
    def get_end_vowel(match):
        return f"ij{match.group(0)[1]}"

    # Avoids the wu and wo in wuwojiti.
    def wuwo(match):
        return match.group(0)[1]

    pattern = re.compile('|'.join(re.escape(key) for key in replacements.keys()))
    actual_name = pattern.sub(replace, name)
    actual_name = re.sub(r'sh$', 'si', actual_name)  # 'Lush' case stated on the naming yourself in tp guide.
    actual_name = re.sub(r'[^aeioun]{1,3}$', '', actual_name)  # Removes all ending letters except if it's a vowel or the letter n
    actual_name = re.sub(r'ti', 'si', actual_name)  # Avoids the ti in wuwojiti.
    actual_name = re.sub(r"w[uo]", wuwo, actual_name)
    actual_name = re.sub(r'i[aeiou]$', get_end_vowel, actual_name)
    actual_name = actual_name.replace("nn", "n")  # -nn- isn't allowed in tp
    actual_name = repeated_letters(actual_name)  # The final detail :D

    # now it picks up the name and add the headnoun.
    if type(actual_name) == list:
        return [f"{headnoun} {n.title()}" for n in actual_name]
    return f"{headnoun} {actual_name.title()}"

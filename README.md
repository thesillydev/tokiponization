# Tokiponization
This is a project made to tokiponize names automatically using both Python and Javascript. I made this so it can be easier to get your own name without worrying how you should do it or asking other people how to do it.

#### Note: You should still learn how to tpize names by your own because it is cool and you can show whenever this code makes errors

# What this code can do
- Removes unnecessary letters(repeated letters)
- Give different tokiponizations if there's no single way of tpize it(Like with the names Samuel and Atsuko)
- Tokiponize composite names(like Son Goku or Danilo Gomez)

# Limitation
- It is spelling based only, so it's impossible to tokiponize English names with it right now
#### I am planning in making a separated code just for that so don't worry

# Example
```python
names = "Nataniel,Gabriel,Cameron,David,Julian,Ezekiel,Joseph,Lucas,Abigail,Aurora,Carolina,Stella,Adeline,Hannah,Emilia".split(",")
for name in names:
    print(tokiponize("jan", name))
```
It returns

```
jan Natanije
['jan Kapije', 'jan Kalije']
jan Kamelon
jan Tawi
['jan Sulin', 'jan Sulan']
jan Esekije
jan Sose
jan Luka
['jan Apiki', 'jan Apika']
['jan Alola', 'jan Ulola']
jan Kalolina
['jan Sela', 'jan Tela']
jan Ateline
jan Hana
jan Emilija
```

These codes were made to be open source, so feel free to use it for your projects[Just mention my name(jan Alisa) to credit the original author and you're good to go].

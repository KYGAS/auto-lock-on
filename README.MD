# auto-heal
Skip lockons and instantly heals/cleanses party members.

## Info
- Skills will instantly lockon and heal/cleanse party members. Heals prioritize the lowest HP.
- Mystic's cleanse only works in parties of 5 members or less. Disabled in raids.
- Auto-casting can be disabled (Skills will pre-lockon onto targets and need to be manually pressed again to cast).

| Skills affected                 |
| ------------------------------- |
| Priest - Focus Heal             |
| Priest - Healing Immersion      |
| Priest - Plague			      |
| Priest - Sleep ( fully soonTM ) |
| Mystic - Titanic Favor          |
| Mystic - Arun's Cleansing Touch |
| Mystic - Volley of Curses		  |
| Mystic - Contagion			  |

## Usage
### `autoheal [on/off]`
- Enables/disables auto-heals
- Default is on
### `autoheal [HP]`
- Set cutoff for healing. ('autoheal 50' = ignore members with >50% HP. Set to 100 to always heal)
- Default cutoff is 97%
### `autocleanse` [on/off]`
- Enables/disables auto-cleansing
- Default is on
### `autocast [on/off]`
- Enables/disables auto-casting
- Default is on
### `autodebuff [on/off]`
- Enables/disables auto-debuffing
- Default is on

## Issues
- Skills can ghost if proxy is also using Skill-Prediction (You see animation but nothing happens). Workaround is to disable the skills in SP. [Click here to see how](https://i.imgur.com/bS4VkbX.png)
- The index file is minified solely to make it difficult for people that are aiming to resell and abuse this module.
- Anyone that could tell whether the module is malicious to your PC with a clean file could do so with this one as well.

- Credits to:
-- Teralove ( Original creator )
-- Myself :fluffykitten:
-- Catharina ( Inspired me to do this so ppl don't have to use viruses ) <3
-- Naruchan ( Testing and ideas )

---

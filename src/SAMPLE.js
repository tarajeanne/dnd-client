const SAMPLE = {
  name: 'Sabrill of Savernke',
  race: 'Half-Elf',
  class: 'Ranger',
  physical_desc: '',
  other_desc: '',
  background: 'Far Traveler',
  alignment: 'Chaotic Good',
  size: 'Medium',
  speed: 30,
  languages: [
    {
      name: 'Common',
      variable: false,
      depends_on: null
    },
    {
      name:'Elvish',
      variable: false,
      depends_on: 'race'
    },
    {
      name: 'Goblin',
      variable: true,
      depends_on: 'race'
    }
  ],
  asi: [
  ],
  weap_prof: [],
  tool_prof: [],
  save_prof: [],
  check_prof: [],
  armor_prof: [],
  skills: {},
  features: {},
  prof_bonus: 2,
  hitDice: '1d8',
  hp: 10,
  abilities: {
    constitution: {
      base: 0,
      total: 15,
      mod: 2
    },
    strength: {
      base: 0,
      total: 14,
      mod: 2
    },
    dexterity: {
      base: 0,
      total: 13,
      mod: 1
    },
    charisma: {
      base: 0,
      total: 12,
      mod: 1
    },
    intelligence: {
      base: 0,
      total: 10,
      mod: 0
    },
    wisdom: {
      base: 0,
      total: 8,
      mod: -1
    }
  },
  ability_checks: {
    acrobatics: {
      mod: 0,
      prof: 0,
      total: 0
    },
    'animal handling': {
      mod: 0,
      prof: 0,
      total: 0
    },
    arcana: {
      mod: 0,
      prof: 0,
      total: 0
    },
    athletics: {
      mod: 0,
      prof: 0,
      total: 0
    },
    deception: {
      mod: 0,
      prof: 0,
      total: 0
    },
    history: {
      mod: 0,
      prof: 0,
      total: 0
    },
    insight: {
      mod: 0,
      prof: 0,
      total: 0
    },
    intimidation: {
      mod: 0,
      prof: 0,
      total: 0
    },
    investigation: {
      mod: 0,
      prof: 0,
      total: 0
    },
    medicine: {
      mod: 0,
      prof: 0,
      total: 0
    },
    nature: {
      mod: 0,
      prof: 0,
      total: 0
    },
    perception: {
      mod: 0,
      prof: 0,
      total: 0
    },
    performance: {
      mod: 0,
      prof: 0,
      total: 0
    },
    persuasion: {
      mod: 0,
      prof: 0,
      total: 0
    },
    religion: {
      mod: 0,
      prof: 0,
      total: 0
    },
    'sleight of hand': {
      mod: 0,
      prof: 0,
      total: 0
    },
    stealth: {
      mod: 0,
      prof: 0,
      total: 0
    },
    survival: {
      mod: 0,
      prof: 0,
      total: 0
    }
  },
  equipment: [],
  spells_known: [],
  spell_slots: [],
  spells_memorized: []
}
export default SAMPLE;